import { useState, useEffect } from 'react';
import ScrollExpand from '../components/ui/ScrollExpand';
import ProjectsSection from '../components/projects/ProjectsSection';
import VideosSection from '../components/videos/VideosSection';
import ArticlesSection from '../components/articles/ArticlesSection';
import im3Img from '../assets/im3.png';
import im2Img from '../assets/im2.png';
import technoEnjazLogo from '../assets/Asset-1@4x.png';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import './ScrollExpandPrototype.css';

interface ResponsiveConfig {
  startWidth: number;
  startHeight: number;
  scrollDistance: number;
  holdDistance: number;
  mediaZoom: number;
}

const getResponsiveConfig = (width: number): ResponsiveConfig => {
  if (width < 640) {
    // Mobile: ~180vh total track (1 + 0.60 + 0.20 = 1.80)
    return {
      startWidth: 84,
      startHeight: 54,
      scrollDistance: 0.60,
      holdDistance: 0.20,
      mediaZoom: 1.25,
    };
  } else if (width < 1024) {
    // Tablet: ~210vh total track (1 + 0.85 + 0.25 = 2.10)
    return {
      startWidth: 80,
      startHeight: 58,
      scrollDistance: 0.85,
      holdDistance: 0.25,
      mediaZoom: 1.30,
    };
  } else {
    // Desktop: ~245vh total track (1 + 1.10 + 0.35 = 2.45)
    return {
      startWidth: 76,
      startHeight: 64,
      scrollDistance: 1.10,
      holdDistance: 0.35,
      mediaZoom: 1.35,
    };
  }
};

interface ScrollExpandPrototypeProps {
  onOpenContact?: () => void;
  onNavigateToProjects?: () => void;
  onNavigateToVideos?: () => void;
  onNavigateToArticles?: () => void;
}

const ScrollExpandPrototype: React.FC<ScrollExpandPrototypeProps> = ({
  onOpenContact,
  onNavigateToProjects,
  onNavigateToVideos,
  onNavigateToArticles
}) => {
  const { theme, lang, t } = useThemeLanguage();
  const [config, setConfig] = useState<ResponsiveConfig>(() =>
    getResponsiveConfig(typeof window !== 'undefined' ? window.innerWidth : 1200)
  );

  useEffect(() => {
    const handleResize = () => {
      setConfig(getResponsiveConfig(window.innerWidth));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div id="top" className="prototype-root">
      <ScrollExpand
        key={`scroll-expand-${config.startWidth}`}
        src={theme === 'light' ? im2Img : im3Img}
        mediaType="image"
        alt={lang === 'ar' ? "محطة العمل الهندسية" : "Engineering Workstation"}
        startWidth={config.startWidth}
        startHeight={config.startHeight}
        startRadius={24}
        endRadius={0}
        mediaZoom={config.mediaZoom}
        scrollDistance={config.scrollDistance}
        holdDistance={config.holdDistance}
        smoothing={0.08}
        overlayScrim={0.55}
        useWindowScroll={true}
        title={
          <div className="initial-content-wrapper" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <h1 className="initial-title">{t.hero.title}</h1>
          </div>
        }
      >
        <div className="expanded-overlay-wrapper" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <div className="expanded-logo-wrapper">
            <img
              src={technoEnjazLogo}
              alt={t.nav.brand}
              className="expanded-logo"
            />
          </div>
          <h2 className="expanded-hero-title">{t.hero.title}</h2>
          <div className="cta-group">
            <button
              type="button"
              className="cta-button cta-primary"
              onClick={() => {
                if (onNavigateToProjects) {
                  onNavigateToProjects();
                } else {
                  window.location.hash = '#projects';
                }
              }}
            >
              {t.hero.exploreProjects}
            </button>
            <button
              type="button"
              className="cta-button cta-secondary"
              onClick={() => {
                if (onOpenContact) {
                  onOpenContact();
                } else {
                  const contactEl = document.getElementById('about');
                  if (contactEl) {
                    contactEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
            >
              {lang === 'ar' ? 'تقديم طلب مشروع' : 'Request a Project'}
            </button>
          </div>
        </div>
      </ScrollExpand>

      {/* Dedicated Projects section placed immediately after Hero */}
      <ProjectsSection onNavigateToProjects={onNavigateToProjects} />

      {/* Dedicated Videos section using CardSwap */}
      <div className="scroll-deferred-section">
        <VideosSection onNavigateToVideos={onNavigateToVideos} />
      </div>

      {/* Dedicated Articles section using MagicBento */}
      <div className="scroll-deferred-section">
        <ArticlesSection onNavigateToArticles={onNavigateToArticles} />
      </div>
    </div>
  );
};

export default ScrollExpandPrototype;
