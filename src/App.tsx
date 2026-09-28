import { useState, useEffect, lazy, Suspense, useRef } from 'react';
import ScrollProgress from '@/registry/magicui/scroll-progress';
import { Skiper19 } from '@/components/ui/svg-follow-scroll';
import GooeyNav from './GooeyNav';
import ScrollExpandPrototype from './pages/ScrollExpandPrototype';
import TeamMomentsRing from './components/TeamMomentsRing';
import InfiniteMenu from './InfiniteMenu';
import Orb from './Orb';
import CinematicFooter from './components/CinematicFooter';
import { User } from 'lucide-react';
import { teamMembers } from './data/teamData';
import { useThemeLanguage } from './context/ThemeLanguageContext';
import ThemeSwitch from './components/ui/ThemeSwitch';
import LanguageDropdown from './components/ui/LanguageDropdown';
import { getLoggedInUser } from './utils/authUtils';

const ProfilePage = lazy(() => import('./ProfilePage'));
const ContactPage = lazy(() => import('./ContactPage'));
const AuthPage = lazy(() => import('./AuthPage'));
const UserProfilePage = lazy(() => import('./UserProfilePage'));
const ProjectsCatalogSection = lazy(() => import('./components/projects/ProjectsCatalogSection'));
const FaqSection = lazy(() => import('./components/faq/FaqSection'));
import OfficeBlogSection from './components/articles/OfficeBlogSection';
import ProjectReelsFeed from './components/videos/ProjectReelsFeed';

interface NavItem {
  label: string;
  href: string;
}

