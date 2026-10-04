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
          webPage({ path: '/faq', name: 'الأسئلة الشائعة', type: 'FAQPage' }),
          faqPageSchema(faqData)
        ]}
      />
      <FaqSection />
    </>
  );
}
