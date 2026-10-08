import type { Metadata } from 'next';
import AdminSubscribers from '@/features/account/AdminSubscribers';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'النشرة البريدية',
  robots: { index: false, follow: false }
};

export default function Page() {
  return <AdminSubscribers />;
}
