import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllArticles, getArticleMeta, getArticleMarkdown, getRelatedArticles } from '@/lib/content/articles';
import { renderMarkdown } from '@/lib/markdown';
import ArticleDetailView from '@/components/articles/ArticleDetailView';
import ArticleBody from '@/components/articles/ArticleBody';
import { SITE_URL } from '@/config/site';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((a) => ({
    slug: a.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleMeta(slug);
  if (!article) return { title: 'المقال غير موجود' };

  const title = `${article.seoTitle || article.title} | تكنو إنجاز`;
  const description = article.metaDescription || article.excerpt;
  const canonicalUrl = `${SITE_URL}/articles/${article.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.modifiedAt || article.publishedAt,
      images: [
        {
          url: article.image.startsWith('http') ? article.image : `${SITE_URL}${article.image}`,
          alt: article.title
        }
      ]
    }
  };
}

export default async function ArticlePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleMeta(slug);
  if (!article) notFound();

  const md = await getArticleMarkdown(slug);
  const { html, toc } = renderMarkdown(md, { stripLeadingH1: true, variant: 'article' });
  const related = getRelatedArticles(slug, 3);

  return (
    <ArticleDetailView article={article} toc={toc} related={related}>
      <ArticleBody html={html} />
    </ArticleDetailView>
  );
}
