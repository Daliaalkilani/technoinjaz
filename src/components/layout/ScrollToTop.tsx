'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Route-change scroll handling:
//  - forward navigation (link click)  → start the new page at the top
//  - back / forward button (popstate) → return to where the visitor was on that page
// Positions are kept per path in sessionStorage, so they survive the page being
// re-rendered from scratch (and a reload of the tab).
const KEY = 'te_scroll_pos';
let poppedAt = 0;
// Between leaving a page (link click / back button) and the next page mounting, the
// router and layout shifts fire scroll events that would overwrite the position we
// want to keep, so saving is frozen during that window.
let frozen = false;

function readPositions(): Record<string, number> {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
}

function savePosition(path: string, y: number) {
  try {
    const all = readPositions();
    all[path] = Math.round(y);
    sessionStorage.setItem(KEY, JSON.stringify(all));
  } catch {}
}

export function ScrollToTop() {
  const pathname = usePathname();

  // Take scrolling over from the browser so it doesn't fight the restore below.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    const onPop = () => {
      poppedAt = Date.now();
      frozen = true;
    };
    // Snapshot the exact position at the moment an internal link is followed.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || a.target === '_blank' || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      savePosition(location.pathname, window.scrollY);
      frozen = true;
    };
    window.addEventListener('popstate', onPop);
    document.addEventListener('click', onClick, true);
    return () => {
      window.removeEventListener('popstate', onPop);
      document.removeEventListener('click', onClick, true);
    };
  }, []);

  // Remember this page's position while the visitor scrolls it.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        // The URL already points to the next page (router.push / Link) while this page is
        // still mounted: those scrolls belong to the transition, not to this page.
        if (!frozen && location.pathname === pathname) savePosition(pathname, window.scrollY);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  useEffect(() => {
    const isBackForward = Date.now() - poppedAt < 1500;
    const target = isBackForward ? readPositions()[pathname] ?? 0 : 0;
    // The new page is mounted: from the next frame on, its own scrolling is recorded.
    const unfreeze = setTimeout(() => {
      frozen = false;
    }, target ? 1600 : 50);

    if (!target) {
      window.scrollTo(0, 0);
      const timer = setTimeout(() => window.scrollTo(0, 0), 15);
      return () => {
        clearTimeout(timer);
        clearTimeout(unfreeze);
      };
    }

    // Lists, images and filters restored from storage settle over a few frames, and on
    // desktop GSAP ScrollTrigger's refresh (footer) scrolls to 0 and back to its own
    // remembered offset. So for ~1.5s keep putting the page back on target whenever it
    // drifts, and stop as soon as the visitor scrolls on their own.
    let cancelled = false;
    let tries = 0;
    const stop = () => {
      cancelled = true;
      frozen = false;
    };
    window.addEventListener('wheel', stop, { passive: true, once: true });
    window.addEventListener('touchstart', stop, { passive: true, once: true });
    window.addEventListener('keydown', stop, { once: true });
    const apply = () => {
      if (cancelled) return;
      if (Math.abs(window.scrollY - target) > 2) window.scrollTo(0, target);
      tries += 1;
      if (tries < 30) setTimeout(apply, 50);
    };
    apply();
    return () => {
      cancelled = true;
      clearTimeout(unfreeze);
      window.removeEventListener('wheel', stop);
      window.removeEventListener('touchstart', stop);
      window.removeEventListener('keydown', stop);
    };
  }, [pathname]);

  return null;
}

export default ScrollToTop;
