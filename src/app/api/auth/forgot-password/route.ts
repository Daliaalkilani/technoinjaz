import { getDB, apiError, apiOk, isSameOrigin, readJson } from '@/lib/server/db';
import { EMAIL_RE, issuePasswordResetToken } from '@/lib/server/auth';
import { isRateLimited, clientIp, HOUR } from '@/lib/server/rateLimit';

export const dynamic = 'force-dynamic';

/**
 * POST { email } → emails a one-hour reset link when the account exists.
 * Always answers the same way, so the endpoint cannot be used to discover which
 * emails are registered.
 */
export async function POST(request: Request) {
  if (!isSameOrigin(request)) return apiError(403, 'forbidden');
  const body = await readJson(request);
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!EMAIL_RE.test(email) || email.length > 254) return apiError(400, 'invalid_email');

  try {
    const db = await getDB();
    const limited = await isRateLimited(db, [
      { name: 'forgot:ip', id: clientIp(request), limit: 5, windowMs: HOUR },
      { name: 'forgot:email', id: email, limit: 3, windowMs: HOUR }
    ]);
    if (limited) return apiError(429, 'rate_limited');

    const user = await db.prepare('SELECT id FROM users WHERE email = ?1').bind(email).first<{ id: number }>();
    if (user) await issuePasswordResetToken(db, user.id, email);
    return apiOk({ sent: true });
  } catch (err) {
    console.error('forgot-password error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}
