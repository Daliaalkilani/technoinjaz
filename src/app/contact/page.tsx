import type { Metadata } from 'next';
import ContactPage from '@/ContactPage';
import { SITE_URL } from '@/config/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'اتصل بنا واستشر فريقنا الهندسي | تكنو إنجاز',
  description: 'تواصل مباشرة مع مهندسي تكنو إنجاز لمناقشة متطلبات مشروعك، استشارات الذكاء الاصطناعي، والنماذج التطبيقية في حماة، سوريا.',
  alternates: {
    canonical: `${SITE_URL}/contact`
  }
};

export default function ContactRoutePage() {
  return <ContactPage />;
}
