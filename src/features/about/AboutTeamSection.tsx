'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import { useLoader } from '@/context/LoaderContext';
import { teamMembers, teamCircleSlots } from '@/data/teamData';
import { Skiper19 } from '@/components/effects/SvgFollowScroll';
import SafeErrorBoundary from '@/components/effects/SafeErrorBoundary';

const TeamFilmstrip = dynamic(() => import('@/components/effects/TeamFilmstrip'), { ssr: false });
const TeamMomentsRing = dynamic(() => import('./TeamMomentsRing'), { ssr: false });

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
      className="scroll-deferred-section"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: 'var(--about-bg)'
      }}
    >
      {/* Header for About Us Section */}
      <div
        style={{
          padding: '90px 24px 24px',
          textAlign: 'center',
          maxWidth: '850px',
          margin: '0 auto',
          direction: lang === 'ar' ? 'rtl' : 'ltr'
        }}
      >
        <HeadingTag
          style={{
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            fontWeight: 800,
            color: 'var(--text-main)',
            marginBottom: '14px',
            letterSpacing: '-0.02em',
            textShadow: '0 0 25px rgba(0, 210, 255, 0.2)'
          }}
        >
          {t.about.heading}
        </HeadingTag>
        <p
          style={{
            fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.7
          }}
        >
          {t.about.subtitle}
        </p>
      </div>

      {/* Team Moments Ring */}
      <div
        id="team-moments-section"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          minHeight: '700px',
          overflow: 'hidden',
          backgroundColor: 'var(--about-bg)'
        }}
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

      {/* 3D Team Showcase — Clean Seamless Dark Background */}
      <div
        id="team-showcase"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          minHeight: '680px',
          backgroundColor: 'var(--about-bg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >

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

        {/* 3D Glassmorphic Character Filmstrip */}
        <div style={{ position: 'relative', width: '100%', height: '100%', flex: 1, zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SafeErrorBoundary>
            <TeamFilmstrip members={localizedCircleSlots as any} />
          </SafeErrorBoundary>
        </div>
      </div>
    </section>
  );
}

export default AboutTeamSection;
