'use client';

import React, { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { X, Play, Clock, Sparkles, Bookmark, BookmarkCheck } from 'lucide-react';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import { useSavedProjects } from '@/hooks/useSavedProjects';
import './VideoPlayerModal.css';

export interface VideoModalData {
  id?: string;
  title: string;
  titleEn?: string;
  youtubeUrl?: string;
  url?: string;
  duration?: string;
  tag?: string;
  tagEn?: string;
  description?: string;
  descriptionEn?: string;
  cover?: string;
  image?: string;
}

export interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: VideoModalData | null;
}

export const extractYouTubeId = (urlOrId?: string): string => {
  if (!urlOrId) return '';
  const trimmed = urlOrId.trim();

  // Known fallback IDs
  if (trimmed.includes('drone') || trimmed === 'video-1') return '4Sew-i8sB2s';
  if (trimmed.includes('welding') || trimmed === 'video-2') return 'L2ya6z4tZhg';
  if (trimmed.includes('vision') || trimmed === 'video-3') return 'poKdf5HdaAM';

  // Direct 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  // Watch URL format: youtube.com/watch?v=...
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];

  // Short URL format: youtu.be/...
  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];

  // Embed URL format: youtube.com/embed/...
  const embedMatch = trimmed.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  return '';
};

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  isOpen,
  onClose,
  video
}) => {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const titleId = useId();
  const { isSaved, toggleSave } = useSavedProjects();

  const prevFocusedElement = React.useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    prevFocusedElement.current = document.activeElement as HTMLElement | null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (prevFocusedElement.current && typeof prevFocusedElement.current.focus === 'function') {
        prevFocusedElement.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen || !video) return null;

  const displayTitle = isEn && video.titleEn ? video.titleEn : video.title;
  const displayDesc = isEn && video.descriptionEn ? video.descriptionEn : video.description;
  const displayTag = isEn && video.tagEn ? video.tagEn : video.tag;

  const rawUrl = video.youtubeUrl || video.url || video.id;
  const youtubeId = extractYouTubeId(rawUrl);
  const isDirectVideo = rawUrl && (rawUrl.endsWith('.mp4') || rawUrl.endsWith('.webm'));
  const saved = video.id ? isSaved(video.id) : false;
  const handleToggleSave = () => {
    if (!video.id) return;
    toggleSave({
      id: video.id,
      title: video.title,
      titleEn: video.titleEn,
      category: 'فيديوهات هندسية',
      categoryLabel: displayTag,
      description: video.description || '',
      descriptionEn: video.descriptionEn,
      type: 'video',
      duration: video.duration,
      url: video.youtubeUrl || video.url,
      image: video.cover || video.image
    });
  };

  const modalContent = (
    <div
      className="video-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      dir={isEn ? 'ltr' : 'rtl'}
    >
      <div
        className="video-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="video-modal-header">
          <div className="video-modal-title-wrap">
            <div className="video-modal-meta-row">
              {displayTag && (
                <span className="video-modal-tag">
                  <Sparkles size={12} />
                  <span>{displayTag}</span>
                </span>
              )}
              {video.duration && (
                <span className="video-modal-duration">
                  <Clock size={12} />
                  <span>{video.duration}</span>
                </span>
              )}
            </div>
            <h2 id={titleId} className="video-modal-title">
              {displayTitle}
            </h2>
          </div>

          <div className="video-modal-header-actions">
          {video.id && (
            <button
              type="button"
              className={`video-modal-save-btn ${saved ? 'is-saved' : ''}`}
              onClick={handleToggleSave}
              aria-pressed={saved}
              title={saved ? (isEn ? 'Remove from Saved' : 'إزالة من المحفوظات') : (isEn ? 'Save Video' : 'حفظ الفيديو')}
            >
              {saved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}
              <span>{saved ? (isEn ? 'Saved' : 'محفوظ') : (isEn ? 'Save' : 'حفظ')}</span>
            </button>
          )}
          <button
            type="button"
            className="video-modal-close-btn"
            onClick={onClose}
            aria-label={isEn ? 'Close video' : 'إغلاق الفيديو'}
            title={isEn ? 'Close' : 'إغلاق'}
          >
            <X size={20} />
          </button>
          </div>
        </div>

        {/* Video Player Frame */}
        <div className="video-modal-player-wrap">
          {youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={displayTitle}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="video-modal-iframe"
            />
          ) : isDirectVideo ? (
            <video
              src={rawUrl}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="video-modal-video"
            />
          ) : (
            <div className="video-modal-fallback">
              <Play size={44} />
              <p>{isEn ? 'Video preview is unavailable' : 'تعذر تحميل مشغل الفيديو'}</p>
            </div>
          )}
        </div>

        {/* Footer / Description */}
        {displayDesc && (
          <div className="video-modal-footer">
            <p className="video-modal-desc">{displayDesc}</p>
          </div>
        )}
      </div>
    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
};

export default VideoPlayerModal;
