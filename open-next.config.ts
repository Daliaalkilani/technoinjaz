import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

// Every page is prerendered at build time (force-static / generateStaticParams) and
// nothing uses ISR or revalidateTag, so the prerendered pages are served straight from
// the Workers static assets. No R2 bucket, D1 database or Durable Object to provision.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true
});
