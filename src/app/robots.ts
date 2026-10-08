import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Personal / transactional / error routes carry no searchable content.
        disallow: [
          '/account',
          '/login',
          '/register',
          '/reset-password',
          '/admin',
          '/api/',
          '/403',
          '/offline',
          '/access-denied',
          '/connection-error',
          '/server-error'
        ]
      }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}
