'use client';

import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from 'react';
import { translations, type Translations } from '../locales/translations';

export type Theme = 'dark' | 'light';
export type Language = 'ar' | 'en';

interface ThemeLanguageContextType {
  theme: Theme;
  lang: Language;
  toggleTheme: (e?: React.MouseEvent | MouseEvent) => void;
  setLang: (lang: Language) => void;
  t: Translations;
}

const ThemeLanguageContext = createContext<ThemeLanguageContextType | undefined>(undefined);

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const ThemeLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [lang, setLangState] = useState<Language>('ar');

  // Synchronize with document attributes on initial mount
  useIsomorphicLayoutEffect(() => {
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'light' || attr === 'dark') {
      setTheme(attr);
    }
    try {
      const l = localStorage.getItem('techno_lang');
      if (l === 'en' || l === 'ar') {
        setLangState(l);
      }
    } catch {}
    document.documentElement.removeAttribute('data-lang-pending');
  }, []);

  // Listen for browser/system color scheme changes in real time
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const isManual = localStorage.getItem('techno_theme_manual');
      if (!isManual) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  // Update HTML attributes and persistence whenever theme changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
      document.documentElement.classList.toggle('light', theme === 'light');
      localStorage.setItem('techno_theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // Update HTML dir and lang
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', lang);
      localStorage.setItem('techno_lang', lang);
    }
  }, [lang]);

  const toggleTheme = (e?: React.MouseEvent | MouseEvent) => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';

    const applyTheme = () => {
      setTheme(nextTheme);
      if (typeof window !== 'undefined') {
        localStorage.setItem('techno_theme_manual', 'true');
        localStorage.setItem('techno_theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
      }
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', nextTheme);
        document.documentElement.classList.toggle('dark', nextTheme === 'dark');
        document.documentElement.classList.toggle('light', nextTheme === 'light');
      }
    };

    // Check if View Transitions API is available and user doesn't prefer reduced motion
    const doc = (typeof document !== 'undefined' ? document : null) as any;
    if (
      typeof window === 'undefined' ||
      !doc ||
      !doc.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      applyTheme();
      return;
    }

    // Determine coordinates (x, y) for circular expansion from the button
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    if (e && typeof e.clientX === 'number' && typeof e.clientY === 'number' && (e.clientX !== 0 || e.clientY !== 0)) {
      x = e.clientX;
      y = e.clientY;
    } else {
      const btn = document.getElementById('theme-toggle-btn') || document.querySelector('.theme-toggle-button');
      if (btn) {
        const rect = btn.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      }
    }

    // Radius to the farthest corner of the viewport
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      applyTheme();
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];

      document.documentElement.animate(
        {
          clipPath: clipPath
        },
        {
          duration: 550,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          pseudoElement: '::view-transition-new(root)'
        }
      );
    });
  };

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const t = translations[lang];

  return (
    <ThemeLanguageContext.Provider value={{ theme, lang, toggleTheme, setLang, t }}>
      {children}
    </ThemeLanguageContext.Provider>
  );
};

export const useThemeLanguage = (): ThemeLanguageContextType => {
  const context = useContext(ThemeLanguageContext);
  if (!context) {
    throw new Error('useThemeLanguage must be used within a ThemeLanguageProvider');
  }
  return context;
};
