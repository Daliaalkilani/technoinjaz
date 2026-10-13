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

// Local `next dev` / `wrangler dev` (and the Playwright suite on :4173) must stay local
// instead of being bounced to production.
const LOCAL_HOST_RE = /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/;

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  if (host === CANONICAL_HOST || LOCAL_HOST_RE.test(host)) {
    return NextResponse.next();
  }

  // www, workers.dev or any other host: permanent redirect to the canonical domain
  // (www used to answer 200 as well — a second indexable copy of every page).
  url.host = CANONICAL_HOST;
  url.protocol = 'https:';
  return NextResponse.redirect(url, 301);
}

// api/cron is excluded: the Worker's scheduled() handler calls it in-process with a
// synthetic request whose host is not the canonical one — a 301 here meant the cron
// route never ran. It is guarded by CRON_SECRET, not by host.
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api/cron).*)']
};
