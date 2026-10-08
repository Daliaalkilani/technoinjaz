'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Trash2,
  ExternalLink,
  BookOpen,
  Sparkles,
  LogOut,
  FileText,
  Video,
  Play,
  MessageSquare,
  Heart,
  MailCheck,
  CalendarDays
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import { useSavedProjects } from '@/hooks/useSavedProjects';
import { apiRequest, apiErrorMessage, logout } from '@/lib/auth';
import { formatRelative, formatFullDate } from '@/lib/relativeTime';
import { Button } from '@/components/ui/Button';
import VideoPlayerModal from '@/features/videos/VideoPlayerModal';
import './UserProfilePage.css';

/**
 * Signed-in account page: identity card (from /api/auth/me), saved items (D1 via
 * /api/saved) and the user's own comments (/api/comments/mine).
 *
 * @param {{
 *   user: { id: number, name: string, email: string, emailVerified: boolean, createdAt: number },
 *   verifyNotice?: { type: 'success' | 'error', message: string } | null,
 *   onUserChange?: ((user: any) => void) | null,
 *   onBack?: (() => void) | null,
 *   onLogout?: (() => void) | null,
 *   onOpenReader?: ((project?: any) => void) | null,
 *   onExploreProjects?: (() => void) | null
 * }} props
 */
