import type { Metadata } from 'next';
import ServerErrorView from '@/components/errors/ServerErrorView';
import { utilityPageMetadata } from '@/routes/utility';

export const metadata: Metadata = utilityPageMetadata('en', 'serverError');

export default function Page() {
  return <ServerErrorView />;
}
