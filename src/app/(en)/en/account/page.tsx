import type { Metadata } from 'next';
import AccountClient from '@/features/account/AccountClient';
import { utilityPageMetadata } from '@/routes/utility';

export const dynamic = 'force-static';

export const metadata: Metadata = utilityPageMetadata('en', 'account');

export default function Page() {
  return <AccountClient />;
}
