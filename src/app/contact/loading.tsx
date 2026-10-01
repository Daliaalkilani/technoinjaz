'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import '@/components/ui/Skeleton.css';

export default function ContactLoading() {
  return (
    <main
      className="skeleton-page-container"
      aria-label="جاري تحميل صفحة التواصل الهندسي..."
      style={{
        minHeight: '85vh',
        padding: '120px 24px 60px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}
    >
      {/* 1. Hero Header (matching ContactPage.jsx) */}
      <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 48px' }}>
        <Skeleton width="45%" height={40} borderRadius={10} style={{ margin: '0 auto 16px' }} />
        <Skeleton width="80%" height={18} borderRadius={6} style={{ margin: '0 auto 10px' }} />
        <Skeleton width="50%" height={16} borderRadius={6} style={{ margin: '0 auto' }} />
      </div>

      {/* 2. Main 2-Column Grid (matching contact-main-grid) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '36px',
          alignItems: 'start'
        }}
      >
        {/* Column 1: Inquiry Form Panel */}
        <div
          className="skeleton-shimmer"
          style={{
            padding: '36px',
            borderRadius: '24px',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            background: 'linear-gradient(165deg, rgba(15, 23, 42, 0.8) 0%, rgba(3, 7, 18, 0.95) 100%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Panel Title & Subtitle */}
          <div>
            <Skeleton width="55%" height={26} borderRadius={6} style={{ marginBottom: '8px' }} />
            <Skeleton width="85%" height={14} borderRadius={4} />
          </div>

          {/* 2-Column Inputs Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <Skeleton width="40%" height={12} borderRadius={4} style={{ marginBottom: '6px' }} />
              <Skeleton width="100%" height={44} borderRadius={10} />
            </div>
            <div>
              <Skeleton width="40%" height={12} borderRadius={4} style={{ marginBottom: '6px' }} />
              <Skeleton width="100%" height={44} borderRadius={10} />
            </div>
            <div>
              <Skeleton width="50%" height={12} borderRadius={4} style={{ marginBottom: '6px' }} />
              <Skeleton width="100%" height={44} borderRadius={10} />
            </div>
            <div>
              <Skeleton width="45%" height={12} borderRadius={4} style={{ marginBottom: '6px' }} />
              <Skeleton width="100%" height={44} borderRadius={10} />
            </div>
          </div>

          {/* Full Width Phone Input */}
          <div>
            <Skeleton width="30%" height={12} borderRadius={4} style={{ marginBottom: '6px' }} />
            <Skeleton width="100%" height={44} borderRadius={10} />
          </div>

          {/* Inquiry Textarea */}
          <div>
            <Skeleton width="35%" height={12} borderRadius={4} style={{ marginBottom: '6px' }} />
            <Skeleton width="100%" height={120} borderRadius={12} />
          </div>

          {/* Submit Button */}
          <Skeleton width="100%" height={48} borderRadius={12} style={{ marginTop: '8px' }} />
        </div>

        {/* Column 2: Info Cards Stack + Google Map Box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* 5 Info Cards Stack (Location, Email, WhatsApp, Instagram, Facebook) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { title: '80px', desc: '140px' },
              { title: '70px', desc: '170px' },
              { title: '65px', desc: '150px' },
              { title: '75px', desc: '160px' },
              { title: '70px', desc: '140px' }
            ].map((card, i) => (
              <div
                key={i}
                className="skeleton-shimmer"
                style={{
                  padding: '16px 20px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <Skeleton width={44} height={44} borderRadius={12} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <Skeleton width={card.title} height={14} borderRadius={4} />
                    <Skeleton width={card.desc} height={16} borderRadius={4} />
                  </div>
                </div>
                <Skeleton width={75} height={24} borderRadius={999} />
              </div>
            ))}
          </div>

          {/* Embedded Google Maps Container */}
          <div
            className="skeleton-shimmer"
            style={{
              height: '200px',
              borderRadius: '18px',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Skeleton width="100%" height={200} borderRadius={0} />
          </div>
        </div>
      </div>
    </main>
  );
}
