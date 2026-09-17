import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import CardSwap, { Card } from './CardSwap';
import heroBgDistortion from '../../assets/hero-bg-distortion.png';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import '../projects/ProjectsSection.css';
import './VideosSection.css';

export interface VideosSectionProps {
  onNavigateToVideos?: () => void;
  showNavigateButton?: boolean;
}

const VideosSection: React.FC<VideosSectionProps> = ({
  onNavigateToVideos,
  showNavigateButton = true
}) => {
  const { lang, t } = useThemeLanguage();

  return (
    <section id="videos" className="videos-section" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Static Background Image with Gradient Blend (No Mouse Interaction) */}
      <div className="projects-grid-distortion-wrapper" style={{ pointerEvents: 'none' }}>
        <div className="projects-grid-distortion-inner">
          <img
            src={heroBgDistortion}
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
              <Card customClass="video-card">
                <div className="video-card-inner">
                  <div className="video-card-topbar">
                    <span className="video-card-tag">{lang === 'ar' ? 'عرض حي' : 'Live Demo'}</span>
                    <span className="video-card-duration">03:42</span>
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
                    <h3>{lang === 'ar' ? 'نظام التحكم والأمان البيومتري' : 'Biometric Security & Access Control'}</h3>
                    <p>{lang === 'ar' ? 'استعراض تفاعلي لخوارزميات التعرف المتقدمة والتحقق الذكي متعدد المراحل.' : 'Interactive demonstration of facial recognition algorithms and multi-stage verification.'}</p>
                  </div>
                </div>
              </Card>

              <Card customClass="video-card">
                <div className="video-card-inner">
                  <div className="video-card-topbar">
                    <span className="video-card-tag">{lang === 'ar' ? 'محاكاة تقنية' : 'Simulation'}</span>
                    <span className="video-card-duration">02:18</span>
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
                    <h3>{lang === 'ar' ? 'معمارية معالجة التدفقات اللحظية' : 'Real-Time Stream Processing Architecture'}</h3>
                    <p>{lang === 'ar' ? 'رصد ومراقبة استجابة الخوادم اللحظية وإدارة عمليات التحقق الآمن للخزينة.' : 'Real-time telemetry and monitoring of server response rates and secure clearance workflows.'}</p>
                  </div>
                </div>
              </Card>

              <Card customClass="video-card">
                <div className="video-card-inner">
                  <div className="video-card-topbar">
                    <span className="video-card-tag">{lang === 'ar' ? 'توثيق ميداني' : 'Field Demo'}</span>
                    <span className="video-card-duration">04:05</span>
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
                    <h3>{lang === 'ar' ? 'منظومة الإنذار والكشف التلقائي' : 'Intrusion Detection & Alert System'}</h3>
                    <p>{lang === 'ar' ? 'اختبار آليات الرصد الفوري ومطابقة بيانات التصريح ضد محاولات التسلل غير المخولة.' : 'Live benchmark testing anomaly detection routines against unauthorized access attempts.'}</p>
                  </div>
                </div>
              </Card>
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideosSection;
