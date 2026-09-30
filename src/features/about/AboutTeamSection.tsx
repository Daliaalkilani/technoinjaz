'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import { useLoader } from '@/context/LoaderContext';
import { teamMembers, teamCircleSlots } from '@/data/teamData';
import { Skiper19 } from '@/components/effects/SvgFollowScroll';
import SafeErrorBoundary from '@/components/effects/SafeErrorBoundary';

const Orb = dynamic(() => import('@/components/effects/Orb'), { ssr: false });
const InfiniteMenu = dynamic(() => import('@/components/effects/InfiniteMenu'), { ssr: false });
const TeamMomentsRing = dynamic(() => import('./TeamMomentsRing'), { ssr: false });
import './AboutTeamSection.css';

export interface AboutTeamSectionProps {
  headingLevel?: 'h1' | 'h2';
}

export function AboutTeamSection({ headingLevel = 'h2' }: AboutTeamSectionProps) {
  const { lang, theme, t } = useThemeLanguage();
  const { isLoaderDone } = useLoader();

  const localizedCircleSlots = teamCircleSlots.map((m: any) => ({
    ...m,
    name: lang === 'en' ? (m.nameEn || m.name) : m.name,
    title: lang === 'en' ? (m.titleEn || m.title || m.nameEn || m.name) : (m.title || m.name),
    role: lang === 'en' ? (m.roleEn || m.role) : m.role,
    description: lang === 'en' ? (m.descriptionEn || m.description) : m.description,
    department: lang === 'en' ? (m.departmentEn || m.department) : m.department,
    specialization: lang === 'en' ? (m.specializationEn || m.specialization) : m.specialization,
    bio: lang === 'en' ? (m.bioEn || m.bio) : m.bio,
    skills: lang === 'en' ? (m.skillsEn || m.skills) : m.skills,
    location: lang === 'en' ? (m.locationEn || m.location) : m.location,
    projects: lang === 'en' ? (m.projectsEn || m.projects) : m.projects,
  }));

  const HeadingTag = headingLevel;

  return (
    <section
      id="about"
      className="about-team-section scroll-deferred-section"
    >
      {/* Header for About Us Section */}
      <div
        className="about-header-container"
        style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}
      >
        <HeadingTag className="about-header-title">
          {t.about.heading}
        </HeadingTag>
        <p className="about-header-subtitle">
          {t.about.subtitle}
        </p>
      </div>

      {/* Team Moments Ring */}
      <div
        id="team-moments-section"
        className="team-moments-section-wrapper"
      >
        <TeamMomentsRing />

        {/* Bottom gradient fade - sleek height so front cards remain crisp and vibrant */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '110px',
            background: 'var(--about-fade-bottom)',
            pointerEvents: 'none',
            zIndex: 10
          }}
        />
      </div>

      {/* SVG Follow Scroll Transition */}
      <div
        id="svg-follow-scroll-transition"
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: 'var(--team-showcase-bg)',
          overflow: 'hidden',
          zIndex: 15
        }}
      >
        <Skiper19 strokeColor="#00d2ff" />
      </div>

      {/* 3D InfiniteMenu Team Showcase with Orb Background */}
      <div
        id="team-showcase"
        className="team-showcase-section-wrapper"
      >
        {/* Top smooth blending gradient */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '240px',
            background: 'var(--team-showcase-fade-top)',
            pointerEvents: 'none',
            zIndex: 20
          }}
        />

        {/* Space Orb Background (deferred until loader done) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none',
            overflow: 'hidden'
          }}
        >
          {isLoaderDone && (
            <SafeErrorBoundary>
              <Orb
                hoverIntensity={0.24}
                rotateOnHover
                hue={360}
                forceHoverState={false}
                backgroundColor={theme === 'light' ? '#f8fafc' : '#000000'}
              />
            </SafeErrorBoundary>
          )}
        </div>

        {/* SEO & Accessibility: crawlable team list */}
        <ul
          className="sr-only"
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: 0
          }}
        >
          {teamMembers.map(m => (
            <li key={m.id}>
              <span>{m.name} — {m.role} ({m.specialization}): {m.bio}</span>
            </li>
          ))}
        </ul>

        {/* 3D Circular Team Carousel */}
        <div style={{ position: 'relative', width: '100%', height: '100%', flex: 1, zIndex: 1 }}>
          <SafeErrorBoundary>
            <InfiniteMenu
              items={localizedCircleSlots as any}
              scale={1.4}
              backgroundColor="transparent"
            />
          </SafeErrorBoundary>
        </div>

        {/* Bottom smooth blending gradient to footer horizon */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '200px',
            background: 'var(--team-showcase-fade-bottom)',
            pointerEvents: 'none',
            zIndex: 20
          }}
        />
      </div>
    </section>
  );
}

export default AboutTeamSection;
