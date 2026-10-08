import { getDB, apiError, apiOk } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

const TOKEN_RE = /^[a-f0-9]{64}$/;

/**
 * POST { token } (from the /newsletter page) or POST ?token=… with the RFC 8058 body
 * "List-Unsubscribe=One-Click" (mail clients' one-click button — cross-origin by
 * design, so no Origin check; the unguessable token is the authorisation).
 * GET never unsubscribes: link scanners and prefetchers follow GET links.
 */
export async function POST(request: Request) {
  const url = new URL(request.url);
  let token = url.searchParams.get('token') || '';
  if (!token) {
    try {
      const body = (await request.json()) as { token?: unknown };
      token = typeof body?.token === 'string' ? body.token : '';
    } catch {}
  }
  if (!TOKEN_RE.test(token)) return apiError(400, 'invalid_token');
  try {
    const db = await getDB();
    const row = await db
      .prepare('SELECT id, email, status FROM newsletter_subscribers WHERE unsub_token = ?1')
      .bind(token)
      .first<{ id: number; email: string; status: string }>();
    if (!row) return apiError(400, 'invalid_token');
    if (row.status !== 'unsubscribed') {
      await db
        .prepare(`UPDATE newsletter_subscribers SET status = 'unsubscribed', unsubscribed_at = ?1, confirm_token = NULL WHERE id = ?2`)
        .bind(Date.now(), row.id)
        .run();
    }
    return apiOk({ unsubscribed: true, email: row.email });
  } catch (err) {
    console.error('newsletter unsubscribe error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}
