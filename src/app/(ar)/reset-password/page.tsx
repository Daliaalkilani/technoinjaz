import type { Metadata } from 'next';
import ResetPasswordPage from '@/features/auth/ResetPasswordPage';
import { utilityPageMetadata } from '@/routes/utility';

export const dynamic = 'force-static';

export const metadata: Metadata = utilityPageMetadata('ar', 'resetPassword');

export default function Page() {
  return <ResetPasswordPage />;
}
