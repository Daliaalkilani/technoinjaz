import React, { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import './MagicBento.css';

import ch1 from '../../assets/projects/techno-projects/chapter4-01.webp';
import ch2 from '../../assets/projects/techno-projects/chapter4-02.webp';
import ch3 from '../../assets/projects/techno-projects/chapter4-03.webp';
import ch4 from '../../assets/projects/techno-projects/chapter4-04.webp';
import ch5 from '../../assets/projects/techno-projects/chapter4-05.webp';
import ch6 from '../../assets/projects/techno-projects/chapter4-06.webp';

export interface BentoCardItem {
  color?: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  label: string;
  labelEn?: string;
  image?: string;
}

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '132, 0, 255';
const MOBILE_BREAKPOINT = 768;

const defaultCardData: BentoCardItem[] = [
  {
    color: '#0d1629',
    title: 'خوارزميات التدفق والتحكم الأمني',
    titleEn: 'Security Flow & Control Algorithms',
    description: 'تحليل شجرة القرار ومنطق التحقق المتسلسل لأبواب الخزائن الذكية.',
    descriptionEn: 'Decision-tree analysis and sequential validation logic for smart vault access.',
    label: 'هندسة النظم',
    labelEn: 'Systems Engineering',
    image: ch1
  },
  {
    color: '#0d1629',
    title: 'معمارية قواعد البيانات المشفرة',
    titleEn: 'Encrypted Database Architecture',
    description: 'هيكلية تسجيل بيانات الدخول والامتثال لمعايير الحماية المصرفية.',
    descriptionEn: 'Access audit logging structure compliant with banking security standards.',
    label: 'أمن البيانات',
    labelEn: 'Data Security',
    image: ch2
  },
  {
    color: '#0d1629',
    title: 'أنظمة التحقق البيومتري الميداني',
    titleEn: 'Field Biometric Verification Systems',
    description: 'مطابقة المعالم الحيوية للوجوه بدقة حاسوبية فائقة في أجزاء من الثانية.',
    descriptionEn: 'Sub-second real-time biometric face landmark matching with high precision.',
    label: 'الرؤية الحاسوبية',
    labelEn: 'Computer Vision',
    image: ch4
  },
  {
    color: '#0d1629',
    title: 'هندسة العينات والمجموعات المرجعية',
    titleEn: 'Dataset Engineering & Reference Corpora',
    description: 'تنقية ومعالجة بيانات التدريب لرفع دقة الاعتماد وتقليل نسب الخطأ.',
    descriptionEn: 'Training data refinement and curation to minimize false rejection rates.',
    label: 'الذكاء الاصطناعي',
    labelEn: 'Artificial Intelligence',
    image: ch3
  },
  {
    color: '#0d1629',
    title: 'سجلات التدقيق والمراقبة اللحظية',
    titleEn: 'Audit Logs & Real-Time Telemetry',
    description: 'أرشفة فورية للمحاولات وتتبع مسارات الوصول للرقابة الجنائية.',
    descriptionEn: 'Instant event streaming and audit trail tracing for forensic inspection.',
    label: 'التدقيق الأمني',
    labelEn: 'Security Audit',
    image: ch5
  },
  {
    color: '#0d1629',
    title: 'منظومة رصد محاولات الاختراق',
    titleEn: 'Intrusion Detection & Defense',
    description: 'تنبيهات فورية وإجراءات حماية تلقائية عند كشف وجوه غير مصرح بها.',
    descriptionEn: 'Instant alert triggers and automated defensive routines upon unauthorized access.',
    label: 'الاستجابة الفورية',
    labelEn: 'Incident Response',
    image: ch6
  }
];

const createParticleElement = (x: number, y: number, color = DEFAULT_GLOW_COLOR): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

interface ParticleCardProps {
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

const ParticleCard: React.FC<ParticleCardProps> = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<number[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(id => window.clearTimeout(id));
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = window.setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        }
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div
      ref={cardRef}
      className={`${className} particle-container`}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
    >
      {children}
    </div>
  );
};

interface GlobalSpotlightProps {
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}

