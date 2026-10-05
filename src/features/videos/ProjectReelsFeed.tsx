'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  MessageCircle,
  Bookmark,
  BookmarkCheck,
  Share2,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  X,
  Send,
  Check,
  User,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';
import type { ReelComment } from '@/data/projectReelsData';
import { videosList } from '@/data/videosData';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import { useSavedProjects } from '@/hooks/useSavedProjects';
import { getLoggedInUser, requireAuth } from '@/lib/auth';
import './ProjectReelsFeed.css';

/* ---------------------------------------------------------------------------
   Reels / Shorts style feed.
   - One reel per viewport (CSS scroll-snap, snap-stop: always).
   - The visible reel is tracked with a single IntersectionObserver; React state
     only changes when the active reel changes (never per frame).
   - Real videos (YouTube) autoplay muted; only the active reel mounts its
     iframe, off-screen reels are unmounted (= paused, zero cost).
   - Project reels are animated covers (Ken Burns) + CSS progress bar.
   --------------------------------------------------------------------------- */

interface FeedReel {
  id: string;
  kind: 'video' | 'project';
  title: string;
  titleEn: string;
  caption: string;
  captionEn: string;
  cover: string;
  accent: string;
  youtubeId?: string;
  localSrc?: string;
  liveUrl?: string;
  durationSec: number;
  likes: number;
  comments: ReelComment[];
  tags: string[];
}

const toSeconds = (d: string) => {
  const parts = d.split(':').map(n => parseInt(n, 10) || 0);
  const s = parts.reduce((acc, n) => acc * 60 + n, 0);
  return s > 4 ? s : 30;
};

const youtubeIdFrom = (url: string): string | undefined => {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1) || undefined;
    return u.searchParams.get('v') || u.pathname.split('/').filter(Boolean).pop() || undefined;
  } catch {
    return undefined;
  }
};

// Deterministic pseudo like-count for real videos (no backend).
const seedLikes = (id: string) => 90 + (id.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 140);

// Only the real YouTube videos for now (project picture reels removed by the owner).
const FEED_REELS: FeedReel[] = [
  ...videosList.map<FeedReel>(v => ({
    id: v.id,
    kind: 'video',
    title: v.title,
    titleEn: v.titleEn,
    caption: v.description,
    captionEn: v.descriptionEn,
    cover: v.cover,
    accent: '#38bdf8',
    youtubeId: youtubeIdFrom(v.youtubeUrl),
    localSrc: `/videos/${v.id}.mp4`,
    durationSec: toSeconds(v.duration),
    likes: seedLikes(v.id),
    comments: [],
    tags: [v.tag]
  }))
];

const ytCommand = (iframe: HTMLIFrameElement | null, func: string) => {
  try {
    iframe?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args: [] }), '*');
  } catch {
    /* cross-origin not ready yet */
  }
};

