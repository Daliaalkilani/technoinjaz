import { useState, useEffect, lazy, Suspense } from 'react';
import ScrollProgress from '@/registry/magicui/scroll-progress';
import { Skiper19 } from '@/components/ui/svg-follow-scroll';
import GooeyNav from './GooeyNav';
import ScrollExpandPrototype from './pages/ScrollExpandPrototype';
import TeamMomentsRing from './components/TeamMomentsRing';
import InfiniteMenu from './InfiniteMenu';
import Orb from './Orb';
import CinematicFooter from './components/CinematicFooter';
import VideosSection from './components/videos/VideosSection';
import ArticlesSection from './components/articles/ArticlesSection';
import { LogIn, Cpu, Video, Sparkles, BookOpen, Sun, Moon } from 'lucide-react';
import { teamMembers } from './data/teamData';
import { useThemeLanguage } from './context/ThemeLanguageContext';

const ProfilePage = lazy(() => import('./ProfilePage'));
const ContactPage = lazy(() => import('./ContactPage'));
const AuthPage = lazy(() => import('./AuthPage'));
const LiveProjectsShowcase = lazy(() => import('./components/projects/LiveProjectsShowcase'));
const ProjectsCatalogSection = lazy(() => import('./components/projects/ProjectsCatalogSection'));

interface NavItem {
  label: string;
  href: string;
}

