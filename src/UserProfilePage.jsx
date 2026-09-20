import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Bookmark, 
  BookmarkCheck, 
  Trash2, 
  ExternalLink, 
  BookOpen, 
  User, 
  Camera,
  Sparkles, 
  LogOut,
  FileText,
  Video,
  Play 
} from 'lucide-react';
import { useThemeLanguage } from './context/ThemeLanguageContext';
import { useSavedProjects } from './hooks/useSavedProjects';
import { Button } from './components/ui/button';
import VideoPlayerModal from './components/videos/VideoPlayerModal';
import './UserProfilePage.css';

export default function UserProfilePage({ onBack, onLogout, onOpenReader, onExploreProjects }) {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const { savedProjects, removeSaved, clearAll } = useSavedProjects();
  // Filter types: 'all' | 'projects' | 'articles' | 'videos'
  const [filterType, setFilterType] = useState('all');
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const fileInputRef = useRef(null);
  const [avatarFeedback, setAvatarFeedback] = useState(null);

  // Retrieve user info from localStorage if available
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const isLoggedOut = localStorage.getItem('techno_logged_out');
        if (isLoggedOut === 'true') return null;

        const stored = localStorage.getItem('techno_user');
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error('Error reading techno_user:', e);
      }
    }
    return null;
  });

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setAvatarFeedback({
        type: 'error',
        message: isEn ? 'Please select a valid image file.' : 'يرجى اختيار ملف صورة صالح.'
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setAvatarFeedback({
        type: 'error',
        message: isEn ? 'Image size must be less than 5MB.' : 'حجم الصورة يجب أن يكون أقل من 5 ميغابايت.'
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      const updatedUser = { ...(user || {}), avatar: dataUrl };
      setUser(updatedUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('techno_user', JSON.stringify(updatedUser));
        window.dispatchEvent(new CustomEvent('techno_auth_updated', { detail: updatedUser }));
        window.dispatchEvent(new CustomEvent('storage'));
      }
      setAvatarFeedback({
        type: 'success',
        message: isEn ? 'Profile photo updated successfully!' : 'تم تحديث الصورة الشخصية بنجاح!'
      });
      setTimeout(() => setAvatarFeedback(null), 3000);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleAvatarDelete = () => {
    if (!user?.avatar) return;
    const { avatar, ...restUser } = user;
    setUser(restUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('techno_user', JSON.stringify(restUser));
      window.dispatchEvent(new CustomEvent('techno_auth_updated', { detail: restUser }));
      window.dispatchEvent(new CustomEvent('storage'));
    }
    setAvatarFeedback({
      type: 'success',
      message: isEn ? 'Profile photo removed successfully.' : 'تم حذف الصورة الشخصية بنجاح.'
    });
    setTimeout(() => setAvatarFeedback(null), 3000);
  };

  const handleLogout = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      localStorage.removeItem('techno_user');
      localStorage.removeItem('techno_pending_save');
      localStorage.setItem('techno_logged_out', 'true');
      sessionStorage.removeItem('techno_user');
    } catch (err) {
      console.error('Error during logout:', err);
    }
    setUser(null);
    window.dispatchEvent(new CustomEvent('techno_auth_updated', { detail: null }));
    window.dispatchEvent(new CustomEvent('storage'));

    if (onLogout) {
      onLogout();
    } else if (onBack) {
      onBack();
    }

    try {
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', window.location.pathname);
      }
    } catch (err) {}
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  if (!user) {
    return (
      <div className="user-profile-wrapper" dir={isEn ? 'ltr' : 'rtl'}>
        <div className="user-profile-container">
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

          <div
            className="user-profile-empty-card"
            style={{
              textAlign: 'center',
              padding: '60px 24px',
              background: 'linear-gradient(165deg, rgba(14, 23, 42, 0.7) 0%, rgba(3, 7, 18, 0.9) 100%)',
              borderRadius: '24px',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              margin: '30px auto',
              maxWidth: '520px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(14, 165, 233, 0.12)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                color: 'var(--accent-cyan, #38bdf8)'
              }}
            >
              <User size={30} />
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '10px', color: '#ffffff' }}>
              {isEn ? 'Authentication Required' : 'تسجيل الدخول مطلوب'}
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '24px' }}>
              {isEn 
                ? 'You must be logged in to view your profile and saved projects, articles, and videos.' 
                : 'يجب تسجيل الدخول للوصول إلى ملفك الشخصي ومحفوظاتك من المشاريع والمقالات والفيديوهات.'}
            </p>
            <button
              type="button"
              onClick={() => {
                if (onBack) onBack();
                window.location.hash = '#login';
              }}
              className="btn-explore-live"
              style={{
                padding: '10px 28px',
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                margin: '0 auto',
                cursor: 'pointer'
              }}
            >
              <User size={16} />
              <span>{isEn ? 'Sign In Now' : 'تسجيل الدخول الآن'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            {/* Hidden File Input for Avatar Upload */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleAvatarUpload}
            />

            {/* Avatar with click & hover change overlay */}
            <div
              className="user-avatar-wrap"
              onClick={() => {
                if (user) {
                  fileInputRef.current?.click();
                } else {
                  if (onBack) onBack();
                  window.location.hash = '#login';
                }
              }}
              title={user?.avatar ? (isEn ? "Click to change photo" : "انقر لتغيير الصورة") : user ? (isEn ? "Click to add photo" : "انقر لإضافة صورة شخصية") : (isEn ? "Sign In" : "تسجيل الدخول")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  if (user) fileInputRef.current?.click();
                }
              }}
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user?.name || "User Avatar"}
                  className="user-avatar-img"
                />
              ) : (
                <User size={38} />
              )}
              {user && (
                <div className="user-avatar-hover-overlay">
                  <Camera size={20} />
                  <span style={{ fontSize: '10px', marginTop: '3px', fontWeight: 700 }}>
                    {user?.avatar ? (isEn ? "Edit" : "تعديل") : (isEn ? "Add" : "إضافة")}
                  </span>
                </div>
              )}
            </div>

            <div className="user-info-meta">
              <div className="user-name-row">
                <h2>{user ? user.name : (isEn ? "Guest User" : "مستخدم زائر")}</h2>
              </div>
              <p className="user-email">
                {user ? user.email : (isEn ? "Explore and save projects & articles" : "تصفح واحفظ مشاريعك ومقالاتك المفضلة")}
              </p>

              <div className="user-status-badges">
                <span className="user-badge-item">
                  {user ? user.joined : (isEn ? "Guest Session" : "جلسة زائر")}
                </span>

                {user ? (
                  <>
                    {/* Add / Change Photo Button */}
                    <button
                      type="button"
                      className="avatar-action-btn upload"
                      onClick={() => fileInputRef.current?.click()}
                      title={user?.avatar ? (isEn ? "Change photo" : "تغيير الصورة الشخصية") : (isEn ? "Add photo" : "إضافة صورة شخصية")}
                    >
                      <Camera size={13} />
                      <span>{user?.avatar ? (isEn ? "Change Photo" : "تغيير الصورة") : (isEn ? "Add Photo" : "إضافة صورة")}</span>
                    </button>

                    {/* Delete Photo Button (only when photo exists) */}
                    {user?.avatar && (
                      <button
                        type="button"
                        className="avatar-action-btn delete"
                        onClick={handleAvatarDelete}
                        title={isEn ? "Delete photo" : "حذف الصورة الشخصية"}
                      >
                        <Trash2 size={13} />
                        <span>{isEn ? "Delete Photo" : "حذف الصورة"}</span>
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    type="button"
                    className="avatar-action-btn upload"
                    onClick={() => {
                      if (onBack) onBack();
                      window.location.hash = '#login';
                    }}
                    title={isEn ? "Sign In / Register" : "تسجيل الدخول / إنشاء حساب"}
                  >
                    <User size={13} />
                    <span>{isEn ? "Sign In" : "تسجيل الدخول"}</span>
                  </button>
                )}
              </div>

              {/* Feedback Alert Toast */}
              {avatarFeedback && (
                <div className={`avatar-feedback-msg ${avatarFeedback.type}`}>
                  {avatarFeedback.message}
                </div>
              )}
            </div>
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
                          onClick={() => setActiveVideoModal(project)}
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

        {/* Bottom Actions Bar - Sign Out / Sign In */}
        <div className="user-profile-bottom-actions">
          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="user-logout-bottom-btn"
              title={isEn ? "Sign Out" : "تسجيل الخروج"}
            >
              <LogOut size={16} />
              <span>{isEn ? "Sign Out" : "تسجيل الخروج"}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (onBack) onBack();
                window.location.hash = '#login';
              }}
              className="user-login-bottom-btn"
              title={isEn ? "Sign In" : "تسجيل الدخول"}
            >
              <LogOut size={16} style={{ transform: 'rotate(180deg)' }} />
              <span>{isEn ? "Sign In to Your Account" : "تسجيل الدخول إلى حسابك"}</span>
            </button>
          )}
        </div>
      </div>

      {/* In-page Video Player Modal for Saved Videos */}
      <VideoPlayerModal
        isOpen={Boolean(activeVideoModal)}
        onClose={() => setActiveVideoModal(null)}
        video={activeVideoModal}
      />
    </div>
  );
}
