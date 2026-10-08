import type { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/content/projects';
import { getAllArticles } from '@/lib/content/articles';
import { teamMembers } from '@/data/teamData';
import { absoluteUrl } from '@/config/site';
import { gitLastModified, projectLastModified, latest } from '@/lib/content/lastModified';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  // Every URL serves both languages (client-side toggle) — declare ar/en alternates
  // so Google indexes one URL per page with correct hreflang annotations.
  const alt = (p: string) => ({
    alternates: {
      languages: { ar: absoluteUrl(p), en: absoluteUrl(p), 'x-default': absoluteUrl(p) }
    }
  });
  const s = (p: string, lastModified?: Date) => ({ url: absoluteUrl(p), ...alt(p), ...(lastModified ? { lastModified } : {}) });
  // Image sitemap entries help image search and AI answer engines attach the cover.
  const img = (src?: string) => (src ? { images: [absoluteUrl(src)] } : {});

  // <lastmod> = last commit touching the page's content (falls back to the article's
  // own dates); listing pages take the newest of their items.
  const projects = getAllProjects().map((p) => ({ p, lastModified: projectLastModified(p.slug) }));
  const articles = getAllArticles().map((a) => {
    const fromData = new Date(a.modifiedAt || a.publishedAt);
    const fromGit = gitLastModified([`src/content/articles/${a.slug}.md`, `src/content/articles-en/${a.slug}.md`]);
    return { a, lastModified: latest([Number.isNaN(fromData.getTime()) ? undefined : fromData, fromGit]) };
  });
  const projectsUpdated = latest(projects.map((x) => x.lastModified));
  const articlesUpdated = latest(articles.map((x) => x.lastModified));
  const teamUpdated = gitLastModified(['src/data/teamData.js']);

  return [
    s('/', latest([projectsUpdated, articlesUpdated])),
    s('/projects', projectsUpdated),
    ...projects.map(({ p, lastModified }) => ({ ...s(`/projects/${p.slug}`, lastModified), ...img(p.image) })),
    s('/articles', articlesUpdated),
    ...articles.map(({ a, lastModified }) => ({ ...s(`/articles/${a.slug}`, lastModified), ...img(a.image) })),
    s('/videos'),
    s('/library'),
    s('/faq', gitLastModified(['src/data/faqData.ts'])),
    s('/about', teamUpdated),
    s('/contact'),
    s('/privacy-policy'),
    // Real team member profiles (placeholders like "team-slot-5" are excluded —
    // they're unfilled seats, not searchable content).
    ...teamMembers
      .filter((m) => !m.isPlaceholder)
      .map((m) => ({ ...s(`/team/${m.id}`, teamUpdated), ...img(m.image) }))
  ];
}
