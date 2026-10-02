'use client';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import TableOfContents from '@/components/ui/TableOfContents';

import React, { useState } from 'react';
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
  PhoneCall,
  BookOpen,
  Sparkles
} from 'lucide-react';
import type { ProjectItem } from '@/data/projectsData';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import { useSavedProjects } from '@/hooks/useSavedProjects';
import { plainExcerpt, projectTags } from '@/lib/text';
import { SITE_URL } from '@/config/site';
import FlipbookViewer from '@/components/bookcase/FlipbookViewer';
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
  /** Server-rendered questions & answers block (ContentQA) */
  qa?: React.ReactNode;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  toc = [],
  related = [],
  children,
  qa
}) => {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const { isSaved, toggleSave } = useSavedProjects();

  const [copied, setCopied] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

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

            {/* View PDF Bookcase Button */}
            <button
              type="button"
              className="project-icon-btn project-action-btn--pdf"
              onClick={() => setIsPdfModalOpen(true)}
              title={isEn ? "Read Project PDF Documentation" : "استعراض ملف المشروع (PDF)"}
            >
              <FileText size={18} />
              <span className="btn-text-responsive">{isEn ? "PDF Report" : "ملف المشروع PDF"}</span>
            </button>

            {/* Download PPTX Button */}
            <a
              href={project.presentationUrl || `/presentations/${project.slug}.pptx`}
              download={`${project.slug}-presentation.pptx`}
              className="project-icon-btn project-action-btn--pptx"
              title={isEn ? "Download PowerPoint Presentation (.pptx)" : "تحميل عرض البوربوينت (.pptx)"}
            >
              <Presentation size={18} />
              <span className="btn-text-responsive">{isEn ? "PPTX" : "تحميل البوربوينت"}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="project-featured-image-wrapper">
        <ResponsiveImage src={project.image} alt={project.altText || project.title} className="project-featured-image" sizes="(max-width: 1279.98px) calc(100vw - 32px), 1200px" priority />
        {project.altText && (
          <div className="project-image-caption">
            <span>{project.altText}</span>
          </div>
        )}
      </div>

      {/* Table of contents (phones & tablets) */}
      <TableOfContents
        variant="accordion"
        items={toc}
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

          {/* 3D Interactive Documentation Showcase */}
          <div className="project-bookcase-banner" style={{ margin: '2.5rem 0', padding: '2.5rem 1.5rem', borderRadius: '18px', background: 'radial-gradient(circle at 50% 20%, rgba(37, 99, 235, 0.12) 0%, rgba(15, 23, 42, 0.6) 100%)', border: '1px solid rgba(56, 189, 248, 0.25)', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', perspective: '1100px', marginBottom: '1.5rem' }}>
              <div 
                className="book-3d-wrapper"
                onClick={() => setIsPdfModalOpen(true)}
                title={isEn ? "Click to open reader" : "انقر لقراءة التقرير"}
                style={{ cursor: 'pointer' }}
              >
                <div className="book-3d">
                  {/* Front Cover */}
                  <div className="book-face book-front">
                    {project.bookCover ? (
                      <img
                        src={project.bookCover}
                        alt={project.title}
                        className="book-cover-img"
                      />
                    ) : project.image ? (
                      <div className="book-cover-img-wrapper" style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="book-cover-img"
                        />
                        <div className="book-cover-overlay">
                          <h4 className="book-cover-title">{project.title}</h4>
                        </div>
                      </div>
                    ) : (
                      <div className="book-cover-fallback">
                        <h4 className="title" style={{ fontSize: '1rem' }}>{project.title}</h4>
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

            {/* Clickable text prompt replacing the button */}
            <div
              className="project-book-read-prompt"
              onClick={() => setIsPdfModalOpen(true)}
              role="button"
              tabIndex={0}
              title={isEn ? "Open 3D interactive documentation" : "انقر لتصفح ملف المشروع ثلاثي الأبعاد"}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                margin: '0.25rem auto 0',
                padding: '0.45rem 1.15rem',
                borderRadius: '9999px',
                background: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.28)',
                color: '#38bdf8',
                fontSize: '0.86rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
            >
              <Sparkles size={14} color="#38bdf8" />
              <span>{isEn ? "Click book or here to read full 3D documentation" : "انقر على الكتاب أو هنا لتصفح ملف المشروع تفاعلياً"}</span>
              <BookOpen size={14} color="#38bdf8" />
            </div>
          </div>

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
            items={toc}
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
                  <ResponsiveImage src={rel.image} alt={rel.altText || rel.title} className="bottom-card-img" sizes="(max-width: 639.98px) 100vw, (max-width: 1023.98px) 50vw, 400px" />
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

      {/* Interactive 3D PDF Flipbook Reader */}
      <FlipbookViewer
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        pdfUrl={project.pdfUrl || '/pdf/robotics-summer-club.pdf'}
        title={project.title}
        subtitle={isEn ? "Technical Documentation & 3D Interactive Whitepaper" : "التقرير التقني والمستند التوثيقي ثلاثي الأبعاد"}
      />
    </div>
  );
};

export default ProjectDetailView;
