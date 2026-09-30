'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import '@/components/ui/Skeleton.css';

export default function TeamMemberLoading() {
  return (
    <main className="skeleton-page-container" aria-label="جاري تحميل ملف العضو...">
      {/* Back button */}
      <Skeleton width={110} height={36} borderRadius={999} style={{ marginBottom: '32px' }} />

      {/* Member Profile Header Glass Card */}
      <div
        className="skeleton-shimmer"
        style={{
          padding: '36px',
          borderRadius: '20px',
          display: 'flex',
          gap: '32px',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: '36px'
        }}
      >
        {/* Avatar */}
        <Skeleton width={130} height={130} borderRadius="50%" style={{ flexShrink: 0 }} />

        {/* Info */}
        <div style={{ flex: 1, minWidth: '240px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Skeleton width={200} height={32} borderRadius={8} />
          <Skeleton width={160} height={20} borderRadius={6} />
          <Skeleton width={120} height={16} borderRadius={4} />

          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <Skeleton width={36} height={36} borderRadius="50%" />
            <Skeleton width={36} height={36} borderRadius="50%" />
            <Skeleton width={36} height={36} borderRadius="50%" />
          </div>
        </div>
      </div>

      {/* Bio & Skills */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <div className="skeleton-shimmer" style={{ padding: '24px', borderRadius: '16px' }}>
          <Skeleton width={120} height={24} borderRadius={6} style={{ marginBottom: '16px' }} />
          <Skeleton width="100%" height={16} borderRadius={4} style={{ marginBottom: '10px' }} />
          <Skeleton width="95%" height={16} borderRadius={4} style={{ marginBottom: '10px' }} />
          <Skeleton width="80%" height={16} borderRadius={4} />
        </div>

        <div className="skeleton-shimmer" style={{ padding: '24px', borderRadius: '16px' }}>
          <Skeleton width={110} height={24} borderRadius={6} style={{ marginBottom: '16px' }} />
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[80, 100, 70, 95, 85, 110].map((w, idx) => (
              <Skeleton key={idx} width={w} height={30} borderRadius={999} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
