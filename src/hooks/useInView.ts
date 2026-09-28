'use client';

import { useState, useEffect, type RefObject } from 'react';

export interface UseInViewOptions {
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

export function useInView(
  ref: RefObject<HTMLElement | null>,
  options: UseInViewOptions = {}
): boolean {
  const { rootMargin = '400px', threshold = 0, once = true } = options;
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    if (once && isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin, threshold, once, isInView]);

  return isInView;
}
