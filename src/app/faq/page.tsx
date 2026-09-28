import type { Metadata } from 'next';
import FaqSection from '@/components/faq/FaqSection';
import { faqData } from '@/data/faqData';
import { pageMetadata } from '@/seo/metadata';
import { JsonLd } from '@/seo/JsonLd';
import { webPage, faqPageSchema } from '@/seo/schemas';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'الأسئلة الشائعة والاستفسارات التقنية',
  description: 'إجابات شاملة ومفصلة حول الخدمات الهندسية، النماذج التطبيقية، آلية العمل، وشروط الدعم التقني في مكتب تكنو إنجاز.',
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
