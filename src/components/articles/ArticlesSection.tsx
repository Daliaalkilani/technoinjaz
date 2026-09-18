import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import OfficeBlogSection from './OfficeBlogSection';
import heroBgDistortion from '../../assets/hero-bg-distortion.png';
import im1Bg from '../../assets/im1.png';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import '../projects/ProjectsSection.css';
import './ArticlesSection.css';

export interface ArticlesSectionProps {
  showNavigateButton?: boolean;
  onNavigateToArticles?: () => void;
}

const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  showNavigateButton = true,
  onNavigateToArticles
}) => {
  const { theme, lang, t } = useThemeLanguage();

  return (
    <section id="articles" className="articles-section" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
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

      <div className="articles-container">
        {/* Section Header */}
        <div className="articles-header">
          <h2 className="articles-title">{t.articles.heading}</h2>
          <p className="articles-subtitle">
            {t.articles.subtitle}
          </p>
          {showNavigateButton && (
            <button
              type="button"
              className="projects-view-all-btn"
              onClick={onNavigateToArticles || (() => { window.location.hash = '#articles'; })}
            >
              <span>{t.articles.readArticles}</span>
              {lang === 'ar' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </button>
          )}
        </div>

        {/* Office Blog Interactive Grid */}
        <div className="articles-bento-wrapper" style={{ width: '100%' }}>
          <OfficeBlogSection 
            showHeroBanner={false} 
            limit={3} 
            onNavigateToArticlesTab={onNavigateToArticles || (() => { window.location.hash = '#articles'; })} 
          />
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
