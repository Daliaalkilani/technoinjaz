import { getDB, apiError, apiOk, isSameOrigin, readJson } from '@/lib/server/db';
import { getSessionUser, hashPassword, verifyPassword, readSessionToken, sha256Hex } from '@/lib/server/auth';
import { isRateLimited, HOUR } from '@/lib/server/rateLimit';

export const dynamic = 'force-dynamic';

/** POST { current, password } → changes the password; signs out every other session. */
export async function POST(request: Request) {
  if (!isSameOrigin(request)) return apiError(403, 'forbidden');
  const body = await readJson(request);
  const current = typeof body?.current === 'string' ? body.current : '';
  const password = typeof body?.password === 'string' ? body.password : '';
  if (password.length < 8) return apiError(400, 'weak_password');
  if (password.length > 256 || current.length > 256) return apiError(400, 'invalid_password');
  try {
    const db = await getDB();
    const user = await getSessionUser(request, db);
    if (!user) return apiError(401, 'unauthorized');
    if (await isRateLimited(db, [{ name: 'chpw:user', id: user.id, limit: 10, windowMs: HOUR }])) return apiError(429, 'rate_limited');
    const row = await db.prepare('SELECT password_hash FROM users WHERE id = ?1').bind(user.id).first<{ password_hash: string }>();
    if (!row || !(await verifyPassword(current, row.password_hash))) return apiError(400, 'wrong_password');

    const keep = await sha256Hex(readSessionToken(request) || '');
    await db.batch([
      db.prepare('UPDATE users SET password_hash = ?1 WHERE id = ?2').bind(await hashPassword(password), user.id),
      db.prepare('DELETE FROM sessions WHERE user_id = ?1 AND token != ?2').bind(user.id, keep),
      db.prepare('DELETE FROM password_reset_tokens WHERE user_id = ?1').bind(user.id)
    ]);
    return apiOk({ changed: true });
  } catch (err) {
    console.error('change-password error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}
