import React, { useState, useEffect, useMemo } from 'react';
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
  User,
  Home,
  BookOpen
} from 'lucide-react';
import { marked } from 'marked';
import type { BlogArticle, BlogComment } from '../../data/blogArticlesData';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { useSavedProjects } from '../../hooks/useSavedProjects';
import { getLoggedInUser, requireAuth } from '../../utils/authUtils';
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

  const [commentText, setCommentText] = useState('');
  const [copied, setCopied] = useState(false);
  const loggedUser = getLoggedInUser();

  // Scroll to top on article change and update SEO & Schema
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Dynamic Title
    document.title = `${article.seoTitle || article.title} | تكنو إنجاز`;

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', article.metaDescription || article.excerpt);

    // Canonical link
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', article.canonical);

    // Inject Schema.org JSON-LD (BlogPosting & Breadcrumbs)
    const scriptId = 'schema-article-jsonld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          "@id": `${article.canonical}#article`,
          "isPartOf": {
            "@type": "WebPage",
            "@id": article.canonical
          },
          "headline": article.title,
          "name": article.seoTitle,
          "description": article.metaDescription,
          "image": `https://techno-enjaz.com${article.image}`,
          "datePublished": "2026-09-20T00:00:00+03:00",
          "dateModified": "2026-09-20T00:00:00+03:00",
          "mainEntityOfPage": article.canonical,
          "author": {
            "@type": "Organization",
            "name": article.author.name,
            "url": "https://techno-enjaz.com"
          },
          "publisher": {
            "@type": "Organization",
            "name": "مكتب تكنو إنجاز",
            "url": "https://techno-enjaz.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://techno-enjaz.com/techno-logo.png"
            }
          },
          "inLanguage": "ar"
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${article.canonical}#breadcrumb`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "الرئيسية",
              "item": "https://techno-enjaz.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "المقالات",
              "item": "https://techno-enjaz.com/#articles"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": article.category,
              "item": `${article.canonical}`
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": article.title
            }
          ]
        }
      ]
    };

    scriptTag.text = JSON.stringify(schemaData);

    // Update URL hash for clean deep linking
    if (window.location.hash !== `#article/${article.slug}`) {
      window.history.replaceState(null, '', `#article/${article.slug}`);
    }

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [article]);

  const isItemSaved = isSaved(article.id);
  const title = isEn ? article.titleEn : article.title;
  const category = isEn ? article.categoryEn : article.category;
  const publishDate = isEn ? article.publishDateEn : article.publishDate;
  const readTime = isEn ? article.readTimeEn : article.readTime;
  const authorName = isEn ? article.author.nameEn : article.author.name;
  const excerpt = isEn ? article.excerptEn : article.excerpt;

  // Process raw markdown to HTML
  const parsedMarkdownHtml = useMemo(() => {
    if (!article.rawMarkdown) return '';

    // Strip front matter comments <!-- ... -->
    let cleanMd = article.rawMarkdown.replace(/^\s*<!--[\s\S]*?-->\s*/, '');
    // Strip SEO Title, Meta Description, Suggested Slug lines
    cleanMd = cleanMd.replace(/^(SEO Title|Meta Description|Suggested Slug):.*$/gim, '');
    // Strip leading H1 title `# Title` because H1 is rendered prominently by component
    cleanMd = cleanMd.replace(/^\s*#\s+[^\r\n]+[\r\n]*/, '');

    // Configure marked options
    marked.setOptions({
      gfm: true,
      breaks: true
    });

    try {
      const parsed = marked.parse(cleanMd.trim());
      if (typeof parsed === 'string') return parsed;
      return '';
    } catch (e) {
      console.error('Error parsing article markdown:', e);
      return '';
    }
  }, [article.rawMarkdown]);

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
    if (!requireAuth()) return;
    if (!commentText.trim()) return;

    const currentUser = getLoggedInUser();
    const commentAuthor = currentUser?.name || (isEn ? 'Techno User' : 'مستخدم تكنو');

    const newComment: BlogComment = {
      id: 'c-' + Date.now(),
      author: commentAuthor,
      date: isEn ? 'Just now' : 'الآن',
      text: commentText.trim()
    };

    onAddComment(newComment);
    setCommentText('');
  };

  // Intercept link clicks inside markdown for seamless SPA navigation
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLElement).closest('a');
    if (!target) return;

    const href = target.getAttribute('href');
    if (!href) return;

    // Handle internal article links like `#article/slug` or `/articles/slug`
    if (href.startsWith('#article/') || href.startsWith('/articles/')) {
      e.preventDefault();
      const slug = href.replace(/^#article\//, '').replace(/^\/articles\//, '').replace(/\/$/, '');
      const found = allArticles.find(a => a.slug === slug || a.id === slug);
      if (found) {
        onSelectArticle(found);
      }
      return;
    }

    // External links open safely in a new tab
    if (href.startsWith('http://') || href.startsWith('https://')) {
      target.setAttribute('target', '_blank');
      target.setAttribute('rel', 'noopener noreferrer');
    }
  };

  // Related articles (excluding current article)
  const relatedArticles = allArticles
    .filter(a => a.id !== article.id)
    .slice(0, 3);

  return (
    <article className="article-fullscreen-view" dir={isEn ? 'ltr' : 'rtl'}>
      {/* Top Breadcrumb & Actions Bar */}
      <div className="article-view-top-bar">
        {/* Semantic Breadcrumbs */}
        <nav className="article-breadcrumbs" aria-label="مسار التصفح">
          <ol className="breadcrumb-list">
            <li className="breadcrumb-item">
              <button 
                type="button" 
                className="breadcrumb-link-btn"
                onClick={() => { window.location.hash = ''; onBack(); }}
              >
                <Home size={14} />
                <span>{isEn ? 'Home' : 'الرئيسية'}</span>
              </button>
              <span className="breadcrumb-sep">/</span>
            </li>
            <li className="breadcrumb-item">
              <button 
                type="button" 
                className="breadcrumb-link-btn"
                onClick={onBack}
              >
                <BookOpen size={14} />
                <span>{isEn ? 'Articles' : 'المقالات'}</span>
              </button>
              <span className="breadcrumb-sep">/</span>
            </li>
            <li className="breadcrumb-item">
              <span className="breadcrumb-category-pill" style={{ borderColor: `${article.categoryColor}40`, color: article.categoryColor }}>
                {category}
              </span>
              <span className="breadcrumb-sep">/</span>
            </li>
            <li className="breadcrumb-item breadcrumb-current" aria-current="page">
              <span>{title}</span>
            </li>
          </ol>
        </nav>

        <div className="article-top-actions">
          <button 
            type="button" 
            className="article-back-nav-btn"
            onClick={onBack}
          >
            {isEn ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            <span>{isEn ? "Back to Articles" : "العودة للمقالات"}</span>
          </button>

          <button
            type="button"
            className="article-top-share-btn"
            onClick={handleShare}
            title={isEn ? "Share link" : "مشاركة الرابط"}
          >
            {copied ? <Check size={15} color="#10b981" /> : <Share2 size={15} />}
            <span>{copied ? (isEn ? "Copied!" : "تم النسخ!") : (isEn ? "Share" : "مشاركة")}</span>
          </button>
        </div>
      </div>

      <div className="article-fullscreen-layout">
        {/* Main Reading Column */}
        <div className="article-main-container">
          {/* Category Pill Tag & Read Time */}
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

          {/* Single H1 Headline */}
          <h1 className="article-fullscreen-title">
            {title}
          </h1>

          {/* Lead Excerpt */}
          <p className="article-fullscreen-excerpt">
            {excerpt}
          </p>

          {/* Author Capsule Row */}
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
                <span className="author-capsule-role">{article.author.role}</span>
                <span className="author-capsule-divider">|</span>
                <span className="author-capsule-date">{publishDate}</span>
              </div>
            </div>
          </div>

          {/* High-Definition Featured Banner */}
          <div className="article-fullscreen-banner-wrap">
            <img 
              src={article.image} 
              alt={title} 
              className="article-fullscreen-banner-img" 
              loading="eager"
            />
            <div className="article-banner-ambient-glow" style={{ backgroundColor: article.categoryColor }} />
          </div>

          {/* Rich Rendered Article Markdown Body */}
          <div 
            className="article-fullscreen-markdown-body"
            dangerouslySetInnerHTML={{ __html: parsedMarkdownHtml }}
            onClick={handleContentClick}
          />

          {/* Tags Row */}
          <div className="article-tags-wrap">
            {article.tags.map((tag, idx) => (
              <span key={idx} className="article-tag-chip">
                #{tag}
              </span>
            ))}
          </div>

          {/* Interactive Engagement Bar */}
          <div className="article-engagement-bar">
            <div className="engagement-left-actions">
              <button
                type="button"
                className={`article-action-btn like-btn ${isLiked ? 'active' : ''}`}
                onClick={onToggleLike}
              >
                <Heart size={18} fill={isLiked ? '#ef4444' : 'none'} color={isLiked ? '#ef4444' : 'currentColor'} />
                <span>{likes}</span>
              </button>

              <button
                type="button"
                className={`article-action-btn save-btn ${isItemSaved ? 'active' : ''}`}
                onClick={() => toggleSave({
                  id: article.id,
                  title: article.title,
                  titleEn: article.titleEn,
                  category: 'مقالات تقنية',
                  categoryLabel: category,
                  description: article.excerpt,
                  descriptionEn: article.excerptEn,
                  type: 'article',
                  image: article.image,
                  tags: article.tags
                })}
              >
                {isItemSaved ? <BookmarkCheck size={18} color="#0aeec3" /> : <Bookmark size={18} />}
                <span>{isItemSaved ? (isEn ? "Saved" : "محفوظ") : (isEn ? "Save" : "حفظ")}</span>
              </button>
            </div>

            <button
              type="button"
              className="article-action-btn share-btn"
              onClick={handleShare}
            >
              {copied ? <Check size={18} color="#10b981" /> : <Share2 size={18} />}
              <span>{copied ? (isEn ? "Copied" : "تم النسخ") : (isEn ? "Share" : "مشاركة")}</span>
            </button>
          </div>

          {/* Comments Section */}
          <section className="article-comments-section">
            <div className="comments-header">
              <MessageSquare size={20} color="#38bdf8" />
              <h3>{isEn ? `Comments (${comments.length})` : `التعليقات (${comments.length})`}</h3>
            </div>

            <form onSubmit={handleCommentSubmit} className="comment-input-form">
              <div className="comment-avatar-stub">
                {loggedUser?.avatar ? (
                  <img src={loggedUser.avatar} alt="User" className="user-avatar-mini" />
                ) : (
                  <User size={20} />
                )}
              </div>
              <input
                type="text"
                placeholder={isEn ? "Add a constructive comment..." : "أضف تعليقاً أو استفساراً تقنياً..."}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="comment-text-input"
              />
              <button type="submit" className="comment-submit-btn" disabled={!commentText.trim()}>
                <Send size={16} />
              </button>
            </form>

            <div className="comments-feed-list">
              {comments.length === 0 ? (
                <p className="no-comments-yet">
                  {isEn ? "No comments yet. Be the first to start the discussion!" : "لا توجد تعليقات بعد. كن أول من يشارك رأيه الهندسي!"}
                </p>
              ) : (
                comments.map((comm) => (
                  <div key={comm.id} className="comment-item-card">
                    <div className="comment-item-avatar">
                      {comm.avatar ? (
                        <img src={comm.avatar} alt={comm.author} />
                      ) : (
                        <div className="avatar-placeholder">{comm.author[0]}</div>
                      )}
                    </div>
                    <div className="comment-item-body">
                      <div className="comment-meta">
                        <span className="comment-author-name">{comm.author}</span>
                        <span className="comment-time-ago">{comm.date}</span>
                      </div>
                      <p className="comment-message-text">{comm.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Sidebar: Related Articles */}
        <aside className="article-related-sidebar">
          <div className="related-sidebar-header">
            <h3 className="related-sidebar-title">{isEn ? "Related Articles" : "مقالات ذات صلة"}</h3>
          </div>

          <div className="related-sidebar-list">
            {relatedArticles.map((relArt) => (
              <div
                key={relArt.id}
                className="related-sidebar-card"
                onClick={() => onSelectArticle(relArt)}
              >
                <div className="related-sidebar-media">
                  <img src={relArt.image} alt={relArt.title} className="related-sidebar-img" loading="lazy" />
                  <div className="related-sidebar-overlay" />
                </div>
                <div className="related-sidebar-body">
                  <span 
                    className="related-sidebar-category"
                    style={{ color: relArt.categoryColor }}
                  >
                    {isEn ? relArt.categoryEn : relArt.category}
                  </span>
                  <h4 className="related-sidebar-item-title">
                    {isEn ? relArt.titleEn : relArt.title}
                  </h4>
                  <div className="related-sidebar-author-row">
                    <span className="related-sidebar-author-name">{isEn ? relArt.author.nameEn : relArt.author.name}</span>
                    <span className="related-sidebar-time">
                      <Clock size={11} />
                      <span>{isEn ? relArt.readTimeEn : relArt.readTime}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </article>
  );
};

export default ArticleDetailView;
