import type { Metadata } from 'next';
import NewsletterActionPage from '@/features/newsletter/NewsletterActionPage';
import { utilityPageMetadata } from '@/routes/utility';

export const dynamic = 'force-static';

export const metadata: Metadata = utilityPageMetadata('en', 'newsletter');

export default function Page() {
  return <NewsletterActionPage />;
}
