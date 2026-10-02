'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Bookmark, BookmarkCheck, Play } from 'lucide-react';
import CardSwap, { Card } from '@/features/videos/VideoCardSwap';
import VideoPlayerModal, { type VideoModalData } from '@/features/videos/VideoPlayerModal';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import SectionBackground from './SectionBackground';
import { useSavedProjects } from '@/hooks/useSavedProjects';
import { videosList, type VideoItem } from '@/data/videosData';
import './ProjectsSection.css';
import './VideosSection.css';
import ResponsiveImage from '@/components/ui/ResponsiveImage';


export type { VideoItem };
export { videosList };

export interface VideosSectionProps {
  onNavigateToVideos?: () => void;
  showNavigateButton?: boolean;
}

const VideosSection: React.FC<VideosSectionProps> = ({
  onNavigateToVideos,
  showNavigateButton = true
}) => {
  const { lang, t } = useThemeLanguage();
  const { isSaved, toggleSave } = useSavedProjects();
  const [activeModalVideo, setActiveModalVideo] = useState<VideoModalData | null>(null);

  return (
    <section id="videos" className="videos-section" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Wave background: compressed, sticky on tall mobile sections */}
      <SectionBackground />

      <div className="videos-container">
        {/* Info Column */}
        <div className="videos-info-col">
          <h2 className="videos-title">{t.videos.heading}</h2>
          <p className="videos-subtitle">
            {t.videos.subtitle}
          </p>
          {showNavigateButton && (
            <Link
              href="/videos"
              prefetch={true}
              scroll={true}
              onClick={() => {
                if (typeof window !== 'undefined') window.scrollTo(0, 0);
              }}
              className="projects-view-all-btn"
            >
              <span>{t.hero.exploreVideos}</span>
              {lang === 'ar' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </Link>
          )}
        </div>

        {/* CardSwap Column */}
        <div className="videos-cardswap-col">
          <div className="videos-cardswap-wrapper">
            <CardSwap
              cardDistance={95}
              verticalDistance={85}
              delay={4800}
              pauseOnHover
              width={500}
              height={425}
            >
              {videosList.map((vid) => {
                const isItemSaved = isSaved(vid.id);
                const title = lang === 'en' ? vid.titleEn : vid.title;
                const desc = lang === 'en' ? vid.descriptionEn : vid.description;
                const tag = lang === 'en' ? vid.tagEn : vid.tag;

                return (
                  <Card key={vid.id} customClass="video-card">
                    <div
                      className="video-card-inner"
                      onClick={() => setActiveModalVideo(vid)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setActiveModalVideo(vid);
                        }
                      }}
                    >
                      <div className="video-card-topbar">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="video-card-tag">{tag}</span>
                          <span className="video-card-duration">{vid.duration}</span>
                        </div>
                        <button
                          type="button"
                          className={`video-save-btn ${isItemSaved ? 'is-saved' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSave({
                              id: vid.id,
                              title: vid.title,
                              titleEn: vid.titleEn,
                              category: 'فيديوهات هندسية',
                              categoryLabel: tag,
                              description: vid.description,
                              descriptionEn: vid.descriptionEn,
                              type: 'video',
                              duration: vid.duration,
                              url: vid.youtubeUrl,
                              image: vid.cover
                            });
                          }}
                          title={isItemSaved ? (lang === 'ar' ? 'تم الحفظ في المفضلة' : 'Saved to Library') : (lang === 'ar' ? 'حفظ الفيديو في المفضلة' : 'Save Video to Library')}
                        >
                          {isItemSaved ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
                          <span>{isItemSaved ? (lang === 'ar' ? 'محفوظ' : 'Saved') : (lang === 'ar' ? 'حفظ' : 'Save')}</span>
                        </button>
                      </div>

                      {/* Video Cover Image */}
                      <div className="video-card-screen">
                        <ResponsiveImage
                          src={vid.cover}
                          alt={title}
                          className="video-card-thumb"
                          sizes="(max-width: 767px) 80vw, 500px"
                          loading="lazy"
                          decoding="async"
                          fetchPriority="low"
                        />
                        <div className="video-card-screen-overlay" />
                        <div className="video-play-btn" aria-label={lang === 'ar' ? "مشاهدة الفيديو" : "Watch Video"}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                      </div>

                      {/* Video Title and Details below the image */}
                      <div className="video-card-body">
                        <h3 className="video-card-title">{title}</h3>
                        <p className="video-card-desc">{desc}</p>
                        <div className="video-card-action">
                          <span className="video-watch-link">
                            <Play size={13} fill="currentColor" />
                            <span>{lang === 'ar' ? 'مشاهدة الفيديو' : 'Watch Video'}</span>
                          </span>
                          <a href={vid.youtubeUrl} target="_blank" rel="noopener noreferrer" className="sr-only">
                            {title} - {lang === 'ar' ? 'مشاهدة على يوتيوب' : 'Watch on YouTube'}
                          </a>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </CardSwap>
          </div>
        </div>
      </div>

      {/* In-page Video Player Modal */}
      <VideoPlayerModal
        isOpen={Boolean(activeModalVideo)}
        onClose={() => setActiveModalVideo(null)}
        video={activeModalVideo}
      />
    </section>
  );
};

export default VideosSection;
