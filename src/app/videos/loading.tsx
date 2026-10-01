'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import '@/components/ui/Skeleton.css';

export default function VideosLoading() {
  return (
    <main
      className="skeleton-page-container"
      aria-label="جاري تحميل الفيديوهات الحية..."
      style={{
        minHeight: '85vh',
        padding: '120px 20px 60px',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* 1. Header Skeleton */}
      <div style={{ textAlign: 'center', maxWidth: '640px', width: '100%', marginBottom: '28px' }}>
        <Skeleton width="48%" height={38} borderRadius={10} style={{ margin: '0 auto 14px' }} />
        <Skeleton width="75%" height={16} borderRadius={6} style={{ margin: '0 auto 8px' }} />
        <Skeleton width="55%" height={14} borderRadius={4} style={{ margin: '0 auto' }} />
      </div>

      {/* 2. Category Filter Chips (matching reelCategories) */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '36px',
          width: '100%',
          maxWidth: '680px'
        }}
      >
        {[90, 115, 125, 105, 95].map((w, idx) => (
          <Skeleton key={idx} width={w} height={36} borderRadius={999} />
        ))}
      </div>

      {/* 3. Cinema Reels Stage (matching ProjectReelsFeed 9:16 vertical phone layout) */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          width: '100%',
          maxWidth: '540px'
        }}
      >
        {/* Main Phone Reel Frame */}
        <div
          className="skeleton-shimmer"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '430px',
            height: '680px',
            borderRadius: '26px',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(3, 7, 18, 0.98) 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '24px 20px',
            boxSizing: 'border-box',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)'
          }}
        >
          {/* Top Video Header: Engineer avatar + name + status */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Skeleton width={42} height={42} borderRadius="50%" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <Skeleton width={110} height={16} borderRadius={4} />
                <Skeleton width={80} height={12} borderRadius={4} />
              </div>
            </div>
            <Skeleton width={36} height={36} borderRadius="50%" />
          </div>

          {/* Center Play Button Pulse Placeholder */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
            <Skeleton width={64} height={64} borderRadius="50%" />
          </div>

          {/* Bottom Video Meta: Category + Title + Excerpt + Progress */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', zIndex: 2 }}>
            <Skeleton width={90} height={22} borderRadius={999} />
            <Skeleton width="88%" height={22} borderRadius={6} />
            <Skeleton width="96%" height={14} borderRadius={4} />
            <Skeleton width="65%" height={14} borderRadius={4} />

            {/* Video Scrubber Bar */}
            <div style={{ marginTop: '12px' }}>
              <Skeleton width="100%" height={4} borderRadius={999} />
            </div>
          </div>
        </div>

        {/* Floating Vertical Actions Column (Heart, Comment, Bookmark, Share) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            alignItems: 'center'
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <Skeleton width={46} height={46} borderRadius="50%" />
              <Skeleton width={24} height={10} borderRadius={4} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
