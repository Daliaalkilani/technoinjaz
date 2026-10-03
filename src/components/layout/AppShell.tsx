'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { usePathname, useRouter } from 'next/navigation';
import GooeyNav from './GooeyNav';
import dynamic from 'next/dynamic';
// Below-the-fold footer: code-split so its gsap + ScrollTrigger modules are not
// part of the initial page JS; it streams in with a same-geometry footer placeholder.
// SSR stays on so the static export still contains the full footer markup.
const CinematicFooter = dynamic(() => import('./CinematicFooter'), {
  ssr: true,
  loading: () => <footer id="contact" className="footer-boot-placeholder" style={{ minHeight: '420px' }} />,
});
import ThemeSwitch from './ThemeSwitch';
import LanguageDropdown from './LanguageDropdown';
import ScrollToTop from './ScrollToTop';
import ScrollProgress from '@/components/effects/ScrollProgress';
import '@/components/ui/Skeleton.css';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import { getLoggedInUser } from '@/lib/auth';
import { User, Menu, WifiOff } from 'lucide-react';
import MobileNavDrawer from './MobileNavDrawer';
const TabletDock = dynamic(() => import('./TabletDock'), { ssr: false });

export interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { lang, t } = useThemeLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [navHeight, setNavHeight] = useState(78);
  const navbarRef = useRef<HTMLElement | null>(null);

  // Derive active nav index from pathname
  let activeIndex = -1;
  if (pathname === '/') {
    activeIndex = 0;
  } else if (pathname.startsWith('/projects')) {
    activeIndex = 1;
  } else if (pathname.startsWith('/videos')) {
    activeIndex = 2;
  } else if (pathname.startsWith('/articles')) {
    activeIndex = 3;
  } else if (pathname.startsWith('/faq')) {
    activeIndex = 4;
  } else if (pathname.startsWith('/about') || pathname.startsWith('/team')) {
    activeIndex = 5;
  } else if (pathname.startsWith('/contact')) {
    activeIndex = 6;
  }

  const isDedicatedTabOrView = pathname !== '/';
  const isArticleDetailPage = /^\/articles\/[^\/]+/.test(pathname);
  const isProjectDetailPage = /^\/projects\/[^\/]+/.test(pathname);
  const isAuthPage = pathname === '/login' || pathname === '/register';
  const isAccountPage = pathname === '/account' || pathname.startsWith('/account');
  const isErrorPage = 
    pathname === '/connection-error' || 
    pathname === '/offline' || 
    pathname === '/server-error' || 
    pathname === '/access-denied' || 
    pathname === '/403' || 
    pathname === '/500';

  // Monitor network connectivity in real time
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    if (!navigator.onLine) setIsOffline(true);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  // Navigation Items
  const navItems = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.projects, href: '/projects' },
    { label: t.nav.videos, href: '/videos' },
    { label: t.nav.articles, href: '/articles' },
    { label: t.nav.faq, href: '/faq' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.contact, href: '/contact' },
  ];

  // Prefetch primary navigation routes so transitions are instant
  useEffect(() => {
    navItems.forEach((item) => {
      if (item.href && item.href !== pathname) {
        router.prefetch(item.href);
      }
    });
  }, [router, pathname]);

  // Auth sync
  useEffect(() => {
    setMounted(true);
    setCurrentUser(getLoggedInUser());
    const handleAuthSync = () => {
      setCurrentUser(getLoggedInUser());
    };
    window.addEventListener('techno_auth_updated', handleAuthSync);
    window.addEventListener('storage', handleAuthSync);
    return () => {
      window.removeEventListener('techno_auth_updated', handleAuthSync);
      window.removeEventListener('storage', handleAuthSync);
    };
  }, []);

  // Handler for login requirement triggers
  const handleRequireLogin = (e?: any) => {
    const returnPath = e?.detail?.returnPath || (typeof window !== 'undefined' ? (window.location.pathname + window.location.search + window.location.hash) : '/');
    try {
      sessionStorage.setItem('techno_auth_return_path', returnPath);
      sessionStorage.setItem('techno_auth_return_hash', returnPath);
    } catch (err) {}
    router.push('/login');
  };

  // Listen for login requirement triggers
  useEffect(() => {
    window.addEventListener('techno_require_login', handleRequireLogin);
    return () => window.removeEventListener('techno_require_login', handleRequireLogin);
  }, [router]);

  // Navbar height measure
  useEffect(() => {
    if (navbarRef.current) {
      setNavHeight(navbarRef.current.offsetHeight || 78);
    }
  }, []);

  // Hero scroll tracking for sticky navbar
  useEffect(() => {
    if (pathname !== '/') {
      setIsPastHero(false);
      return;
    }

    const handleScroll = () => {
      const projectsEl = document.getElementById('projects');
      if (projectsEl) {
        const rect = projectsEl.getBoundingClientRect();
        setIsPastHero(rect.top <= 80);
      } else {
        setIsPastHero(window.scrollY > 400);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [pathname]);

  return (
    <div id="app-root" style={{ width: '100%', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <a href="#main-content" className="skip-link">
        {lang === 'en' ? 'Skip to content' : 'تخطَّ إلى المحتوى'}
      </a>
      <ScrollToTop />
      <ScrollProgress className="top-0" />

      {/* Top Navbar with GooeyNav */}
      <div 
        className="top-navbar-wrapper"
        style={{
          height: (!isDedicatedTabOrView && isPastHero) ? `${navHeight}px` : undefined
        }}
      >
        <nav 
          ref={navbarRef}
          id="navbar" 
          className={`top-navbar-container ${
            isDedicatedTabOrView ? 'is-tab-sticky' : (isPastHero ? 'is-home-sticky' : '')
          }`}
        >
          {/* Brand identity */}
          <Link
            href="/"
            className="navbar-brand-link"
            title={`${t.nav.brand} | ${t.nav.home}`}
          >
            <ResponsiveImage
              src="/images/brand/techno-logo.png"
              alt={t.nav.brand}
              className="navbar-brand-logo"
              sizes="48px"
              priority
            />
            <span className="navbar-brand-text">{t.nav.brand}</span>
          </Link>

          {/* Center Interactive GooeyNav Menu */}
          <div className="navbar-center-menu">
            <GooeyNav
              items={navItems}
              particleCount={15}
              particleDistances={[90, 10]}
              particleR={100}
              initialActiveIndex={activeIndex >= 0 ? activeIndex : 0}
              activeIndex={activeIndex}

              animationTime={600}
              timeVariance={300}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
          </div>

          {/* End Actions: Language Switcher, Theme Toggle, Login / User Profile */}
          <div className="navbar-end-actions">
            <div className="navbar-desktop-only">
              <LanguageDropdown />
            </div>
            <div className="navbar-desktop-only">
              <ThemeSwitch />
            </div>

            {/* Platform Notifications Bell */}

            {/* User Profile / Auth Button */}
            <div className="navbar-desktop-only">
              {mounted && currentUser ? (
                <Link
                  href="/account"
                  className={`navbar-user-avatar-btn ${pathname === '/account' ? 'active' : ''}`}
                  title={currentUser.name ? `${currentUser.name} - ${lang === 'en' ? 'My Profile' : 'الملف الشخصي'}` : (lang === 'en' ? 'My Profile' : 'الملف الشخصي')}
                  aria-label={lang === 'en' ? 'My Profile' : 'الملف الشخصي'}
                >
                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name || 'User Profile'}
                      className="navbar-user-avatar-img"
                    />
                  ) : (
                    <div className="navbar-user-avatar-fallback">
                      {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : <User size={16} />}
                    </div>
                  )}
                  <span className="navbar-user-status-dot" aria-hidden="true" />
                </Link>
              ) : (
                <button
                  type="button"
                  className={`navbar-auth-btn ${pathname === '/login' || pathname === '/register' ? 'active' : ''}`}
                  onClick={() => handleRequireLogin()}
                  title={t.nav.login}
                  aria-label={t.nav.login}
                >
                  <span className="navbar-auth-btn-icon" aria-hidden="true">
                    <User size={15} />
                  </span>
                  <span className="navbar-auth-btn-label">
                    {t.nav.login}
                  </span>
                </button>
              )}
            </div>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              type="button"
              className="navbar-mobile-toggle-btn"
              onClick={() => setIsMobileDrawerOpen(true)}
              aria-label={lang === 'ar' ? 'فتح القائمة الرئيسية' : 'Open Navigation Menu'}
              aria-expanded={isMobileDrawerOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>

        {/* Mobile Slide-over Glass Navigation Drawer */}
        <MobileNavDrawer
          isOpen={isMobileDrawerOpen}
          onClose={() => setIsMobileDrawerOpen(false)}
          currentUser={currentUser}
          onRequireLogin={() => handleRequireLogin()}
        />
      </div>

      <main id="main-content">
        {children}
      </main>

      {/* Tablet bottom dock (CSS shows it only on tablets; phones keep the drawer) */}
      <TabletDock items={navItems} activeIndex={activeIndex} />

      {/* Floating Offline Notification */}
      {isOffline && !isErrorPage && (
        <div
          style={{
            position: 'fixed',
            bottom: 'calc(24px + var(--dock-space, 0px))',
            insetInlineStart: '24px',
            zIndex: 999999,
            background: 'rgba(15, 23, 42, 0.94)',
            backdropFilter: 'blur(14px)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#f87171',
            borderRadius: '9999px',
            padding: '8px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '13px',
            fontWeight: 600,
            boxShadow: '0 12px 35px rgba(0,0,0,0.5)'
          }}
        >
          <WifiOff size={16} />
          <span>{lang === 'en' ? 'Offline Mode Active' : 'تم فقدان الاتصال بالشبكة'}</span>
          <Link
            href="/connection-error"
            style={{
              color: '#38bdf8',
              textDecoration: 'underline',
              marginInlineStart: '4px'
            }}
          >
            {lang === 'en' ? 'Diagnose' : 'فحص الاتصال'}
          </Link>
        </div>
      )}

      {!isArticleDetailPage && !isProjectDetailPage && !isAuthPage && !isAccountPage && !isErrorPage && <CinematicFooter />}
    </div>
  );
}

export default AppShell;
