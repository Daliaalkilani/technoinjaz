import type { Metadata, Viewport } from 'next';
import { Readex_Pro } from 'next/font/google';
import '@/styles/globals.css';
import 'katex/dist/katex.min.css';
import '@/styles/article-content.css';
import { ThemeLanguageProvider } from '@/context/ThemeLanguageContext';
import { LoaderProvider } from '@/context/LoaderContext';
import { AppShell } from '@/components/layout/AppShell';
import { LEGACY_HASH_REDIRECT, THEME_LANG_BOOT } from '@/lib/inline-scripts';
import { buildRootMetadata } from '@/seo/metadata';
import { JsonLd } from '@/seo/JsonLd';
import { organization, website } from '@/seo/schemas';

import { TeLoader } from '@/components/layout/TeLoader';

const readex = Readex_Pro({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-readex'
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' }
  ]
};

export const metadata: Metadata = buildRootMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className={readex.variable}>
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
            __html: `if (window.trustedTypes && window.trustedTypes.createPolicy) { window.trustedTypes.createPolicy('default', { createHTML: (s) => s }); }`,
          }}
        />
        <link rel="stylesheet" href="/fonts/readex-pro.css" />
        <link rel="alternate" type="application/rss+xml" title="تكنو إنجاز — المقالات الهندسية" href="/feed.xml" />
        <style dangerouslySetInnerHTML={{ __html: 'html[data-skip-loader] #te-loader{display:none!important;}' }} />
        {/* Rocket artwork: start downloading in parallel with the HTML itself. On slow
            connections the loader background would otherwise sit as a plain dark box
            for seconds waiting for these two images to be discovered after CSS load. */}
        <link rel="preload" as="image" href="/loader/assets/rocket-body.webp" fetchPriority="high" />
        <link rel="preload" as="image" href="/_img/images/home/hero-dark.640.avif" fetchPriority="high" media="(max-width: 768px)" />
        <link rel="preload" as="image" href="/_img/images/home/hero-dark.1280.avif" fetchPriority="high" media="(min-width: 769px)" />
        <link rel="preload" as="image" href="/loader/assets/launch-button.webp" fetchPriority="high" />
        <script src="/loader/loader.js" defer />
      </head>
      <body className={readex.className} suppressHydrationWarning>
        <TeLoader />
        <ThemeLanguageProvider>
          <LoaderProvider>
            <AppShell>{children}</AppShell>
          </LoaderProvider>
        </ThemeLanguageProvider>
        <JsonLd data={[organization(), website()]} />
      </body>
    </html>
  );
}
