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
          // No page uses these device APIs; deny them to the page and to embedded frames.
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
          // No plugins and no <base> anywhere; frame-ancestors mirrors X-Frame-Options.
          { key: 'Content-Security-Policy', value: "require-trusted-types-for 'script'; object-src 'none'; base-uri 'self'; frame-ancestors 'self'" },
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
    // Two root layouts (app/(ar), app/(en)): server-side 404s render app/global-not-found.tsx.
    globalNotFound: true,
  },
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      // /500 is reserved by Next.js for its built-in error page: an app/500 route
      // collides with it at export time and fails the build. Same view lives here.
      { source: '/500', destination: '/server-error', permanent: false },
      { source: '/403', destination: '/access-denied', permanent: false },
      { source: '/access-error', destination: '/access-denied', permanent: false },
      // Duplicate of the ground-robot project (same report); merged into the original page.
      { source: '/projects/military-war-robot-ai', destination: '/projects/remote-controlled-ground-robot', permanent: true },
      // English twins of the redirects above (/en/… routes, app/(en)).
      { source: '/en/index.html', destination: '/en', permanent: true },
      { source: '/en/500', destination: '/en/server-error', permanent: false },
      { source: '/en/403', destination: '/en/access-denied', permanent: false },
      { source: '/en/access-error', destination: '/en/access-denied', permanent: false },
      { source: '/en/projects/military-war-robot-ai', destination: '/en/projects/remote-controlled-ground-robot', permanent: true },
      // The team lives on the About page (profiles are /team/<id>).
      { source: '/team', destination: '/about', permanent: false },
      { source: '/en/team', destination: '/en/about', permanent: false }
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
