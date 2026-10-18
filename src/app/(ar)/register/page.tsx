import type { Metadata } from 'next';
import AuthPage from '@/features/auth/AuthPage';
import { utilityPageMetadata } from '@/routes/utility';

export const dynamic = 'force-static';

export const metadata: Metadata = utilityPageMetadata('ar', 'register');

export default function Page() {
  return <AuthPage initialMode="register" />;
}
