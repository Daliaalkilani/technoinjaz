import type { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/content/projects';
import { getAllArticles } from '@/lib/content/articles';
import { teamMembers } from '@/data/teamData';
import { absoluteUrl } from '@/config/site';
import { execFileSync } from 'node:child_process';

// Last commit touching a project's AR/EN content, so crawlers re-fetch pages that changed.
// Falls back to no <lastmod> when git history is unavailable (e.g. shallow CI checkouts).
function projectLastModified(slug: string): Date | undefined {
  try {
    const out = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', `src/content/projects/${slug}.md`, `src/content/projects-en/${slug}.md`],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    ).trim();
    return out ? new Date(out) : undefined;
  } catch {
    return undefined;
  }
}

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
    ...getAllProjects().map((p) => {
      const lastModified = projectLastModified(p.slug);
      return { ...s(`/projects/${p.slug}`), ...(lastModified ? { lastModified } : {}), ...img(p.image) };
    }),
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
