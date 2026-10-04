import { apiError, apiOk } from '@/lib/server/db';
import { getSessionUser, publicUser } from '@/lib/server/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const user = await getSessionUser(request);
    return apiOk({ user: user ? publicUser(user) : null });
  } catch (err) {
    console.error('me error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}
