import { getDB, apiError, apiOk, isSameOrigin, readJson } from '@/lib/server/db';
import { EMAIL_RE } from '@/lib/server/auth';
import { isRateLimited, clientIp, HOUR } from '@/lib/server/rateLimit';
import { startSubscription } from '@/lib/server/newsletter';

export const dynamic = 'force-dynamic';

/**
 * POST { email, lang } → double opt-in: stores a pending subscription and emails a
 * confirmation link. Answers { status: 'pending' | 'already', sent }.
 */
export async function POST(request: Request) {
  if (!isSameOrigin(request)) return apiError(403, 'forbidden');
  const body = await readJson(request);
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const lang = body?.lang === 'en' ? 'en' : 'ar';
  if (!EMAIL_RE.test(email) || email.length > 254) return apiError(400, 'invalid_email');

  try {
    const db = await getDB();
    const limited = await isRateLimited(db, [
      { name: 'newsletter:ip', id: clientIp(request), limit: 10, windowMs: HOUR },
      { name: 'newsletter:email', id: email, limit: 3, windowMs: HOUR }
    ]);
    if (limited) return apiError(429, 'rate_limited');
    const result = await startSubscription(db, email, lang);
    return apiOk(result);
  } catch (err) {
    console.error('newsletter subscribe error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}
