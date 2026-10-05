'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
  Info
} from 'lucide-react';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import './Bookcase.css';

const PDFJS_DIR = '/vendor/pdfjs/';

/** Absolute URL of a file in the self-hosted PDF.js folder (cMaps, standard fonts). */
function pdfJsAssetUrl(path: string): string {
  return new URL(PDFJS_DIR + path, window.location.href).href;
}

// The site sends `require-trusted-types-for 'script'` and its default policy only
// passes HTML, so a plain string can no longer be a <script src> or a Worker URL:
// PDF.js could not even load. This policy vouches only for the self-hosted PDF.js
// files on this origin; PDF.js accepts the trusted value as its workerSrc and uses
// it both for the Web Worker and for its main-thread fallback script.
let pdfJsPolicy: { createScriptURL: (url: string) => unknown } | null | undefined;
function pdfJsScriptUrl(file: string): any {
  const url = pdfJsAssetUrl(file);
  const tt = (window as any).trustedTypes;
  if (!tt?.createPolicy) return url;
  if (pdfJsPolicy === undefined) {
    try {
      pdfJsPolicy = tt.createPolicy('pdfjs', {
        createScriptURL: (input: string) => {
          const u = new URL(input, window.location.href);
          if (u.origin !== window.location.origin || !u.pathname.startsWith(PDFJS_DIR)) {
            throw new TypeError(`Untrusted script URL: ${input}`);
          }
          return u.href;
        }
      });
    } catch {
      pdfJsPolicy = null;
    }
  }
  return pdfJsPolicy ? pdfJsPolicy.createScriptURL(url) : url;
}

// PDF.js is loaded once and shared; project pages preload it in the background so
// the reader opens without waiting for the library.
let pdfJsPromise: Promise<any> | null = null;
export function loadPdfJsLib(): Promise<any> {
  if (typeof window === 'undefined') return Promise.resolve(null);
  const ready = (lib: any) => {
    lib.GlobalWorkerOptions.workerSrc = pdfJsScriptUrl('pdf.worker.min.js');
    return lib;
  };
  if ((window as any).pdfjsLib) return Promise.resolve(ready((window as any).pdfjsLib));
  if (pdfJsPromise) return pdfJsPromise;
  pdfJsPromise = new Promise((resolve, reject) => {
    const fail = (err: unknown) => {
      pdfJsPromise = null;
      reject(err);
    };
    try {
      const script = document.createElement('script');
      script.async = true;
      script.onload = () => {
        const lib = (window as any).pdfjsLib;
        if (!lib) return fail(new Error('PDF.js library failed to initialize'));
        try {
          resolve(ready(lib));
        } catch (err) {
          fail(err);
        }
      };
      script.onerror = () => {
        script.remove();
        fail(new Error('Failed to load local PDF.js script'));
      };
      script.src = pdfJsScriptUrl('pdf.min.js');
      document.head.appendChild(script);
    } catch (err) {
      fail(err);
    }
  });
  return pdfJsPromise;
}

/** Warm up the reader: PDF.js + its worker + the start of the PDF file. */
export function preloadFlipbook(pdfUrl?: string) {
  if (typeof window === 'undefined') return;
  loadPdfJsLib().catch(() => {});
  const hint = (href: string, as: string) => {
    if (document.head.querySelector(`link[data-fb-preload="${href}"]`)) return;
    const l = document.createElement('link');
    l.rel = 'prefetch';
    l.href = href;
    l.as = as;
    l.setAttribute('data-fb-preload', href);
    document.head.appendChild(l);
  };
  hint('/vendor/pdfjs/pdf.worker.min.js', 'script');
  if (pdfUrl) hint(pdfUrl, 'fetch');
}

interface PdfDocLoad {
  url: string;
  promise: Promise<any>;
  destroy: () => void;
}

/** Opens a PDF with PDF.js. If PDF.js's own download or parsing fails, the file is
 *  fetched once more with a plain fetch() and opened from memory. */
