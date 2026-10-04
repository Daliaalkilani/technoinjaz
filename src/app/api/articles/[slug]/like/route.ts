import { getDB, apiError, apiOk, isSameOrigin, type D1 } from '@/lib/server/db';
import { getSessionUser } from '@/lib/server/auth';
import { blogArticlesData } from '@/data/blogArticlesData';

export const dynamic = 'force-dynamic';

const articleExists = (slug: string) => blogArticlesData.some((a) => a.slug === slug);

async function state(db: D1, slug: string, userId: number | null) {
  const row = await db
    .prepare(
      `SELECT COUNT(*) AS count,
              COALESCE(SUM(CASE WHEN user_id = ?2 THEN 1 ELSE 0 END), 0) AS liked
         FROM article_likes WHERE article_slug = ?1`
    )
    .bind(slug, userId ?? -1)
    .first<{ count: number; liked: number }>();
  return { count: row?.count ?? 0, liked: Boolean(row?.liked) };
}

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!articleExists(slug)) return apiError(404, 'not_found');
  try {
    const db = await getDB();
    const user = await getSessionUser(request, db);
    return apiOk(await state(db, slug, user?.id ?? null));
  } catch (err) {
    console.error('article like get error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}

async function mutate(request: Request, params: Promise<{ slug: string }>, like: boolean) {
  if (!isSameOrigin(request)) return apiError(403, 'forbidden');
  const { slug } = await params;
  if (!articleExists(slug)) return apiError(404, 'not_found');
  try {
    const db = await getDB();
    const user = await getSessionUser(request, db);
    if (!user) return apiError(401, 'unauthorized');
    if (like) {
      await db
        .prepare('INSERT INTO article_likes (article_slug, user_id, created_at) VALUES (?1, ?2, ?3) ON CONFLICT DO NOTHING')
        .bind(slug, user.id, Date.now())
        .run();
    } else {
      await db.prepare('DELETE FROM article_likes WHERE article_slug = ?1 AND user_id = ?2').bind(slug, user.id).run();
    }
    return apiOk(await state(db, slug, user.id));
  } catch (err) {
    console.error('article like error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}

export const POST = (request: Request, ctx: { params: Promise<{ slug: string }> }) => mutate(request, ctx.params, true);
export const DELETE = (request: Request, ctx: { params: Promise<{ slug: string }> }) => mutate(request, ctx.params, false);
