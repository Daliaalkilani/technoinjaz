import type { Metadata, Viewport } from 'next';
import { Readex_Pro } from 'next/font/google';
import '@/styles/palette.css';
import '@/styles/globals.css';
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="/loader/loader.css" />
        <style dangerouslySetInnerHTML={{ __html: 'html[data-skip-loader] #te-loader{display:none!important;}' }} />
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
