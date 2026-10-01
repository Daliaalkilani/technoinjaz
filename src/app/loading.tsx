'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import '@/components/ui/Skeleton.css';

/**
 * Universal Route Loading Skeleton
 * Triggers immediately upon navigation to any route that is compiling or streaming.
 * Provides instant feedback on the first click with 0ms delay.
 */
export default function RootLoading() {
  return (
    <main className="skeleton-page-container" aria-label="جاري التحميل..." style={{ minHeight: '80vh', padding: '120px 24px 60px', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Header Skeleton */}
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px' }}>
        <Skeleton width="45%" height={40} borderRadius={10} style={{ margin: '0 auto 16px' }} />
        <Skeleton width="80%" height={18} borderRadius={6} style={{ margin: '0 auto 10px' }} />
        <Skeleton width="55%" height={16} borderRadius={6} style={{ margin: '0 auto' }} />
      </div>

      {/* Filter / Tabs Skeleton */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
        {[90, 120, 100, 110, 85].map((w, idx) => (
          <Skeleton key={idx} width={w} height={38} borderRadius={999} />
        ))}
      </div>

      {/* Grid of Content Skeletons */}
      <div className="skeleton-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="skeleton-card skeleton-shimmer" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Skeleton width="100%" height={200} borderRadius={12} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Skeleton width={70} height={20} borderRadius={999} />
              <Skeleton width={80} height={14} borderRadius={4} />
            </div>
            <Skeleton width="90%" height={22} borderRadius={6} />
            <Skeleton width="100%" height={14} borderRadius={4} />
            <Skeleton width="75%" height={14} borderRadius={4} />
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px' }}>
              <Skeleton width={70} height={16} borderRadius={4} />
              <Skeleton width={28} height={28} borderRadius="50%" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
