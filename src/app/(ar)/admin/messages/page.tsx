import type { Metadata } from 'next';
import AdminMessages from '@/features/account/AdminMessages';
import { utilityPageMetadata } from '@/routes/utility';

export const dynamic = 'force-static';

export const metadata: Metadata = utilityPageMetadata('ar', 'adminMessages');

export default function Page() {
  return <AdminMessages />;
}
