'use client';

import Link from 'next/link';

import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import InfiniteSpiral, { type InfiniteSpiralItem } from '@/components/effects/InfiniteSpiral';
import heroBgDistortion from '@/assets/home/section-bg-dark.png';
import im1Bg from '@/assets/home/section-bg-light.png';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import ThemedImage from '@/components/ui/ThemedImage';
import { PROJECTS_DATA } from '@/data/projectsData';
import './ProjectsSection.css';

import proj01 from '@/assets/showcase/project-01.png';
import proj02 from '@/assets/showcase/project-02.png';
import proj03 from '@/assets/showcase/project-03.png';
import proj04 from '@/assets/showcase/project-04.png';
import proj05 from '@/assets/showcase/project-05.png';
import proj06 from '@/assets/showcase/project-06.png';
import proj07 from '@/assets/showcase/project-07.png';
import proj08 from '@/assets/showcase/project-08.png';
import proj09 from '@/assets/showcase/project-09.jpg';
import proj10 from '@/assets/showcase/project-10.jpg';
import proj11 from '@/assets/showcase/project-11.jpg';
import proj12 from '@/assets/showcase/project-12.jpg';
import proj13 from '@/assets/showcase/project-13.jpg';
import proj14 from '@/assets/showcase/project-14.jpg';

const getProjectImages = (lang: string): InfiniteSpiralItem[] => {
  const images = [proj01, proj02, proj03, proj04, proj05, proj06, proj07, proj08, proj09, proj10, proj11, proj12, proj13, proj14];
  const titlesAr = [
    'منظومة الأمان الذكي والتعرف البيومتري',
    'لوحة التحكم السحابية وإدارة الأجهزة',
    'محطة الرصد البيئي والاستشعار الذكي',
    'أنظمة الأتمتة والتحكم الصناعي الذكي',
    'وحدة المعالجة الطرفية والذكاء الاصطناعي',
    'شبكة المستشعرات اللاسلكية المتكاملة',
    'واجهة التحليلات المتقدمة للبيانات الهندسية',
    'نظام المراقبة وتتبع العمليات في الوقت الفعلي',
    'نموذج أولي لنظام المراقبة والأمان الميداني',
    'التطوير البرمجي والعتادي المتكامل',
    'منصة فحص واختبار الدوائر الإلكترونية',
    'تكامل منظومات الاستشعار والمتحكمات الدقيقة',
    'معايرة الأجهزة وتتبع الإشارات الرقمية',
    'الفحص الميداني واختبار الأداء الهندسي'
  ];
  const titlesEn = [
    'Smart Security & Biometric Recognition System',
    'Cloud Dashboard & Device Management',
    'Environmental Monitoring & Smart Sensing Station',
    'Automation & Smart Industrial Control Systems',
    'Edge Computing & AI Processing Unit',
    'Integrated Wireless Sensor Network',
    'Advanced Engineering Data Analytics Interface',
    'Real-Time Operation Tracking & Surveillance System',
    'Field Security & Monitoring System Prototype',
    'Integrated Hardware & Software Development',
    'Electronic Circuit Testing & Verification Platform',
    'Sensors & Microcontrollers Integration',
    'Hardware Calibration & Digital Signal Tracking',
    'Field Testing & Engineering Performance Verification'
  ];

  return images.map((src, index) => ({
    src,
    alt: lang === 'ar' ? titlesAr[index] : titlesEn[index],
    href: `/projects/${PROJECTS_DATA[index]?.slug || ''}`
  }));
};

export interface ProjectsSectionProps {
  onNavigateToProjects?: () => void;
  showNavigateButton?: boolean;
}

const ProjectsSection = ({
  onNavigateToProjects,
  showNavigateButton = true
}: ProjectsSectionProps) => {
  const { lang, t } = useThemeLanguage();
  const [spiralConfig, setSpiralConfig] = useState({
    radius: 255,
    cardWidth: 144,
    cardHeight: 136,
    verticalSpacing: 72,
    perspective: 1800,
    cardRadius: 21,
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        // Small phones & compact Androids (320px - 480px)
        setSpiralConfig({
          radius: 120,
          cardWidth: 92,
          cardHeight: 88,
          verticalSpacing: 46,
          perspective: 1100,
          cardRadius: 14,
        });
      } else if (w < 768) {
        // Mainstream phones & phablets (480px - 768px)
        setSpiralConfig({
          radius: 155,
          cardWidth: 112,
          cardHeight: 106,
          verticalSpacing: 54,
          perspective: 1400,
          cardRadius: 16,
        });
      } else if (w < 1024) {
        // Tablets (768px - 1024px)
        setSpiralConfig({
          radius: 195,
          cardWidth: 128,
          cardHeight: 122,
          verticalSpacing: 64,
          perspective: 1600,
          cardRadius: 18,
        });
      } else {
        // Desktop / Large screen (identical to original)
        setSpiralConfig({
          radius: 255,
          cardWidth: 144,
          cardHeight: 136,
          verticalSpacing: 72,
          perspective: 1800,
          cardRadius: 21,
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="projects-section" id="projects" aria-label={lang === 'ar' ? "قسم المشاريع" : "Projects Section"} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Static Background Image with Gradient Blend (No Mouse Interaction) */}
      <div className="projects-grid-distortion-wrapper" style={{ pointerEvents: 'none' }}>
        <div className="projects-grid-distortion-inner">
          <ThemedImage
            dark={heroBgDistortion}
            light={im1Bg}
            alt=""
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
            <Link
              href="/projects"
              className="projects-view-all-btn"
            >
              <span>{t.hero.exploreProjects}</span>
              {lang === 'ar' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </Link>
          )}
        </div>

        <div className="projects-spiral-wrapper">
          <InfiniteSpiral
            items={getProjectImages(lang)}
            animationMode="all"
            speed={1.1}
            radius={spiralConfig.radius}
            cardWidth={spiralConfig.cardWidth}
            cardHeight={spiralConfig.cardHeight}
            verticalSpacing={spiralConfig.verticalSpacing}
            perspective={spiralConfig.perspective}
            cardRadius={spiralConfig.cardRadius}
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
