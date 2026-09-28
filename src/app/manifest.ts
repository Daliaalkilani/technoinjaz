import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'تكنو إنجاز | Techno Enjaz',
    short_name: 'تكنو إنجاز',
    description: 'المكتب الهندسي الرائد للحلول التقنية والابتكارات الهندسية المتقدمة',
    start_url: '/',
    display: 'standalone',
    dir: 'rtl',
    lang: 'ar',
    theme_color: '#030712',
    background_color: '#030712',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  };
}
