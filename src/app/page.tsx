import type { Metadata } from 'next';
import HomeHero from '@/features/home/HomeHero';
import AboutTeamSection from '@/features/about/AboutTeamSection';
import { pageMetadata } from '@/seo/metadata';
import { JsonLd } from '@/seo/JsonLd';
import { webPage } from '@/seo/schemas';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'تكنو إنجاز | هندسة برمجية متقدمة وحلول سحابية | Techno Enjaz',
  description: 'تكنو إنجاز - صرح هندسي رائد في تطوير الأنظمة البرمجية المتكاملة، الحلول السحابية فائقة الأداء، الأتمتة وإنترنت الأشياء، وتطبيقات الذكاء الاصطناعي في حماة، سوريا.',
  path: '/',
  absoluteTitle: true
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={[webPage({ path: '/', name: 'تكنو إنجاز | الرئيسية' })]} />
      <HomeHero />
      <AboutTeamSection headingLevel="h2" />
    </>
  );
}
