import React, { createContext, useContext, useState, useEffect } from 'react';
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

export const ThemeLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const isManual = localStorage.getItem('techno_theme_manual');
      const saved = (localStorage.getItem('theme') || localStorage.getItem('techno_theme')) as Theme;
      
      // If user previously made an explicit manual choice, respect it
      if (isManual && (saved === 'light' || saved === 'dark')) {
        return saved;
      }

      // Automatically adapt to the user's browser/OS theme settings
      if (window.matchMedia) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return 'dark';
        }
        if (window.matchMedia('(prefers-color-scheme: light)').matches) {
          return 'light';
        }
      }

      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('techno_lang') as Language;
      if (saved === 'ar' || saved === 'en') return saved;
    }
    return 'ar';
  });

  // Listen for browser/system color scheme changes in real time
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const isManual = localStorage.getItem('techno_theme_manual');
      // If user hasn't explicitly clicked a manual override, follow the browser system mode
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
