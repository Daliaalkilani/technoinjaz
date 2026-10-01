'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import '@/components/ui/Skeleton.css';

export default function AccountLoading() {
  return (
    <main
      className="skeleton-page-container"
      aria-label="جاري تحميل الملف الشخصي والمحفوظات..."
      style={{
        minHeight: '85vh',
        padding: 'clamp(16px, 2.5vw, 28px) 16px 60px',
        maxWidth: '1100px',
        margin: '0 auto'
      }}
    >
      {/* 1. Top Back Navigation Button */}
      <div style={{ marginBottom: '20px' }}>
        <Skeleton width={140} height={38} borderRadius={10} />
      </div>

      {/* 2. User Profile Card (matching user-profile-card) */}
      <div
        className="skeleton-shimmer"
        style={{
          padding: '36px',
          borderRadius: '24px',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          background: 'linear-gradient(165deg, rgba(15, 23, 42, 0.8) 0%, rgba(3, 7, 18, 0.95) 100%)',
          display: 'flex',
          alignItems: 'center',
          gap: '28px',
          marginBottom: '40px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Avatar with Camera badge */}
        <div style={{ position: 'relative' }}>
          <Skeleton width={90} height={90} borderRadius="50%" />
          <div style={{ position: 'absolute', bottom: '0', right: '0' }}>
            <Skeleton width={28} height={28} borderRadius="50%" />
          </div>
        </div>

        {/* Identity Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <Skeleton width="32%" height={26} borderRadius={6} />
          <Skeleton width="48%" height={16} borderRadius={4} />

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '6px' }}>
            <Skeleton width={110} height={26} borderRadius={999} />
            <Skeleton width={120} height={28} borderRadius={8} />
          </div>
        </div>
      </div>

      {/* 3. Favorites Section Header & Filter Pills (matching favorites-section-header) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
        {/* Section title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Skeleton width={28} height={28} borderRadius={6} />
          <Skeleton width={160} height={24} borderRadius={6} />
        </div>

        {/* 4 Filter Pills: All, Projects, Articles, Videos */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {[80, 105, 100, 100].map((w, idx) => (
            <Skeleton key={idx} width={w} height={36} borderRadius={999} />
          ))}
        </div>
      </div>

      {/* 4. Saved Items Grid */}
      <div className="skeleton-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="skeleton-card skeleton-shimmer"
            style={{
              padding: '0',
              overflow: 'hidden',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Skeleton width="100%" height={150} borderRadius={0} />
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Skeleton width={70} height={20} borderRadius={999} />
                <Skeleton width={26} height={26} borderRadius="50%" />
              </div>
              <Skeleton width="85%" height={20} borderRadius={6} />
              <Skeleton width="100%" height={14} borderRadius={4} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
