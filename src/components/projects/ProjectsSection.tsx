import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import InfiniteSpiral, { type InfiniteSpiralItem } from '../ui/InfiniteSpiral';
import heroBgDistortion from '../../assets/hero-bg-distortion.png';
import im1Bg from '../../assets/im1.png';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import './ProjectsSection.css';

import proj01 from '../../assets/projects/techno-projects/project-01.png';
import proj02 from '../../assets/projects/techno-projects/project-02.png';
import proj03 from '../../assets/projects/techno-projects/project-03.png';
import proj04 from '../../assets/projects/techno-projects/project-04.png';
import proj05 from '../../assets/projects/techno-projects/project-05.png';
import proj06 from '../../assets/projects/techno-projects/project-06.png';
import proj07 from '../../assets/projects/techno-projects/project-07.png';
import proj08 from '../../assets/projects/techno-projects/project-08.png';
import proj09 from '../../assets/projects/techno-projects/project-09.jpg';
import proj10 from '../../assets/projects/techno-projects/project-10.jpg';
import proj11 from '../../assets/projects/techno-projects/project-11.jpg';
import proj12 from '../../assets/projects/techno-projects/project-12.jpg';
import proj13 from '../../assets/projects/techno-projects/project-13.jpg';
import proj14 from '../../assets/projects/techno-projects/project-14.jpg';

const getProjectImages = (lang: string): InfiniteSpiralItem[] => [
  {
    src: proj01,
    alt: lang === 'ar' ? 'منظومة الأمان الذكي والتعرف البيومتري' : 'Smart Security & Biometric Recognition System'
  },
  {
    src: proj02,
    alt: lang === 'ar' ? 'لوحة التحكم السحابية وإدارة الأجهزة' : 'Cloud Dashboard & Device Management'
  },
  {
    src: proj03,
    alt: lang === 'ar' ? 'محطة الرصد البيئي والاستشعار الذكي' : 'Environmental Monitoring & Smart Sensing Station'
  },
  {
    src: proj04,
    alt: lang === 'ar' ? 'أنظمة الأتمتة والتحكم الصناعي الذكي' : 'Automation & Smart Industrial Control Systems'
  },
  {
    src: proj05,
    alt: lang === 'ar' ? 'وحدة المعالجة الطرفية والذكاء الاصطناعي' : 'Edge Computing & AI Processing Unit'
  },
  {
    src: proj06,
    alt: lang === 'ar' ? 'شبكة المستشعرات اللاسلكية المتكاملة' : 'Integrated Wireless Sensor Network'
  },
  {
    src: proj07,
    alt: lang === 'ar' ? 'واجهة التحليلات المتقدمة للبيانات الهندسية' : 'Advanced Engineering Data Analytics Interface'
  },
  {
    src: proj08,
    alt: lang === 'ar' ? 'نظام المراقبة وتتبع العمليات في الوقت الفعلي' : 'Real-Time Operation Tracking & Surveillance System'
  },
  {
    src: proj09,
    alt: lang === 'ar' ? 'نموذج أولي لنظام المراقبة والأمان الميداني' : 'Field Security & Monitoring System Prototype'
  },
  {
    src: proj10,
    alt: lang === 'ar' ? 'التطوير البرمجي والعتادي المتكامل' : 'Integrated Hardware & Software Development'
  },
  {
    src: proj11,
    alt: lang === 'ar' ? 'منصة فحص واختبار الدوائر الإلكترونية' : 'Electronic Circuit Testing & Verification Platform'
  },
  {
    src: proj12,
    alt: lang === 'ar' ? 'تكامل منظومات الاستشعار والمتحكمات الدقيقة' : 'Sensors & Microcontrollers Integration'
  },
  {
    src: proj13,
    alt: lang === 'ar' ? 'معايرة الأجهزة وتتبع الإشارات الرقمية' : 'Hardware Calibration & Digital Signal Tracking'
  },
  {
    src: proj14,
    alt: lang === 'ar' ? 'الفحص الميداني واختبار الأداء الهندسي' : 'Field Testing & Engineering Performance Verification'
  }
];

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
