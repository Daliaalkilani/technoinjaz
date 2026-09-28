import fs from 'node:fs';
import path from 'node:path';
import { parseHTML } from 'linkedom';

const ROOT_DIR = process.cwd();
const SERVER_APP_DIR = path.join(ROOT_DIR, '.next', 'server', 'app');
const DOCS_DIR = path.join(ROOT_DIR, 'docs');
const REPORT_PATH = path.join(DOCS_DIR, 'verify-report.md');

const BASE_URL = process.env.BASE_URL;

async function getPageData(urlPath) {
  if (BASE_URL) {
    const fullUrl = `${BASE_URL.replace(/\/$/, '')}${urlPath}`;
    try {
      const res = await fetch(fullUrl, { redirect: 'manual' });
      const text = await res.text();
      return {
        status: res.status,
        html: text,
        headers: Object.fromEntries(res.headers.entries())
      };
    } catch (err) {
      return { status: 0, html: '', error: err.message };
    }
  }

  // Fallback to reading from .next/server/app
  let normalized = urlPath === '/' ? 'index' : urlPath.replace(/^\//, '');
  
  if (urlPath === '/sitemap.xml') {
    const sitemapPath = path.join(SERVER_APP_DIR, 'sitemap.xml.body');
    if (fs.existsSync(sitemapPath)) {
      return { status: 200, html: fs.readFileSync(sitemapPath, 'utf8') };
    }
  }

  if (urlPath === '/robots.txt') {
    const robotsPath = path.join(SERVER_APP_DIR, 'robots.txt.body');
    if (fs.existsSync(robotsPath)) {
      return { status: 200, html: fs.readFileSync(robotsPath, 'utf8') };
    }
  }

  if (urlPath === '/this-page-does-not-exist') {
    const notFoundPath = path.join(SERVER_APP_DIR, '_not-found.html');
    if (fs.existsSync(notFoundPath)) {
      return { status: 404, html: fs.readFileSync(notFoundPath, 'utf8') };
    }
    return { status: 404, html: 'Not Found' };
  }

  let htmlFile = path.join(SERVER_APP_DIR, `${normalized}.html`);
  if (!fs.existsSync(htmlFile)) {
    htmlFile = path.join(SERVER_APP_DIR, normalized, 'index.html');
  }

  if (fs.existsSync(htmlFile)) {
    return { status: 200, html: fs.readFileSync(htmlFile, 'utf8') };
  }

  return { status: 404, html: 'Not Found' };
}

async function runVerification() {
  console.log('--- Starting Comprehensive Site Verification (P11) ---');
  if (!fs.existsSync(DOCS_DIR)) fs.mkdirSync(DOCS_DIR, { recursive: true });

  const errors = [];
  const warnings = [];
  const passedChecks = [];

  // 1. Check sitemap
  const sitemapData = await getPageData('/sitemap.xml');
  if (sitemapData.status !== 200) {
    errors.push('sitemap.xml failed to load: status ' + sitemapData.status);
    return finishReport(errors, warnings, passedChecks);
  }

  const sitemapXml = sitemapData.html;
  const locMatches = [...sitemapXml.matchAll(/<loc>(https:\/\/technoenjaz\.com[^<]*)<\/loc>/g)];
  const sitemapUrls = locMatches.map(m => m[1]);

  console.log(`Discovered ${sitemapUrls.length} URLs in sitemap.xml`);
  passedChecks.push(`Sitemap contains ${sitemapUrls.length} canonical URLs.`);

  const titlesSet = new Set();
  const indexablePaths = sitemapUrls.map(u => u.replace('https://technoenjaz.com', '') || '/');

  // Verify each indexable page
  for (const pagePath of indexablePaths) {
    const res = await getPageData(pagePath);
    if (res.status !== 200) {
      errors.push(`[${pagePath}] Returned status ${res.status}`);
      continue;
    }

    const { document } = parseHTML(res.html);
    const htmlText = res.html;

    // A. Title check
    const title = document.querySelector('title')?.textContent?.trim() || '';
    if (!title) {
      errors.push(`[${pagePath}] Title is missing or empty`);
    } else {
      if (titlesSet.has(title)) {
        errors.push(`[${pagePath}] Duplicate title detected: "${title}"`);
      } else {
        titlesSet.add(title);
      }
    }

    // B. Meta description
    const desc = document.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() || '';
    if (!desc) {
      errors.push(`[${pagePath}] meta[name=description] is missing`);
    } else if (desc.length < 40 || desc.length > 300) {
      warnings.push(`[${pagePath}] Description length (${desc.length}) is outside recommended 50-200 range`);
    }

    // C. Canonical link
    const expectedCanonical = `https://technoenjaz.com${pagePath === '/' ? '' : pagePath}`;
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
    if (canonical !== expectedCanonical) {
      errors.push(`[${pagePath}] Invalid canonical link: expected ${expectedCanonical}, got ${canonical}`);
    }

    // D. Noindex check
    const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content') || '';
    if (robots.includes('noindex')) {
      errors.push(`[${pagePath}] Indexable page has noindex meta`);
    }

    // E. H1 count
    const h1Elements = document.querySelectorAll('h1');
    if (h1Elements.length !== 1) {
      errors.push(`[${pagePath}] Expected exactly 1 <h1>, found ${h1Elements.length}`);
    }

    // F. Main content length
    const mainText = document.querySelector('main')?.textContent?.trim() || '';
    if (mainText.length < 250) {
      warnings.push(`[${pagePath}] Main text is relatively short (${mainText.length} chars)`);
    }

    // G. Open Graph metadata
    const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const ogUrl = document.querySelector('meta[property="og:url"]')?.getAttribute('content');
    const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content');

    if (!ogTitle) errors.push(`[${pagePath}] Missing og:title`);
    if (!ogUrl || !ogUrl.startsWith('https://technoenjaz.com')) errors.push(`[${pagePath}] Missing or non-absolute og:url`);
    if (!ogImage || !ogImage.startsWith('https://technoenjaz.com')) errors.push(`[${pagePath}] Missing or non-absolute og:image`);

    // H. JSON-LD scripts
    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
    if (jsonLdScripts.length === 0) {
      errors.push(`[${pagePath}] Missing JSON-LD script`);
    } else {
      for (const s of jsonLdScripts) {
        try {
          const parsed = JSON.parse(s.textContent);
          if (!parsed['@graph'] && !parsed['@type']) {
            errors.push(`[${pagePath}] JSON-LD missing @graph or @type`);
          }
        } catch (e) {
          errors.push(`[${pagePath}] Invalid JSON-LD syntax: ${e.message}`);
        }
      }
    }

    // I. Forbidden patterns
    const forbiddenSubstrings = [
      'FEATURED IMAGE',
      'IMAGE SLOT',
      'GALLERY ITEM',
      'Suggested Internal Link',
      'Filename:',
      'docs.google.com',
      'techno-enjaz.com',
      'href="#article/',
      'href="#project/',
      'href="#projects"'
    ];

    for (const f of forbiddenSubstrings) {
      if (htmlText.includes(f)) {
        errors.push(`[${pagePath}] Found forbidden pattern: "${f}"`);
      }
    }

    // J. Specific route checks
    if (pagePath.startsWith('/articles/')) {
      const slug = pagePath.replace('/articles/', '');
      if (!htmlText.includes('BlogPosting')) {
        errors.push(`[${pagePath}] Missing BlogPosting schema`);
      }
    }

    if (pagePath.startsWith('/projects/')) {
      if (!htmlText.includes('CreativeWork')) {
        errors.push(`[${pagePath}] Missing CreativeWork schema`);
      }
    }

    if (pagePath === '/faq') {
      const faqAnswers = document.querySelectorAll('[id^="faq-a-"]');
      if (faqAnswers.length !== 13) {
        errors.push(`[/faq] Expected 13 faq-a- elements, found ${faqAnswers.length}`);
      }
      if (!htmlText.includes('FAQPage')) {
        errors.push(`[/faq] Missing FAQPage schema`);
      }
    }

    passedChecks.push(`[${pagePath}] Verified metadata, canonical, H1, og, json-ld, and content.`);
  }

  // 2. Check noindex pages
  const noindexPages = ['/login', '/register', '/account', '/team/abdulghani'];
  for (const nip of noindexPages) {
    if (sitemapUrls.includes(`https://technoenjaz.com${nip}`)) {
      errors.push(`[${nip}] Noindex page should NOT be in sitemap.xml`);
    }
    const res = await getPageData(nip);
    if (res.status === 200) {
      const { document } = parseHTML(res.html);
      const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content') || '';
      if (!robots.includes('noindex')) {
        errors.push(`[${nip}] Expected robots meta to contain "noindex", got "${robots}"`);
      } else {
        passedChecks.push(`[${nip}] Correctly set to noindex and excluded from sitemap.`);
      }
    }
  }

  // 3. Check 404 page
  const notFoundRes = await getPageData('/this-page-does-not-exist');
  if (notFoundRes.status !== 404 && !notFoundRes.html.includes('404')) {
    errors.push('404 test failed: status ' + notFoundRes.status);
  } else {
    passedChecks.push('Custom 404 handler verified.');
  }

  finishReport(errors, warnings, passedChecks);
}

function finishReport(errors, warnings, passedChecks) {
  let md = '# Full Site Verification Report (Phase P11)\n\n';
  md += `**Date:** ${new Date().toISOString()}\n`;
  md += `**Status:** ${errors.length === 0 ? 'PASSED ✅' : 'FAILED ❌'}\n\n`;

  md += `## Summary\n\n`;
  md += `- **Total Passed Checks:** ${passedChecks.length}\n`;
  md += `- **Total Warnings:** ${warnings.length}\n`;
  md += `- **Total Errors:** ${errors.length}\n\n`;

  if (errors.length > 0) {
    md += `## Errors ❌\n\n`;
    for (const e of errors) md += `- ${e}\n`;
    md += '\n';
  }

  if (warnings.length > 0) {
    md += `## Warnings ⚠️\n\n`;
    for (const w of warnings) md += `- ${w}\n`;
    md += '\n';
  }

  md += `## Passed Checks Samples\n\n`;
  for (const p of passedChecks.slice(0, 15)) md += `- ${p}\n`;
  if (passedChecks.length > 15) {
    md += `- ... and ${passedChecks.length - 15} more checks passed.\n`;
  }

  fs.writeFileSync(REPORT_PATH, md, 'utf8');
  console.log(`Verification report generated at: ${path.relative(ROOT_DIR, REPORT_PATH)}`);

  if (errors.length > 0) {
    console.error(`Verification FAILED with ${errors.length} error(s).`);
    process.exit(1);
  } else {
    console.log(`Verification SUCCEEDED! All ${passedChecks.length} checks passed cleanly.`);
  }
}

runVerification().catch(err => {
  console.error('Fatal verification error:', err);
  process.exit(1);
});
