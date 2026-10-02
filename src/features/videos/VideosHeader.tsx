'use client';

import React from 'react';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';

// Visually hidden: the /videos page is an immersive reels feed, but it keeps a
// single <h1> + description for SEO and screen readers.
export function VideosHeader() {
  const { lang, t } = useThemeLanguage();
  const isEn = lang === 'en';

  return (
    <div className="sr-only">
      <h1 className="tab-page-title reels-page-title">
        {isEn ? t.videos?.pageTitle || "Engineering Reels & Live Demos" : t.videos?.pageTitle || "المشاريع الحية ومقاطع الفيديو"}
      </h1>
      <p className="tab-page-subtitle reels-page-subtitle">
        {isEn ? t.videos?.pageSubtitle || "Explore live engineering platforms, embedded systems in action, and interactive prototypes." : t.videos?.pageSubtitle || "استعراض عملي وتفاعلي للمنظومات البرمجية والمشاريع الهندسية المنجزة."}
      </p>
    </div>
  );
}

export default VideosHeader;
