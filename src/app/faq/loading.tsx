'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import '@/components/ui/Skeleton.css';

export default function FAQLoading() {
  return (
    <main
      className="skeleton-page-container"
      aria-label="جاري تحميل الأسئلة الشائعة..."
      style={{
        minHeight: '85vh',
        padding: '120px 24px 60px',
        maxWidth: '920px',
        margin: '0 auto'
      }}
    >
      {/* 1. Header (matching FaqSection) */}
      <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 36px' }}>
        <Skeleton width="45%" height={40} borderRadius={10} style={{ margin: '0 auto 14px' }} />
        <Skeleton width="80%" height={18} borderRadius={6} style={{ margin: '0 auto 8px' }} />
        <Skeleton width="55%" height={16} borderRadius={6} style={{ margin: '0 auto' }} />
      </div>

      {/* 2. Category Filter Chips (matching faq-categories-chips-wrap) */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '36px'
        }}
      >
        {[95, 130, 155, 125, 140].map((w, idx) => (
          <Skeleton key={idx} width={w} height={38} borderRadius={999} />
        ))}
      </div>

      {/* 3. Accordion Items List (Question 1 open by default matching FaqSection state) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Item 1: Open state */}
        <div
          className="skeleton-shimmer"
          style={{
            padding: '22px 24px',
            borderRadius: '16px',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(3, 7, 18, 0.9) 100%)'
          }}
        >
          {/* Question title + chevron up */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Skeleton width="65%" height={22} borderRadius={6} />
            <Skeleton width={26} height={26} borderRadius="50%" />
          </div>

          {/* Expanded answer drawer text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <Skeleton width="98%" height={15} borderRadius={4} />
            <Skeleton width="92%" height={15} borderRadius={4} />
            <Skeleton width="70%" height={15} borderRadius={4} />

            {/* Action pill button */}
            <div style={{ marginTop: '8px' }}>
              <Skeleton width={140} height={32} borderRadius={999} />
            </div>
          </div>
        </div>

        {/* Items 2 to 6: Collapsed questions */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="skeleton-shimmer"
            style={{
              padding: '20px 24px',
              borderRadius: '14px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Skeleton width={`${55 + (i % 3) * 12}%`} height={20} borderRadius={6} />
            <Skeleton width={24} height={24} borderRadius="50%" />
          </div>
        ))}
      </div>
    </main>
  );
}
