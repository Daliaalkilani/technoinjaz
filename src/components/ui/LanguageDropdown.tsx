import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import './LanguageDropdown.css';

interface LanguageDropdownProps {
  className?: string;
}

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
      >
        <Globe size={15} className="lang-globe-icon" />
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
              <span className="lang-flag" aria-hidden="true">🇸🇦</span>
              <div className="lang-text-group">
                <span className="lang-native-name">العربية</span>
                <span className="lang-sub-name">Arabic</span>
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
              <span className="lang-flag" aria-hidden="true">🇬🇧</span>
              <div className="lang-text-group">
                <span className="lang-native-name">English</span>
                <span className="lang-sub-name">الإنجليزية</span>
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
