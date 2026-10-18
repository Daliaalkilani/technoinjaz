import type { Metadata } from 'next';
import AdminSubscribers from '@/features/account/AdminSubscribers';
import { utilityPageMetadata } from '@/routes/utility';

export const dynamic = 'force-static';

export const metadata: Metadata = utilityPageMetadata('ar', 'adminSubscribers');

export default function Page() {
  return <AdminSubscribers />;
}
