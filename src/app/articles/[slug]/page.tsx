import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllArticles, getArticleMeta, getArticleMarkdown, getArticleMarkdownEn, getRelatedArticles } from '@/lib/content/articles';
import { renderMarkdown } from '@/lib/markdown';
import ArticleDetailView from '@/features/articles/ArticleDetailView';
import ArticleBody from '@/features/articles/ArticleBody';
import { pageMetadata } from '@/seo/metadata';
import ContentQA from '@/components/content/ContentQA';
import { ARTICLE_QA } from '@/data/qa/articles';
import { JsonLd } from '@/seo/JsonLd';
import { blogPosting, breadcrumb, qaSchema } from '@/seo/schemas';

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

  return pageMetadata({
    title: article.seoTitle || article.title,
    description: article.metaDescription || article.excerpt,
    path: `/articles/${article.slug}`,
    image: article.image,
    type: 'article',
    publishedTime: `${article.publishedAt}T00:00:00+03:00`,
    modifiedTime: article.modifiedAt ? `${article.modifiedAt}T00:00:00+03:00` : undefined
  });
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
  // English body: shipped in parallel so the client can flip languages without a reload.
  const mdEn = await getArticleMarkdownEn(slug);
  const htmlEn = mdEn ? renderMarkdown(mdEn, { stripLeadingH1: true, variant: 'article' }).html : null;
  const related = getRelatedArticles(slug, 3);
  const qaItems = ARTICLE_QA[slug] ?? [];

  const breadcrumbItems = [
    { name: 'الرئيسية', path: '/' },
    { name: 'المقالات', path: '/articles' },
    { name: article.title, path: `/articles/${article.slug}` }
  ];

  return (
    <>
      <JsonLd data={[blogPosting(article), breadcrumb(breadcrumbItems), ...(qaItems.length ? [qaSchema(qaItems)] : [])]} />
      <div className="tab-page-container tab-page-article-detail" style={{ padding: 0, maxWidth: '100%' }}>
        <ArticleDetailView
          article={article}
          toc={toc}
          related={related}
          qa={<ContentQA items={qaItems} title="الأسئلة الشائعة حول المقال" />}
        >
          <ArticleBody html={html} htmlEn={htmlEn} />
        </ArticleDetailView>
      </div>
    </>
  );
}
