import type { Viewport } from 'next';
import '@/styles/globals.css';
import '@/styles/article-content.css';
import { ThemeLanguageProvider } from '@/context/ThemeLanguageContext';
import { LoaderProvider } from '@/context/LoaderContext';
import { AppShell } from '@/components/layout/AppShell';
import { LEGACY_HASH_REDIRECT, THEME_LANG_BOOT } from '@/lib/inline-scripts';
import { JsonLd } from '@/seo/JsonLd';
import { organization, website } from '@/seo/schemas';

import { TeLoader } from '@/components/layout/TeLoader';
import type { Lang } from '@/i18n/locale';

// Shared <html> document of the two root layouts: app/(ar)/layout.tsx (/, RTL) and
// app/(en)/layout.tsx (/en, LTR). The language is fixed by the route, server-side.

// Readex Pro is self-hosted (public/fonts/readex-pro.css, linked below). A next/font
// copy used to be loaded as well: its two preloaded woff2 files were downloaded on
// every page but never used, since globals.css names the self-hosted family first.
export const rootViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' }
  ]
};

export function RootDocument({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const en = lang === 'en';
  return (
    <html lang={lang} dir={en ? 'ltr' : 'rtl'} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LEGACY_HASH_REDIRECT }} />
        <script dangerouslySetInnerHTML={{ __html: THEME_LANG_BOOT }} />
        <link rel="stylesheet" href="/loader/loader.css" />
        <link rel="preload" as="style" href="/fonts/readex-pro.css" />
        {/* Pre-bundle guard: skeleton placeholder words must never flash as dark text
            before Skeleton.css is applied. */}
        <style
          dangerouslySetInnerHTML={{
            __html: '.sk-text,.sk-text::before{color:transparent!important}',
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `if (window.trustedTypes && window.trustedTypes.createPolicy) { window.trustedTypes.createPolicy('default', { createHTML: (s) => s, createScriptURL: (s) => { const u = new URL(s, window.location.href); if (u.origin !== window.location.origin) { throw new TypeError('Untrusted script URL: ' + s); } return u.href; }, createScript: (s) => s }); }`,
          }}
        />
        <link rel="stylesheet" href="/fonts/readex-pro.css" />
        <link rel="alternate" type="application/rss+xml" title="تكنو إنجاز — المقالات الهندسية" href="/feed.xml" hrefLang="ar" />
        <style dangerouslySetInnerHTML={{ __html: 'html[data-skip-loader] #te-loader{display:none!important;}' }} />
        {/* Rocket artwork: start downloading in parallel with the HTML itself. On slow
            connections the loader background would otherwise sit as a plain dark box
            for seconds waiting for these two images to be discovered after CSS load.
            The home hero preload lives in app/page.tsx (it was fetched on every page). */}
        <link rel="preload" as="image" href="/loader/assets/rocket-body.webp" fetchPriority="high" />
        <link rel="preload" as="image" href="/loader/assets/launch-button.webp" fetchPriority="high" />
        <script src="/loader/loader.js" defer />
      </head>
      <body suppressHydrationWarning>
        <TeLoader />
        <ThemeLanguageProvider lang={lang}>
          <LoaderProvider>
            <AppShell>{children}</AppShell>
          </LoaderProvider>
        </ThemeLanguageProvider>
        <JsonLd data={[organization(lang), website(lang)]} />
      </body>
    </html>
  );
}
