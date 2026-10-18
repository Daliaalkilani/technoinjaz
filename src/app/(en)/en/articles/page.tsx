import type { Metadata } from 'next';
import { articlesMetadata, ArticlesRoute } from '@/routes/articles';

export const dynamic = 'force-static';

export const metadata: Metadata = articlesMetadata('en');

export default function ArticlesPage() {
  return <ArticlesRoute lang="en" />;
}
