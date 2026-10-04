import { getDB, apiError, apiOk, isSameOrigin, readJson, SLUG_RE } from '@/lib/server/db';
import { getSessionUser } from '@/lib/server/auth';

export const dynamic = 'force-dynamic';

const ITEM_TYPES = new Set(['project', 'video', 'article']);
const META_KEYS = ['title', 'titleEn', 'description', 'descriptionEn', 'category', 'categoryLabel', 'image', 'url', 'subtype', 'duration'] as const;

function parseItem(body: Record<string, unknown> | null) {
  const itemType = typeof body?.item_type === 'string' ? body.item_type : '';
  const itemSlug = typeof body?.item_slug === 'string' ? body.item_slug : '';
  if (!ITEM_TYPES.has(itemType) || !SLUG_RE.test(itemSlug)) return null;
  return { itemType, itemSlug };
}

/** Keeps only known string fields, each capped, so the stored snapshot stays small. */
function sanitizeMeta(raw: unknown): string | null {
  if (!raw || typeof raw !== 'object') return null;
  const out: Record<string, string> = {};
  for (const k of META_KEYS) {
    const v = (raw as Record<string, unknown>)[k];
    if (typeof v === 'string' && v) out[k] = v.slice(0, k.startsWith('description') ? 400 : 300);
  }
  // Only same-site paths or http(s) links are allowed for clickable fields.
  for (const k of ['image', 'url'] as const) {
    if (out[k] && !/^(\/(?!\/)|https?:\/\/)/.test(out[k])) delete out[k];
  }
  return Object.keys(out).length ? JSON.stringify(out) : null;
}

export async function GET(request: Request) {
  try {
    const db = await getDB();
    const user = await getSessionUser(request, db);
    if (!user) return apiError(401, 'unauthorized');
    const { results = [] } = await db
      .prepare('SELECT item_type, item_slug, meta, created_at FROM saved_items WHERE user_id = ?1 ORDER BY created_at DESC LIMIT 500')
      .bind(user.id)
      .all<{ item_type: string; item_slug: string; meta: string | null; created_at: number }>();
    return apiOk({
      items: results.map((r) => {
        let meta: Record<string, string> = {};
        try {
          meta = r.meta ? JSON.parse(r.meta) : {};
        } catch {}
        return { itemType: r.item_type, itemSlug: r.item_slug, createdAt: r.created_at, meta };
      })
    });
  } catch (err) {
    console.error('saved list error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return apiError(403, 'forbidden');
  const body = await readJson(request);
  const item = parseItem(body);
  if (!item) return apiError(400, 'invalid_item');
  try {
    const db = await getDB();
    const user = await getSessionUser(request, db);
    if (!user) return apiError(401, 'unauthorized');
    await db
      .prepare(
        `INSERT INTO saved_items (user_id, item_type, item_slug, meta, created_at) VALUES (?1, ?2, ?3, ?4, ?5)
         ON CONFLICT (user_id, item_type, item_slug) DO UPDATE SET meta = COALESCE(excluded.meta, saved_items.meta)`
      )
      .bind(user.id, item.itemType, item.itemSlug, sanitizeMeta(body?.meta), Date.now())
      .run();
    return apiOk({ saved: true });
  } catch (err) {
    console.error('saved create error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}

export async function DELETE(request: Request) {
  if (!isSameOrigin(request)) return apiError(403, 'forbidden');
  const item = parseItem(await readJson(request));
  if (!item) return apiError(400, 'invalid_item');
  try {
    const db = await getDB();
    const user = await getSessionUser(request, db);
    if (!user) return apiError(401, 'unauthorized');
    await db
      .prepare('DELETE FROM saved_items WHERE user_id = ?1 AND item_type = ?2 AND item_slug = ?3')
      .bind(user.id, item.itemType, item.itemSlug)
      .run();
    return apiOk({ saved: false });
  } catch (err) {
    console.error('saved delete error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}
