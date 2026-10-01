'use client';

import React from 'react';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';

export function ProjectsHeader() {
  const { lang, t } = useThemeLanguage();
  const isEn = lang === 'en';

  return (
    <div className="tab-page-header projects-page-header">
      <h1 className="tab-page-title projects-page-title">
        {isEn ? (t.liveProjects?.pageTitle || "Live Systems & Engineering Projects") : (t.liveProjects?.pageTitle || "مشاريع ومنظومات تكنو إنجاز")}
      </h1>
      <p className="tab-page-subtitle projects-page-subtitle">
        {isEn 
          ? (t.liveProjects?.pageSubtitle || "Explore live software and engineering systems running now and available for direct interactive demo.") 
          : (t.liveProjects?.pageSubtitle || "استكشف مشاريع برمجية ومنظومات هندسية تعمل الآن ومتاحة للتجربة الحية والمباشرة.")}
      </p>
    </div>
  );
}

export default ProjectsHeader;
