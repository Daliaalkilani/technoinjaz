import type { Metadata } from 'next';
import VideosHeader from '@/components/videos/VideosHeader';
import { ProjectReelsFeed } from '@/components/videos/ProjectReelsFeed';
import { SITE_URL } from '@/config/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'المشاريع الحية والنماذج التفاعلية | تكنو إنجاز',
  description: 'استعراض مباشر ومقاطع فيديو تفاعلية لأحدث المنظومات الهندسية والأنظمة السحابية والعتادية المطورة من قبل تكنو إنجاز.',
  alternates: {
    canonical: `${SITE_URL}/videos`
  }
};

export default function VideosPage() {
  return (
    <div className="tab-page-container tab-page-videos" style={{ padding: 0, maxWidth: '100%' }}>
      <VideosHeader />
      <ProjectReelsFeed />
    </div>
  );
}
