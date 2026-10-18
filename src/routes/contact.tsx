import type { Metadata } from 'next';
import ContactPage from '@/features/contact/ContactPage';
import { pageMetadata } from '@/seo/metadata';
import { JsonLd } from '@/seo/JsonLd';
import { webPage } from '@/seo/schemas';
import type { Lang } from '@/i18n/locale';

export const contactMetadata = (lang: Lang): Metadata =>
  pageMetadata({
    lang,
    title: lang === 'en' ? 'Contact Us & Consult Our Engineering Team' : 'اتصل بنا واستشر فريقنا الهندسي',
    description:
      lang === 'en'
        ? 'Talk directly with Techno Enjaz engineers about your project: AI consulting, computer vision and robotics, and cloud solutions. Fill in the contact form and we reply within one business day.'
        : 'تواصل مباشرة مع مهندسي تكنو إنجاز لمناقشة مشروعك: استشارات ذكاء اصطناعي، رؤية حاسوبية وروبوتات، وحلول سحابية. املأ نموذج التواصل وسنرد عليك خلال يوم عمل واحد.',
    path: '/contact'
  });

export function ContactRoute({ lang }: { lang: Lang }) {
  return (
    <>
      <JsonLd data={[webPage({ lang, path: '/contact', name: lang === 'en' ? 'Contact Us' : 'اتصل بنا', type: 'ContactPage' })]} />
      <ContactPage />
    </>
  );
}
