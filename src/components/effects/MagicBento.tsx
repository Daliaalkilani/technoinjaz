'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import './MagicBento.css';

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
    title: 'التوأم الرقمي: ما هو وكيف يعمل وما أهم تطبيقاته؟',
    titleEn: 'Digital Twin: Architecture & Applications',
    description: 'تمثيل رقمي قائم على البيانات للأصول والعمليات، للمراقبة واختبار السيناريوهات ودعم القرار.',
    descriptionEn: 'Data-driven virtual synchronization of physical assets for simulation and decision support.',
    label: 'التحول الرقمي',
    labelEn: 'Digital Transformation',
    image: '/images/articles/digital-twin.jpg'
  },
  {
    color: '#0d1629',
    title: 'الحوسبة العاطفية: كيف يحلل الذكاء الاصطناعي التعبير العاطفي؟',
    titleEn: 'Affective Computing & Human Interaction',
    description: 'كيف تحلل الأنظمة تعابير الوجه والصوت والإشارات الحيوية ضمن حدود عدم اليقين والسياق.',
    descriptionEn: 'Multimodal AI analysis of facial, vocal, and physiological expressions within contextual bounds.',
    label: 'ذكاء اصطناعي',
    labelEn: 'Artificial Intelligence',
    image: '/images/articles/affective-computing.jpg'
  },
  {
    color: '#0d1629',
    title: 'تحليل تعابير الوجه وتخصيص المحتوى في أنظمة التوصية',
    titleEn: 'Facial Expressions in Recommender Systems',
    description: 'دمج الرؤية الحاسوبية كإشارة احتمالية سياقية لتخصيص المحتوى مع مراعاة الخصوصية.',
    descriptionEn: 'Computer vision landmarks as probabilistic contextual signals for ethical content recommendation.',
    label: 'أنظمة التوصية',
    labelEn: 'Recommender Systems',
    image: '/images/articles/emotion-aware-recommendation.jpg'
  },
  {
    color: '#0d1629',
    title: 'ما هو بروتوكول MCP؟ ربط الذكاء الاصطناعي بالأدوات والبيانات',
    titleEn: 'Model Context Protocol (MCP) Standard',
    description: 'المعيار المفتوح لربط تطبيقات AI بالأدوات وقواعد البيانات والأنظمة دون كود ربط معقد.',
    descriptionEn: 'The open standard unifying how LLMs securely interface with external tools and enterprise data.',
    label: 'معمارية النظم',
    labelEn: 'Systems Architecture',
    image: '/images/articles/model-context-protocol-mcp.jpg'
  },
  {
    color: '#0d1629',
    title: 'كيف تتنبأ نماذج الذكاء الاصطناعي بالكلمة التالية؟',
    titleEn: 'Next Token Prediction in Language Models',
    description: 'من N-gram وRNN إلى Transformers وتحديات الصرف واللهجات والرمزنة في اللغة العربية.',
    descriptionEn: 'From N-grams to causal Transformers: decoding heuristics and Arabic morphology tokenization.',
    label: 'معالجة اللغات',
    labelEn: 'NLP & LLMs',
    image: '/images/articles/next-token-prediction.jpg'
  },
  {
    color: '#0d1629',
    title: 'ما هو إنترنت الأشياء (IoT)؟ البنية والبروتوكولات والتطبيقات والأمان',
    titleEn: 'What is IoT? Architecture, Protocols & Security Standards',
    description: 'دليل شامل لإنترنت الأشياء (IoT): البنية الهندسية، مقارنة MQTT وCoAP، وتقنيات الاتصال والأمان المعتمدة.',
    descriptionEn: 'Architectural layers of IoT, MQTT vs CoAP protocols, edge intelligence, and zero-trust IoT security standards.',
    label: 'إنترنت الأشياء',
    labelEn: 'Internet of Things',
    image: '/images/articles/internet-of-things-iot.jpg'
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
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
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
  enableMagnetism = false,
  onClick
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
      onClick={onClick}
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

/* Phones (<600px): the articles grid is a horizontal strip (MagicBento.css). It glides
   on its own, continuously, like a slow marquee (owner's request: the articles must move
   by themselves on phones). At the end it rests briefly and glides back to the first card.
   Touching / dragging / keyboard focus pauses it; it resumes AUTO_RESUME_DELAY ms after
   release. Off-screen or hidden tabs stop the loop. Scroll-snap is switched off while
   gliding (it would fight the sub-pixel movement) and restored while the user swipes.
   RTL-safe: Chrome's scrollLeft runs 0 → -max in RTL, so positions carry a direction sign. */
const AUTO_SPEED = 34; // px per second
const AUTO_RESUME_DELAY = 3000;
const AUTO_END_PAUSE = 1600;
const STRIP_QUERY = '(max-width: 599px)';

const useAutoSwipeStrip = (gridRef: React.RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || typeof window === 'undefined' || !window.matchMedia) return;

    const stripMq = window.matchMedia(STRIP_QUERY);
    let inView = false;
    let interacting = false;
    let resumeAt = performance.now() + 1200;
    let raf: number | null = null;
    let last = 0;
    let pos = 0; // logical offset along the inline axis (always ≥ 0)
    let returning = false;

    const sign = () => (getComputedStyle(grid).direction === 'rtl' ? -1 : 1);
    const maxScroll = () => Math.max(0, grid.scrollWidth - grid.clientWidth);
    const canRun = () => stripMq.matches && inView && !document.hidden;

    const setGliding = (on: boolean) => {
      grid.style.scrollSnapType = on ? 'none' : '';
    };

    const frame = (now: number) => {
      raf = window.requestAnimationFrame(frame);
      const dt = Math.min(64, now - (last || now));
      last = now;
      if (interacting || returning || now < resumeAt) return;
      const max = maxScroll();
      if (max <= 1) return;
      setGliding(true);
      pos = Math.min(max, pos + (AUTO_SPEED * dt) / 1000);
      grid.scrollLeft = sign() * pos;
      if (pos >= max - 0.5) {
        returning = true;
        window.setTimeout(() => {
          if (interacting) { returning = false; return; }
          grid.scrollTo({ left: 0, behavior: 'smooth' });
          window.setTimeout(() => {
            pos = 0;
            returning = false;
            resumeAt = performance.now() + AUTO_END_PAUSE;
          }, 900);
        }, AUTO_END_PAUSE);
      }
    };

    const sync = () => {
      if (canRun()) {
        if (raf === null) {
          last = 0;
          raf = window.requestAnimationFrame(frame);
        }
      } else if (raf !== null) {
        window.cancelAnimationFrame(raf);
        raf = null;
        setGliding(false);
      }
    };

    const pause = () => {
      interacting = true;
      setGliding(false);
    };
    const release = () => {
      interacting = false;
      resumeAt = performance.now() + AUTO_RESUME_DELAY;
      // continue from wherever the user left the strip (after any snap settles)
      window.setTimeout(() => { pos = Math.abs(grid.scrollLeft); }, 400);
    };
    const nudge = () => {
      resumeAt = performance.now() + AUTO_RESUME_DELAY;
      window.setTimeout(() => { pos = Math.abs(grid.scrollLeft); }, 400);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      pause();
      window.addEventListener('pointerup', release, { once: true });
      window.addEventListener('pointercancel', release, { once: true });
    };
    /* Owner (2026-10-02, refined): the strip must glide ALWAYS — finger hover or even a
       swipe must not stop it. Only taps do something (open the article). So touch never
       pauses the loop at all: touchstart/touchmove/touchend are ignored entirely. The
       native horizontal pan still works (touch-action on the strip) and the auto-scroll
       re-syncs its position from wherever the user left it on the next glide frame. */
    const syncFromDom = () => {
      window.setTimeout(() => { pos = Math.abs(grid.scrollLeft); }, 400);
    };
    const onTouchStart = () => syncFromDom();
    const onTouchEnd = () => syncFromDom();
    const onFocusIn = (e: FocusEvent) => {
      const t = e.target as Element | null;
      if (t?.matches?.(':focus-visible')) pause();
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!grid.contains(e.relatedTarget as Node | null) && interacting) release();
    };

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries.some((en) => en.isIntersecting && en.intersectionRatio >= 0.35);
        sync();
      },
      { threshold: [0, 0.35, 0.6] }
    );
    io.observe(grid);

    grid.addEventListener('touchstart', onTouchStart, { passive: true });
    grid.addEventListener('touchend', onTouchEnd, { passive: true });
    grid.addEventListener('touchcancel', onTouchEnd, { passive: true });
    grid.addEventListener('pointerdown', onPointerDown, { passive: true });
    grid.addEventListener('wheel', nudge, { passive: true });
    grid.addEventListener('focusin', onFocusIn);
    grid.addEventListener('focusout', onFocusOut);
    document.addEventListener('visibilitychange', sync);
    stripMq.addEventListener?.('change', sync);

    return () => {
      if (raf !== null) window.cancelAnimationFrame(raf);
      setGliding(false);
      io.disconnect();
      grid.removeEventListener('touchstart', onTouchStart);
      grid.removeEventListener('touchend', onTouchEnd);
      grid.removeEventListener('touchcancel', onTouchEnd);
      grid.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', release);
      grid.removeEventListener('wheel', nudge);
      grid.removeEventListener('focusin', onFocusIn);
      grid.removeEventListener('focusout', onFocusOut);
      document.removeEventListener('visibilitychange', sync);
      stripMq.removeEventListener?.('change', sync);
    };
  }, [gridRef]);
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
  const router = useRouter();
  const { lang, theme } = useThemeLanguage();
  const isLight = theme === 'light';
  const isEn = lang === 'en';
  const gridRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;
  useAutoSwipeStrip(gridRef);

  useEffect(() => {
    [
      'digital-twin',
      'affective-computing',
      'emotion-aware-recommendation',
      'model-context-protocol-mcp',
      'next-token-prediction',
      'internet-of-things-iot'
    ].forEach((slug) => {
      router.prefetch(`/articles/${slug}`);
    });
  }, [router]);

  return (
    <>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={isLight ? '2, 132, 199' : glowColor}
        />
      )}

      <BentoCardGrid gridRef={gridRef}>
        {cards.map((card, index) => {
          const cardTitle = isEn ? (card.titleEn || card.title) : card.title;
          const cardDesc = isEn ? (card.descriptionEn || card.description) : card.description;
          const articleSlugs = [
            'digital-twin',
            'affective-computing',
            'emotion-aware-recommendation',
            'model-context-protocol-mcp',
            'next-token-prediction',
            'internet-of-things-iot'
          ];
          const targetSlug = articleSlugs[index] || 'digital-twin';

          const baseClassName = `magic-bento-card ${textAutoHide ? 'magic-bento-card--text-autohide' : ''} ${enableBorderGlow ? 'magic-bento-card--border-glow' : ''}`;
          
          const handleCardClick = () => {
            router.push(`/articles/${targetSlug}`);
          };

          const cardProps = {
            className: baseClassName,
            onClick: handleCardClick,
            onPointerDown: () => {
              router.prefetch(`/articles/${targetSlug}`);
            },
            onMouseEnter: () => {
              router.prefetch(`/articles/${targetSlug}`);
            },
            style: {
              backgroundColor: isLight ? '#ffffff' : (card.color || '#0d1629'),
              '--glow-color': isLight ? '2, 132, 199' : glowColor,
              cursor: 'pointer'
            } as React.CSSProperties
          };

          const isFeatured = index === 2 || index === 3;

          const cardContent = (
            <>
              {card.image && (
                <div className={`magic-bento-card__media ${isFeatured ? 'magic-bento-card__media--featured' : ''}`}>
                  <Link href={`/articles/${targetSlug}`} prefetch={true} className="magic-bento-card__media-link block w-full h-full" tabIndex={-1}>
                    <img
                      src={card.image}
                      alt={cardTitle}
                      className={`magic-bento-card__img ${isFeatured ? 'magic-bento-card__img--full' : ''}`}
                      loading="lazy"
                    />
                  </Link>
                </div>
              )}

              <div className="magic-bento-card__content">
                <h3 className="magic-bento-card__title">
                  <Link href={`/articles/${targetSlug}`} prefetch={true} className="magic-bento-card__link">
                    {cardTitle}
                  </Link>
                </h3>
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
