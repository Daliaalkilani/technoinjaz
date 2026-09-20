import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Heart, 
  MessageSquare, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  CheckCircle2, 
  X, 
  Send, 
  Layers, 
  Eye, 
  Check,
  User
} from 'lucide-react';
import { projectReelsData, reelCategories } from '../../data/projectReelsData';
import type { ProjectReel, ReelComment } from '../../data/projectReelsData';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { useSavedProjects } from '../../hooks/useSavedProjects';
import { getLoggedInUser, requireAuth } from '../../utils/authUtils';
import './ProjectReelsFeed.css';

export const ProjectReelsFeed: React.FC = () => {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const { isSaved, toggleSave } = useSavedProjects();

  // Category Filter State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filtered Reels
  const filteredReels = useMemo(() => {
    if (selectedCategory === 'all') return projectReelsData;
    const catObj = reelCategories.find(c => c.id === selectedCategory);
    if (!catObj) return projectReelsData;
    return projectReelsData.filter(r => 
      r.category.includes(catObj.name) || 
      r.categoryEn.toLowerCase().includes(catObj.nameEn.toLowerCase()) ||
      r.categoryEn.toLowerCase().includes(catObj.id.toLowerCase())
    );
  }, [selectedCategory]);

  // Active Reel Tracked via Intersection Observer
  const [activeReelId, setActiveReelId] = useState<string>(filteredReels[0]?.id || 'reel-hisab-erp');

  // Playback & Sound State
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [expandedDescId, setExpandedDescId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Comments Drawer State
  const [activeCommentReel, setActiveCommentReel] = useState<ProjectReel | null>(null);
  const [commentInput, setCommentInput] = useState<string>('');

  // Center Play/Pause pulse
  const [pulseReelId, setPulseReelId] = useState<string | null>(null);
  const [pulseType, setPulseType] = useState<'play' | 'pause'>('play');

  const feedContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Likes state with localStorage persistence
  const [likesState, setLikesState] = useState<Record<string, { count: number; isLiked: boolean }>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('techno_reels_likes');
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error('Error loading reels likes:', e);
      }
    }
    const initial: Record<string, { count: number; isLiked: boolean }> = {};
    projectReelsData.forEach(r => {
      initial[r.id] = { count: r.initialLikes, isLiked: false };
    });
    return initial;
  });

  // Comments state with localStorage persistence
  const [commentsState, setCommentsState] = useState<Record<string, ReelComment[]>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('techno_reels_comments');
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error('Error loading reels comments:', e);
      }
    }
    const initial: Record<string, ReelComment[]> = {};
    projectReelsData.forEach(r => {
      initial[r.id] = r.initialComments;
    });
    return initial;
  });

  // Reset active reel when category changes
  useEffect(() => {
    if (filteredReels.length > 0) {
      setActiveReelId(filteredReels[0].id);
      setProgress(0);
      setIsPlaying(true);
      const firstEl = itemRefs.current.get(filteredReels[0].id);
      if (firstEl && feedContainerRef.current) {
        firstEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedCategory, filteredReels]);

  // Set up IntersectionObserver to detect which reel is active in the continuous stream
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            const reelId = entry.target.getAttribute('data-reel-id');
            if (reelId && reelId !== activeReelId) {
              setActiveReelId(reelId);
              setProgress(0);
              setIsPlaying(true);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: [0.55]
      }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filteredReels, activeReelId]);

  // Simulated video playback progress for active reel
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0; // Loop seamlessly
        }
        return prev + 1.25;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isPlaying, activeReelId]);

  // Keyboard navigation (ArrowUp, ArrowDown, Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'ArrowDown') {
        e.preventDefault();
        scrollToNext();
      } else if (e.code === 'ArrowUp') {
        e.preventDefault();
        scrollToPrev();
      } else if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause(activeReelId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeReelId, filteredReels]);

  // Navigation helpers
  const activeIndex = useMemo(() => {
    return filteredReels.findIndex(r => r.id === activeReelId);
  }, [filteredReels, activeReelId]);

  const scrollToNext = () => {
    if (activeIndex < filteredReels.length - 1) {
      const nextId = filteredReels[activeIndex + 1].id;
      const el = itemRefs.current.get(nextId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const scrollToPrev = () => {
    if (activeIndex > 0) {
      const prevId = filteredReels[activeIndex - 1].id;
      const el = itemRefs.current.get(prevId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Toggle Play / Pause with center pulse
  const togglePlayPause = (reelId: string) => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    setPulseType(nextState ? 'play' : 'pause');
    setPulseReelId(reelId);
    setTimeout(() => setPulseReelId(null), 700);
  };

  // Toggle Like
  const handleToggleLike = (reelId: string) => {
    if (!requireAuth()) return;

    setLikesState(prev => {
      const current = prev[reelId] || { count: 0, isLiked: false };
      const isLiked = !current.isLiked;
      const count = isLiked ? current.count + 1 : Math.max(0, current.count - 1);
      const updated = { ...prev, [reelId]: { count, isLiked } };
      try {
        localStorage.setItem('techno_reels_likes', JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving reel likes:', e);
      }
      return updated;
    });
  };

  // Add Comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requireAuth()) return;
    if (!commentInput.trim() || !activeCommentReel) return;

    const loggedUser = getLoggedInUser();
    const authorName = loggedUser?.name || (isEn ? 'Techno User' : 'مستخدم تكنو');

    const newComment: ReelComment = {
      id: 'rc-' + Date.now(),
      author: authorName,
      authorEn: authorName,
      avatar: loggedUser?.avatar || '',
      timeAgo: isEn ? 'Just now' : 'الآن',
      timeAgoEn: 'Just now',
      content: commentInput.trim(),
      contentEn: commentInput.trim()
    };

    setCommentsState(prev => {
      const currentList = prev[activeCommentReel.id] || [];
      const updated = {
        ...prev,
        [activeCommentReel.id]: [newComment, ...currentList]
      };
      try {
        localStorage.setItem('techno_reels_comments', JSON.stringify(updated));
      } catch (err) {
        console.error('Error saving reel comments:', err);
      }
      return updated;
    });

    setCommentInput('');
  };

  // Share link
  const handleShare = (reelId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/#videos`);
      setCopiedId(reelId);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section className="cinema-reels-experience" dir={isEn ? 'ltr' : 'rtl'}>
      <div className="cinema-reels-layout">
        {/* 1. Category Filter Sidebar on the side */}
        <aside className="cinema-reels-sidebar">
          <div className="cinema-sidebar-header">
            <Layers size={16} className="sidebar-header-icon" />
            <span className="sidebar-header-title">{isEn ? "Categories" : "التصنيفات"}</span>
          </div>

          <div className="cinema-sidebar-category-list">
            {reelCategories.map(cat => {
              const count = cat.id === 'all' 
                ? projectReelsData.length 
                : projectReelsData.filter(r => r.category.includes(cat.name) || r.categoryEn.toLowerCase().includes(cat.id)).length;
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`cinema-sidebar-category-item ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span className="category-item-name">{isEn ? cat.nameEn : cat.name}</span>
                  <span className="category-item-badge">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="cinema-counter-badge">
            <Layers size={14} />
            <span>{activeIndex + 1} / {filteredReels.length}</span>
          </div>
        </aside>

        {/* 2. Continuous Vertical Cinema Stream */}
        <div className="cinema-reels-feed-stream" ref={feedContainerRef}>
        {filteredReels.map((reel, index) => {
          const isActive = activeReelId === reel.id;
          const isSavedItem = isSaved(reel.id);
          const currentLike = likesState[reel.id] || { count: reel.initialLikes, isLiked: false };
          const currentComments = commentsState[reel.id] || reel.initialComments;
          const isDescExpanded = expandedDescId === reel.id;
          const reelTitle = isEn ? reel.titleEn : reel.title;
          const reelCategory = isEn ? reel.categoryEn : reel.category;
          const reelEngineer = isEn ? reel.engineer.nameEn : reel.engineer.name;
          const reelEngineerRole = isEn ? reel.engineer.roleEn : reel.engineer.role;
          const reelDesc = isEn ? reel.descriptionEn : reel.description;

          return (
            <article
              key={reel.id}
              ref={(el) => {
                if (el) itemRefs.current.set(reel.id, el);
                else itemRefs.current.delete(reel.id);
              }}
              data-reel-id={reel.id}
              className={`cinema-reel-card-item ${isActive ? 'active-stage' : 'inactive-stage'}`}
              style={{ '--reel-accent': reel.categoryColor } as React.CSSProperties}
            >
              {/* Cinema Frame Wrapper */}
              <div className="cinema-reel-phone-frame">
                {/* Ambient Colored Backlight Halo */}
                <div 
                  className="cinema-ambient-halo" 
                  style={{ backgroundColor: reel.categoryColor }} 
                />

                {/* Video / Visual Simulation Canvas */}
                <div 
                  className="cinema-media-canvas" 
                  onClick={() => togglePlayPause(reel.id)}
                >
                  {/* Media Layer */}
                  <div className={`cinema-media-inner ${isActive && isPlaying ? 'is-animating' : 'is-paused'}`}>
                    {/* Blurred backdrop image for wide/different aspect ratios */}
                    <img 
                      src={reel.coverImage} 
                      alt="" 
                      className="cinema-backdrop-blur" 
                      aria-hidden="true" 
                    />
                    <img 
                      src={reel.coverImage} 
                      alt={reelTitle}
                      className="cinema-cover-image"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    {/* Vignette Overlay */}
                    <div className="cinema-video-vignette" />

                    {/* Live Telemetry Pill: Only Views Count */}
                    <div className="cinema-live-telemetry">
                      <Eye size={13} />
                      <span>{reel.initialViews}</span>
                    </div>

                    {/* Sound Mute / Unmute Toggle */}
                    <button
                      type="button"
                      className="cinema-sound-toggle-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted(prev => !prev);
                      }}
                      title={isMuted ? (isEn ? "Unmute" : "تشغيل الصوت") : (isEn ? "Mute" : "كتم الصوت")}
                      aria-label="Toggle Sound"
                    >
                      {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
                    </button>

                    {/* Center Play/Pause Pulse Icon */}
                    {pulseReelId === reel.id && (
                      <div className="cinema-center-pulse">
                        {pulseType === 'play' ? <Play size={36} fill="#fff" /> : <Pause size={36} fill="#fff" />}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Overlay Information on the Video */}
                <div className="cinema-bottom-overlay">
                  {/* Engineer Identity Pill */}
                  <div className="cinema-engineer-pill">
                    <img 
                      src={reel.engineer.avatar} 
                      alt={reelEngineer}
                      className="engineer-pill-avatar" 
                    />
                    <div className="engineer-pill-text">
                      <span className="engineer-pill-name">
                        {reelEngineer}
                        <CheckCircle2 size={13} className="verified-check" />
                      </span>
                      <span className="engineer-pill-role">{reelEngineerRole}</span>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div 
                    className="cinema-category-badge"
                    style={{ 
                      backgroundColor: `${reel.categoryColor}25`,
                      color: reel.categoryColor,
                      borderColor: `${reel.categoryColor}55`
                    }}
                  >
                    <span>{reelCategory}</span>
                  </div>

                  {/* Project Title */}
                  <h2 className="cinema-project-title">{reelTitle}</h2>

                  {/* Project Description */}
                  <p className={`cinema-project-desc ${isDescExpanded ? 'expanded' : ''}`}>
                    {reelDesc}
                  </p>

                  <button
                    type="button"
                    className="cinema-desc-toggle"
                    onClick={() => setExpandedDescId(isDescExpanded ? null : reel.id)}
                  >
                    {isDescExpanded ? (isEn ? "Less" : "أقل") : (isEn ? "...more" : "...المزيد")}
                  </button>

                  {/* Tags Row */}
                  <div className="cinema-tags-row">
                    {reel.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="cinema-tag-chip">
                        {tag.startsWith('#') ? tag : `#${tag}`}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress Bar at the bottom */}
                <div className="cinema-progress-track">
                  <div 
                    className="cinema-progress-bar"
                    style={{ 
                      width: isActive ? `${progress}%` : '0%',
                      backgroundColor: reel.categoryColor 
                    }}
                  />
                </div>
              </div>

              {/* 4. Floating Side Action Bar (Outside or overlapping gracefully) */}
              <div className="cinema-side-actions-bar" onClick={(e) => e.stopPropagation()}>
                {/* Like Button */}
                <button
                  type="button"
                  className={`cinema-action-btn ${currentLike.isLiked ? 'liked' : ''}`}
                  onClick={() => handleToggleLike(reel.id)}
                  title={currentLike.isLiked ? (isEn ? "Liked" : "معجب") : (isEn ? "Like" : "إعجاب")}
                >
                  <div className="action-circle-icon">
                    <Heart 
                      size={20} 
                      fill={currentLike.isLiked ? "#ef4444" : "none"} 
                      color={currentLike.isLiked ? "#ef4444" : "currentColor"} 
                    />
                  </div>
                  <span className="action-label-count">{currentLike.count}</span>
                </button>

                {/* Comments Button */}
                <button
                  type="button"
                  className="cinema-action-btn"
                  onClick={() => setActiveCommentReel(reel)}
                  title={isEn ? "Comments" : "التعليقات"}
                >
                  <div className="action-circle-icon">
                    <MessageSquare size={19} />
                  </div>
                  <span className="action-label-count">{currentComments.length}</span>
                </button>

                {/* Bookmark / Save Button */}
                <button
                  type="button"
                  className={`cinema-action-btn ${isSavedItem ? 'saved' : ''}`}
                  onClick={() => {
                    toggleSave({
                      id: reel.id,
                      title: reel.title,
                      titleEn: reel.titleEn,
                      category: 'فيديوهات تقنية',
                      categoryLabel: reelCategory,
                      description: reel.description,
                      descriptionEn: reel.descriptionEn,
                      type: 'video',
                      tags: reel.tags
                    });
                  }}
                  title={isSavedItem ? (isEn ? "Saved" : "محفوظ") : (isEn ? "Save" : "حفظ")}
                >
                  <div className="action-circle-icon">
                    {isSavedItem ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                  </div>
                  <span className="action-label-count">{isSavedItem ? (isEn ? "Saved" : "محفوظ") : (isEn ? "Save" : "حفظ")}</span>
                </button>

                {/* Share Button */}
                <button
                  type="button"
                  className="cinema-action-btn"
                  onClick={(e) => handleShare(reel.id, e)}
                  title={isEn ? "Share" : "مشاركة"}
                >
                  <div className="action-circle-icon">
                    {copiedId === reel.id ? <Check size={19} color="#10b981" /> : <Share2 size={19} />}
                  </div>
                  <span className="action-label-count">{copiedId === reel.id ? (isEn ? "Copied" : "تم") : (isEn ? "Share" : "مشاركة")}</span>
                </button>

              </div>
            </article>
          );
        })}
        </div>
      </div>

      {/* 5. Comments Slide-up Drawer */}
      {activeCommentReel && (
        <div className="cinema-comments-overlay" onClick={() => setActiveCommentReel(null)}>
          <div className="cinema-comments-modal" onClick={(e) => e.stopPropagation()}>
            <div className="comments-modal-header">
              <div className="comments-header-title">
                <MessageSquare size={18} style={{ color: 'var(--accent-cyan, #00d2ff)' }} />
                <h3>{isEn ? `Project Comments (${(commentsState[activeCommentReel.id] || []).length})` : `تعليقات المشروع (${(commentsState[activeCommentReel.id] || []).length})`}</h3>
              </div>
              <button 
                type="button" 
                className="comments-close-btn"
                onClick={() => setActiveCommentReel(null)}
              >
                <X size={18} />
              </button>
            </div>

            {/* Comments List */}
            <div className="comments-modal-list">
              {(commentsState[activeCommentReel.id] || []).length === 0 ? (
                <div className="empty-comments-state">
                  <p>{isEn ? "No comments yet. Share your feedback!" : "لا توجد تعليقات بعد. كن أول من يشارك برأيه!"}</p>
                </div>
              ) : (
                (commentsState[activeCommentReel.id] || []).map((c) => (
                  <div key={c.id} className="comment-list-item">
                    <div className="comment-author-avatar">
                      {c.author.charAt(0).toUpperCase()}
                    </div>
                    <div className="comment-content-box">
                      <div className="comment-top-row">
                        <span className="comment-author">{isEn ? (c.authorEn || c.author) : c.author}</span>
                        <span className="comment-date">{isEn ? (c.timeAgoEn || c.timeAgo) : c.timeAgo}</span>
                      </div>
                      <p className="comment-text">{isEn ? (c.contentEn || c.content) : c.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Bar */}
            <form className="comments-input-bar" onSubmit={handleAddComment}>
              {(() => {
                const logged = getLoggedInUser();
                return logged ? (
                  <div
                    className="reel-commenter-badge"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 10px',
                      marginBottom: '8px',
                      borderRadius: '16px',
                      background: 'rgba(14, 165, 233, 0.12)',
                      border: '1px solid rgba(56, 189, 248, 0.25)',
                      color: 'var(--accent-cyan, #38bdf8)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      width: 'fit-content'
                    }}
                  >
                    {logged.avatar ? (
                      <img
                        src={logged.avatar}
                        alt=""
                        style={{ width: '16px', height: '16px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                    ) : (
                      <User size={13} />
                    )}
                    <span>{logged.name}</span>
                  </div>
                ) : (
                  <div
                    className="reel-commenter-prompt"
                    onClick={() => requireAuth()}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 10px',
                      marginBottom: '8px',
                      borderRadius: '16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px dashed rgba(255, 255, 255, 0.2)',
                      color: '#94a3b8',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      width: 'fit-content'
                    }}
                  >
                    <User size={13} />
                    <span>{isEn ? 'Sign in to comment as yourself' : 'سجل الدخول للتعليق باسمك'}</span>
                  </div>
                );
              })()}
              <div className="comment-input-row">
                <input 
                  type="text"
                  placeholder={getLoggedInUser() 
                    ? (isEn ? "Add your engineering feedback..." : "أضف رأيك أو استفسارك الهندسي...")
                    : (isEn ? "Please sign in to write a comment..." : "يرجى تسجيل الدخول للتعليق...")}
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  onFocus={() => {
                    if (!getLoggedInUser()) requireAuth();
                  }}
                  className="comment-text-input"
                  required
                />
                <button type="submit" className="comment-send-btn">
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectReelsFeed;
