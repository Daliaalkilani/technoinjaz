import type { Metadata } from 'next';
import FaqSection from '@/features/faq/FaqSection';
import { faqData } from '@/data/faqData';
import { pageMetadata } from '@/seo/metadata';
import { JsonLd } from '@/seo/JsonLd';
import { webPage, faqPageSchema } from '@/seo/schemas';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'الأسئلة الشائعة',
  description: 'إجابات شاملة ومفصلة عن الخدمات الهندسية في تكنو إنجاز: آلية العمل، مدة التنفيذ، الأسعار، النماذج التطبيقية، وشروط الدعم التقني بعد التسليم — كل ما تحتاج معرفته قبل بدء مشروعك.',
  path: '/faq'
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          // One FAQPage node: the page entity carries the questions. Two FAQPage nodes
          // (an empty page-level one + the list) is a "Duplicate field FAQPage" error.
          { ...webPage({ path: '/faq', name: 'الأسئلة الشائعة', type: 'FAQPage' }), mainEntity: faqPageSchema(faqData).mainEntity }
        ]}
      />
      <FaqSection />
    </>
  );
}
