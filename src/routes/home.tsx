import type { Metadata } from 'next';
import HomeHero from '@/features/home/HomeHero';
import AboutTeamSection from '@/features/about/AboutTeamSection';
import { pageMetadata } from '@/seo/metadata';
import { JsonLd } from '@/seo/JsonLd';
import { webPage } from '@/seo/schemas';
import type { Lang } from '@/i18n/locale';

// Route modules: one per page, shared by app/(ar)/… and app/(en)/en/… page files.

export const homeMetadata = (lang: Lang): Metadata =>
  pageMetadata({
    lang,
    title:
      lang === 'en'
        ? 'Techno Enjaz | AI Systems & Engineering Solutions'
        : 'تكنو إنجاز | أنظمة ذكاء اصطناعي وحلول هندسية — Techno Enjaz',
    description:
      lang === 'en'
        ? 'Techno Enjaz is an engineering office building AI systems, cloud solutions, automation and IoT — real, documented projects delivered with hands-on expertise from Hama, Syria.'
        : 'تكنو إنجاز: مكتب هندسي يطوّر أنظمة ذكاء اصطناعي، حلولاً سحابية، وأتمتة وإنترنت أشياء — مشاريع حقيقية موثقة بخبرة تنفيذية من حماة، سوريا.',
    path: '/',
    absoluteTitle: true
  });

export function HomeRoute({ lang }: { lang: Lang }) {
  return (
    <>
      {/* Hero LCP image: home only (React hoists these <link>s into <head>). In the root
          layout they made every article / project / team page download it as well. */}
      <link rel="preload" as="image" href="/_img/images/home/hero-dark.640.avif" fetchPriority="high" media="(max-width: 768px)" />
      <link rel="preload" as="image" href="/_img/images/home/hero-dark.1280.avif" fetchPriority="high" media="(min-width: 769px)" />
      <JsonLd data={[webPage({ lang, path: '/', name: lang === 'en' ? 'Techno Enjaz | Home' : 'تكنو إنجاز | الرئيسية' })]} />
      <HomeHero />
      <AboutTeamSection headingLevel="h2" />
    </>
  );
}
