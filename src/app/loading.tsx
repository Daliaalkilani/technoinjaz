'use client';

import React from 'react';
import '@/components/ui/Skeleton.css';

// Fallback for routes without their own skeleton (home, login, library, errors…).
// Their layouts differ completely, so instead of invented placeholder shapes this is
// an honest, unobtrusive progress bar under the navbar while the page loads.
export default function RootLoading() {
  return (
    <div className="route-progress" role="progressbar" aria-busy="true" aria-label="جاري التحميل...">
      <span className="route-progress__bar" />
    </div>
  );
}
