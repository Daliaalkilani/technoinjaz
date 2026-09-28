'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import { useLoader } from '@/context/LoaderContext';
import { teamMembers } from '@/data/teamData';
import { Skiper19 } from '@/components/ui/svg-follow-scroll';

const Orb = dynamic(() => import('@/Orb'), { ssr: false });
const InfiniteMenu = dynamic(() => import('@/InfiniteMenu'), { ssr: false });
const TeamMomentsRing = dynamic(() => import('@/components/TeamMomentsRing'), { ssr: false });

export interface AboutTeamSectionProps {
  headingLevel?: 'h1' | 'h2';
}

export function AboutTeamSection({ headingLevel = 'h2' }: AboutTeamSectionProps) {
  const { lang, theme, t } = useThemeLanguage();
  const { isLoaderDone } = useLoader();
  const router = useRouter();

  const localizedTeamMembers = teamMembers.map((m: any) => ({
    ...m,
    name: lang === 'en' ? (m.nameEn || m.name) : m.name,
    title: lang === 'en' ? (m.titleEn || m.title || m.nameEn || m.name) : (m.title || m.name),
    role: lang === 'en' ? (m.roleEn || m.role) : m.role,
    description: lang === 'en' ? (m.descriptionEn || m.description) : m.description,
    department: lang === 'en' ? (m.departmentEn || m.department) : m.department,
    bio: lang === 'en' ? (m.bioEn || m.bio) : m.bio,
    skills: lang === 'en' ? (m.skillsEn || m.skills) : m.skills,
    location: lang === 'en' ? (m.locationEn || m.location) : m.location,
    projects: lang === 'en' ? (m.projectsEn || m.projects) : m.projects,
  }));

  const scrollToTeam = () => {
    const el = document.getElementById('team-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectMember = (member: any) => {
    if (member?.id) {
      router.push('/team/' + member.id);
    }
  };

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
        <TeamMomentsRing onScrollDown={scrollToTeam} />

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
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          minHeight: '700px',
          backgroundColor: 'var(--team-showcase-bg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
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
            <Orb
              hoverIntensity={0.24}
              rotateOnHover
              hue={360}
              forceHoverState={false}
              backgroundColor={theme === 'light' ? '#f8fafc' : '#000000'}
            />
          )}
        </div>

        {/* Members Count Badge */}
        <header
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 30,
            padding: '24px 36px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            pointerEvents: 'none',
            direction: lang === 'ar' ? 'rtl' : 'ltr'
          }}
        >
          <div
            style={{
              padding: '6px 14px',
              background: 'var(--members-badge-bg)',
              border: 'var(--members-badge-border)',
              borderRadius: '999px',
              color: '#c4b5fd',
              fontSize: '12px',
              fontWeight: 600,
              backdropFilter: 'blur(10px)'
            }}
          >
            {teamMembers.length} {lang === 'ar' ? 'أعضاء متاحين' : 'Available Members'}
          </div>
        </header>

        {/* SEO & Accessibility: crawlable team list */}
        <ul className="sr-only">
          {teamMembers.map(m => (
            <li key={m.id}>
              <Link href={'/team/' + m.id}>{m.name} — {m.role}</Link>
            </li>
          ))}
        </ul>

        {/* 3D Circular Team Carousel */}
        <div style={{ position: 'relative', width: '100%', height: '100%', flex: 1, zIndex: 1 }}>
          <InfiniteMenu
            items={localizedTeamMembers as any}
            scale={1.4}
            backgroundColor="transparent"
            onSelectMember={handleSelectMember}
          />
        </div>
      </div>
    </section>
  );
}

export default AboutTeamSection;
