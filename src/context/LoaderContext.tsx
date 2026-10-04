'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface LoaderContextType {
  isLoaderDone: boolean;
}

const LoaderContext = createContext<LoaderContextType>({ isLoaderDone: true });

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoaderDone, setIsLoaderDone] = useState(true);

  useEffect(() => {
    if (pathname !== '/' || (typeof document !== 'undefined' && document.documentElement.hasAttribute('data-skip-loader'))) {
      setIsLoaderDone(true);
      return;
    }

    // Check if loader is still active
    const hasSeen = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('te_loader_seen') === '1';
    if (hasSeen) {
      setIsLoaderDone(true);
      return;
    }

    setIsLoaderDone(false);
    let timer: any;
    const handleCompleted = () => {
      setIsLoaderDone(true);
      if (timer) clearTimeout(timer);
    };

    window.addEventListener('techno:completed', handleCompleted, { once: true });
    timer = setTimeout(handleCompleted, 2100);

    return () => {
      window.removeEventListener('techno:completed', handleCompleted);
      if (timer) clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <LoaderContext.Provider value={{ isLoaderDone }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  return useContext(LoaderContext);
}
