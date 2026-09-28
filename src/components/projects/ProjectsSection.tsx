import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import InfiniteSpiral, { type InfiniteSpiralItem } from '../ui/InfiniteSpiral';
import heroBgDistortion from '../../assets/hero-bg-distortion.png';
import im1Bg from '../../assets/im1.png';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { PROJECTS_DATA } from '../../data/projectsData';
import './ProjectsSection.css';

const getProjectImages = (lang: string): InfiniteSpiralItem[] => 
  PROJECTS_DATA.map((p) => ({
    src: p.image,
    alt: lang === 'en' ? (p.seoTitle || p.title) : p.altText
  }));

export interface ProjectsSectionProps {
  onNavigateToProjects?: () => void;
  showNavigateButton?: boolean;
}

const ProjectsSection = ({
  onNavigateToProjects,
  showNavigateButton = true
}: ProjectsSectionProps) => {
  const { theme, lang, t } = useThemeLanguage();
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 640 : false));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="projects-section" id="projects" aria-label={lang === 'ar' ? "قسم المشاريع" : "Projects Section"} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
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

      <div className="projects-container">
        <div className="projects-intro">
          <h2 className="projects-heading">{t.hero.projectsHeading}</h2>
          <p className="projects-statement">
            {t.hero.projectsStatement}
          </p>
          {showNavigateButton && (
            <button
              type="button"
              className="projects-view-all-btn"
              onClick={onNavigateToProjects || (() => { window.location.hash = '#projects'; })}
            >
              <span>{t.hero.exploreProjects}</span>
              {lang === 'ar' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </button>
          )}
        </div>

        <div className="projects-spiral-wrapper">
          <InfiniteSpiral
            items={getProjectImages(lang)}
            animationMode="all"
            speed={1.1}
            radius={isMobile ? 190 : 255}
            cardWidth={isMobile ? 124 : 144}
            cardHeight={isMobile ? 118 : 136}
            verticalSpacing={isMobile ? 62 : 72}
            perspective={1800}
            cardRadius={21}
            centerScale={1.22}
            edgeBlur={5.5}
            cardsPerTurn={9}
            pauseOnHover={false}
            direction="down"
            rotation={6}
            cardTilt={-11}
            edgeFade={0.3}
            imageFit="cover"
            grayscale={0}
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
