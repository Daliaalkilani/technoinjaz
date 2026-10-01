'use client';

import Link from 'next/link';

import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import MagicBento from './ArticlesBento';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import SectionBackground from './SectionBackground';
import './ProjectsSection.css';
import './ArticlesSection.css';


export interface ArticlesSectionProps {
  showNavigateButton?: boolean;
  onNavigateToArticles?: () => void;
}

const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  showNavigateButton = true,
  onNavigateToArticles
}) => {
  const { lang, t } = useThemeLanguage();

  return (
    <section id="articles" className="articles-section" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Wave background: compressed, sticky on tall mobile sections */}
      <SectionBackground />

      <div className="articles-container">
        {/* Section Header */}
        <div className="articles-header">
          <h2 className="articles-title">{t.articles.heading}</h2>
          <p className="articles-subtitle">
            {t.articles.subtitle}
          </p>
          {showNavigateButton && (
            <Link
              href="/articles"
              prefetch={true}
              className="projects-view-all-btn"
            >
              <span>{t.articles.readArticles}</span>
              {lang === 'ar' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </Link>
          )}
        </div>

        {/* MagicBento Interactive Grid */}
        <div className="articles-bento-wrapper">
          <MagicBento 
            textAutoHide={true}
            enableStars
            enableSpotlight
            enableBorderGlow={true}
            enableTilt
            enableMagnetism
            clickEffect
            spotlightRadius={120}
            particleCount={12}
            glowColor="132, 0, 255"
            disableAnimations={false}
          />
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
