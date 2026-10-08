import { getDB, apiError, apiOk } from '@/lib/server/db';
import { requireAdmin } from '@/lib/server/admin';

export const dynamic = 'force-dynamic';

type Row = { id: number; email: string; lang: string; status: string; created_at: number; confirmed_at: number | null; unsubscribed_at: number | null };

const iso = (ms: number | null) => (ms ? new Date(ms).toISOString() : '');
const csvCell = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);

/** GET → counts + latest 1000 subscribers; GET ?format=csv → CSV download (all rows). */
export async function GET(request: Request) {
  try {
    const db = await getDB();
    const admin = await requireAdmin(request, db);
    if ('error' in admin) return apiError(admin.error === 'unauthorized' ? 401 : 403, admin.error);

    const asCsv = new URL(request.url).searchParams.get('format') === 'csv';
    const { results = [] } = await db
      .prepare(
        `SELECT id, email, lang, status, created_at, confirmed_at, unsubscribed_at
           FROM newsletter_subscribers ORDER BY id DESC ${asCsv ? '' : 'LIMIT 1000'}`
      )
      .all<Row>();

    if (asCsv) {
      const lines = ['email,status,lang,subscribed_at,confirmed_at,unsubscribed_at'].concat(
        results.map((r) => [r.email, r.status, r.lang, iso(r.created_at), iso(r.confirmed_at), iso(r.unsubscribed_at)].map(csvCell).join(','))
      );
      // BOM so Excel opens the UTF-8 file correctly.
      return new Response('﻿' + lines.join('\r\n'), {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="techno-enjaz-subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
          'Cache-Control': 'no-store'
        }
      });
    }

    const counts = { active: 0, pending: 0, unsubscribed: 0 } as Record<string, number>;
    const { results: grouped = [] } = await db
      .prepare('SELECT status, COUNT(*) AS n FROM newsletter_subscribers GROUP BY status')
      .all<{ status: string; n: number }>();
    for (const g of grouped) counts[g.status] = g.n;
    return apiOk({ counts, subscribers: results });
  } catch (err) {
    console.error('admin subscribers error', err instanceof Error ? err.message : 'unknown');
    return apiError(500, 'server_error');
  }
}
