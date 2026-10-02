'use client';

/**
 * StickyFilterBar — compact single-row filter bar for mobile & tablet (≤1024px).
 *
 * - Horizontally scrollable category chips (scroll-snap; the active chip is
 *   scrolled into view inside the strip, never moving the page).
 * - A search icon that expands into a labelled search field.
 * - Optional "Filter" button opening a bottom sheet with the remaining
 *   filter dimensions (sort, type, ...), with an active-count badge.
 * - Sticky just under the site navbar, hidden while scrolling down and
 *   revealed on any scroll up (transform/opacity only; passive scroll
 *   listener batched with rAF and a small threshold).
 *
 * On desktop (>1024px) the bar is display:none and the page keeps its own
 * desktop filters.
 */

import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Search, SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import './StickyFilterBar.css';

export interface FilterChip {
  key: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface FilterSheetConfig {
  /** Number of active filters represented inside the sheet (shown as a badge). */
  badge: number;
  title: string;
  /** Sheet body. Use the exported `.sfb-sheet-*` / `.sfb-option` classes. */
  render: () => React.ReactNode;
}

interface StickyFilterBarProps {
  chips: FilterChip[];
  activeKey: string;
  onChipChange: (key: string) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  isEn: boolean;
  /** Number of results currently shown. */
  resultCount: number;
  /** Total number of active filters (category, search, sort...). Shows the status row when > 0. */
  activeCount: number;
  onReset: () => void;
  sheet?: FilterSheetConfig;
  ariaLabel?: string;
}

const SCROLL_THRESHOLD = 6; // px of travel before we react to a direction change
const MIN_HIDE_OFFSET = 8; // px the bar must be stuck before it may hide

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

export function StickyFilterBar({
  chips,
  activeKey,
  onChipChange,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  isEn,
  resultCount,
  activeCount,
  onReset,
  sheet,
  ariaLabel
}: StickyFilterBarProps) {
  const dir = isEn ? 'ltr' : 'rtl';
  const uid = useId();
  const searchId = `${uid}-search`;
  const sheetTitleId = `${uid}-sheet-title`;

  const barRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const filterBtnRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mutable scroll state lives in refs so scrolling never re-renders React.
  const topRef = useRef(0);
  const hiddenRef = useRef(false);
  const lockRef = useRef(false);
  lockRef.current = searchOpen || sheetOpen;

  useEffect(() => setMounted(true), []);

  const setHidden = useCallback((hide: boolean) => {
    if (hiddenRef.current === hide) return;
    hiddenRef.current = hide;
    barRef.current?.setAttribute('data-hidden', hide ? 'true' : 'false');
  }, []);

  /* ------------------------------------------------------------------
     Sticky offset: sit right under the site navbar *if* it is pinned
     to the viewport; otherwise stick to the very top. Measured, not
     hard-coded, so navbar changes on other branches keep working.
  ------------------------------------------------------------------ */
  const syncTop = useCallback(() => {
    const nav = document.getElementById('navbar');
    let top = 0;
    if (nav) {
      const r = nav.getBoundingClientRect();
      if (r.height > 0 && r.bottom >= r.height * 0.5) top = Math.round(Math.min(r.bottom, r.height));
    }
    if (top !== topRef.current) {
      topRef.current = top;
      barRef.current?.style.setProperty('--sfb-top', `${top}px`);
    }
  }, []);

  /* Hide on scroll down / reveal on scroll up (≤1024px only). */
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)');
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      if (!mq.matches) return;
      syncTop();
      const y = window.scrollY;
      const sentinel = sentinelRef.current;
      const stuckBy = sentinel ? topRef.current - sentinel.getBoundingClientRect().top : 0;
      const dy = y - lastY;

