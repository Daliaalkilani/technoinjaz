'use client';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import TableOfContents from '@/components/ui/TableOfContents';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  ArrowLeft, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Check, 
  Home,
  Layers,
  FileText,
  Presentation,
  Send,
  PhoneCall
} from 'lucide-react';
import type { ProjectItem } from '@/data/projectsData';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import { useSavedProjects } from '@/hooks/useSavedProjects';
import { plainExcerpt, projectTags } from '@/lib/text';
import { SITE_URL } from '@/config/site';
import FlipbookViewer, { preloadFlipbook } from '@/components/bookcase/FlipbookViewer';
import './ProjectDetailView.css';

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

interface ProjectDetailViewProps {
  project: ProjectItem;
  toc?: TocHeading[];
  /** English TOC headings — used in English mode */
  tocEn?: TocHeading[] | null;
  related?: ProjectItem[];
  children?: React.ReactNode;
  /** Server-rendered questions & answers block (ContentQA) */
  qa?: React.ReactNode;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  toc = [],
  tocEn = null,
  related = [],
  children,
  qa
}) => {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const tocItems = isEn && tocEn && tocEn.length ? tocEn : toc;
  const { isSaved, toggleSave } = useSavedProjects();

  const [copied, setCopied] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Warm up the PDF reader in the background so the book opens quickly
  useEffect(() => {
    if (!project.pdfUrl) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const run = () => preloadFlipbook(project.pdfUrl);
    if (w.requestIdleCallback) w.requestIdleCallback(run);
    else setTimeout(run, 1500);
  }, [project.pdfUrl]);

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
  const cleanExcerpt = plainExcerpt(isEn ? (project.excerptEn || project.excerpt) : project.excerpt, project.metaDesc);
  const cleanTags = projectTags(isEn && project.tagsEn?.length ? project.tagsEn : project.tags);

  const handleToggleBookmark = () => {
    toggleSave({
      id: project.slug,
      title: project.title,
      category: project.category,
      categoryLabel: isEn ? (project.categoryNameEn || project.categoryNameAr) : project.categoryNameAr,
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
        <span className="breadcrumb-category">{isEn ? (project.categoryNameEn || project.categoryNameAr) : project.categoryNameAr}</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current" aria-current="page" title={project.title}>
          {project.title}
        </span>
      </nav>

      {/* Main Header / Title */}
      <header className="project-detail-header">
        <div className="project-category-badge">
          <Layers size={14} />
          <span>{isEn ? (project.categoryNameEn || project.categoryNameAr) : project.categoryNameAr}</span>
        </div>

        <h1 className="project-detail-title">{isEn ? (project.titleEn || project.title) : project.title}</h1>

        <p className="project-detail-lead">{cleanExcerpt}</p>

        {/* Actions Bar */}
        <div className="project-meta-action-bar">
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

            {/* View PDF Bookcase Button (only when the project has its own report) */}
            {project.pdfUrl && (
            <button
              type="button"
              className="project-icon-btn project-action-btn--pdf"
              onClick={() => setIsPdfModalOpen(true)}
              title={isEn ? "Read Project PDF Documentation" : "استعراض ملف المشروع (PDF)"}
            >
              <FileText size={18} />
              <span className="btn-text-responsive">{isEn ? "PDF Report" : "ملف المشروع PDF"}</span>
            </button>
            )}

            {/* Download PPTX Button (only when the file exists) */}
            {project.presentationUrl && (
            <a
              href={project.presentationUrl}
              download={`${project.slug}-presentation.pptx`}
              className="project-icon-btn project-action-btn--pptx"
              title={isEn ? "Download PowerPoint Presentation (.pptx)" : "تحميل عرض البوربوينت (.pptx)"}
            >
              <Presentation size={18} />
              <span className="btn-text-responsive">{isEn ? "PPTX" : "تحميل البوربوينت"}</span>
            </a>
            )}
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="project-featured-image-wrapper">
        <ResponsiveImage src={project.image} alt={(isEn ? (project.altTextEn || project.altText) : project.altText) || project.title} className="project-featured-image" sizes="(max-width: 1279.98px) calc(100vw - 32px), 1200px" priority />
        {project.altText && (
          <div className="project-image-caption">
            <span>{isEn ? (project.altTextEn || project.altText) : project.altText}</span>
          </div>
        )}
      </div>

      {/* Table of contents (phones & tablets) */}
      <TableOfContents
        variant="accordion"
        items={tocItems}
        title={isEn ? "Project contents" : "فهرس محتويات المشروع"}
      />

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

          {/* Questions & answers about this project */}
          {qa}

          {/* 3D Interactive Documentation Showcase (only with the project's own report) */}
          {project.pdfUrl && (
          <div className="project-bookcase-banner">
            <div style={{ display: 'flex', justifyContent: 'center', perspective: '1100px' }}>
              <div 
                className="book-3d-wrapper"
                onClick={() => setIsPdfModalOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsPdfModalOpen(true);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={isEn ? "Open the project report" : "فتح ملف المشروع"}
                title={isEn ? "Click to open reader" : "انقر لقراءة التقرير"}
                style={{ cursor: 'pointer' }}
              >
                <div className="book-3d">
                  {/* Front Cover */}
                  <div className="book-face book-front">
                    {project.bookCover ? (
                      <img
                        src={project.bookCover}
                        alt={(isEn ? (project.titleEn || project.title) : project.title)}
                        className="book-cover-img"
                      />
                    ) : project.image ? (
                      <div className="book-cover-img-wrapper" style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <img
                          src={project.image}
                          alt={(isEn ? (project.titleEn || project.title) : project.title)}
                          className="book-cover-img"
                        />
                        <div className="book-cover-overlay">
                          <h4 className="book-cover-title">{isEn ? (project.titleEn || project.title) : project.title}</h4>
                        </div>
                      </div>
                    ) : (
                      <div className="book-cover-fallback">
                        <h4 className="title" style={{ fontSize: '1rem' }}>{isEn ? (project.titleEn || project.title) : project.title}</h4>
                      </div>
                    )}
                    {/* Realistic Physical Spine Hinge & Crease */}
                    <div className="book-spine-strip" aria-hidden="true" />
                    <div className="book-spine-hinge" aria-hidden="true" />
                  </div>

                  {/* Back Cover */}
                  <div className="book-face book-back" />

                  {/* Physical 3D Spine (Casing) */}
                  <div className="book-face book-spine">
                    <span className="book-spine-text">{project.title}</span>
                  </div>

                  {/* Pages Edges */}
                  <div className="book-face book-right" />
                  <div className="book-face book-top" />
                  <div className="book-face book-bottom" />
                </div>
              </div>
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
                  : "تواصل مع فريق تكنو إنجاز لمناقشة قابلية التنفيذ العملي، اختيار القطع، وتطوير النموذج الأولي."}
              </p>
            </div>
            <Link href="/contact" className="project-cta-btn">
              <Send size={16} />
              <span>{isEn ? "Contact Bureau" : "تواصل مع المكتب"}</span>
            </Link>
          </div>

          {/* End-of-project navigation */}
          <nav className="project-end-nav" aria-label={isEn ? "Project navigation" : "التنقل بين المشاريع"}>
            <Link href="/projects" className="project-back-link">
              {isEn ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              <span>{isEn ? "Browse all projects" : "تصفّح كل المشاريع"}</span>
            </Link>
          </nav>
        </article>

        {/* Desktop Sticky Sidebar (TOC + Related Projects) */}
        <aside className="project-sidebar">
          <TableOfContents
            variant="card"
            items={tocItems}
            title={isEn ? "Project contents" : "فهرس المشروع"}
          />

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
                      alt={(isEn ? (rel.altTextEn || rel.altText) : rel.altText) || (isEn ? (rel.titleEn || rel.title) : rel.title)}
                      className="related-project-img"
                      loading="lazy"
                    />
                    <div className="related-project-info">
                      <span className="related-project-cat">{isEn ? (rel.categoryNameEn || rel.categoryNameAr) : rel.categoryNameAr}</span>
                      <h4 className="related-project-name">{isEn ? (rel.titleEn || rel.title) : rel.title}</h4>
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
        <section className="bottom-related-section bottom-related--no-sidebar">
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
                  <ResponsiveImage src={rel.image} alt={(isEn ? (rel.altTextEn || rel.altText) : rel.altText) || (isEn ? (rel.titleEn || rel.title) : rel.title)} className="bottom-card-img" sizes="(max-width: 639.98px) 100vw, (max-width: 1023.98px) 50vw, 400px" />
                  <span className="bottom-card-badge">{isEn ? (rel.categoryNameEn || rel.categoryNameAr) : rel.categoryNameAr}</span>
                </div>
                <div className="bottom-card-body">
                  <h3 className="bottom-card-title">{isEn ? (rel.titleEn || rel.title) : rel.title}</h3>
                  <p className="bottom-card-desc">{plainExcerpt(isEn ? (rel.excerptEn || rel.excerpt) : rel.excerpt, rel.metaDesc)}</p>
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

      {/* Interactive 3D PDF Flipbook Reader */}
      {project.pdfUrl && (
      <FlipbookViewer
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        pdfUrl={project.pdfUrl}
        title={isEn ? (project.titleEn || project.title) : project.title}
        subtitle={isEn ? "Technical Documentation & 3D Interactive Whitepaper" : "التقرير التقني والمستند التوثيقي ثلاثي الأبعاد"}
      />
      )}
    </div>
  );
};

export default ProjectDetailView;
