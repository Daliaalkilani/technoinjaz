import { getDB, apiError, apiOk, isSameOrigin, readJson } from '@/lib/server/db';
import { EMAIL_RE, hashPassword, createSession, setSessionCookie, issueVerificationToken, publicUser, type SessionUser } from '@/lib/server/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return apiError(403, 'forbidden');
  const body = await readJson(request);
  if (!body) return apiError(400, 'invalid_body');

  const name = typeof body.name === 'string' ? body.name.trim().replace(/\s+/g, ' ') : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (name.length < 2 || name.length > 80) return apiError(400, 'invalid_name');
  if (!EMAIL_RE.test(email) || email.length > 254) return apiError(400, 'invalid_email');
  if (password.length < 8) return apiError(400, 'weak_password');
  if (password.length > 256) return apiError(400, 'invalid_password');

  try {
    const db = await getDB();
    const existing = await db.prepare('SELECT id FROM users WHERE email = ?1').bind(email).first();
    if (existing) return apiError(409, 'email_taken');

    const now = Date.now();
    const passwordHash = await hashPassword(password);
    const inserted = await db
      .prepare('INSERT INTO users (email, name, password_hash, email_verified, created_at) VALUES (?1, ?2, ?3, 0, ?4) ON CONFLICT(email) DO NOTHING')
      .bind(email, name, passwordHash, now)
      .run();
    if (!inserted.meta?.changes) return apiError(409, 'email_taken');

    const userId = Number(inserted.meta.last_row_id);
    const user: SessionUser = { id: userId, email, name, email_verified: 0, created_at: now };

    await issueVerificationToken(db, userId, new URL(request.url).origin, email);
    const { token, expiresAt } = await createSession(db, userId);

    const res = apiOk({ user: publicUser(user) }, { status: 201 });
    setSessionCookie(res, token, expiresAt);
    return res;
  } catch (err) {
    console.error('register error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}
