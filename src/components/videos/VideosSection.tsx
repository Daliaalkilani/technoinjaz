import React from 'react';
import { ArrowLeft, ArrowRight, Bookmark, BookmarkCheck } from 'lucide-react';
import CardSwap, { Card } from './CardSwap';
import heroBgDistortion from '../../assets/hero-bg-distortion.png';
import im1Bg from '../../assets/im1.png';
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
    id: 'video-1',
    title: 'نظام التحكم والأمان البيومتري',
    titleEn: 'Biometric Security & Access Control',
    tag: 'عرض حي',
    tagEn: 'Live Demo',
    duration: '03:42',
    description: 'استعراض تفاعلي لخوارزميات التعرف المتقدمة والتحقق الذكي متعدد المراحل.',
    descriptionEn: 'Interactive demonstration of facial recognition algorithms and multi-stage verification.'
  },
  {
    id: 'video-2',
    title: 'معمارية معالجة التدفقات اللحظية',
    titleEn: 'Real-Time Stream Processing Architecture',
    tag: 'محاكاة تقنية',
    tagEn: 'Simulation',
    duration: '02:18',
    description: 'رصد ومراقبة استجابة الخوادم اللحظية وإدارة عمليات التحقق الآمن للخزينة.',
    descriptionEn: 'Real-time telemetry and monitoring of server response rates and secure clearance workflows.'
  },
  {
    id: 'video-3',
    title: 'منظومة الإنذار والكشف التلقائي',
    titleEn: 'Intrusion Detection & Alert System',
    tag: 'توثيق ميداني',
    tagEn: 'Field Demo',
    duration: '04:05',
    description: 'اختبار آليات الرصد الفوري ومطابقة بيانات التصريح ضد محاولات التسلل غير المخولة.',
    descriptionEn: 'Live benchmark testing anomaly detection routines against unauthorized access attempts.'
  }
];

const VideosSection: React.FC<VideosSectionProps> = ({
  onNavigateToVideos,
  showNavigateButton = true
}) => {
  const { theme, lang, t } = useThemeLanguage();
  const { isSaved, toggleSave } = useSavedProjects();

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
              delay={3000}
              pauseOnHover
            >
              {videosList.map((vid) => {
                const isItemSaved = isSaved(vid.id);
                const title = lang === 'en' ? vid.titleEn : vid.title;
                const desc = lang === 'en' ? vid.descriptionEn : vid.description;
                const tag = lang === 'en' ? vid.tagEn : vid.tag;

                return (
                  <Card key={vid.id} customClass="video-card">
                    <div className="video-card-inner">
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
                              category: 'فيديوهات تقنية',
                              categoryLabel: tag,
                              description: vid.description,
                              descriptionEn: vid.descriptionEn,
                              type: 'video',
                              duration: vid.duration
                            });
                          }}
                          title={isItemSaved ? (lang === 'ar' ? 'تم الحفظ في المفضلة' : 'Saved to Library') : (lang === 'ar' ? 'حفظ الفيديو في المفضلة' : 'Save Video to Library')}
                        >
                          {isItemSaved ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
                          <span>{isItemSaved ? (lang === 'ar' ? 'محفوظ' : 'Saved') : (lang === 'ar' ? 'حفظ' : 'Save')}</span>
                        </button>
                      </div>
                      <div className="video-card-screen">
                        <div className="video-play-btn" aria-label={lang === 'ar' ? "تشغيل الفيديو" : "Play Video"}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                        <div className="video-screen-glow" />
                      </div>
                      <div className="video-card-body">
                        <h3>{title}</h3>
                        <p>{desc}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideosSection;
