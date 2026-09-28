import type { Metadata } from 'next';
import VideosHeader from '@/components/videos/VideosHeader';
import { ProjectReelsFeed } from '@/components/videos/ProjectReelsFeed';
import { pageMetadata } from '@/seo/metadata';
import { JsonLd } from '@/seo/JsonLd';
import { webPage } from '@/seo/schemas';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'المشاريع الحية والنماذج التفاعلية',
  description: 'استعراض مباشر ومقاطع فيديو تفاعلية لأحدث المنظومات الهندسية والأنظمة السحابية والعتادية المطورة من قبل تكنو إنجاز.',
  path: '/videos'
});

export default function VideosPage() {
  return (
    <>
      <JsonLd data={[webPage({ path: '/videos', name: 'المشاريع الحية ومقاطع الفيديو', type: 'CollectionPage' })]} />
      <div className="tab-page-container tab-page-videos" style={{ padding: 0, maxWidth: '100%' }}>
        <VideosHeader />
        <ProjectReelsFeed />
      </div>
    </>
  );
}
