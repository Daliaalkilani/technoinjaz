'use client';

import React, { useState, useEffect } from 'react';
import ScrollExpand from '../ui/ScrollExpand';
import ProjectsSection from '../projects/ProjectsSection';
import VideosSection from '../videos/VideosSection';
import ArticlesSection from '../articles/ArticlesSection';
import im3Img from '../../assets/im3.png';
import im2Img from '../../assets/im2.png';
import technoEnjazLogo from '../../assets/Asset-1@4x.png';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import ThemedImage from '../ThemedImage';
import './HomeHero.css';

interface ResponsiveConfig {
  startWidth: number;
  startHeight: number;
  scrollDistance: number;
  holdDistance: number;
  mediaZoom: number;
}

const getResponsiveConfig = (width: number): ResponsiveConfig => {
  if (width < 640) {
    return {
      startWidth: 84,
      startHeight: 54,
      scrollDistance: 0.60,
      holdDistance: 0.20,
      mediaZoom: 1.25,
    };
  } else if (width < 1024) {
    return {
      startWidth: 80,
      startHeight: 58,
      scrollDistance: 0.85,
      holdDistance: 0.25,
      mediaZoom: 1.30,
    };
  } else {
    return {
      startWidth: 76,
      startHeight: 64,
      scrollDistance: 1.10,
      holdDistance: 0.35,
      mediaZoom: 1.35,
    };
  }
};

export interface HomeHeroProps {
  onOpenContact?: () => void;
  onNavigateToProjects?: () => void;
  onNavigateToVideos?: () => void;
  onNavigateToArticles?: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onOpenContact,
  onNavigateToProjects,
  onNavigateToVideos,
  onNavigateToArticles
}) => {
  const { lang, t } = useThemeLanguage();
  const [config, setConfig] = useState<ResponsiveConfig>(() => getResponsiveConfig(1200));

  useEffect(() => {
    setConfig(getResponsiveConfig(window.innerWidth));
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
        media={
          <ThemedImage
            dark={im3Img}
            light={im2Img}
            alt={lang === 'ar' ? "محطة العمل الهندسية" : "Engineering Workstation"}
            className="scroll-expand__media"
            priority={true}
          />
        }
        mediaType="image"
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
              src={(technoEnjazLogo as any)?.src || technoEnjazLogo}
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

export default HomeHero;
