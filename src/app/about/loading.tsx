'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import '@/components/ui/Skeleton.css';

export default function AboutLoading() {
  return (
    <main
      className="skeleton-page-container"
      aria-label="جاري تحميل قسم من نحن وفريق العمل..."
      style={{
        minHeight: '85vh',
        padding: '120px 20px 60px',
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      {/* 1. Header (matching about-header-container) */}
      <div style={{ textAlign: 'center', maxWidth: '680px', width: '100%', marginBottom: '40px' }}>
        <Skeleton width="45%" height={40} borderRadius={10} style={{ margin: '0 auto 16px' }} />
        <Skeleton width="80%" height={18} borderRadius={6} style={{ margin: '0 auto 10px' }} />
        <Skeleton width="50%" height={16} borderRadius={6} style={{ margin: '0 auto' }} />
      </div>

      {/* 2. Team Moments Ring 3D Arc Stage Placeholder */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1000px',
          height: '380px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          perspective: '1000px',
          marginBottom: '50px'
        }}
      >
        {/* Arc of 5 3D cards */}
        {/* Left outer card */}
        <div
          className="skeleton-shimmer"
          style={{
            position: 'absolute',
            left: '5%',
            width: '180px',
            height: '240px',
            borderRadius: '18px',
            transform: 'rotateY(35deg) scale(0.75)',
            opacity: 0.4,
            border: '1px solid rgba(255,255,255,0.06)'
          }}
        />

        {/* Left inner card */}
        <div
          className="skeleton-shimmer"
          style={{
            position: 'absolute',
            left: '22%',
            width: '210px',
            height: '280px',
            borderRadius: '20px',
            transform: 'rotateY(20deg) scale(0.88)',
            opacity: 0.7,
            zIndex: 2,
            border: '1px solid rgba(56, 189, 248, 0.2)'
          }}
        />

        {/* Center active card */}
        <div
          className="skeleton-shimmer"
          style={{
            position: 'relative',
            width: '240px',
            height: '320px',
            borderRadius: '24px',
            zIndex: 5,
            border: '1px solid rgba(56, 189, 248, 0.4)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(56, 189, 248, 0.15)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            gap: '8px'
          }}
        >
          <Skeleton width={70} height={20} borderRadius={999} />
          <Skeleton width="85%" height={20} borderRadius={6} />
          <Skeleton width="60%" height={14} borderRadius={4} />
        </div>

        {/* Right inner card */}
        <div
          className="skeleton-shimmer"
          style={{
            position: 'absolute',
            right: '22%',
            width: '210px',
            height: '280px',
            borderRadius: '20px',
            transform: 'rotateY(-20deg) scale(0.88)',
            opacity: 0.7,
            zIndex: 2,
            border: '1px solid rgba(56, 189, 248, 0.2)'
          }}
        />

        {/* Right outer card */}
        <div
          className="skeleton-shimmer"
          style={{
            position: 'absolute',
            right: '5%',
            width: '180px',
            height: '240px',
            borderRadius: '18px',
            transform: 'rotateY(-35deg) scale(0.75)',
            opacity: 0.4,
            border: '1px solid rgba(255,255,255,0.06)'
          }}
        />
      </div>

      {/* 3. InfiniteMenu Circular Team Showcase Stage */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '850px',
          padding: '40px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px'
        }}
      >
        {/* Center Orb & Active Member Card */}
        <div
          className="skeleton-shimmer"
          style={{
            width: '100%',
            maxWidth: '460px',
            padding: '32px 24px',
            borderRadius: '24px',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            background: 'linear-gradient(165deg, rgba(15, 23, 42, 0.8) 0%, rgba(3, 7, 18, 0.95) 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '14px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Member Avatar with ring */}
          <div style={{ position: 'relative', width: '110px', height: '110px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Skeleton width={100} height={100} borderRadius="50%" />
          </div>

          <Skeleton width={180} height={26} borderRadius={6} />
          <Skeleton width={140} height={18} borderRadius={999} />
          <Skeleton width="90%" height={14} borderRadius={4} />
          <Skeleton width="75%" height={14} borderRadius={4} />

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
            <Skeleton width={36} height={36} borderRadius="50%" />
            <Skeleton width={36} height={36} borderRadius="50%" />
            <Skeleton width={36} height={36} borderRadius="50%" />
          </div>
        </div>
      </div>
    </main>
  );
}
