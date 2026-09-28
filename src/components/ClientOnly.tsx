'use client';

import React from 'react';
import { useHydrated } from '@/hooks/useHydrated';

export interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const hydrated = useHydrated();
  if (!hydrated) return <>{fallback}</>;
  return <>{children}</>;
}

export default ClientOnly;
