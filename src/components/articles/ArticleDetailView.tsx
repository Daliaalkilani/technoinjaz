import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  Heart, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Check, 
  MessageSquare, 
  Send, 
  Sparkles
} from 'lucide-react';
import type { BlogArticle, BlogComment } from '../../data/blogArticlesData';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { useSavedProjects } from '../../hooks/useSavedProjects';
import './ArticleDetailView.css';

interface ArticleDetailViewProps {
  article: BlogArticle;
  onBack: () => void;
  onSelectArticle: (article: BlogArticle) => void;
  likes: number;
  isLiked: boolean;
  onToggleLike: () => void;
  comments: BlogComment[];
  onAddComment: (comment: BlogComment) => void;
  allArticles: BlogArticle[];
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  onBack,
  onSelectArticle,
  likes,
  isLiked,
  onToggleLike,
  comments,
  onAddComment,
  allArticles
}) => {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const { isSaved, toggleSave } = useSavedProjects();

  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [copied, setCopied] = useState(false);

  // Scroll to top on article change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article.id]);

  const isItemSaved = isSaved(article.id);
  const title = isEn ? article.titleEn : article.title;
  const category = isEn ? article.categoryEn : article.category;
  const publishDate = isEn ? article.publishDateEn : article.publishDate;
  const readTime = isEn ? article.readTimeEn : article.readTime;
  const authorName = isEn ? article.author.nameEn : article.author.name;
  const excerpt = isEn ? article.excerptEn : article.excerpt;
  const content = isEn ? article.contentEn : article.content;

  const handleShare = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: BlogComment = {
      id: 'c-' + Date.now(),
      author: commentName.trim() || (isEn ? 'Engineering Visitor' : 'زائر مهتم'),
      date: isEn ? 'Just now' : 'الآن',
      text: commentText.trim()
    };

    onAddComment(newComment);
    setCommentText('');
  };

  // Find related articles (same category or others, excluding current)
  const relatedArticles = allArticles
    .filter(a => a.id !== article.id)
    .slice(0, 3);

  return (
    <article className="article-fullscreen-view" dir={isEn ? 'ltr' : 'rtl'}>
      {/* Top Breadcrumb / Back Navigation */}
      <div className="article-view-top-bar">
        <button 
          type="button" 
          className="article-back-nav-btn"
          onClick={onBack}
        >
          {isEn ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          <span>{isEn ? "Back to All Articles" : "العودة إلى كافة المقالات"}</span>
        </button>

        <div className="article-top-actions">
          <button
            type="button"
            className="article-top-share-btn"
            onClick={handleShare}
            title={isEn ? "Share link" : "مشاركة الرابط"}
          >
            {copied ? <Check size={16} color="#10b981" /> : <Share2 size={16} />}
            <span>{copied ? (isEn ? "Copied!" : "تم النسخ!") : (isEn ? "Share" : "مشاركة")}</span>
          </button>
        </div>
      </div>

      <div className="article-main-container">
        {/* Category Pill Tag (matching user screenshot 5) */}
        <div className="article-lead-category-wrap">
          <span 
            className="article-lead-category-pill"
            style={{ 
              backgroundColor: `${article.categoryColor}18`, 
              color: article.categoryColor,
              borderColor: `${article.categoryColor}35`
            }}
          >
            {category}
          </span>
          <span className="article-lead-readtime">
            <Clock size={13} />
            <span>{readTime}</span>
          </span>
        </div>

        {/* Massive Headline Title */}
        <h1 className="article-fullscreen-title">
          {title}
        </h1>

        {/* Lead Excerpt Paragraph */}
        <p className="article-fullscreen-excerpt">
          {excerpt}
        </p>

        {/* Author Capsule & Share Row (strictly matching user screenshot) */}
        <div className="article-author-capsule-row">
          <div className="article-author-capsule-pill">
            <img 
              src={article.author.avatar} 
              alt={authorName} 
              className="author-capsule-avatar" 
            />
            <div className="author-capsule-text">
              <span className="author-capsule-name">{authorName}</span>
              <span className="author-capsule-divider">|</span>
              <span className="author-capsule-date">{publishDate}</span>
            </div>
          </div>

          <button 
            type="button" 
            className="article-inline-share-btn"
            onClick={handleShare}
            title={isEn ? "Share article" : "مشاركة المقال"}
          >
            {copied ? <Check size={18} color="#10b981" /> : <Share2 size={18} />}
          </button>
        </div>

        {/* High-Definition Featured Banner */}
        <div className="article-fullscreen-banner-wrap">
          <img 
            src={article.image} 
            alt={title} 
            className="article-fullscreen-banner-img" 
          />
          <div className="article-banner-ambient-glow" style={{ backgroundColor: article.categoryColor }} />
        </div>

        {/* Article Body Content */}
        <div className="article-fullscreen-content">
          {content.map((paragraph, index) => (
            <p key={index} className="article-content-paragraph">
              {paragraph}
            </p>
          ))}

          {/* Key Insights Callout Box */}
          <div className="article-insight-callout" style={{ borderInlineStartColor: article.categoryColor }}>
            <div className="callout-header">
              <Sparkles size={18} style={{ color: article.categoryColor }} />
              <h4>{isEn ? "Techno Enjaz Engineering Principle" : "خلاصة الرؤية الهندسية في تكنو إنجاز"}</h4>
            </div>
            <p>
              {isEn 
                ? "Software architecture and design excellence are complementary pillars. True engineering resilience honors user attention, maintains verifiable security, and scales gracefully under peak real-world pressure."
                : "المعمارية البرمجية الرصينة وجماليات الواجهات ليست خيارات متناقضة؛ بل ركيزتان متكاملتان تصنعان منتجاً هندسياً يحترم انتباه المستخدم، يحقق أعلى مستويات الأمان، ويتوسع بكفاءة تحت أقصى ضغوط الاستخدام."}
            </p>
          </div>

          {/* Tags Row */}
          <div className="article-tags-wrap">
            {article.tags.map((tag, idx) => (
              <span key={idx} className="article-tag-chip">
                #{tag}
              </span>
            ))}
          </div>

          {/* Engagement Interactive Bar */}
          <div className="article-engagement-bar">
            <div className="engagement-actions-group">
              <button
                type="button"
                className={`engagement-btn like-btn ${isLiked ? 'liked' : ''}`}
                onClick={onToggleLike}
                title={isLiked ? (isEn ? "Unlike" : "إلغاء الإعجاب") : (isEn ? "Like" : "إعجاب")}
              >
                <Heart size={18} fill={isLiked ? "#ef4444" : "none"} color={isLiked ? "#ef4444" : "currentColor"} />
                <span>{likes}</span>
              </button>

              <button
                type="button"
                className={`engagement-btn save-btn ${isItemSaved ? 'saved' : ''}`}
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
                    tags: article.tags
                  });
                }}
                title={isItemSaved ? (isEn ? "Saved" : "محفوظ") : (isEn ? "Save" : "حفظ المقال")}
              >
                {isItemSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                <span>{isItemSaved ? (isEn ? "Saved" : "محفوظ") : (isEn ? "Save" : "حفظ")}</span>
              </button>
            </div>

            <button
              type="button"
              className="engagement-share-pill"
              onClick={handleShare}
            >
              {copied ? <Check size={16} color="#10b981" /> : <Share2 size={16} />}
              <span>{copied ? (isEn ? "Link Copied!" : "تم نسخ الرابط!") : (isEn ? "Share Article" : "مشاركة المقالة")}</span>
            </button>
          </div>

          {/* Comments Section */}
          <section className="article-comments-section" id="comments">
            <div className="comments-section-header">
              <div className="comments-header-title">
                <MessageSquare size={20} style={{ color: 'var(--accent-cyan, #00d2ff)' }} />
                <h3>{isEn ? `Discussion & Insights (${comments.length})` : `نقاشات وتعليقات المهندسين (${comments.length})`}</h3>
              </div>
            </div>

            {/* Comment Form */}
            <form className="article-comment-form" onSubmit={handleCommentSubmit}>
              <div className="comment-inputs-row">
                <input
                  type="text"
                  placeholder={isEn ? "Your Name (Optional)" : "اسمك (اختياري)"}
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="comment-name-field"
                />
              </div>
              <div className="comment-textarea-wrap">
                <textarea
                  placeholder={isEn ? "Share your engineering feedback, inquiry, or insights..." : "شاركنا رأيك أو استفسارك الهندسي حول هذا المقال..."}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="comment-text-field"
                  rows={3}
                  required
                />
                <button type="submit" className="comment-submit-btn">
                  <Send size={16} />
                  <span>{isEn ? "Post" : "إرسال"}</span>
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="article-comments-list">
              {comments.length === 0 ? (
                <div className="no-comments-msg">
                  <p>{isEn ? "Be the first to comment on this article!" : "كن أول من يشارك برأيه حول هذا المقال الهندسي!"}</p>
                </div>
              ) : (
                comments.map((c) => (
                  <div key={c.id} className="article-comment-item">
                    <div className="comment-avatar-placeholder">
                      {c.author.charAt(0).toUpperCase()}
                    </div>
                    <div className="comment-bubble">
                      <div className="comment-bubble-header">
                        <span className="comment-author-name">{c.author}</span>
                        <span className="comment-date-meta">{c.date}</span>
                      </div>
                      <p className="comment-body-text">{c.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* ==========================================================================
            RELATED ARTICLES (مقالات ذات صلة - matching user screenshot media_1789724320519.png)
            ========================================================================== */}
        <section className="article-related-section">
          <div className="related-section-header">
            <h2 className="related-section-title">
              {isEn ? "Related Articles" : "مقالات ذات صلة"}
            </h2>
          </div>

          <div className="related-articles-grid">
            {relatedArticles.map((rel) => {
              const relTitle = isEn ? rel.titleEn : rel.title;
              const relCategory = isEn ? rel.categoryEn : rel.category;
              const relReadTime = isEn ? rel.readTimeEn : rel.readTime;
              const relAuthor = isEn ? rel.author.nameEn : rel.author.name;
              const relDate = isEn ? rel.publishDateEn : rel.publishDate;
              const relExcerpt = isEn ? rel.excerptEn : rel.excerpt;

              return (
                <div 
                  key={rel.id} 
                  className="related-article-card"
                  onClick={() => onSelectArticle(rel)}
                >
                  {/* Card Cover Image */}
                  <div className="related-card-media">
                    <img src={rel.image} alt={relTitle} className="related-card-img" />
                    <div className="related-card-overlay" />
                  </div>

                  {/* Card Body */}
                  <div className="related-card-body">
                    {/* Category & Read Time Row */}
                    <div className="related-card-meta-row">
                      <span 
                        className="related-category-pill"
                        style={{ 
                          backgroundColor: `${rel.categoryColor}18`, 
                          color: rel.categoryColor,
                          borderColor: `${rel.categoryColor}35`
                        }}
                      >
                        {relCategory}
                      </span>
                      <span className="related-readtime">
                        <Clock size={12} />
                        <span>{relReadTime}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="related-card-title">{relTitle}</h3>

                    {/* Excerpt */}
                    <p className="related-card-excerpt">{relExcerpt}</p>

                    {/* Card Footer: Author Capsule & Share */}
                    <div className="related-card-footer" onClick={(e) => e.stopPropagation()}>
                      <div className="related-author-capsule">
                        <img 
                          src={rel.author.avatar} 
                          alt={relAuthor} 
                          className="related-author-avatar" 
                        />
                        <span className="related-author-name">{relAuthor}</span>
                        <span className="related-author-divider">|</span>
                        <span className="related-author-date">{relDate}</span>
                      </div>

                      <button
                        type="button"
                        className="related-card-share-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(`${window.location.origin}/#articles`);
                          }
                        }}
                        title={isEn ? "Share" : "مشاركة"}
                      >
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </article>
  );
};

export default ArticleDetailView;
