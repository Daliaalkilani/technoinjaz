import 'server-only';
import { getDB, apiError, apiOk, type D1 } from '@/lib/server/db';
import { getNewsletterItem, listNewsletterItems, newsletterEmail, type NewsletterItem } from '@/lib/server/newsletter';
import { sendMail } from '@/lib/server/mail';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export const dynamic = 'force-dynamic';

/**
 * Auto newsletter driver, called by the cron trigger every 15 minutes (and manually
 * with the same secret). Advances the same newsletter_sends rows the admin page uses,
 * one BATCH per invocation, until a send is finished.
 *
 * Flow per tick:
 *   1. an unfinished send exists → mail its next batch (done when batch < BATCH).
 *   2. otherwise → find the newest item that is neither announced nor on hold; on its
 *      first sighting it is recorded with a timestamp and left to age GRACE_MS
 *      (60 min, the admin's window to hold / fix it), then announced.
 *
 * Auth: `Authorization: Bearer <CRON_SECRET>` (wrangler secret) or ?secret=.
 */
const BATCH = 25;
/** Grace window between first sight of a new item and its announcement. */
const GRACE_MS = 60 * 60 * 1000;

function authorize(request: Request, secret: string | undefined): boolean {
  if (!secret) return false;
  const header = request.headers.get('authorization') || '';
  if (header === `Bearer ${secret}`) return true;
  try {
    return new URL(request.url).searchParams.get('secret') === secret;
  } catch {
    return false;
  }
}

interface SendRow {
  id: number;
  item_type: string;
  item_slug: string;
  finished_at: number | null;
}

/** Mails the next BATCH of `send` after active-subscriber id `afterId`. */
async function sendBatch(db: D1, send: SendRow, afterId: number): Promise<{ done: boolean; nextAfterId: number; sent: number; failed: number }> {
  const item = getNewsletterItem(send.item_type, send.item_slug);
  if (!item) {
    await db.prepare('UPDATE newsletter_sends SET finished_at = ?1 WHERE id = ?2').bind(Date.now(), send.id).run();
    return { done: true, nextAfterId: afterId, sent: 0, failed: 0 };
  }
  const { results: batch = [] } = await db
    .prepare(`SELECT id, email, lang, unsub_token FROM newsletter_subscribers WHERE status = 'active' AND id > ?1 ORDER BY id LIMIT ?2`)
    .bind(afterId, BATCH)
    .all<{ id: number; email: string; lang: string; unsub_token: string }>();
  let sent = 0;
  let failed = 0;
  for (const sub of batch) {
    const mail = newsletterEmail(item, sub);
    if (await sendMail({ to: sub.email, ...mail, tag: 'newsletter' })) sent++;
    else failed++;
  }
  const done = batch.length < BATCH;
  await db
    .prepare('UPDATE newsletter_sends SET sent_count = sent_count + ?1, fail_count = fail_count + ?2, finished_at = ?3 WHERE id = ?4')
    .bind(sent, failed, done ? Date.now() : null, send.id)
    .run();
  return { done, nextAfterId: batch.length ? batch[batch.length - 1].id : afterId, sent, failed };
}

/** Newest not-yet-announced, not-held item; records first sight and enforces the grace window. */
async function pickItem(db: D1): Promise<NewsletterItem | null> {
  const { results: announced = [] } = await db.prepare('SELECT item_type, item_slug FROM newsletter_sends').all<{ item_type: string; item_slug: string }>();
  const sent = new Set(announced.map((r) => `${r.item_type}:${r.item_slug}`));
  const now = Date.now();
  for (const it of listNewsletterItems()) {
    const key = `${it.type}:${it.slug}`;
    if (sent.has(key)) continue;
    const auto = await db
      .prepare('SELECT state, first_seen_at FROM newsletter_auto WHERE item_type = ?1 AND item_slug = ?2')
      .bind(it.type, it.slug)
      .first<{ state: string; first_seen_at: number }>();
    if (auto?.state === 'hold') continue;
    if (!auto) {
      await db
        .prepare('INSERT OR IGNORE INTO newsletter_auto (item_type, item_slug, state, first_seen_at) VALUES (?1, ?2, ?3, ?4)')
        .bind(it.type, it.slug, 'seen', now)
        .run();
      continue; // first sight → wait out the grace window
    }
    if (now - auto.first_seen_at < GRACE_MS) continue; // still inside the hold window
    const item = getNewsletterItem(it.type, it.slug);
    if (item) return item;
  }
  return null;
}

export async function GET(request: Request) {
  const { env } = await getCloudflareContext({ async: true });
  const secret = (env as { CRON_SECRET?: string }).CRON_SECRET;
  if (!authorize(request, secret)) return apiError(401, 'unauthorized');
  try {
    const db = await getDB();
    // Batch cursor per send (id of the last mailed active subscriber).
    await db
      .prepare('CREATE TABLE IF NOT EXISTS newsletter_auto_cursor (send_id INTEGER PRIMARY KEY, after_id INTEGER NOT NULL)')
      .run();

    // 1) finish any send already in flight (cron-started or admin-started).
    const active = await db
      .prepare('SELECT id, item_type, item_slug, finished_at FROM newsletter_sends WHERE finished_at IS NULL ORDER BY id ASC LIMIT 1')
      .first<SendRow>();
    if (active) {
      const cur = await db.prepare('SELECT after_id FROM newsletter_auto_cursor WHERE send_id = ?1').bind(active.id).first<{ after_id: number }>();
      const res = await sendBatch(db, active, cur?.after_id ?? 0);
      await db
        .prepare('INSERT INTO newsletter_auto_cursor (send_id, after_id) VALUES (?1, ?2) ON CONFLICT(send_id) DO UPDATE SET after_id = ?2')
        .bind(active.id, res.nextAfterId)
        .run();
      return apiOk({ action: 'continue', sendId: active.id, done: res.done, sent: res.sent, failed: res.failed });
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
    const batchRes = await sendBatch(db, { id: sendId, item_type: item.type, item_slug: item.slug, finished_at: null }, 0);
    await db
      .prepare('INSERT INTO newsletter_auto_cursor (send_id, after_id) VALUES (?1, ?2) ON CONFLICT(send_id) DO UPDATE SET after_id = ?2')
      .bind(sendId, batchRes.nextAfterId)
      .run();
    return apiOk({ action: 'start', sendId, item: item.slug, done: batchRes.done, sent: batchRes.sent, failed: batchRes.failed });
  } catch (err) {
    console.error('cron newsletter error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}

/** Admin hold/unhold: POST { type, slug, hold } with the cron secret — pins an item so
 *  the cron never announces it (manual admin send still works). */
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
    const now = Date.now();
    if (body?.hold) {
      await db
        .prepare(`INSERT INTO newsletter_auto (item_type, item_slug, state, first_seen_at, updated_at) VALUES (?1, ?2, 'hold', ?3, ?3)
                  ON CONFLICT(item_type, item_slug) DO UPDATE SET state = 'hold', updated_at = ?3`)
        .bind(type, slug, now)
        .run();
      return apiOk({ held: true });
    }
    await db
      .prepare('DELETE FROM newsletter_auto WHERE item_type = ?1 AND item_slug = ?2 AND state = \'hold\'')
      .bind(type, slug)
      .run();
    return apiOk({ held: false });
  } catch (err) {
    console.error('cron newsletter hold error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}
