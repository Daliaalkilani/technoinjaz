import React, { useState, useMemo, useEffect } from 'react';
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
import { blogArticlesData, blogCategories } from '../../data/blogArticlesData';
import type { BlogArticle, BlogComment } from '../../data/blogArticlesData';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { useSavedProjects } from '../../hooks/useSavedProjects';
import { requireAuth } from '../../utils/authUtils';
import ArticleDetailView from './ArticleDetailView';
import './OfficeBlogSection.css';

interface OfficeBlogSectionProps {
  showHeroBanner?: boolean;
  limit?: number;
  onNavigateToArticlesTab?: () => void;
}

export const OfficeBlogSection: React.FC<OfficeBlogSectionProps> = ({
  showHeroBanner = true,
  limit
}) => {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const { isSaved, toggleSave } = useSavedProjects();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState<'latest' | 'popular'>('latest');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Dedicated Full-Screen Article View
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  // Likes state: stored in localStorage
  const [likesState, setLikesState] = useState<Record<string, { count: number; userLiked: boolean }>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('techno_blog_likes');
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error('Error loading blog likes:', e);
      }
    }
    const initial: Record<string, { count: number; userLiked: boolean }> = {};
    blogArticlesData.forEach(art => {
      initial[art.id] = { count: art.initialLikes, userLiked: false };
    });
    return initial;
  });

  // Comments state: stored in localStorage
  const [commentsState, setCommentsState] = useState<Record<string, BlogComment[]>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('techno_blog_comments');
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error('Error loading blog comments:', e);
      }
    }
    const initial: Record<string, BlogComment[]> = {};
    blogArticlesData.forEach(art => {
      initial[art.id] = art.initialComments || [];
    });
    return initial;
  });

  // Handle Like Toggle
  const handleToggleLike = (articleId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
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

  // Add Comment Handler
  const handleAddComment = (articleId: string, comment: BlogComment) => {
    if (!requireAuth()) return;

    setCommentsState(prev => {
      const currentList = prev[articleId] || [];
      const updated = { ...prev, [articleId]: [comment, ...currentList] };
      try {
        localStorage.setItem('techno_blog_comments', JSON.stringify(updated));
      } catch (err) {
        console.error('Error saving comments:', err);
      }
      return updated;
    });
  };

  // Sync selected article with URL hash for SEO, direct links, and browser back/forward
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#article/')) {
        const targetSlug = hash.replace(/^#article\//, '').replace(/\/$/, '');
        const found = blogArticlesData.find(a => a.slug === targetSlug || a.id === targetSlug);
        if (found) {
          setSelectedArticle(found);
        }
      } else if (hash === '#articles' || (!hash.startsWith('#article/') && selectedArticle)) {
        setSelectedArticle(null);
      }
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, [selectedArticle]);

  // Handle Share Link
  const handleShare = (article: BlogArticle, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/#article/${article.slug}`);
      setCopiedId(article.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Active Category Object
  const currentCategoryObj = useMemo(() => {
    return blogCategories.find(c => c.id === selectedCategory) || blogCategories[0];
  }, [selectedCategory]);

  // Filter & Sort Logic
  const filteredArticles = useMemo(() => {
    let result = blogArticlesData.filter(art => {
      // Category Match
      const matchesCategory = 
        selectedCategory === 'all' || 
        (currentCategoryObj && (
          art.category.includes(currentCategoryObj.name) ||
          art.categoryEn.toLowerCase().includes(currentCategoryObj.nameEn.toLowerCase()) ||
          art.categoryEn.toLowerCase().includes(currentCategoryObj.id.toLowerCase())
        ));

      // Query Match (title, excerpt, author, tags)
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = 
        !q ||
        art.title.toLowerCase().includes(q) ||
        art.titleEn.toLowerCase().includes(q) ||
        art.excerpt.toLowerCase().includes(q) ||
        art.excerptEn.toLowerCase().includes(q) ||
        art.author.name.toLowerCase().includes(q) ||
        art.author.nameEn.toLowerCase().includes(q) ||
        art.category.toLowerCase().includes(q) ||
        art.tags.some(t => t.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });

    // Sort order: latest vs popular (based on likes)
    if (sortOrder === 'popular') {
      result = [...result].sort((a, b) => {
        const likesA = likesState[a.id]?.count || a.initialLikes;
        const likesB = likesState[b.id]?.count || b.initialLikes;
        return likesB - likesA;
      });
    }

    return result;
  }, [searchQuery, selectedCategory, sortOrder, likesState, currentCategoryObj]);

  const displayedArticles = limit ? filteredArticles.slice(0, limit) : filteredArticles;

  // If user selected an article, open dedicated Full-Screen Article View!
  if (selectedArticle) {
    const articleLikes = likesState[selectedArticle.id]?.count || selectedArticle.initialLikes;
    const articleIsLiked = likesState[selectedArticle.id]?.userLiked || false;
    const articleComments = commentsState[selectedArticle.id] || selectedArticle.initialComments || [];

    return (
      <ArticleDetailView
        article={selectedArticle}
        onBack={() => {
          setSelectedArticle(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectArticle={(art) => setSelectedArticle(art)}
        likes={articleLikes}
        isLiked={articleIsLiked}
        onToggleLike={() => handleToggleLike(selectedArticle.id)}
        comments={articleComments}
        onAddComment={(comment) => handleAddComment(selectedArticle.id, comment)}
        allArticles={blogArticlesData}
      />
    );
  }

  return (
    <div className="office-blog-section" dir={isEn ? 'ltr' : 'rtl'}>
      {/* 1. Optional Hero Header */}
      {showHeroBanner && (
        <div className="office-blog-header">
          <h1 className="blog-main-title">
            {isEn ? "Engineering Insights & Breakthroughs" : "المقالات والأبحاث الهندسية والتقنية"}
          </h1>
          <p className="blog-main-desc">
            {isEn
              ? "Deep technical explorations, system architectures, and interface methodologies authored by our elite engineering team."
              : "مقالات معمارية تخصصية، حلول برمجية متطورة، وتحليلات تقنية ينشرها نخبة مهندسينا لإثراء المحتوى الهندسي العربي."}
          </p>
        </div>
      )}

      {/* 2. Search Bar */}
      <div className="blog-search-bar-wrap">
        <div className="blog-search-inner-box">
          <input
            type="text"
            className="blog-search-pill-input"
            placeholder={isEn ? "Search in articles..." : "ابحث في المقالات..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* 3. Filter Buttons Row: Sort + Direct Category Pills (No overlapping dropdown!) */}
      <div className="blog-filters-capsule-row">
        {/* Latest Button */}
        <button
          type="button"
          className={`filter-capsule-btn ${sortOrder === 'latest' ? 'active' : ''}`}
          onClick={() => setSortOrder('latest')}
        >
          {isEn ? "Latest" : "الأحدث"}
        </button>

        {/* Most Read / Popular Button */}
        <button
          type="button"
          className={`filter-capsule-btn ${sortOrder === 'popular' ? 'active' : ''}`}
          onClick={() => setSortOrder('popular')}
        >
          {isEn ? "Most Read" : "الأكثر قراءة"}
        </button>

        <span className="blog-filters-divider" />

        {/* Categories Pills */}
        <div className="blog-category-chips-list">
          {blogCategories.map(cat => {
            const count = cat.id === 'all' 
              ? blogArticlesData.length 
              : blogArticlesData.filter(a => a.category.includes(cat.name) || a.categoryEn.toLowerCase().includes(cat.id)).length;
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
                onClick={() => setSelectedArticle(article)}
              >
                {/* 1. Image Media Container with rounded corners */}
                <div className="card-media-banner">
                  <img src={article.image} alt={title} className="card-media-img" loading="lazy" />
                  <div className="card-media-gradient-overlay" />
                </div>

                {/* 2. Card Content Body */}
                <div className="card-body-content">
                  {/* Category Pill & Reading Time Row */}
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

                  {/* Big Headline Title */}
                  <h3 className="card-main-title">{title}</h3>

                  {/* Excerpt Description */}
                  <p className="card-main-excerpt">{excerpt}</p>

                  {/* 3. Card Footer: Author Capsule & Share / Engagement (matching screenshot 1) */}
                  <div className="card-footer-capsule-row" onClick={(e) => e.stopPropagation()}>
                    {/* Author Pill Capsule */}
                    <div className="card-author-pill">
                      <img 
                        src={article.author.avatar} 
                        alt={authorName} 
                        className="author-pill-avatar" 
                      />
                      <span className="author-pill-name">{authorName}</span>
                      <span className="author-pill-divider">|</span>
                      <span className="author-pill-date">{publishDate}</span>
                    </div>

                    {/* Action Group: Share, Likes, Bookmark */}
                    <div className="card-action-icons-group">
                      {/* Like Button */}
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

                      {/* Save Button */}
                      <button
                        type="button"
                        className={`card-icon-action-btn ${isItemSaved ? 'saved' : ''}`}
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
                        title={isItemSaved ? (isEn ? "Saved" : "محفوظ") : (isEn ? "Save" : "حفظ")}
                      >
                        {isItemSaved ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
                      </button>

                      {/* Share Button */}
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
};

export default OfficeBlogSection;
