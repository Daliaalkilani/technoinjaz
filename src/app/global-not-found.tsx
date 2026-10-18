import type { Metadata } from 'next';
import { headers } from 'next/headers';
import NotFoundView from '@/components/errors/NotFoundView';
import { RootDocument } from '@/components/layout/RootDocument';
import { buildRootMetadata } from '@/seo/metadata';
import { LANG_HEADER, type Lang } from '@/i18n/locale';

// Server-rendered 404 of both languages. With two root layouts — app/(ar) and app/(en) —
// Next renders a 404 thrown on the server (catch-all routes, unknown slugs) from here, not
// from the group not-found.tsx files (those only serve client-side navigations). The
// language comes from the middleware (LANG_HEADER): /en/… URLs get the English page.
const requestLang = async (): Promise<Lang> => ((await headers()).get(LANG_HEADER) === 'en' ? 'en' : 'ar');

export async function generateMetadata(): Promise<Metadata> {
  const lang = await requestLang();
  return {
    ...buildRootMetadata(lang),
    title: lang === 'en' ? 'Page Not Found (404) | Techno Enjaz' : 'الصفحة غير موجودة (404) | تكنو إنجاز',
    robots: { index: false, follow: false }
  };
}

export default async function GlobalNotFound() {
  return (
    <RootDocument lang={await requestLang()}>
      <NotFoundView />
    </RootDocument>
  );
}
