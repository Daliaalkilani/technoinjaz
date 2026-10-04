import { getDB, apiError, apiOk } from '@/lib/server/db';
import { getSessionUser } from '@/lib/server/auth';
import { blogArticlesData } from '@/data/blogArticlesData';

export const dynamic = 'force-dynamic';

/** The signed-in user's own comments and replies, newest first (profile page). */
export async function GET(request: Request) {
  try {
    const db = await getDB();
    const user = await getSessionUser(request, db);
    if (!user) return apiError(401, 'unauthorized');
    const { results = [] } = await db
      .prepare(
        `SELECT c.id, c.article_slug, c.parent_id, c.body, c.created_at,
                (SELECT COUNT(*) FROM comment_likes l WHERE l.comment_id = c.id) AS like_count
           FROM comments c
          WHERE c.user_id = ?1
          ORDER BY c.created_at DESC
          LIMIT 200`
      )
      .bind(user.id)
      .all<{ id: number; article_slug: string; parent_id: number | null; body: string; created_at: number; like_count: number }>();
    return apiOk({
      comments: results.map((r) => {
        const article = blogArticlesData.find((a) => a.slug === r.article_slug);
        return {
          id: r.id,
          articleSlug: r.article_slug,
          articleTitle: article?.title ?? r.article_slug,
          articleTitleEn: article?.titleEn ?? article?.title ?? r.article_slug,
          parentId: r.parent_id,
          body: r.body,
          createdAt: r.created_at,
          likeCount: r.like_count
        };
      })
    });
  } catch (err) {
    console.error('my comments error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}
