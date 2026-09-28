import type { Metadata } from 'next';
import AboutTeamSection from '@/features/about/AboutTeamSection';
import { pageMetadata } from '@/seo/metadata';
import { JsonLd } from '@/seo/JsonLd';
import { webPage } from '@/seo/schemas';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'من نحن وفريق العمل الهندسي',
  description: 'تعرف على رؤية تكنو إنجاز، بنيتنا الهندسية المتكاملة، وفريق المهندسين المتخصصين في الذكاء الاصطناعي والأنظمة المدمجة.',
  path: '/about'
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[webPage({ path: '/about', name: 'من نحن وفريق العمل', type: 'AboutPage' })]} />
      <AboutTeamSection headingLevel="h1" />
    </>
  );
}
