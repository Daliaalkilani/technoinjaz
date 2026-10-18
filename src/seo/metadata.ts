import type { Metadata } from 'next';
import { SITE_URL, absoluteUrl } from '@/config/site';
import { localePath, type Lang } from '@/i18n/locale';

/** Snippet/preview directives. Next replaces `robots` wholesale when a page sets it,
 *  so every robots object must repeat these or the page silently loses them. */
export const GOOGLE_BOT_PREVIEW = {
  'max-snippet': -1,
  'max-image-preview': 'large',
  'max-video-preview': -1
} as const;

/** hreflang alternates of a page: ar ↔ en, x-default → the Arabic original. */
export function languageAlternates(path: string) {
  const ar = absoluteUrl(path);
  return { ar, en: absoluteUrl(localePath('en', path)), 'x-default': ar };
}

const OG_LOCALE = { ar: 'ar_SY', en: 'en_US' } as const;
const SITE_NAME = { ar: 'تكنو إنجاز | Techno Enjaz', en: 'Techno Enjaz | تكنو إنجاز' } as const;

const OG_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'شعار تكنو إنجاز | Techno Enjaz logo',
  type: 'image/png'
};

/** Metadata of a noindex utility page (login, account, error views…). */
export function utilityMetadata(title: string, description?: string): Metadata {
  return { title, ...(description ? { description } : {}), robots: { index: false, follow: false } };
}

export function buildRootMetadata(lang: Lang = 'ar'): Metadata {
  const en = lang === 'en';
  return {
    metadataBase: new URL(SITE_URL),
    title: en
      ? {
          default: 'Techno Enjaz | AI Systems & Engineering Solutions',
          template: '%s | Techno Enjaz'
        }
      : {
          default: 'تكنو إنجاز | أنظمة ذكاء اصطناعي وحلول هندسية — Techno Enjaz',
          template: '%s | تكنو إنجاز | Techno Enjaz'
        },
    description: en
      ? 'Techno Enjaz is an engineering office building AI systems, cloud solutions, automation and IoT — real, documented projects delivered from Hama, Syria.'
      : 'تكنو إنجاز: مكتب هندسي يطوّر أنظمة ذكاء اصطناعي، حلولاً سحابية، وأتمتة وإنترنت أشياء — مشاريع حقيقية موثقة بخبرة تنفيذية من حماة، سوريا.',

    applicationName: en ? 'Techno Enjaz' : 'تكنو إنجاز',
    creator: 'داليا الكيلاني و روان هبهاب (Dalia Alkilani & Rawan Habhab)',
    openGraph: {
      siteName: SITE_NAME[lang],
      locale: OG_LOCALE[lang],
      alternateLocale: [OG_LOCALE[en ? 'ar' : 'en']],
      type: 'website',
      images: [OG_IMAGE]
    },
    twitter: {
      card: 'summary_large_image',
      site: '@Abdalganih2',
      creator: '@Abdalganih2',
      images: [{ url: OG_IMAGE.url, alt: OG_IMAGE.alt }]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        ...GOOGLE_BOT_PREVIEW
      }
    },
    other: {
      'geo.region': 'SY-HM',
      'geo.placename': 'Hama, Syria',
      'geo.position': '35.128992;36.754001',
      ICBM: '35.128992, 36.754001',
      designer: 'داليا الكيلاني و روان هبهاب | Dalia Alkilani & Rawan Habhab'
    }
  };
}

export function pageMetadata(o: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  absoluteTitle?: boolean;
  /** Language of this copy; `path` stays language-neutral ('/about'). */
  lang?: Lang;
}): Metadata {
  const lang = o.lang ?? 'ar';
  const url = absoluteUrl(localePath(lang, o.path));
  const images = o.image
    ? [
        {
          // No width/height: covers come in many sizes (e.g. 1280×720) and a wrong
          // declared size makes Facebook / LinkedIn crop the preview badly.
          url: o.image.startsWith('http') ? o.image : absoluteUrl(o.image),
          alt: o.title
        }
      ]
    : [{ ...OG_IMAGE, url: absoluteUrl(OG_IMAGE.url) }];

  return {
    title: o.absoluteTitle ? { absolute: o.title } : o.title,
    description: o.description,
    alternates: {
      canonical: url,
      languages: languageAlternates(o.path)
    },
    robots: o.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, ...GOOGLE_BOT_PREVIEW } },
    openGraph: {
      url,
      title: o.title,
      description: o.description,
      type: o.type ?? 'website',
      images,
      locale: OG_LOCALE[lang],
      alternateLocale: [OG_LOCALE[lang === 'en' ? 'ar' : 'en']],
      siteName: SITE_NAME[lang],
      ...(o.type === 'article'
        ? {
            publishedTime: o.publishedTime,
            modifiedTime: o.modifiedTime ?? o.publishedTime
          }
        : {})
    },
    twitter: {
      card: 'summary_large_image',
      title: o.title,
      description: o.description,
      images: images.map((i) => i.url)
    }
  };
}
