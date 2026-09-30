'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  Minimize2,
  BookOpen,
  Sparkles,
  Info
} from 'lucide-react';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import './Bookcase.css';

export interface FlipbookViewerProps {
  pdfUrl?: string;
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const FlipbookViewer: React.FC<FlipbookViewerProps> = ({
  pdfUrl = '/pdf/robotics-summer-club.pdf',
  title,
  subtitle,
  isOpen,
  onClose
}) => {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';

  const containerRef = useRef<HTMLDivElement | null>(null);
  const bookElementRef = useRef<HTMLDivElement | null>(null);
  const pageFlipInstanceRef = useRef<any>(null);
  const pdfDocRef = useRef<any>(null);
  const renderStatusRef = useRef<Record<number, { status: string; canvas: HTMLCanvasElement | null; task?: any }>>({});

  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState(isEn ? 'Loading 3D Document...' : 'جاري تهيئة الوثيقة ثلاثية الأبعاد...');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load PDF.js from local vendor bundle
  const loadPdfJs = useCallback(async (): Promise<any> => {
    if (typeof window === 'undefined') return null;
    if ((window as any).pdfjsLib) return (window as any).pdfjsLib;

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = '/vendor/pdfjs/pdf.min.js';
      script.async = true;
      script.onload = () => {
        const lib = (window as any).pdfjsLib;
        if (lib) {
          lib.GlobalWorkerOptions.workerSrc = '/vendor/pdfjs/pdf.worker.min.js';
          resolve(lib);
        } else {
          reject(new Error('PDF.js library failed to initialize'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load local PDF.js script'));
      document.head.appendChild(script);
    });
  }, []);

  // Render a specific page onto its DOM slot
  const renderPageSlot = useCallback(async (pageNum: number, pageDiv: HTMLElement) => {
    const pdfDoc = pdfDocRef.current;
    if (!pdfDoc || pageNum < 1 || pageNum > pdfDoc.numPages) return;

    const currentStatus = renderStatusRef.current[pageNum];
    if (currentStatus && (currentStatus.status === 'rendered' || currentStatus.status === 'rendering')) {
      return;
    }

    renderStatusRef.current[pageNum] = { status: 'rendering', canvas: null };

    try {
      const page = await pdfDoc.getPage(pageNum);
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const baseScale = 1.35;
      const viewport = page.getViewport({ scale: baseScale * pixelRatio });

      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = '100%';
      canvas.style.height = '100%';

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const renderContext = {
        canvasContext: ctx,
        viewport
      };

      const renderTask = page.render(renderContext);
      renderStatusRef.current[pageNum].task = renderTask;
      await renderTask.promise;

      pageDiv.innerHTML = '';
      pageDiv.appendChild(canvas);
      renderStatusRef.current[pageNum] = { status: 'rendered', canvas };
    } catch (err: any) {
      if (err?.name !== 'RenderingCancelledException') {
        renderStatusRef.current[pageNum] = { status: 'idle', canvas: null };
      }
    }
  }, []);

  // Unload distant pages to preserve GPU memory
  const unloadPageSlot = useCallback((pageNum: number, pageDiv: HTMLElement) => {
    const status = renderStatusRef.current[pageNum];
    if (!status || status.status !== 'rendered') return;

    if (status.canvas) {
      status.canvas.width = 1;
      status.canvas.height = 1;
    }
    pageDiv.innerHTML = `
      <div class="page-loading-slot">
        <div class="page-spinner"></div>
        <span>${isEn ? `Page ${pageNum}` : `صفحة ${pageNum}`}</span>
      </div>
    `;
    renderStatusRef.current[pageNum] = { status: 'idle', canvas: null };
  }, [isEn]);

  // Virtualization buffer
  const updateVirtualPages = useCallback((activePageZeroBased: number, total: number) => {
    if (!bookElementRef.current) return;
    const active = activePageZeroBased + 1;
    const VIRTUAL_BUFFER = 2;
    const minPage = Math.max(1, active - VIRTUAL_BUFFER);
    const maxPage = Math.min(total, active + VIRTUAL_BUFFER + 1);

    for (let p = 1; p <= total; p++) {
      const pageDiv = bookElementRef.current.querySelector(`.page[data-page-num="${p}"]`) as HTMLElement;
      if (!pageDiv) continue;

      if (p >= minPage && p <= maxPage) {
        renderPageSlot(p, pageDiv);
      } else {
        unloadPageSlot(p, pageDiv);
      }
    }
  }, [renderPageSlot, unloadPageSlot]);

  // Initialize PDF and 3D Flipbook
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setLoading(true);
    setError(null);
    setCurrentPage(1);

    const initBook = async () => {
      try {
        setLoadingMessage(isEn ? 'Loading PDF Document...' : 'جاري تحميل ملف الـ PDF...');
        const pdfjs = await loadPdfJs();
        if (!isMounted) return;

        const loadingTask = pdfjs.getDocument({
          url: pdfUrl,
          cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
          cMapPacked: true
        });

        const pdfDoc = await loadingTask.promise;
        if (!isMounted) return;

        pdfDocRef.current = pdfDoc;
        const total = pdfDoc.numPages;
        setTotalPages(total);

        // Determine aspect ratio from first page
        const page1 = await pdfDoc.getPage(1);
        const vp = page1.getViewport({ scale: 1 });
        const isLandscape = vp.width > vp.height;
        const aspectRatio = vp.width / vp.height;

        let bookWidth = 520;
        let bookHeight = 720;
        if (isLandscape) {
          bookWidth = 620;
          bookHeight = Math.round(620 / aspectRatio);
        } else {
          bookHeight = 700;
          bookWidth = Math.round(700 * aspectRatio);
        }

        const viewerContainer = bookElementRef.current;
        if (!viewerContainer) return;

        viewerContainer.innerHTML = '';

        // Create page container slots
        for (let i = 1; i <= total; i++) {
          const pageDiv = document.createElement('div');
          pageDiv.className = 'page';
          pageDiv.setAttribute('data-page-num', String(i));
          pageDiv.innerHTML = `
            <div class="page-loading-slot">
              <div class="page-spinner"></div>
              <span>${isEn ? `Page ${i}` : `صفحة ${i}`}</span>
            </div>
          `;
          viewerContainer.appendChild(pageDiv);
        }

        // Pre-render the first few pages
        setLoadingMessage(isEn ? 'Rendering 3D Pages...' : 'جاري معالجة الصفحات ثلاثية الأبعاد...');
        const initialToRender = Math.min(total, 4);
        for (let i = 1; i <= initialToRender; i++) {
          const slot = viewerContainer.querySelector(`.page[data-page-num="${i}"]`) as HTMLElement;
          if (slot) {
            await renderPageSlot(i, slot);
          }
        }

        if (!isMounted) return;

        // Dynamically import PageFlip
        const { PageFlip } = await import('page-flip');
        if (!isMounted) return;

        // Initialize PageFlip
        const pageFlip = new PageFlip(viewerContainer, {
          width: bookWidth,
          height: bookHeight,
          size: 'stretch',
          minWidth: 320,
          maxWidth: 960,
          minHeight: isLandscape ? 200 : 440,
          maxHeight: isLandscape ? 600 : 1200,
          maxShadowOpacity: 0.6,
          showCover: true,
          mobileScrollSupport: false,
          usePortrait: true,
          startPage: 0,
          flippingTime: 700,
          useMouseEvents: true,
          swipeDistance: 30
        });

        const pages = viewerContainer.querySelectorAll('.page');
        pageFlip.loadFromHTML(pages);

        pageFlip.on('flip', (e: any) => {
          const pageIndexZero = e.data;
          setCurrentPage(pageIndexZero + 1);
          updateVirtualPages(pageIndexZero, total);
        });

        pageFlipInstanceRef.current = pageFlip;
        setLoading(false);

        // Pre-buffer upcoming pages
        updateVirtualPages(0, total);
      } catch (err: any) {
        console.error('Error initializing 3D flipbook:', err);
        if (isMounted) {
          setError(isEn ? 'Failed to render 3D Flipbook.' : 'تعذر تحميل صفحات الكتاب التفاعلية.');
          setLoading(false);
        }
      }
    };

    initBook();

    return () => {
      isMounted = false;
      if (pageFlipInstanceRef.current) {
        try {
          pageFlipInstanceRef.current.destroy();
        } catch (e) {}
        pageFlipInstanceRef.current = null;
      }
      renderStatusRef.current = {};
    };
  }, [isOpen, pdfUrl, isEn, loadPdfJs, renderPageSlot, updateVirtualPages]);

  // Keyboard navigation (Escape, Left, Right)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        if (isEn) {
          pageFlipInstanceRef.current?.flipNext();
        } else {
          pageFlipInstanceRef.current?.flipPrev();
        }
      } else if (e.key === 'ArrowLeft') {
        if (isEn) {
          pageFlipInstanceRef.current?.flipPrev();
        } else {
          pageFlipInstanceRef.current?.flipNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isEn, onClose]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handlePrev = () => {
    pageFlipInstanceRef.current?.flipPrev();
  };

  const handleNext = () => {
    pageFlipInstanceRef.current?.flipNext();
  };

  if (!isOpen) return null;

  return (
    <div className="flipbook-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="flipbook-modal"
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        dir={isEn ? 'ltr' : 'rtl'}
      >
        {/* Top Header Toolbar */}
        <header className="flipbook-header">
          <div className="flipbook-header-info">
            <div className="flipbook-badge-icon">
              <BookOpen size={18} />
            </div>
            <div className="flipbook-title-group">
              <h3>{title}</h3>
              <span>{subtitle || (isEn ? 'Interactive 3D Virtual Reader' : 'قارئ تفاعلي ثلاثي الأبعاد')}</span>
            </div>
          </div>

          <div className="flipbook-header-actions">
            <a
              href={pdfUrl}
              download={`${title.replace(/\s+/g, '-').toLowerCase()}.pdf`}
              className="fb-btn"
              title={isEn ? 'Download Original PDF' : 'تحميل ملف PDF الأصلي'}
            >
              <Download size={15} />
              <span>{isEn ? 'Download' : 'تحميل PDF'}</span>
            </a>

            <button
              type="button"
              className="fb-btn"
              onClick={toggleFullscreen}
              title={isEn ? 'Toggle Fullscreen' : 'ملء الشاشة'}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            <button
              type="button"
              className="fb-btn fb-btn-close"
              onClick={onClose}
              aria-label={isEn ? 'Close reader' : 'إغلاق القارئ'}
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* Central 3D Flipbook Stage */}
        <div className="flipbook-body">
          {loading && (
            <div className="flipbook-loading-cover">
              <div className="spinner-lg" />
              <span>{loadingMessage}</span>
            </div>
          )}

          {error && (
            <div className="flipbook-loading-cover">
              <Info size={32} color="#ef4444" />
              <span>{error}</span>
            </div>
          )}

          <div className="flipbook-stage-wrapper">
            <div
              id="book"
              ref={bookElementRef}
              className="st-page-flip-container"
              style={{ visibility: loading ? 'hidden' : 'visible' }}
            />
          </div>
        </div>

        {/* Bottom Interactive Navigation Toolbar */}
        <footer className="flipbook-footer">
          <div className="fb-hint-text">
            <Sparkles size={14} color="#38bdf8" />
            <span>{isEn ? 'Tip: Drag or click page corners to fold & turn pages' : 'تلميح: اسحب أو انقر زوايا الصفحات للطي والقلب التفاعلي'}</span>
          </div>

          <div className="fb-nav-group">
            <button
              type="button"
              className="fb-nav-btn"
              onClick={handlePrev}
              disabled={currentPage <= 1 || loading}
              title={isEn ? 'Previous Page' : 'الصفحة السابقة'}
            >
              {isEn ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              <span>{isEn ? 'Previous' : 'السابق'}</span>
            </button>

            <div className="fb-page-counter">
              <span>{isEn ? `Page ${currentPage} of ${totalPages || '--'}` : `صفحة ${currentPage} من ${totalPages || '--'}`}</span>
            </div>

            <button
              type="button"
              className="fb-nav-btn"
              onClick={handleNext}
              disabled={currentPage >= totalPages || loading}
              title={isEn ? 'Next Page' : 'الصفحة التالية'}
            >
              <span>{isEn ? 'Next' : 'التالي'}</span>
              {isEn ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default FlipbookViewer;
