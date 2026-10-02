'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  BookOpen,
  Sparkles,
  Info
} from 'lucide-react';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import './Bookcase.css';

// ISO A4 in PDF points (210 × 297 mm)
const A4_W = 595.276;
const A4_H = 841.89;

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
  const [loadingMessage, setLoadingMessage] = useState(isEn ? 'Loading Document...' : 'جاري تحميل الوثيقة...');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // Opens expanded (filling the whole screen) on every device; the button can shrink it
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fitKey, setFitKey] = useState(0); // bumps on resize → sheets re-fitted to the screen
  const [isSpread, setIsSpread] = useState(true); // two-page spread vs single page

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

      // Every sheet is an A4 sheet (owner's rule, for current and future files): the
      // canvas has A4 proportions and the PDF page is fitted and centred on it, so
      // Letter / odd-sized / landscape pages still show as A4 paper.
      const sheetW = Math.round(A4_W * baseScale * pixelRatio);
      const sheetH = Math.round(A4_H * baseScale * pixelRatio);
      const natural = page.getViewport({ scale: 1 });
      const fit = Math.min(sheetW / natural.width, sheetH / natural.height);
      const viewport = page.getViewport({ scale: fit });

      const canvas = document.createElement('canvas');
      canvas.width = sheetW;
      canvas.height = sheetH;
      canvas.style.width = '100%';
      canvas.style.height = '100%';

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, sheetW, sheetH);

      const renderContext = {
        canvasContext: ctx,
        viewport,
        transform: [1, 0, 0, 1, Math.round((sheetW - viewport.width) / 2), Math.round((sheetH - viewport.height) / 2)]
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

        // The book always has A4 portrait sheets, whatever the file's page size, and a
        // whole sheet must fit the visible area (no cropping, no scrolling): size the
        // pages from the stage. Two-page spread when it leaves the sheets big enough,
        // otherwise a single page (phones / narrow windows).
        const stageEl = bookElementRef.current?.parentElement;
        const availW = Math.max(240, (stageEl?.clientWidth || window.innerWidth) - 2);
        const availH = Math.max(320, (stageEl?.clientHeight || window.innerHeight * 0.7) - 2);
        const R = A4_H / A4_W;
        const singleH = Math.min(availH, availW * R);
        let sheetH = Math.min(availH, (availW / 2) * R);
        const spread = sheetH >= singleH * 0.72;
        if (!spread) sheetH = singleH;
        setIsSpread(spread);
        const bookHeight = Math.floor(sheetH);
        const bookWidth = Math.floor(sheetH / R);

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
          size: 'fixed',
          minWidth: 100,
          maxWidth: 4000,
          minHeight: 100,
          maxHeight: 4000,
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
        // In single-page mode the library sizes the sheet from the container width
        // (width:100% + ratio padding), so cap the container to the fitted sheet(s):
        // the whole A4 sheet then always fits the visible area.
        viewerContainer.style.maxWidth = `${spread ? bookWidth * 2 : bookWidth}px`;
        viewerContainer.style.minWidth = '0px';
        viewerContainer.style.minHeight = '0px';

        // Arabic book in every UI language (the uploaded documents are Arabic): page 1
        // on the right, page 2 on the left, pages turn from left to right. page-flip
        // has no RTL mode, so the book container is mirrored in CSS (.is-rtl-book) and
        // each page's content is mirrored back. Pointer/touch coordinates are mirrored
        // here so dragging a corner or swiping follows the finger on the mirrored book.
        const ui = pageFlip.getUI?.();
        if (ui && typeof ui.getMousePos === 'function') {
          ui.getMousePos = (clientX: number, clientY: number) => {
            const rect = ui.distElement.getBoundingClientRect();
            return { x: rect.right - clientX, y: clientY - rect.top };
          };
        }

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
  }, [isOpen, pdfUrl, isEn, loadPdfJs, renderPageSlot, updateVirtualPages, fitKey]);

  // Re-fit the A4 sheets to the screen after a resize / rotation
  useEffect(() => {
    if (!isOpen) return;
    let t: number | undefined;
    let last = `${window.innerWidth}x${window.innerHeight}`;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => {
        const now = `${window.innerWidth}x${window.innerHeight}`;
        if (now !== last) {
          last = now;
          setFitKey((k) => k + 1);
        }
      }, 350);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('resize', onResize);
    };
  }, [isOpen]);

  // Dynamic stage transform for centering closed book (Page 1 Cover) or back cover
  const getStageTransform = () => {
    // Only a two-page spread needs the closed-cover shift; a single page is centred.
    if (!isSpread) {
      return undefined;
    }
    // The book is mirrored (RTL): the closed front cover sits on the LEFT half of the
    // spread and the back cover on the RIGHT half, so they shift the other way.
    if (currentPage <= 1) {
      return 'translateX(25%)';
    }
    if (totalPages > 1 && currentPage >= totalPages) {
      return 'translateX(-25%)';
    }
    return 'translateX(0)';
  };

  // Keyboard navigation (Unified RTL reading: ArrowLeft, Space, PageDown to advance Right-to-Left)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (
        e.key === 'ArrowLeft' ||
        e.key === 'PageDown' ||
        (e.key === ' ' && (e.target === document.body || (e.target as HTMLElement)?.classList.contains('flipbook-modal') || (e.target as HTMLElement)?.classList.contains('flipbook-body')))
      ) {
        e.preventDefault();
        pageFlipInstanceRef.current?.flipNext();
      } else if (e.key === 'ArrowRight' || e.key === 'PageUp') {
        // Arabic book: the right arrow goes back a page, in both UI languages.
        e.preventDefault();
        pageFlipInstanceRef.current?.flipPrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        pageFlipInstanceRef.current?.flip(0);
      } else if (e.key === 'End' && totalPages > 0) {
        e.preventDefault();
        pageFlipInstanceRef.current?.flip(totalPages - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentPage, totalPages, onClose]);

  // Expanded = the reader fills the screen (CSS, works everywhere incl. iPhone) and,
  // where the browser allows it, real fullscreen on top. Re-fit the sheets after.
  const toggleFullscreen = () => {
    const next = !isFullscreen;
    setIsFullscreen(next);
    try {
      if (next && containerRef.current && !document.fullscreenElement) {
        containerRef.current.requestFullscreen?.().catch(() => {});
      } else if (!next && document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    } catch {
      /* fullscreen API unavailable: CSS expansion only */
    }
    setTimeout(() => setFitKey((k) => k + 1), 60);
  };

  // Every opening starts expanded (+ real fullscreen when allowed: the opening click
  // is still a user gesture at this point)
  useEffect(() => {
    if (!isOpen) return;
    setIsFullscreen(true);
    try {
      if (containerRef.current && !document.fullscreenElement && window.matchMedia('(pointer: coarse)').matches) {
        containerRef.current.requestFullscreen?.().catch(() => {});
      }
    } catch {
      /* ignore */
    }
    return () => {
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
  }, [isOpen]);

  const handlePrev = () => {
    pageFlipInstanceRef.current?.flipPrev();
  };

  const handleNext = () => {
    pageFlipInstanceRef.current?.flipNext();
  };

  const handleCoverClick = () => {
    if (currentPage <= 1) {
      pageFlipInstanceRef.current?.flipNext();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`flipbook-overlay ${isFullscreen ? 'is-expanded' : ''}`}
      onClick={onClose} 
      role="dialog" 
      aria-modal="true"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        className="flipbook-modal"
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.preventDefault()}
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
              <span>{subtitle || (isEn ? 'Interactive Document Reader (RTL)' : 'قارئ المستندات الهندسية التفاعلي (RTL)')}</span>
            </div>
          </div>

          <div className="flipbook-header-actions">
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

          <div className="flipbook-stage-wrapper" onClick={handleCoverClick}>
            <div
              id="book"
              ref={bookElementRef}
              className="st-page-flip-container is-rtl-book"
              style={{
                visibility: loading ? 'hidden' : 'visible',
                // Mirror for the Arabic (RTL) book; the translate is applied after the
                // mirror, so its sign is the visual direction.
                transform: `${getStageTransform() ?? ''} scaleX(-1)`.trim(),
              }}
            />
          </div>
        </div>

        {/* Bottom Interactive Navigation Toolbar */}
        <footer className="flipbook-footer">
          <div className="fb-hint-text">
            <Sparkles size={14} color="#38bdf8" />
            <span>{isEn ? 'Arabic book: drag the left page corner or use the arrows to turn pages' : 'كتاب عربي: اسحب زاوية الصفحة اليسرى أو استخدم الأسهم لتقليب الصفحات'}</span>
          </div>

          {/* Always right-to-left (Arabic book): previous on the right, next on the left */}
          <div className="fb-nav-group" dir="rtl">
            <button
              type="button"
              className="fb-nav-btn"
              onClick={handlePrev}
              disabled={currentPage <= 1 || loading}
              title={isEn ? 'Previous Page' : 'الصفحة السابقة'}
            >
              <ChevronRight size={18} />
              <span>{isEn ? 'Previous' : 'السابق'}</span>
            </button>

            <div className="fb-page-counter">
              <span>{isEn ? `Page ${currentPage} of ${totalPages || '--'}` : `صفحة ${currentPage} من ${totalPages || '--'}`}</span>
            </div>

            <button
              type="button"
              className="fb-nav-btn fb-nav-btn-next"
              onClick={handleNext}
              disabled={currentPage >= totalPages || loading}
              title={isEn ? 'Next Page' : 'الصفحة التالية'}
            >
              <span>{isEn ? 'Next' : 'التالي'}</span>
              <ChevronLeft size={18} />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default FlipbookViewer;
