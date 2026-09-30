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
  Download,
  Presentation,
  X,
  ChevronLeft,
  ChevronRight,
  Send,
  PhoneCall
} from 'lucide-react';
import type { ProjectItem } from '@/data/projectsData';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import { useSavedProjects } from '@/hooks/useSavedProjects';
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
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfPage, setPdfPage] = useState(1);

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

      {/* Interactive PDF & Documentation Bookcase Modal */}
      {isPdfModalOpen && (
        <div className="pdf-bookcase-overlay" onClick={() => setIsPdfModalOpen(false)}>
          <div className="pdf-bookcase-modal" onClick={e => e.stopPropagation()} dir={isEn ? 'ltr' : 'rtl'}>
            <div className="pdf-bookcase-header">
              <div className="pdf-header-title-group">
                <div className="pdf-icon-badge">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="pdf-header-title">{project.title}</h3>
                  <span className="pdf-header-subtitle">
                    {isEn ? "Technical Documentation & Project Whitepaper" : "التقرير التقني والمستند التوثيقي للمشروع"}
                  </span>
                </div>
              </div>
              <div className="pdf-header-actions">
                <a
                  href={project.pdfUrl || `/docs/projects/${project.slug}.pdf`}
                  download={`${project.slug}-documentation.pdf`}
                  className="pdf-toolbar-btn download-btn"
                  title={isEn ? "Download PDF File" : "تحميل ملف الـ PDF"}
                >
                  <Download size={16} />
                  <span className="btn-label-desktop">{isEn ? "Download" : "تحميل PDF"}</span>
                </a>
                <button
                  type="button"
                  className="pdf-toolbar-btn close-btn"
                  onClick={() => setIsPdfModalOpen(false)}
                  aria-label={isEn ? "Close reader" : "إغلاق العارض"}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Bookcase Content / Flip Reader */}
            <div className="pdf-bookcase-body">
              <div className="pdf-book-page-wrapper">
                <div className="pdf-book-page">
                  <div className="pdf-page-watermark">TECHNO ENJAZ</div>

                  {pdfPage === 1 && (
                    <div className="pdf-page-slide cover-slide">
                      <div className="pdf-slide-badge">{project.categoryNameAr}</div>
                      <h2 className="pdf-slide-title">{project.title}</h2>
                      <div className="pdf-slide-media">
                        <img src={project.image} alt={project.title} className="pdf-slide-img" />
                      </div>
                      <p className="pdf-slide-excerpt">{cleanExcerpt}</p>
                      <div className="pdf-slide-meta-row">
                        <span className="pdf-meta-pill">⚡ {isEn ? "Verified Architecture" : "معمارية برمجية موثقة"}</span>
                        <span className="pdf-meta-pill">📁 {isEn ? "System Specifications" : "المواصفات الفنية المكتملة"}</span>
                      </div>
                    </div>
                  )}

                  {pdfPage === 2 && (
                    <div className="pdf-page-slide tech-slide">
                      <h3 className="pdf-slide-heading">{isEn ? "System Architecture & Technologies" : "المعمارية البرمجية والتقنيات"}</h3>
                      <p className="pdf-slide-desc">
                        {isEn 
                          ? "Modular system workflow designed for real-time responsiveness, modular isolation, and clean state handling."
                          : "مخطط هيكلي ومعالجة مصممة لضمان أعلى مستويات الأداء والاستجابة، مع عزل الطبقات والوحدات البرمجية بدقة."}
                      </p>
                      <div className="pdf-tech-pills-grid">
                        {cleanTags.map((tag, i) => (
                          <div key={i} className="pdf-tech-pill">
                            <span className="tech-dot" />
                            <span>{tag}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pdf-pipeline-card">
                        <div className="pipeline-title">{isEn ? "Execution Pipeline" : "مسار المعالجة والتنفيذ"}</div>
                        <p className="pipeline-desc">
                          {isEn 
                            ? "Sensor & Frame Ingestion ➔ Feature Detection & Normalization ➔ Real-time Decision Processing ➔ Interface Render"
                            : "التقاط الإشارات والفيديو ➔ تحليل الخصائص والمعايرة ➔ محرك اتخاذ القرار في الزمن الحقيقي ➔ عرض النتيجة على الواجهة"}
                        </p>
                      </div>
                    </div>
                  )}

                  {pdfPage === 3 && (
                    <div className="pdf-page-slide summary-slide">
                      <h3 className="pdf-slide-heading">{isEn ? "Technical Impact & Verification" : "مخرجات التنفيذ والتحقق العملي"}</h3>
                      <div className="pdf-key-points">
                        <div className="key-point-item">
                          <span className="point-badge">01</span>
                          <div>
                            <h4>{isEn ? "Scalable Codebase Architecture" : "بنية كود نظيفة وقابلة للتوسع"}</h4>
                            <p>{isEn ? "Built adhering to modern software design patterns, decoupling backend logic from presentation layers." : "تم البناء وفق أحدث أنماط التصميم البرمجي مع فصل منطق العمل عن طبقة العرض لضمان السهولة في الصيانة والتطوير المستقبلي."}</p>
                          </div>
                        </div>
                        <div className="key-point-item">
                          <span className="point-badge">02</span>
                          <div>
                            <h4>{isEn ? "Optimized Real-time Performance" : "استجابة فائقة في الزمن الحقيقي"}</h4>
                            <p>{isEn ? "Tested under rigorous conditions with low latency response and smooth frame rates." : "خضع النموذج لاختبارات أداء مكثفة أثبتت استقرار المعالجة وزمن استجابة منخفض مع واجهات بصرية سلسلة."}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bookcase Navigation Footer */}
              <div className="pdf-bookcase-footer">
                <button
                  type="button"
                  className="pdf-page-nav-btn"
                  disabled={pdfPage <= 1}
                  onClick={() => setPdfPage(p => Math.max(1, p - 1))}
                  title={isEn ? "Previous Page" : "الصفحة السابقة"}
                >
                  <ChevronRight size={18} />
                  <span>{isEn ? "Previous" : "السابق"}</span>
                </button>

                <div className="pdf-page-indicator">
                  <span>{isEn ? `Page ${pdfPage} of 3` : `صفحة ${pdfPage} من 3`}</span>
                </div>

                <button
                  type="button"
                  className="pdf-page-nav-btn"
                  disabled={pdfPage >= 3}
                  onClick={() => setPdfPage(p => Math.min(3, p + 1))}
                  title={isEn ? "Next Page" : "الصفحة التالية"}
                >
                  <span>{isEn ? "Next" : "التالي"}</span>
                  <ChevronLeft size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailView;
