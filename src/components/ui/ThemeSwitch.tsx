import { Moon, Sun } from 'lucide-react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';

export interface ThemeSwitchProps {
  className?: string;
}

export function ThemeSwitch({ className = '' }: ThemeSwitchProps) {
  // Use global theme context
  const { theme, toggleTheme } = useThemeLanguage();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={theme === 'dark' ? "Switch to Light Mode / تفعيل الوضع النهاري" : "Switch to Dark Mode / تفعيل الوضع الليلي"}
      aria-label="Toggle theme"
      className={`relative flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-color-primary)] hover:opacity-80 transition-opacity overflow-hidden ${className}`}
      style={{
        border: '1px solid var(--border-subtle, rgba(255,255,255,0.12))',
        background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
        cursor: 'pointer'
      }}
    >
      <Sun
        className={`absolute h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          theme === 'light' 
            ? 'scale-100 translate-y-0 opacity-100' 
            : 'scale-50 translate-y-5 opacity-0'
        }`}
        style={{
          color: '#f59e0b',
          filter: 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.4))'
        }}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          theme === 'dark' 
            ? 'scale-100 translate-y-0 opacity-100' 
            : 'scale-50 translate-y-5 opacity-0'
        }`}
        style={{
          color: '#38bdf8',
          filter: 'drop-shadow(0 0 6px rgba(56, 189, 248, 0.4))'
        }}
      />
    </button>
  );
}

export default ThemeSwitch;
