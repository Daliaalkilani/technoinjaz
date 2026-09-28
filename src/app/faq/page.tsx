import type { Metadata } from 'next';
import FaqSection from '@/components/faq/FaqSection';
import { SITE_URL } from '@/config/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'الأسئلة الشائعة والاستفسارات التقنية | تكنو إنجاز',
  description: 'إجابات شاملة ومفصلة حول الخدمات الهندسية، النماذج التطبيقية، آلية العمل، وشروط الدعم التقني في مكتب تكنو إنجاز.',
  alternates: {
    canonical: `${SITE_URL}/faq`
  }
};

export default function FaqPage() {
  return <FaqSection />;
}
