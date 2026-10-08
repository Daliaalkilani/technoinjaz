import { getDB, apiError, apiOk } from '@/lib/server/db';
import { requireAdmin } from '@/lib/server/admin';

export const dynamic = 'force-dynamic';

/** GET ?before=<id> → latest 50 contact messages (newest first), admins only. */
export async function GET(request: Request) {
  try {
    const db = await getDB();
    const admin = await requireAdmin(request, db);
    if ('error' in admin) return apiError(admin.error === 'unauthorized' ? 401 : 403, admin.error);

    const before = Number(new URL(request.url).searchParams.get('before')) || Number.MAX_SAFE_INTEGER;
    const { results = [] } = await db
      .prepare(
        `SELECT id, name, specialization, university, email, phone, inquiry, lang, email_sent, wa_sent, created_at
           FROM contact_messages WHERE id < ?1 ORDER BY id DESC LIMIT 50`
      )
      .bind(before)
      .all();
    const total = await db.prepare('SELECT COUNT(*) AS n FROM contact_messages').first<{ n: number }>();
    return apiOk({ messages: results, total: total?.n ?? 0 });
  } catch (err) {
    console.error('admin messages error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}
