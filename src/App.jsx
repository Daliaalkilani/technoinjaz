import React, { useState, useEffect } from 'react';
import InfiniteMenu from './InfiniteMenu';
import ProfilePage from './ProfilePage';
import Orb from './Orb';
import TeamMomentsRing from './components/TeamMomentsRing';
import GooeyNav from './GooeyNav';
import { ScrollProgress } from "@/registry/magicui/scroll-progress";
import { Skiper19 } from "@/components/ui/svg-follow-scroll";
import CinematicFooter from './components/CinematicFooter';
import ContactPage from './ContactPage';
import AuthPage from './AuthPage';
import { LogIn } from 'lucide-react';
import { teamMembers } from './data/teamData';

// عناصر شريط التنقل التفاعلي GooeyNav
const items = [
  { label: "الرئيسية", href: "#top" },
  { label: "المشاريع", href: "#projects" },
  { label: "المقالات", href: "#articles" },
  { label: "الفديوهات", href: "#videos" },
  { label: "من نحن", href: "#about" },
  { label: "تواصل معنا", href: "#contact" },
];


export default function App() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [activeNavIndex, setActiveNavIndex] = useState(0);

  // مزامنة الرابط (Hash) لتسهيل المشاركة والرجوع
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#profile-')) {
        const id = hash.replace('#profile-', '');
        const found = teamMembers.find(m => m.id === id);
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
      if (hash === '#top' || !hash) {
        setActiveNavIndex(0);
      } else if (hash === '#projects') {
        setActiveNavIndex(1);
      } else if (hash === '#articles') {
        setActiveNavIndex(2);
      } else if (hash === '#videos') {
        setActiveNavIndex(3);
      } else if (hash === '#about') {
        setActiveNavIndex(4);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavItemSelect = (item, index) => {
    setActiveNavIndex(index);
    setIsAuthOpen(false);
    if (item.href === '#contact') {
      setIsContactOpen(true);
      window.location.hash = '#contact';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item.href === '#top') {
      setIsContactOpen(false);
      window.location.hash = '#top';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsContactOpen(false);
      window.location.hash = item.href;
      setTimeout(() => {
        if (item.href === '#projects' || item.href === '#articles' || item.href === '#videos') {
          const el = document.getElementById('team-moments-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else if (item.href === '#about') {
          const el = document.getElementById('team-showcase');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const handleOpenAuth = (mode = 'login') => {
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

  const handleSelectMember = (member) => {
    setSelectedMember(member);
    setIsContactOpen(false);
    setIsAuthOpen(false);
    window.location.hash = `profile-${member.id}`;
  };

  const handleBackToMenu = () => {
    setSelectedMember(null);
    setIsContactOpen(false);
    setIsAuthOpen(false);
    window.location.hash = '';
    // الرجوع إلى قسم الفريق
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

  // إذا تم اختيار عضو، نعرض صفحته الشخصية الكاملة
  if (selectedMember) {
    return <ProfilePage member={selectedMember} onBack={handleBackToMenu} />;
  }

  return (
    <main style={{ width: '100%', minHeight: '100vh', backgroundColor: '#050508' }}>
      {/* شريط التنقل العلوي مع هوية تكنو إنجاز والشريط التفاعلي GooeyNav */}
      <nav id="top" className="top-navbar-container">
        {/* الهوية: اللوغو واسم تكنو إنجاز في الجهة المناسبة (اليمين في RTL) */}
        <a
          href="#top"
          className="navbar-brand-link"
          onClick={(e) => {
            e.preventDefault();
            handleNavItemSelect(items[0], 0);
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

        {/* الشريط التفاعلي المتمركز في المنتصف */}
        <div className="navbar-center-menu">
          <GooeyNav
            items={items}
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

        {/* زر تسجيل الدخول / إنشاء حساب في الطرف الأيسر */}
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

      {/* المحتوى الرئيسي: إما صفحة المصادقة، أو صفحة تواصل معنا، أو أقسام الصفحة الرئيسية */}
      {isAuthOpen ? (
        <AuthPage
          initialMode={authMode}
          onBack={handleBackFromAuth}
        />
      ) : isContactOpen ? (
        <ContactPage onBack={handleBackFromContact} />
      ) : (
        <>


      {/* 1. قسم لحظات الفريق كعنصر تالي */}
      <section
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

        {/* تدرج انسيابي تدريجي فائق النعومة في أسفل سكشن اللحظات يمنع أي حد فاصل */}
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
      </section>

      {/* 2. سكشن تتبع السكرول التفاعلي SVG Follow Scroll باللون الأزرق التقني (بديل الريبون) */}
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

      {/* 2. قسم أعضاء الفريق التفاعلي ثلاثي الأبعاد مع خلفية Orb */}
      <section
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
        {/* تدرج ناعم في أعلى قسم الفريق يكمل الاندماج العضوي مع السكشن السابق */}
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
        {/* خلفية كروية فضائية تفاعلية: Orb */}
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

        {/* شارة عدد أعضاء الفريق المتاحين في أعلى قسم الفريق */}
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

        {/* القائمة الدائرية ثلاثية الأبعاد */}
        <div style={{ position: 'relative', width: '100%', height: '100%', flex: 1, zIndex: 1 }}>
          <InfiniteMenu
            items={teamMembers}
            scale={1.4}
            backgroundColor="transparent"
            onSelectMember={handleSelectMember}
          />
        </div>
      </section>
      </>
      )}

      {/* 3. الفوتر السينمائي التفاعلي المكتمل في أسفل الموقع */}
      <CinematicFooter key={isAuthOpen ? 'auth-footer' : (isContactOpen ? 'contact-footer' : 'home-footer')} />
    </main>
  );
}
