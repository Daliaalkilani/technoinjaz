import { getDB, apiError, apiOk, isSameOrigin, readJson } from '@/lib/server/db';
import { getSessionUser, verifyPassword, clearSessionCookie } from '@/lib/server/auth';
import { isRateLimited, HOUR } from '@/lib/server/rateLimit';

export const dynamic = 'force-dynamic';

/**
 * DELETE { password } → permanently deletes the signed-in account and everything tied to
 * it (sessions, tokens, comments + replies to them, likes, saved items). Required by the
 * privacy policy's right to erasure; the password confirms intent.
 */
export async function DELETE(request: Request) {
  if (!isSameOrigin(request)) return apiError(403, 'forbidden');
  const body = await readJson(request);
  const password = typeof body?.password === 'string' ? body.password : '';
  try {
    const db = await getDB();
    const user = await getSessionUser(request, db);
    if (!user) return apiError(401, 'unauthorized');
    if (await isRateLimited(db, [{ name: 'delacct:user', id: user.id, limit: 5, windowMs: HOUR }])) return apiError(429, 'rate_limited');
    const row = await db.prepare('SELECT password_hash FROM users WHERE id = ?1').bind(user.id).first<{ password_hash: string }>();
    if (!row || !(await verifyPassword(password, row.password_hash))) return apiError(400, 'wrong_password');

    // Explicit deletes (not only ON DELETE CASCADE) so nothing is left behind even if
    // foreign-key enforcement were off.
    const uid = user.id;
    await db.batch([
      db.prepare('DELETE FROM comment_likes WHERE user_id = ?1 OR comment_id IN (SELECT id FROM comments WHERE user_id = ?1 OR parent_id IN (SELECT id FROM comments WHERE user_id = ?1))').bind(uid),
      db.prepare('DELETE FROM comments WHERE parent_id IN (SELECT id FROM comments WHERE user_id = ?1)').bind(uid),
      db.prepare('DELETE FROM comments WHERE user_id = ?1').bind(uid),
      db.prepare('DELETE FROM article_likes WHERE user_id = ?1').bind(uid),
      db.prepare('DELETE FROM saved_items WHERE user_id = ?1').bind(uid),
      db.prepare('DELETE FROM email_verification_tokens WHERE user_id = ?1').bind(uid),
      db.prepare('DELETE FROM password_reset_tokens WHERE user_id = ?1').bind(uid),
      db.prepare('DELETE FROM sessions WHERE user_id = ?1').bind(uid),
      db.prepare('DELETE FROM users WHERE id = ?1').bind(uid)
    ]);
    const res = apiOk({ deleted: true });
    clearSessionCookie(res);
    return res;
  } catch (err) {
    console.error('account delete error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}
