import React from 'react';
import SocialButtons from './components/SocialButtons';
import './ProfilePage.css';


/**
 * مكون الملف التعريفي لعضو الفريق
 * يمكنك تخصيص هذا الملف وبناء الأقسام التي تريدها لكل عضو لاحقاً
 */
export default function ProfilePage({ member, onBack }) {
  if (!member) return null;

  return (
    <div className="profile-wrapper">
      {/* خلفية جمالية متدرجة */}
      <div className="profile-ambient-glow" />

      <div className="profile-container">
        {/* زر العودة إلى القائمة الدائرية */}
        <header className="profile-top-bar">
          <button onClick={onBack} className="back-btn" title="العودة إلى الفريق">
            <span className="back-arrow">&larr;</span>
            <span>العودة إلى الفريق</span>
          </button>
          <div className="profile-tag">ملف تعريفي</div>
        </header>

        {/* بطاقة الرأس: الصورة، الاسم، المسمى الوظيفي */}
        <section className="profile-hero-card">
          <div className="profile-avatar-wrapper">
            <img
              src={member.image}
              alt={member.name}
              className="profile-avatar"
            />
            <span className="status-dot" title="متاح" />
          </div>

          <div className="profile-hero-info">
            <span className="profile-dept-badge">{member.department || 'فريق التقنية'}</span>
            <h1 className="profile-name">{member.name}</h1>
            <div className="profile-role-pill">{member.role}</div>
            {member.socials && (
              <SocialButtons socials={member.socials} size="large" />
            )}
            <p className="profile-location">📍 {member.location || 'المقر الرئيسي'}</p>
          </div>
        </section>

        {/* جسم الملف التعريفي */}
        <div className="profile-grid">
          {/* قسم النبذة */}
          <article className="profile-card">
            <h2 className="section-title">نبذة تعريفية</h2>
            <p className="profile-bio-text">{member.bio}</p>
          </article>

          {/* قسم المهارات */}
          {member.skills && member.skills.length > 0 && (
            <article className="profile-card">
              <h2 className="section-title">المهارات والتقنيات الأساسية</h2>
              <div className="skills-cloud">
                {member.skills.map((skill, index) => (
                  <span key={index} className="skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          )}

          {/* قسم المشاريع والإنجازات */}
          {member.projects && member.projects.length > 0 && (
            <article className="profile-card full-width">
              <h2 className="section-title">المشاريع البارزة</h2>
              <div className="projects-grid">
                {member.projects.map((proj, idx) => (
                  <div key={idx} className="project-item">
                    <h3 className="project-title">{proj.name}</h3>
                    <p className="project-desc">{proj.desc}</p>
                  </div>
                ))}
              </div>
            </article>
          )}

          {/* قسم مخصص للمطور لإضافة تفاصيل لاحقاً */}
          <article className="profile-card full-width future-build-card">
            <div className="placeholder-banner">
              <div className="placeholder-icon">🛠️</div>
              <div>
                <h3 className="placeholder-title">مساحة مخصصة لإضافاتك المستقبلية</h3>
                <p className="placeholder-text">
                  هذا القسم جاهز لتضع فيه شهادات، إحصائيات، معرض أعمال (Portfolio)، أو أي تفاصيل إضافية خاصة بـ {member.name}.
                </p>
              </div>
            </div>
          </article>
        </div>

        {/* زر سفلي للتواصل أو العودة */}
        <footer className="profile-footer">
          <a href={`mailto:${member.email}`} className="contact-btn">
            ✉️ تواصل عبر البريد: {member.email}
          </a>
          <button onClick={onBack} className="secondary-back-btn">
            الرجوع إلى القائمة الدائرية
          </button>
        </footer>
      </div>
    </div>
  );
}
