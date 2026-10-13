import { getDB, apiError, apiOk, isSameOrigin } from '@/lib/server/db';
import { getSessionUser } from '@/lib/server/auth';
import { isAdminUser } from '@/lib/server/admin';

export const dynamic = 'force-dynamic';

/**
 * DELETE → removes a comment (its author, or a site owner moderating). Deleting a
 * top-level comment removes its replies too; likes of all removed comments go with them.
 */
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isSameOrigin(request)) return apiError(403, 'forbidden');
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) return apiError(400, 'invalid_comment');
  try {
    const db = await getDB();
    const user = await getSessionUser(request, db);
    if (!user) return apiError(401, 'unauthorized');
    const row = await db.prepare('SELECT id, user_id FROM comments WHERE id = ?1').bind(id).first<{ id: number; user_id: number }>();
    if (!row) return apiError(404, 'not_found');
    if (row.user_id !== user.id && !isAdminUser(user)) return apiError(403, 'forbidden');

    await db.batch([
      db.prepare('DELETE FROM comment_likes WHERE comment_id IN (SELECT id FROM comments WHERE id = ?1 OR parent_id = ?1)').bind(id),
      db.prepare('DELETE FROM comments WHERE parent_id = ?1').bind(id),
      db.prepare('DELETE FROM comments WHERE id = ?1').bind(id)
    ]);
    return apiOk({ deleted: true });
  } catch (err) {
    console.error('comment delete error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}
