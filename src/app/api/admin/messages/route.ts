import { getCloudflareContext } from '@opennextjs/cloudflare';
import { getDB, apiError, apiOk } from '@/lib/server/db';
import { getSessionUser } from '@/lib/server/auth';

export const dynamic = 'force-dynamic';

// Owner inboxes allowed to read the contact archive. Override with the ADMIN_EMAILS
// Worker variable (comma-separated). The account must also have a verified email, so
// registering one of these addresses without owning the mailbox grants nothing.
const DEFAULT_ADMINS = ['abdalganih1@gmail.com', 'info@abdalgani.com', 'info@technoenjaz.com'];

function adminEmails(): string[] {
  try {
    const raw = (getCloudflareContext().env as { ADMIN_EMAILS?: string }).ADMIN_EMAILS;
    if (raw) return raw.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
  } catch {}
  return DEFAULT_ADMINS;
}

/** GET ?before=<id> → latest 50 contact messages (newest first), admins only. */
export async function GET(request: Request) {
  try {
    const db = await getDB();
    const user = await getSessionUser(request, db);
    if (!user) return apiError(401, 'unauthorized');
    if (!user.email_verified || !adminEmails().includes(user.email.toLowerCase())) return apiError(403, 'forbidden');

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
