import type { Metadata } from 'next';
import TestimonialsSection from '@/features/about/TestimonialsSection';
import AboutTeamSection from '@/features/about/AboutTeamSection';
import { pageMetadata } from '@/seo/metadata';
import { JsonLd } from '@/seo/JsonLd';
import { webPage, abdulghaniPersonSchema } from '@/seo/schemas';
import type { Lang } from '@/i18n/locale';

export const aboutMetadata = (lang: Lang): Metadata =>
  pageMetadata({
    lang,
    title: lang === 'en' ? 'About Us & Our Engineering Team | Techno Enjaz' : 'من نحن وفريق العمل الهندسي | تكنو إنجاز | Techno Enjaz',
    description:
      lang === 'en'
        ? 'Meet Techno Enjaz: our vision, led by Eng. Abdalgani Alhamdi, and our integrated engineering team in AI, embedded systems and technical graduation projects.'
        : 'تعرف على رؤية تكنو إنجاز، بقيادة المهندس عبد الغني الحمدي، وبنيتنا الهندسية المتكاملة في الذكاء الاصطناعي والأنظمة المدمجة ومشاريع التخرج التقنية.',
    path: '/about',
    absoluteTitle: true
  });

// Team + moments photos are guaranteed to be needed on this page (InfiniteMenu &
// TeamMomentsRing fetch them client-side after hydration). Starting the downloads
// here — in parallel with the page's own JS — removes seconds on slow networks.
const teamPhotoPreloads = [
  '/_img/images/team/abdulghani.640.avif',
  '/_img/images/team/abdulhady.640.avif',
  '/_img/images/team/dalia-3.640.avif',
  '/_img/images/team/dunia.640.avif',
  '/_img/images/moments/moment1.480.avif',
  '/_img/images/moments/moment2.480.avif',
  '/_img/images/moments/moment3.480.avif',
  '/_img/images/moments/moment4.480.avif'
];

export function AboutRoute({ lang }: { lang: Lang }) {
  return (
    <>
      {teamPhotoPreloads.map((href) => (
        <link key={href} rel="preload" as="image" href={href} fetchPriority="low" />
      ))}
      <JsonLd
        data={[
          webPage({ lang, path: '/about', name: lang === 'en' ? 'About Us & Our Team' : 'من نحن وفريق العمل', type: 'AboutPage' }),
          abdulghaniPersonSchema(lang)
        ]}
      />
      <AboutTeamSection headingLevel="h1" />
      <TestimonialsSection />
    </>
  );
}