export default function App() {
  const { theme, lang, t } = useThemeLanguage();
  const [isLoaderDone, setIsLoaderDone] = useState(false);
  const [currentTab, setCurrentTab] = useState<'home' | 'projects' | 'videos' | 'articles' | 'faq' | 'about'>('home');
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [isPastHero, setIsPastHero] = useState(false);
  const [navHeight, setNavHeight] = useState(78);
  const navbarRef = useRef<HTMLElement | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(() => {
    return getLoggedInUser();
  });

  useEffect(() => {
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

  // Listen for login requirement triggers from save/like/comment actions
  useEffect(() => {
    const handleRequireLogin = (e: any) => {
      const returnHash = e?.detail?.returnHash || window.location.hash || '#top';
      try {
        if (returnHash && returnHash !== '#login' && returnHash !== '#auth' && returnHash !== '#register') {
          sessionStorage.setItem('techno_auth_return_hash', returnHash);
        }
      } catch (err) {}

      setSelectedMember(null);
      setIsContactOpen(false);
      setIsUserProfileOpen(false);
      setIsAuthOpen(true);
      setAuthMode('login');
      window.location.hash = '#login';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('techno_require_login', handleRequireLogin);
    return () => window.removeEventListener('techno_require_login', handleRequireLogin);
  }, []);

  const localizedTeamMembers = teamMembers.map((m: any) => ({
    ...m,
    name: lang === 'en' ? (m.nameEn || m.name) : m.name,
    title: lang === 'en' ? (m.titleEn || m.title || m.nameEn || m.name) : (m.title || m.name),
    role: lang === 'en' ? (m.roleEn || m.role) : m.role,
    description: lang === 'en' ? (m.descriptionEn || m.description) : m.description,
    department: lang === 'en' ? (m.departmentEn || m.department) : m.department,
    bio: lang === 'en' ? (m.bioEn || m.bio) : m.bio,
    skills: lang === 'en' ? (m.skillsEn || m.skills) : m.skills,
    location: lang === 'en' ? (m.locationEn || m.location) : m.location,
    projects: lang === 'en' ? (m.projectsEn || m.projects) : m.projects,
  }));

  // Defer heavy 3D canvases until rocket loader finishes
  useEffect(() => {
    const onLoaderComplete = () => setIsLoaderDone(true);
    window.addEventListener('techno:completed', onLoaderComplete);
    const timer = setTimeout(() => setIsLoaderDone(true), 2700);
    return () => {
      window.removeEventListener('techno:completed', onLoaderComplete);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (navbarRef.current) {
      setNavHeight(navbarRef.current.offsetHeight || 78);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (currentTab === 'home' && !isContactOpen && !isAuthOpen && !isUserProfileOpen && !selectedMember) {
        const projectsEl = document.getElementById('projects');
        if (projectsEl) {
          const rect = projectsEl.getBoundingClientRect();
          setIsPastHero(rect.top <= 80);
        } else {
          setIsPastHero(window.scrollY > window.innerHeight * 1.5);
        }
      } else {
        setIsPastHero(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [currentTab, isContactOpen, isAuthOpen, isUserProfileOpen, selectedMember]);

  const navItems: NavItem[] = [
    { label: t.nav.home, href: '#top' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.videos, href: '#videos' },
    { label: t.nav.articles, href: '#articles' },
    { label: t.nav.faq, href: '#faq' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.contact, href: '#contact' },
  ];

  // Synchronize hash for back-forward and direct link navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#profile-')) {
        const id = hash.replace('#profile-', '');
        const found = teamMembers.find((m: any) => m.id === id);
        if (found) {
          setSelectedMember(found);
          setIsContactOpen(false);
          setIsAuthOpen(false);
          return;
        }
      }
      if (hash === '#contact') {
        setSelectedMember(null);
        setIsAuthOpen(false);
        setIsContactOpen(true);
        setActiveNavIndex(6);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (hash === '#auth' || hash === '#login' || hash === '#register') {
        setSelectedMember(null);
        setIsContactOpen(false);
        setIsUserProfileOpen(false);
        setIsAuthOpen(true);
        setAuthMode(hash === '#register' ? 'register' : 'login');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (hash === '#my-profile' || hash === '#favorites' || hash === '#profile') {
        const user = getLoggedInUser();
        if (!user) {
          setSelectedMember(null);
          setIsContactOpen(false);
          setIsUserProfileOpen(false);
          setIsAuthOpen(true);
          setAuthMode('login');
          window.location.hash = '#login';
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        setSelectedMember(null);
        setIsContactOpen(false);
        setIsAuthOpen(false);
        setIsUserProfileOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      setSelectedMember(null);
      setIsContactOpen(false);
      setIsAuthOpen(false);
      setIsUserProfileOpen(false);

      if (hash === '#projects' || hash.startsWith('#project/')) {
        setCurrentTab('projects');
        setActiveNavIndex(1);
      } else if (hash === '#videos') {
        setCurrentTab('videos');
        setActiveNavIndex(2);
      } else if (hash === '#articles' || hash.startsWith('#article/')) {
        setCurrentTab('articles');
        setActiveNavIndex(3);
      } else if (hash === '#faq') {
        setCurrentTab('faq');
        setActiveNavIndex(4);
      } else if (hash === '#about') {
        setCurrentTab('about');
        setActiveNavIndex(5);
      } else {
        setCurrentTab('home');
        setActiveNavIndex(0);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavItemSelect = (item: NavItem, index: number) => {
    setActiveNavIndex(index);
    setIsAuthOpen(false);
    setSelectedMember(null);

    if (item.href === '#contact') {
      setIsContactOpen(true);
      window.location.hash = '#contact';
    } else if (item.href === '#projects') {
      setIsContactOpen(false);
      setCurrentTab('projects');
      window.location.hash = '#projects';
    } else if (item.href === '#videos') {
      setIsContactOpen(false);
      setCurrentTab('videos');
      window.location.hash = '#videos';
    } else if (item.href === '#articles') {
      setIsContactOpen(false);
      setCurrentTab('articles');
      window.location.hash = '#articles';
    } else if (item.href === '#faq') {
      setIsContactOpen(false);
      setCurrentTab('faq');
      window.location.hash = '#faq';
    } else if (item.href === '#about') {
      setIsContactOpen(false);
      setCurrentTab('about');
      window.location.hash = '#about';
    } else {
      setIsContactOpen(false);
      setCurrentTab('home');
      window.location.hash = '#top';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    const currentHash = window.location.hash;
    if (currentHash && currentHash !== '#login' && currentHash !== '#auth' && currentHash !== '#register') {
      try {
        sessionStorage.setItem('techno_auth_return_hash', currentHash);
      } catch (e) {}
    }
    setIsContactOpen(false);
    setSelectedMember(null);
    setIsAuthOpen(true);
    setAuthMode(mode);
    window.location.hash = `#${mode}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromAuth = () => {
    setIsAuthOpen(false);
    let returnHash: string | null = null;
    try {
      returnHash = sessionStorage.getItem('techno_auth_return_hash');
      sessionStorage.removeItem('techno_auth_return_hash');
    } catch (e) {}

    if (returnHash && returnHash !== '#login' && returnHash !== '#auth' && returnHash !== '#register') {
      window.location.hash = returnHash;
    } else {
      setActiveNavIndex(0);
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectMember = (member: any) => {
    setSelectedMember(member);
    setIsContactOpen(false);
    setIsAuthOpen(false);
    window.location.hash = `profile-${member.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToMenu = () => {
    setSelectedMember(null);
    setIsContactOpen(false);
    setIsAuthOpen(false);
    window.location.hash = '#about';
    setTimeout(() => {
      const el = document.getElementById('team-showcase');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleBackFromContact = () => {
    setIsContactOpen(false);
    setActiveNavIndex(0);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTeam = () => {
    const el = document.getElementById('team-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If a team member is selected, show their full profile page
  if (selectedMember) {
    return (
      <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: theme === 'light' ? '#f8fafc' : '#050508' }} />}>
        <ProfilePage member={selectedMember} onBack={handleBackToMenu} />
      </Suspense>
    );
  }

  // If the user's personal profile & favorites page is opened
  if (isUserProfileOpen) {
    return (
      <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: theme === 'light' ? '#f8fafc' : '#050508' }} />}>
        <UserProfilePage
          onBack={() => {
            setIsUserProfileOpen(false);
            try {
              if (window.history && window.history.pushState) {
                window.history.pushState(null, '', window.location.pathname);
              }
            } catch (e) {}
            window.location.hash = '';
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onLogout={() => {
            setIsUserProfileOpen(false);
            setIsAuthOpen(false);
            setIsContactOpen(false);
            setSelectedMember(null);
            setCurrentUser(null);
            setCurrentTab('home');
            setActiveNavIndex(0);
            try {
              if (window.history && window.history.pushState) {
                window.history.pushState(null, '', window.location.pathname);
              }
            } catch (e) {}
            window.location.hash = '';
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenReader={() => {
            setIsUserProfileOpen(false);
            window.location.hash = '#academic-projects';
          }}
          onExploreProjects={() => {
            setIsUserProfileOpen(false);
            window.location.hash = '#projects';
          }}
        />
      </Suspense>
    );
  }

  const isDedicatedTabOrView = currentTab !== 'home' || isContactOpen || isAuthOpen || isUserProfileOpen;

  return (
    <main style={{ width: '100%', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Scroll indicator */}
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
          <a
            href="#top"
            className="navbar-brand-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavItemSelect(navItems[0], 0);
            }}
            title={`${t.nav.brand} | ${t.nav.home}`}
          >
            <img
              src="/techno-logo.png"
              alt={t.nav.brand}
              className="navbar-brand-logo"
            />
            <span className="navbar-brand-text">{t.nav.brand}</span>
          </a>

          {/* Center Interactive GooeyNav Menu */}
          <div className="navbar-center-menu">
            <GooeyNav
              items={navItems}
              particleCount={15}
              particleDistances={[90, 10]}
              particleR={100}
              initialActiveIndex={0}
              activeIndex={isAuthOpen ? -1 : (isContactOpen ? 6 : activeNavIndex)}
              onItemSelect={handleNavItemSelect}
              animationTime={600}
              timeVariance={300}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
          </div>

          {/* End Actions: Language Switcher, Theme Toggle, Login / User Profile */}
          <div className="navbar-end-actions">
            {/* Language Dropdown Selector */}
            <LanguageDropdown />

            {/* Animated Sun / Moon Theme Switch Component */}
            <ThemeSwitch />

            {/* User Profile / Saved Projects / Auth Button */}
            <button
              type="button"
              className={`navbar-auth-btn ${isUserProfileOpen || isAuthOpen ? 'active' : ''}`}
              onClick={() => {
                if (currentUser) {
                  setIsContactOpen(false);
                  setSelectedMember(null);
                  setIsAuthOpen(false);
                  setIsUserProfileOpen(true);
                  window.location.hash = '#my-profile';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  handleOpenAuth('login');
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

      {/* Page Content: AuthPage, ContactPage, Dedicated Tabs, or Homepage */}
      {isAuthOpen ? (
        <Suspense fallback={<div style={{ minHeight: '60vh', backgroundColor: 'var(--bg-main)' }} />}>
          <AuthPage
            initialMode={authMode}
            onBack={handleBackFromAuth}
            onSuccess={(loggedInUser: any) => {
              if (loggedInUser) setCurrentUser(loggedInUser);
              setIsAuthOpen(false);

              let returnHash: string | null = null;
              try {
                returnHash = sessionStorage.getItem('techno_auth_return_hash');
                sessionStorage.removeItem('techno_auth_return_hash');
              } catch (e) {}

              if (returnHash && returnHash !== '#login' && returnHash !== '#auth' && returnHash !== '#register') {
                window.location.hash = returnHash;
              } else {
                setIsUserProfileOpen(true);
                window.location.hash = '#my-profile';
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </Suspense>
      ) : isContactOpen ? (
        <Suspense fallback={<div style={{ minHeight: '60vh', backgroundColor: 'var(--bg-main)' }} />}>
          <ContactPage onBack={handleBackFromContact} />
        </Suspense>
      ) : currentTab === 'projects' ? (
        <div className="tab-page-container" style={{ padding: '0', maxWidth: '100%' }}>
          <Suspense fallback={<div style={{ minHeight: '60vh', backgroundColor: 'var(--bg-main)' }} />}>
            <ProjectsCatalogSection />
          </Suspense>
        </div>
      ) : currentTab === 'videos' ? (
        <div className="tab-page-container tab-page-videos" style={{ padding: '0', maxWidth: '100%' }}>
          <div className="tab-page-header reels-page-header" style={{ marginBottom: '0.75rem', paddingTop: '1rem', paddingBottom: '0.25rem' }}>
            <h1 className="tab-page-title reels-page-title" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.3rem)', marginBottom: '0.4rem' }}>{t.videos.pageTitle}</h1>
            <p className="tab-page-subtitle reels-page-subtitle" style={{ fontSize: '0.92rem', maxWidth: '600px' }}>{t.videos.pageSubtitle}</p>
          </div>
          <ProjectReelsFeed />
        </div>
      ) : currentTab === 'articles' ? (
        <div className="tab-page-container" style={{ padding: '0', maxWidth: '100%' }}>
          <OfficeBlogSection showHeroBanner={true} />
        </div>
      ) : currentTab === 'faq' ? (
        <Suspense fallback={<div style={{ minHeight: '60vh', backgroundColor: 'var(--bg-main)' }} />}>
          <FaqSection
            onNavigateTab={(tabTarget) => {
              if (tabTarget === '#contact') {
                handleNavItemSelect(navItems[6], 6);
              } else if (tabTarget === '#projects') {
                handleNavItemSelect(navItems[1], 1);
              } else if (tabTarget === '#articles') {
                handleNavItemSelect(navItems[3], 3);
              } else if (tabTarget === '#about') {
                handleNavItemSelect(navItems[5], 5);
              } else {
                handleNavItemSelect(navItems[0], 0);
              }
            }}
          />
        </Suspense>
      ) : currentTab === 'about' ? (
        <section
          id="about"
          className="scroll-deferred-section"
          style={{
            position: 'relative',
            width: '100%',
            backgroundColor: theme === 'light' ? '#f8fafc' : '#050508'
          }}
        >
          {/* Header for About Us Section */}
          <div
            style={{
              padding: '90px 24px 24px',
              textAlign: 'center',
              maxWidth: '850px',
              margin: '0 auto',
              direction: lang === 'ar' ? 'rtl' : 'ltr'
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 800,
                color: 'var(--text-main)',
                marginBottom: '14px',
                letterSpacing: '-0.02em',
                textShadow: '0 0 25px rgba(0, 210, 255, 0.2)'
              }}
            >
              {t.about.heading}
            </h2>
            <p
              style={{
                fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.7
              }}
            >
              {t.about.subtitle}
            </p>
          </div>

          {/* Team Moments Ring */}
          <div
            id="team-moments-section"
            style={{
              position: 'relative',
              width: '100%',
              height: '100vh',
              minHeight: '700px',
              overflow: 'hidden',
              backgroundColor: theme === 'light' ? '#f8fafc' : '#050508'
            }}
          >
            <TeamMomentsRing onScrollDown={scrollToTeam} />

            {/* Bottom gradient fade - sleek height so front cards remain crisp and vibrant */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '110px',
                background: theme === 'light' ? 'linear-gradient(to bottom, transparent 0%, rgba(248, 250, 252, 0.65) 60%, #f8fafc 100%)' : 'linear-gradient(to bottom, transparent 0%, rgba(5, 5, 8, 0.6) 60%, #000000 100%)',
                pointerEvents: 'none',
                zIndex: 10
              }}
            />
          </div>

          {/* SVG Follow Scroll Transition */}
          <div
            id="svg-follow-scroll-transition"
            style={{
              position: 'relative',
              width: '100%',
              backgroundColor: theme === 'light' ? '#f8fafc' : '#000000',
              overflow: 'hidden',
              zIndex: 15
            }}
          >
            <Skiper19 strokeColor="#00d2ff" />
          </div>

          {/* 3D InfiniteMenu Team Showcase with Orb Background */}
          <div
            id="team-showcase"
            style={{
              position: 'relative',
              width: '100%',
              height: '100vh',
              minHeight: '700px',
              backgroundColor: theme === 'light' ? '#f8fafc' : '#000000',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Top smooth blending gradient */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '240px',
                background: theme === 'light' ? 'linear-gradient(to bottom, #f8fafc 0%, rgba(248, 250, 252, 0.85) 45%, rgba(248, 250, 252, 0.25) 75%, transparent 100%)' : 'linear-gradient(to bottom, #000000 0%, rgba(0, 0, 0, 0.8) 45%, rgba(0, 0, 0, 0.25) 75%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 20
              }}
            />

            {/* Space Orb Background (deferred until loader done) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
                overflow: 'hidden'
              }}
            >
              {isLoaderDone && (
                <Orb
                  hoverIntensity={0.24}
                  rotateOnHover
                  hue={360}
                  forceHoverState={false}
                  backgroundColor={theme === 'light' ? '#f8fafc' : '#000000'}
                />
              )}
            </div>

            {/* Members Count Badge */}
            <header
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 30,
                padding: '24px 36px',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                pointerEvents: 'none',
                direction: lang === 'ar' ? 'rtl' : 'ltr'
              }}
            >
              <div
                style={{
                  padding: '6px 14px',
                  background: theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.06)', border: theme === 'light' ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '999px',
                  color: '#c4b5fd',
                  fontSize: '12px',
                  fontWeight: 600,
                  backdropFilter: 'blur(10px)'
                }}
              >
                {teamMembers.length} {lang === 'ar' ? 'أعضاء متاحين' : 'Available Members'}
              </div>
            </header>

            {/* 3D Circular Team Carousel */}
            <div style={{ position: 'relative', width: '100%', height: '100%', flex: 1, zIndex: 1 }}>
              <InfiniteMenu
                items={localizedTeamMembers as any}
                scale={1.4}
                backgroundColor="transparent"
                onSelectMember={handleSelectMember}
              />
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* 1. ScrollExpand Cinematic Hero + Projects + Videos + Articles */}
          <ScrollExpandPrototype 
            onOpenContact={() => handleNavItemSelect(navItems[6], 6)}
            onNavigateToProjects={() => handleNavItemSelect(navItems[1], 1)} 
            onNavigateToVideos={() => handleNavItemSelect(navItems[2], 2)}
            onNavigateToArticles={() => handleNavItemSelect(navItems[3], 3)}
          />

          {/* 2. "من نحن" (About Us / Team Showcase) */}
          <section
            id="about"
            className="scroll-deferred-section"
            style={{
              position: 'relative',
              width: '100%',
              backgroundColor: theme === 'light' ? '#f8fafc' : '#050508'
            }}
          >
            {/* Header for About Us Section */}
            <div
              style={{
                padding: '90px 24px 24px',
                textAlign: 'center',
                maxWidth: '850px',
                margin: '0 auto',
                direction: lang === 'ar' ? 'rtl' : 'ltr'
              }}
            >
              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  marginBottom: '14px',
                  letterSpacing: '-0.02em',
                  textShadow: '0 0 25px rgba(0, 210, 255, 0.2)'
                }}
              >
                {t.about.heading}
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
                  color: 'var(--text-muted)',
                  lineHeight: 1.7
                }}
              >
                {t.about.subtitle}
              </p>
            </div>

            {/* Team Moments Ring */}
            <div
              id="team-moments-section"
              style={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                minHeight: '700px',
                overflow: 'hidden',
                backgroundColor: theme === 'light' ? '#f8fafc' : '#050508'
              }}
            >
              <TeamMomentsRing onScrollDown={scrollToTeam} />

              {/* Bottom gradient fade - sleek height so front cards remain crisp and vibrant */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '110px',
                  background: theme === 'light' ? 'linear-gradient(to bottom, transparent 0%, rgba(248, 250, 252, 0.65) 60%, #f8fafc 100%)' : 'linear-gradient(to bottom, transparent 0%, rgba(5, 5, 8, 0.6) 60%, #000000 100%)',
                  pointerEvents: 'none',
                  zIndex: 10
                }}
              />
            </div>

            {/* SVG Follow Scroll Transition */}
            <div
              id="svg-follow-scroll-transition"
              style={{
                position: 'relative',
                width: '100%',
                backgroundColor: theme === 'light' ? '#f8fafc' : '#000000',
                overflow: 'hidden',
                zIndex: 15
              }}
            >
              <Skiper19 strokeColor="#00d2ff" />
            </div>

            {/* 3D InfiniteMenu Team Showcase with Orb Background */}
            <div
              id="team-showcase"
              style={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                minHeight: '700px',
                backgroundColor: theme === 'light' ? '#f8fafc' : '#000000',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Top smooth blending gradient */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '240px',
                  background: theme === 'light' ? 'linear-gradient(to bottom, #f8fafc 0%, rgba(248, 250, 252, 0.85) 45%, rgba(248, 250, 252, 0.25) 75%, transparent 100%)' : 'linear-gradient(to bottom, #000000 0%, rgba(0, 0, 0, 0.8) 45%, rgba(0, 0, 0, 0.25) 75%, transparent 100%)',
                  pointerEvents: 'none',
                  zIndex: 20
                }}
              />

              {/* Space Orb Background (deferred until loader done) */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 0,
                  pointerEvents: 'none',
                  overflow: 'hidden'
                }}
              >
                {isLoaderDone && (
                  <Orb
                    hoverIntensity={0.24}
                    rotateOnHover
                    hue={360}
                    forceHoverState={false}
                    backgroundColor={theme === 'light' ? '#f8fafc' : '#000000'}
                  />
                )}
              </div>

              {/* Members Count Badge */}
              <header
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 30,
                  padding: '24px 36px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  pointerEvents: 'none',
                  direction: lang === 'ar' ? 'rtl' : 'ltr'
                }}
              >
                <div
                  style={{
                    padding: '6px 14px',
                    background: theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.06)', border: theme === 'light' ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '999px',
                    color: '#c4b5fd',
                    fontSize: '12px',
                    fontWeight: 600,
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {teamMembers.length} {lang === 'ar' ? 'أعضاء متاحين' : 'Available Members'}
                </div>
              </header>

              {/* 3D Circular Team Carousel */}
              <div style={{ position: 'relative', width: '100%', height: '100%', flex: 1, zIndex: 1 }}>
                <InfiniteMenu
                  items={localizedTeamMembers as any}
                  scale={1.4}
                  backgroundColor="transparent"
                  onSelectMember={handleSelectMember}
                />
              </div>
            </div>
          </section>
        </>
      )}

      {/* Cinematic Footer */}
      <CinematicFooter key={isAuthOpen ? 'auth-footer' : (isContactOpen ? 'contact-footer' : `${currentTab}-footer`)} />
    </main>
  );
}

