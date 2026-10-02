import type { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/content/projects';
import { getAllArticles } from '@/lib/content/articles';
import { absoluteUrl } from '@/config/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const s = (p: string) => ({ url: absoluteUrl(p) });
  // Image sitemap entries help image search and AI answer engines attach the cover.
  const img = (src?: string) => (src ? { images: [absoluteUrl(src)] } : {});

  return [
    s('/'),
    s('/projects'),
    ...getAllProjects().map((p) => ({ ...s(`/projects/${p.slug}`), ...img(p.image) })),
    s('/articles'),
    ...getAllArticles().map((a) => ({
      url: absoluteUrl(`/articles/${a.slug}`),
      lastModified: a.modifiedAt ? new Date(a.modifiedAt) : new Date(a.publishedAt),
      ...img(a.image)
    })),
    s('/videos'),
    s('/library'),
    s('/faq'),
    s('/about'),
    s('/contact')
  ];
}
