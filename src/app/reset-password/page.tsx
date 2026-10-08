import type { Metadata } from 'next';
import ResetPasswordPage from '@/features/auth/ResetPasswordPage';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'إعادة تعيين كلمة المرور',
  robots: {
    index: false,
    follow: false
  }
};

export default function Page() {
  return <ResetPasswordPage />;
}
