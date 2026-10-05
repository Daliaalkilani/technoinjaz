import type { NextConfig } from 'next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

const nextConfig: NextConfig = {
  devIndicators: false,
  trailingSlash: false,
  images: { unoptimized: true },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Content-Security-Policy', value: "require-trusted-types-for 'script'" },
          // HTML must revalidate after each deploy: a cached page referencing purged
          // chunk hashes crashes with "Application error: client-side exception".
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
    ];
  },
  // Compile-time tree-shaking boost: rewrite `import { X } from 'pkg'` to
  // per-symbol barrel imports so only used symbols land in client chunks
  // (lucide-react icons, framer-motion exports, gsap plugins).
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'gsap'],
  },
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
