import { getDB, apiError, apiOk, isSameOrigin, readJson } from '@/lib/server/db';
import { getSessionUser, issueVerificationToken, sha256Hex } from '@/lib/server/auth';
import { isRateLimited, HOUR } from '@/lib/server/rateLimit';

export const dynamic = 'force-dynamic';

/**
 * POST { token }  → confirms the address the token was issued for.
 * POST { resend: true } (signed in) → issues a fresh token.
 */
export async function POST(request: Request) {
  if (!isSameOrigin(request)) return apiError(403, 'forbidden');
  const body = await readJson(request);
  if (!body) return apiError(400, 'invalid_body');

  try {
    const db = await getDB();

    if (body.resend === true) {
      const user = await getSessionUser(request, db);
      if (!user) return apiError(401, 'unauthorized');
      if (user.email_verified) return apiOk({ alreadyVerified: true });
      if (await isRateLimited(db, [{ name: 'verify:user', id: user.id, limit: 3, windowMs: HOUR }])) {
        return apiError(429, 'rate_limited');
      }
      const sent = await issueVerificationToken(db, user.id, user.email);
      return apiOk({ sent });
    }

    const token = typeof body.token === 'string' ? body.token : '';
    if (!/^[a-f0-9]{64}$/.test(token)) return apiError(400, 'invalid_token');

    const row = await db
      .prepare('SELECT user_id FROM email_verification_tokens WHERE token = ?1 AND expires_at > ?2')
      .bind(await sha256Hex(token), Date.now())
      .first<{ user_id: number }>();
    if (!row) return apiError(400, 'invalid_token');

    await db.batch([
      db.prepare('UPDATE users SET email_verified = 1 WHERE id = ?1').bind(row.user_id),
      db.prepare('DELETE FROM email_verification_tokens WHERE user_id = ?1').bind(row.user_id)
    ]);
    return apiOk({ verified: true });
  } catch (err) {
    console.error('verify-email error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}
