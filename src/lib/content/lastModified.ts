import 'server-only';
import { execFileSync } from 'node:child_process';

// Last commit date of content files, for <lastmod> (sitemap) and dateModified (JSON-LD).
// Pages are prerendered at build time, where git is available; when it is not (shallow
// CI checkout, tarball deploy) the helpers return undefined and callers omit the field.
const cache = new Map<string, Date | undefined>();

export function gitLastModified(paths: string[]): Date | undefined {
  const key = paths.join('|');
  if (cache.has(key)) return cache.get(key);
  let date: Date | undefined;
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...paths], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim();
    date = out ? new Date(out) : undefined;
  } catch {
    date = undefined;
  }
  cache.set(key, date);
  return date;
}

/** A project's AR + EN page, its metadata entry and its FAQ. */
export const projectLastModified = (slug: string) =>
  gitLastModified([`src/content/projects/${slug}.md`, `src/content/projects-en/${slug}.md`]);

export const latest = (dates: (Date | undefined)[]) =>
  dates.reduce<Date | undefined>((a, b) => (b && (!a || b > a) ? b : a), undefined);
