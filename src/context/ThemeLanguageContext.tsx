'use client';

import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from 'react';
import { translations, type Translations } from '../locales/translations';

export type Theme = 'dark' | 'light';
export type Language = 'ar' | 'en';

interface ThemeLanguageContextType {
  theme: Theme;
  lang: Language;
  toggleTheme: () => void;
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

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        localStorage.setItem('techno_theme_manual', 'true');
        localStorage.setItem('techno_theme', next);
        localStorage.setItem('theme', next);
      }
      return next;
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
