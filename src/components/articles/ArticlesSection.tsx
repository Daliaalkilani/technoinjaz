import React from 'react';
import MagicBento from './MagicBento';
import GridDistortion from '../ui/GridDistortion';
import heroBgDistortion from '../../assets/hero-bg-distortion.png';
import '../projects/ProjectsSection.css';
import './ArticlesSection.css';

const ArticlesSection: React.FC = () => {
  return (
    <section id="articles" className="articles-section">
      {/* Interactive Grid Distortion Background */}
      <div className="projects-grid-distortion-wrapper">
        <div className="projects-grid-distortion-inner">
          <GridDistortion
            imageSrc={heroBgDistortion}
            grid={49}
            mouse={0.1}
            strength={0.05}
            relaxation={0.53}
          />
        </div>
        {/* Ambient vignette and smooth dark gradient blend */}
        <div className="projects-grid-distortion-vignette" />
      </div>

      <div className="articles-container">
        {/* Section Header */}
        <div className="articles-header">
          <h2 className="articles-title">مقالاتنا الهندسية</h2>
          <p className="articles-subtitle">
            دراسات وأبحاث تقنية توثق التجارب المعمارية والخوارزميات المبتكرة في مشاريع تكنو إنجاز
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
