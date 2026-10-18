import type { Metadata } from 'next';
import { articlesMetadata, ArticlesRoute } from '@/routes/articles';

export const dynamic = 'force-static';

export const metadata: Metadata = articlesMetadata('ar');

export default function ArticlesPage() {
  return <ArticlesRoute lang="ar" />;
}
