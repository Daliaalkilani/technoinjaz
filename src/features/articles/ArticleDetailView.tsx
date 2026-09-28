'use client';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import TableOfContents from '@/components/ui/TableOfContents';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import type { BlogArticle, BlogComment } from '@/data/blogArticlesData';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import { useSavedProjects } from '@/hooks/useSavedProjects';
import { getLoggedInUser, requireAuth } from '@/lib/auth';
import { SITE_URL } from '@/config/site';
import './ArticleDetailView.css';

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

interface ArticleDetailViewProps {
  article: BlogArticle;
  toc?: TocHeading[];
  related?: BlogArticle[];
  children?: React.ReactNode;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  toc = [],
  related = [],
  children
}) => {
  const router = useRouter();
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const { isSaved, toggleSave } = useSavedProjects();

  const [commentText, setCommentText] = useState('');
  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState<number>(article.initialLikes);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [comments, setComments] = useState<BlogComment[]>(article.initialComments || []);

  // Sync likes and comments with localStorage
  useEffect(() => {
    try {
      const storedLikes = localStorage.getItem('techno_blog_likes');
      if (storedLikes) {
        const parsed = JSON.parse(storedLikes);
        if (parsed[article.id]) {
          setLikes(parsed[article.id].count);
          setIsLiked(parsed[article.id].userLiked);
        }
      }
    } catch (e) {}

    try {
      const storedComments = localStorage.getItem('techno_blog_comments');
      if (storedComments) {
        const parsed = JSON.parse(storedComments);
        if (parsed[article.id]) {
          setComments(parsed[article.id]);
        }
      }
    } catch (e) {}
  }, [article.id]);

  const handleToggleLike = () => {
    if (!requireAuth()) return;
    const nextLiked = !isLiked;
    const nextCount = nextLiked ? likes + 1 : Math.max(0, likes - 1);
    setIsLiked(nextLiked);
    setLikes(nextCount);

    try {
      const stored = localStorage.getItem('techno_blog_likes');
      const map = stored ? JSON.parse(stored) : {};
      map[article.id] = { count: nextCount, userLiked: nextLiked };
      localStorage.setItem('techno_blog_likes', JSON.stringify(map));
    } catch (e) {}
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requireAuth()) return;
    if (!commentText.trim()) return;

    const loggedUser = getLoggedInUser();
    const newComment: BlogComment = {
      id: `comm-${Date.now()}`,
      author: loggedUser?.name || (isEn ? 'Techno Engineer' : 'مهندس زائر'),
      avatar: '/images/team/abdulghani.jpg',
      text: commentText.trim(),
      date: isEn ? 'Just now' : 'الآن'
    };

    const nextComments = [newComment, ...comments];
    setComments(nextComments);
    setCommentText('');

    try {
      const stored = localStorage.getItem('techno_blog_comments');
      const map = stored ? JSON.parse(stored) : {};
      map[article.id] = nextComments;
      localStorage.setItem('techno_blog_comments', JSON.stringify(map));
    } catch (err) {}
  };

  const handleShare = () => {
    const url = `${SITE_URL}/articles/${article.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  // Intercept markdown clicks on internal links
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLElement).closest('a');
    if (!target) return;
    const href = target.getAttribute('href');
    if (href && href.startsWith('/') && !href.startsWith('//')) {
      e.preventDefault();
      router.push(href);
    }
  };

  const isItemSaved = isSaved(article.id);
  const title = isEn ? article.titleEn : article.title;
  const category = isEn ? article.categoryEn : article.category;
  const publishDate = isEn ? article.publishDateEn : article.publishDate;
  const readTime = isEn ? article.readTimeEn : article.readTime;
  const authorName = isEn ? article.author.nameEn : article.author.name;
  const excerpt = isEn ? article.excerptEn : article.excerpt;

  return (
    <article className="article-fullscreen-view" dir={isEn ? 'ltr' : 'rtl'}>
      {/* 1. Top Breadcrumb & Control Bar */}
      <div className="article-view-top-bar">
        <nav className="article-breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumb-list">
            <li className="breadcrumb-item">
              <Link href="/" className="breadcrumb-link-btn">
                <Home size={14} />
                <span>{isEn ? "Home" : "الرئيسية"}</span>
              </Link>
              <span className="breadcrumb-sep">/</span>
            </li>
            <li className="breadcrumb-item">
              <Link href="/articles" className="breadcrumb-link-btn">
                <BookOpen size={14} />
                <span>{isEn ? "Articles" : "المقالات"}</span>
              </Link>
              <span className="breadcrumb-sep">/</span>
            </li>
            <li className="breadcrumb-item">
              <span 
                className="breadcrumb-category-pill" 
                style={{ 
                  borderColor: `${article.categoryColor}40`, 
                  color: article.categoryColor,
                  backgroundColor: `${article.categoryColor}15`
                }}
              >
                {category}
              </span>
              <span className="breadcrumb-sep">/</span>
            </li>
            <li className="breadcrumb-item breadcrumb-current" aria-current="page">
              <span>{title}</span>
            </li>
          </ol>
        </nav>

      </div>

      <div className="article-fullscreen-layout">
        {/* Main Reading Column */}
        <div className="article-main-container">
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

          <h1 className="article-fullscreen-title">
            {title}
          </h1>

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
                <span className="author-capsule-name" style={{ whiteSpace: 'nowrap' }}>{authorName}</span>
                <span className="author-capsule-divider">|</span>
                <span className="author-capsule-role">{article.author.role}</span>
                <span className="author-capsule-divider">|</span>
                <time dateTime={article.publishedAt} className="author-capsule-date" style={{ whiteSpace: 'nowrap' }}>
                  {publishDate}
                </time>
              </div>
            </div>
          </div>

          {/* High-Definition Featured Banner */}
          <div className="article-fullscreen-banner-wrap">
            <ResponsiveImage 
              src={article.image} 
              alt={title} 
              className="article-fullscreen-banner-img" 
              sizes="(max-width: 1023.98px) 100vw, (max-width: 1720px) calc(100vw - 420px), 1280px"
              priority 
            />
            <div className="article-banner-ambient-glow" style={{ backgroundColor: article.categoryColor }} />
          </div>

          {/* Table of contents (phones & tablets) */}
          <TableOfContents
            variant="accordion"
            items={toc}
            title={isEn ? "Table of Contents" : "فهرس محتويات المقال"}
            countLabel={isEn ? `${toc.length} sections` : `${toc.length} فقرة`}
          />

          {/* Server-Rendered Markdown Body passed as children */}
          <div onClick={handleContentClick}>
            {children}
          </div>

          {/* Tags Row */}
          {article.tags && article.tags.length > 0 && (
            <div className="article-tags-wrap">
              {article.tags.map((tag, idx) => (
                <span key={idx} className="article-tag-chip">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Interactive Engagement Bar */}
          <div className="article-engagement-bar">
            <div className="engagement-left-actions">
              <button
                type="button"
                className={`article-action-btn like-btn ${isLiked ? 'active' : ''}`}
                onClick={handleToggleLike}
                title={isLiked ? (isEn ? "Unlike" : "إلغاء الإعجاب") : (isEn ? "Like" : "إعجاب")}
                aria-label={isLiked ? (isEn ? "Unlike" : "إلغاء الإعجاب") : (isEn ? "Like" : "إعجاب")}
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
                title={isItemSaved ? (isEn ? "Remove from Saved" : "إزالة من المحفوظات") : (isEn ? "Save Article" : "حفظ المقال")}
                aria-label={isItemSaved ? (isEn ? "Remove from Saved" : "إزالة من المحفوظات") : (isEn ? "Save Article" : "حفظ المقال")}
              >
                {isItemSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                <span>{isItemSaved ? (isEn ? "Saved" : "محفوظ") : (isEn ? "Save" : "حفظ")}</span>
              </button>
            </div>

            <button
              type="button"
              className="article-action-btn share-action-btn"
              onClick={handleShare}
              title={isEn ? "Share Article" : "مشاركة المقال"}
              aria-label={isEn ? "Share Article" : "مشاركة المقال"}
            >
              {copied ? <Check size={17} color="#10b981" /> : <Share2 size={17} />}
              <span>{copied ? (isEn ? "Link Copied" : "تم نسخ الرابط") : (isEn ? "Share" : "مشاركة")}</span>
            </button>
          </div>

          {/* End-of-article navigation: where readers decide what to do next */}
          <nav className="article-end-nav" aria-label={isEn ? "Article navigation" : "التنقل بين المقالات"}>
            <Link href="/articles" className="article-back-nav-btn">
              {isEn ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              <span>{isEn ? "Browse all articles" : "تصفّح كل المقالات"}</span>
            </Link>
          </nav>

          {/* Interactive Discussion Section */}
          <section className="article-discussion-section">
            <div className="discussion-header">
              <div className="discussion-title-wrap">
                <MessageSquare size={20} className="discussion-icon" />
                <h3 className="discussion-title">
                  {isEn ? `Technical Discussion (${comments.length})` : `النقاش الهندسي والملاحظات (${comments.length})`}
                </h3>
              </div>
            </div>

            <form onSubmit={handleAddComment} className="comment-input-form">
              <div className="comment-form-inner">
                <textarea
                  className="comment-textarea"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder={isEn ? "Add your engineering insight or technical query..." : "أضف تعليقك أو استفسارك الهندسي حول محتوى المقال..."}
                  aria-label={isEn ? "Technical comment" : "تعليقك الهندسي"}
                  rows={3}
                />
                <div className="comment-form-actions">
                  <button
                    type="submit"
                    className="comment-submit-btn"
                    disabled={!commentText.trim()}
                  >
                    <Send size={15} />
                    <span>{isEn ? "Post Comment" : "نشر التعليق"}</span>
                  </button>
                </div>
              </div>
            </form>

            <div className="comments-stream-list">
              {comments.length === 0 ? (
                <div className="no-comments-box">
                  <User size={32} className="no-comments-icon" />
                  <p>{isEn ? "Be the first to share an engineering perspective on this topic." : "كن أول من يشارك برأي أو استفسار هندسي حول هذا الموضوع."}</p>
                </div>
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

        {/* Sidebar: Table of Contents & Related Articles */}
        <aside className="article-related-sidebar">
          <TableOfContents
            variant="card"
            items={toc}
            title={isEn ? "Table of Contents" : "فهرس المقال"}
            countLabel={isEn ? `${toc.length} sections` : `${toc.length} فقرة`}
          />

          {related.length > 0 && (
            <div className="article-related-card">
              <div className="related-sidebar-header">
                <h3 className="related-sidebar-title">{isEn ? "Related Articles" : "مقالات ذات صلة"}</h3>
              </div>

              <div className="related-sidebar-list">
                {related.map((relArt) => (
                  <Link
                    key={relArt.id}
                    href={`/articles/${relArt.slug}`}
                    className="related-sidebar-card"
                  >
                    <div className="related-sidebar-media">
                      <ResponsiveImage src={relArt.image} alt={relArt.title} className="related-sidebar-img" sizes="(max-width: 1023.98px) 50vw, 300px" />
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
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
};

export default ArticleDetailView;
