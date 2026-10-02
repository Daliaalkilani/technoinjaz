'use client';

import React from 'react';
import '@/components/ui/Skeleton.css';
import { SkLine, SkLines, SkFill, SkBox, SkText } from '@/components/ui/Sk';
import '@/features/about/AboutTeamSection.css';
import '@/features/about/TeamMomentsRing.css';

// Mirrors AboutTeamSection: header, the team-moments stage, the team showcase stage.
export default function AboutLoading() {
  return (
    <section className="about-team-section" aria-busy="true" aria-label="جاري تحميل صفحة من نحن...">
      <div className="about-header-container">
        <div className="about-header-title"><SkText words={3} /></div>
        <p className="about-header-subtitle"><SkText words={10} /></p>
      </div>
      <div className="team-moments-section-wrapper">
        <div className="team-moments-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
          <SkBox w="min(60vw, 520px)" h="min(60vw, 520px)" r="50%" />
        </div>
      </div>
      <div className="team-showcase-section-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
        <SkBox w="min(70vw, 560px)" h="min(70vw, 560px)" r="50%" />
      </div>
    </section>
  );
}
