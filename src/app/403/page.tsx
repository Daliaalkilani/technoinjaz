import type { Metadata } from 'next';
import AccessDeniedView from '@/components/errors/AccessDeniedView';

export const metadata: Metadata = {
  title: 'وصول غير مصرح 403',
  robots: {
    index: false,
    follow: false
  }
};

export default function Route403() {
  return <AccessDeniedView />;
}
