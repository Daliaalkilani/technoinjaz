'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ScrollProgress from '@/registry/magicui/scroll-progress';
import GooeyNav from '@/GooeyNav';
import CinematicFooter from '@/components/CinematicFooter';
import ThemeSwitch from '@/components/ui/ThemeSwitch';
import LanguageDropdown from '@/components/ui/LanguageDropdown';
import ScrollToTop from './ScrollToTop';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import { getLoggedInUser } from '@/utils/authUtils';
import { User } from 'lucide-react';

export interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { lang, t } = useThemeLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isPastHero, setIsPastHero] = useState(false);
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

  // Prefetch primary navigation routes for instant transitions
  useEffect(() => {
    navItems.forEach((item) => {
      if (item.href && item.href !== pathname) {
        router.prefetch(item.href);
      }
    });
  }, [router, pathname]);

  // Auth sync
  useEffect(() => {
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

  // Listen for login requirement triggers
  useEffect(() => {
    const handleRequireLogin = (e: any) => {
      const returnPath = e?.detail?.returnPath || (window.location.pathname + window.location.search + window.location.hash);
      try {
        sessionStorage.setItem('techno_auth_return_path', returnPath);
        sessionStorage.setItem('techno_auth_return_hash', returnPath);
      } catch (err) {}
      router.push('/login');
    };

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
            <img
              src="/techno-logo.png"
              alt={t.nav.brand}
              className="navbar-brand-logo"
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
              onItemSelect={(item: any) => {
                if (item?.href) {
                  router.push(item.href);
                }
              }}
              animationTime={600}
              timeVariance={300}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
          </div>

          {/* End Actions: Language Switcher, Theme Toggle, Login / User Profile */}
          <div className="navbar-end-actions">
            <LanguageDropdown />
            <ThemeSwitch />

            {/* User Profile / Auth Button */}
            <button
              type="button"
              className={`navbar-auth-btn ${pathname === '/account' || pathname === '/login' || pathname === '/register' ? 'active' : ''}`}
              onClick={() => {
                if (currentUser) {
                  router.push('/account');
                } else {
                  try {
                    const currentTarget = window.location.pathname + window.location.search + window.location.hash;
                    if (!currentTarget.startsWith('/login') && !currentTarget.startsWith('/register')) {
                      sessionStorage.setItem('techno_auth_return_path', currentTarget);
                      sessionStorage.setItem('techno_auth_return_hash', currentTarget);
                    }
                  } catch (e) {}
                  router.push('/login');
                }
              }}
              title={currentUser 
                ? (currentUser.name || (lang === 'en' ? 'My Profile' : 'حسابي')) 
                : t.nav.login}
              style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <span className="navbar-auth-btn-icon">
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt=""
                    style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <User size={15} />
                )}
              </span>
              <span className="navbar-auth-btn-label">
                {currentUser 
                  ? (currentUser.name || (lang === 'en' ? 'My Profile' : 'حسابي')) 
                  : t.nav.login}
              </span>
            </button>
          </div>
        </nav>
      </div>

      <main id="main-content">
        {children}
      </main>

      <CinematicFooter key={pathname} />
    </div>
  );
}

export default AppShell;
