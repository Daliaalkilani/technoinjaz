'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Instant navigation feedback. With static pages the App Router keeps the old page
// on screen until the new one has arrived, so a click could look like "nothing
// happened" for a moment. This shows the thin progress bar under the navbar from the
// click until the new pathname renders (styles: .route-progress in Skeleton.css).
export function RouteProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  // New page rendered → hide
  useEffect(() => {
    setActive(false);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented && !(e.target as Element)?.closest?.('.gooey-nav-container')) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      setActive(true);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  // Safety: never stay visible if a navigation is cancelled
  useEffect(() => {
    if (!active) return;
    const t = window.setTimeout(() => setActive(false), 10000);
    return () => window.clearTimeout(t);
  }, [active]);

  if (!active) return null;
  return (
    <div className="route-progress" role="progressbar" aria-label="جاري الانتقال...">
      <span className="route-progress__bar" />
    </div>
  );
}

export default RouteProgress;
