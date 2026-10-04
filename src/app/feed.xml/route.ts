import { getAllArticles } from '@/lib/content/articles';
import { SITE_URL } from '@/config/site';

export const dynamic = 'force-static';

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(): Promise<Response> {
  const articles = getAllArticles()
    .slice()
    .sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))
    .slice(0, 20);

  const items = articles
    .map((a) => {
      const url = `${SITE_URL}/articles/${a.slug}`;
      const img = a.image ? `${SITE_URL}${a.image}` : `${SITE_URL}/og-image.png`;
      return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${a.publishedAt}T00:00:00+03:00`).toUTCString()}</pubDate>
      <description>${escapeXml(a.metaDescription || a.excerpt)}</description>
      <enclosure url="${img}" type="image/avif" length="40000"/>
      ${a.category ? `<category>${escapeXml(a.category)}</category>` : ''}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>تكنو إنجاز | Techno Enjaz — المقالات الهندسية</title>
    <link>${SITE_URL}/articles</link>
    <description>مقالات وأبحاث هندسية: ذكاء اصطناعي، إنترنت الأشياء، نظم سحابية، وتوأم رقمي — من مكتب تكنو إنجاز</description>
    <language>ar</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' }
  });
}
