import { getDB, apiError, apiOk, isSameOrigin, readJson } from '@/lib/server/db';
import { requireAdmin } from '@/lib/server/admin';
import { sendMail } from '@/lib/server/mail';
import { getNewsletterItem, listNewsletterItems, newsletterEmail } from '@/lib/server/newsletter';

export const dynamic = 'force-dynamic';

// Subscribers mailed per request: keeps each Worker invocation well under the
// per-request subrequest limit; the admin page calls again until `done`.
const BATCH = 25;

/** GET → items that can be announced + past sends. */
export async function GET(request: Request) {
  try {
    const db = await getDB();
    const admin = await requireAdmin(request, db);
    if ('error' in admin) return apiError(admin.error === 'unauthorized' ? 401 : 403, admin.error);
    const { results: sends = [] } = await db
      .prepare('SELECT id, item_type, item_slug, subject, sent_count, fail_count, total, created_by, created_at, finished_at FROM newsletter_sends ORDER BY id DESC LIMIT 50')
      .all();
    return apiOk({ items: listNewsletterItems(), sends });
  } catch (err) {
    console.error('admin newsletter list error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}

/**
 * POST { mode: 'test', type, slug }            → sends the newsletter to the admin only
 * POST { mode: 'start', type, slug, force? }   → creates a send (refuses a repeat unless force)
 * POST { mode: 'continue', sendId, afterId }   → mails the next batch of active subscribers
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
      const sendId = Number(body?.sendId);
      const afterId = Number(body?.afterId) || 0;
      const send = await db
        .prepare('SELECT id, item_type, item_slug, finished_at FROM newsletter_sends WHERE id = ?1')
        .bind(sendId)
        .first<{ id: number; item_type: string; item_slug: string; finished_at: number | null }>();
      if (!send) return apiError(400, 'invalid_send');
      if (send.finished_at) return apiOk({ done: true, nextAfterId: afterId, sent: 0, failed: 0 });
      const item = getNewsletterItem(send.item_type, send.item_slug);
      if (!item) return apiError(400, 'invalid_item');

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
      return apiOk({ done, nextAfterId: batch.length ? batch[batch.length - 1].id : afterId, sent, failed });
    }

    return apiError(400, 'invalid_mode');
  } catch (err) {
    console.error('admin newsletter send error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}