export default function App() {
  const { theme, lang, toggleTheme, setLang, t } = useThemeLanguage();
  const [isLoaderDone, setIsLoaderDone] = useState(false);
  const [currentTab, setCurrentTab] = useState<'home' | 'projects' | 'videos' | 'articles' | 'about'>('home');
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activeNavIndex, setActiveNavIndex] = useState(0);

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

  const navItems: NavItem[] = [
    { label: t.nav.home, href: '#top' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.videos, href: '#videos' },
    { label: t.nav.articles, href: '#articles' },
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
        setActiveNavIndex(5);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (hash === '#auth' || hash === '#login' || hash === '#register') {
        setSelectedMember(null);
        setIsContactOpen(false);
        setIsAuthOpen(true);
        setAuthMode(hash === '#register' ? 'register' : 'login');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      setSelectedMember(null);
      setIsContactOpen(false);
      setIsAuthOpen(false);

      if (hash === '#projects') {
        setCurrentTab('projects');
        setActiveNavIndex(1);
      } else if (hash === '#videos') {
        setCurrentTab('videos');
        setActiveNavIndex(2);
      } else if (hash === '#articles') {
        setCurrentTab('articles');
        setActiveNavIndex(3);
      } else if (hash === '#about') {
        setCurrentTab('about');
        setActiveNavIndex(4);
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
    setIsContactOpen(false);
    setSelectedMember(null);
    setIsAuthOpen(true);
    setAuthMode(mode);
    window.location.hash = `#${mode}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromAuth = () => {
    setIsAuthOpen(false);
    setActiveNavIndex(0);
    window.location.hash = '';
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

  return (
    <main style={{ width: '100%', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Scroll indicator */}
      <ScrollProgress className="top-0" />

      {/* Top Navbar with GooeyNav */}
      <nav id="navbar" className="top-navbar-container">
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
            activeIndex={isAuthOpen ? -1 : (isContactOpen ? 5 : activeNavIndex)}
            onItemSelect={handleNavItemSelect}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>

        {/* End Actions: Language Switcher, Theme Toggle, Login */}
        <div className="navbar-end-actions">
          {/* Language Capsule Toggle [ عربي | EN ] */}
          <div className="lang-capsule-toggle" title="Switch Language / تبديل اللغة">
            <button
              type="button"
              className={`lang-pill-btn ${lang === 'ar' ? 'active' : ''}`}
              onClick={() => setLang('ar')}
              aria-label="اللغة العربية"
            >
              عربي
            </button>
            <button
              type="button"
              className={`lang-pill-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
              aria-label="English Language"
            >
              EN
            </button>
          </div>

          {/* Theme Toggle Button (Sun / Moon) */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? t.theme.light : t.theme.dark}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>

          {/* Login Button */}
          <button
            type="button"
            className={`navbar-auth-btn ${isAuthOpen ? 'active' : ''}`}
            onClick={() => handleOpenAuth('login')}
            title={t.nav.login}
          >
            <span className="navbar-auth-btn-icon">
              <LogIn size={15} />
            </span>
            <span>{t.nav.login}</span>
          </button>
        </div>
      </nav>

      {/* Page Content: AuthPage, ContactPage, Dedicated Tabs, or Homepage */}
      {isAuthOpen ? (
        <Suspense fallback={<div style={{ minHeight: '60vh', backgroundColor: 'var(--bg-main)' }} />}>
          <AuthPage
            initialMode={authMode}
            onBack={handleBackFromAuth}
          />
        </Suspense>
      ) : isContactOpen ? (
        <Suspense fallback={<div style={{ minHeight: '60vh', backgroundColor: 'var(--bg-main)' }} />}>
          <ContactPage onBack={handleBackFromContact} />
        </Suspense>
      ) : currentTab === 'projects' ? (
        <div className="tab-page-container">
          <div className="tab-page-header">
            <h1 className="tab-page-title">{t.liveProjects.pageTitle}</h1>
            <p className="tab-page-subtitle">{t.liveProjects.pageSubtitle}</p>
          </div>

          <Suspense fallback={<div style={{ minHeight: '60vh', backgroundColor: 'var(--bg-main)' }} />}>
            <LiveProjectsShowcase />
          </Suspense>

          <Suspense fallback={<div style={{ minHeight: '40vh', backgroundColor: 'var(--bg-main)' }} />}>
            <ProjectsCatalogSection />
          </Suspense>
        </div>
      ) : currentTab === 'videos' ? (
        <div className="tab-page-container">
          <div className="tab-page-header">
            <h1 className="tab-page-title">{t.videos.pageTitle}</h1>
            <p className="tab-page-subtitle">{t.videos.pageSubtitle}</p>
          </div>

          <VideosSection showNavigateButton={false} />

          <div className="tab-page-cards-grid">
            <div className="tab-page-card">
              <div className="tab-page-card-icon">
                <Video size={26} />
              </div>
              <h3 className="tab-page-card-title">{t.videos.card1Title}</h3>
              <p className="tab-page-card-desc">{t.videos.card1Desc}</p>
            </div>

            <div className="tab-page-card">
              <div className="tab-page-card-icon">
                <Sparkles size={26} />
              </div>
              <h3 className="tab-page-card-title">{t.videos.card2Title}</h3>
              <p className="tab-page-card-desc">{t.videos.card2Desc}</p>
            </div>
          </div>
        </div>
      ) : currentTab === 'articles' ? (
        <div className="tab-page-container">
          <div className="tab-page-header">
            <h1 className="tab-page-title">{t.articles.pageTitle}</h1>
            <p className="tab-page-subtitle">{t.articles.pageSubtitle}</p>
          </div>

          <ArticlesSection />

          <div className="tab-page-cards-grid">
            <div className="tab-page-card">
              <div className="tab-page-card-icon">
                <BookOpen size={26} />
              </div>
              <h3 className="tab-page-card-title">
                {lang === 'ar' ? 'أبحاث الذكاء الاصطناعي التوليدي' : 'Generative AI Research'}
              </h3>
              <p className="tab-page-card-desc">
                {lang === 'ar' 
                  ? 'سلسلة مقالات تخصصية تناقش بنية النماذج العصبية المتقدمة وكيفية تسخيرها في تسريع دورة الإنتاج البرمجي.' 
                  : 'Specialized articles discussing neural models and their application in accelerating development cycles.'}
              </p>
            </div>

            <div className="tab-page-card">
              <div className="tab-page-card-icon">
                <Cpu size={26} />
              </div>
              <h3 className="tab-page-card-title">
                {lang === 'ar' ? 'المعمارية النظيفة وهندسة النظم' : 'Clean Architecture & Systems'}
              </h3>
              <p className="tab-page-card-desc">
                {lang === 'ar'
                  ? 'رؤى هندسية تطبيقية حول بناء أنظمة قابلة للتوسع وتصميم واجهات برمجية متماسكة ومرنة للمستقبل.'
                  : 'Engineering insights on building scalable systems and cohesive, future-proof APIs.'}
              </p>
            </div>
          </div>
        </div>
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

            {/* Bottom gradient fade */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '320px',
                background: theme === 'light' ? 'linear-gradient(to bottom, transparent 0%, rgba(248, 250, 252, 0.4) 30%, rgba(241, 245, 249, 0.9) 70%, #f8fafc 100%)' : 'linear-gradient(to bottom, transparent 0%, rgba(5, 5, 8, 0.3) 30%, rgba(0, 0, 0, 0.8) 70%, #000000 100%)',
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
                items={teamMembers as any}
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
            onOpenContact={() => handleNavItemSelect(navItems[5], 5)}
            onNavigateToProjects={() => handleNavItemSelect(navItems[1], 1)} 
            onNavigateToVideos={() => handleNavItemSelect(navItems[2], 2)}
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

              {/* Bottom gradient fade */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '320px',
                  background: theme === 'light' ? 'linear-gradient(to bottom, transparent 0%, rgba(248, 250, 252, 0.4) 30%, rgba(241, 245, 249, 0.9) 70%, #f8fafc 100%)' : 'linear-gradient(to bottom, transparent 0%, rgba(5, 5, 8, 0.3) 30%, rgba(0, 0, 0, 0.8) 70%, #000000 100%)',
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
                  items={teamMembers as any}
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

