import type { Metadata } from 'next';
import PrivacyPolicyPage from '@/features/legal/PrivacyPolicyPage';
import { pageMetadata } from '@/seo/metadata';
import { JsonLd } from '@/seo/JsonLd';
import { webPage } from '@/seo/schemas';

export const dynamic = 'force-static';

const description =
  'سياسة الخصوصية في تكنو إنجاز: ما البيانات التي نجمعها عبر نموذج التواصل والنشرة البريدية، وكيف نحفظها بأمان، واستخدام التخزين المحلي للتفضيلات، دون تتبع أو بيع للبيانات.';

export const metadata: Metadata = pageMetadata({
  title: 'سياسة الخصوصية',
  description,
  path: '/privacy-policy'
});

export default function PrivacyPolicyRoutePage() {
  return (
    <>
      <JsonLd data={[webPage({ path: '/privacy-policy', name: 'سياسة الخصوصية', description })]} />
      <PrivacyPolicyPage />
    </>
  );
}
