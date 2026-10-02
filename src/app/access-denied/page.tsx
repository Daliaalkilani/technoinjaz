import type { Metadata } from 'next';
import AccessDeniedView from '@/components/errors/AccessDeniedView';

export const metadata: Metadata = {
  title: 'تم رفض الوصول (403)',
  description: 'هذا المورد الهندسي محمي ويتطلب صلاحيات وصول خاصة.',
  robots: {
    index: false,
    follow: false
  }
};

export default function AccessDeniedPage() {
  return <AccessDeniedView />;
}
