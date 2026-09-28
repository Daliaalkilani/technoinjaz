'use client';
import ResponsiveImage from '@/components/ui/ResponsiveImage';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Heart, 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  Share2, 
  X, 
  Check, 
  BookOpen
} from 'lucide-react';
import { blogCategories, type BlogArticle, type BlogComment } from '@/data/blogArticlesData';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import { useSavedProjects } from '@/hooks/useSavedProjects';
import { requireAuth } from '@/utils/authUtils';
import { SITE_URL } from '@/config/site';
import './OfficeBlogSection.css';

interface ArticlesListingProps {
  articles: BlogArticle[];
  showHeroBanner?: boolean;
}

export function ArticlesListing({
  articles,
  showHeroBanner = true
}: ArticlesListingProps) {
  const { lang, t } = useThemeLanguage();
  const isEn = lang === 'en';
  const { isSaved, toggleSave } = useSavedProjects();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState<'latest' | 'popular'>('latest');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Helper to build initial likes from data
  const getInitialLikes = () => {
    const initial: Record<string, { count: number; userLiked: boolean }> = {};
    articles.forEach(art => {
      initial[art.id] = { count: art.initialLikes, userLiked: false };
    });
    return initial;
  };

  // Helper to build initial comments from data
  const getInitialComments = () => {
    const initial: Record<string, BlogComment[]> = {};
    articles.forEach(art => {
      initial[art.id] = art.initialComments || [];
    });
    return initial;
  };

  const [likesState, setLikesState] = useState<Record<string, { count: number; userLiked: boolean }>>(getInitialLikes);
  const [_commentsState, setCommentsState] = useState<Record<string, BlogComment[]>>(getInitialComments);

  useEffect(() => {
    try {
      const storedLikes = localStorage.getItem('techno_blog_likes');
      if (storedLikes) {
        setLikesState(JSON.parse(storedLikes));
      }
    } catch (e) {
      console.error('Error loading blog likes:', e);
    }

    try {
      const storedComments = localStorage.getItem('techno_blog_comments');
      if (storedComments) {
        setCommentsState(JSON.parse(storedComments));
      }
    } catch (e) {
      console.error('Error loading blog comments:', e);
    }
  }, []);

  const handleToggleLike = (articleId: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!requireAuth()) return;

    setLikesState(prev => {
      const current = prev[articleId] || { count: 0, userLiked: false };
      const userLiked = !current.userLiked;
      const count = userLiked ? current.count + 1 : Math.max(0, current.count - 1);
      const updated = { ...prev, [articleId]: { count, userLiked } };
      try {
        localStorage.setItem('techno_blog_likes', JSON.stringify(updated));
      } catch (err) {
        console.error('Error saving likes:', err);
      }
      return updated;
    });
  };

  const handleShare = (article: BlogArticle, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const url = `${SITE_URL}/articles/${article.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedId(article.id);
        setTimeout(() => setCopiedId(null), 2500);
      });
    }
  };

  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      const matchesCategory = selectedCategory === 'all' || 
        art.category.includes(selectedCategory) || 
        art.categoryEn.toLowerCase().includes(selectedCategory.toLowerCase());

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        art.title.toLowerCase().includes(query) ||
        art.titleEn.toLowerCase().includes(query) ||
        art.excerpt.toLowerCase().includes(query) ||
        art.tags.some(tag => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  const displayedArticles = useMemo(() => {
    const list = [...filteredArticles];
    if (sortOrder === 'latest') {
      list.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else if (sortOrder === 'popular') {
      list.sort((a, b) => {
        const likesA = likesState[a.id]?.count || a.initialLikes;
        const likesB = likesState[b.id]?.count || b.initialLikes;
        return likesB - likesA;
      });
    }
    return list;
  }, [filteredArticles, sortOrder, likesState]);

  return (
    <div className="office-blog-section" dir={isEn ? 'ltr' : 'rtl'}>
      {showHeroBanner && (
        <div className="office-blog-header">
          <h1 className="blog-main-title">
            {isEn ? (t.articles?.pageTitle || "Engineering Insights & Breakthroughs") : (t.articles?.pageTitle || "المقالات والأبحاث الهندسية والتقنية")}
          </h1>
          <p className="blog-main-desc">
            {isEn 
              ? (t.articles?.pageSubtitle || "Deep technical explorations, system architectures, and interface methodologies authored by our elite engineering team.")
              : (t.articles?.pageSubtitle || "مقالات معمارية تخصصية، حلول برمجية متطورة، وتحليلات تقنية ينشرها نخبة مهندسينا لإثراء المحتوى الهندسي العربي.")}
          </p>
        </div>
      )}

      {/* 2. Search Bar */}
      <div className="blog-search-bar-wrap">
        <div className="blog-search-inner-box">
          <input 
            type="text"
            className="blog-search-pill-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isEn ? "Search in articles..." : "ابحث في المقالات..."}
          />
          <Search size={18} className="blog-search-pill-icon" />
          {searchQuery && (
            <button 
              type="button" 
              className="blog-search-clear-pill-btn"
              onClick={() => setSearchQuery('')}
              title={isEn ? "Clear search" : "مسح"}
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* 3. Filter Buttons Row: Sort + Category Chips */}
      <div className="blog-filters-capsule-row">
        <button
          type="button"
          className={`filter-capsule-btn ${sortOrder === 'latest' ? 'active' : ''}`}
          onClick={() => setSortOrder('latest')}
        >
          {isEn ? "Latest" : "الأحدث"}
        </button>
        <button
          type="button"
          className={`filter-capsule-btn ${sortOrder === 'popular' ? 'active' : ''}`}
          onClick={() => setSortOrder('popular')}
        >
          {isEn ? "Most Read" : "الأكثر قراءة"}
        </button>

        <span className="blog-filters-divider" />

        <div className="blog-category-chips-list">
          {blogCategories.map(cat => {
            const count = cat.id === 'all' 
              ? articles.length 
              : articles.filter(a => a.category.includes(cat.name) || a.categoryEn.toLowerCase().includes(cat.id)).length;
            const isCatActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                className={`filter-category-chip ${isCatActive ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span>{isEn ? cat.nameEn : cat.name}</span>
                <span className="category-chip-count">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Articles Grid */}
      {displayedArticles.length === 0 ? (
        <div className="blog-empty-state">
          <BookOpen size={48} className="blog-empty-icon" />
          <h3>{isEn ? "No Articles Found" : "لم يتم العثور على مقالات تطابق بحثك"}</h3>
          <p>{isEn ? "Try adjusting your search query or selecting another category." : "جرب تعديل كلمات البحث أو اختيار تصنيف آخر."}</p>
          <button
            type="button"
            className="blog-reset-btn"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          >
            {isEn ? "Show All Articles" : "عرض كافة المقالات"}
          </button>
        </div>
      ) : (
        <div className="blog-cards-grid">
          {displayedArticles.map((article) => {
            const isItemSaved = isSaved(article.id);
            const currentLikes = likesState[article.id] || { count: article.initialLikes, userLiked: false };
            const title = isEn ? article.titleEn : article.title;
            const excerpt = isEn ? article.excerptEn : article.excerpt;
            const category = isEn ? article.categoryEn : article.category;
            const readTime = isEn ? article.readTimeEn : article.readTime;
            const authorName = isEn ? article.author.nameEn : article.author.name;
            const publishDate = isEn ? article.publishDateEn : article.publishDate;

            return (
              <article 
                key={article.id} 
                className="blog-modern-card"
                onClick={() => router.push(`/articles/${article.slug}`)}
              >
                {/* 1. Image Media Container */}
                <div className="card-media-banner">
                  <ResponsiveImage src={article.image} alt={title} className="card-media-img" />
                  <div className="card-media-gradient-overlay" />
                </div>

                {/* 2. Card Content Body */}
                <div className="card-body-content">
                  <div className="card-meta-category-row">
                    <span 
                      className="card-category-capsule"
                      style={{ 
                        backgroundColor: `${article.categoryColor}18`, 
                        color: article.categoryColor,
                        borderColor: `${article.categoryColor}35`
                      }}
                    >
                      {category}
                    </span>

                    <span className="card-readtime-capsule">
                      <Clock size={12} />
                      <span>{readTime}</span>
                    </span>
                  </div>

                  <h3 className="card-main-title">
                    <Link href={`/articles/${article.slug}`} className="card-main-title-link">
                      {title}
                    </Link>
                  </h3>

                  <p className="card-main-excerpt">{excerpt}</p>

                  {/* 3. Card Footer */}
                  <div className="card-footer-capsule-row" onClick={(e) => e.stopPropagation()}>
                    <div className="card-author-pill" style={{ whiteSpace: 'nowrap' }}>
                      <img 
                        src={article.author.avatar} 
                        alt={authorName} 
                        className="author-pill-avatar" 
                      />
                      <span className="author-pill-name" style={{ whiteSpace: 'nowrap' }}>{authorName}</span>
                      <span className="author-pill-divider">|</span>
                      <time dateTime={article.publishedAt} className="author-pill-date" style={{ whiteSpace: 'nowrap' }}>
                        {publishDate}
                      </time>
                    </div>

                    <div className="card-action-icons-group">
                      <button
                        type="button"
                        className={`card-icon-action-btn ${currentLikes.userLiked ? 'liked' : ''}`}
                        onClick={(e) => handleToggleLike(article.id, e)}
                        title={currentLikes.userLiked ? (isEn ? "Liked" : "معجب") : (isEn ? "Like" : "إعجاب")}
                      >
                        <Heart 
                          size={15} 
                          fill={currentLikes.userLiked ? "#ef4444" : "none"} 
                          color={currentLikes.userLiked ? "#ef4444" : "currentColor"} 
                        />
                        <span className="icon-action-count">{currentLikes.count}</span>
                      </button>

                      <button
                        type="button"
                        className={`card-icon-action-btn ${isItemSaved ? 'saved' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
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
                        title={isItemSaved ? (isEn ? "Saved" : "محفوظ") : (isEn ? "Save" : "حفظ")}
                      >
                        {isItemSaved ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
                      </button>

                      <button
                        type="button"
                        className="card-icon-action-btn share-btn"
                        onClick={(e) => handleShare(article, e)}
                        title={isEn ? "Share link" : "مشاركة الرابط"}
                      >
                        {copiedId === article.id ? <Check size={15} color="#10b981" /> : <Share2 size={15} />}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ArticlesListing;
