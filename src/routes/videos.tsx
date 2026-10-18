import type { Metadata } from 'next';
import VideosHeader from '@/features/videos/VideosHeader';
import { ProjectReelsFeed } from '@/features/videos/ProjectReelsFeed';
import { pageMetadata } from '@/seo/metadata';
import { JsonLd } from '@/seo/JsonLd';
import { webPage } from '@/seo/schemas';
import { videosList, isoDuration, searchThumbnail, localVideoPath } from '@/data/videosData';
import { SITE_URL, ORG_ID, absoluteUrl } from '@/config/site';
import { localePath, type Lang } from '@/i18n/locale';

export const videosMetadata = (lang: Lang): Metadata =>
  pageMetadata({
    lang,
    title: lang === 'en' ? 'Live Projects & Interactive Demos' : 'المشاريع الحية والنماذج التفاعلية',
    description:
      lang === 'en'
        ? 'Live walkthroughs and interactive videos of the latest engineering systems, cloud platforms and hardware built by Techno Enjaz.'
        : 'استعراض مباشر ومقاطع فيديو تفاعلية لأحدث المنظومات الهندسية والأنظمة السحابية والعتادية المطورة من قبل تكنو إنجاز.',
    path: '/videos'
  });

export function VideosRoute({ lang }: { lang: Lang }) {
  const en = lang === 'en';
  const pageUrl = absoluteUrl(localePath(lang, '/videos'));
  return (
    <>
      <JsonLd data={[
        webPage({ lang, path: '/videos', name: en ? 'Live Projects & Videos' : 'المشاريع الحية ومقاطع الفيديو', type: 'CollectionPage' }),
        // VideoObject per video — enables rich video results in Google Search
        ...videosList.map((v) => ({
          '@type': 'VideoObject',
          '@id': `${pageUrl}#${v.id}`,
          name: en ? v.titleEn : v.title,
          alternateName: en ? v.title : v.titleEn,
          description: en ? v.descriptionEn || v.description : v.description,
          thumbnailUrl: [`${SITE_URL}${searchThumbnail(v)}`],
          uploadDate: `${v.uploadDate}T12:00:00+03:00`,
          duration: isoDuration(v.duration),
          contentUrl: `${SITE_URL}${localVideoPath(v)}`,
          embedUrl: v.youtubeUrl.replace('watch?v=', 'embed/'),
          url: pageUrl,
          sameAs: v.youtubeUrl,
          genre: en ? v.tagEn : v.tag,
          keywords: [v.tag, v.tagEn].join(', '),
          inLanguage: lang,
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