export default function UserProfilePage({ user, verifyNotice = null, onUserChange, onBack, onLogout, onOpenReader }) {
  const router = useRouter();
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const { savedProjects, removeSaved } = useSavedProjects();
  // Tabs: 'saved' | 'comments'; saved filter: 'all' | 'projects' | 'articles' | 'videos'
  const [tab, setTab] = useState('saved');
  const [filterType, setFilterType] = useState('all');
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [notice, setNotice] = useState(verifyNotice);
  const [resending, setResending] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [myComments, setMyComments] = useState(null);
  const [commentsError, setCommentsError] = useState(null);

  useEffect(() => setNotice(verifyNotice), [verifyNotice]);

  // Load the user's comments once (for the tab count and list).
  useEffect(() => {
    let cancelled = false;
    apiRequest('/api/comments/mine').then((res) => {
      if (cancelled) return;
      if (res.ok) setMyComments(res.comments);
      else {
        setMyComments([]);
        setCommentsError(apiErrorMessage(res.error, isEn));
      }
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBackNav = onBack || (() => router.push('/'));
  const handleReaderNav = onOpenReader || ((project) => router.push(project?.id ? `/projects/${project.id}` : '/projects'));

  const handleResendVerification = async () => {
    setResending(true);
    const res = await apiRequest('/api/auth/verify-email', { method: 'POST', body: { resend: true } });
    setResending(false);
    if (res.ok && res.alreadyVerified) {
      onUserChange?.({ ...user, emailVerified: true });
      return;
    }
    setNotice(
      !res.ok
        ? { type: 'error', message: apiErrorMessage(res.error, isEn) }
        : res.sent
          ? { type: 'success', message: isEn ? 'A new verification link has been sent to your email.' : 'أرسلنا رابط تأكيد جديداً إلى بريدك الإلكتروني.' }
          : { type: 'error', message: isEn ? 'We could not send the email right now. Please try again later or contact us.' : 'تعذّر إرسال الرسالة الآن، يرجى المحاولة لاحقاً أو التواصل معنا.' }
    );
  };

  const handleLogout = async (e) => {
    e?.preventDefault();
    if (loggingOut) return;
    setLoggingOut(true);
    await logout();
    if (onLogout) onLogout();
    else router.push('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isProjectType = (p) => !p.type || p.type === 'project' || p.type === 'academic' || p.type === 'live';
  const projectItems = savedProjects.filter(isProjectType);
  const articleItems = savedProjects.filter(p => p.type === 'article');
  const videoItems = savedProjects.filter(p => p.type === 'video');

  const filteredProjects = savedProjects.filter(p => {
    if (filterType === 'projects') return isProjectType(p);
    if (filterType === 'articles') return p.type === 'article';
    if (filterType === 'videos') return p.type === 'video';
    return true;
  });

  const joinedLabel = new Intl.DateTimeFormat(isEn ? 'en-GB' : 'ar-EG-u-nu-latn', { year: 'numeric', month: 'long' }).format(new Date(user.createdAt));

  /** Where clicking a saved card's title goes. */
  const savedHref = (item) => {
    if (item.type === 'article') return `/articles/${item.id}`;
    if (item.type === 'live' && item.url) return item.url;
    if (item.type === 'video') return null;
    return `/projects/${item.id}`;
  };

  return (
    <div className="user-profile-wrapper" dir={isEn ? 'ltr' : 'rtl'}>
      <div className="user-profile-container">
        {/* Top Back Navigation */}
        <div className="user-profile-back-nav">
          <button
            type="button"
            onClick={handleBackNav}
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
            <div className="user-avatar-wrap is-static" aria-hidden="true">
              <span className="user-avatar-initial">{user.name.charAt(0).toUpperCase()}</span>
            </div>

            <div className="user-info-meta">
              <div className="user-name-row">
                <h1>{user.name}</h1>
              </div>
              <p className="user-email" dir="ltr" style={{ textAlign: isEn ? 'left' : 'right' }}>{user.email}</p>

              <div className="user-status-badges">
                <span className="user-badge-item is-join" title={formatFullDate(user.createdAt, isEn)}>
                  <CalendarDays size={12} />
                  {isEn ? `Member since ${joinedLabel}` : `عضو منذ ${joinedLabel}`}
                </span>

                {user.emailVerified ? (
                  <span className="user-badge-item">
                    <MailCheck size={12} />
                    {isEn ? 'Email verified' : 'البريد مؤكَّد'}
                  </span>
                ) : (
                  <>
                    <span className="user-badge-item is-pending">
                      {isEn ? 'Email not verified yet' : 'البريد بانتظار التأكيد'}
                    </span>
                    <button
                      type="button"
                      className="avatar-action-btn upload"
                      onClick={handleResendVerification}
                      disabled={resending}
                    >
                      <MailCheck size={13} />
                      <span>
                        {resending
                          ? (isEn ? 'Sending…' : 'جارٍ الإرسال…')
                          : (isEn ? 'Resend verification link' : 'إعادة إرسال رابط التأكيد')}
                      </span>
                    </button>
                  </>
                )}
              </div>

              {notice && (
                <div className={`avatar-feedback-msg ${notice.type}`} role="status">
                  {notice.message}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs: saved items / my comments */}
        <div className="account-tabs" role="tablist" aria-label={isEn ? 'Account sections' : 'أقسام الحساب'}>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'saved'}
            className={`account-tab-btn ${tab === 'saved' ? 'active' : ''}`}
            onClick={() => setTab('saved')}
          >
            <BookmarkCheck size={16} />
            <span>{isEn ? 'Saved' : 'المحفوظات'}</span>
            <span className="account-tab-count">{savedProjects.length}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'comments'}
            className={`account-tab-btn ${tab === 'comments' ? 'active' : ''}`}
            onClick={() => setTab('comments')}
          >
            <MessageSquare size={16} />
            <span>{isEn ? 'My Comments' : 'تعليقاتي'}</span>
            <span className="account-tab-count">{myComments ? myComments.length : '…'}</span>
          </button>
        </div>

        {tab === 'saved' && (
          <>
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
                  <button
                    type="button"
                    className="btn-explore-live-projects"
                    onClick={() => router.push('/projects')}
                    title={isEn ? "Explore Live Projects" : "اكتشف المشاريع الحية"}
                  >
                    <Sparkles size={16} />
                    <span>{isEn ? "Explore Live Projects" : "اكتشف المشاريع الحية"}</span>
                  </button>

                  <button
                    type="button"
                    className="btn-explore-academic"
                    onClick={() => router.push('/projects')}
                    title={isEn ? "Explore Academic Catalog" : "استكشف الكتالوج الأكاديمي"}
                  >
                    <BookOpen size={16} />
                    <span>{isEn ? "Explore Academic Catalog" : "استكشف المشاريع الأكاديمية"}</span>
                  </button>

                  <button
                    type="button"
                    className="btn-explore-articles"
                    onClick={() => router.push('/articles')}
                    title={isEn ? "Explore Articles" : "استكشف المقالات"}
                  >
                    <FileText size={16} />
                    <span>{isEn ? "Explore Articles" : "استكشف المقالات"}</span>
                  </button>

                  <button
                    type="button"
                    className="btn-explore-videos"
                    onClick={() => router.push('/videos')}
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
                  const isArticle = project.type === 'article';
                  const isVideo = project.type === 'video';
                  const href = savedHref(project);
                  const external = href && /^https?:/.test(href);

                  return (
                    <div key={`${project.type}-${project.id}`} className="favorite-card">
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
                                  : (isEn ? "Project" : "مشروع")}
                              </>
                            )}
                          </span>
                        </div>

                        <h3 className="favorite-card-title">
                          {href ? (
                            external ? (
                              <a href={href} target="_blank" rel="noopener noreferrer">{pTitle}</a>
                            ) : (
                              <Link href={href}>{pTitle}</Link>
                            )
                          ) : (
                            <button
                              type="button"
                              onClick={() => setActiveVideoModal(project)}
                              style={{ all: 'unset', cursor: 'pointer' }}
                            >
                              {pTitle}
                            </button>
                          )}
                        </h3>
                        <p className="favorite-card-desc">{pDesc}</p>
                        <time className="favorite-saved-at" dateTime={new Date(project.savedAt).toISOString()} title={formatFullDate(project.savedAt, isEn)}>
                          {isEn ? 'Saved ' : 'حُفظ '}{formatRelative(project.savedAt, isEn)}
                        </time>
                      </div>

                      <div className="favorite-card-actions">
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          {/* Project Action */}
                          {(project.type === 'academic' || project.type === 'project') && (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleReaderNav(project)}
                              title={isEn ? "Open Project" : "فتح المشروع"}
                            >
                              <BookOpen size={14} style={{ [isEn ? 'marginRight' : 'marginLeft']: '6px' }} />
                              <span>{isEn ? "Open" : "فتح المشروع"}</span>
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
                              onClick={() => router.push(`/articles/${project.id}`)}
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
                          title={isEn ? "Remove from Saved" : "إزالة من المحفوظات"}
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
          </>
        )}

        {tab === 'comments' && (
          <>
            <div className="favorites-section-header">
              <div className="favorites-title-wrap">
                <MessageSquare size={26} color="var(--accent-cyan)" />
                <h2>{isEn ? 'My Comments' : 'تعليقاتي'}</h2>
              </div>
            </div>

            {myComments === null ? (
              <div className="account-loading-row">{isEn ? 'Loading…' : 'جارٍ التحميل…'}</div>
            ) : commentsError ? (
              <div className="account-loading-row">{commentsError}</div>
            ) : myComments.length === 0 ? (
              <div className="favorites-empty-state">
                <MessageSquare size={54} className="favorites-empty-icon" />
                <h3 className="favorites-empty-title">{isEn ? "You haven't commented yet" : 'لم تكتب أي تعليق بعد'}</h3>
                <p className="favorites-empty-desc">
                  {isEn
                    ? 'Join the technical discussion at the end of any article — your comments and replies will be listed here.'
                    : 'شارك في النقاش الهندسي أسفل أي مقال، وستظهر تعليقاتك وردودك هنا.'}
                </p>
                <div className="favorites-empty-actions">
                  <button type="button" className="btn-explore-articles" onClick={() => router.push('/articles')}>
                    <FileText size={16} />
                    <span>{isEn ? 'Browse Articles' : 'تصفّح المقالات'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="my-comments-list">
                {myComments.map((c) => (
                  <Link key={c.id} href={`/articles/${c.articleSlug}#comment-${c.id}`} className="my-comment-card">
                    <div className="my-comment-head">
                      <span className="my-comment-article">
                        <FileText size={14} />
                        {isEn ? c.articleTitleEn : c.articleTitle}
                      </span>
                      <span className="my-comment-meta">
                        {c.parentId && <span className="my-comment-reply-tag">{isEn ? 'Reply' : 'رد'}</span>}
                        <span>
                          <Heart size={12} /> {c.likeCount}
                        </span>
                        <time dateTime={new Date(c.createdAt).toISOString()} title={formatFullDate(c.createdAt, isEn)}>
                          {formatRelative(c.createdAt, isEn)}
                        </time>
                      </span>
                    </div>
                    <p className="my-comment-body">{c.body}</p>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}

        {/* Bottom Actions Bar - Sign Out */}
        <div className="user-profile-bottom-actions">
          <button
            type="button"
            onClick={handleLogout}
            className="user-logout-bottom-btn"
            disabled={loggingOut}
            title={isEn ? "Sign Out" : "تسجيل الخروج"}
          >
            <LogOut size={16} />
            <span>
              {loggingOut ? (isEn ? 'Signing out…' : 'جارٍ تسجيل الخروج…') : (isEn ? "Sign Out" : "تسجيل الخروج")}
            </span>
          </button>
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
