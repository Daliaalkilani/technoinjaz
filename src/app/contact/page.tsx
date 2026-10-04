import type { Metadata } from 'next';
import ContactPage from '@/features/contact/ContactPage';
import { pageMetadata } from '@/seo/metadata';
import { JsonLd } from '@/seo/JsonLd';
import { webPage } from '@/seo/schemas';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'اتصل بنا واستشر فريقنا الهندسي',
  description: 'تواصل مباشرة مع مهندسي تكنو إنجاز لمناقشة مشروعك: استشارات ذكاء اصطناعي، رؤية حاسوبية وروبوتات، وحلول سحابية. املأ نموذج التواصل وسنرد عليك خلال يوم عمل واحد.',
  path: '/contact'
});

export default function ContactRoutePage() {
  return (
    <>
      <JsonLd data={[webPage({ path: '/contact', name: 'اتصل بنا', type: 'ContactPage' })]} />
      <ContactPage />
    </>
  );
}
