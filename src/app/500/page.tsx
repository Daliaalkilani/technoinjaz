import type { Metadata } from 'next';
import ServerErrorView from '@/components/errors/ServerErrorView';

export const metadata: Metadata = {
  title: 'خطأ داخلي 500 | تكنو إنجاز',
  robots: {
    index: false,
    follow: false
  }
};

export default function Route500() {
  return <ServerErrorView />;
}
