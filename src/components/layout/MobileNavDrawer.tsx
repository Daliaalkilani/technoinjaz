'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { usePathname, useRouter } from 'next/navigation';
import {
  X,
  Home,
  FolderGit2,
  Video,
  BookOpen,
  HelpCircle,
  Users,
  Send,
  ChevronLeft,
  ChevronRight,
  User as UserIcon,
  Moon,
  Sun,
  Globe
} from 'lucide-react';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import './MobileNavDrawer.css';

export interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
  onRequireLogin: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
  currentUser,
  onRequireLogin
}) => {
  const { lang, setLang, theme, toggleTheme, t } = useThemeLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Close on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [pathname]);

  const navItems = [
    { label: t.nav.home, href: '/', icon: Home, matchExact: true },
    { label: t.nav.projects, href: '/projects', icon: FolderGit2 },
    { label: t.nav.videos, href: '/videos', icon: Video },
    { label: t.nav.articles, href: '/articles', icon: BookOpen },
    { label: t.nav.faq, href: '/faq', icon: HelpCircle },
    { label: t.nav.about, href: '/about', icon: Users },
    { label: t.nav.contact, href: '/contact', icon: Send },
  ];

  // Prefetch routes when drawer is opened for instant 0ms touch response
  useEffect(() => {
    if (isOpen) {
      navItems.forEach((item) => {
        if (item.href) {
          router.prefetch(item.href);
        }
      });
      router.prefetch('/account');
    }
  }, [isOpen, router]);

  const isRtl = lang === 'ar';
  const Chevron = isRtl ? ChevronLeft : ChevronRight;

  return (
    <div
      className={`mobile-drawer-portal ${isOpen ? 'is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={isRtl ? 'قائمة التنقل للهواتف' : 'Mobile Navigation Menu'}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Backdrop */}
      <div
        className="mobile-drawer-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div
        ref={drawerRef}
        className={`mobile-drawer-panel ${isOpen ? 'slide-in' : ''}`}
      >
        {/* Header */}
        <div className="mobile-drawer-header">
          <Link 
            href="/" 
            prefetch={true} 
            className="mobile-drawer-brand" 
            onClick={onClose}
            onPointerDown={() => router.prefetch('/')}
          >
            <ResponsiveImage
              src="/images/brand/techno-logo.png"
              alt="شعار تكنو إنجاز"
              className="mobile-drawer-brand-logo"
              sizes="96px"
            />
            <span className="mobile-drawer-brand-text">{t.nav.brand}</span>
          </Link>

          <button
            type="button"
            className="mobile-drawer-close-btn"
            onClick={onClose}
            aria-label={isRtl ? 'إغلاق القائمة' : 'Close Menu'}
          >
            <X size={22} />
          </button>
        </div>

        {/* User Card */}
        <div className="mobile-drawer-user-section">
          {currentUser ? (
            <Link
              href="/account"
              prefetch={true}
              className="mobile-drawer-user-card"
              onClick={onClose}
              onPointerDown={() => router.prefetch('/account')}
            >
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name || 'User Profile'}
                  className="mobile-drawer-user-avatar"
                />
              ) : (
                <div className="mobile-drawer-user-avatar-fallback">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : <UserIcon size={18} />}
                </div>
              )}
              <div className="mobile-drawer-user-info">
                <span className="mobile-drawer-user-name">
                  {currentUser.name || (isRtl ? 'المستخدم' : 'User')}
                </span>
                <span className="mobile-drawer-user-email">
                  {currentUser.email || (isRtl ? 'الملف الشخصي' : 'View Profile')}
                </span>
              </div>
              <Chevron size={18} className="mobile-drawer-chevron-hint" />
            </Link>
          ) : (
            <button
              type="button"
              className="mobile-drawer-login-btn"
              onClick={() => {
                onClose();
                onRequireLogin();
              }}
            >
              <UserIcon size={18} />
              <span>{t.nav.login}</span>
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="mobile-drawer-nav">
          <ul className="mobile-drawer-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.matchExact
                ? pathname === item.href
                : pathname.startsWith(item.href);

              return (
                <li key={item.href} className="mobile-drawer-item">
                  <Link
                    href={item.href}
                    prefetch={true}
                    className={`mobile-drawer-link ${isActive ? 'is-active' : ''}`}
                    onClick={onClose}
                    onPointerDown={() => router.prefetch(item.href)}
                  >
                    <div className="mobile-drawer-link-start">
                      <span className="mobile-drawer-icon-wrap">
                        <Icon size={20} />
                      </span>
                      <span className="mobile-drawer-label">{item.label}</span>
                    </div>
                    {isActive ? (
                      <span className="mobile-drawer-active-pill" />
                    ) : (
                      <Chevron size={16} className="mobile-drawer-item-chevron" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Quick Controls: Language & Theme */}
        <div className="mobile-drawer-footer">
          <div className="mobile-drawer-switches">
            {/* Language Switch */}
            <button
              type="button"
              className="mobile-drawer-switch-btn"
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              aria-label={isRtl ? 'تغيير اللغة' : 'Change Language'}
            >
              <Globe size={18} />
              <span>{lang === 'ar' ? 'English (EN)' : 'العربية (AR)'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              className="mobile-drawer-switch-btn"
              onClick={toggleTheme}
              aria-label={isRtl ? 'تبديل المظهر' : 'Toggle Theme'}
              suppressHydrationWarning
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              <span>{theme === 'dark' ? (isRtl ? 'الوضع النهاري' : 'Light Mode') : (isRtl ? 'الوضع الليلي' : 'Dark Mode')}</span>
            </button>
          </div>

          <div className="mobile-drawer-brand-footnote">
            <span>© {new Date().getFullYear()} {t.nav.brand}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavDrawer;
