import { getDB, apiError, apiOk, isSameOrigin, readJson } from '@/lib/server/db';
import { hashPassword, sha256Hex, createSession, setSessionCookie, publicUser, type SessionUser } from '@/lib/server/auth';
import { isRateLimited, clientIp, HOUR } from '@/lib/server/rateLimit';

export const dynamic = 'force-dynamic';

/**
 * POST { token, password } → sets a new password from an emailed reset link.
 * The token is single-use; every existing session of the account is signed out, the
 * email counts as verified (the link proved ownership) and a fresh session is issued.
 */
export async function POST(request: Request) {
  if (!isSameOrigin(request)) return apiError(403, 'forbidden');
  const body = await readJson(request);
  const token = typeof body?.token === 'string' ? body.token : '';
  const password = typeof body?.password === 'string' ? body.password : '';
  if (!/^[a-f0-9]{64}$/.test(token)) return apiError(400, 'invalid_token');
  if (password.length < 8) return apiError(400, 'weak_password');
  if (password.length > 256) return apiError(400, 'invalid_password');

  try {
    const db = await getDB();
    if (await isRateLimited(db, [{ name: 'reset:ip', id: clientIp(request), limit: 10, windowMs: HOUR }])) {
      return apiError(429, 'rate_limited');
    }

    const row = await db
      .prepare('SELECT user_id FROM password_reset_tokens WHERE token = ?1 AND expires_at > ?2')
      .bind(await sha256Hex(token), Date.now())
      .first<{ user_id: number }>();
    if (!row) return apiError(400, 'invalid_token');

    const passwordHash = await hashPassword(password);
    await db.batch([
      db.prepare('UPDATE users SET password_hash = ?1, email_verified = 1 WHERE id = ?2').bind(passwordHash, row.user_id),
      db.prepare('DELETE FROM password_reset_tokens WHERE user_id = ?1').bind(row.user_id),
      db.prepare('DELETE FROM email_verification_tokens WHERE user_id = ?1').bind(row.user_id),
      db.prepare('DELETE FROM sessions WHERE user_id = ?1').bind(row.user_id)
    ]);

    const user = await db
      .prepare('SELECT id, email, name, email_verified, created_at FROM users WHERE id = ?1')
      .bind(row.user_id)
      .first<SessionUser>();
    if (!user) return apiError(400, 'invalid_token');
    const { token: session, expiresAt } = await createSession(db, user.id);
    const res = apiOk({ user: publicUser(user) });
    setSessionCookie(res, session, expiresAt);
    return res;
  } catch (err) {
    console.error('reset-password error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}