      if (stuckBy < MIN_HIDE_OFFSET || lockRef.current) {
        setHidden(false);
        lastY = y;
        return;
      }
      if (Math.abs(dy) < SCROLL_THRESHOLD) return; // accumulate small moves
      setHidden(dy > 0);
      lastY = y;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    syncTop();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [setHidden, syncTop]);

  // Interacting with the bar (search / sheet) always keeps it visible.
  useEffect(() => {
    if (searchOpen || sheetOpen) setHidden(false);
  }, [searchOpen, sheetOpen, setHidden]);

  /* ------------------------------------------------------------------
     Active chip → scroll it into view inside the strip only.
     scrollBy with a signed delta works the same in RTL and LTR.
  ------------------------------------------------------------------ */
  const firstChipSync = useRef(true);
  useIsoLayoutEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const chip = strip.querySelector<HTMLElement>(`[data-chip-key="${CSS.escape(activeKey)}"]`);
    if (!chip || strip.clientWidth === 0) return;
    const s = strip.getBoundingClientRect();
    const c = chip.getBoundingClientRect();
    const pad = parseFloat(getComputedStyle(strip).scrollPaddingInlineStart) || 0;
    const rtl = getComputedStyle(strip).direction === 'rtl';
    // Align the chip to the strip's inline-start edge (a scroll-snap position),
    // so the snap never fights the programmatic scroll.
    const delta = rtl ? c.right - (s.right - pad) : c.left - (s.left + pad);
    const fullyVisible = c.left >= s.left + pad && c.right <= s.right - pad;
    if (firstChipSync.current) {
      firstChipSync.current = false;
      if (!fullyVisible) strip.scrollBy({ left: delta, behavior: 'auto' });
      return;
    }
    if (!fullyVisible) strip.scrollBy({ left: delta, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, [activeKey]);

  /* If the bar is stuck and the user changes a filter, bring the top of the
     results back under the bar so they don't land mid-list. */
  const pinToResults = useCallback((smooth = true) => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const target = sentinel.getBoundingClientRect().top + window.scrollY - topRef.current;
    if (window.scrollY > target + 1) {
      window.scrollTo({ top: target, behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'auto' });
    }
  }, []);

  const handleChip = (key: string) => {
    onChipChange(key);
    pinToResults();
  };

  /* Search */
  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const closeSearch = () => {
    setSearchOpen(false);
    requestAnimationFrame(() => searchBtnRef.current?.focus());
  };

  /* Sheet: focus management, Escape, scroll lock */
  useEffect(() => {
    if (!sheetOpen) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const node = sheetRef.current;
    node?.querySelector<HTMLElement>('[data-sfb-autofocus]')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setSheetOpen(false);
        return;
      }
      if (e.key === 'Tab' && node) {
        const focusables = Array.from(
          node.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = prevOverflow;
      filterBtnRef.current?.focus();
    };
  }, [sheetOpen]);

  const t = {
    region: ariaLabel || (isEn ? 'Filters' : 'أدوات التصفية'),
    categories: isEn ? 'Categories' : 'التصنيفات',
    openSearch: isEn ? 'Search' : 'بحث',
    closeSearch: isEn ? 'Close search' : 'إغلاق البحث',
    clearSearch: isEn ? 'Clear search' : 'مسح البحث',
    filter: isEn ? 'Filter' : 'فلترة',
    results: isEn ? `${resultCount} ${resultCount === 1 ? 'result' : 'results'}` : `${resultCount} نتيجة`,
    activeFilters: isEn ? `${activeCount} active` : `${activeCount} ${activeCount === 1 ? 'فلتر مفعّل' : 'فلاتر مفعّلة'}`,
    reset: isEn ? 'Clear all' : 'مسح الكل',
    show: isEn ? `Show ${resultCount} ${resultCount === 1 ? 'result' : 'results'}` : `عرض ${resultCount} نتيجة`,
    close: isEn ? 'Close' : 'إغلاق'
  };

  const searchActive = searchValue.trim().length > 0;

  const sheetNode = sheet && mounted && sheetOpen
    ? createPortal(
        <div className="sfb-sheet-root" dir={dir}>
          <div className="sfb-sheet-backdrop" onClick={() => setSheetOpen(false)} aria-hidden="true" />
          <div
            ref={sheetRef}
            className="sfb-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby={sheetTitleId}
          >
            <div className="sfb-sheet-handle" aria-hidden="true" />
            <div className="sfb-sheet-head">
              <h2 id={sheetTitleId} className="sfb-sheet-title">{sheet.title}</h2>
              <button
                type="button"
                className="sfb-icon-btn"
                onClick={() => setSheetOpen(false)}
                aria-label={t.close}
                data-sfb-autofocus
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <div className="sfb-sheet-body">{sheet.render()}</div>
            <div className="sfb-sheet-footer">
              <button
                type="button"
                className="sfb-sheet-reset"
                onClick={onReset}
                disabled={activeCount === 0}
              >
                <RotateCcw size={15} aria-hidden="true" />
                <span>{t.reset}</span>
              </button>
              <button
                type="button"
                className="sfb-sheet-apply"
                onClick={() => {
                  setSheetOpen(false);
                  pinToResults(false);
                }}
              >
                {t.show}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <div ref={sentinelRef} className="sfb-sentinel" aria-hidden="true" />
      <div
        ref={barRef}
        className="sfb"
        dir={dir}
        data-hidden="false"
        role="region"
        aria-label={t.region}
      >
        <div className="sfb-inner">
          <div className={`sfb-row ${searchOpen ? 'is-searching' : ''}`}>
            {searchOpen ? (
              <div className="sfb-search">
                <Search size={17} className="sfb-search-icon" aria-hidden="true" />
                <label htmlFor={searchId} className="sr-only">{searchPlaceholder}</label>
                <input
                  ref={searchInputRef}
                  id={searchId}
                  type="search"
                  enterKeyHint="search"
                  className="sfb-search-input"
                  value={searchValue}
                  placeholder={searchPlaceholder}
                  onChange={(e) => {
                    onSearchChange(e.target.value);
                    pinToResults(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      e.preventDefault();
                      closeSearch();
                    } else if (e.key === 'Enter') {
                      (e.target as HTMLInputElement).blur();
                    }
                  }}
                />
                {searchActive && (
                  <button
                    type="button"
                    className="sfb-search-clear"
                    onClick={() => {
                      onSearchChange('');
                      searchInputRef.current?.focus();
                    }}
                    aria-label={t.clearSearch}
                  >
                    <X size={14} aria-hidden="true" />
                  </button>
                )}
              </div>
            ) : (
              <div className="sfb-strip" ref={stripRef} role="group" aria-label={t.categories}>
                {chips.map((chip) => {
                  const active = chip.key === activeKey;
                  return (
                    <button
                      key={chip.key}
                      type="button"
                      data-chip-key={chip.key}
                      className={`sfb-chip ${active ? 'is-active' : ''}`}
                      aria-pressed={active}
                      onClick={() => handleChip(chip.key)}
                    >
                      {chip.icon && <span className="sfb-chip-icon" aria-hidden="true">{chip.icon}</span>}
                      <span className="sfb-chip-label">{chip.label}</span>
                      {typeof chip.count === 'number' && <span className="sfb-chip-count">{chip.count}</span>}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="sfb-actions">
              {searchOpen ? (
                <button type="button" className="sfb-icon-btn" onClick={closeSearch} aria-label={t.closeSearch}>
                  <X size={18} aria-hidden="true" />
                </button>
              ) : (
                <button
                  ref={searchBtnRef}
                  type="button"
                  className={`sfb-icon-btn ${searchActive ? 'is-active' : ''}`}
                  onClick={() => setSearchOpen(true)}
                  aria-label={searchActive ? `${t.openSearch}: ${searchValue}` : t.openSearch}
                  aria-expanded={false}
                >
                  <Search size={18} aria-hidden="true" />
                  {searchActive && <span className="sfb-dot" aria-hidden="true" />}
                </button>
              )}
              {sheet && (
                <button
                  ref={filterBtnRef}
                  type="button"
                  className={`sfb-filter-btn ${sheet.badge > 0 ? 'is-active' : ''}`}
                  onClick={() => setSheetOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={sheetOpen}
                  aria-label={sheet.badge > 0 ? `${t.filter} (${sheet.badge})` : t.filter}
                >
                  <SlidersHorizontal size={16} aria-hidden="true" />
                  <span className="sfb-filter-label">{t.filter}</span>
                  {sheet.badge > 0 && <span className="sfb-badge" aria-hidden="true">{sheet.badge}</span>}
                </button>
              )}
            </div>
          </div>

          {activeCount > 0 && (
            <div className="sfb-status" aria-live="polite">
              <span className="sfb-status-text">
                <strong>{t.results}</strong>
                <span className="sfb-status-sep" aria-hidden="true">·</span>
                <span>{t.activeFilters}</span>
                {searchActive && !searchOpen && (
                  <span className="sfb-status-term"><bdi>{isEn ? `“${searchValue.trim()}”` : `«${searchValue.trim()}»`}</bdi></span>
                )}
              </span>
              <button type="button" className="sfb-status-reset" onClick={onReset}>
                <RotateCcw size={12} aria-hidden="true" />
                <span>{t.reset}</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {sheetNode}
    </>
  );
}

/** Static placeholder of the bar for route loading skeletons (same geometry). */
export function StickyFilterBarSkeleton({ chipWidths, withFilter = false }: { chipWidths: number[]; withFilter?: boolean }) {
  return (
    <div className="sfb sfb--skeleton" aria-hidden="true">
      <div className="sfb-inner">
        <div className="sfb-row">
          <div className="sfb-strip">
            {chipWidths.map((w, i) => (
              <span key={i} className="sk sfb-chip-sk" style={{ width: w }} />
            ))}
          </div>
          <div className="sfb-actions">
            <span className="sk sfb-icon-sk" />
            {withFilter && <span className="sk sfb-filter-sk" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StickyFilterBar;
