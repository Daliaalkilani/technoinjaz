import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  Heart, 
  MessageSquare, 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  X
} from 'lucide-react';
import { blogArticlesData, blogCategories } from '../../data/blogArticlesData';
import type { BlogArticle, BlogComment } from '../../data/blogArticlesData';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { useSavedProjects } from '../../hooks/useSavedProjects';
import ArticleReaderModal from './ArticleReaderModal';
import './OfficeBlogSection.css';

interface OfficeBlogSectionProps {
  showHeroBanner?: boolean;
  limit?: number;
  onNavigateToArticlesTab?: () => void;
}

export const OfficeBlogSection: React.FC<OfficeBlogSectionProps> = ({
  showHeroBanner = true,
  limit,
  onNavigateToArticlesTab
}) => {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const { isSaved, toggleSave } = useSavedProjects();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  // Reader Modal State
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);
  const [openAtComments, setOpenAtComments] = useState(false);

  // Sync likes to localStorage
  const handleToggleLike = (articleId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
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

  // Filter & Search Logic
  const filteredArticles = useMemo(() => {
    const activeCatObj = blogCategories.find(c => c.id === selectedCategory);

    return blogArticlesData.filter(art => {
      // Category Match
      const matchesCategory = 
        selectedCategory === 'all' || 
        (activeCatObj && (
          art.category.includes(activeCatObj.name) ||
          art.categoryEn.toLowerCase().includes(activeCatObj.nameEn.toLowerCase()) ||
          art.categoryEn.toLowerCase().includes(activeCatObj.id.toLowerCase())
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
  }, [searchQuery, selectedCategory]);

  const displayedArticles = limit ? filteredArticles.slice(0, limit) : filteredArticles;

  return (
    <div className="office-blog-section" dir={isEn ? 'ltr' : 'rtl'}>
      {/* Optional Hero Banner for Dedicated Page */}
      {showHeroBanner && (
        <div className="office-blog-header">
          <div className="blog-badge-pill">
            <Sparkles size={14} />
            <span>{isEn ? "Techno Enjaz Knowledge Hub" : "مدونة ومقالات مكتب تكنو إنجاز"}</span>
          </div>
          <h1 className="blog-main-title">
            {isEn ? "Engineering Perspectives & Research" : "أحدث الرؤى والأبحاث الهندسية والتقنية"}
          </h1>
          <p className="blog-main-desc">
            {isEn
              ? "Specialized articles, system architectures, and engineering breakthroughs authored by our elite tech leads and AI engineers."
              : "مقالات تخصصية، تصاميم معمارية، وحلول برمجية متقدمة ينشرها نخبة مهندسينا لتبادل المعرفة وإثراء المحتوى التقني العربي والعالمي."}
          </p>
        </div>
      )}

      {/* Control Bar: Real-time Search & Category Filters */}
      <div className="blog-controls-wrapper">
        {/* Search Input */}
        <div className="blog-search-container">
          <Search size={18} className="blog-search-icon" />
          <input
            type="text"
            className="blog-search-input"
            placeholder={isEn ? "Search articles by title, author, or keyword..." : "ابحث في المقالات، العناوين، أو أسماء المهندسين..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              type="button" 
              className="blog-search-clear-btn" 
              onClick={() => setSearchQuery('')}
              title={isEn ? "Clear search" : "مسح البحث"}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="blog-categories-pills">
          {blogCategories.map(cat => {
            const count = cat.id === 'all' 
              ? blogArticlesData.length 
              : blogArticlesData.filter(a => a.category.includes(cat.name) || a.categoryEn.toLowerCase().includes(cat.id)).length;
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                className={`blog-category-pill ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span>{isEn ? cat.nameEn : cat.name}</span>
                <span className="pill-count">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      {displayedArticles.length === 0 ? (
        <div className="blog-empty-state">
          <BookOpen size={48} className="blog-empty-icon" />
          <h3>{isEn ? "No Articles Found" : "لم يتم العثور على مقالات تطابق بحثك"}</h3>
          <p>{isEn ? "Try adjusting your search query or switching categories." : "جرب تعديل كلمات البحث أو تصفح تصنيف آخر."}</p>
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
            const currentComments = commentsState[article.id] || article.initialComments || [];
            const title = isEn ? article.titleEn : article.title;
            const excerpt = isEn ? article.excerptEn : article.excerpt;
            const category = isEn ? article.categoryEn : article.category;
            const readTime = isEn ? article.readTimeEn : article.readTime;
            const authorName = isEn ? article.author.nameEn : article.author.name;
            const authorRole = isEn ? article.author.roleEn : article.author.role;

            return (
              <article 
                key={article.id} 
                className="blog-card"
                onClick={() => {
                  setActiveArticle(article);
                  setOpenAtComments(false);
                }}
              >
                {/* Image Media Container */}
                <div className="blog-card-media-wrap">
                  <img src={article.image} alt={title} className="blog-card-img" loading="lazy" />
                  <div className="blog-card-media-gradient" />
                  <div className="blog-card-media-top">
                    <span 
                      className="blog-card-category"
                      style={{ 
                        backgroundColor: `${article.categoryColor}25`, 
                        color: article.categoryColor,
                        borderColor: `${article.categoryColor}50` 
                      }}
                    >
                      {category}
                    </span>
                    <span className="blog-card-read-time">
                      <Clock size={12} />
                      <span>{readTime}</span>
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="blog-card-content">
                  {/* Publisher / Author Row */}
                  <div className="blog-author-row">
                    <img 
                      src={article.author.avatar} 
                      alt={authorName} 
                      className="blog-author-avatar" 
                    />
                    <div className="blog-author-info">
                      <div className="blog-author-name-wrap">
                        <span className="blog-author-name">{authorName}</span>
                        <span className="blog-author-verified" title={isEn ? "Office Author" : "كاتب معتمد بالمكتب"}>
                          <CheckCircle2 size={12} color="var(--accent-cyan)" />
                        </span>
                      </div>
                      <span className="blog-author-role">{authorRole}</span>
                    </div>
                  </div>

                  {/* Article Title */}
                  <h3 className="blog-card-title">{title}</h3>

                  {/* Article Excerpt */}
                  <p className="blog-card-excerpt">{excerpt}</p>

                  {/* Tags */}
                  <div className="blog-card-tags">
                    {article.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="blog-card-tag">#{tag}</span>
                    ))}
                  </div>

                  {/* Interactive Action Bar: Likes, Comments, Save, Read */}
                  <div className="blog-card-footer" onClick={(e) => e.stopPropagation()}>
                    <div className="blog-actions-group">
                      {/* Like Button */}
                      <button
                        type="button"
                        className={`blog-action-btn like-btn ${currentLikes.userLiked ? 'liked' : ''}`}
                        onClick={(e) => handleToggleLike(article.id, e)}
                        title={currentLikes.userLiked ? (isEn ? "Liked" : "معجب بهذا") : (isEn ? "Like" : "إعجاب")}
                      >
                        <Heart 
                          size={15} 
                          fill={currentLikes.userLiked ? "#ef4444" : "none"} 
                          color={currentLikes.userLiked ? "#ef4444" : "currentColor"} 
                        />
                        <span>{currentLikes.count}</span>
                      </button>

                      {/* Comments Button */}
                      <button
                        type="button"
                        className="blog-action-btn comment-btn"
                        onClick={() => {
                          setActiveArticle(article);
                          setOpenAtComments(true);
                        }}
                        title={isEn ? "View Comments" : "عرض التعليقات"}
                      >
                        <MessageSquare size={15} />
                        <span>{currentComments.length}</span>
                      </button>

                      {/* Save / Bookmark Button */}
                      <button
                        type="button"
                        className={`blog-action-btn save-btn ${isItemSaved ? 'saved' : ''}`}
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
                        title={isItemSaved ? (isEn ? "Saved to Library" : "محفوظ في مكتبتك") : (isEn ? "Save Article" : "حفظ في المفضلة")}
                      >
                        {isItemSaved ? <BookmarkCheck size={15} color="var(--accent-cyan)" /> : <Bookmark size={15} />}
                      </button>
                    </div>

                    {/* Read More Link */}
                    <button
                      type="button"
                      className="blog-read-more-btn"
                      onClick={() => {
                        setActiveArticle(article);
                        setOpenAtComments(false);
                      }}
                    >
                      <span>{isEn ? "Read Article" : "قراءة المقال"}</span>
                      {isEn ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {limit && filteredArticles.length > limit && onNavigateToArticlesTab && (
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <button
            type="button"
            className="projects-view-all-btn"
            onClick={onNavigateToArticlesTab}
          >
            <span>{isEn ? 'View All Office Articles' : 'عرض كافة مقالات المكتب'}</span>
            {isEn ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
          </button>
        </div>
      )}

      {/* Reader Modal */}
      {activeArticle && (
        <ArticleReaderModal
          article={activeArticle}
          onClose={() => setActiveArticle(null)}
          likes={(likesState[activeArticle.id] || { count: activeArticle.initialLikes }).count}
          isLiked={(likesState[activeArticle.id] || { userLiked: false }).userLiked}
          onToggleLike={() => handleToggleLike(activeArticle.id)}
          comments={commentsState[activeArticle.id] || activeArticle.initialComments || []}
          onAddComment={(newComment) => handleAddComment(activeArticle.id, newComment)}
          initialScrollToComments={openAtComments}
        />
      )}
    </div>
  );
};

export default OfficeBlogSection;
