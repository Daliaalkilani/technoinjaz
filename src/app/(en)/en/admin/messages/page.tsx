import type { Metadata } from 'next';
import AdminMessages from '@/features/account/AdminMessages';
import { utilityPageMetadata } from '@/routes/utility';

export const dynamic = 'force-static';

export const metadata: Metadata = utilityPageMetadata('en', 'adminMessages');

export default function Page() {
  return <AdminMessages />;
}
