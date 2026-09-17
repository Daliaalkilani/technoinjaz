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
  LogOut,
  FileText,
  Video,
  Play 
} from 'lucide-react';
import { useThemeLanguage } from './context/ThemeLanguageContext';
import { useSavedProjects } from './hooks/useSavedProjects';
import { Button } from './components/ui/button';
import './UserProfilePage.css';

export default function UserProfilePage({ onBack, onLogout, onOpenReader, onExploreProjects }) {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const { savedProjects, removeSaved, clearAll } = useSavedProjects();
  // Filter types: 'all' | 'projects' | 'articles' | 'videos'
  const [filterType, setFilterType] = useState('all');

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
      localStorage.removeItem('techno_pending_save');
      window.dispatchEvent(new CustomEvent('techno_auth_updated', { detail: null }));
      window.dispatchEvent(new CustomEvent('storage'));
    }
    setUser(null);
    if (onLogout) {
      onLogout();
    } else if (onBack) {
      onBack();
    }
    if (typeof window !== 'undefined') {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Group items by projects, articles, videos
  const projectItems = savedProjects.filter(
    p => !p.type || p.type === 'project' || p.type === 'academic' || p.type === 'live'
  );
  const articleItems = savedProjects.filter(p => p.type === 'article');
  const videoItems = savedProjects.filter(p => p.type === 'video');

  const filteredProjects = savedProjects.filter(p => {
    if (filterType === 'all') return true;
    if (filterType === 'projects') {
      return !p.type || p.type === 'project' || p.type === 'academic' || p.type === 'live';
    }
    if (filterType === 'articles') return p.type === 'article';
    if (filterType === 'videos') return p.type === 'video';
    return true;
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
              <div className="user-name-row">
                <h2>{user.name}</h2>
                <span className="user-verified-badge" title={user.status}>
                  <CheckCircle2 size={13} />
                  <span>{user.status}</span>
                </span>
              </div>
              <p className="user-email">{user.email}</p>
              <div className="user-status-badges">
                <span className="user-badge-item">{user.joined}</span>
              </div>
            </div>
          </div>

          <div className="user-profile-stats">
            <div className="stat-box">
              <div className="stat-number">{savedProjects.length}</div>
              <div className="stat-label">
                {isEn ? "Saved Items" : "إجمالي المحفوظات"}
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="user-logout-btn"
              title={isEn ? "Sign Out" : "تسجيل الخروج"}
            >
              <LogOut size={15} style={{ [isEn ? 'marginRight' : 'marginLeft']: '6px' }} />
              <span>{isEn ? "Sign Out" : "تسجيل الخروج"}</span>
            </button>
          </div>
        </div>

        {/* Favorites Header & Filters */}
        <div className="favorites-section-header">
          <div className="favorites-title-wrap">
            <BookmarkCheck size={26} color="var(--accent-cyan)" />
            <h2>
              {isEn ? "Saved Library" : "المكتبة والمحفوظات"}
            </h2>
          </div>

          {/* Separate Filters: Projects, Articles, Videos */}
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
              className={`filter-pill-btn ${filterType === 'projects' ? 'active' : ''}`}
              onClick={() => setFilterType('projects')}
            >
              <Sparkles size={13} style={{ display: 'inline', verticalAlign: 'middle', [isEn ? 'marginRight' : 'marginLeft']: '4px' }} />
              {isEn ? "Projects" : "مشاريع"} ({projectItems.length})
            </button>
            <button
              type="button"
              className={`filter-pill-btn ${filterType === 'articles' ? 'active' : ''}`}
              onClick={() => setFilterType('articles')}
            >
              <FileText size={13} style={{ display: 'inline', verticalAlign: 'middle', [isEn ? 'marginRight' : 'marginLeft']: '4px' }} />
              {isEn ? "Articles" : "مقالات"} ({articleItems.length})
            </button>
            <button
              type="button"
              className={`filter-pill-btn ${filterType === 'videos' ? 'active' : ''}`}
              onClick={() => setFilterType('videos')}
            >
              <Video size={13} style={{ display: 'inline', verticalAlign: 'middle', [isEn ? 'marginRight' : 'marginLeft']: '4px' }} />
              {isEn ? "Videos" : "فيديوهات"} ({videoItems.length})
            </button>
          </div>
        </div>

        {/* Favorites List or Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="favorites-empty-state">
            <Bookmark size={54} className="favorites-empty-icon" />
            <h3 className="favorites-empty-title">
              {filterType === 'all' 
                ? (isEn ? "No Saved Items Yet" : "قائمة المفضلة فارغة حالياً")
                : filterType === 'projects'
                ? (isEn ? "No Saved Projects Yet" : "لا توجد مشاريع محفوظة حالياً")
                : filterType === 'articles'
                ? (isEn ? "No Saved Articles Yet" : "لا توجد مقالات محفوظة حالياً")
                : (isEn ? "No Saved Videos Yet" : "لا توجد فيديوهات محفوظة حالياً")}
            </h3>
            <p className="favorites-empty-desc">
              {isEn 
                ? "Explore live projects, academic studies, articles, and videos across Techno Enjaz, and bookmark your favorites for quick access anytime."
                : "تصفح المشاريع الحية، الكتالوج الأكاديمي، المقالات العلمية، والفيديوهات عبر تكنو إنجاز واحفظ ما يهمك هنا للرجوع إليه في أي وقت."}
            </p>

            <div className="favorites-empty-actions">
              {/* Distinctively styled Explore Live Projects button */}
              <button
                type="button"
                className="btn-explore-live-projects"
                onClick={() => {
                  onBack();
                  setTimeout(() => {
                    const el = document.getElementById('projects');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }}
                title={isEn ? "Explore Live Projects" : "اكتشف المشاريع الحية"}
              >
                <Sparkles size={16} />
                <span>{isEn ? "Explore Live Projects" : "اكتشف المشاريع الحية"}</span>
              </button>

              <button
                type="button"
                className="btn-explore-academic"
                onClick={() => {
                  onBack();
                  setTimeout(() => {
                    const el = document.getElementById('academic-projects');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }}
                title={isEn ? "Explore Academic Catalog" : "استكشف الكتالوج الأكاديمي"}
              >
                <BookOpen size={16} />
                <span>{isEn ? "Explore Academic Catalog" : "استكشف المشاريع الأكاديمية"}</span>
              </button>

              <button
                type="button"
                className="btn-explore-articles"
                onClick={() => {
                  onBack();
                  setTimeout(() => {
                    const el = document.getElementById('articles');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }}
                title={isEn ? "Explore Articles" : "استكشف المقالات"}
              >
                <FileText size={16} />
                <span>{isEn ? "Explore Articles" : "استكشف المقالات"}</span>
              </button>

              <button
                type="button"
                className="btn-explore-videos"
                onClick={() => {
                  onBack();
                  setTimeout(() => {
                    const el = document.getElementById('videos');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }}
                title={isEn ? "Explore Videos" : "استكشف الفيديوهات"}
              >
                <Video size={16} />
                <span>{isEn ? "Explore Videos" : "استكشف الفيديوهات"}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="favorites-grid">
            {filteredProjects.map((project) => {
              const pTitle = isEn && project.titleEn ? project.titleEn : project.title;
              const pDesc = isEn && project.descriptionEn ? project.descriptionEn : project.description;
              const isProject = !project.type || project.type === 'project' || project.type === 'academic' || project.type === 'live';
              const isArticle = project.type === 'article';
              const isVideo = project.type === 'video';

              return (
                <div key={project.id} className="favorite-card">
                  <div>
                    <div className="favorite-card-top">
                      <span className="favorite-cat-badge">
                        {project.categoryLabel || project.category}
                      </span>
                      <span className="favorite-type-badge">
                        {isVideo ? (
                          <>
                            <Video size={11} style={{ display: 'inline', [isEn ? 'marginRight' : 'marginLeft']: '4px' }} />
                            {isEn ? "Video" : "فيديو"}
                          </>
                        ) : isArticle ? (
                          <>
                            <FileText size={11} style={{ display: 'inline', [isEn ? 'marginRight' : 'marginLeft']: '4px' }} />
                            {isEn ? "Article" : "مقال"}
                          </>
                        ) : (
                          <>
                            <Sparkles size={11} style={{ display: 'inline', [isEn ? 'marginRight' : 'marginLeft']: '4px' }} />
                            {project.type === 'live' 
                              ? (isEn ? "Live Project" : "مشروع حي") 
                              : (isEn ? "Academic Project" : "مشروع أكاديمي")}
                          </>
                        )}
                      </span>
                    </div>

                    <h3 className="favorite-card-title">{pTitle}</h3>
                    <p className="favorite-card-desc">{pDesc}</p>
                  </div>

                  <div className="favorite-card-actions">
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {/* Academic Project Action */}
                      {project.type === 'academic' && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => onOpenReader && onOpenReader(project)}
                          title={isEn ? "Read Document" : "قراءة المستند"}
                        >
                          <BookOpen size={14} style={{ [isEn ? 'marginRight' : 'marginLeft']: '6px' }} />
                          <span>{isEn ? "Read" : "قراءة المستند"}</span>
                        </Button>
                      )}

                      {/* Live Project Action */}
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

                      {/* Article Action */}
                      {isArticle && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => {
                            onBack();
                            setTimeout(() => {
                              const el = document.getElementById('articles');
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }, 150);
                          }}
                        >
                          <FileText size={14} style={{ [isEn ? 'marginRight' : 'marginLeft']: '6px' }} />
                          <span>{isEn ? "Read Article" : "قراءة المقال"}</span>
                        </Button>
                      )}

                      {/* Video Action */}
                      {isVideo && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => {
                            onBack();
                            setTimeout(() => {
                              const el = document.getElementById('videos');
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }, 150);
                          }}
                        >
                          <Play size={14} style={{ [isEn ? 'marginRight' : 'marginLeft']: '6px' }} />
                          <span>{isEn ? "Watch Video" : "مشاهدة الفيديو"}</span>
                        </Button>
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
