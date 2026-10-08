'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import SocialButtons from '@/components/ui/SocialButtons';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import './ProfilePage.css';

/**
 * Team Member Profile Page Component
 * Fully bilingual with dark/light theme integration
 */
/**
 * @param {{
 *   member: any,
 *   onBack?: (() => void) | null
 * }} props
 */
export default function ProfilePage({ member, onBack }) {
  const router = useRouter();
  const { lang } = useThemeLanguage();
  if (!member) return null;

  const handleBack = onBack || (() => router.push('/about#team-showcase'));
  const isEn = lang === 'en';

  const memberName = isEn ? (member.nameEn || member.name) : member.name;
  const memberRole = isEn ? (member.roleEn || member.role) : member.role;
  const memberDept = isEn ? (member.departmentEn || member.department || 'Tech Team') : (member.department || 'فريق التقنية');
  const memberBio = isEn ? (member.bioEn || member.bio) : member.bio;
  const memberSkills = isEn ? (member.skillsEn || member.skills || []) : (member.skills || []);
  const memberProjects = isEn ? (member.projectsEn || member.projects || []) : (member.projects || []);
  const memberLocation = isEn ? (member.locationEn || member.location || 'Headquarters') : (member.location || 'المقر الرئيسي');
  const memberQuote = isEn ? (member.quoteEn || member.quote) : member.quote;
  const memberVision = isEn ? (member.visionEn || member.vision) : member.vision;
  const memberMission = isEn ? (member.missionEn || member.mission) : member.mission;
  const memberGoals = isEn ? (member.goalsEn || member.goals) : member.goals;
  const memberEducation = member.education || [];
  const memberAwards = member.awards || [];
  const memberTrainings = member.trainings || [];

  const hasVisionMission = memberVision || memberMission || memberGoals;

  return (
    <div className="profile-wrapper" dir={isEn ? 'ltr' : 'rtl'}>
      {/* Ambient background glow */}
      <div className="profile-ambient-glow" />

      <div className="profile-container">
        {/* Top return bar */}
        <header className="profile-top-bar">
          <button onClick={handleBack} className="back-btn" title={isEn ? 'Back to Team' : 'العودة إلى الفريق'}>
            <span className="back-arrow">{isEn ? '←' : '→'}</span>
            <span>{isEn ? 'Back to Team' : 'العودة إلى الفريق'}</span>
          </button>
          <div className="profile-tag">{isEn ? 'Engineering Leadership' : 'ملف هندسي معتمد'}</div>
        </header>

        {/* Hero Card: Avatar, Name, Role */}
        <section className="profile-hero-card">
          <div className="profile-avatar-wrapper">
            <img
              src={member.image}
              alt={memberName}
              className="profile-avatar"
            />
            <span className="status-dot" title={isEn ? 'Available' : 'متاح'} />
          </div>

          <div className="profile-hero-info">
            <h1 className="profile-name">{memberName}</h1>
            <div className="profile-role-pill">{memberRole}</div>
            <span className="profile-dept-badge">{memberDept}</span>
            {member.socials && Object.keys(member.socials).length > 0 && (
              <SocialButtons socials={member.socials} size="large" />
            )}
            <p className="profile-location">📍 {memberLocation}</p>
          </div>
        </section>

        {/* Inspiring Personal Quote Banner */}
        {memberQuote && (
          <section className="profile-quote-card">
            <span className="quote-mark">“</span>
            <blockquote className="quote-text">{memberQuote}</blockquote>
            <span className="quote-author">— {memberName}</span>
          </section>
        )}

        {/* Vision, Mission, Goals */}
        {hasVisionMission && (
          <section className="profile-triplet-grid">
            {memberVision && (
              <div className="triplet-card vision-card">
                <div className="triplet-icon">🔭</div>
                <h2 className="triplet-title">{isEn ? 'My Vision' : 'رؤيتي'}</h2>
                <p className="triplet-desc">{memberVision}</p>
              </div>
            )}
            {memberMission && (
              <div className="triplet-card mission-card">
                <div className="triplet-icon">🚀</div>
                <h2 className="triplet-title">{isEn ? 'My Mission' : 'رسالتي'}</h2>
                <p className="triplet-desc">{memberMission}</p>
              </div>
            )}
            {memberGoals && (
              <div className="triplet-card goals-card">
                <div className="triplet-icon">🎯</div>
                <h2 className="triplet-title">{isEn ? 'My Goals' : 'الأهداف'}</h2>
                <p className="triplet-desc">{memberGoals}</p>
              </div>
            )}
          </section>
        )}

        {/* Profile Body Grid */}
        <div className="profile-grid">
          {/* Bio Section */}
          <article className="profile-card full-width">
            <h2 className="section-title">{isEn ? 'About & Background' : 'نبذة تعريفية شاملة'}</h2>
            <p className="profile-bio-text">{memberBio}</p>
          </article>

          {/* Academic Background */}
          {memberEducation.length > 0 && (
            <article className="profile-card">
              <h2 className="section-title">{isEn ? 'Academic Background' : 'المؤهلات والتعليم'}</h2>
              <div className="education-list">
                {memberEducation.map((edu, idx) => (
                  <div key={idx} className="education-item">
                    <div className="edu-icon">🎓</div>
                    <div className="edu-body">
                      <h3 className="edu-degree">{isEn ? edu.degreeEn : edu.degree}</h3>
                      <span className="edu-institution">{isEn ? edu.institutionEn : edu.institution}</span>
                      {(edu.honors || edu.honorsEn) && (
                        <span className="edu-honors">🏆 {isEn ? (edu.honorsEn || edu.honors) : edu.honors}</span>
                      )}
                      {(edu.status || edu.statusEn) && (
                        <span className="edu-status">⏳ {isEn ? (edu.statusEn || edu.status) : edu.status}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          )}

          {/* Awards & Distinctions */}
          {memberAwards.length > 0 && (
            <article className="profile-card">
              <h2 className="section-title">{isEn ? 'Honors & Distinctions' : 'الجوائز والتكريمات'}</h2>
              <div className="awards-list">
                {memberAwards.map((award, idx) => (
                  <div key={idx} className="award-item">
                    <span className="award-badge-icon">🏅</span>
                    <span className="award-title">{isEn ? award.titleEn : award.title}</span>
                  </div>
                ))}
              </div>
            </article>
          )}

          {/* Training Courses */}
          {memberTrainings.length > 0 && (
            <article className="profile-card full-width">
              <h2 className="section-title">{isEn ? 'Training & Technical Mentorship' : 'الدورات التدريبية والاستشارات التقنية'}</h2>
              <div className="trainings-grid">
                {memberTrainings.map((tr, idx) => (
                  <div key={idx} className="training-chip">
                    <span className="tr-dot" />
                    <span>{isEn ? tr.nameEn : tr.name}</span>
                  </div>
                ))}
              </div>
            </article>
          )}

          {/* Skills Section */}
          {memberSkills && memberSkills.length > 0 && (
            <article className="profile-card">
              <h2 className="section-title">{isEn ? 'Core Skills & Technologies' : 'المهارات والتقنيات الأساسية'}</h2>
              <div className="skills-cloud">
                {memberSkills.map((skill, index) => (
                  <span key={index} className="skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          )}

          {/* Key Projects Section */}
          {memberProjects && memberProjects.length > 0 && (
            <article className="profile-card full-width">
              <h2 className="section-title">{isEn ? 'Key Projects & Milestones' : 'المشاريع البارزة والإنجازات'}</h2>
              <div className="projects-grid">
                {memberProjects.map((proj, idx) => (
                  <div key={idx} className="project-item">
                    <h3 className="project-title">{proj.name}</h3>
                    <p className="project-desc">{proj.desc}</p>
                  </div>
                ))}
              </div>
            </article>
          )}
        </div>

        {/* Profile Footer */}
        <footer className="profile-footer">
          {member.email && (
            <a href={`mailto:${member.email}`} className="contact-btn">
              ✉️ {isEn ? 'Contact via Email' : 'تواصل عبر البريد'}: {member.email}
            </a>
          )}
          <button onClick={onBack} className="secondary-back-btn">
            {isEn ? 'Back to Team Carousel' : 'الرجوع إلى القائمة الدائرية'}
          </button>
        </footer>
      </div>
    </div>
  );
}
