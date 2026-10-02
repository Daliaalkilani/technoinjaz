import type { Metadata } from 'next';
import ServerErrorView from '@/components/errors/ServerErrorView';

export const metadata: Metadata = {
  title: 'خطأ في الخادم (500)',
  description: 'حدث خطأ غير متوقع أثناء معالجة الطلب في الخادم.',
  robots: {
    index: false,
    follow: false
  }
};

export default function ServerErrorPage() {
  return <ServerErrorView />;
}
