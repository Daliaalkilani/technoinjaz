import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllArticles, getArticleMeta, getArticleMarkdown, getArticleMarkdownEn, getRelatedArticles } from '@/lib/content/articles';
import { renderMarkdown } from '@/lib/markdown';
import ArticlesListing from '@/features/articles/ArticlesListing';
import ArticleDetailView from '@/features/articles/ArticleDetailView';
import ArticleBody from '@/features/articles/ArticleBody';
import ContentQA from '@/components/content/ContentQA';
import { ARTICLE_QA } from '@/data/qa/articles';
import { pageMetadata } from '@/seo/metadata';
import { JsonLd } from '@/seo/JsonLd';
import { webPage, itemList, blogPosting, breadcrumb, qaSchema } from '@/seo/schemas';
import { localizeHtmlLinks, type Lang } from '@/i18n/locale';

export const articleParams = () => getAllArticles().map((a) => ({ slug: a.slug }));

export const articlesMetadata = (lang: Lang): Metadata =>
  pageMetadata({
    lang,
    title: lang === 'en' ? 'Engineering Blog' : 'المدونة الهندسية',
    description:
      lang === 'en'
        ? 'Read the latest in-depth engineering articles on artificial intelligence, the Internet of Things and modern software systems, written by the Techno Enjaz team.'
        : 'استكشف أحدث المقالات الهندسية المتخصصة في الذكاء الاصطناعي، إنترنت الأشياء، وبناء الأنظمة البرمجية الحديثة الصادرة عن فريق تكنو إنجاز.',
    path: '/articles'
  });

export function ArticlesRoute({ lang }: { lang: Lang }) {
  const en = lang === 'en';
  const articles = getAllArticles();
  const listItems = articles.map((a) => ({
    name: en ? a.titleEn || a.title : a.title,
    path: `/articles/${a.slug}`
  }));

  return (
    <>
      <JsonLd
        data={[
          webPage({ lang, path: '/articles', name: en ? 'Engineering Blog' : 'المدونة الهندسية', type: 'CollectionPage' }),
          itemList(listItems, lang)
        ]}
      />
      <div className="tab-page-container tab-page-articles" style={{ padding: 0, maxWidth: '100%' }}>
        <ArticlesListing articles={articles} />
      </div>
    </>
  );
}

export function articleMetadata(lang: Lang, slug: string): Metadata {
  const article = getArticleMeta(slug);
  if (!article) return { title: lang === 'en' ? 'Article not found' : 'المقال غير موجود' };
  const en = lang === 'en';

  return pageMetadata({
    lang,
    title: en ? article.titleEn || article.title : article.seoTitle || article.title,
    description: en ? article.excerptEn || article.excerpt : article.metaDescription || article.excerpt,
    path: `/articles/${article.slug}`,
    image: article.image,
    type: 'article',
    publishedTime: `${article.publishedAt}T00:00:00+03:00`,
    modifiedTime: article.modifiedAt ? `${article.modifiedAt}T00:00:00+03:00` : undefined
  });
}

export async function ArticleRoute({ lang, slug }: { lang: Lang; slug: string }) {
  const article = getArticleMeta(slug);
  if (!article) notFound();
  const en = lang === 'en';

  // Only the body of the page language is rendered and shipped (falls back to the
  // Arabic body while an English translation is missing).
  const mdEn = en ? await getArticleMarkdownEn(slug) : null;
  const md = mdEn ?? (await getArticleMarkdown(slug));
  const { html, toc } = renderMarkdown(md, { stripLeadingH1: true, variant: 'article' });
  const bodyHtml = localizeHtmlLinks(lang, html);
  const related = getRelatedArticles(slug, 3);
  const qaItems = ARTICLE_QA[slug] ?? [];

  const breadcrumbItems = [
    { name: en ? 'Home' : 'الرئيسية', path: '/' },
    { name: en ? 'Articles' : 'المقالات', path: '/articles' },
    { name: en ? article.titleEn || article.title : article.title, path: `/articles/${article.slug}` }
  ];

  return (
    <>
      <JsonLd data={[blogPosting(article, lang), breadcrumb(breadcrumbItems, lang), ...(qaItems.length ? [qaSchema(qaItems, lang)] : [])]} />
      <div className="tab-page-container tab-page-article-detail" style={{ padding: 0, maxWidth: '100%' }}>
        <ArticleDetailView
          article={article}
          toc={toc}
          tocEn={mdEn ? toc : null}
          related={related}
          qa={<ContentQA items={qaItems} title="الأسئلة الشائعة حول المقال"  titleEn="Frequently Asked Questions" />}
        >
          <ArticleBody html={bodyHtml} htmlEn={mdEn ? bodyHtml : null} />
        </ArticleDetailView>
      </div>
    </>
  );
}
