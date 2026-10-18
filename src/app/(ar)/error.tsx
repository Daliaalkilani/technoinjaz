'use client';

import React, { useEffect } from 'react';
import ServerErrorView from '@/components/errors/ServerErrorView';

export default function ErrorBoundary({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected runtime error to console for auditing
    console.error('Next.js Root Error Boundary triggered:', error);
  }, [error]);

  return <ServerErrorView error={error} reset={reset} />;
}
