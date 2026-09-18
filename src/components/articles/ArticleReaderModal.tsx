import React, { useState, useEffect } from 'react';
import { 
  X, 
  Heart, 
  Bookmark, 
  BookmarkCheck, 
  MessageSquare, 
  Clock, 
  Calendar, 
  Share2, 
  Send, 
  User, 
  CheckCircle2
} from 'lucide-react';
import type { BlogArticle, BlogComment } from '../../data/blogArticlesData';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { useSavedProjects } from '../../hooks/useSavedProjects';
import './ArticleReaderModal.css';

interface ArticleReaderModalProps {
  article: BlogArticle | null;
  onClose: () => void;
  likes: number;
  isLiked: boolean;
  onToggleLike: () => void;
  comments: BlogComment[];
  onAddComment: (comment: BlogComment) => void;
  initialScrollToComments?: boolean;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
  likes,
  isLiked,
  onToggleLike,
  comments,
  onAddComment,
  initialScrollToComments = false
}) => {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const { isSaved, toggleSave } = useSavedProjects();

  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Scroll to comments if requested
  useEffect(() => {
    if (initialScrollToComments) {
      setTimeout(() => {
        const el = document.getElementById('modal-comments-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 250);
    }
  }, [initialScrollToComments]);

  if (!article) return null;

  const isItemSaved = isSaved(article.id);
  const title = isEn ? article.titleEn : article.title;
  const category = isEn ? article.categoryEn : article.category;
  const publishDate = isEn ? article.publishDateEn : article.publishDate;
  const readTime = isEn ? article.readTimeEn : article.readTime;
  const authorName = isEn ? article.author.nameEn : article.author.name;
  const authorRole = isEn ? article.author.roleEn : article.author.role;
  const content = isEn ? article.contentEn : article.content;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    const newComment: BlogComment = {
      id: 'c-' + Date.now(),
      author: commentName.trim() || (isEn ? 'Guest Reader' : 'قارئ زائر'),
      date: isEn ? 'Just now' : 'الآن',
      text: commentText.trim()
    };

    onAddComment(newComment);
    setCommentText('');
    setIsSubmitting(false);
  };

  return (
    <div className="article-modal-backdrop" onClick={onClose} dir={isEn ? 'ltr' : 'rtl'}>
      <div 
        className="article-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          type="button" 
          className="article-modal-close-btn" 
          onClick={onClose}
          aria-label={isEn ? "Close article" : "إغلاق المقال"}
        >
          <X size={20} />
        </button>

        {/* Hero Image & Category */}
        <div className="article-modal-hero">
          <img src={article.image} alt={title} className="article-modal-img" />
          <div className="article-modal-hero-overlay" />
          <div className="article-modal-hero-badges">
            <span 
              className="article-category-badge"
              style={{ backgroundColor: `${article.categoryColor}22`, color: article.categoryColor, borderColor: `${article.categoryColor}55` }}
            >
              {category}
            </span>
            <span className="article-read-badge">
              <Clock size={13} />
              <span>{readTime}</span>
            </span>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="article-modal-body">
          {/* Article Header */}
          <div className="article-modal-header">
            <h1 className="article-modal-title">{title}</h1>

            {/* Author / Publisher Information Row */}
            <div className="article-author-card">
              <div className="article-author-info">
                <img 
                  src={article.author.avatar} 
                  alt={authorName} 
                  className="article-author-avatar" 
                />
                <div>
                  <div className="article-author-name-wrap">
                    <span className="article-author-name">{authorName}</span>
                    <span className="article-author-verified" title={isEn ? "Verified Author" : "ناشر معتمد"}>
                      <CheckCircle2 size={13} color="var(--accent-cyan)" />
                    </span>
                  </div>
                  <div className="article-author-role">{authorRole}</div>
                </div>
              </div>

              <div className="article-meta-date">
                <Calendar size={14} />
                <span>{publishDate}</span>
              </div>
            </div>
          </div>

          {/* Action Toolbar: Like, Save, Share */}
          <div className="article-modal-actions-bar">
            <div className="article-actions-left">
              <button
                type="button"
                className={`article-action-pill ${isLiked ? 'liked' : ''}`}
                onClick={onToggleLike}
                title={isLiked ? (isEn ? "Unlike" : "إلغاء الإعجاب") : (isEn ? "Like article" : "أعجبني")}
              >
                <Heart size={16} fill={isLiked ? "#ef4444" : "none"} color={isLiked ? "#ef4444" : "currentColor"} />
                <span>{likes}</span>
              </button>

              <button
                type="button"
                className="article-action-pill"
                onClick={() => {
                  const el = document.getElementById('modal-comments-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                title={isEn ? "Comments" : "التعليقات"}
              >
                <MessageSquare size={16} />
                <span>{comments.length}</span>
              </button>

              <button
                type="button"
                className={`article-action-pill ${isItemSaved ? 'saved' : ''}`}
                onClick={() => {
                  toggleSave({
                    id: article.id,
                    title: article.title,
                    titleEn: article.titleEn,
                    category: 'مقالات تقنية',
                    categoryLabel: category,
                    description: article.excerpt,
                    descriptionEn: article.excerptEn,
                    type: 'article',
                    image: article.image
                  });
                }}
                title={isItemSaved ? (isEn ? "Saved in Library" : "محفوظ في مكتبتك") : (isEn ? "Save Article" : "حفظ المقال")}
              >
                {isItemSaved ? <BookmarkCheck size={16} color="var(--accent-cyan)" /> : <Bookmark size={16} />}
                <span>{isItemSaved ? (isEn ? "Saved" : "محفوظ") : (isEn ? "Save" : "حفظ")}</span>
              </button>
            </div>

            <button
              type="button"
              className="article-action-pill"
              onClick={handleShare}
              title={isEn ? "Share article" : "مشاركة المقال"}
            >
              <Share2 size={15} />
              <span>{copied ? (isEn ? "Copied!" : "تم النسخ!") : (isEn ? "Share" : "مشاركة")}</span>
            </button>
          </div>

          {/* Article Full Text Content */}
          <div className="article-modal-text-content">
            {content.map((paragraph, idx) => (
              <p key={idx} className="article-paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="article-modal-tags">
            {article.tags.map((tag, idx) => (
              <span key={idx} className="article-tag-chip">
                #{tag}
              </span>
            ))}
          </div>

          {/* Divider */}
          <hr className="article-modal-divider" />

          {/* Comments Section */}
          <div id="modal-comments-section" className="article-comments-section">
            <div className="article-comments-header">
              <div className="comments-title-wrap">
                <MessageSquare size={22} color="var(--accent-cyan)" />
                <h3>{isEn ? `Comments (${comments.length})` : `التعليقات والآراء (${comments.length})`}</h3>
              </div>
            </div>

            {/* Add Comment Form */}
            <form className="article-comment-form" onSubmit={handleCommentSubmit}>
              <div className="comment-form-row">
                <input
                  type="text"
                  className="comment-name-input"
                  placeholder={isEn ? "Your Name (Optional)" : "اسمك الكريم (اختياري)..."}
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                />
              </div>
              <div className="comment-form-row">
                <textarea
                  className="comment-textarea"
                  placeholder={isEn ? "Share your technical perspective or feedback..." : "شاركنا رأيك أو استفسارك التقني حول المقال..."}
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  required
                />
              </div>
              <div className="comment-form-submit-row">
                <button 
                  type="submit" 
                  className="comment-submit-btn" 
                  disabled={isSubmitting || !commentText.trim()}
                >
                  <Send size={15} />
                  <span>{isEn ? "Post Comment" : "نشر التعليق"}</span>
                </button>
              </div>
            </form>

            {/* Existing Comments List */}
            <div className="article-comments-list">
              {comments.length === 0 ? (
                <div className="no-comments-prompt">
                  <p>{isEn ? "No comments yet. Be the first to share your thoughts!" : "لا توجد تعليقات بعد، كن أول من يشارك برأيه!"}</p>
                </div>
              ) : (
                comments.map((c) => (
                  <div key={c.id} className="comment-item-card">
                    <div className="comment-item-header">
                      <div className="comment-user-avatar">
                        <User size={15} />
                      </div>
                      <div className="comment-user-meta">
                        <span className="comment-author-name">{c.author}</span>
                        <span className="comment-date">{c.date}</span>
                      </div>
                    </div>
                    <p className="comment-item-body">{c.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleReaderModal;
