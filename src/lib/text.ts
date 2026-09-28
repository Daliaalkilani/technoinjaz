export const plainExcerpt = (s: string, fallback?: string): string => {
  if (!s) return fallback ? plainExcerpt(fallback) : '';
  if (s.startsWith('<!--') && !s.includes('-->')) {
    return fallback ? plainExcerpt(fallback) : '';
  }
  return s
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\*\*|__|`/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

const SCHEMA_TYPES = new Set([
  'WebPage',
  'BreadcrumbList',
  'Organization',
  'ImageObject',
  'CreativeWork',
  'FAQPage',
  'Article',
  'BlogPosting'
]);

export const projectTags = (tags: string[]): string[] =>
  (tags || []).filter((t) => !SCHEMA_TYPES.has(t));
