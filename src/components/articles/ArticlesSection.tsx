import React from 'react';
import MagicBento from './MagicBento';
import heroBgDistortion from '../../assets/hero-bg-distortion.png';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import '../projects/ProjectsSection.css';
import './ArticlesSection.css';

const ArticlesSection: React.FC = () => {
  const { lang, t } = useThemeLanguage();

  return (
    <section id="articles" className="articles-section" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
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

      <div className="articles-container">
        {/* Section Header */}
        <div className="articles-header">
          <h2 className="articles-title">{t.articles.heading}</h2>
          <p className="articles-subtitle">
            {t.articles.subtitle}
          </p>
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
