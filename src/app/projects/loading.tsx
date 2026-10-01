'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import '@/components/ui/Skeleton.css';

export default function ProjectsLoading() {
  return (
    <main
      className="skeleton-page-container"
      aria-label="جاري تحميل المشاريع والمنظومات..."
      style={{
        minHeight: '85vh',
        padding: '120px 24px 60px',
        maxWidth: '1300px',
        margin: '0 auto'
      }}
    >
      {/* 1. Page Header (matching ProjectsHeader) */}
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px' }}>
        <Skeleton width="55%" height={42} borderRadius={10} style={{ margin: '0 auto 16px' }} />
        <Skeleton width="82%" height={18} borderRadius={6} style={{ margin: '0 auto 10px' }} />
        <Skeleton width="50%" height={16} borderRadius={6} style={{ margin: '0 auto' }} />
      </div>

      {/* 2. Live Projects Showcase Spotlight Hero Skeleton */}
      <div
        className="skeleton-shimmer"
        style={{
          maxWidth: '1200px',
          margin: '0 auto 50px',
          padding: '36px',
          borderRadius: '24px',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          background: 'linear-gradient(165deg, rgba(15, 23, 42, 0.8) 0%, rgba(3, 7, 18, 0.95) 100%)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '32px',
          alignItems: 'center'
        }}
      >
        {/* Spotlight Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Skeleton width={120} height={24} borderRadius={999} />
            <div style={{ display: 'flex', gap: '8px' }}>
              <Skeleton width={32} height={32} borderRadius="50%" />
              <Skeleton width={32} height={32} borderRadius="50%" />
            </div>
          </div>
          <Skeleton width="85%" height={32} borderRadius={8} />
          <Skeleton width="100%" height={16} borderRadius={4} />
          <Skeleton width="90%" height={16} borderRadius={4} />

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
            <Skeleton width={90} height={26} borderRadius={999} />
            <Skeleton width={110} height={26} borderRadius={999} />
            <Skeleton width={95} height={26} borderRadius={999} />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '14px' }}>
            <Skeleton width={160} height={42} borderRadius={12} />
            <Skeleton width={42} height={42} borderRadius={12} />
          </div>
        </div>

        {/* Spotlight Image Preview */}
        <div style={{ height: '280px', borderRadius: '18px', overflow: 'hidden' }}>
          <Skeleton width="100%" height={280} borderRadius={18} />
        </div>
      </div>

      {/* 3. Catalog Section Title & Search */}
      <div style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto 28px' }}>
        <Skeleton width="60%" height={32} borderRadius={8} style={{ margin: '0 auto 20px' }} />
        <Skeleton width="100%" height={48} borderRadius={999} />
      </div>

      {/* 4. Category Filter Pills */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '36px'
        }}
      >
        {[100, 140, 130, 160, 145, 135].map((w, idx) => (
          <Skeleton key={idx} width={w} height={38} borderRadius={999} />
        ))}
      </div>

      {/* 5. Projects Catalog Grid */}
      <div className="skeleton-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="skeleton-card skeleton-shimmer"
            style={{
              padding: '0',
              overflow: 'hidden',
              borderRadius: '18px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Skeleton width="100%" height={200} borderRadius={0} />
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              <Skeleton width="88%" height={24} borderRadius={6} />
              <Skeleton width="100%" height={14} borderRadius={4} />
              <Skeleton width="75%" height={14} borderRadius={4} />
              <div style={{ display: 'flex', gap: '6px', marginTop: 'auto', paddingTop: '10px' }}>
                <Skeleton width={60} height={22} borderRadius={6} />
                <Skeleton width={75} height={22} borderRadius={6} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
