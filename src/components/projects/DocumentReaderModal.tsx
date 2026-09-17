import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Download, 
  BookOpen, 
  Maximize2, 
  Minimize2, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFullscreen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentPage(1);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const title = lang === 'ar' ? project.title : project.titleEn;
  const desc = lang === 'ar' ? project.description : project.descriptionEn;
  const pdfId = project.pdfId || '1edEWYRLqtgSVRw0Eq7NmCldb_fxzi5OW';
  const previewUrl = `https://drive.google.com/file/d/${pdfId}/preview`;
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${pdfId}`;
  const pptxDownloadUrl = project.pptxId ? `https://drive.google.com/uc?export=download&id=${project.pptxId}` : null;

  const handleNextPage = () => {
    setIsFlipping(true);
    setFlipDirection('next');
    setCurrentPage(p => p + 1);
    setTimeout(() => setIsFlipping(false), 450);
  };

  const handlePrevPage = () => {
    if (currentPage <= 1) return;
    setIsFlipping(true);
    setFlipDirection('prev');
    setCurrentPage(p => p - 1);
    setTimeout(() => setIsFlipping(false), 450);
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
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <div ref={modalRef} className="flipbook-modal-window">
        {/* Top Metallic Binder Bar */}
        <header className="flipbook-header">
          <div className="flipbook-header-left">
            <div className="flipbook-book-badge">
              <BookOpen size={18} className="text-cyan-400" />
              <span>{lang === 'ar' ? 'قارئ المستندات الورقي' : 'Paper Flipbook Reader'}</span>
            </div>
            <div className="flipbook-ip-badge">
              <ShieldCheck size={15} />
              <span>{lang === 'ar' ? 'حقوق النشر والملكية الفكرية محفوظة لمنظومة تكنو إنجاز' : 'Intellectual Property Protected - Techno Enjaz'}</span>
            </div>
          </div>

          <div className="flipbook-header-actions">
            <button
              type="button"
              className="flipbook-tool-btn"
              onClick={toggleFullscreen}
              title={isFullscreen ? (lang === 'ar' ? 'تصغير' : 'Exit Fullscreen') : (lang === 'ar' ? 'ملء الشاشة' : 'Fullscreen')}
            >
              {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
            </button>
            <button
              type="button"
              className="flipbook-tool-btn close-btn"
              onClick={onClose}
              title={lang === 'ar' ? 'إغلاق' : 'Close'}
            >
              <X size={19} />
            </button>
          </div>
        </header>

        {/* Project Meta Info Header */}
        <div className="flipbook-meta-bar">
          <div className="flipbook-title-info">
            <h2 className="flipbook-project-title">{title}</h2>
            <p className="flipbook-project-summary">{desc}</p>
          </div>
          <div className="flipbook-downloads-cluster">
            {pptxDownloadUrl && (
              <a
                href={pptxDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flipbook-action-download-btn pptx"
                title={lang === 'ar' ? 'تحميل العرض التقديمي PPTX' : 'Download Presentation PPTX'}
              >
                <Download size={15} />
                <span>{lang === 'ar' ? 'تحميل PPTX' : 'Download PPTX'}</span>
              </a>
            )}
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flipbook-action-download-btn pdf"
              title={lang === 'ar' ? 'تحميل ملف المستند PDF' : 'Download Document PDF'}
            >
              <FileText size={15} />
              <span>{lang === 'ar' ? 'تحميل PDF' : 'Download PDF'}</span>
            </a>
          </div>
        </div>

        {/* Realistic Book Stage */}
        <div className="flipbook-stage-wrapper">
          {/* Left Page Turn Click Strip */}
          <button 
            type="button" 
            className="flipbook-curl-nav prev"
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            title={lang === 'ar' ? 'الصفحة السابقة' : 'Previous Page'}
          >
            {lang === 'ar' ? <ChevronRight size={26} /> : <ChevronLeft size={26} />}
          </button>

          {/* Realistic Book Mockup with Leather Spine & Pages */}
          <div className={`flipbook-physical-book ${isFlipping ? `flipping-${flipDirection}` : ''}`}>
            {/* Book Spine / Binding shadow */}
            <div className="flipbook-spine" />
            
            {/* Paper texture and subtle grid watermark */}
            <div className="flipbook-watermark-ribbon">
              <span>تكنو إنجاز • TECHNO ENJAZ • حقوق الملكية محفوظة</span>
            </div>

            {/* Embedded Google Drive PDF document */}
            <div className="flipbook-pages-container">
              <iframe
                src={previewUrl}
                title={title}
                className="flipbook-iframe"
                allow="autoplay"
              />
            </div>
          </div>

          {/* Right Page Turn Click Strip */}
          <button 
            type="button" 
            className="flipbook-curl-nav next"
            onClick={handleNextPage}
            title={lang === 'ar' ? 'الصفحة التالية' : 'Next Page'}
          >
            {lang === 'ar' ? <ChevronLeft size={26} /> : <ChevronRight size={26} />}
          </button>
        </div>

        {/* Bottom Pagination and Security Bar */}
        <footer className="flipbook-bottom-bar">
          <div className="flipbook-page-counter">
            <span>{lang === 'ar' ? 'تصفح تفاعلي بالورق' : 'Interactive Flipbook Mode'}</span>
            <span className="page-pill">{lang === 'ar' ? `الصفحة المعروضة: ${currentPage}` : `Viewing: Page ${currentPage}`}</span>
          </div>

          <div className="flipbook-copyright-disclaimer">
            <span>{lang === 'ar' ? 'هذا المستند معروض لأغراض القراءة والاطلاع الأكاديمي ويمنع نسخه تجارياً' : 'Document displayed for academic reading. Commercial reproduction strictly prohibited.'}</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DocumentReaderModal;
