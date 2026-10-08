import type { Metadata } from 'next';
import AdminMessages from '@/features/account/AdminMessages';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'رسائل التواصل',
  robots: {
    index: false,
    follow: false
  }
};

export default function Page() {
  return <AdminMessages />;
}
