import { useState, useEffect } from 'react';
import ScrollProgress from '@/registry/magicui/scroll-progress';
import { Skiper19 } from '@/components/ui/svg-follow-scroll';
import GooeyNav from './GooeyNav';
import ScrollExpandPrototype from './pages/ScrollExpandPrototype';
import TeamMomentsRing from './components/TeamMomentsRing';
import InfiniteMenu from './InfiniteMenu';
import Orb from './Orb';
import CinematicFooter from './components/CinematicFooter';
import ProfilePage from './ProfilePage';
import ContactPage from './ContactPage';
import AuthPage from './AuthPage';
import LiveProjectsShowcase from './components/projects/LiveProjectsShowcase';
import VideosSection from './components/videos/VideosSection';
import ArticlesSection from './components/articles/ArticlesSection';
import { LogIn, Cpu, Video, Sparkles, BookOpen } from 'lucide-react';
import { teamMembers } from './data/teamData';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'الرئيسية', href: '#top' },
  { label: 'المشاريع', href: '#projects' },
  { label: 'الفيديوهات', href: '#videos' },
  { label: 'المقالات', href: '#articles' },
  { label: 'من نحن', href: '#about' },
  { label: 'تواصل معنا', href: '#contact' },
];

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'projects' | 'videos' | 'articles' | 'about'>('home');
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activeNavIndex, setActiveNavIndex] = useState(0);

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
    return <ProfilePage member={selectedMember} onBack={handleBackToMenu} />;
  }

  return (
    <main style={{ width: '100%', minHeight: '100vh', backgroundColor: '#050508' }}>
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
          title="تكنو إنجاز | الرئيسية"
        >
          <img
            src="/techno-logo.png"
            alt="شعار تكنو إنجاز"
            className="navbar-brand-logo"
          />
          <span className="navbar-brand-text">تكنو إنجاز</span>
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

        {/* End Actions: Login / Register Button */}
        <div className="navbar-end-actions">
          <button
            type="button"
            className={`navbar-auth-btn ${isAuthOpen ? 'active' : ''}`}
            onClick={() => handleOpenAuth('login')}
            title="تسجيل الدخول أو إنشاء حساب جديد"
          >
            <span className="navbar-auth-btn-icon">
              <LogIn size={15} />
            </span>
            <span>تسجيل الدخول</span>
          </button>
        </div>
      </nav>

      {/* Page Content: AuthPage, ContactPage, Dedicated Tabs, or Homepage */}
      {isAuthOpen ? (
        <AuthPage
          initialMode={authMode}
          onBack={handleBackFromAuth}
        />
      ) : isContactOpen ? (
        <ContactPage onBack={handleBackFromContact} />
      ) : currentTab === 'projects' ? (
        <div className="tab-page-container">
          <div className="tab-page-header">
            <h1 className="tab-page-title">مشاريع ومنظومات تكنو إنجاز</h1>
            <p className="tab-page-subtitle">
              استكشف 13 مشروعاً برمجياً ومنظومة هندسية تعمل الآن ومتاحة للتجربة الحية والمباشرة
            </p>
          </div>

          <LiveProjectsShowcase />
        </div>
      ) : currentTab === 'videos' ? (
        <div className="tab-page-container">
          <div className="tab-page-header">
            <h1 className="tab-page-title">فيديوهات وعروض تكنو إنجاز</h1>
            <p className="tab-page-subtitle">
              عروض مرئية تفاعلية توثق إنجازاتنا الهندسية ومراحل تطوير الأنظمة والبرمجيات المتقدمة
            </p>
          </div>

          <VideosSection showNavigateButton={false} />

          <div className="tab-page-cards-grid">
            <div className="tab-page-card">
              <div className="tab-page-card-icon">
                <Video size={26} />
              </div>
              <h3 className="tab-page-card-title">عروض تفاعلية ثلاثية الأبعاد</h3>
              <p className="tab-page-card-desc">
                استكشف مجسمات الأنظمة والمعماريات الهندسية بتفاصيل واقعية تحاكي تشغيل البرمجيات في بيئات العمل الحقيقية.
              </p>
            </div>

            <div className="tab-page-card">
              <div className="tab-page-card-icon">
                <Sparkles size={26} />
              </div>
              <h3 className="tab-page-card-title">عروض مرئية فائقة الوضوح</h3>
              <p className="tab-page-card-desc">
                توثيق عالي الدقة يوضح طريقة تفاعل المستخدمين مع منصاتنا وتكامل الحلول البرمجية مع مختلف الأجهزة.
              </p>
            </div>
          </div>
        </div>
      ) : currentTab === 'articles' ? (
        <div className="tab-page-container">
          <div className="tab-page-header">
            <h1 className="tab-page-title">مقالات وأبحاث تكنو إنجاز</h1>
            <p className="tab-page-subtitle">
              دراسات وأبحاث تقنية توثق التجارب المعمارية والخوارزميات المبتكرة في مشاريع تكنو إنجاز
            </p>
          </div>

          <ArticlesSection />

          <div className="tab-page-cards-grid">
            <div className="tab-page-card">
              <div className="tab-page-card-icon">
                <BookOpen size={26} />
              </div>
              <h3 className="tab-page-card-title">أبحاث الذكاء الاصطناعي التوليدي</h3>
              <p className="tab-page-card-desc">
                سلسلة مقالات تخصصية تناقش بنية النماذج العصبية المتقدمة وكيفية تسخيرها في تسريع دورة الإنتاج البرمجي.
              </p>
            </div>

            <div className="tab-page-card">
              <div className="tab-page-card-icon">
                <Cpu size={26} />
              </div>
              <h3 className="tab-page-card-title">المعمارية النظيفة وهندسة النظم</h3>
              <p className="tab-page-card-desc">
                رؤى هندسية تطبيقية حول بناء أنظمة قابلة للتوسع وتصميم واجهات برمجية متماسكة ومرنة للمستقبل.
              </p>
            </div>
          </div>
        </div>
      ) : currentTab === 'about' ? (
        <section
          id="about"
          style={{
            position: 'relative',
            width: '100%',
            backgroundColor: '#050508'
          }}
        >
          {/* Header for About Us Section */}
          <div
            style={{
              padding: '90px 24px 24px',
              textAlign: 'center',
              maxWidth: '850px',
              margin: '0 auto',
              direction: 'rtl'
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '14px',
                letterSpacing: '-0.02em',
                textShadow: '0 0 25px rgba(0, 210, 255, 0.2)'
              }}
            >
              من نحن
            </h2>
            <p
              style={{
                fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
                color: 'rgba(255, 255, 255, 0.72)',
                lineHeight: 1.7
              }}
            >
              نخبة من المهندسين والمبتكرين في تكنو إنجاز يسخّرون الذكاء الاصطناعي والهندسة المتطورة لبناء حلول تقنية استثنائية
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
              backgroundColor: '#050508'
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
                background: 'linear-gradient(to bottom, transparent 0%, rgba(5, 5, 8, 0.3) 30%, rgba(0, 0, 0, 0.8) 70%, #000000 100%)',
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
              backgroundColor: '#000000',
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
              backgroundColor: '#000000',
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
                background: 'linear-gradient(to bottom, #000000 0%, rgba(0, 0, 0, 0.8) 45%, rgba(0, 0, 0, 0.25) 75%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 20
              }}
            />

            {/* Space Orb Background */}
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
              <Orb
                hoverIntensity={0.24}
                rotateOnHover
                hue={360}
                forceHoverState={false}
                backgroundColor="#000000"
              />
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
                direction: 'rtl'
              }}
            >
              <div
                style={{
                  padding: '6px 14px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '999px',
                  color: '#c4b5fd',
                  fontSize: '12px',
                  fontWeight: 600,
                  backdropFilter: 'blur(10px)'
                }}
              >
                {teamMembers.length} أعضاء متاحين
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
            style={{
              position: 'relative',
              width: '100%',
              backgroundColor: '#050508'
            }}
          >
            {/* Header for About Us Section */}
            <div
              style={{
                padding: '90px 24px 24px',
                textAlign: 'center',
                maxWidth: '850px',
                margin: '0 auto',
                direction: 'rtl'
              }}
            >
              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  marginBottom: '14px',
                  letterSpacing: '-0.02em',
                  textShadow: '0 0 25px rgba(0, 210, 255, 0.2)'
                }}
              >
                من نحن
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
                  color: 'rgba(255, 255, 255, 0.72)',
                  lineHeight: 1.7
                }}
              >
                نخبة من المهندسين والمبتكرين في تكنو إنجاز يسخّرون الذكاء الاصطناعي والهندسة المتطورة لبناء حلول تقنية استثنائية
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
                backgroundColor: '#050508'
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
                  background: 'linear-gradient(to bottom, transparent 0%, rgba(5, 5, 8, 0.3) 30%, rgba(0, 0, 0, 0.8) 70%, #000000 100%)',
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
                backgroundColor: '#000000',
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
                backgroundColor: '#000000',
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
                  background: 'linear-gradient(to bottom, #000000 0%, rgba(0, 0, 0, 0.8) 45%, rgba(0, 0, 0, 0.25) 75%, transparent 100%)',
                  pointerEvents: 'none',
                  zIndex: 20
                }}
              />

              {/* Space Orb Background */}
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
                <Orb
                  hoverIntensity={0.24}
                  rotateOnHover
                  hue={360}
                  forceHoverState={false}
                  backgroundColor="#000000"
                />
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
                  direction: 'rtl'
                }}
              >
                <div
                  style={{
                    padding: '6px 14px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '999px',
                    color: '#c4b5fd',
                    fontSize: '12px',
                    fontWeight: 600,
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {teamMembers.length} أعضاء متاحين
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

