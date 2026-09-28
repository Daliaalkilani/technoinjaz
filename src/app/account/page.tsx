import type { Metadata } from 'next';
import AccountClient from '@/features/account/AccountClient';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'حسابي والملف الشخصي | تكنو إنجاز',
  robots: {
    index: false,
    follow: false
  }
};

export default function AccountPage() {
  return <AccountClient />;
}
