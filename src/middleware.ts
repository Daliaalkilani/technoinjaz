import { NextResponse, type NextRequest } from 'next/server';

/**
 * SEO: the worker is reachable on both technoenjaz.com (canonical, attached as a
 * Cloudflare custom domain) and technoenjaz.abdalganih1.workers.dev (the raw
 * workers.dev subdomain). Two 200 copies of every page would split ranking
 * signals (duplicate content), so anything NOT arriving on the real domain is
 * 301-redirected to it. Only the apex host is treated as canonical — the
 * custom-domain attach never passes a Host header other than technoenjaz.com.
 */
const CANONICAL_HOST = 'technoenjaz.com';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  if (host === CANONICAL_HOST || host === `www.${CANONICAL_HOST}`) {
    return NextResponse.next();
  }

  // workers.dev (or any other host): permanent redirect to the canonical domain
  url.host = CANONICAL_HOST;
  url.protocol = 'https:';
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)']
};
