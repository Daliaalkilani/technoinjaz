import type { Metadata } from 'next';
import ConnectionErrorView from '@/components/errors/ConnectionErrorView';
import { utilityPageMetadata } from '@/routes/utility';

export const metadata: Metadata = utilityPageMetadata('ar', 'offline');

export default function Page() {
  return <ConnectionErrorView />;
}
