import type { Metadata } from 'next';
import { getAllArticles } from '@/lib/content/articles';
import ArticlesListing from '@/components/articles/ArticlesListing';
import { SITE_URL } from '@/config/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'المدونة الهندسية والتقنية المتقدمة | تكنو إنجاز',
  description: 'استكشف أحدث المقالات الهندسية المتخصصة في الذكاء الاصطناعي، إنترنت الأشياء، وبناء الأنظمة البرمجية الحديثة الصادرة عن فريق تكنو إنجاز.',
  alternates: {
    canonical: `${SITE_URL}/articles`
  }
};

export default function ArticlesPage() {
  const articles = getAllArticles();
  return <ArticlesListing articles={articles} />;
}
