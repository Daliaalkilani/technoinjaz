import type { Metadata } from 'next';
import FaqSection from '@/features/faq/FaqSection';
import { faqData } from '@/data/faqData';
import { pageMetadata } from '@/seo/metadata';
import { JsonLd } from '@/seo/JsonLd';
import { webPage, faqPageSchema } from '@/seo/schemas';
import type { Lang } from '@/i18n/locale';

export const faqMetadata = (lang: Lang): Metadata =>
  pageMetadata({
    lang,
    title: lang === 'en' ? 'Frequently Asked Questions' : 'الأسئلة الشائعة',
    description:
      lang === 'en'
        ? 'Detailed answers about Techno Enjaz engineering services: how we work, delivery time, pricing, applied prototypes and post-delivery technical support — everything to know before starting your project.'
        : 'إجابات شاملة ومفصلة عن الخدمات الهندسية في تكنو إنجاز: آلية العمل، مدة التنفيذ، الأسعار، النماذج التطبيقية، وشروط الدعم التقني بعد التسليم — كل ما تحتاج معرفته قبل بدء مشروعك.',
    path: '/faq'
  });

export function FaqRoute({ lang }: { lang: Lang }) {
  return (
    <>
      <JsonLd
        data={[
          // One FAQPage node: the page entity carries the questions. Two FAQPage nodes
          // (an empty page-level one + the list) is a "Duplicate field FAQPage" error.
          {
            ...webPage({ lang, path: '/faq', name: lang === 'en' ? 'Frequently Asked Questions' : 'الأسئلة الشائعة', type: 'FAQPage' }),
            mainEntity: faqPageSchema(faqData, lang).mainEntity
          }
        ]}
      />
      <FaqSection />
    </>
  );
}
