import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Layers, 
  Cpu, 
  Eye, 
  Bot, 
  Globe, 
  Smartphone,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { useSavedProjects } from '../../hooks/useSavedProjects';
import { PROJECTS_DATA, getProjectBySlug, type ProjectItem, type ProjectCategory } from '../../data/projectsData';
import ProjectDetailView from './ProjectDetailView';
import './ProjectsCatalogSection.css';

interface ProjectsCatalogSectionProps {
  initialSlug?: string;
}

export const ProjectsCatalogSection: React.FC<ProjectsCatalogSectionProps> = ({ initialSlug }) => {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const { isSaved, toggleSave } = useSavedProjects();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(() => {
    if (initialSlug) {
      return getProjectBySlug(initialSlug) || null;
    }
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#project/')) {
      const slug = window.location.hash.replace('#project/', '');
      return getProjectBySlug(slug) || null;
    }
    return null;
  });

  // Listen to hash changes for deep linking to #project/:slug
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#project/')) {
        const slug = hash.replace('#project/', '');
        const found = getProjectBySlug(slug);
        if (found) {
          setActiveProject(found);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (hash === '#projects') {
        setActiveProject(null);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const categories = useMemo(() => [
    { key: 'all' as ProjectCategory, labelAr: 'الكل', labelEn: 'All Projects', icon: <Layers size={16} /> },
    { key: 'vision' as ProjectCategory, labelAr: 'رؤية حاسوبية', labelEn: 'Computer Vision', icon: <Eye size={16} /> },
    { key: 'ai' as ProjectCategory, labelAr: 'ذكاء اصطناعي', labelEn: 'Artificial Intelligence', icon: <Cpu size={16} /> },
    { key: 'systems' as ProjectCategory, labelAr: 'روبوتات وأنظمة مدمجة', labelEn: 'Robotics & Systems', icon: <Bot size={16} /> },
    { key: 'web' as ProjectCategory, labelAr: 'منصات ويب وسحابية', labelEn: 'Web & Cloud', icon: <Globe size={16} /> },
    { key: 'mobile' as ProjectCategory, labelAr: 'تطبيقات موبايل', labelEn: 'Mobile Apps', icon: <Smartphone size={16} /> },
  ], []);

  // Filter projects by category and search term
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const term = searchTerm.trim().toLowerCase();
      if (!term) return matchesCategory;

      const matchesSearch = 
        p.title.toLowerCase().includes(term) ||
        p.excerpt.toLowerCase().includes(term) ||
        p.tags.some(t => t.toLowerCase().includes(term)) ||
        p.categoryNameAr.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handleSelectProject = (project: ProjectItem) => {
    setActiveProject(project);
    window.location.hash = `#project/${project.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setActiveProject(null);
    window.location.hash = '#projects';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If a specific project is selected, render the dedicated Detail View
  if (activeProject) {
    return (
      <ProjectDetailView
        project={activeProject}
        onBack={handleBackToCatalog}
        onSelectProject={handleSelectProject}
      />
    );
  }

  return (
    <section className="catalog-section" id="projects-catalog" dir={isEn ? 'ltr' : 'rtl'}>
      {/* Catalog Hero Banner */}
      <div className="catalog-hero-wrapper">
        <div className="catalog-hero-badge">
          <Sparkles size={15} />
          <span>{isEn ? "Approved Portfolio" : "معرض النماذج والمشاريع الهندسية المعتمدة"}</span>
        </div>

        <h1 className="catalog-hero-title">
          {isEn ? "Techno Enjaz Engineering Projects" : "مشاريع ومنظومات تكنو إنجاز"}
        </h1>

        <p className="catalog-hero-subtitle">
          {isEn 
            ? "Explore practical engineering prototypes, AI vision architectures, and embedded solutions built with technical guidance and support from Techno Enjaz."
            : "استعراض النماذج التطبيقية والمنظومات الهندسية في الذكاء الاصطناعي والرؤية الحاسوبية والروبوتات والأنظمة السحابية المنجزة بدعم ومساندة المكتب."}
        </p>

        {/* Search Bar */}
        <div className="catalog-search-bar">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isEn ? "Search projects by title, technology, or keywords..." : "ابحث في المشاريع بالاسم، التقنية، أو الكلمات المفتاحية..."}
          />
          {searchTerm && (
            <button 
              type="button" 
              className="search-clear-btn" 
              onClick={() => setSearchTerm('')}
              title={isEn ? "Clear search" : "مسح البحث"}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="catalog-categories-bar">
        {categories.map((cat) => {
          const count = cat.key === 'all' 
            ? PROJECTS_DATA.length 
            : PROJECTS_DATA.filter(p => p.category === cat.key).length;

          return (
            <button
              key={cat.key}
              type="button"
              className={`category-pill-btn ${selectedCategory === cat.key ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.key)}
            >
              <span className="cat-icon">{cat.icon}</span>
              <span className="cat-label">{isEn ? cat.labelEn : cat.labelAr}</span>
              <span className="cat-count">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="catalog-empty-state">
          <Layers size={48} className="empty-icon" />
          <h3 className="empty-title">
            {isEn ? "No Projects Found" : "لم يتم العثور على مشاريع مطابقة"}
          </h3>
          <p className="empty-desc">
            {isEn 
              ? "Try adjusting your search query or switching to another category."
              : "جرّب تغيير كلمات البحث أو اختيار تصنيف آخر من القائمة أعلاه."}
          </p>
          <button 
            type="button" 
            className="empty-reset-btn"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
          >
            {isEn ? "Reset Filters" : "إعادة ضبط التصفية"}
          </button>
        </div>
      ) : (
        <div className="catalog-grid">
          {filteredProjects.map((project) => {
            const saved = isSaved(project.slug);

            return (
              <article 
                key={project.slug} 
                className="project-card"
                onClick={() => handleSelectProject(project)}
              >
                {/* Card Thumbnail */}
                <div className="card-thumb-wrap">
                  <img
                    src={project.image}
                    alt={project.altText || project.title}
                    className="card-thumb-img"
                    loading="lazy"
                  />
                  <span className="card-cat-badge">{project.categoryNameAr}</span>

                  <button
                    type="button"
                    className={`card-bookmark-btn ${saved ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave({
                        id: project.slug,
                        title: project.title,
                        category: project.category,
                        categoryLabel: project.categoryNameAr,
                        description: project.excerpt,
                        type: 'project',
                        image: project.image,
                        tags: project.tags
                      });
                    }}
                    title={saved ? (isEn ? "Saved" : "محفوظ بالمفضلة") : (isEn ? "Save Project" : "حفظ المشروع")}
                  >
                    {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                  </button>
                </div>

                {/* Card Content */}
                <div className="card-body">
                  <h3 className="card-title" title={project.title}>
                    {project.title}
                  </h3>

                  <p className="card-excerpt">
                    {project.excerpt}
                  </p>

                  {/* Verified Role Qualifier Badge */}
                  <div className="card-role-badge">
                    <CheckCircle2 size={13} />
                    <span>{isEn ? "Student Project with Tech Support" : "مشروع طلابي بدعم تقني"}</span>
                  </div>

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="card-tags">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="card-tag-item">#{tag}</span>
                      ))}
                    </div>
                  )}

                  {/* Card Action Link */}
                  <div className="card-footer">
                    <span className="card-view-link">
                      <span>{isEn ? "View Details" : "استعراض التفاصيل"}</span>
                      {isEn ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ProjectsCatalogSection;
