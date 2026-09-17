'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useThemeLanguage } from '../../context/ThemeLanguageContext'

export interface ThemeSwitchProps {
  className?: string
}

export function ThemeSwitch({ className = '' }: ThemeSwitchProps) {
  // Use global ThemeLanguageContext when available to sync with all website sections
  let contextTheme: 'light' | 'dark' | undefined;
  let contextToggle: (() => void) | undefined;
  try {
    const ctx = useThemeLanguage();
    contextTheme = ctx.theme;
    contextToggle = ctx.toggleTheme;
  } catch {
    // context not present in isolated render
  }

  const [localTheme, setLocalTheme] = React.useState<'light' | 'dark'>('light');

  // Check current theme on component mount if no context
  React.useEffect(() => {
    if (!contextTheme) {
      const savedTheme =
        localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

      setLocalTheme(savedTheme as 'light' | 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, [contextTheme]);

  const activeTheme = contextTheme || localTheme;
  const isLight = activeTheme === 'light';

  // Toggle theme
  const toggleTheme = React.useCallback(() => {
    if (contextToggle) {
      contextToggle();
    } else {
      const newTheme = activeTheme === 'light' ? 'dark' : 'light';
      setLocalTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  }, [contextToggle, activeTheme]);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={isLight ? "تفعيل الوضع الليلي / Switch to Dark Mode" : "تفعيل الوضع النهاري / Switch to Light Mode"}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className={`relative flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-color-primary)] hover:opacity-80 transition-opacity overflow-hidden ${className}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '32px',
        borderRadius: '9999px',
        border: isLight ? '1px solid rgba(2, 132, 199, 0.25)' : '1px solid rgba(255, 255, 255, 0.14)',
        background: isLight ? 'rgba(2, 132, 199, 0.08)' : 'rgba(255, 255, 255, 0.06)',
        color: isLight ? '#0284c7' : '#ffffff',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all 0.25s ease',
        flexShrink: 0
      }}
    >
      <Sun
        className={`absolute h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isLight 
            ? 'scale-100 translate-y-0 opacity-100' 
            : 'scale-50 translate-y-5 opacity-0'
        }`}
        style={{
          position: 'absolute',
          width: '20px',
          height: '20px',
          color: '#f59e0b',
          filter: 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.45))',
          transform: isLight ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(20px)',
          opacity: isLight ? 1 : 0,
          pointerEvents: isLight ? 'auto' : 'none',
          transition: 'all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          !isLight 
            ? 'scale-100 translate-y-0 opacity-100' 
            : 'scale-50 translate-y-5 opacity-0'
        }`}
        style={{
          position: 'absolute',
          width: '20px',
          height: '20px',
          color: '#38bdf8',
          filter: 'drop-shadow(0 0 6px rgba(56, 189, 248, 0.45))',
          transform: !isLight ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(20px)',
          opacity: !isLight ? 1 : 0,
          pointerEvents: !isLight ? 'auto' : 'none',
          transition: 'all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      />
    </button>
  );
}

export default ThemeSwitch;