const GlobalSpotlight: React.FC<GlobalSpotlightProps> = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR
}) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    let isGridVisible = false;
    let cardRectsCache: Array<{ element: HTMLElement; rect: DOMRect; centerX: number; centerY: number; maxRadius: number }> = [];
    let sectionRect: DOMRect | null = null;

    const updateRects = () => {
      if (!gridRef.current || !isGridVisible) return;
      const section = gridRef.current.closest('.bento-section');
      sectionRect = section?.getBoundingClientRect() || null;
      const cards = gridRef.current.querySelectorAll<HTMLElement>('.magic-bento-card');
      cardRectsCache = Array.from(cards).map(card => {
        const r = card.getBoundingClientRect();
        return {
          element: card,
          rect: r,
          centerX: r.left + r.width / 2,
          centerY: r.top + r.height / 2,
          maxRadius: Math.max(r.width, r.height) / 2
        };
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isGridVisible = entry.isIntersecting;
        if (isGridVisible) {
          updateRects();
        } else {
          if (spotlightRef.current) {
            spotlightRef.current.style.opacity = '0';
          }
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(gridRef.current);

    const handleScrollOrResize = () => {
      if (isGridVisible) updateRects();
    };
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isGridVisible || !spotlightRef.current || !gridRef.current) return;

      if (!sectionRect) updateRects();
      const rect = sectionRect;
      const mouseInside =
        rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      isInsideSection.current = mouseInside || false;

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        cardRectsCache.forEach(item => {
          item.element.style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cardRectsCache.forEach(item => {
        const distance =
          Math.hypot(e.clientX - item.centerX, e.clientY - item.centerY) - item.maxRadius;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        const relativeX = ((e.clientX - item.rect.left) / item.rect.width) * 100;
        const relativeY = ((e.clientY - item.rect.top) / item.rect.height) * 100;
        item.element.style.setProperty('--glow-x', `${relativeX}%`);
        item.element.style.setProperty('--glow-y', `${relativeY}%`);
        item.element.style.setProperty('--glow-intensity', glowIntensity.toString());
        item.element.style.setProperty('--glow-radius', `${spotlightRadius}px`);
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      cardRectsCache.forEach(item => {
        item.element.style.setProperty('--glow-intensity', '0');
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (spotlight.parentNode) {
        spotlight.parentNode.removeChild(spotlight);
      }
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

interface BentoCardGridProps {
  children: React.ReactNode;
  gridRef: React.RefObject<HTMLDivElement | null>;
}

const BentoCardGrid: React.FC<BentoCardGridProps> = ({ children, gridRef }) => (
  <div className="card-grid bento-section" ref={gridRef}>
    {children}
  </div>
);

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

export interface MagicBentoProps {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  cards?: BentoCardItem[];
}

const MagicBento: React.FC<MagicBentoProps> = ({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
  cards = defaultCardData
}) => {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const gridRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  return (
    <>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <BentoCardGrid gridRef={gridRef}>
        {cards.map((card, index) => {
          const cardLabel = isEn ? (card.labelEn || card.label) : card.label;
          const cardTitle = isEn ? (card.titleEn || card.title) : card.title;
          const cardDesc = isEn ? (card.descriptionEn || card.description) : card.description;

          const baseClassName = `magic-bento-card ${textAutoHide ? 'magic-bento-card--text-autohide' : ''} ${enableBorderGlow ? 'magic-bento-card--border-glow' : ''}`;
          const cardProps = {
            className: baseClassName,
            style: {
              backgroundColor: card.color || '#0d1629',
              '--glow-color': glowColor
            } as React.CSSProperties
          };

          const cardContent = (
            <>
              <div className="magic-bento-card__header">
                <div className="magic-bento-card__label">{cardLabel}</div>
              </div>

              {card.image && (
                <div className="magic-bento-card__media">
                  <img
                    src={card.image}
                    alt={cardTitle}
                    className="magic-bento-card__img"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="magic-bento-card__content">
                <h3 className="magic-bento-card__title">{cardTitle}</h3>
                <p className="magic-bento-card__description">{cardDesc}</p>
              </div>
            </>
          );

          if (enableStars) {
            return (
              <ParticleCard
                key={index}
                {...cardProps}
                disableAnimations={shouldDisableAnimations}
                particleCount={particleCount}
                glowColor={glowColor}
                enableTilt={enableTilt}
                clickEffect={clickEffect}
                enableMagnetism={enableMagnetism}
              >
                {cardContent}
              </ParticleCard>
            );
          }

          return (
            <div
              key={index}
              {...cardProps}
            >
              {cardContent}
            </div>
          );
        })}
      </BentoCardGrid>
    </>
  );
};

export default MagicBento;
