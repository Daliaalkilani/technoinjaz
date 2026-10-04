import { getDB, apiError, apiOk, isSameOrigin, readJson } from '@/lib/server/db';
import { getSessionUser } from '@/lib/server/auth';
import { blogArticlesData } from '@/data/blogArticlesData';

export const dynamic = 'force-dynamic';

const MAX_BODY = 2000;
const articleExists = (slug: string) => blogArticlesData.some((a) => a.slug === slug);

interface CommentRow {
  id: number;
  parent_id: number | null;
  body: string;
  created_at: number;
  user_id: number;
  author_name: string;
  like_count: number;
  liked: number;
}

const toClient = (r: CommentRow, viewerId: number | null) => ({
  id: r.id,
  parentId: r.parent_id,
  body: r.body,
  createdAt: r.created_at,
  author: { name: r.author_name },
  likeCount: r.like_count,
  liked: Boolean(r.liked),
  mine: viewerId !== null && r.user_id === viewerId
});

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!articleExists(slug)) return apiError(404, 'not_found');
  try {
    const db = await getDB();
    const viewer = await getSessionUser(request, db);
    const viewerId = viewer?.id ?? null;
    const { results = [] } = await db
      .prepare(
        `SELECT c.id, c.parent_id, c.body, c.created_at, c.user_id, u.name AS author_name,
                (SELECT COUNT(*) FROM comment_likes l WHERE l.comment_id = c.id) AS like_count,
                EXISTS (SELECT 1 FROM comment_likes l WHERE l.comment_id = c.id AND l.user_id = ?2) AS liked
           FROM comments c JOIN users u ON u.id = c.user_id
          WHERE c.article_slug = ?1
          ORDER BY c.created_at ASC
          LIMIT 1000`
      )
      .bind(slug, viewerId ?? -1)
      .all<CommentRow>();
    return apiOk({ comments: results.map((r) => toClient(r, viewerId)) });
  } catch (err) {
    console.error('comments list error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!isSameOrigin(request)) return apiError(403, 'forbidden');
  const { slug } = await params;
  if (!articleExists(slug)) return apiError(404, 'not_found');

  const body = await readJson(request);
  const text = typeof body?.body === 'string' ? body.body.trim() : '';
  if (!text) return apiError(400, 'empty_comment');
  if (text.length > MAX_BODY) return apiError(400, 'comment_too_long');

  try {
    const db = await getDB();
    const user = await getSessionUser(request, db);
    if (!user) return apiError(401, 'unauthorized');

    // Replies nest one level only: replying to a reply attaches to its top-level parent.
    let parentId: number | null = null;
    if (body?.parentId !== undefined && body?.parentId !== null) {
      const pid = Number(body.parentId);
      if (!Number.isInteger(pid) || pid <= 0) return apiError(400, 'invalid_parent');
      const parent = await db
        .prepare('SELECT id, parent_id FROM comments WHERE id = ?1 AND article_slug = ?2')
        .bind(pid, slug)
        .first<{ id: number; parent_id: number | null }>();
      if (!parent) return apiError(400, 'invalid_parent');
      parentId = parent.parent_id ?? parent.id;
    }

    const now = Date.now();
    const res = await db
      .prepare('INSERT INTO comments (article_slug, user_id, parent_id, body, created_at) VALUES (?1, ?2, ?3, ?4, ?5)')
      .bind(slug, user.id, parentId, text, now)
      .run();

    return apiOk(
      {
        comment: toClient(
          { id: Number(res.meta?.last_row_id), parent_id: parentId, body: text, created_at: now, user_id: user.id, author_name: user.name, like_count: 0, liked: 0 },
          user.id
        )
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('comment create error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}
