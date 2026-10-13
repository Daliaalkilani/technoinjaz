import { getDB, apiError, apiOk, isSameOrigin, readJson } from '@/lib/server/db';
import { requireAdmin } from '@/lib/server/admin';
import { sendMail } from '@/lib/server/mail';
import { getNewsletterItem, listNewsletterItems, newsletterEmail, sendNextBatch, setAutoHold } from '@/lib/server/newsletter';

export const dynamic = 'force-dynamic';

/** GET → items that can be announced + past sends + auto-newsletter state per item
 *  ('seen' = waiting out the cron's grace window, 'hold' = never auto-announced). */
export async function GET(request: Request) {
  try {
    const db = await getDB();
    const admin = await requireAdmin(request, db);
    if ('error' in admin) return apiError(admin.error === 'unauthorized' ? 401 : 403, admin.error);
    const { results: sends = [] } = await db
      .prepare('SELECT id, item_type, item_slug, subject, sent_count, fail_count, total, created_by, created_at, finished_at FROM newsletter_sends ORDER BY id DESC LIMIT 50')
      .all();
    const { results: auto = [] } = await db
      .prepare('SELECT item_type, item_slug, state, first_seen_at FROM newsletter_auto')
      .all()
      .catch(() => ({ results: [] }));
    return apiOk({ items: listNewsletterItems(), sends, auto });
  } catch (err) {
    console.error('admin newsletter list error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}

/**
 * POST { mode: 'test', type, slug }            → sends the newsletter to the admin only
 * POST { mode: 'start', type, slug, force? }   → creates a send (refuses a repeat unless force)
 * POST { mode: 'continue', sendId }            → mails the next batch of active subscribers
 * POST { mode: 'hold', type, slug, hold }      → pins / releases an item for the auto newsletter
 */
export async function POST(request: Request) {
  if (!isSameOrigin(request)) return apiError(403, 'forbidden');
  const body = await readJson(request);
  try {
    const db = await getDB();
    const admin = await requireAdmin(request, db);
    if ('error' in admin) return apiError(admin.error === 'unauthorized' ? 401 : 403, admin.error);
    const mode = body?.mode;

    if (mode === 'test' || mode === 'start') {
      const item = getNewsletterItem(String(body?.type || ''), String(body?.slug || ''));
      if (!item) return apiError(400, 'invalid_item');

      if (mode === 'test') {
        const mail = newsletterEmail(item, { lang: 'ar', unsub_token: '0'.repeat(64) });
        const sent = await sendMail({ to: admin.user.email, ...mail, tag: 'newsletter-test' });
        return apiOk({ sent, to: admin.user.email });
      }

      const previous = await db
        .prepare('SELECT id, sent_count, created_at FROM newsletter_sends WHERE item_type = ?1 AND item_slug = ?2 ORDER BY id DESC LIMIT 1')
        .bind(item.type, item.slug)
        .first<{ id: number; sent_count: number; created_at: number }>();
      if (previous && body?.force !== true) return apiError(409, 'already_sent');

      const total = await db.prepare(`SELECT COUNT(*) AS n FROM newsletter_subscribers WHERE status = 'active'`).first<{ n: number }>();
      if (!total?.n) return apiError(400, 'no_subscribers');
      const res = await db
        .prepare('INSERT INTO newsletter_sends (item_type, item_slug, subject, total, created_by, created_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6)')
        .bind(item.type, item.slug, item.title, total.n, admin.user.email, Date.now())
        .run();
      return apiOk({ sendId: Number(res.meta?.last_row_id), total: total.n });
    }

    if (mode === 'continue') {
      // The cursor is kept server-side (shared with the cron); body.afterId is ignored.
      const res = await sendNextBatch(db, Number(body?.sendId));
      if (!res) return apiError(400, 'invalid_send');
      return apiOk(res);
    }

    if (mode === 'hold') {
      const type = String(body?.type || '');
      const slug = String(body?.slug || '');
      if (!getNewsletterItem(type, slug)) return apiError(400, 'invalid_item');
      await setAutoHold(db, type, slug, body?.hold === true);
      return apiOk({ held: body?.hold === true });
    }

    return apiError(400, 'invalid_mode');
  } catch (err) {
    console.error('admin newsletter send error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}
