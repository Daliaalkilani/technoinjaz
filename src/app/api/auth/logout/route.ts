import { getDB, apiError, apiOk, isSameOrigin } from '@/lib/server/db';
import { destroySession, clearSessionCookie } from '@/lib/server/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return apiError(403, 'forbidden');
  try {
    await destroySession(request, await getDB());
  } catch (err) {
    console.error('logout error', err instanceof Error ? err.message : 'unknown');
  }
  // Always clear the cookie, even if the DB delete failed.
  const res = apiOk({});
  clearSessionCookie(res);
  return res;
}
