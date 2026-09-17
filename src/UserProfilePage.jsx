import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Bookmark, 
  BookmarkCheck, 
  Trash2, 
  ExternalLink, 
  BookOpen, 
  User, 
  Sparkles, 
  CheckCircle2, 
  LogOut 
} from 'lucide-react';
import { useThemeLanguage } from './context/ThemeLanguageContext';
import { useSavedProjects } from './hooks/useSavedProjects';
import { Button } from './components/ui/button';
import './UserProfilePage.css';

export default function UserProfilePage({ onBack, onOpenReader, onExploreProjects }) {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const { savedProjects, removeSaved, clearAll } = useSavedProjects();
  const [filterType, setFilterType] = useState('all'); // 'all' | 'academic' | 'live'

  // Retrieve user info from localStorage if available
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('techno_user');
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error('Error reading techno_user:', e);
      }
    }
    return {
      name: isEn ? 'Eng. Techno User' : 'م. مهندس تكنو إنجاز',
      email: 'user@technoenjaz.com',
      joined: isEn ? 'Member since 2026' : 'عضو منذ 2026',
      status: isEn ? 'Verified Account' : 'حساب موثق'
    };
  });

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('techno_user');
    }
    setUser({
      name: isEn ? 'Guest User' : 'مستخدم زائر',
      email: 'guest@technoenjaz.com',
      joined: isEn ? 'Active Session' : 'جلسة نشطة',
      status: isEn ? 'Guest' : 'زائر'
    });
  };

  const filteredProjects = savedProjects.filter(p => {
    if (filterType === 'all') return true;
    return p.type === filterType;
  });

  return (
    <div className="user-profile-wrapper" dir={isEn ? 'ltr' : 'rtl'}>
      <div className="user-profile-container">
        {/* Top Back Navigation */}
        <div className="user-profile-back-nav">
          <button 
            type="button" 
            onClick={onBack} 
            className="user-profile-back-btn"
            title={isEn ? "Back to Home" : "العودة إلى الرئيسية"}
          >
            {isEn ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            <span>{isEn ? "Back to Home" : "العودة إلى الرئيسية"}</span>
          </button>
        </div>

        {/* User Profile Card */}
        <div className="user-profile-card">
          <div className="user-profile-identity">
            <div className="user-avatar-wrap">
              <User size={36} />
            </div>
            <div className="user-info-meta">
              <h1>{user.name}</h1>
              <p>{user.email}</p>
              <div className="user-status-badges">
                <span className="user-badge-item">
                  <CheckCircle2 size={13} />
                  <span>{user.status}</span>
                </span>
                <span className="user-badge-item" style={{ borderColor: 'rgba(0,210,255,0.3)', color: 'var(--accent-cyan)' }}>
                  <Sparkles size={13} />
                  <span>{user.joined}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="user-profile-stats">
            <div className="stat-box">
              <div className="stat-number">{savedProjects.length}</div>
              <div className="stat-label">
                {isEn ? "Saved Projects" : "المشاريع المحفوظة"}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="user-logout-btn"
              title={isEn ? "Sign Out" : "تسجيل الخروج"}
            >
              <LogOut size={14} style={{ [isEn ? 'marginRight' : 'marginLeft']: '6px' }} />
              <span>{isEn ? "Sign Out" : "تسجيل الخروج"}</span>
            </Button>
          </div>
        </div>

        {/* Favorites Header & Filters */}
        <div className="favorites-section-header">
          <div className="favorites-title-wrap">
            <BookmarkCheck size={26} color="var(--accent-cyan)" />
            <h2>
              {isEn ? "Saved & Favorite Projects" : "المشاريع المفضلة والمحفوظة"}
            </h2>
          </div>

          <div className="favorites-filter-pills">
            <button
              type="button"
              className={`filter-pill-btn ${filterType === 'all' ? 'active' : ''}`}
              onClick={() => setFilterType('all')}
            >
              {isEn ? "All" : "الكل"} ({savedProjects.length})
            </button>
            <button
              type="button"
              className={`filter-pill-btn ${filterType === 'academic' ? 'active' : ''}`}
              onClick={() => setFilterType('academic')}
            >
              {isEn ? "Academic" : "أكاديمية"} ({savedProjects.filter(p => p.type === 'academic').length})
            </button>
            <button
              type="button"
              className={`filter-pill-btn ${filterType === 'live' ? 'active' : ''}`}
              onClick={() => setFilterType('live')}
            >
              {isEn ? "Live" : "حية"} ({savedProjects.filter(p => p.type === 'live').length})
            </button>
          </div>
        </div>

        {/* Favorites List or Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="favorites-empty-state">
            <Bookmark size={54} className="favorites-empty-icon" />
            <h3 className="favorites-empty-title">
              {isEn ? "No Saved Projects Yet" : "قائمة المفضلة فارغة حالياً"}
            </h3>
            <p className="favorites-empty-desc">
              {isEn 
                ? "Browse projects in the catalog or live showcase and click 'Save Project' to bookmark them here for instant access."
                : "تصفح المشاريع في الكتالوج أو الاستعراض الحي واضغط على زر 'حفظ المشروع' ليتم حفظها هنا في صفحتك الشخصية للوصول إليها في أي وقت."}
            </p>
            <div className="favorites-empty-actions">
              <Button
                variant="default"
                size="default"
                onClick={() => {
                  onBack();
                  setTimeout(() => {
                    const el = document.getElementById('academic-projects');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }}
              >
                {isEn ? "Explore Academic Catalog" : "استكشف المشاريع الأكاديمية"}
              </Button>
              <Button
                variant="outline"
                size="default"
                onClick={() => {
                  onBack();
                  setTimeout(() => {
                    const el = document.getElementById('projects');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }}
              >
                {isEn ? "Explore Live Projects" : "استكشف المشاريع الحية"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="favorites-grid">
            {filteredProjects.map((project) => {
              const pTitle = isEn && project.titleEn ? project.titleEn : project.title;
              const pDesc = isEn && project.descriptionEn ? project.descriptionEn : project.description;

              return (
                <div key={project.id} className="favorite-card">
                  <div>
                    <div className="favorite-card-top">
                      <span className="favorite-cat-badge">
                        {project.categoryLabel || project.category}
                      </span>
                      <span className="favorite-type-badge">
                        {project.type === 'academic' 
                          ? (isEn ? "Academic Project" : "مشروع أكاديمي") 
                          : (isEn ? "Live Project" : "مشروع حي")}
                      </span>
                    </div>

                    <h3 className="favorite-card-title">{pTitle}</h3>
                    <p className="favorite-card-desc">{pDesc}</p>
                  </div>

                  <div className="favorite-card-actions">
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {project.type === 'academic' && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => onOpenReader && onOpenReader(project)}
                          title={isEn ? "Read Document" : "قراءة المستند"}
                        >
                          <BookOpen size={14} style={{ [isEn ? 'marginRight' : 'marginLeft']: '6px' }} />
                          <span>{isEn ? "Read" : "قراءة"}</span>
                        </Button>
                      )}

                      {project.type === 'live' && project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'none' }}
                        >
                          <Button variant="default" size="sm">
                            <span>{isEn ? "Launch" : "زيارة الموقع"}</span>
                            <ExternalLink size={13} style={{ [isEn ? 'marginLeft' : 'marginRight']: '6px' }} />
                          </Button>
                        </a>
                      )}
                    </div>

                    <button
                      type="button"
                      className="favorite-remove-btn"
                      onClick={() => removeSaved(project.id)}
                      title={isEn ? "Remove from Favorites" : "إزالة من المفضلة"}
                    >
                      <Trash2 size={13} />
                      <span>{isEn ? "Remove" : "إزالة"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
