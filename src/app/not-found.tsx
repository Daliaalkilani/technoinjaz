import type { Metadata } from 'next';
import NotFoundView from '@/components/errors/NotFoundView';

export const metadata: Metadata = {
  title: 'الصفحة غير موجودة (404)',
  robots: {
    index: false,
    follow: false
  }
};

export default function NotFound() {
  return <NotFoundView />;
}
