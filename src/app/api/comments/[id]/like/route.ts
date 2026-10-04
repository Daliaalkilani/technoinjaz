import { getDB, apiError, apiOk, isSameOrigin } from '@/lib/server/db';
import { getSessionUser } from '@/lib/server/auth';

export const dynamic = 'force-dynamic';

async function mutate(request: Request, params: Promise<{ id: string }>, like: boolean) {
  if (!isSameOrigin(request)) return apiError(403, 'forbidden');
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) return apiError(400, 'invalid_comment');
  try {
    const db = await getDB();
    const user = await getSessionUser(request, db);
    if (!user) return apiError(401, 'unauthorized');

    const exists = await db.prepare('SELECT id FROM comments WHERE id = ?1').bind(id).first();
    if (!exists) return apiError(404, 'not_found');

    if (like) {
      await db
        .prepare('INSERT INTO comment_likes (comment_id, user_id, created_at) VALUES (?1, ?2, ?3) ON CONFLICT DO NOTHING')
        .bind(id, user.id, Date.now())
        .run();
    } else {
      await db.prepare('DELETE FROM comment_likes WHERE comment_id = ?1 AND user_id = ?2').bind(id, user.id).run();
    }
    const row = await db
      .prepare('SELECT COUNT(*) AS count FROM comment_likes WHERE comment_id = ?1')
      .bind(id)
      .first<{ count: number }>();
    return apiOk({ liked: like, likeCount: row?.count ?? 0 });
  } catch (err) {
    console.error('comment like error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}

export const POST = (request: Request, ctx: { params: Promise<{ id: string }> }) => mutate(request, ctx.params, true);
export const DELETE = (request: Request, ctx: { params: Promise<{ id: string }> }) => mutate(request, ctx.params, false);
