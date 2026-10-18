import type { Metadata } from 'next';
import { articleParams, articleMetadata, ArticleRoute } from '@/routes/articles';

export const dynamic = 'force-static';
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = articleParams;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return articleMetadata('ar', (await params).slug);
}

export default async function ArticlePage({ params }: Props) {
  return <ArticleRoute lang="ar" slug={(await params).slug} />;
}
