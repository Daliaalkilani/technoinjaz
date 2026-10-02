import type { Metadata } from 'next';
import AuthPage from '@/features/auth/AuthPage';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'إنشاء حساب جديد',
  robots: {
    index: false,
    follow: false
  }
};

export default function RegisterPage() {
  return <AuthPage initialMode="register" />;
}
