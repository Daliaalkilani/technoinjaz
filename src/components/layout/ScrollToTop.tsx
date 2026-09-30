'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Immediately scroll to the very beginning of the target page on route changes
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 15);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
