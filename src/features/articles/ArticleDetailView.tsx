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
import '@/features/projects/ProjectDetailView.css';
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
  /** Server-rendered questions & answers block (ContentQA) */
  qa?: React.ReactNode;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  toc = [],
  related = [],
  children,
  qa
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

  const saveArticle = () => toggleSave({
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
  });

  // Same layout as a project page (shared project-* layout classes): breadcrumbs,
  // full-width header with the action bar, full-width cover, then content + sticky
  // sidebar (TOC, related) on desktop. "Related" appears once: in the sidebar on
  // desktop, as the bottom grid only where the sidebar is hidden (tablet/phone).
  return (
    <article className="project-detail-container article-detail-container" dir={isEn ? 'ltr' : 'rtl'}>
      {/* 1. Breadcrumbs */}
      <nav className="project-breadcrumbs" aria-label={isEn ? "Breadcrumb navigation" : "مسار التصفح"}>
        <Link href="/" className="breadcrumb-link">
          <Home size={14} />
          <span>{isEn ? "Home" : "الرئيسية"}</span>
        </Link>
        <span className="breadcrumb-separator">/</span>
        <Link href="/articles" className="breadcrumb-link">
          <BookOpen size={14} />
          <span>{isEn ? "Articles" : "المقالات"}</span>
        </Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-category" style={{ color: article.categoryColor }}>{category}</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current" aria-current="page" title={title}>
          {title}
        </span>
      </nav>

      {/* 2. Header */}
      <header className="project-detail-header">
        <div className="article-lead-category-wrap">
          <span
            className="project-category-badge"
            style={{
              backgroundColor: `${article.categoryColor}18`,
              color: article.categoryColor,
              borderColor: `${article.categoryColor}40`
            }}
          >
            <BookOpen size={14} />
            <span>{category}</span>
          </span>
          <span className="article-lead-readtime">
            <Clock size={13} />
            <span>{readTime}</span>
          </span>
        </div>

        <h1 className="project-detail-title">{title}</h1>

        <p className="project-detail-lead">{excerpt}</p>

        {/* Author */}
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
              <time dateTime={article.publishedAt} className="author-capsule-date" style={{ whiteSpace: 'nowrap' }}>
                {publishDate}
              </time>
            </div>
          </div>
        </div>

        {/* Actions bar (same place as on a project page) */}
        <div className="project-meta-action-bar">
          <div className="project-action-buttons">
            <button
              type="button"
              className={`project-icon-btn like-btn ${isLiked ? 'active' : ''}`}
              onClick={handleToggleLike}
              title={isLiked ? (isEn ? "Unlike" : "إلغاء الإعجاب") : (isEn ? "Like" : "إعجاب")}
              aria-label={isLiked ? (isEn ? "Unlike" : "إلغاء الإعجاب") : (isEn ? "Like" : "إعجاب")}
              aria-pressed={isLiked}
            >
              <Heart size={18} fill={isLiked ? '#ef4444' : 'none'} color={isLiked ? '#ef4444' : 'currentColor'} />
              <span>{likes}</span>
            </button>

            <button
              type="button"
              className={`project-icon-btn ${isItemSaved ? 'active' : ''}`}
              onClick={saveArticle}
              title={isItemSaved ? (isEn ? "Remove from Saved" : "إزالة من المحفوظات") : (isEn ? "Save Article" : "حفظ المقال")}
              aria-pressed={isItemSaved}
            >
              {isItemSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
              <span className="btn-text-responsive">{isItemSaved ? (isEn ? "Saved" : "محفوظ") : (isEn ? "Save" : "حفظ")}</span>
            </button>

            <button
              type="button"
              className="project-icon-btn"
              onClick={() => {
                document.getElementById('article-discussion')?.scrollIntoView({ behavior: 'smooth' });
                document.querySelector<HTMLTextAreaElement>('.comment-textarea')?.focus({ preventScroll: true });
              }}
              title={isEn ? "Comments" : "التعليقات"}
              aria-label={isEn ? `Comments (${comments.length})` : `التعليقات (${comments.length})`}
            >
              <MessageSquare size={17} />
              <span>{comments.length}</span>
            </button>

            <button
              type="button"
              className="project-icon-btn"
              onClick={handleShare}
              title={isEn ? "Share Article" : "مشاركة المقال"}
            >
              {copied ? <Check size={18} style={{ color: '#10b981' }} /> : <Share2 size={18} />}
              <span className="btn-text-responsive">{copied ? (isEn ? "Copied" : "تم النسخ!") : (isEn ? "Share" : "مشاركة")}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. Cover image */}
      <div className="project-featured-image-wrapper">
        <ResponsiveImage
          src={article.image}
          alt={title}
          className="project-featured-image"
          sizes="(max-width: 1279.98px) calc(100vw - 32px), 1200px"
          priority
        />
      </div>

      {/* Table of contents (phones & tablets) */}
      <TableOfContents
        variant="accordion"
        items={toc}
        title={isEn ? "Table of Contents" : "فهرس محتويات المقال"}
      />

      {/* 4. Content + sidebar */}
      <div className="project-content-grid">
        <div className="project-markdown-body article-body-column">
          {/* Server-rendered markdown body */}
          <div onClick={handleContentClick}>
            {children}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="article-tags-wrap">
              {article.tags.map((tag, idx) => (
                <span key={idx} className="article-tag-chip">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Questions & answers about this article */}
          {qa}

          {/* Discussion */}
          <section className="article-discussion-section" id="article-discussion">
            <div className="discussion-header">
              <div className="discussion-title-wrap">
                <MessageSquare size={20} className="discussion-icon" />
                <h2 className="discussion-title">
                  {isEn ? `Technical Discussion (${comments.length})` : `النقاش الهندسي والملاحظات (${comments.length})`}
                </h2>
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

          {/* End-of-article navigation */}
          <nav className="project-end-nav" aria-label={isEn ? "Article navigation" : "التنقل بين المقالات"}>
            <Link href="/articles" className="project-back-link">
              {isEn ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              <span>{isEn ? "Browse all articles" : "تصفّح كل المقالات"}</span>
            </Link>
          </nav>
        </div>

        {/* Desktop sticky sidebar: TOC + related articles */}
        <aside className="project-sidebar">
          <TableOfContents
            variant="card"
            items={toc}
            title={isEn ? "Table of Contents" : "فهرس المقال"}
          />

          {related.length > 0 && (
            <div className="sidebar-related-card">
              <h2 className="related-title">{isEn ? "Related Articles" : "مقالات ذات صلة"}</h2>
              <div className="related-list">
                {related.map((relArt) => (
                  <Link
                    key={relArt.id}
                    href={`/articles/${relArt.slug}`}
                    className="related-project-item"
                  >
                    <ResponsiveImage
                      src={relArt.image}
                      alt={isEn ? relArt.titleEn : relArt.title}
                      className="related-project-img"
                      sizes="96px"
                    />
                    <div className="related-project-info">
                      <span className="related-project-cat" style={{ color: relArt.categoryColor }}>
                        {isEn ? relArt.categoryEn : relArt.category}
                      </span>
                      <h3 className="related-project-name">{isEn ? relArt.titleEn : relArt.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Related grid: only where the sidebar is hidden (tablet/phone) */}
      {related.length > 0 && (
        <section className="bottom-related-section bottom-related--no-sidebar">
          <div className="section-header">
            <h2 className="section-title">
              {isEn ? "Related Articles & Studies" : "مقالات ودراسات ذات صلة"}
            </h2>
          </div>

          <div className="bottom-related-grid">
            {related.map((relArt) => (
              <Link
                key={relArt.id}
                href={`/articles/${relArt.slug}`}
                className="bottom-related-card"
              >
                <div className="related-card-img-wrap">
                  <ResponsiveImage
                    src={relArt.image}
                    alt={isEn ? relArt.titleEn : relArt.title}
                    className="bottom-card-img"
                    sizes="(max-width: 639.98px) 100vw, 50vw"
                  />
                  <span className="bottom-card-badge">{isEn ? relArt.categoryEn : relArt.category}</span>
                </div>
                <div className="bottom-card-body">
                  <h3 className="bottom-card-title">{isEn ? relArt.titleEn : relArt.title}</h3>
                  <p className="bottom-card-desc">{isEn ? relArt.excerptEn : relArt.excerpt}</p>
                  <div className="bottom-card-footer">
                    <span className="bottom-card-link">
                      <span>{isEn ? "Read article" : "اقرأ المقال"}</span>
                      {isEn ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default ArticleDetailView;
