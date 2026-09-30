'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ScrollExpand from '@/components/effects/ScrollExpand';
import ProjectsSection from './ProjectsSection';

const VideosSection = dynamic(() => import('./VideosSection'), {
  ssr: true,
  loading: () => <div style={{ minHeight: '600px' }} />
});

const ArticlesSection = dynamic(() => import('./ArticlesSection'), {
  ssr: true,
  loading: () => <div style={{ minHeight: '600px' }} />
});
import im3Img from '@/assets/home/hero-dark.png';
import im2Img from '@/assets/home/hero-light.png';
import technoEnjazLogo from '@/assets/brand/logo.png';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import ThemedImage from '@/components/ui/ThemedImage';
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
      scrollDistance: 0.55,
      holdDistance: 0.03,
      mediaZoom: 1.25,
    };
  } else if (width < 1024) {
    return {
      startWidth: 80,
      startHeight: 58,
      scrollDistance: 0.75,
      holdDistance: 0.05,
      mediaZoom: 1.30,
    };
  } else {
    return {
      startWidth: 76,
      startHeight: 64,
      scrollDistance: 0.90,
      holdDistance: 0.06,
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
            <Link
              href="/projects"
              scroll={true}
              onClick={() => {
                if (typeof window !== 'undefined') window.scrollTo(0, 0);
              }}
              className="cta-button cta-primary"
            >
              {t.hero.exploreProjects}
            </Link>
            <Link
              href="/contact"
              className="cta-button cta-secondary"
            >
              {lang === 'ar' ? 'تقديم طلب مشروع' : 'Request a Project'}
            </Link>
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
