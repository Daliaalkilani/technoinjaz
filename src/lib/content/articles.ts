import 'server-only';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { blogArticlesData, type BlogArticle } from '@/data/blogArticlesData';

const DIR = path.join(process.cwd(), 'src/content/articles');

export const getAllArticles = (): BlogArticle[] => blogArticlesData;

export const getArticleMeta = (slug: string): BlogArticle | null =>
  blogArticlesData.find((a) => a.slug === slug) ?? null;

export async function getArticleMarkdown(slug: string): Promise<string> {
  return readFile(path.join(DIR, `${slug}.md`), 'utf8');
}

export function getRelatedArticles(slug: string, limit = 3): BlogArticle[] {
  const current = getArticleMeta(slug);
  if (!current) return blogArticlesData.slice(0, limit);

  const currentTags = new Set(current.tags || []);
  const candidates = blogArticlesData.filter((a) => a.slug !== slug);

  candidates.sort((a, b) => {
    // 1. Same categoryEn first
    const aSameCat = a.categoryEn === current.categoryEn ? 1 : 0;
    const bSameCat = b.categoryEn === current.categoryEn ? 1 : 0;
    if (aSameCat !== bSameCat) return bSameCat - aSameCat;

    // 2. Shared tags count
    const aSharedTags = (a.tags || []).filter((t) => currentTags.has(t)).length;
    const bSharedTags = (b.tags || []).filter((t) => currentTags.has(t)).length;
    if (aSharedTags !== bSharedTags) return bSharedTags - aSharedTags;

    // 3. Newest publishedAt descending
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  return candidates.slice(0, limit);
}
