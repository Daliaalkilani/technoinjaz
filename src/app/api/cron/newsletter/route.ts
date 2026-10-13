import 'server-only';
import { getDB, apiError, apiOk, type D1, type D1Stmt } from '@/lib/server/db';
import { getNewsletterItem, listNewsletterItems, sendNextBatch, setAutoHold, type NewsletterItem } from '@/lib/server/newsletter';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export const dynamic = 'force-dynamic';

/**
 * Auto newsletter driver, called by the cron trigger every 15 minutes (and manually
 * with the same secret). Advances the same newsletter_sends rows the admin page uses,
 * one batch per invocation, until a send is finished.
 *
 * Flow per tick:
 *   1. an unfinished send exists → mail its next batch (done when batch < NEWSLETTER_BATCH).
 *   2. otherwise → find the next item that is neither announced nor on hold; on its
 *      first sighting it is recorded with a timestamp and left to age GRACE_MS
 *      (60 min, the admin's window to hold / fix it), then announced.
 *
 * Auth: `Authorization: Bearer <CRON_SECRET>` (wrangler secret) only. A ?secret= query
 * parameter is not accepted: URLs end up in Workers observability logs and proxies.
 */
/** Grace window between first sight of a new item and its announcement. */
const GRACE_MS = 60 * 60 * 1000;

/** Length-independent comparison, so response timing does not leak the secret. */
function safeEqual(a: string, b: string): boolean {
  const x = new TextEncoder().encode(a);
  const y = new TextEncoder().encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}

function authorize(request: Request, secret: string | undefined): boolean {
  if (!secret) return false;
  return safeEqual(request.headers.get('authorization') || '', `Bearer ${secret}`);
}

/** Next not-yet-announced, not-held item; records first sight and enforces the grace window.
 *  On the very first tick (no seen/hold rows at all) every item already in the content data
 *  is marked 'hold' — pre-existing content is never auto-announced; only items first seen
 *  after the feature went live enter the normal grace → announce flow.
 *  Reads both tables once (not one query per item) to stay far below the subrequest limit. */
async function pickItem(db: D1): Promise<NewsletterItem | null> {
  const { results: announced = [] } = await db.prepare('SELECT item_type, item_slug FROM newsletter_sends').all<{ item_type: string; item_slug: string }>();
  const sent = new Set(announced.map((r) => `${r.item_type}:${r.item_slug}`));
  const { results: tracked = [] } = await db
    .prepare('SELECT item_type, item_slug, state, first_seen_at FROM newsletter_auto')
    .all<{ item_type: string; item_slug: string; state: string; first_seen_at: number }>();
  const auto = new Map(tracked.map((r) => [`${r.item_type}:${r.item_slug}`, r]));
  const firstTick = tracked.length === 0;
  const now = Date.now();
  const firstSeen: D1Stmt[] = [];
  let pick: NewsletterItem | null = null;
  for (const it of listNewsletterItems()) {
    const key = `${it.type}:${it.slug}`;
    if (sent.has(key)) continue;
    const row = auto.get(key);
    if (firstTick || !row) {
      // Backfill (everything already published is old → hold), or first sight → 'seen'
      // and wait out the grace window.
      firstSeen.push(
        db
          .prepare('INSERT OR IGNORE INTO newsletter_auto (item_type, item_slug, state, first_seen_at) VALUES (?1, ?2, ?3, ?4)')
          .bind(it.type, it.slug, firstTick ? 'hold' : 'seen', now)
      );
      continue;
    }
    if (row.state === 'hold' || pick) continue;
    if (now - row.first_seen_at < GRACE_MS) continue; // still inside the hold window
    pick = getNewsletterItem(it.type, it.slug);
  }
  if (firstSeen.length) await db.batch(firstSeen);
  return pick;
}

export async function GET(request: Request) {
  const { env } = await getCloudflareContext({ async: true });
  const secret = (env as { CRON_SECRET?: string }).CRON_SECRET;
  if (!authorize(request, secret)) return apiError(401, 'unauthorized');
  try {
    const db = await getDB();

    // 1) finish any send already in flight (cron-started or admin-started; the cursor is
    //    shared, so an admin tab driving the same send is never duplicated).
    const active = await db.prepare('SELECT id FROM newsletter_sends WHERE finished_at IS NULL ORDER BY id ASC LIMIT 1').first<{ id: number }>();
    if (active) {
      const res = await sendNextBatch(db, active.id);
      return apiOk({ action: 'continue', sendId: active.id, ...res });
    }

    // 2) nothing in flight → announce the next eligible item.
    const item = await pickItem(db);
    if (!item) return apiOk({ action: 'idle' });
    const total = await db.prepare(`SELECT COUNT(*) AS n FROM newsletter_subscribers WHERE status = 'active'`).first<{ n: number }>();
    if (!total?.n) return apiOk({ action: 'idle', reason: 'no_subscribers' });
    const res = await db
      .prepare('INSERT INTO newsletter_sends (item_type, item_slug, subject, total, created_by, created_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6)')
      .bind(item.type, item.slug, item.title, total.n, 'auto-cron', Date.now())
      .run();
    const sendId = Number(res.meta?.last_row_id);
    const batchRes = await sendNextBatch(db, sendId);
    return apiOk({ action: 'start', sendId, item: item.slug, ...batchRes });
  } catch (err) {
    console.error('cron newsletter error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}

/** Hold/unhold: POST { type, slug, hold } with the cron secret — pins an item so the
 *  cron never announces it (manual admin send still works). The admin page does the
 *  same through /api/admin/newsletter { mode: 'hold' }. */
export async function POST(request: Request) {
  const { env } = await getCloudflareContext({ async: true });
  const secret = (env as { CRON_SECRET?: string }).CRON_SECRET;
  if (!authorize(request, secret)) return apiError(401, 'unauthorized');
  try {
    const db = await getDB();
    const body = (await request.json().catch(() => null)) as { type?: string; slug?: string; hold?: boolean } | null;
    const type = String(body?.type || '');
    const slug = String(body?.slug || '');
    if (!getNewsletterItem(type, slug)) return apiError(400, 'invalid_item');
    // Strict boolean (same as the admin route): a stray "false" string must not hold.
    await setAutoHold(db, type, slug, body?.hold === true);
    return apiOk({ held: body?.hold === true });
  } catch (err) {
    console.error('cron newsletter hold error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}
