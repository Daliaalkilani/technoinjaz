'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import '@/components/ui/Skeleton.css';

export default function ArticleDetailLoading() {
  return (
    <main className="skeleton-page-container" aria-label="جاري تحميل المقال...">
      {/* Top Bar Navigation & Back Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Skeleton width={120} height={38} borderRadius={999} />
        <div style={{ display: 'flex', gap: '10px' }}>
          <Skeleton width={38} height={38} borderRadius="50%" />
          <Skeleton width={38} height={38} borderRadius="50%" />
        </div>
      </div>

      {/* Breadcrumbs */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '20px' }}>
        <Skeleton width={60} height={16} borderRadius={4} />
        <Skeleton width={12} height={16} borderRadius={4} />
        <Skeleton width={70} height={16} borderRadius={4} />
        <Skeleton width={12} height={16} borderRadius={4} />
        <Skeleton width={140} height={16} borderRadius={4} />
      </div>

      {/* Article Title */}
      <Skeleton width="85%" height={44} borderRadius={10} style={{ marginBottom: '16px' }} />
      <Skeleton width="60%" height={44} borderRadius={10} style={{ marginBottom: '24px' }} />

      {/* Meta Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <Skeleton width={44} height={44} borderRadius="50%" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <Skeleton width={120} height={16} borderRadius={4} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <Skeleton width={80} height={14} borderRadius={4} />
            <Skeleton width={70} height={14} borderRadius={4} />
          </div>
        </div>
      </div>

      {/* Hero Featured Image */}
      <Skeleton width="100%" height={440} borderRadius={18} style={{ marginBottom: '40px' }} />

      {/* Two-Column Detail Layout: Content + TOC Sidebar */}
      <div className="skeleton-detail-layout">
        {/* Main Content Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <Skeleton width="100%" height={20} borderRadius={4} />
          <Skeleton width="98%" height={20} borderRadius={4} />
          <Skeleton width="94%" height={20} borderRadius={4} />
          <Skeleton width="90%" height={20} borderRadius={4} />

          <Skeleton width="50%" height={32} borderRadius={8} style={{ marginTop: '24px', marginBottom: '8px' }} />

          <Skeleton width="100%" height={20} borderRadius={4} />
          <Skeleton width="96%" height={20} borderRadius={4} />
          <Skeleton width="92%" height={20} borderRadius={4} />
          <Skeleton width="85%" height={20} borderRadius={4} />

          {/* Code or Quote Block Skeleton */}
          <Skeleton width="100%" height={160} borderRadius={12} style={{ margin: '16px 0' }} />

          <Skeleton width="98%" height={20} borderRadius={4} />
          <Skeleton width="95%" height={20} borderRadius={4} />
          <Skeleton width="70%" height={20} borderRadius={4} />
        </div>

        {/* Sidebar Column: TOC & Related */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Table of Contents Skeleton */}
          <div className="skeleton-shimmer" style={{ padding: '20px', borderRadius: '16px' }}>
            <Skeleton width={140} height={24} borderRadius={6} style={{ marginBottom: '18px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Skeleton width="90%" height={16} borderRadius={4} />
              <Skeleton width="75%" height={16} borderRadius={4} style={{ marginRight: '16px' }} />
              <Skeleton width="85%" height={16} borderRadius={4} />
              <Skeleton width="70%" height={16} borderRadius={4} style={{ marginRight: '16px' }} />
              <Skeleton width="80%" height={16} borderRadius={4} />
            </div>
          </div>

          {/* Related Articles Box Skeleton */}
          <div className="skeleton-shimmer" style={{ padding: '20px', borderRadius: '16px' }}>
            <Skeleton width={120} height={22} borderRadius={6} style={{ marginBottom: '16px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[1, 2, 3].map((r) => (
                <div key={r} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Skeleton width={56} height={56} borderRadius={8} style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <Skeleton width="95%" height={14} borderRadius={4} />
                    <Skeleton width="60%" height={12} borderRadius={4} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
