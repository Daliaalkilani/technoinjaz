import type { Metadata } from 'next';
import AccessDeniedView from '@/components/errors/AccessDeniedView';

export const metadata: Metadata = {
  title: 'تم رفض الوصول (403)',
  robots: {
    index: false,
    follow: false
  }
};

export default function Forbidden() {
  return <AccessDeniedView />;
}