function openPdfDocument(pdfjs: any, url: string, onProgress: (loaded: number, total: number) => void): PdfDocLoad {
  let task: any = null;
  let destroyed = false;
  const options = {
    cMapUrl: pdfJsAssetUrl('cmaps/'),
    cMapPacked: true,
    // fonts a PDF references without embedding them (Helvetica, Times, Symbol…)
    standardFontDataUrl: pdfJsAssetUrl('standard_fonts/'),
    // Cloudflare's asset server ignores Range (200 + whole file) and sends no
    // Accept-Ranges; a proxy that advertises ranges but still answers 200 would make
    // PDF.js splice whole files into its chunk map, so stream the file in one request.
    disableRange: true,
    // string-to-code compilation is blocked by the Trusted Types CSP
    isEvalSupported: false
  };
  const open = (src: object) => {
    task = pdfjs.getDocument({ ...options, ...src });
    task.onProgress = (p: { loaded: number; total: number }) => onProgress(p.loaded, p.total);
    return task.promise;
  };
  const promise = (async () => {
    try {
      return await open({ url });
    } catch (err: any) {
      // a second download can't fix a worker that won't start or a password
      if (destroyed || err?.name === 'PasswordException' || /worker/i.test(String(err?.message))) throw err;
      console.warn('PDF.js could not open the file, retrying from memory:', err);
      task?.destroy();
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status} while downloading the PDF`);
      const data = new Uint8Array(await res.arrayBuffer());
      if (destroyed) throw err;
      return await open({ data });
    }
  })();
  return {
    url,
    promise,
    destroy: () => {
      destroyed = true;
      task?.destroy();
    }
  };
}

// ISO A4 in PDF points (210 × 297 mm)
const A4_W = 595.276;
const A4_H = 841.89;

/** Canvas width for a sheet shown `cssW` px wide: exactly 1 canvas pixel per device
 *  pixel (no up/down-sampling softening the text), capped to keep canvases light —
 *  tighter on phones/tablets (≈5 MP per sheet), whose canvas memory budget is small. */
function sheetPixelWidth(cssW: number): number {
  const dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), 3);
  const coarse = window.matchMedia?.('(pointer: coarse)').matches;
  return Math.max(1, Math.min(Math.round(cssW * dpr), coarse ? 1880 : 2400));
}

/** Gives a canvas's pixel memory back right away (iOS keeps it until GC otherwise). */
function releaseCanvas(canvas?: HTMLCanvasElement | null) {
  if (canvas) {
    canvas.width = 0;
    canvas.height = 0;
  }
}

/** Renders a PDF page onto a new A4 canvas `targetW` pixels wide. Every sheet is an
 *  A4 sheet (owner's rule, for current and future files): the PDF page is fitted and
 *  centred on it, so Letter / odd-sized / landscape pages still show as A4 paper. */
async function renderA4Canvas(page: any, targetW: number, onTask?: (task: any) => void): Promise<HTMLCanvasElement> {
  const sheetW = Math.round(targetW);
  const sheetH = Math.round((targetW * A4_H) / A4_W);
  const natural = page.getViewport({ scale: 1 });
  const fit = Math.min(sheetW / natural.width, sheetH / natural.height);
  const viewport = page.getViewport({ scale: fit });

  const canvas = document.createElement('canvas');
  canvas.width = sheetW;
  canvas.height = sheetH;
  canvas.style.width = '100%';
  canvas.style.height = '100%';

  const ctx = canvas.getContext('2d');
  // phones hand out no more canvases once their canvas memory budget is spent
  if (!ctx) {
    releaseCanvas(canvas);
    throw new Error('Canvas memory limit reached');
  }
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, sheetW, sheetH);

  const renderTask = page.render({
    canvasContext: ctx,
    viewport,
    transform: [1, 0, 0, 1, Math.round((sheetW - viewport.width) / 2), Math.round((sheetH - viewport.height) / 2)]
  });
  onTask?.(renderTask);
  try {
    await renderTask.promise;
  } catch (err) {
    releaseCanvas(canvas);
    throw err;
  }
  return canvas;
}

/** "Page N" placeholder shown in a sheet until its canvas is ready. */
function loadingSlot(label: string): HTMLElement {
  const slot = document.createElement('div');
  slot.className = 'page-loading-slot';
  const spinner = document.createElement('div');
  spinner.className = 'page-spinner';
  const text = document.createElement('span');
  text.textContent = label;
  slot.append(spinner, text);
  return slot;
}

/** 'book' = the 3D flipbook; 'list' = the pages in a plain scrolling list (PDF.js
 *  works but the book couldn't start); 'embed' = the browser's own PDF viewer (PDF.js
 *  itself failed). */
type ReaderMode = 'book' | 'list' | 'embed';

export interface FlipbookViewerProps {
  pdfUrl?: string;
  /** Cover image (usually the PDF's first page as AVIF) shown instantly while the
   *  PDF downloads — on slow links pdfjs needs the WHOLE file because Cloudflare
   *  assets don't answer range requests (200 full-body instead of 206 partial). */
  coverImage?: string;
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const FlipbookViewer: React.FC<FlipbookViewerProps> = ({
  pdfUrl = '/pdf/robotics-summer-club.pdf',
  coverImage,
  title,
  subtitle,
  isOpen,
  onClose
}) => {
  const { lang } = useThemeLanguage();
  const isEn = lang === 'en';

  const containerRef = useRef<HTMLDivElement | null>(null);
  const bookElementRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const pageFlipInstanceRef = useRef<any>(null);
  const pdfDocRef = useRef<any>(null);
  const docLoadRef = useRef<PdfDocLoad | null>(null);
  const onProgressRef = useRef<((loaded: number, total: number) => void) | null>(null);
  const renderStatusRef = useRef<Record<number, { status: string; canvas: HTMLCanvasElement | null; task?: any }>>({});
  const bookGenerationRef = useRef(0); // bumps on teardown: late page renders are dropped

  const [mode, setMode] = useState<ReaderMode>('book');
  const [failReason, setFailReason] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState(isEn ? 'Loading Document...' : 'جاري تحميل الوثيقة...');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // Always expanded (filling the whole screen) on every device — no toggle (owner's request)
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [fitKey, setFitKey] = useState(0); // bumps on resize → sheets re-fitted to the screen
  const [isSpread, setIsSpread] = useState(true); // two-page spread vs single page
  const sheetCssWidthRef = useRef(0); // on-screen width of one sheet (CSS px)
  const [subpixelFix, setSubpixelFix] = useState(0); // keeps the book on whole pixels

  // Load PDF.js from local vendor bundle
  const loadPdfJs = useCallback((): Promise<any> => loadPdfJsLib(), []);

  // Free the PDF document and its worker
  const releaseDoc = useCallback(() => {
    docLoadRef.current?.destroy();
    docLoadRef.current = null;
    pdfDocRef.current = null;
  }, []);

  // One download per opening: re-fitting the book (rotation, the phone entering
  // fullscreen, a language switch) reuses the document instead of fetching it again.
  const getPdfDocument = useCallback((pdfjs: any, url: string): Promise<any> => {
    if (docLoadRef.current?.url !== url) {
      releaseDoc();
      docLoadRef.current = openPdfDocument(pdfjs, url, (loaded, total) => onProgressRef.current?.(loaded, total));
    }
    return docLoadRef.current!.promise;
  }, [releaseDoc]);

  // Render a specific page onto its DOM slot
  const renderPageSlot = useCallback(async (pageNum: number, pageDiv: HTMLElement) => {
    const pdfDoc = pdfDocRef.current;
    if (!pdfDoc || pageNum < 1 || pageNum > pdfDoc.numPages) return;

    const currentStatus = renderStatusRef.current[pageNum];
    if (currentStatus && (currentStatus.status === 'rendered' || currentStatus.status === 'rendering')) {
      return;
    }

    const generation = bookGenerationRef.current;
    const entry: { status: string; canvas: HTMLCanvasElement | null; task?: any } = { status: 'rendering', canvas: null };
    renderStatusRef.current[pageNum] = entry;

    try {
      const page = await pdfDoc.getPage(pageNum);
      if (generation !== bookGenerationRef.current) return;
      // Render at the sheet's real on-screen size × device pixel density (sharp text on
      // any screen).
      const canvas = await renderA4Canvas(page, sheetPixelWidth(sheetCssWidthRef.current || A4_W), (task) => {
        entry.task = task;
      });
      if (generation !== bookGenerationRef.current) {
        releaseCanvas(canvas);
        return;
      }

      pageDiv.replaceChildren(canvas);
      renderStatusRef.current[pageNum] = { status: 'rendered', canvas };
    } catch (err: any) {
      if (err?.name !== 'RenderingCancelledException' && renderStatusRef.current[pageNum] === entry) {
        renderStatusRef.current[pageNum] = { status: 'idle', canvas: null };
      }
    }
  }, []);

  // Unload distant pages to preserve GPU memory
  const unloadPageSlot = useCallback((pageNum: number, pageDiv: HTMLElement) => {
    const status = renderStatusRef.current[pageNum];
    if (!status || status.status !== 'rendered') return;

    releaseCanvas(status.canvas);
    pageDiv.replaceChildren(loadingSlot(isEn ? `Page ${pageNum}` : `صفحة ${pageNum}`));
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

  // Take the book down before it is re-fitted or replaced by a fallback view
  const teardownBook = useCallback(() => {
    bookGenerationRef.current += 1;
    const pageFlip = pageFlipInstanceRef.current;
    pageFlipInstanceRef.current = null;
    if (pageFlip) {
      // Not pageFlip.destroy(): it also removes the element it was given — React's
      // #book — so the re-fitted book would be built into a detached node and never
      // show (phones re-fit right after opening, when they enter fullscreen).
      try {
        pageFlip.getUI?.()?.destroy();
      } catch {
        /* ignore */
      }
      // its requestAnimationFrame loop has no off switch: leave it idle
      try {
        const render = pageFlip.getRender?.();
        if (render) render.render = () => {};
      } catch {
        /* ignore */
      }
    }
    for (const status of Object.values(renderStatusRef.current)) {
      status.task?.cancel?.();
      releaseCanvas(status.canvas);
    }
    renderStatusRef.current = {};
  }, []);

  // Closing the reader or switching files frees the document and its worker, and
  // the next opening tries the interactive book again.
  useEffect(() => {
    setMode('book');
    setFailReason(null);
    if (!isOpen) releaseDoc();
  }, [isOpen, pdfUrl, releaseDoc]);

  useEffect(() => releaseDoc, [releaseDoc]);

  // Initialize PDF and 3D Flipbook
  useEffect(() => {
    if (!isOpen || mode !== 'book') return;

    let isMounted = true;
    setLoading(true);
    setCurrentPage(1);

    const downloadingMessage = isEn ? 'Loading PDF Document...' : 'جاري تحميل ملف الـ PDF...';
    let shownPercent = -1;
    onProgressRef.current = (loaded, total) => {
      if (!isMounted || !(total > 0)) return;
      const percent = Math.min(100, Math.floor((loaded / total) * 100));
      if (percent === shownPercent) return;
      shownPercent = percent;
      setLoadingMessage(`${downloadingMessage} ${percent}%`);
    };

    const initBook = async () => {
      try {
        setLoadingMessage(downloadingMessage);
        const pdfjs = await loadPdfJs();
        if (!isMounted) return;

        const pdfDoc = await getPdfDocument(pdfjs, pdfUrl);
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
        sheetCssWidthRef.current = bookWidth;

        const viewerContainer = bookElementRef.current;
        if (!viewerContainer) return;

        viewerContainer.replaceChildren();

        // Create page container slots
        for (let i = 1; i <= total; i++) {
          const pageDiv = document.createElement('div');
          pageDiv.className = 'page';
          pageDiv.setAttribute('data-page-num', String(i));
          pageDiv.appendChild(loadingSlot(isEn ? `Page ${i}` : `صفحة ${i}`));
          viewerContainer.appendChild(pageDiv);
        }

        // Pre-render the first few pages
        setLoadingMessage(isEn ? 'Rendering 3D Pages...' : 'جاري معالجة الصفحات ثلاثية الأبعاد...');
        const initialToRender = Math.min(total, 2);
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
        pageFlipInstanceRef.current = pageFlip;

        const pages = viewerContainer.querySelectorAll('.page');
        pageFlip.loadFromHTML(pages);
        // In single-page mode the library sizes the sheet from the container width
        // (width:100% + ratio padding), so cap the container to the fitted sheet(s):
        // the whole A4 sheet then always fits the visible area.
        viewerContainer.style.maxWidth = `${spread ? bookWidth * 2 : bookWidth}px`;
        viewerContainer.style.minWidth = '0px';
        viewerContainer.style.minHeight = '0px';
        // centring can leave the book on a half pixel: measure and compensate
        requestAnimationFrame(() => {
          const stage = viewerContainer.parentElement?.getBoundingClientRect();
          if (!stage) return;
          const w = spread ? bookWidth * 2 : bookWidth;
          const left = stage.left + (stage.width - w) / 2;
          const frac = left - Math.floor(left);
          setSubpixelFix(frac > 0.01 ? -frac : 0);
        });

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

        setLoading(false);

        // Pre-buffer upcoming pages
        updateVirtualPages(0, total);
      } catch (err: any) {
        console.error('Error initializing 3D flipbook:', err);
        if (isMounted) {
          setFailReason(err?.message ? String(err.message).slice(0, 160) : null);
          // Never a dead end: the pages as a plain list when PDF.js opened the file,
          // otherwise the browser's own PDF viewer.
          setMode(pdfDocRef.current && docLoadRef.current?.url === pdfUrl ? 'list' : 'embed');
          setLoading(false);
        }
      }
    };

    initBook();

    return () => {
      isMounted = false;
      onProgressRef.current = null;
      teardownBook();
    };
  }, [isOpen, mode, pdfUrl, isEn, loadPdfJs, getPdfDocument, renderPageSlot, updateVirtualPages, teardownBook, fitKey]);

  // Fallback list: render the pages near the viewport, free the far ones
  useEffect(() => {
    if (!isOpen || mode !== 'list') return;
    const root = listRef.current;
    const pdfDoc = pdfDocRef.current;
    if (!root || !pdfDoc) return;

    let alive = true;
    const slots = Array.from(root.querySelectorAll<HTMLElement>('[data-list-page]'));
    const shown = new Map<number, { canvas?: HTMLCanvasElement; task?: any }>();

    const show = async (slot: HTMLElement, n: number) => {
      if (shown.has(n)) return;
      const entry: { canvas?: HTMLCanvasElement; task?: any } = {};
      shown.set(n, entry);
      try {
        const page = await pdfDoc.getPage(n);
        if (!alive || shown.get(n) !== entry) return;
        const canvas = await renderA4Canvas(page, sheetPixelWidth(slot.clientWidth), (task) => {
          entry.task = task;
        });
        if (!alive || shown.get(n) !== entry) {
          releaseCanvas(canvas);
          return;
        }
        entry.canvas = canvas;
        slot.replaceChildren(canvas);
      } catch {
        if (shown.get(n) === entry) shown.delete(n);
      }
    };

    const hide = (slot: HTMLElement, n: number) => {
      const entry = shown.get(n);
      if (!entry) return;
      shown.delete(n);
      entry.task?.cancel?.();
      releaseCanvas(entry.canvas);
      slot.replaceChildren();
    };

    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const slot = e.target as HTMLElement;
        const n = Number(slot.dataset.listPage);
        if (e.isIntersecting) show(slot, n);
        else hide(slot, n);
      }
    }, { root, rootMargin: '200% 0px' });
    slots.forEach((slot) => observer.observe(slot));

    // page counter follows the page under the upper part of the screen
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const line = root.getBoundingClientRect().top + root.clientHeight * 0.4;
        let page = 1;
        for (const slot of slots) {
          if (slot.getBoundingClientRect().top > line) break;
          page = Number(slot.dataset.listPage);
        }
        setCurrentPage(page);
      });
    };
    root.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      alive = false;
      observer.disconnect();
      root.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
      shown.forEach((entry) => {
        entry.task?.cancel?.();
        releaseCanvas(entry.canvas);
      });
    };
  }, [isOpen, mode, totalPages]);

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
    // whole pixels only (25% of an odd width lands on a half pixel → blurry pages),
    // plus the correction that puts the book on an exact pixel boundary
    const half = Math.round((sheetCssWidthRef.current || 0) / 2);
    const fix = subpixelFix;
    if (currentPage <= 1) {
      return `translateX(${half + fix}px)`;
    }
    if (totalPages > 1 && currentPage >= totalPages) {
      return `translateX(${-half + fix}px)`;
    }
    return `translateX(${fix}px)`;
  };

  // Page navigation for the book and for the fallback list
  const scrollListTo = useCallback((page: number) => {
    const slot = listRef.current?.querySelector(`[data-list-page="${page}"]`);
    slot?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, []);

  const goTo = useCallback((target: 'prev' | 'next' | 'first' | 'last') => {
    if (mode === 'list') {
      const page = { prev: currentPage - 1, next: currentPage + 1, first: 1, last: totalPages }[target];
      if (page >= 1 && page <= totalPages) scrollListTo(page);
      return;
    }
    const pageFlip = pageFlipInstanceRef.current;
    if (!pageFlip) return;
    if (target === 'prev') pageFlip.flipPrev();
    else if (target === 'next') pageFlip.flipNext();
    else if (target === 'first') pageFlip.flip(0);
    else if (totalPages > 0) pageFlip.flip(totalPages - 1);
  }, [mode, currentPage, totalPages, scrollListTo]);

  // Keyboard navigation (Unified RTL reading: ArrowLeft, Space, PageDown to advance Right-to-Left)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      // the browser's PDF viewer handles its own keys
      if (mode === 'embed') return;
      if (
        e.key === 'ArrowLeft' ||
        e.key === 'PageDown' ||
        (e.key === ' ' && (e.target === document.body || (e.target as HTMLElement)?.classList.contains('flipbook-modal') || (e.target as HTMLElement)?.classList.contains('flipbook-body')))
      ) {
        e.preventDefault();
        goTo('next');
      } else if (e.key === 'ArrowRight' || e.key === 'PageUp') {
        // Arabic book: the right arrow goes back a page, in both UI languages.
        e.preventDefault();
        goTo('prev');
      } else if (e.key === 'Home') {
        e.preventDefault();
        goTo('first');
      } else if (e.key === 'End' && totalPages > 0) {
        e.preventDefault();
        goTo('last');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, mode, totalPages, onClose, goTo]);

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
    goTo('prev');
  };

  const handleNext = () => {
    goTo('next');
  };

  const handleCoverClick = () => {
    if (mode === 'book' && currentPage <= 1) {
      pageFlipInstanceRef.current?.flipNext();
    }
  };

  if (!isOpen) return null;

  // the browser can show the PDF itself (false on Android, which only downloads it)
  const canEmbedPdf = typeof navigator !== 'undefined' && (navigator as any).pdfViewerEnabled === true;
  const openDirectLink = pdfUrl ? (
    <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="flipbook-open-direct">
      {isEn ? 'Open the PDF file directly' : 'افتح ملف الـPDF مباشرة'}
    </a>
  ) : null;
  const fallbackNote = (text: string) => (
    <div className="flipbook-fallback-note" role="status">
      <Info size={16} aria-hidden="true" />
      <span>{text}</span>
      {openDirectLink}
      {failReason && <small className="flipbook-fallback-reason" dir="ltr">{failReason}</small>}
    </div>
  );
  const isDeadEnd = mode === 'embed' && !canEmbedPdf;

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
              {coverImage ? (
                /* Instant cover: the reader shows the book's real cover (a ~16KB AVIF
                 * of page 1) while the multi-MB PDF streams in — the spinner only
                 * appears if even the cover hasn't arrived yet. */
                <div className="flipbook-cover-wait">
                  <img src={coverImage} alt={title} className="flipbook-cover-img" />
                  <div className="flipbook-cover-progress" aria-hidden="true">
                    <div className="spinner-sm" />
                    <span>{loadingMessage}</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="spinner-lg" />
                  <span>{loadingMessage}</span>
                </>
              )}
            </div>
          )}

          {/* Nothing can show the pages here (PDF.js failed and the browser has no PDF
              viewer, e.g. Android): the cover and a link to the file itself. */}
          {isDeadEnd && (
            <div className="flipbook-loading-cover">
              {coverImage ? (
                <img src={coverImage} alt={title} className="flipbook-error-cover" />
              ) : (
                <Info size={32} color="#ef4444" />
              )}
              <span className="flipbook-error-text">
                {isEn ? 'Failed to render the interactive book.' : 'تعذر تحميل صفحات الكتاب التفاعلية.'}
              </span>
              {/* the technical reason (English) on its own LTR line: mixed into the
                  Arabic sentence its brackets and word order get scrambled */}
              {failReason && <small className="flipbook-fallback-reason" dir="ltr">{failReason}</small>}
              {openDirectLink}
            </div>
          )}

          {mode === 'list' && (
            <div className="flipbook-fallback" data-mode="list" ref={listRef}>
              {fallbackNote(
                isEn
                  ? 'The interactive book could not start on this device — showing the pages as a simple list.'
                  : 'تعذّر تشغيل الكتاب التفاعلي على هذا الجهاز — تُعرض الصفحات بشكل مبسّط.'
              )}
              {Array.from({ length: totalPages }, (_, i) => (
                <div
                  key={i}
                  className="flipbook-fallback-page"
                  data-list-page={i + 1}
                  data-label={isEn ? `Page ${i + 1}` : `صفحة ${i + 1}`}
                />
              ))}
            </div>
          )}

          {mode === 'embed' && canEmbedPdf && (
            <div className="flipbook-fallback" data-mode="embed">
              {fallbackNote(
                isEn
                  ? 'The interactive book could not start — showing the file in the browser’s PDF viewer.'
                  : 'تعذّر تشغيل الكتاب التفاعلي — يُعرض الملف بعارض المتصفح.'
              )}
              <iframe className="flipbook-fallback-frame" src={pdfUrl} title={title} />
            </div>
          )}

          <div
            className="flipbook-stage-wrapper"
            onClick={handleCoverClick}
            style={mode === 'book' ? undefined : { display: 'none' }}
          >
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
        {mode !== 'embed' && (
        <footer className="flipbook-footer">
          <div className="fb-hint-text">
            <Sparkles size={14} color="#38bdf8" />
            <span>
              {mode === 'list'
                ? (isEn ? 'Scroll to read the pages, or use the arrows' : 'مرّر لقراءة الصفحات أو استخدم الأسهم')
                : (isEn ? 'Arabic book: drag the left page corner or use the arrows to turn pages' : 'كتاب عربي: اسحب زاوية الصفحة اليسرى أو استخدم الأسهم لتقليب الصفحات')}
            </span>
          </div>

          {/* Always right-to-left (Arabic book): previous on the right, next on the left */}
          <div className="fb-nav-group" dir="rtl">
            <button
              type="button"
              className="fb-nav-btn fb-nav-btn-prev"
              onClick={handlePrev}
              disabled={currentPage <= 1 || loading}
              title={isEn ? 'Previous Page' : 'الصفحة السابقة'}
              aria-label={isEn ? 'Previous Page' : 'الصفحة السابقة'}
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
              aria-label={isEn ? 'Next Page' : 'الصفحة التالية'}
            >
              <span>{isEn ? 'Next' : 'التالي'}</span>
              <ChevronLeft size={18} />
            </button>
          </div>
        </footer>
        )}
      </div>
    </div>
  );
};

export default FlipbookViewer;
