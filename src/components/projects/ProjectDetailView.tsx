import React, { useState, useEffect, useMemo } from 'react';
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
import { marked } from 'marked';
import type { ProjectItem } from '../../data/projectsData';
import { getRelatedProjects } from '../../data/projectsData';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { useSavedProjects } from '../../hooks/useSavedProjects';
import './ProjectDetailView.css';

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

interface ProjectDetailViewProps {
  project: ProjectItem;
  onBack: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  onBack,
  onSelectProject
}) => {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';
  const { isSaved, toggleSave } = useSavedProjects();

  const [copied, setCopied] = useState(false);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

  const relatedProjects = useMemo(() => {
    return getRelatedProjects(project.slug, 3);
  }, [project.slug]);

  // Update Page Title, Meta Description, Canonical, and Schema.org
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Dynamic Title
    document.title = `${project.seoTitle || project.title} | تكنو إنجاز`;

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', project.metaDesc || project.excerpt);

    // Canonical link
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', `https://techno-enjaz.com/#project/${project.slug}`);

    // Inject Schema.org JSON-LD (CreativeWork & BreadcrumbList)
    const scriptId = 'schema-project-jsonld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CreativeWork",
          "@id": `https://techno-enjaz.com/#project/${project.slug}#project`,
          "name": project.title,
          "headline": project.seoTitle || project.title,
          "description": project.metaDesc || project.excerpt,
          "image": `https://techno-enjaz.com${project.image}`,
          "url": `https://techno-enjaz.com/#project/${project.slug}`,
          "inLanguage": "ar",
          "genre": project.categoryNameAr,
          "keywords": project.tags.join(', '),
          "publisher": {
            "@type": "Organization",
            "name": "تكنو إنجاز — Techno Enjaz",
            "url": "https://techno-enjaz.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://techno-enjaz.com/techno-logo.png"
            }
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": `https://techno-enjaz.com/#project/${project.slug}#breadcrumb`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": isEn ? "Home" : "الرئيسية",
              "item": "https://techno-enjaz.com/#top"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": isEn ? "Projects" : "المشاريع",
              "item": "https://techno-enjaz.com/#projects"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": project.title,
              "item": `https://techno-enjaz.com/#project/${project.slug}`
            }
          ]
        }
      ]
    };

    scriptTag.textContent = JSON.stringify(schemaData);

    return () => {
      // Clean up injected schema on unmount
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [project, isEn]);

  // Parse markdown and extract Headings for Table of Contents
  const { renderedHtml, tocHeadings } = useMemo(() => {
    const rawMarkdown = project.markdownContent || '';
    const headings: TocHeading[] = [];
    let headingCounter = 0;

    // Custom renderer for marked
    const renderer = new marked.Renderer();

    renderer.heading = ({ tokens, depth }) => {
      const text = tokens.map((t: any) => t.raw || t.text || '').join('');
      if (depth === 2 || depth === 3) {
        headingCounter++;
        const safeSlug = text
          .toLowerCase()
          .replace(/[^\u0621-\u064Aa-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '') || `section-${headingCounter}`;
        const id = `sec-${headingCounter}-${safeSlug}`;
        
        headings.push({ id, text, level: depth });
        return `<h${depth} id="${id}" class="project-heading-${depth} scroll-mt-offset">${text}</h${depth}>`;
      }
      return `<h${depth}>${text}</h${depth}>`;
    };

    marked.setOptions({
      renderer,
      gfm: true,
      breaks: true
    });

    const parsed = marked.parse(rawMarkdown) as string;
    return { renderedHtml: parsed, tocHeadings: headings };
  }, [project.markdownContent]);

  // IntersectionObserver to highlight current active heading
  useEffect(() => {
    if (tocHeadings.length === 0) return;

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

    tocHeadings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tocHeadings]);

  const handleHeadingClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveHeadingId(id);
    const target = document.getElementById(id);
    if (target) {
      const navbarOffset = 90;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleShare = () => {
    const url = `https://techno-enjaz.com/#project/${project.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      });
    }
  };

  const handleToggleBookmark = () => {
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
  };

  const isProjectSaved = isSaved(project.slug);

  return (
    <div className="project-detail-container" dir={isEn ? 'ltr' : 'rtl'}>
      {/* Top Breadcrumb Navigation */}
      <nav className="project-breadcrumb-nav" aria-label="Breadcrumb">
        <button type="button" className="breadcrumb-btn" onClick={onBack}>
          <Home size={15} />
          <span>{isEn ? "Projects" : "المشاريع"}</span>
        </button>
        <span className="breadcrumb-sep">{isEn ? "/" : "/"}</span>
        <span className="breadcrumb-category">{project.categoryNameAr}</span>
        <span className="breadcrumb-sep">{isEn ? "/" : "/"}</span>
        <span className="breadcrumb-current" title={project.title}>
          {project.title.length > 45 ? `${project.title.slice(0, 45)}...` : project.title}
        </span>
      </nav>

      {/* Main Header / Title */}
      <header className="project-detail-header">
        <div className="project-category-badge">
          <Layers size={14} />
          <span>{project.categoryNameAr}</span>
        </div>

        <h1 className="project-detail-title">{project.title}</h1>

        <p className="project-detail-lead">{project.excerpt}</p>

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

            <button
              type="button"
              className="project-icon-btn back-btn"
              onClick={onBack}
            >
              {isEn ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              <span>{isEn ? "All Projects" : "كل المشاريع"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="project-featured-image-wrapper">
        <img
          src={project.image}
          alt={project.altText || project.title}
          className="project-featured-image"
          loading="eager"
        />
        <div className="project-image-caption">
          <span>{project.altText}</span>
        </div>
      </div>

      {/* Mobile Collapsible TOC Drawer */}
      {tocHeadings.length > 0 && (
        <div className="mobile-toc-accordion">
          <button
            type="button"
            className="mobile-toc-toggle-btn"
            onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
            aria-expanded={isMobileTocOpen}
          >
            <div className="mobile-toc-title-wrap">
              <ListOrdered size={16} />
              <span>{isEn ? "Table of Contents" : "فهرس محتوى المشروع"}</span>
              <span className="mobile-toc-count">({tocHeadings.length})</span>
            </div>
            {isMobileTocOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {isMobileTocOpen && (
            <nav className="mobile-toc-drawer" aria-label="Mobile Table of Contents">
              <ul className="mobile-toc-list">
                {tocHeadings.map((heading) => (
                  <li key={heading.id} className={`mobile-toc-item level-${heading.level}`}>
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
        {/* Rendered Markdown Body */}
        <article className="project-markdown-body">
          <div 
            className="markdown-prose"
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />

          {/* Tags Footer */}
          {project.tags && project.tags.length > 0 && (
            <div className="project-tags-section">
              <span className="tags-label">{isEn ? "Tags:" : "الوسوم والكلمات المفتاحية:"}</span>
              <div className="project-tags-list">
                {project.tags.map((tag, idx) => (
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
            <a href="#contact" className="project-cta-btn">
              <Send size={16} />
              <span>{isEn ? "Contact Bureau" : "تواصل مع المكتب"}</span>
            </a>
          </div>
        </article>

        {/* Desktop Sticky Sidebar (TOC + Related Projects) */}
        <aside className="project-sidebar">
          {/* Desktop Table of Contents */}
          {tocHeadings.length > 0 && (
            <div className="desktop-toc-card">
              <div className="toc-card-header">
                <ListOrdered size={17} />
                <h3 className="toc-card-title">{isEn ? "Table of Contents" : "فهرس المشروع"}</h3>
              </div>
              <nav className="desktop-toc-nav" aria-label="Table of Contents">
                <ul className="desktop-toc-list">
                  {tocHeadings.map((heading) => (
                    <li key={heading.id} className={`desktop-toc-item level-${heading.level}`}>
                      <a
                        href={`#${heading.id}`}
                        className={`desktop-toc-link ${activeHeadingId === heading.id ? 'active' : ''}`}
                        onClick={(e) => handleHeadingClick(e, heading.id)}
                      >
                        <span className="toc-indicator" />
                        <span className="toc-text">{heading.text}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}

          {/* Related Projects Card */}
          <div className="sidebar-related-card">
            <div className="related-card-header">
              <Sparkles size={17} />
              <h3 className="related-card-title">{isEn ? "Related Projects" : "مشاريع ذات صلة"}</h3>
            </div>
            <div className="related-projects-list">
              {relatedProjects.map((rel) => (
                <div
                  key={rel.slug}
                  className="related-project-item"
                  onClick={() => onSelectProject(rel)}
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
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom Related Projects Grid */}
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
          {relatedProjects.map((rel) => (
            <div 
              key={rel.slug} 
              className="bottom-related-card"
              onClick={() => onSelectProject(rel)}
            >
              <div className="related-card-img-wrap">
                <img
                  src={rel.image}
                  alt={rel.altText || rel.title}
                  className="bottom-card-img"
                  loading="lazy"
                />
                <span className="bottom-card-badge">{rel.categoryNameAr}</span>
              </div>
              <div className="bottom-card-body">
                <h3 className="bottom-card-title">{rel.title}</h3>
                <p className="bottom-card-desc">{rel.excerpt}</p>
                <div className="bottom-card-footer">
                  <span className="bottom-card-link">
                    <span>{isEn ? "View Case Study" : "استعراض المشروع"}</span>
                    {isEn ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailView;