export const ProjectReelsFeed: React.FC = () => {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const { isSaved, toggleSave } = useSavedProjects();

  // Deep link support: /videos?reel=<youtubeId or slug> opens that reel directly.
  const deepLinkHandledRef = useRef(false);
  const initialIndex = (() => {
    if (typeof window === 'undefined') return 0;
    const wanted = new URLSearchParams(window.location.search).get('reel');
    if (!wanted) return 0;
    const i = FEED_REELS.findIndex(r => r.id === wanted || r.youtubeId === wanted ||
      (r.youtubeId && r.youtubeId === wanted));
    return i >= 0 ? i : 0;
  })();

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  useEffect(() => {
    if (initialIndex > 0 && !deepLinkHandledRef.current) {
      deepLinkHandledRef.current = true;
      const el = feedRef.current?.querySelector<HTMLElement>(`[data-index="${initialIndex}"]`);
      el?.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // sound on by default
  const [pulse, setPulse] = useState<{ id: string; type: 'play' | 'pause'; n: number } | null>(null);
  // The YouTube iframe is created only after hydration: rendered on the server it
  // loaded before React attached onLoad, so it never became visible.
  const [hydrated, setHydrated] = useState(false);
  const [localVideoOk, setLocalVideoOk] = useState<Record<string, boolean | undefined>>({});
  const localVideoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  // Instagram-style: the sound button shows while paused and for a moment after a
  // reel starts / sound is toggled, then hides while the video plays.
  const [peek, setPeek] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [likePopId, setLikePopId] = useState<string | null>(null);

  const [commentReelId, setCommentReelId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');

  const [likesState, setLikesState] = useState<Record<string, { count: number; isLiked: boolean }>>(() => {
    const init: Record<string, { count: number; isLiked: boolean }> = {};
    FEED_REELS.forEach(r => { init[r.id] = { count: r.likes, isLiked: false }; });
    return init;
  });
  const [commentsState, setCommentsState] = useState<Record<string, ReelComment[]>>(() => {
    const init: Record<string, ReelComment[]> = {};
    FEED_REELS.forEach(r => { init[r.id] = r.comments; });
    return init;
  });

  const shellRef = useRef<HTMLElement>(null);
  const feedRef = useRef<HTMLOListElement>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const activeIndexRef = useRef(0);
  const targetIndexRef = useRef(0); // where keyboard / button navigation is heading
  const mutedRef = useRef(true);
  const pausedRef = useRef(false);
  mutedRef.current = isMuted;
  pausedRef.current = isPaused;

  // Defer YouTube embed mount: the reel cover plays the visual role at first paint;
  // the player (850KB of Google JS) mounts once the page settles.
  useEffect(() => {
    const t = window.setTimeout(() => setHydrated(true), 2500);
    return () => window.clearTimeout(t);
  }, []);

  /* Probe once for self-hosted mp4 files: when present, they replace the YouTube embed. */
  useEffect(() => {
    const ids = Array.from(new Set(FEED_REELS.filter(r => r.localSrc).map(r => r.id)));
    ids.forEach((id) => {
      const reel = FEED_REELS.find(r => r.id === id);
      if (!reel?.localSrc) return;
      fetch(reel.localSrc, { method: 'HEAD' })
        .then((res) => {
          if (res.ok) setLocalVideoOk((m) => ({ ...m, [id]: true }));
        })
        .catch(() => {});
    });
  }, []);

  useEffect(() => {
    setPeek(true);
    const t = window.setTimeout(() => setPeek(false), 3000);
    return () => window.clearTimeout(t);
  }, [activeIndex, isMuted]);

  /* Persisted likes / comments (merged over defaults so new reels keep counts). */
  useEffect(() => {
    try {
      const l = localStorage.getItem('techno_reels_likes');
      if (l) setLikesState(prev => ({ ...prev, ...JSON.parse(l) }));
    } catch { /* ignore */ }
    try {
      const c = localStorage.getItem('techno_reels_comments');
      if (c) setCommentsState(prev => ({ ...prev, ...JSON.parse(c) }));
    } catch { /* ignore */ }
  }, []);

  /* Fit the feed exactly under the site navbar: writes a CSS var, no React state. */
  useEffect(() => {
    const shell = shellRef.current;
    const nav = document.getElementById('navbar');
    if (!shell || !nav) return;
    const apply = () => shell.style.setProperty('--reels-top', `${Math.round(nav.getBoundingClientRect().height)}px`);
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(nav);
    return () => ro.disconnect();
  }, []);

  /* Active reel detection. */
  useEffect(() => {
    const feed = feedRef.current;
    if (!feed) return;
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio >= 0.6) {
            const idx = Number((e.target as HTMLElement).dataset.index);
            if (!Number.isNaN(idx) && idx !== activeIndexRef.current) {
              activeIndexRef.current = idx;
              targetIndexRef.current = idx;
              setActiveIndex(idx);
              setIsPaused(false);
              setExpandedId(null);
            }
          }
        }
      },
      { root: feed, threshold: [0.6] }
    );
    feed.querySelectorAll<HTMLElement>('.reel').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Deep link: /videos#<reel-id> */
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const idx = FEED_REELS.findIndex(r => r.id === id);
    const feed = feedRef.current;
    if (idx > 0 && feed) feed.scrollTo({ top: idx * feed.clientHeight, behavior: 'auto' });
  }, []);

  const goTo = useCallback((idx: number) => {
    const feed = feedRef.current;
    if (!feed) return;
    const clamped = Math.max(0, Math.min(FEED_REELS.length - 1, idx));
    targetIndexRef.current = clamped;
    feed.scrollTo({ top: clamped * feed.clientHeight, behavior: 'smooth' });
  }, []);

  const togglePause = useCallback((id: string) => {
    const next = !pausedRef.current;
    pausedRef.current = next;
    setIsPaused(next);
    setPulse(p => ({ id, type: next ? 'pause' : 'play', n: (p?.n || 0) + 1 }));
  }, []);

  /* Sync the YouTube player with paused / muted state. */
  useEffect(() => {
    ytCommand(iframeRef.current, isPaused ? 'pauseVideo' : 'playVideo');
    Object.values(localVideoRefs.current).forEach((v) => {
      if (!v) return;
      if (isPaused) { v.pause(); } else { v.play().catch(() => {}); }
    });
  }, [isPaused]);
  useEffect(() => {
    ytCommand(iframeRef.current, isMuted ? 'mute' : 'unMute');
    Object.values(localVideoRefs.current).forEach((v) => { if (v) v.muted = isMuted; });
  }, [isMuted]);

  /* Start the active local video, pause the rest. */
  useEffect(() => {
    FEED_REELS.forEach((r, i) => {
      const v = localVideoRefs.current[r.id];
      if (!v) return;
      v.muted = mutedRef.current;
      if (i === activeIndex && !isPaused) { v.play().catch(() => {}); }
      else { v.pause(); }
    });
  }, [activeIndex, isPaused]);

  const onIframeLoad = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
    const el = e.currentTarget;
    el.classList.add('is-loaded');
    // The embedded player needs a moment after `load` before it accepts commands.
    [250, 900, 2000].forEach(ms =>
      setTimeout(() => {
        if (iframeRef.current !== el) return;
        if (!mutedRef.current) ytCommand(el, 'unMute');
        if (pausedRef.current) ytCommand(el, 'pauseVideo');
      }, ms)
    );
  };

  /* Pause when the tab is hidden. */
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) ytCommand(iframeRef.current, 'pauseVideo');
      else if (!pausedRef.current) ytCommand(iframeRef.current, 'playVideo');
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  /* Keyboard: ↑/↓ (PageUp/PageDown, k/j) navigate, Space pauses, M mutes. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (commentReelId || e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      const idx = targetIndexRef.current;
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case 'j':
          e.preventDefault();
          goTo(idx + 1);
          break;
        case 'ArrowUp':
        case 'PageUp':
        case 'k':
          e.preventDefault();
          goTo(idx - 1);
          break;
        case ' ':
          if (t && t.tagName === 'BUTTON') return;
          e.preventDefault();
          togglePause(FEED_REELS[activeIndexRef.current].id);
          break;
        case 'm':
        case 'M':
          setIsMuted(m => !m);
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [commentReelId, goTo, togglePause]);

  const handleLike = (id: string) => {
    if (!requireAuth()) return;
    setLikesState(prev => {
      const cur = prev[id] || { count: 0, isLiked: false };
      const isLiked = !cur.isLiked;
      const updated = { ...prev, [id]: { isLiked, count: isLiked ? cur.count + 1 : Math.max(0, cur.count - 1) } };
      try { localStorage.setItem('techno_reels_likes', JSON.stringify(updated)); } catch { /* ignore */ }
      if (isLiked) {
        setLikePopId(id);
        setTimeout(() => setLikePopId(p => (p === id ? null : p)), 650);
      }
      return updated;
    });
  };

  const handleShare = async (reel: FeedReel) => {
    const url = `${window.location.origin}/videos#${reel.id}`;
    const title = isEn ? reel.titleEn : reel.title;
    try {
      if (navigator.share && window.matchMedia('(pointer: coarse)').matches) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard?.writeText(url);
      setCopiedId(reel.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch { /* user cancelled */ }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requireAuth()) return;
    if (!commentInput.trim() || !commentReelId) return;
    const user = getLoggedInUser();
    const author = user?.name || (isEn ? 'Techno User' : 'مستخدم تكنو');
    const c: ReelComment = {
      id: 'rc-' + Date.now(),
      author,
      authorEn: author,
      avatar: '',
      timeAgo: isEn ? 'Just now' : 'الآن',
      timeAgoEn: 'Just now',
      content: commentInput.trim(),
      contentEn: commentInput.trim()
    };
    setCommentsState(prev => {
      const updated = { ...prev, [commentReelId]: [c, ...(prev[commentReelId] || [])] };
      try { localStorage.setItem('techno_reels_comments', JSON.stringify(updated)); } catch { /* ignore */ }
      return updated;
    });
    setCommentInput('');
  };

  const commentReel = commentReelId ? FEED_REELS.find(r => r.id === commentReelId) : null;
  const commentList = commentReelId ? commentsState[commentReelId] || [] : [];
  const loggedUser = commentReel ? getLoggedInUser() : null;

  return (
    <section
      ref={shellRef}
      className="reels-shell"
      dir={isEn ? 'ltr' : 'rtl'}
      aria-label={isEn ? 'Video reels' : 'مقاطع الفيديو القصيرة'}
    >
      {/* Phones: full-screen Instagram-style top bar (the site navbar is hidden here) */}
      <div className="reels-topbar">
        <button
          type="button"
          className="reels-topbar-btn"
          onClick={() => (window.history.length > 1 ? window.history.back() : window.location.assign('/'))}
          aria-label={isEn ? 'Back' : 'رجوع'}
        >
          {isEn ? <ChevronLeft size={26} /> : <ChevronRight size={26} />}
        </button>
        <span className="reels-topbar-title">{isEn ? 'Reels' : 'ريلز'}</span>
        <button
          type="button"
          className="reels-topbar-btn"
          onClick={() => (document.querySelector('.navbar-mobile-toggle-btn') as HTMLButtonElement | null)?.click()}
          aria-label={isEn ? 'Menu' : 'القائمة'}
        >
          <Menu size={22} />
        </button>
      </div>

      <ol ref={feedRef} className="reels-feed" tabIndex={-1}>
        {FEED_REELS.map((reel, index) => {
          const isActive = index === activeIndex;
          const isNear = Math.abs(index - activeIndex) <= 1;
          const title = isEn ? reel.titleEn : reel.title;
          const caption = isEn ? reel.captionEn : reel.caption;
          const like = likesState[reel.id] || { count: reel.likes, isLiked: false };
          const commentsCount = (commentsState[reel.id] || reel.comments).length;
          const saved = isSaved(reel.id);
          const expanded = expandedId === reel.id;
          const playing = isActive && !isPaused;

          return (
            <li
              key={reel.id}
              id={reel.id}
              data-index={index}
              className={`reel ${isActive ? 'is-active' : ''} ${playing ? 'is-playing' : 'is-paused'} ${isActive && peek ? 'is-peek' : ''} reel--${reel.kind}`}
              style={{ '--reel-accent': reel.accent, '--reel-dur': `${reel.durationSec}s` } as React.CSSProperties}
            >
              <article className="reel-stage" aria-labelledby={`${reel.id}-title`}>
                {/* Ambient halo (desktop / tablet column glow) */}
                <div className="reel-halo" aria-hidden="true" />

                <div className="reel-media">
                  <img src={reel.cover} alt="" aria-hidden="true" className="reel-backdrop" loading={isNear ? 'eager' : 'lazy'} decoding="async" />
                  <img
                    src={reel.cover}
                    alt={title}
                    className={`reel-cover ${reel.kind === 'video' && reel.localSrc && isActive && hydrated && localVideoOk[reel.id] === true ? 'is-covered' : ''}`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    decoding="async"
                    aria-hidden={reel.kind === 'video' && reel.localSrc && isActive && hydrated && localVideoOk[reel.id] === true ? true : undefined}
                  />
                  {reel.kind === 'video' && reel.localSrc && isActive && hydrated && localVideoOk[reel.id] === true && (
                    <video
                      ref={(el) => { localVideoRefs.current[reel.id] = el; }}
                      className="reel-iframe reel-local-video"
                      src={reel.localSrc}
                      poster={reel.cover}
                      loop
                      playsInline
                      autoPlay
                      preload="metadata"
                      onError={() => setLocalVideoOk((m) => ({ ...m, [reel.id]: false }))}
                      tabIndex={-1}
                    />
                  )}
                  {reel.kind === 'video' && reel.youtubeId && localVideoOk[reel.id] !== true && isActive && hydrated && (
                    <iframe
                      ref={iframeRef}
                      className="reel-iframe"
                      src={`https://www.youtube-nocookie.com/embed/${reel.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${reel.youtubeId}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&enablejsapi=1`}
                      title={title}
                      allow="autoplay; encrypted-media; picture-in-picture"
                      tabIndex={-1}
                      onLoad={onIframeLoad}
                    />
                  )}
                  <div className="reel-vignette" aria-hidden="true" />
                </div>

                {/* Tap layer: play / pause */}
                <button
                  type="button"
                  className="reel-tap"
                  onClick={() => togglePause(reel.id)}
                  aria-label={playing ? (isEn ? 'Pause' : 'إيقاف مؤقت') : (isEn ? 'Play' : 'تشغيل')}
                  tabIndex={isActive ? 0 : -1}
                />

                {pulse && pulse.id === reel.id && (
                  <div key={pulse.n} className="reel-pulse" aria-hidden="true">
                    {pulse.type === 'play' ? <Play size={34} fill="#fff" /> : <Pause size={34} fill="#fff" />}
                  </div>
                )}

                {/* Tap-to-unmute (real videos only) */}
                {reel.kind === 'video' && (
                  <button
                    type="button"
                    className={`reel-sound ${isMuted ? 'is-muted' : ''}`}
                    onClick={() => {
                      setIsMuted(m => !m);
                      // Apply within the same user gesture (browser autoplay policy):
                      const cur = FEED_REELS[activeIndexRef.current];
                      const v = localVideoRefs.current[cur.id];
                      if (v) {
                        v.muted = isMuted; // toggling: current true -> will be false
                        if (!isMuted) v.play().catch(() => {});
                      }
                    }}
                    aria-pressed={!isMuted}
                    aria-label={isMuted ? (isEn ? 'Unmute' : 'تشغيل الصوت') : (isEn ? 'Mute' : 'كتم الصوت')}
                    tabIndex={isActive ? 0 : -1}
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    <span className="reel-sound-label">{isEn ? 'Tap to unmute' : 'اضغط لتشغيل الصوت'}</span>
                  </button>
                )}

                {/* Minimal caption */}
                <div className="reel-info">
                  <h2 id={`${reel.id}-title`} className="reel-title">{title}</h2>
                  <p className={`reel-caption ${expanded ? 'is-expanded' : ''}`}>
                    {caption}
                  </p>
                  <button
                    type="button"
                    className="reel-more"
                    onClick={() => setExpandedId(expanded ? null : reel.id)}
                    tabIndex={isActive ? 0 : -1}
                  >
                    {expanded ? (isEn ? 'less' : 'أقل') : (isEn ? 'more' : 'المزيد')}
                  </button>
                </div>

                <div className="reel-progress" aria-hidden="true"><span /></div>
              </article>

              {/* Side actions */}
              <div className="reel-actions">
                <button
                  type="button"
                  className={`reel-action ${like.isLiked ? 'is-liked' : ''} ${likePopId === reel.id ? 'is-popping' : ''}`}
                  onClick={() => handleLike(reel.id)}
                  aria-pressed={like.isLiked}
                  aria-label={isEn ? 'Like' : 'إعجاب'}
                  tabIndex={isActive ? 0 : -1}
                >
                  <span className="reel-action-icon"><Heart size={22} fill={like.isLiked ? 'currentColor' : 'none'} /></span>
                  <span className="reel-action-label">{like.count}</span>
                </button>

                <button
                  type="button"
                  className="reel-action"
                  onClick={() => setCommentReelId(reel.id)}
                  aria-label={isEn ? 'Comments' : 'التعليقات'}
                  tabIndex={isActive ? 0 : -1}
                >
                  <span className="reel-action-icon"><MessageCircle size={22} /></span>
                  <span className="reel-action-label">{commentsCount}</span>
                </button>

                <button
                  type="button"
                  className={`reel-action ${saved ? 'is-saved' : ''}`}
                  onClick={() =>
                    toggleSave({
                      id: reel.id,
                      title: reel.title,
                      titleEn: reel.titleEn,
                      category: 'فيديوهات تقنية',
                      categoryLabel: isEn ? 'Videos' : 'فيديوهات',
                      description: reel.caption,
                      descriptionEn: reel.captionEn,
                      type: 'video',
                      url: reel.liveUrl,
                      image: reel.cover,
                      tags: reel.tags
                    })
                  }
                  aria-pressed={saved}
                  aria-label={saved ? (isEn ? 'Saved' : 'محفوظ') : (isEn ? 'Save' : 'حفظ')}
                  tabIndex={isActive ? 0 : -1}
                >
                  <span className="reel-action-icon">{saved ? <BookmarkCheck size={22} /> : <Bookmark size={22} />}</span>
                  <span className="reel-action-label">{saved ? (isEn ? 'Saved' : 'محفوظ') : (isEn ? 'Save' : 'حفظ')}</span>
                </button>

                <button
                  type="button"
                  className="reel-action"
                  onClick={() => handleShare(reel)}
                  aria-label={isEn ? 'Share' : 'مشاركة'}
                  tabIndex={isActive ? 0 : -1}
                >
                  <span className="reel-action-icon">{copiedId === reel.id ? <Check size={22} /> : <Share2 size={21} />}</span>
                  <span className="reel-action-label">{copiedId === reel.id ? (isEn ? 'Copied' : 'تم النسخ') : (isEn ? 'Share' : 'مشاركة')}</span>
                </button>

                {reel.liveUrl && (
                  <a
                    className="reel-action reel-action--live"
                    href={reel.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={isEn ? 'Open live site' : 'فتح الموقع الحي'}
                    tabIndex={isActive ? 0 : -1}
                  >
                    <span className="reel-action-icon"><ExternalLink size={20} /></span>
                    <span className="reel-action-label">{isEn ? 'Live' : 'مباشر'}</span>
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {/* Desktop up / down navigation (keyboard ↑/↓ also works) */}
      <div className="reels-nav">
        <button
          type="button"
          className="reels-nav-btn"
          onClick={() => goTo(targetIndexRef.current - 1)}
          disabled={activeIndex === 0}
          aria-label={isEn ? 'Previous video' : 'الفيديو السابق'}
        >
          <ChevronUp size={22} />
        </button>
        <button
          type="button"
          className="reels-nav-btn"
          onClick={() => goTo(targetIndexRef.current + 1)}
          disabled={activeIndex === FEED_REELS.length - 1}
          aria-label={isEn ? 'Next video' : 'الفيديو التالي'}
        >
          <ChevronDown size={22} />
        </button>
      </div>

      {/* Comments drawer */}
      {commentReel && (
        <div className="reels-comments-overlay" onClick={() => setCommentReelId(null)}>
          <div
            className="reels-comments-sheet"
            role="dialog"
            aria-modal="true"
            aria-label={isEn ? 'Comments' : 'التعليقات'}
            onClick={e => e.stopPropagation()}
          >
            <div className="reels-comments-header">
              <h3>{isEn ? `Comments (${commentList.length})` : `التعليقات (${commentList.length})`}</h3>
              <button type="button" className="reels-comments-close" onClick={() => setCommentReelId(null)} aria-label={isEn ? 'Close' : 'إغلاق'}>
                <X size={18} />
              </button>
            </div>

            <div className="reels-comments-list">
              {commentList.length === 0 ? (
                <p className="reels-comments-empty">
                  {isEn ? 'No comments yet. Share your feedback!' : 'لا توجد تعليقات بعد. كن أول من يشارك برأيه!'}
                </p>
              ) : (
                commentList.map(c => (
                  <div key={c.id} className="reels-comment">
                    <div className="reels-comment-avatar">{c.author.charAt(0).toUpperCase()}</div>
                    <div className="reels-comment-body">
                      <div className="reels-comment-top">
                        <span className="reels-comment-author">{isEn ? c.authorEn || c.author : c.author}</span>
                        <span className="reels-comment-date">{isEn ? c.timeAgoEn || c.timeAgo : c.timeAgo}</span>
                      </div>
                      <p className="reels-comment-text">{isEn ? c.contentEn || c.content : c.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <form className="reels-comments-form" onSubmit={handleAddComment}>
              {!loggedUser && (
                <button type="button" className="reels-comments-signin" onClick={() => requireAuth()}>
                  <User size={13} />
                  <span>{isEn ? 'Sign in to comment as yourself' : 'سجل الدخول للتعليق باسمك'}</span>
                </button>
              )}
              <div className="reels-comments-row">
                <input
                  type="text"
                  value={commentInput}
                  onChange={e => setCommentInput(e.target.value)}
                  onFocus={() => { if (!getLoggedInUser()) requireAuth(); }}
                  placeholder={loggedUser
                    ? (isEn ? 'Add a comment...' : 'أضف تعليقاً...')
                    : (isEn ? 'Please sign in to write a comment...' : 'يرجى تسجيل الدخول للتعليق...')}
                  className="reels-comments-input"
                  required
                />
                <button type="submit" className="reels-comments-send" aria-label={isEn ? 'Send' : 'إرسال'}>
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
