import type { Metadata } from 'next';
import { SITE_URL, absoluteUrl } from '@/config/site';

export function buildRootMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: 'تكنو إنجاز | هندسة برمجية متقدمة وحلول سحابية | Techno Enjaz',
      template: '%s | تكنو إنجاز'
    },
    description: 'تكنو إنجاز - صرح هندسي رائد في تطوير الأنظمة البرمجية المتكاملة، الحلول السحابية فائقة الأداء، الأتمتة وإنترنت الأشياء، وتطبيقات الذكاء الاصطناعي في حماة، سوريا.',
    applicationName: 'تكنو إنجاز',
    openGraph: {
      siteName: 'تكنو إنجاز | Techno Enjaz',
      locale: 'ar_SY',
      type: 'website',
      images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }]
    },
    twitter: {
      card: 'summary_large_image'
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
      ICBM: '35.128992, 36.754001'
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
  const images = [{ url: o.image ? (o.image.startsWith('http') ? o.image : absoluteUrl(o.image)) : absoluteUrl('/images/og-default.jpg') }];

  return {
    title: o.absoluteTitle ? { absolute: o.title } : o.title,
    description: o.description,
    alternates: {
      canonical: url
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
