import type { Metadata } from 'next';
import ConnectionErrorView from '@/components/errors/ConnectionErrorView';

export const metadata: Metadata = {
  title: 'غير متصل بالإنترنت | تكنو إنجاز',
  description: 'أنت تتصفح بدون اتصال بالإنترنت حالياً.',
  robots: {
    index: false,
    follow: false
  }
};

export default function OfflinePage() {
  return <ConnectionErrorView />;
}
