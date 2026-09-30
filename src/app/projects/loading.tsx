'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import '@/components/ui/Skeleton.css';

export default function ProjectsLoading() {
  return (
    <main className="skeleton-page-container" aria-label="جاري تحميل المشاريع...">
      {/* Top Header */}
      <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 36px' }}>
        <Skeleton width="55%" height={42} borderRadius={10} style={{ margin: '0 auto 16px' }} />
        <Skeleton width="80%" height={20} borderRadius={6} style={{ margin: '0 auto 10px' }} />
        <Skeleton width="45%" height={18} borderRadius={6} style={{ margin: '0 auto' }} />
      </div>

      {/* Filter Category Pills */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {[90, 120, 100, 140, 110].map((w, idx) => (
          <Skeleton key={idx} width={w} height={36} borderRadius={999} />
        ))}
      </div>

      {/* Grid of Projects Cards */}
      <div className="skeleton-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="skeleton-card skeleton-shimmer">
            {/* Project Image */}
            <Skeleton width="100%" height={210} borderRadius={12} />
            {/* Project Category & Status Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Skeleton width={85} height={22} borderRadius={999} />
              <Skeleton width={60} height={18} borderRadius={999} />
            </div>
            {/* Project Title */}
            <Skeleton width="85%" height={24} borderRadius={6} />
            {/* Short description */}
            <Skeleton width="100%" height={14} borderRadius={4} />
            <Skeleton width="70%" height={14} borderRadius={4} />
            {/* Tech stack badges */}
            <div style={{ display: 'flex', gap: '6px', marginTop: 'auto', paddingTop: '8px' }}>
              <Skeleton width={50} height={20} borderRadius={6} />
              <Skeleton width={65} height={20} borderRadius={6} />
              <Skeleton width={55} height={20} borderRadius={6} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
