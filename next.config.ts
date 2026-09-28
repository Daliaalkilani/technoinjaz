import type { NextConfig } from 'next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

const nextConfig: NextConfig = {
  devIndicators: false,
  trailingSlash: false,
  images: { unoptimized: true },
  poweredByHeader: false,
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true }
    ];
  },
};

export default nextConfig;
initOpenNextCloudflareForDev();
