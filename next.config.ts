import type { NextConfig } from 'next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

const nextConfig: NextConfig = {
  devIndicators: false,
  trailingSlash: false,
  images: { unoptimized: true },
  poweredByHeader: false,
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      // /500 is reserved by Next.js for its built-in error page: an app/500 route
      // collides with it at export time and fails the build. Same view lives here.
      { source: '/500', destination: '/server-error', permanent: false },
      { source: '/403', destination: '/access-denied', permanent: false },
      { source: '/access-error', destination: '/access-denied', permanent: false }
    ];
  },
};

export default nextConfig;

if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PHASE?.includes('build')) {
  try {
    initOpenNextCloudflareForDev();
  } catch (e) {
    console.warn('initOpenNextCloudflareForDev skipped:', e);
  }
}
