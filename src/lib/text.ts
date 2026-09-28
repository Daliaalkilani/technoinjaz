export const plainExcerpt = (s: string, fallback?: string): string => {
  if (!s) return fallback ? plainExcerpt(fallback) : '';
  
  // Strip comments, internal metadata, and draft links
  let cleaned = s
    .replace(/<!--[\s\S]*?(?:-->|$)/g, '')
    .replace(/\*\*|__|`/g, '')
    .replace(/Filename:.*$/gim, '')
    .replace(/IMAGE SLOT.*$/gim, '')
    .replace(/FEATURED IMAGE.*$/gim, '')
    .replace(/https?:\/\/docs\.google\.com\S*/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if ((!cleaned || cleaned.includes('FEATURED IMAGE') || cleaned.includes('Filename:') || cleaned.includes('docs.google.com')) && fallback) {
    return plainExcerpt(fallback);
  }
  return cleaned;
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
