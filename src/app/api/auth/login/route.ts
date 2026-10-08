import { getDB, apiError, apiOk, isSameOrigin, readJson } from '@/lib/server/db';
import { createSession, setSessionCookie, verifyPassword, verifyDummy, publicUser, type SessionUser } from '@/lib/server/auth';
import { isRateLimited, clientIp, MIN } from '@/lib/server/rateLimit';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return apiError(403, 'forbidden');
  const body = await readJson(request);
  if (!body) return apiError(400, 'invalid_body');

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';
  if (!email || !password || password.length > 256) return apiError(401, 'invalid_credentials');

  try {
    const db = await getDB();
    // Brute-force guard: per IP and per targeted account.
    const limited = await isRateLimited(db, [
      { name: 'login:ip', id: clientIp(request), limit: 20, windowMs: 10 * MIN },
      { name: 'login:email', id: email, limit: 10, windowMs: 15 * MIN }
    ]);
    if (limited) return apiError(429, 'rate_limited');
    const row = await db
      .prepare('SELECT id, email, name, email_verified, created_at, password_hash FROM users WHERE email = ?1')
      .bind(email)
      .first<SessionUser & { password_hash: string }>();

    if (!row) {
      await verifyDummy(password);
      return apiError(401, 'invalid_credentials');
    }
    if (!(await verifyPassword(password, row.password_hash))) return apiError(401, 'invalid_credentials');

    const { password_hash: _omit, ...user } = row;
    const { token, expiresAt } = await createSession(db, user.id);
    const res = apiOk({ user: publicUser(user) });
    setSessionCookie(res, token, expiresAt);
    return res;
  } catch (err) {
    console.error('login error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}
