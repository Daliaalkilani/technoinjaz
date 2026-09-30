'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import '@/components/ui/Skeleton.css';

export default function ProjectDetailLoading() {
  return (
    <main className="skeleton-page-container" aria-label="جاري تحميل المشروع...">
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
        <Skeleton width={130} height={16} borderRadius={4} />
      </div>

      {/* Project Title */}
      <Skeleton width="80%" height={44} borderRadius={10} style={{ marginBottom: '16px' }} />

      {/* Category and Tech Stack Badges */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
        <Skeleton width={90} height={28} borderRadius={999} />
        <Skeleton width={70} height={28} borderRadius={999} />
        <Skeleton width={80} height={28} borderRadius={999} />
        <Skeleton width={65} height={28} borderRadius={999} />
      </div>

      {/* Hero Showcase Image */}
      <Skeleton width="100%" height={460} borderRadius={18} style={{ marginBottom: '40px' }} />

      {/* Two-Column Detail Layout: Details + Metadata Sidebar */}
      <div className="skeleton-detail-layout">
        {/* Main Content Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <Skeleton width="100%" height={20} borderRadius={4} />
          <Skeleton width="96%" height={20} borderRadius={4} />
          <Skeleton width="92%" height={20} borderRadius={4} />

          <Skeleton width="45%" height={30} borderRadius={8} style={{ marginTop: '24px', marginBottom: '8px' }} />

          <Skeleton width="100%" height={20} borderRadius={4} />
          <Skeleton width="98%" height={20} borderRadius={4} />
          <Skeleton width="94%" height={20} borderRadius={4} />

          {/* Architectural Feature Cards Grid Skeleton */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', margin: '20px 0' }}>
            {[1, 2, 3].map((f) => (
              <div key={f} className="skeleton-shimmer" style={{ padding: '18px', borderRadius: '14px' }}>
                <Skeleton width={40} height={40} borderRadius={10} style={{ marginBottom: '12px' }} />
                <Skeleton width="80%" height={20} borderRadius={6} style={{ marginBottom: '8px' }} />
                <Skeleton width="100%" height={14} borderRadius={4} />
                <Skeleton width="65%" height={14} borderRadius={4} style={{ marginTop: '4px' }} />
              </div>
            ))}
          </div>

          <Skeleton width="100%" height={20} borderRadius={4} />
          <Skeleton width="85%" height={20} borderRadius={4} />
        </div>

        {/* Sidebar Column: Project Specs & Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="skeleton-shimmer" style={{ padding: '24px', borderRadius: '16px' }}>
            <Skeleton width={130} height={22} borderRadius={6} style={{ marginBottom: '20px' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 70, val: 100 },
                { label: 55, val: 90 },
                { label: 80, val: 120 },
                { label: 60, val: 85 }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Skeleton width={item.label} height={14} borderRadius={4} />
                  <Skeleton width={item.val} height={16} borderRadius={6} />
                </div>
              ))}
            </div>

            <Skeleton width="100%" height={44} borderRadius={10} style={{ marginTop: '28px' }} />
          </div>
        </div>
      </div>
    </main>
  );
}
