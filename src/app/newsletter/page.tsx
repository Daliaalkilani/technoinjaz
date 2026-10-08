import type { Metadata } from 'next';
import NewsletterActionPage from '@/features/newsletter/NewsletterActionPage';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'نشرة تكنو إنجاز',
  robots: { index: false, follow: false }
};

export default function Page() {
  return <NewsletterActionPage />;
}
