import React from 'react';
import SocialButtons from './components/SocialButtons';
import { useThemeLanguage } from './context/ThemeLanguageContext';
import './ProfilePage.css';

/**
 * Team Member Profile Page Component
 * Fully bilingual with dark/light theme integration
 */
export default function ProfilePage({ member, onBack }) {
  if (!member) return null;

  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';

  const memberName = isEn ? (member.nameEn || member.name) : member.name;
  const memberRole = isEn ? (member.roleEn || member.role) : member.role;
  const memberDept = isEn ? (member.departmentEn || member.department || 'Tech Team') : (member.department || 'فريق التقنية');
  const memberBio = isEn ? (member.bioEn || member.bio) : member.bio;
  const memberSkills = isEn ? (member.skillsEn || member.skills || []) : (member.skills || []);
  const memberProjects = isEn ? (member.projectsEn || member.projects || []) : (member.projects || []);
  const memberLocation = isEn ? (member.locationEn || member.location || 'Headquarters') : (member.location || 'المقر الرئيسي');

  return (
    <div className="profile-wrapper" dir={isEn ? 'ltr' : 'rtl'}>
      {/* Ambient background glow */}
      <div className="profile-ambient-glow" />

      <div className="profile-container">
        {/* Top return bar */}
        <header className="profile-top-bar">
          <button onClick={onBack} className="back-btn" title={isEn ? 'Back to Team' : 'العودة إلى الفريق'}>
            <span className="back-arrow">{isEn ? '←' : '→'}</span>
            <span>{isEn ? 'Back to Team' : 'العودة إلى الفريق'}</span>
          </button>
          <div className="profile-tag">{isEn ? 'Profile' : 'ملف تعريفي'}</div>
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
            <span className="profile-dept-badge">{memberDept}</span>
            <h1 className="profile-name">{memberName}</h1>
            <div className="profile-role-pill">{memberRole}</div>
            {member.socials && (
              <SocialButtons socials={member.socials} size="large" />
            )}
            <p className="profile-location">📍 {memberLocation}</p>
          </div>
        </section>

        {/* Profile Body Grid */}
        <div className="profile-grid">
          {/* Bio Section */}
          <article className="profile-card">
            <h2 className="section-title">{isEn ? 'About & Biography' : 'نبذة تعريفية'}</h2>
            <p className="profile-bio-text">{memberBio}</p>
          </article>

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
              <h2 className="section-title">{isEn ? 'Key Projects & Milestones' : 'المشاريع البارزة'}</h2>
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

          {/* Dedicated Future Enhancements Section */}
          <article className="profile-card full-width future-build-card">
            <div className="placeholder-banner">
              <div className="placeholder-icon">🛠️</div>
              <div>
                <h3 className="placeholder-title">{isEn ? 'Dedicated Space for Future Highlights' : 'مساحة مخصصة لإضافاتك المستقبلية'}</h3>
                <p className="placeholder-text">
                  {isEn
                    ? `This section is designated for certifications, technical credentials, and portfolio media for ${memberName}.`
                    : `هذا القسم جاهز لتضع فيه شهادات، إحصائيات، معرض أعمال (Portfolio)، أو أي تفاصيل إضافية خاصة بـ ${memberName}.`}
                </p>
              </div>
            </div>
          </article>
        </div>

        {/* Profile Footer */}
        <footer className="profile-footer">
          <a href={`mailto:${member.email}`} className="contact-btn">
            ✉️ {isEn ? 'Contact via Email' : 'تواصل عبر البريد'}: {member.email}
          </a>
          <button onClick={onBack} className="secondary-back-btn">
            {isEn ? 'Back to Team Carousel' : 'الرجوع إلى القائمة الدائرية'}
          </button>
        </footer>
      </div>
    </div>
  );
}
