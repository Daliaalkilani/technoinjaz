import type { Metadata } from 'next';
import HomeHero from '@/features/home/HomeHero';
import AboutTeamSection from '@/features/about/AboutTeamSection';
import { pageMetadata } from '@/seo/metadata';
import { JsonLd } from '@/seo/JsonLd';
import { webPage } from '@/seo/schemas';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'تكنو إنجاز | أنظمة ذكاء اصطناعي وحلول هندسية — Techno Enjaz',
  description: 'تكنو إنجاز: مكتب هندسي يطوّر أنظمة ذكاء اصطناعي، حلولاً سحابية، وأتمتة وإنترنت أشياء — مشاريع حقيقية موثقة بخبرة تنفيذية من حماة، سوريا.',
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
