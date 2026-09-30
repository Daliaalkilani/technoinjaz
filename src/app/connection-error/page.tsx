import type { Metadata } from 'next';
import ConnectionErrorView from '@/components/errors/ConnectionErrorView';

export const metadata: Metadata = {
  title: 'خطأ في الاتصال بالشبكة | تكنو إنجاز',
  description: 'تعذر الاتصال بخوادم تكنو إنجاز السحابية. يرجى التحقق من اتصالك بالإنترنت.',
  robots: {
    index: false,
    follow: false
  }
};

export default function ConnectionErrorPage() {
  return <ConnectionErrorView />;
}
