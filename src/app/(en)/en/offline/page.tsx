import type { Metadata } from 'next';
import ConnectionErrorView from '@/components/errors/ConnectionErrorView';
import { utilityPageMetadata } from '@/routes/utility';

export const metadata: Metadata = utilityPageMetadata('en', 'offline');

export default function Page() {
  return <ConnectionErrorView />;
}
