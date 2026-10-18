import type { Metadata } from 'next';
import NotFoundView from '@/components/errors/NotFoundView';
import { utilityPageMetadata } from '@/routes/utility';

export const metadata: Metadata = utilityPageMetadata('en', 'notFound');

export default function NotFound() {
  return <NotFoundView />;
}
