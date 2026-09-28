import type { Metadata } from 'next';
import AuthPage from '@/AuthPage';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'تسجيل الدخول | تكنو إنجاز',
  robots: {
    index: false,
    follow: false
  }
};

export default function LoginPage() {
  return <AuthPage initialMode="login" />;
}
