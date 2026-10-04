'use client';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import TableOfContents from '@/components/ui/TableOfContents';
import AuthorBioCard from './AuthorBioCard';

import React, { useState, useEffect, useCallback } from 'react';
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
  Home, 
  BookOpen
} from 'lucide-react';
import type { BlogArticle } from '@/data/blogArticlesData';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import { useSavedProjects } from '@/hooks/useSavedProjects';
import { requireAuth, apiRequest, AUTH_EVENT } from '@/lib/auth';
import ArticleComments from './ArticleComments';
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
  /** English TOC headings — used when the site language is English */
  tocEn?: TocHeading[] | null;
  related?: BlogArticle[];
  children?: React.ReactNode;
  /** Server-rendered questions & answers block (ContentQA) */
  qa?: React.ReactNode;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  toc = [],
  tocEn = null,
  related = [],
  children,
  qa
}) => {
  const router = useRouter();
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const tocItems = isEn && tocEn && tocEn.length ? tocEn : toc;
  const { isSaved, toggleSave } = useSavedProjects();

  const [copied, setCopied] = useState(false);
  // Real engagement from D1: null until the first response arrives.
  const [likes, setLikes] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likePending, setLikePending] = useState(false);
  const [commentCount, setCommentCount] = useState<number | null>(null);

  const likeUrl = `/api/articles/${encodeURIComponent(article.slug)}/like`;

  useEffect(() => {
    const loadLikes = () =>
      apiRequest<{ count: number; liked: boolean }>(likeUrl).then((res) => {
        if (res.ok) {
          setLikes(res.count);
          setIsLiked(res.liked);
        }
      });
    loadLikes();
    window.addEventListener(AUTH_EVENT, loadLikes);
    return () => window.removeEventListener(AUTH_EVENT, loadLikes);
  }, [likeUrl]);

  const handleToggleLike = async () => {
    if (!requireAuth() || likePending) return;
    const prevLiked = isLiked;
    const prevCount = likes ?? 0;
    const nextLiked = !prevLiked;
    setIsLiked(nextLiked);
    setLikes(Math.max(0, prevCount + (nextLiked ? 1 : -1)));
    setLikePending(true);
    const res = await apiRequest<{ count: number; liked: boolean }>(likeUrl, { method: nextLiked ? 'POST' : 'DELETE', body: {} });
    setLikePending(false);
    if (res.ok) {
      setLikes(res.count);
      setIsLiked(res.liked);
    } else {
      setLikes(prevCount);
      setIsLiked(prevLiked);
      if (res.status === 401) requireAuth();
    }
  };

  const handleCommentCount = useCallback((n: number) => setCommentCount(n), []);

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
  const authorRole = isEn ? article.author.roleEn : article.author.role;
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
              <span className="author-capsule-byline">
                <span className="author-capsule-by">{isEn ? 'By' : 'بقلم'}</span>{' '}
                <Link href="/about#team-showcase" rel="author" className="author-capsule-name">{authorName}</Link>
              </span>
              <span className="author-capsule-sub">
                <span className="author-capsule-role">{authorRole}</span>
                <span className="author-capsule-divider">|</span>
                <time dateTime={article.publishedAt} className="author-capsule-date" style={{ whiteSpace: 'nowrap' }}>
                  {publishDate}
                </time>
              </span>
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
              {likes !== null && <span>{likes}</span>}
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
              aria-label={isEn ? `Comments (${commentCount ?? 0})` : `التعليقات (${commentCount ?? 0})`}
            >
              <MessageSquare size={17} />
              {commentCount !== null && <span>{commentCount}</span>}
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

      {/* 3. Cover image (skipped when the article has none) */}
      {article.image && (
      <div className="project-featured-image-wrapper">
        <ResponsiveImage
          src={article.image}
          alt={title}
          className="project-featured-image"
          sizes="(max-width: 1279.98px) calc(100vw - 32px), 1200px"
          priority
        />
      </div>
      )}

      {/* Table of contents (phones & tablets) */}
      <TableOfContents
        variant="accordion"
        items={tocItems}
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
          {(() => {
            const tags = (isEn && article.tagsEn?.length ? article.tagsEn : article.tags) || [];
            if (!tags.length) return null;
            return (
              <div className="article-tags-wrap">
                {tags.map((tag, idx) => (
                  <span key={idx} className="article-tag-chip">
                    #{tag}
                  </span>
                ))}
              </div>
            );
          })()}

          {/* About the author (E-E-A-T) */}
          <AuthorBioCard isEn={isEn} />

          {/* Questions & answers about this article */}
          {qa}

          {/* Discussion (comments + replies from D1) */}
          <ArticleComments slug={article.slug} isEn={isEn} onCountChange={handleCommentCount} />

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
            items={tocItems}
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
