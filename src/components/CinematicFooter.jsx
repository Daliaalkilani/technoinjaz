import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import CurvedInput from "./CurvedInput";
import { useThemeLanguage } from "../context/ThemeLanguageContext";
import "./CinematicFooter.css";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
const MagneticButton = React.forwardRef(
  ({ className = "", children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            rotationX: -y * 0.12,
            rotationY: x * 0.12,
            scale: 1.04,
            ease: "power2.out",
            duration: 0.35,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.1,
          });
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node) => {
          localRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 2. MARQUEE ITEM
// -------------------------------------------------------------------------
const MarqueeLogo = () => (
  <img
    src="/techno-logo.png"
    alt="Techno Enjaz"
    className="footer-marquee-logo"
  />
);

const MarqueeItem = ({ items }) => (
  <div className="footer-marquee-item">
    {items.map((text, idx) => (
      <React.Fragment key={idx}>
        <span>{text}</span>
        <MarqueeLogo />
      </React.Fragment>
    ))}
  </div>
);

// -------------------------------------------------------------------------
// 3. MAIN CINEMATIC FOOTER COMPONENT
// -------------------------------------------------------------------------
export function CinematicFooter() {
  const { theme, lang, t } = useThemeLanguage();
  const wrapperRef = useRef(null);
  const giantTextRef = useRef(null);
  const headingRef = useRef(null);
  const linksRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      // Background Parallax for Giant Text
      if (giantTextRef.current) {
        gsap.fromTo(
          giantTextRef.current,
          { y: "6vh", scale: 0.88, opacity: 0.25 },
          {
            y: "0vh",
            scale: 1,
            opacity: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 95%",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );
      }

      // Staggered Content Reveal
      const elementsToAnimate = [headingRef.current, inputRef.current, linksRef.current].filter(Boolean);
      if (elementsToAnimate.length) {
        gsap.fromTo(
          elementsToAnimate,
          { y: 30, opacity: 0.4 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 90%",
              end: "bottom 95%",
              scrub: 1,
            },
          }
        );
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const marqueeItems = t.footer?.marquee || [
    'الابتكار التقني',
    'تكنو إنجاز',
    'مسار التميز والريادة',
    'حلول رقمية مبتكرة',
    'فريق ملهم',
    'شغف التطوير المستمر',
    'رؤية تصنع المستقبل'
  ];

  return (
    <div
      ref={wrapperRef}
      className="footer-curtain-wrapper"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <footer className="cinematic-footer-wrapper">
        {/* Ambient Light & Grid Background */}
        <div className="footer-aurora animate-footer-breathe" />
        <div className="footer-bg-grid" />

        {/* Giant background text */}
        <div
          ref={giantTextRef}
          className="footer-giant-bg-text"
        >
          {t.footer?.giantText || (lang === 'ar' ? 'تكنو إنجاز' : 'TECHNO ENJAZ')}
        </div>

        {/* 1. Diagonal Sleek Marquee (Top of footer) */}
        <div className="footer-marquee-container">
          <div className="footer-marquee-track animate-footer-scroll-marquee">
            <MarqueeItem items={marqueeItems} />
            <MarqueeItem items={marqueeItems} />
          </div>
        </div>

        {/* 2. Main Center Content */}
        <div className="footer-main-content">
          <div ref={headingRef}>
            <h2 className="footer-heading footer-text-glow">
              {t.footer?.heading || 'جاهز للانطلاق معنا؟'}
            </h2>
            <p className="footer-subheading">
              {t.footer?.subheading || 'نبتكر حلول الغد اليوم، وندعم مسيرة التطور التقني والريادة برؤية تصنع الفارق وشغف لا يتوقف.'}
            </p>
          </div>

          {/* Curved Newsletter Input */}
          <div ref={inputRef} className="footer-newsletter-wrap">
            <span className="footer-stay-updated-text">
              {t.footer?.stayUpdated || 'ابقَ على اطلاع'}
            </span>
            <div className="footer-curved-input-box" dir="ltr">
              <CurvedInput
                placeholder={t.footer?.inputPlaceholder || 'أدخل بريدك الإلكتروني'}
                buttonText={t.footer?.subscribeBtn || 'اشتراك'}
                theme={theme === 'light' ? 'light' : 'dark'}
                bend={28}
                height={64}
                width={450}
                cornerRadius={18}
                borderWidth={1.5}
                fontSize={15}
                backgroundColor={theme === 'light' ? '#ffffff' : '#1B1722'}
                textColor={theme === 'light' ? '#0f172a' : '#f5f5f5'}
                borderColor={theme === 'light' ? '#0284c7' : '#5013c6'}
                buttonColor={theme === 'light' ? '#0284c7' : '#2b1ed5'}
                buttonTextColor="#ffffff"
                shadowSize="md"
                onSubmit={value => {
                  if (value) {
                    const message = lang === 'ar' 
                      ? `مرحباً تكنو إنجاز، أود البقاء على اطلاع عبر الإيميل: ${value}`
                      : `Hello Techno Enjaz, I would like to stay updated via email: ${value}`;
                    window.open(`https://wa.me/963958794195?text=${encodeURIComponent(message)}`, '_blank');
                  }
                }}
              />
            </div>
          </div>

          {/* Interactive Magnetic Pills Layout */}
          <div ref={linksRef} className="footer-pills-container">
            {/* Primary Action Buttons */}
            <div className="footer-primary-pills">
              <MagneticButton
                as="a"
                href="#projects"
                className="footer-glass-pill footer-pill-btn group"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#00d2ff' }}>
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
                <span>{t.footer?.projects || t.nav.projects}</span>
              </MagneticButton>

              <MagneticButton
                as="a"
                href="#about"
                className="footer-glass-pill footer-pill-btn group"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#a855f7' }}>
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span>{t.footer?.about || t.nav.about}</span>
              </MagneticButton>

              <MagneticButton
                as="a"
                href="#contact"
                className="footer-glass-pill footer-pill-btn group"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#38bdf8' }}>
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>{t.footer?.contact || t.nav.contact}</span>
              </MagneticButton>
            </div>

            {/* Secondary Text Links */}
            <div className="footer-secondary-pills">
              <MagneticButton as="a" href="#top" className="footer-glass-pill footer-pill-secondary">
                {t.footer?.home || t.nav.home}
              </MagneticButton>
              <MagneticButton as="a" href="#articles" className="footer-glass-pill footer-pill-secondary">
                {t.footer?.articles || t.nav.articles}
              </MagneticButton>
              <MagneticButton as="a" href="#videos" className="footer-glass-pill footer-pill-secondary">
                {t.footer?.videos || t.nav.videos}
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* 3. Bottom Bar / Credits */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            {t.footer?.copyright || '© 2026 تكنو إنجاز. جميع الحقوق محفوظة.'}
          </div>

          {/* Back to top button */}
          <MagneticButton
            as="button"
            onClick={scrollToTop}
            className="footer-glass-pill footer-back-to-top"
            title={t.footer?.backToTop || 'العودة لأعلى الصفحة'}
            aria-label={t.footer?.backToTop || 'العودة لأعلى الصفحة'}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </MagneticButton>
        </div>
      </footer>
    </div>
  );
}

export default CinematicFooter;
