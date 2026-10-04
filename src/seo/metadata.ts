import type { Metadata } from 'next';
import { SITE_URL, absoluteUrl } from '@/config/site';

const OG_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'شعار تكنو إنجاز | Techno Enjaz logo',
  type: 'image/png'
};

export function buildRootMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: 'تكنو إنجاز | أنظمة ذكاء اصطناعي وحلول هندسية — Techno Enjaz',
      template: '%s | تكنو إنجاز | Techno Enjaz'
    },
    description: 'تكنو إنجاز: مكتب هندسي يطوّر أنظمة ذكاء اصطناعي، حلولاً سحابية، وأتمتة وإنترنت أشياء — مشاريع حقيقية موثقة بخبرة تنفيذية من حماة، سوريا.',

    applicationName: 'تكنو إنجاز',
    creator: 'داليا الكيلاني و روان هبهاب (Dalia Alkilani & Rawan Habhab)',
    openGraph: {
      siteName: 'تكنو إنجاز | Techno Enjaz',
      locale: 'ar_SY',
      alternateLocale: ['en_US'],
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
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1
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
}): Metadata {
  const url = absoluteUrl(o.path);
  const images = o.image
    ? [
        {
          url: o.image.startsWith('http') ? o.image : absoluteUrl(o.image),
          width: 640,
          height: 640,
          alt: o.title
        }
      ]
    : [{ ...OG_IMAGE, url: absoluteUrl(OG_IMAGE.url) }];

  return {
    title: o.absoluteTitle ? { absolute: o.title } : o.title,
    description: o.description,
    alternates: {
      canonical: url,
      // Same URL serves both languages (client-side toggle) — declare both to Google
      languages: {
        ar: url,
        en: url,
        'x-default': url
      }
    },
    robots: o.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      url,
      title: o.title,
      description: o.description,
      type: o.type ?? 'website',
      images,
      locale: 'ar_SY',
      alternateLocale: ['en_US'],
      siteName: 'تكنو إنجاز | Techno Enjaz',
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
