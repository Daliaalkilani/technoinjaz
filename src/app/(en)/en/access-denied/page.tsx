import type { Metadata } from 'next';
import AccessDeniedView from '@/components/errors/AccessDeniedView';
import { utilityPageMetadata } from '@/routes/utility';

export const metadata: Metadata = utilityPageMetadata('en', 'accessDenied');

export default function Page() {
  return <AccessDeniedView />;
}
