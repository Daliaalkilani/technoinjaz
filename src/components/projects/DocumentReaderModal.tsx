import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Maximize2, 
  Minimize2, 
  ShieldCheck, 
  List,
  Layers,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { PageFlip } from 'page-flip';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import type { DriveProject } from '../../data/driveProjectsData';
import './DocumentReaderModal.css';

interface DocumentReaderModalProps {
  project: DriveProject | null;
  isOpen: boolean;
  onClose: () => void;
}


export const DocumentReaderModal: React.FC<DocumentReaderModalProps> = ({
  project,
  isOpen,
  onClose
}) => {
  const { lang } = useThemeLanguage();
  const isRtl = lang === 'ar';

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<'flipbook' | 'original'>('flipbook');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(8);
  const [tocOpen, setTocOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const bookContainerRef = useRef<HTMLDivElement>(null);
  const pageFlipRef = useRef<PageFlip | null>(null);

  // Handle ESC and Arrow keys for turning
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowLeft') {
        pageFlipRef.current?.flipPrev();
      } else if (e.key === 'ArrowRight') {
        pageFlipRef.current?.flipNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFullscreen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentPage(1);
    } else {
      document.body.style.overflow = '';
      if (pageFlipRef.current) {
        pageFlipRef.current.destroy();
        pageFlipRef.current = null;
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Initialize or re-initialize StPageFlip
  const initPageFlip = useCallback(() => {
    if (!bookContainerRef.current) return;

    if (pageFlipRef.current) {
      try {
        pageFlipRef.current.destroy();
      } catch {
        // Destroy safely
      }
      pageFlipRef.current = null;
    }

    try {
      const pageFlip = new PageFlip(bookContainerRef.current, {
        width: 480,
        height: 640,
        size: 'stretch' as any,
        minWidth: 300,
        maxWidth: 720,
        minHeight: 400,
        maxHeight: 960,
        maxShadowOpacity: 0.55,
        showCover: true,
        mobileScrollSupport: false,
        usePortrait: true,
        flippingTime: 750,
        drawShadow: true,
        showPageCorners: true,
        useMouseEvents: true,
        autoSize: true,
        swipeDistance: 35
      });

      const pages = bookContainerRef.current.querySelectorAll<HTMLElement>('.st-page');
      if (pages.length > 0) {
        pageFlip.loadFromHTML(pages);
        setTotalPages(pages.length);
        setCurrentPage(1);
      }

      pageFlip.on('flip', (e: any) => {
        const pageIdx = typeof e.data === 'number' ? e.data : 0;
        setCurrentPage(pageIdx + 1);
      });

      pageFlipRef.current = pageFlip;
    } catch (err) {
      console.error('Error initializing StPageFlip:', err);
    }
  }, []);

  // Run initialization when flipbook view becomes active
  useEffect(() => {
    if (!isOpen || viewMode !== 'flipbook') return;

    const timer = setTimeout(() => {
      initPageFlip();
    }, 60);

    return () => {
      clearTimeout(timer);
      if (pageFlipRef.current) {
        try {
          pageFlipRef.current.destroy();
        } catch {
          // ignore
        }
        pageFlipRef.current = null;
      }
    };
  }, [isOpen, viewMode, initPageFlip]);

  if (!isOpen || !project) return null;

  const title = lang === 'ar' ? project.title : project.titleEn;
  const desc = lang === 'ar' ? project.description : project.descriptionEn;
  const pdfId = project.pdfId || '1edEWYRLqtgSVRw0Eq7NmCldb_fxzi5OW';
  const previewUrl = `https://drive.google.com/file/d/${pdfId}/preview`;

  // Next Page: Turns forward (LTR)
  const handleNextPage = () => {
    pageFlipRef.current?.flipNext();
  };

  // Prev Page: Turns backward (LTR)
  const handlePrevPage = () => {
    pageFlipRef.current?.flipPrev();
  };

  const handleJumpToPage = (pageNum: number) => {
    pageFlipRef.current?.flip(pageNum - 1);
    setTocOpen(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div 
      className={`flipbook-modal-backdrop ${isFullscreen ? 'fullscreen-mode' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div ref={modalRef} className="flipbook-modal-window">
        {/* Top Metallic Engineering Bar */}
        <header className="flipbook-header">
          <div className="flipbook-header-left" />

          {/* Center Mode Switch: 3D Flipbook vs Drive Original */}
          <div className="flipbook-view-switcher">
            <button
              type="button"
              className={`switcher-tab ${viewMode === 'flipbook' ? 'active' : ''}`}
              onClick={() => setViewMode('flipbook')}
              title={isRtl ? 'تصفح ورقي ثلاثي الأبعاد بمحرك StPageFlip' : 'Interactive 3D Flipbook Mode'}
            >
              <Sparkles size={14} />
              <span>{isRtl ? 'تصفح ورقي 3D' : '3D Flipbook'}</span>
            </button>
            <button
              type="button"
              className={`switcher-tab ${viewMode === 'original' ? 'active' : ''}`}
              onClick={() => setViewMode('original')}
              title={isRtl ? 'معاينة ملف Google Drive المباشر' : 'View Raw Drive PDF'}
            >
              <Layers size={14} />
              <span>{isRtl ? 'المستند المباشر' : 'Original PDF'}</span>
            </button>
          </div>

          {/* Action buttons on header right */}
          <div className="flipbook-header-actions">
            {/* Fullscreen Toggle */}
            <button
              type="button"
              className="flipbook-tool-btn"
              onClick={toggleFullscreen}
              title={isFullscreen ? (isRtl ? 'تصغير' : 'Exit Fullscreen') : (isRtl ? 'ملء الشاشة' : 'Fullscreen')}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            {/* Close Button */}
            <button
              type="button"
              className="flipbook-tool-btn close-btn"
              onClick={onClose}
              title={isRtl ? 'إغلاق' : 'Close'}
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* Project Title Bar: Simple & clean with no extra buttons */}
        <div className="flipbook-meta-bar">
          <h2 className="flipbook-project-title">{title}</h2>
        </div>

        {/* View Mode 1: 3D Flipbook using StPageFlip Engine */}
        {viewMode === 'flipbook' && (
          <div className="flipbook-stage-wrapper">
            {/* LEFT NAV BUTTON: PREVIOUS */}
            <button 
              type="button" 
              className="flipbook-curl-nav nav-left"
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              title={isRtl ? 'الصفحة السابقة' : 'Previous Page'}
            >
              <ChevronLeft size={28} />
              <span className="nav-btn-caption">{isRtl ? 'السابق' : 'Prev'}</span>
            </button>

            {/* Realistic Book Stage */}
            <div className="flipbook-3d-stage">
              <div className="flipbook-outer-case">
                <div className="flipbook-spine-binding" />
                
                {/* StPageFlip Mount Target */}
                <div 
                  ref={bookContainerRef} 
                  className="stpageflip-book-container"
                  dir="ltr"
                >
                  {/* High-Fidelity Default Project 8-Page Technical Document (LTR Progression) */}
                  {/* PAGE 1: Hard Front Cover */}
                      <div className="st-page hard-cover front-cover" data-density="hard">
                        <div className="cover-card-art">
                          <div className="cover-circuit-overlay" />
                          <div className="cover-gold-border">
                            <div className="cover-header-brand">
                              <span className="brand-dot" />
                              <span>تكنو إنجاز | TECHNO ENJAZ</span>
                            </div>

                            <div className="cover-badge-top">
                              <Sparkles size={14} className="text-cyan-400" />
                              <span>{isRtl ? 'وثيقة هندسية وتقنية موثقة' : 'Verified Technical Monograph'}</span>
                            </div>

                            <div className="cover-title-box">
                              <h1 className="cover-h1">{title}</h1>
                              <h2 className="cover-h2-en">{project.titleEn}</h2>
                            </div>

                            <div className="cover-meta-grid">
                              <div className="cover-meta-item">
                                <span className="meta-lbl">{isRtl ? 'التصنيف الهيكلي' : 'Domain Category'}</span>
                                <span className="meta-val highlight">{project.category.toUpperCase()} ARCHITECTURE</span>
                              </div>
                              <div className="cover-meta-item">
                                <span className="meta-lbl">{isRtl ? 'رقم الوثيقة' : 'Document ID'}</span>
                                <span className="meta-val font-mono">TE-{project.id.toUpperCase().substring(0, 10)}-2026</span>
                              </div>
                              <div className="cover-meta-item">
                                <span className="meta-lbl">{isRtl ? 'مستوى الاعتماد' : 'Certification'}</span>
                                <span className="meta-val">{isRtl ? 'معيار مؤسسي كامل' : 'Full Enterprise Grade'}</span>
                              </div>
                            </div>

                            <div className="cover-footer-seal">
                              <div className="seal-emblem">
                                <ShieldCheck size={26} />
                                <span>TECHNO ENJAZ SEAL</span>
                              </div>
                              <div className="cover-hint-peel">
                                <span>{isRtl ? 'اضغط أو اسحب زاوية الغلاف للفتح ↗' : 'Drag corner or click to open ↗'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* PAGE 2: Chapter 1: Executive Summary */}
                      <div className="st-page inner-page" data-density="soft">
                        <div className="page-header-strip">
                          <span className="doc-section-name">{isRtl ? 'الفصل الأول: الملخص التنفيذي' : 'Chapter 1: Executive Summary'}</span>
                        </div>
                        <div className="page-text-content">
                          <h3 className="page-section-title">{isRtl ? '١.١ الإطار العام والنطاق العملي للمشروع' : '1.1 Project Overview & Scope'}</h3>
                          <p className="page-lead-para">{desc}</p>

                          <h4 className="page-sub-title">{isRtl ? 'الأهداف الهندسية الاستراتيجية' : 'Strategic Engineering Objectives'}</h4>
                          <ul className="page-bullet-list">
                            <li>
                              <CheckCircle2 size={14} className="bullet-icon" />
                              <span>{isRtl ? 'تصميم خوارزمية ذكية متقدمة لمعالجة البيانات واستخلاص الأنماط اللحظية بدقة استثنائية.' : 'Design advanced real-time pipeline for ultra-accurate pattern inference.'}</span>
                            </li>
                            <li>
                              <CheckCircle2 size={14} className="bullet-icon" />
                              <span>{isRtl ? 'تحسين زمن المعالجة (Latency Optimization) ليعمل بكفاءة عالية في بيئات الموارد المحدودة.' : 'Optimize execution latency for constrained production environments.'}</span>
                            </li>
                            <li>
                              <CheckCircle2 size={14} className="bullet-icon" />
                              <span>{isRtl ? 'تطبيق معايير الأمان السيبراني وعزل الصلاحيات وحماية البيانات الحساسة.' : 'Enforce zero-trust cyber protocols and granular identity management.'}</span>
                            </li>
                          </ul>

                          <div className="page-callout-box">
                            <span className="callout-title">{isRtl ? 'الكلمات المفتاحية والمحددات:' : 'Indexed Keywords:'}</span>
                            <div className="callout-tags">
                              {project.tags.map(t => (
                                <span key={t} className="page-keyword-tag">#{t}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="page-footer-strip">
                          <span>{isRtl ? 'منظومة تكنو إنجاز للحلول الهندسية' : 'Techno Enjaz Engineering Platform'}</span>
                        </div>
                      </div>

                      {/* PAGE 3: Chapter 2: System Architecture */}
                      <div className="st-page inner-page" data-density="soft">
                        <div className="page-header-strip">
                          <span className="doc-section-name">{isRtl ? 'الفصل الثاني: المعمارية التقنية' : 'Chapter 2: System Architecture'}</span>
                        </div>
                        <div className="page-text-content">
                          <h3 className="page-section-title">{isRtl ? '٢.١ هيكلية الطبقات البرمجية (Layered Architecture)' : '2.1 Layered System Architecture'}</h3>
                          
                          <div className="arch-blueprint-card">
                            <div className="arch-layer">
                              <span className="layer-tag">Layer 01</span>
                              <div className="layer-details">
                                <strong>{isRtl ? 'طبقة العرض والواجهات (Presentation Layer)' : 'Presentation UI / UX Layer'}</strong>
                                <p>{isRtl ? 'واجهات تفاعلية وأنظمة عرض ثلاثية الأبعاد (React 19 / GSAP / Three.js).' : 'Interactive dashboards and 3D render engine.'}</p>
                              </div>
                            </div>
                            <div className="arch-layer">
                              <span className="layer-tag">Layer 02</span>
                              <div className="layer-details">
                                <strong>{isRtl ? 'طبقة الخوادم والمنطق (Backend Core)' : 'Core Service Engine'}</strong>
                                <p>{isRtl ? 'خوادم معالجة الطلبات عالية الكفاءة مع خوارزميات التوزيع ومزامنة الحالات.' : 'High-concurrency event-driven logic.'}</p>
                              </div>
                            </div>
                            <div className="arch-layer">
                              <span className="layer-tag">Layer 03</span>
                              <div className="layer-details">
                                <strong>{isRtl ? 'محرك الحسابات والاستدلال (AI & Compute Engine)' : 'AI Model & Runtime'}</strong>
                                <p>{isRtl ? 'شبكات عصبية مخصصة واستدلال مسرع عبر وحدات GPU.' : 'Accelerated neural inferencing with vector indexing.'}</p>
                              </div>
                            </div>
                          </div>

                          <h4 className="page-sub-title">{isRtl ? 'متطلبات التشغيل والمواصفات' : 'Hardware Requirements'}</h4>
                          <table className="page-spec-table">
                            <thead>
                              <tr>
                                <th>{isRtl ? 'العنصر' : 'Component'}</th>
                                <th>{isRtl ? 'المواصفة الموصى بها' : 'Recommended Spec'}</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>CPU Runtime</td>
                                <td>8-Core 3.2GHz+ (AVX-512)</td>
                              </tr>
                              <tr>
                                <td>Inference GPU</td>
                                <td>NVIDIA RTX / CUDA 12.x</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="page-footer-strip">
                          <span>{isRtl ? 'منظومة تكنو إنجاز للحلول الهندسية' : 'Techno Enjaz Engineering Platform'}</span>
                        </div>
                      </div>

                      {/* PAGE 4: Chapter 3: Algorithmic Logic */}
                      <div className="st-page inner-page" data-density="soft">
                        <div className="page-header-strip">
                          <span className="doc-section-name">{isRtl ? 'الفصل الثالث: الخوارزميات والمنطق' : 'Chapter 3: Algorithmic Logic'}</span>
                        </div>
                        <div className="page-text-content">
                          <h3 className="page-section-title">{isRtl ? '٣.١ خط التدفق الرياضي واستخراج السمات' : '3.1 Mathematical Formulation'}</h3>
                          <p className="page-lead-para">{isRtl ? 'تعتمد المنظومة على دالة تقارب متري مع تطبيق التحسين التدرجي لتقليل نسبة الخطأ إلى الحد الأدنى:' : 'Optimization framework relies on metric loss minimization:'}</p>

                          <div className="page-formula-card">
                            <code>
                              L_total = λ₁ * L_triplet + λ₂ * L_cross_entropy + γ * ||W||²
                            </code>
                          </div>

                          <h4 className="page-sub-title">{isRtl ? 'مخطط تنفيذ الخوارزمية البرمجية' : 'Pseudocode Implementation Flow'}</h4>
                          <pre className="page-code-snippet">
{`async function executePipeline(inputTensor) {
  const normalized = await preprocess(inputTensor);
  const embeddings = await modelEngine.extract(normalized);
  const verified = matchVectorIndex(embeddings, THRESHOLD);
  return { status: "VERIFIED", confidence: verified.score };
}`}
                          </pre>
                        </div>
                        <div className="page-footer-strip">
                          <span>{isRtl ? 'منظومة تكنو إنجاز للحلول الهندسية' : 'Techno Enjaz Engineering Platform'}</span>
                        </div>
                      </div>

                      {/* PAGE 5: Chapter 4: Live Benchmarks */}
                      <div className="st-page inner-page" data-density="soft">
                        <div className="page-header-strip">
                          <span className="doc-section-name">{isRtl ? 'الفصل الرابع: مؤشرات الأداء والنتائج' : 'Chapter 4: Live Benchmarks'}</span>
                        </div>
                        <div className="page-text-content">
                          <h3 className="page-section-title">{isRtl ? '٤.١ نتائج الاختبارات المعملية والميدانية' : '4.1 Empirical Evaluation Matrix'}</h3>
                          
                          <div className="metrics-summary-grid">
                            <div className="metric-box">
                              <span className="metric-num">98.6%</span>
                              <span className="metric-label">{isRtl ? 'دقة الاستدلال' : 'Accuracy'}</span>
                            </div>
                            <div className="metric-box">
                              <span className="metric-num">&lt;16ms</span>
                              <span className="metric-label">{isRtl ? 'زمن الاستجابة' : 'Latency'}</span>
                            </div>
                            <div className="metric-box">
                              <span className="metric-num">60 FPS</span>
                              <span className="metric-label">{isRtl ? 'المعالجة اللحظية' : 'Frame Rate'}</span>
                            </div>
                            <div className="metric-box">
                              <span className="metric-num">0.992</span>
                              <span className="metric-label">{isRtl ? 'معامل الثقة' : 'F1 Confidence'}</span>
                            </div>
                          </div>

                          <h4 className="page-sub-title">{isRtl ? 'مقارنة الأداء في ظروف التشغيل القصوى' : 'Stress Testing Comparative'}</h4>
                          <div className="performance-bars">
                            <div className="p-bar-item">
                              <div className="p-bar-lbl">
                                <span>{isRtl ? 'كفاءة استهلاك الذاكرة' : 'Memory Footprint'}</span>
                                <strong>94%</strong>
                              </div>
                              <div className="p-bar-track"><div className="p-bar-fill" style={{ width: '94%' }} /></div>
                            </div>
                            <div className="p-bar-item">
                              <div className="p-bar-lbl">
                                <span>{isRtl ? 'تحمل الأحمال المتزامنة' : 'Concurrency Scale'}</span>
                                <strong>91%</strong>
                              </div>
                              <div className="p-bar-track"><div className="p-bar-fill" style={{ width: '91%' }} /></div>
                            </div>
                          </div>
                        </div>
                        <div className="page-footer-strip">
                          <span>{isRtl ? 'منظومة تكنو إنجاز للحلول الهندسية' : 'Techno Enjaz Engineering Platform'}</span>
                        </div>
                      </div>

                      {/* PAGE 6: Chapter 5: Security & Compliance */}
                      <div className="st-page inner-page" data-density="soft">
                        <div className="page-header-strip">
                          <span className="doc-section-name">{isRtl ? 'الفصل الخامس: الأمان والحوكمة' : 'Chapter 5: Security & Compliance'}</span>
                        </div>
                        <div className="page-text-content">
                          <h3 className="page-section-title">{isRtl ? '٥.١ بروتوكولات حماية البيانات المشفرة' : '5.1 Cryptographic Standards'}</h3>
                          <p className="page-lead-para">{isRtl ? 'تخضع كافة مخرجات المنظومة لمعايير التشفير المتطورة لضمان الخصوصية والامتثال للمواصفات العالمية:' : 'All payloads are secured with enterprise cryptographic controls:'}</p>

                          <div className="security-badges-container">
                            <div className="sec-badge-card">
                              <ShieldCheck size={20} className="text-cyan-400" />
                              <div>
                                <strong>AES-256 GCM</strong>
                                <p>{isRtl ? 'تشفير شامل للبيانات المخزنة والمتبادلة عبر الشبكة.' : 'End-to-end payload encryption.'}</p>
                              </div>
                            </div>
                            <div className="sec-badge-card">
                              <ShieldCheck size={20} className="text-cyan-400" />
                              <div>
                                <strong>Zero-Trust RBAC</strong>
                                <p>{isRtl ? 'صلاحيات وصول دقيقة تعتمد على التوثيق متعدد العوامل.' : 'Strict multi-factor role-based access verification.'}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="page-footer-strip">
                          <span>{isRtl ? 'منظومة تكنو إنجاز للحلول الهندسية' : 'Techno Enjaz Engineering Platform'}</span>
                        </div>
                      </div>

                      {/* PAGE 7: Chapter 6: Roadmap & Citations */}
                      <div className="st-page inner-page" data-density="soft">
                        <div className="page-header-strip">
                          <span className="doc-section-name">{isRtl ? 'الفصل السادس: التوصيات والمراجع' : 'Chapter 6: Roadmap & Citations'}</span>
                        </div>
                        <div className="page-text-content">
                          <h3 className="page-section-title">{isRtl ? '٦.١ مراحل التطوير والتوسع القادمة' : '6.1 Strategic Expansion Phases'}</h3>
                          <div className="roadmap-mini-steps">
                            <div className="roadmap-step">
                              <span className="step-num">01</span>
                              <div>
                                <strong>{isRtl ? 'التكامل السحابي الموزع' : 'Edge Distributed Mesh'}</strong>
                                <p>{isRtl ? 'نشر وحدات المعالجة الذكية الطرفية.' : 'Deploying decentralized edge nodes.'}</p>
                              </div>
                            </div>
                            <div className="roadmap-step">
                              <span className="step-num">02</span>
                              <div>
                                <strong>{isRtl ? 'المحاكاة ثلاثية الأبعاد المؤتمتة' : 'Autonomous 3D Simulation'}</strong>
                                <p>{isRtl ? 'توليد سيناريوهات فحص افتراضية.' : 'Synthetic scenario generation.'}</p>
                              </div>
                            </div>
                          </div>

                          <h4 className="page-sub-title">{isRtl ? 'المراجع الأكاديمية والتوثيق' : 'Scholarly References'}</h4>
                          <ol className="citations-list">
                            <li>IEEE Transactions on Neural Networks & Intelligent Systems (2025).</li>
                            <li>ACM Digital Library - Modern Scalable Architectures (2026).</li>
                          </ol>
                        </div>
                        <div className="page-footer-strip">
                          <span>{isRtl ? 'منظومة تكنو إنجاز للحلول الهندسية' : 'Techno Enjaz Engineering Platform'}</span>
                        </div>
                      </div>

                      {/* PAGE 8: Hard Back Cover */}
                      <div className="st-page hard-cover back-cover" data-density="hard">
                        <div className="back-cover-art">
                          <div className="back-circuit-pattern" />
                          <div className="back-seal-box">
                            <div className="back-gold-emblem">
                              <ShieldCheck size={38} className="text-cyan-400" />
                              <span className="emblem-title">TECHNO ENJAZ</span>
                              <span className="emblem-sub">OFFICIAL ENGINEERING MONOGRAPH</span>
                            </div>

                            <p className="back-disclaimer">
                              {isRtl 
                                ? 'هذا المستند التقني صادر رسمياً وموثق ضمن سجلات منظومة تكنو إنجاز للحلول البرمجية والهندسية. جميع حقوق الملكية الفكرية والعلامات التجارية محفوظة ومحمية دولياً.'
                                : 'Official monograph issued under Techno Enjaz Engineering & Software Systems. All intellectual property strictly reserved.'}
                            </p>

                            <div className="back-qr-block">
                              <div className="back-mockup-qr" />
                              <div className="back-qr-info">
                                <strong>VERIFIED DIGITAL ASSET</strong>
                                <span>TE-HASH: 7390-6F49-94C2</span>
                                <span>Riyadh • Global R&amp;D</span>
                              </div>
                            </div>

                            <div className="back-close-prompt">
                              <span>{isRtl ? '© 2026 تكنو إنجاز — نحوّل الفكرة الهندسية إلى واقع' : '© 2026 Techno Enjaz — Engineering Ideas Into Reality'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                </div>
              </div>
            </div>

            {/* RIGHT NAV BUTTON: NEXT */}
            <button 
              type="button" 
              className="flipbook-curl-nav nav-right"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              title={isRtl ? 'الصفحة التالية' : 'Next Page'}
            >
              <ChevronRight size={28} />
              <span className="nav-btn-caption">{isRtl ? 'التالي' : 'Next'}</span>
            </button>
          </div>
        )}

        {/* View Mode 2: Direct Google Drive Embedded PDF Document */}
        {viewMode === 'original' && (
          <div className="flipbook-direct-frame-stage">
            <iframe
              src={previewUrl}
              title={title}
              className="flipbook-drive-iframe"
              allow="autoplay"
            />
          </div>
        )}

        {/* Bottom Bar: Interactive Controls & Page Progress */}
        <footer className="flipbook-bottom-bar">
          <div className="flipbook-bottom-left">
            {viewMode === 'flipbook' && (
              <>
                {/* Table of Contents Dropdown Popover */}
                <div className="flipbook-toc-wrapper">
                  <button
                    type="button"
                    className="flipbook-toc-trigger"
                    onClick={() => setTocOpen(!tocOpen)}
                    title={isRtl ? 'فهرس فصول المستند' : 'Table of Contents'}
                  >
                    <List size={15} />
                    <span>{isRtl ? 'فهرس الفصول' : 'Contents'}</span>
                  </button>

                  {tocOpen && (
                    <div className="flipbook-toc-dropdown">
                      <div className="toc-dropdown-header">
                        <span>{isRtl ? 'فهرس فصول المستند:' : 'Document Chapters:'}</span>
                        <button type="button" onClick={() => setTocOpen(false)}><X size={14} /></button>
                      </div>
                      <div className="toc-dropdown-items">
                        <button 
                          type="button" 
                          onClick={() => handleJumpToPage(1)} 
                          className={currentPage === 1 ? 'active' : ''}
                        >
                          <span>01. {isRtl ? 'الغلاف الخارجي' : 'Front Cover'}</span>
                        </button>
                        <button 
                          type="button" 
                          onClick={() => handleJumpToPage(2)} 
                          className={currentPage === 2 || currentPage === 3 ? 'active' : ''}
                        >
                          <span>02. {isRtl ? 'الفصل الأول: الملخص التنفيذي' : 'Chapter 1: Executive Summary'}</span>
                        </button>
                        <button 
                          type="button" 
                          onClick={() => handleJumpToPage(3)} 
                          className={currentPage === 2 || currentPage === 3 ? 'active' : ''}
                        >
                          <span>03. {isRtl ? 'الفصل الثاني: المعمارية التقنية' : 'Chapter 2: System Architecture'}</span>
                        </button>
                        <button 
                          type="button" 
                          onClick={() => handleJumpToPage(4)} 
                          className={currentPage === 4 || currentPage === 5 ? 'active' : ''}
                        >
                          <span>04. {isRtl ? 'الفصل الثالث: الخوارزميات والمنطق' : 'Chapter 3: Algorithmic Logic'}</span>
                        </button>
                        <button 
                          type="button" 
                          onClick={() => handleJumpToPage(5)} 
                          className={currentPage === 4 || currentPage === 5 ? 'active' : ''}
                        >
                          <span>05. {isRtl ? 'الفصل الرابع: مؤشرات الأداء والنتائج' : 'Chapter 4: Live Benchmarks'}</span>
                        </button>
                        <button 
                          type="button" 
                          onClick={() => handleJumpToPage(6)} 
                          className={currentPage === 6 || currentPage === 7 ? 'active' : ''}
                        >
                          <span>06. {isRtl ? 'الفصل الخامس: الأمان والحوكمة' : 'Chapter 5: Security & Compliance'}</span>
                        </button>
                        <button 
                          type="button" 
                          onClick={() => handleJumpToPage(7)} 
                          className={currentPage === 6 || currentPage === 7 ? 'active' : ''}
                        >
                          <span>07. {isRtl ? 'الفصل السادس: التوصيات والمراجع' : 'Chapter 6: Roadmap & Citations'}</span>
                        </button>
                        <button 
                          type="button" 
                          onClick={() => handleJumpToPage(8)} 
                          className={currentPage >= 8 ? 'active' : ''}
                        >
                          <span>08. {isRtl ? 'الغلاف الخلفي والختم الرسمي' : 'Back Cover & Official Seal'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flipbook-page-counter">
                  <span className="page-pill">
                    {isRtl ? `الصفحة ${currentPage} من ${totalPages}` : `Page ${currentPage} of ${totalPages}`}
                  </span>
                </div>
              </>
            )}

            {viewMode === 'original' && (
              <div className="flipbook-page-counter">
                <span className="page-pill">
                  {isRtl ? 'وضع معاينة Google Drive الأصلية' : 'Google Drive Preview Mode'}
                </span>
              </div>
            )}
          </div>

          <div className="flipbook-bottom-right">
            {viewMode === 'original' && (
              <span className="flipbook-help-hint">
                {isRtl ? 'معاينة مباشرة من سحابة تكنو إنجاز' : 'Direct secure cloud stream'}
              </span>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DocumentReaderModal;
