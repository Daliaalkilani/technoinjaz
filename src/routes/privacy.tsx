import type { Metadata } from 'next';
import PrivacyPolicyPage from '@/features/legal/PrivacyPolicyPage';
import { pageMetadata } from '@/seo/metadata';
import { JsonLd } from '@/seo/JsonLd';
import { webPage } from '@/seo/schemas';
import type { Lang } from '@/i18n/locale';

const TEXT = {
  ar: {
    title: 'سياسة الخصوصية',
    description:
      'سياسة الخصوصية في تكنو إنجاز: ما البيانات التي نجمعها عبر نموذج التواصل والنشرة البريدية، وكيف نحفظها بأمان، واستخدام التخزين المحلي للتفضيلات، دون تتبع أو بيع للبيانات.'
  },
  en: {
    title: 'Privacy Policy',
    description:
      'Techno Enjaz privacy policy: what data we collect through the contact form and newsletter, how we store it securely, and how local storage keeps your preferences — no tracking and no selling of data.'
  }
} as const;

export const privacyMetadata = (lang: Lang): Metadata => pageMetadata({ lang, ...TEXT[lang], path: '/privacy-policy' });

export function PrivacyRoute({ lang }: { lang: Lang }) {
  return (
    <>
      <JsonLd data={[webPage({ lang, path: '/privacy-policy', name: TEXT[lang].title, description: TEXT[lang].description })]} />
      <PrivacyPolicyPage />
    </>
  );
}
