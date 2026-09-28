import type { Metadata } from 'next';
import HomeHero from '@/components/home/HomeHero';
import AboutTeamSection from '@/components/about/AboutTeamSection';
import { SITE_URL } from '@/config/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'تكنو إنجاز | هندسة برمجية متقدمة وحلول سحابية | Techno Enjaz',
  description: 'تكنو إنجاز - صرح هندسي رائد في تطوير الأنظمة البرمجية المتكاملة، الحلول السحابية فائقة الأداء، الأتمتة وإنترنت الأشياء، وتطبيقات الذكاء الاصطناعي في حماة، سوريا.',
  alternates: {
    canonical: `${SITE_URL}/`
  }
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <AboutTeamSection headingLevel="h2" />
    </>
  );
}
