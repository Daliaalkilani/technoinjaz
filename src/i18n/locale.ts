// URL-based locales: Arabic (default) lives at the root, English under /en.
// Shared by server (metadata, sitemap, JSON-LD) and client (links, language switch).

export type Lang = 'ar' | 'en';

export const DEFAULT_LANG: Lang = 'ar';
export const EN_PREFIX = '/en';

/** First path segments that are pages (and so have an /en twin). Anything else —
 *  /api, /images, /docs, /feed.xml, /_next … — is never prefixed. */
const PAGE_SEGMENTS = new Set([
  '',
  'projects',
  'articles',
  'videos',
  'library',
  'faq',
  'about',
  'contact',
  'privacy-policy',
  'team',
  'login',
  'register',
  'account',
  'reset-password',
  'newsletter',
  'admin',
  'access-denied',
  'connection-error',
  'server-error',
  'offline'
]);

const splitSuffix = (href: string): [string, string] => {
  const i = href.search(/[?#]/);
  return i === -1 ? [href, ''] : [href.slice(0, i), href.slice(i)];
};

export const isEnPath = (pathname: string) => pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`);

/** '/en/about' → '/about', '/en' → '/' (Arabic paths are returned unchanged). */
export function stripLocale(pathname: string): string {
  if (!isEnPath(pathname)) return pathname || '/';
  return pathname.slice(EN_PREFIX.length) || '/';
}

/** Language-neutral page path → the path of that page in `lang`: ('en', '/about') → '/en/about'.
 *  Query and hash are kept; non-page, external and already-localized hrefs pass through. */
export function localePath(lang: Lang, href: string): string {
  if (lang !== 'en' || !href.startsWith('/') || href.startsWith('//')) return href;
  const [path, suffix] = splitSuffix(href);
  if (isEnPath(path)) return href;
  if (!PAGE_SEGMENTS.has(path.split('/')[1] ?? '')) return href;
  return `${EN_PREFIX}${path === '/' ? '' : path}${suffix}`;
}

/** The same page in the other language (for the language switch). */
export function switchLocalePath(target: Lang, href: string): string {
  const [path, suffix] = splitSuffix(href);
  return localePath(target, `${stripLocale(path)}${suffix}`);
}

/** Prefix the internal page links of a server-rendered HTML fragment (markdown bodies). */
export function localizeHtmlLinks(lang: Lang, html: string): string {
  if (lang !== 'en') return html;
  return html.replace(/href="(\/[^"]*)"/g, (_, href: string) => `href="${localePath(lang, href)}"`);
}

/** Request header set by the middleware with the language of the requested URL
 *  (read by app/global-not-found.tsx, which has no route params). */
export const LANG_HEADER = 'x-te-lang';
