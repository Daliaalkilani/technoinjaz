import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Bookmark, BookmarkCheck, Play } from 'lucide-react';
import CardSwap, { Card } from './CardSwap';
import VideoPlayerModal, { type VideoModalData } from './VideoPlayerModal';
import heroBgDistortion from '../../assets/hero-bg-distortion.png';
import im1Bg from '../../assets/im1.png';
import droneNanoImg from '../../assets/videos/video-drone-nano.png';
import armWeldingImg from '../../assets/videos/video-arm-welding.png';
import armVisionImg from '../../assets/videos/video-arm-vision.png';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { useSavedProjects } from '../../hooks/useSavedProjects';
import '../projects/ProjectsSection.css';
import './VideosSection.css';

export interface VideosSectionProps {
  onNavigateToVideos?: () => void;
  showNavigateButton?: boolean;
}

const videosList = [
  {
    id: 'video-drone-nano',
    title: 'طائرة درون ذكية بمتحكم Arduino وبث ESP-CAM اللحظي',
    titleEn: 'Autonomous Smart Drone with Arduino & Real-Time ESP-CAM Streaming',
    tag: 'أنظمة طيران مسيّر',
    tagEn: 'Smart Drone',
    duration: '01:07',
    cover: droneNanoImg,
    youtubeUrl: 'https://www.youtube.com/watch?v=4Sew-i8sB2s',
    description: 'استعراض هندسي متكامل لطائرة درون تعتمد على معالجة استقرار الجايروسكوب، والاتصال اللاسلكي RF433، والبث المرئي الحي عبر ESP-CAM بدقة واحترافية.',
    descriptionEn: 'An integrated quadcopter engineering design combining gyro flight stabilization, RF433 wireless control, and real-time ESP-CAM video streaming.'
  },
  {
    id: 'video-arm-welding',
    title: 'ذراع روبوتية صناعية متقدمة للحام الدقيق بغاز الأرجون',
    titleEn: 'Industrial Robotic Arm for High-Precision Argon Welding',
    tag: 'ميكاترونيكس وروبوتات',
    tagEn: 'Industrial Robotics',
    duration: '01:12',
    cover: armWeldingImg,
    youtubeUrl: 'https://www.youtube.com/watch?v=L2ya6z4tZhg',
    description: 'تطوير ذراع روبوتية متعددة المحاور مبرمجة للأتمتة الصناعية ولحام المعادن فائق الدقة باستخدام غاز الأرجون مع تحكم ميكاترونيكي سلس وموثوق.',
    descriptionEn: 'Development of a multi-axis robotic arm engineered for industrial automation and high-precision argon welding with seamless mechatronic control.'
  },
  {
    id: 'video-arm-vision',
    title: 'التحكم في الذراع الروبوتية بالرؤية الحاسوبية والذكاء الاصطناعي',
    titleEn: 'Vision-Guided AI Robotic Arm Control with Python & OpenCV',
    tag: 'رؤية حاسوبية',
    tagEn: 'Computer Vision',
    duration: '00:16',
    cover: armVisionImg,
    youtubeUrl: 'https://www.youtube.com/watch?v=poKdf5HdaAM',
    description: 'ربط خوارزميات الرؤية الحاسوبية في بايثون مع متحكمات الأردوينو لتتبع الأجسام بالزمن الحقيقي وتوجيه الذراع الروبوتية لمناولتها ذاتياً بدقة فائقة.',
    descriptionEn: 'Real-time integration of computer vision algorithms in Python with Arduino microcontrollers for autonomous object tracking and manipulation.'
  }
];

const VideosSection: React.FC<VideosSectionProps> = ({
  onNavigateToVideos,
  showNavigateButton = true
}) => {
  const { theme, lang, t } = useThemeLanguage();
  const { isSaved, toggleSave } = useSavedProjects();
  const [activeModalVideo, setActiveModalVideo] = useState<VideoModalData | null>(null);

  return (
    <section id="videos" className="videos-section" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Static Background Image with Gradient Blend (No Mouse Interaction) */}
      <div className="projects-grid-distortion-wrapper" style={{ pointerEvents: 'none' }}>
        <div className="projects-grid-distortion-inner">
          <img
            src={theme === 'light' ? im1Bg : heroBgDistortion}
            alt=""
            aria-hidden="true"
            className="projects-bg-static-img"
          />
        </div>
        {/* Ambient vignette and smooth dark gradient blend */}
        <div className="projects-grid-distortion-vignette" />
      </div>

      <div className="videos-container">
        {/* Info Column */}
        <div className="videos-info-col">
          <h2 className="videos-title">{t.videos.heading}</h2>
          <p className="videos-subtitle">
            {t.videos.subtitle}
          </p>
          {showNavigateButton && (
            <button
              type="button"
              className="projects-view-all-btn"
              onClick={onNavigateToVideos || (() => { window.location.hash = '#videos'; })}
            >
              <span>{t.hero.exploreVideos}</span>
              {lang === 'ar' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </button>
          )}
        </div>

        {/* CardSwap Column */}
        <div className="videos-cardswap-col">
          <div style={{ height: '600px', position: 'relative' }}>
            <CardSwap
              cardDistance={95}
              verticalDistance={85}
              delay={3500}
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
                        <img
                          src={vid.cover}
                          alt={title}
                          className="video-card-thumb"
                          loading="lazy"
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
