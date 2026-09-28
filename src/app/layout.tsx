import type { Metadata, Viewport } from 'next';
import { Readex_Pro } from 'next/font/google';
import '@/index.css';
import { ThemeLanguageProvider } from '@/context/ThemeLanguageContext';
import { LoaderProvider } from '@/context/LoaderContext';
import { AppShell } from '@/components/shell/AppShell';
import { LEGACY_HASH_REDIRECT, THEME_LANG_BOOT } from '@/lib/inline-scripts';

const readex = Readex_Pro({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-readex'
});

export const viewport: Viewport = {
  themeColor: '#030712',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5
};

export const metadata: Metadata = {
  title: 'تكنو إنجاز | هندسة برمجية متقدمة وحلول سحابية | Techno Enjaz',
  description: 'تكنو إنجاز - صرح هندسي رائد في تطوير الأنظمة البرمجية المتكاملة، الحلول السحابية فائقة الأداء، الأتمتة وإنترنت الأشياء، وتطبيقات الذكاء الاصطناعي في حماة، سوريا.',
};

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
        <script src="/loader/loader.js" defer />
      </head>
      <body>
        <ThemeLanguageProvider>
          <LoaderProvider>
            <AppShell>{children}</AppShell>
          </LoaderProvider>
        </ThemeLanguageProvider>
      </body>
    </html>
  );
}
