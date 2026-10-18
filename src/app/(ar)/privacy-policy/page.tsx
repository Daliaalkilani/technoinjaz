import type { Metadata } from 'next';
import { privacyMetadata, PrivacyRoute } from '@/routes/privacy';

export const dynamic = 'force-static';

export const metadata: Metadata = privacyMetadata('ar');

export default function PrivacyPolicyRoutePage() {
  return <PrivacyRoute lang="ar" />;
}
