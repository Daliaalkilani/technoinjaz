import type { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/content/projects';
import { getAllArticles } from '@/lib/content/articles';
import { absoluteUrl } from '@/config/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const s = (p: string) => ({ url: absoluteUrl(p) });

  return [
    s('/'),
    s('/projects'),
    ...getAllProjects().map((p) => s(`/projects/${p.slug}`)),
    s('/articles'),
    ...getAllArticles().map((a) => ({
      url: absoluteUrl(`/articles/${a.slug}`),
      lastModified: a.modifiedAt ? new Date(a.modifiedAt) : new Date(a.publishedAt)
    })),
    s('/videos'),
    s('/faq'),
    s('/about'),
    s('/contact')
  ];
}
