import type { Metadata } from 'next';
import VideosHeader from '@/features/videos/VideosHeader';
import { ProjectReelsFeed } from '@/features/videos/ProjectReelsFeed';
import { pageMetadata } from '@/seo/metadata';
import { JsonLd } from '@/seo/JsonLd';
import { webPage } from '@/seo/schemas';
import { videosList, isoDuration, searchThumbnail, localVideoPath } from '@/data/videosData';
import { SITE_URL, ORG_ID } from '@/config/site';

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
          '@id': `${SITE_URL}/videos#${v.id}`,
          name: v.title,
          alternateName: v.titleEn,
          description: v.description,
          thumbnailUrl: [`${SITE_URL}${searchThumbnail(v)}`],
          uploadDate: `${v.uploadDate}T12:00:00+03:00`,
          duration: isoDuration(v.duration),
          contentUrl: `${SITE_URL}${localVideoPath(v)}`,
          embedUrl: v.youtubeUrl.replace('watch?v=', 'embed/'),
          url: `${SITE_URL}/videos`,
          sameAs: v.youtubeUrl,
          genre: v.tag,
          keywords: [v.tag, v.tagEn].join(', '),
          inLanguage: ['ar', 'en'],
          isFamilyFriendly: true,
          publisher: { '@id': ORG_ID }
        }))
      ]} />
      <div className="tab-page-container tab-page-videos" style={{ padding: 0, maxWidth: '100%' }}>
        <VideosHeader />
        <ProjectReelsFeed />
      </div>
    </>
  );
}
