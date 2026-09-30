'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import '@/components/ui/Skeleton.css';

export default function ArticlesLoading() {
  return (
    <main className="skeleton-page-container" aria-label="جاري تحميل المقالات...">
      {/* Top Header Skeleton */}
      <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 36px' }}>
        <Skeleton width="60%" height={42} borderRadius={10} style={{ margin: '0 auto 16px' }} />
        <Skeleton width="85%" height={20} borderRadius={6} style={{ margin: '0 auto 10px' }} />
        <Skeleton width="50%" height={18} borderRadius={6} style={{ margin: '0 auto' }} />
      </div>

      {/* Filter Category Pills Skeleton */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {[80, 110, 95, 120, 90].map((w, idx) => (
          <Skeleton key={idx} width={w} height={36} borderRadius={999} />
        ))}
      </div>

      {/* Grid of Articles Cards */}
      <div className="skeleton-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="skeleton-card skeleton-shimmer">
            {/* Card Thumbnail */}
            <Skeleton width="100%" height={190} borderRadius={12} />
            {/* Category tag & Date */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Skeleton width={75} height={22} borderRadius={999} />
              <Skeleton width={90} height={16} borderRadius={4} />
            </div>
            {/* Title */}
            <Skeleton width="90%" height={24} borderRadius={6} />
            {/* Excerpt */}
            <Skeleton width="100%" height={14} borderRadius={4} />
            <Skeleton width="75%" height={14} borderRadius={4} />
            {/* Footer */}
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px' }}>
              <Skeleton width={80} height={16} borderRadius={4} />
              <Skeleton width={32} height={32} borderRadius="50%" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
