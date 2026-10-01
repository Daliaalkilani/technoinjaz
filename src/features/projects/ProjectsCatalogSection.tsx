'use client';
import ResponsiveImage from '@/components/ui/ResponsiveImage';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  X 
} from 'lucide-react';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import { useSavedProjects } from '@/hooks/useSavedProjects';
import { PROJECTS_DATA, type ProjectItem, type ProjectCategory } from '@/data/projectsData';
import { plainExcerpt, projectTags } from '@/lib/text';
import './ProjectsCatalogSection.css';

interface ProjectsCatalogSectionProps {
  projects?: ProjectItem[];
}

export const ProjectsCatalogSection: React.FC<ProjectsCatalogSectionProps> = ({ projects = PROJECTS_DATA }) => {
  const router = useRouter();
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const { isSaved, toggleSave } = useSavedProjects();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');

  const categories = useMemo(() => [
    { key: 'all' as ProjectCategory, labelAr: 'الكل', labelEn: 'All Projects', icon: <Layers size={16} /> },
    { key: 'vision' as ProjectCategory, labelAr: 'رؤية حاسوبية', labelEn: 'Computer Vision', icon: <Eye size={16} /> },
    { key: 'ai' as ProjectCategory, labelAr: 'ذكاء اصطناعي', labelEn: 'Artificial Intelligence', icon: <Cpu size={16} /> },
    { key: 'systems' as ProjectCategory, labelAr: 'روبوتات وأنظمة مدمجة', labelEn: 'Robotics & Systems', icon: <Bot size={16} /> },
    { key: 'web' as ProjectCategory, labelAr: 'منصات ويب وسحابية', labelEn: 'Web & Cloud', icon: <Globe size={16} /> },
    { key: 'mobile' as ProjectCategory, labelAr: 'تطبيقات موبايل', labelEn: 'Mobile Apps', icon: <Smartphone size={16} /> },
  ], []);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
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
  }, [projects, selectedCategory, searchTerm]);

  // Prefetch top visible projects so clicking is instantaneous
  useEffect(() => {
    filteredProjects.slice(0, 8).forEach((p) => {
      router.prefetch(`/projects/${p.slug}`);
    });
  }, [filteredProjects, router]);

  return (
    <section className="catalog-section" id="projects-catalog" dir={isEn ? 'ltr' : 'rtl'}>
      {/* Catalog Hero Banner */}
      <div className="catalog-hero-wrapper">
        <h2 className="catalog-hero-title">
          {isEn ? "Graduation & Engineering Research Catalog" : "كتالوج المشاريع والأطروحات الهندسية"}
        </h2>

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
            ? projects.length 
            : projects.filter(p => p.category === cat.key).length;

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
            const cleanExcerpt = plainExcerpt(project.excerpt, project.metaDesc);
            const cleanTags = projectTags(project.tags);

            const projectUrl = `/projects/${project.slug}`;

            return (
              <article 
                key={project.slug} 
                className="project-card"
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.closest('.card-bookmark-btn') || target.closest('a')) return;
                  router.push(projectUrl);
                }}
                onPointerDown={() => router.prefetch(projectUrl)}
                onMouseEnter={() => router.prefetch(projectUrl)}
              >
                {/* Card Thumbnail */}
                <div className="card-thumb-wrap">
                  <Link 
                    href={projectUrl} 
                    prefetch={true} 
                    className="card-thumb-link"
                    aria-label={project.title}
                  >
                    <ResponsiveImage src={project.image} alt={project.altText || project.title} className="card-thumb-img" />
                  </Link>
                  <span className="card-cat-badge">{project.categoryNameAr}</span>

                  <button
                    type="button"
                    className={`card-bookmark-btn ${saved ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleSave({
                        id: project.slug,
                        title: project.title,
                        category: project.category,
                        categoryLabel: project.categoryNameAr,
                        description: cleanExcerpt,
                        type: 'project',
                        image: project.image,
                        tags: cleanTags
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
                    <Link href={projectUrl} prefetch={true} className="card-title-link">
                      {project.title}
                    </Link>
                  </h3>

                  <p className="card-excerpt">
                    {cleanExcerpt}
                  </p>


                  {/* Tags */}
                  {cleanTags.length > 0 && (
                    <div className="card-tags">
                      {cleanTags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="card-tag-item">#{tag}</span>
                      ))}
                    </div>
                  )}

                  {/* Card Action Link */}
                  <div className="card-footer">
                    <Link href={projectUrl} prefetch={true} className="card-view-link">
                      <span>{isEn ? "View Details" : "استعراض التفاصيل"}</span>
                      {isEn ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
                    </Link>
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
