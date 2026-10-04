import type { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/content/projects';
import { getAllArticles } from '@/lib/content/articles';
import { teamMembers } from '@/data/teamData';
import { absoluteUrl } from '@/config/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  // Every URL serves both languages (client-side toggle) — declare ar/en alternates
  // so Google indexes one URL per page with correct hreflang annotations.
  const alt = (p: string) => ({
    alternates: {
      languages: { ar: absoluteUrl(p), en: absoluteUrl(p), 'x-default': absoluteUrl(p) }
    }
  });
  const s = (p: string) => ({ url: absoluteUrl(p), ...alt(p) });
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
    s('/contact'),
    s('/privacy-policy'),
    // Real team member profiles (placeholders like "team-slot-5" are excluded —
    // they're unfilled seats, not searchable content).
    ...teamMembers
      .filter((m) => !m.isPlaceholder)
      .map((m) => ({ ...s(`/team/${m.id}`), ...(m.avatar ? img(m.avatar) : {}) }))
  ];
}
