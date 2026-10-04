import type { Metadata } from 'next';
import VideosHeader from '@/features/videos/VideosHeader';
import { ProjectReelsFeed } from '@/features/videos/ProjectReelsFeed';
import { pageMetadata } from '@/seo/metadata';
import { JsonLd } from '@/seo/JsonLd';
import { webPage } from '@/seo/schemas';
import { videosList } from '@/data/videosData';
import { SITE_URL } from '@/config/site';

export const dynamic = 'force-static';

export const metadata: Metadata = pageMetadata({
  title: 'المشاريع الحية والنماذج التفاعلية',
  description: 'استعراض مباشر ومقاطع فيديو تفاعلية لأحدث المنظومات الهندسية والأنظمة السحابية والعتادية المطورة من قبل تكنو إنجاز.',
  path: '/videos'
});

export default function VideosPage() {
  return (
    <>
      <JsonLd data={[
        webPage({ path: '/videos', name: 'المشاريع الحية ومقاطع الفيديو', type: 'CollectionPage' }),
        // VideoObject per video — enables rich video results in Google Search
        ...videosList.map((v) => ({
          '@type': 'VideoObject',
          name: v.title,
          description: v.description,
          thumbnailUrl: [`${SITE_URL}${v.cover}`],
          uploadDate: '2025-01-01T00:00:00+03:00',
          embedUrl: v.youtubeUrl.replace('watch?v=', 'embed/'),
          contentUrl: v.youtubeUrl,
          inLanguage: ['ar', 'en'],
          publisher: { '@type': 'Organization', name: 'تكنو إنجاز', url: SITE_URL }
        }))
      ]} />
      <div className="tab-page-container tab-page-videos" style={{ padding: 0, maxWidth: '100%' }}>
        <VideosHeader />
        <ProjectReelsFeed />
      </div>
    </>
  );
}
