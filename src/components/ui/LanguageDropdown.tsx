'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import './LanguageDropdown.css';

interface LanguageDropdownProps {
  className?: string;
}

export const SyriaFlag: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg 
    viewBox="0 0 30 20" 
    width={size} 
    height={Math.round(size * 0.67)} 
    className={`lang-flag-svg ${className}`} 
    aria-hidden="true"
    style={{ borderRadius: '2px', overflow: 'hidden', display: 'inline-block', flexShrink: 0, boxShadow: '0 0 2px rgba(0,0,0,0.4)' }}
  >
    <rect width="30" height="20" fill="#000000" />
    <rect width="30" height="13.33" fill="#ffffff" />
    <rect width="30" height="6.67" fill="#ce1126" />
    <g fill="#007a3d">
      <path transform="translate(10, 10)" d="M 0 -2.2 L 0.65 -0.65 L 2.2 -0.65 L 1.0 0.3 L 1.4 1.9 L 0 0.9 L -1.4 1.9 L -1.0 0.3 L -2.2 -0.65 L -0.65 -0.65 Z" />
      <path transform="translate(20, 10)" d="M 0 -2.2 L 0.65 -0.65 L 2.2 -0.65 L 1.0 0.3 L 1.4 1.9 L 0 0.9 L -1.4 1.9 L -1.0 0.3 L -2.2 -0.65 L -0.65 -0.65 Z" />
    </g>
  </svg>
);

export const UKFlag: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg 
    viewBox="0 0 60 30" 
    width={size} 
    height={Math.round(size * 0.67)} 
    className={`lang-flag-svg ${className}`} 
    aria-hidden="true"
    style={{ borderRadius: '2px', overflow: 'hidden', display: 'inline-block', flexShrink: 0, boxShadow: '0 0 2px rgba(0,0,0,0.4)' }}
  >
    <rect width="60" height="30" fill="#012169" />
    <path d="M0 0 L60 30 M60 0 L0 30" stroke="#ffffff" strokeWidth="6" />
    <path d="M0 0 L30 15 M60 30 L30 15" stroke="#c8102e" strokeWidth="2" />
    <path d="M60 0 L30 15 M0 30 L30 15" stroke="#c8102e" strokeWidth="2" />
    <path d="M30 0 v30 M0 15 h60" stroke="#ffffff" strokeWidth="10" />
    <path d="M30 0 v30 M0 15 h60" stroke="#c8102e" strokeWidth="6" />
  </svg>
);

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({ className = '' }) => {
  const { lang, setLang } = useThemeLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const selectLang = (newLang: 'ar' | 'en') => {
    setLang(newLang);
    setIsOpen(false);
  };

  const isRtl = lang === 'ar';

  return (
    <div ref={dropdownRef} className={`lang-dropdown-wrapper ${className}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        className={`lang-dropdown-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        title={isRtl ? 'تغيير لغة الموقع' : 'Change Website Language'}
        aria-label={isRtl ? 'تغيير لغة الموقع' : 'Change Website Language'}
      >
        {lang === 'ar' ? <SyriaFlag size={18} /> : <UKFlag size={18} />}
        <span className="lang-current-label">
          {lang === 'ar' ? 'العربية' : 'English'}
        </span>
        <ChevronDown size={13} className={`lang-chevron-icon ${isOpen ? 'rotate-open' : ''}`} />
      </button>

      {/* Dropdown Menu Popover */}
      {isOpen && (
        <div className="lang-dropdown-menu" role="listbox">
          <button
            type="button"
            role="option"
            aria-selected={lang === 'ar'}
            className={`lang-menu-item ${lang === 'ar' ? 'selected' : ''}`}
            onClick={() => selectLang('ar')}
          >
            <div className="lang-item-content">
              <SyriaFlag size={20} />
              <div className="lang-text-group">
                <span className="lang-native-name">العربية</span>
                <span className="lang-sub-name">سوريا (Syria)</span>
              </div>
            </div>
            {lang === 'ar' && <Check size={14} className="lang-check-icon" />}
          </button>

          <button
            type="button"
            role="option"
            aria-selected={lang === 'en'}
            className={`lang-menu-item ${lang === 'en' ? 'selected' : ''}`}
            onClick={() => selectLang('en')}
          >
            <div className="lang-item-content">
              <UKFlag size={20} />
              <div className="lang-text-group">
                <span className="lang-native-name">English</span>
                <span className="lang-sub-name">United Kingdom</span>
              </div>
            </div>
            {lang === 'en' && <Check size={14} className="lang-check-icon" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
