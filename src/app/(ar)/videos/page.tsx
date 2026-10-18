import type { Metadata } from 'next';
import { videosMetadata, VideosRoute } from '@/routes/videos';

export const dynamic = 'force-static';

export const metadata: Metadata = videosMetadata('ar');

export default function VideosPage() {
  return <VideosRoute lang="ar" />;
}
