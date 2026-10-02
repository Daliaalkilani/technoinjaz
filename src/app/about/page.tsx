import type { Metadata } from 'next';
import AboutTeamSection from '@/features/about/AboutTeamSection';
import { pageMetadata } from '@/seo/metadata';
import { JsonLd } from '@/seo/JsonLd';
import { webPage, abdulghaniPersonSchema } from '@/seo/schemas';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'من نحن وفريق العمل الهندسي | تكنو إنجاز',
  description: 'تعرف على رؤية تكنو إنجاز، بقيادة المهندس عبد الغني الحمدي، وبنيتنا الهندسية المتكاملة في الذكاء الاصطناعي والأنظمة المدمجة ومشاريع التخرج التقنية.',
  path: '/about',
  absoluteTitle: true
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          webPage({ path: '/about', name: 'من نحن وفريق العمل', type: 'AboutPage' }),
          abdulghaniPersonSchema()
        ]}
      />
      <AboutTeamSection headingLevel="h1" />
    </>
  );
}
