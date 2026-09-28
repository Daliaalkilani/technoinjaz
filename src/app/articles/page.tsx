import type { Metadata } from 'next';
import { getAllArticles } from '@/lib/content/articles';
import ArticlesListing from '@/components/articles/ArticlesListing';
import { pageMetadata } from '@/seo/metadata';
import { JsonLd } from '@/seo/JsonLd';
import { webPage, itemList } from '@/seo/schemas';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'المدونة الهندسية والتقنية المتقدمة',
  description: 'استكشف أحدث المقالات الهندسية المتخصصة في الذكاء الاصطناعي، إنترنت الأشياء، وبناء الأنظمة البرمجية الحديثة الصادرة عن فريق تكنو إنجاز.',
  path: '/articles'
});

export default function ArticlesPage() {
  const articles = getAllArticles();
  const listItems = articles.map((a) => ({
    name: a.title,
    path: `/articles/${a.slug}`
  }));

  return (
    <>
      <JsonLd
        data={[
          webPage({ path: '/articles', name: 'المدونة الهندسية', type: 'CollectionPage' }),
          itemList(listItems)
        ]}
      />
      <div className="tab-page-container tab-page-articles" style={{ padding: 0, maxWidth: '100%' }}>
        <ArticlesListing articles={articles} />
      </div>
    </>
  );
}
