import type { Metadata } from 'next';
import TestimonialsSection from '@/features/about/TestimonialsSection';
import AboutTeamSection from '@/features/about/AboutTeamSection';
import { pageMetadata } from '@/seo/metadata';
import { JsonLd } from '@/seo/JsonLd';
import { webPage, abdulghaniPersonSchema, breadcrumb } from '@/seo/schemas';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'من نحن وفريق العمل الهندسي | تكنو إنجاز | Techno Enjaz',
  description: 'تعرف على رؤية تكنو إنجاز، بقيادة المهندس عبد الغني الحمدي، وبنيتنا الهندسية المتكاملة في الذكاء الاصطناعي والأنظمة المدمجة ومشاريع التخرج التقنية.',
  path: '/about',
  absoluteTitle: true
});

export default function AboutPage() {
  // Team + moments photos are guaranteed to be needed on this page (InfiniteMenu &
  // TeamMomentsRing fetch them client-side after hydration). Starting the downloads
  // here — in parallel with the page's own JS — removes seconds on slow networks.
  const teamPhotoPreloads = [
    '/_img/images/team/abdulghani.640.avif',
    '/_img/images/team/abdulhady.640.avif',
    '/_img/images/team/dalia.640.avif',
    '/_img/images/team/dunia.640.avif',
    '/_img/images/moments/moment1.480.avif',
    '/_img/images/moments/moment2.480.avif',
    '/_img/images/moments/moment3.480.avif',
    '/_img/images/moments/moment4.480.avif'
  ];
  return (
    <>
      {teamPhotoPreloads.map((href) => (
        <link key={href} rel="preload" as="image" href={href} fetchPriority="low" />
      ))}
      <JsonLd
        data={[
          webPage({ path: '/about', name: 'من نحن وفريق العمل', type: 'AboutPage' }),
          abdulghaniPersonSchema(),
          breadcrumb([
            { name: 'الرئيسية', path: '/' },
            { name: 'من نحن', path: '/about' }
          ])
        ]}
      />
      <AboutTeamSection headingLevel="h1" />
      <TestimonialsSection />
    </>
  );
}
