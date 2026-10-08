import { getDB, apiError, apiOk, isSameOrigin, readJson } from '@/lib/server/db';
import { sha256Hex } from '@/lib/server/auth';

export const dynamic = 'force-dynamic';

/** POST { token } → activates the subscription the emailed confirmation link belongs to. */
export async function POST(request: Request) {
  if (!isSameOrigin(request)) return apiError(403, 'forbidden');
  const body = await readJson(request);
  const token = typeof body?.token === 'string' ? body.token : '';
  if (!/^[a-f0-9]{64}$/.test(token)) return apiError(400, 'invalid_token');
  try {
    const db = await getDB();
    const row = await db
      .prepare(`SELECT id, email, status FROM newsletter_subscribers WHERE confirm_token = ?1 AND confirm_expires_at > ?2`)
      .bind(await sha256Hex(token), Date.now())
      .first<{ id: number; email: string; status: string }>();
    if (!row) return apiError(400, 'invalid_token');
    await db
      .prepare(`UPDATE newsletter_subscribers SET status = 'active', confirmed_at = ?1, confirm_token = NULL, confirm_expires_at = NULL, unsubscribed_at = NULL WHERE id = ?2`)
      .bind(Date.now(), row.id)
      .run();
    return apiOk({ confirmed: true, email: row.email });
  } catch (err) {
    console.error('newsletter confirm error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}
