import type { Metadata } from 'next';
import { faqMetadata, FaqRoute } from '@/routes/faq';

export const dynamic = 'force-static';

export const metadata: Metadata = faqMetadata('ar');

export default function FaqPage() {
  return <FaqRoute lang="ar" />;
}
