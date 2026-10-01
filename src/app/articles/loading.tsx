'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import '@/components/ui/Skeleton.css';

export default function ArticlesLoading() {
  return (
    <main
      className="skeleton-page-container"
      aria-label="جاري تحميل المقالات الهندسية..."
      style={{
        minHeight: '85vh',
        padding: '120px 24px 60px',
        maxWidth: '1280px',
        margin: '0 auto'
      }}
    >
      {/* 1. Header (matching ArticlesListing) */}
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 28px' }}>
        <Skeleton width="60%" height={40} borderRadius={10} style={{ margin: '0 auto 14px' }} />
        <Skeleton width="85%" height={18} borderRadius={6} style={{ margin: '0 auto 8px' }} />
        <Skeleton width="50%" height={16} borderRadius={6} style={{ margin: '0 auto' }} />
      </div>

      {/* 2. Search Pill Bar */}
      <div style={{ maxWidth: '580px', margin: '0 auto 24px', display: 'flex', justifyContent: 'center' }}>
        <Skeleton width="100%" height={46} borderRadius={999} />
      </div>

      {/* 3. Filter Row: Sort Capsules + Category Chips with count */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '36px'
        }}
      >
        {/* Sort capsules */}
        <Skeleton width={90} height={36} borderRadius={999} />
        <Skeleton width={110} height={36} borderRadius={999} />

        <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />

        {/* Category chips with counts */}
        {[85, 120, 105, 130, 95].map((w, idx) => (
          <Skeleton key={idx} width={w} height={36} borderRadius={999} />
        ))}
      </div>

      {/* 4. Articles Grid: Matching .blog-modern-card */}
      <div className="skeleton-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '26px' }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="skeleton-card skeleton-shimmer"
            style={{
              padding: '0',
              overflow: 'hidden',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* 16:9 Media Banner */}
            <Skeleton width="100%" height={180} borderRadius={0} />

            {/* Card Body */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              {/* Category capsule + Read time pill */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Skeleton width={85} height={24} borderRadius={999} />
                <Skeleton width={65} height={20} borderRadius={999} />
              </div>

              {/* Main Article Title */}
              <Skeleton width="92%" height={24} borderRadius={6} />
              <Skeleton width="65%" height={24} borderRadius={6} />

              {/* Excerpt */}
              <Skeleton width="100%" height={14} borderRadius={4} />
              <Skeleton width="78%" height={14} borderRadius={4} />

              {/* Footer: Author Pill + Actions Group */}
              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                {/* Author Pill (avatar + name + date) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Skeleton width={30} height={30} borderRadius="50%" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <Skeleton width={75} height={12} borderRadius={4} />
                    <Skeleton width={55} height={10} borderRadius={4} />
                  </div>
                </div>

                {/* Actions (Heart + Bookmark) */}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Skeleton width={28} height={28} borderRadius="50%" />
                  <Skeleton width={28} height={28} borderRadius="50%" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
