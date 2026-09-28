'use client';
import ResponsiveImage from '@/components/ui/ResponsiveImage';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Check, 
  Home, 
  Layers, 
  ListOrdered, 
  ChevronDown, 
  ChevronUp,
  ShieldCheck,
  Send,
  PhoneCall,
  Sparkles
} from 'lucide-react';
import type { ProjectItem } from '../../data/projectsData';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { useSavedProjects } from '../../hooks/useSavedProjects';
import { plainExcerpt, projectTags } from '@/lib/text';
import { SITE_URL } from '@/config/site';
import './ProjectDetailView.css';

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

interface ProjectDetailViewProps {
  project: ProjectItem;
  toc?: TocHeading[];
  related?: ProjectItem[];
  children?: React.ReactNode;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  toc = [],
  related = [],
  children
}) => {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const { isSaved, toggleSave } = useSavedProjects();

  const [copied, setCopied] = useState(false);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

  // Active heading spy with IntersectionObserver
  useEffect(() => {
    if (toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -65% 0px',
        threshold: 0
      }
    );

    toc.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  const handleHeadingClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveHeadingId(id);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  const handleShare = () => {
    const url = `${SITE_URL}/projects/${project.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const isProjectSaved = isSaved(project.slug);
  const cleanExcerpt = plainExcerpt(project.excerpt, project.metaDesc);
  const cleanTags = projectTags(project.tags);

  const handleToggleBookmark = () => {
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
  };

  return (
    <div className="project-detail-container" dir={isEn ? 'ltr' : 'rtl'}>
      {/* 1. Breadcrumbs */}
      <nav className="project-breadcrumbs" aria-label={isEn ? "Breadcrumb navigation" : "مسار التصفح"}>
        <Link href="/" className="breadcrumb-link">
          <Home size={14} />
          <span>{isEn ? "Home" : "الرئيسية"}</span>
        </Link>
        <span className="breadcrumb-separator">/</span>
        <Link href="/projects" className="breadcrumb-link">
          <Layers size={14} />
          <span>{isEn ? "Projects" : "المشاريع"}</span>
        </Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-category">{project.categoryNameAr}</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current" aria-current="page" title={project.title}>
          {project.title}
        </span>
      </nav>

      {/* Main Header / Title */}
      <header className="project-detail-header">
        <div className="project-category-badge">
          <Layers size={14} />
          <span>{project.categoryNameAr}</span>
        </div>

        <h1 className="project-detail-title">{project.title}</h1>

        <p className="project-detail-lead">{cleanExcerpt}</p>

        {/* Verified Role Qualifier Badge */}
        <div className="project-role-qualifier-card">
          <div className="role-qualifier-icon">
            <ShieldCheck size={20} />
          </div>
          <div className="role-qualifier-content">
            <span className="role-qualifier-title">
              {isEn ? "Project Nature & Role" : "طبيعة المشروع وتوثيق المشاركة"}
            </span>
            <p className="role-qualifier-desc">
              {project.roleQualifier}
            </p>
          </div>
        </div>

        {/* Metadata Bar & Actions */}
        <div className="project-meta-action-bar">
          <div className="project-meta-left">
            <span className="project-meta-item">
              <Clock size={15} />
              <span>{isEn ? "Verified Study" : "دراسة حالة معتمدة"}</span>
            </span>
            <span className="project-meta-item">
              <Sparkles size={15} />
              <span>{isEn ? "Prototype Model" : "نموذج تطبيقي"}</span>
            </span>
          </div>

          <div className="project-action-buttons">
            <button
              type="button"
              className={`project-icon-btn ${isProjectSaved ? 'active' : ''}`}
              onClick={handleToggleBookmark}
              title={isProjectSaved ? (isEn ? "Saved" : "محفوظ بالمفضلة") : (isEn ? "Save Project" : "حفظ المشروع")}
            >
              {isProjectSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
              <span className="btn-text-responsive">{isProjectSaved ? (isEn ? "Saved" : "محفوظ") : (isEn ? "Save" : "حفظ")}</span>
            </button>

            <button
              type="button"
              className="project-icon-btn"
              onClick={handleShare}
              title={isEn ? "Share Project" : "مشاركة المشروع"}
            >
              {copied ? <Check size={18} style={{ color: '#10b981' }} /> : <Share2 size={18} />}
              <span className="btn-text-responsive">{copied ? (isEn ? "Copied" : "تم النسخ!") : (isEn ? "Share" : "مشاركة")}</span>
            </button>

            <Link
              href="/projects"
              className="project-icon-btn back-btn"
            >
              {isEn ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              <span>{isEn ? "All Projects" : "كل المشاريع"}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="project-featured-image-wrapper">
        <ResponsiveImage src={project.image} alt={project.altText || project.title} className="project-featured-image" priority />
        {project.altText && (
          <div className="project-image-caption">
            <span>{project.altText}</span>
          </div>
        )}
      </div>

      {/* Mobile Collapsible TOC Drawer */}
      {toc.length > 0 && (
        <div className="mobile-toc-accordion">
          <button
            type="button"
            className="mobile-toc-toggle-btn"
            onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
            aria-expanded={isMobileTocOpen}
          >
            <div className="mobile-toc-label">
              <ListOrdered size={16} />
              <span>{isEn ? "Project Index" : "فهرس محتويات المشروع"}</span>
              <span className="mobile-toc-count">{toc.length}</span>
            </div>
            {isMobileTocOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {isMobileTocOpen && (
            <nav className="mobile-toc-content" aria-label={isEn ? "Mobile Table of Contents" : "فهرس المحتويات للجوال"}>
              <ul className="mobile-toc-list">
                {toc.map((heading) => (
                  <li 
                    key={heading.id} 
                    className={`mobile-toc-item level-${heading.level}`}
                  >
                    <a
                      href={`#${heading.id}`}
                      className={`mobile-toc-link ${activeHeadingId === heading.id ? 'active' : ''}`}
                      onClick={(e) => {
                        handleHeadingClick(e, heading.id);
                        setIsMobileTocOpen(false);
                      }}
                    >
                      <span className="toc-bullet" />
                      <span className="toc-text">{heading.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      )}

      {/* Main Content Layout: Markdown Body + Sidebar TOC */}
      <div className="project-content-grid">
        <article className="project-markdown-body">
          {children}

          {/* Tags Footer (only if tags exist) */}
          {cleanTags.length > 0 && (
            <div className="project-tags-section">
              <span className="tags-label">{isEn ? "Tags:" : "الوسوم والكلمات المفتاحية:"}</span>
              <div className="project-tags-list">
                {cleanTags.map((tag, idx) => (
                  <span key={idx} className="project-tag-pill">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Project Inquiry CTA Box */}
          <div className="project-cta-card">
            <div className="project-cta-icon">
              <PhoneCall size={28} />
            </div>
            <div className="project-cta-content">
              <h3 className="project-cta-heading">
                {isEn ? "Have a Similar Project or Graduation Proposal?" : "هل لديك فكرة أو متطلب هندسي مشابه؟"}
              </h3>
              <p className="project-cta-subheading">
                {isEn 
                  ? "Reach out to Techno Enjaz engineering team to discuss technical feasibility, prototype hardware, and development scope."
                  : "تواصل مع فريق تكنو إنجاز الهندسي لمناقشة قابلية التنفيذ العملي، اختيار القطع، وتطوير النموذج الأولي."}
              </p>
            </div>
            <Link href="/contact" className="project-cta-btn">
              <Send size={16} />
              <span>{isEn ? "Contact Bureau" : "تواصل مع المكتب"}</span>
            </Link>
          </div>
        </article>

        {/* Desktop Sticky Sidebar (TOC + Related Projects) */}
        <aside className="project-sidebar">
          {toc.length > 0 && (
            <div className="desktop-toc-card">
              <div className="toc-card-header">
                <ListOrdered size={17} />
                <h3 className="toc-title">{isEn ? "Table of Contents" : "فهرس المحتويات"}</h3>
              </div>
              <ul className="toc-list">
                {toc.map((heading) => (
                  <li 
                    key={heading.id} 
                    className={`toc-item level-${heading.level} ${activeHeadingId === heading.id ? 'active' : ''}`}
                  >
                    <a
                      href={`#${heading.id}`}
                      className="toc-link"
                      onClick={(e) => handleHeadingClick(e, heading.id)}
                    >
                      <span className="toc-dot" />
                      <span className="toc-link-text">{heading.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Sidebar Related Projects */}
          {related.length > 0 && (
            <div className="sidebar-related-card">
              <h3 className="related-title">{isEn ? "Related Projects" : "مشاريع ذات صلة"}</h3>
              <div className="related-list">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/projects/${rel.slug}`}
                    className="related-project-item"
                  >
                    <img
                      src={rel.image}
                      alt={rel.altText || rel.title}
                      className="related-project-img"
                      loading="lazy"
                    />
                    <div className="related-project-info">
                      <span className="related-project-cat">{rel.categoryNameAr}</span>
                      <h4 className="related-project-name">{rel.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Bottom Related Projects Grid */}
      {related.length > 0 && (
        <section className="bottom-related-section">
          <div className="section-header">
            <h2 className="section-title">
              {isEn ? "Explore More Projects" : "استكشف المزيد من مشاريع تكنو إنجاز"}
            </h2>
            <p className="section-subtitle">
              {isEn 
                ? "Discover more engineering prototypes and academic implementations"
                : "نماذج تطبيقية ومنظومات برمجية وهندسية منجزة بدعم المكتب"}
            </p>
          </div>

          <div className="bottom-related-grid">
            {related.map((rel) => (
              <Link 
                key={rel.slug} 
                href={`/projects/${rel.slug}`}
                className="bottom-related-card"
              >
                <div className="related-card-img-wrap">
                  <ResponsiveImage src={rel.image} alt={rel.altText || rel.title} className="bottom-card-img" />
                  <span className="bottom-card-badge">{rel.categoryNameAr}</span>
                </div>
                <div className="bottom-card-body">
                  <h3 className="bottom-card-title">{rel.title}</h3>
                  <p className="bottom-card-desc">{plainExcerpt(rel.excerpt, rel.metaDesc)}</p>
                  <div className="bottom-card-footer">
                    <span className="bottom-card-link">
                      <span>{isEn ? "View Case Study" : "استعراض المشروع"}</span>
                      {isEn ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProjectDetailView;
