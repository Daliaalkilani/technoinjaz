import { getCloudflareContext } from '@opennextjs/cloudflare';
import { getDB, apiError, apiOk, isSameOrigin, readJson } from '@/lib/server/db';
import { getSessionUser, issueVerificationToken, sha256Hex } from '@/lib/server/auth';

export const dynamic = 'force-dynamic';

/**
 * POST { token }  → confirms the address the token was issued for.
 * POST { resend: true } (signed in) → issues a fresh token.
 *
 * TODO(owner): verification links are currently only written to the Worker logs
 * (see issueVerificationToken). Wire up real email delivery from info@technoenjaz.com
 * once that mailbox is ready.
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
      const env = (getCloudflareContext().env as { SEND_EMAIL?: (m: unknown) => Promise<void> }) || {};
      await issueVerificationToken(db, user.id, new URL(request.url).origin, user.email, env.SEND_EMAIL);
      return apiOk({ sent: true });
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
