'use client';

import React from 'react';
import '@/components/ui/Skeleton.css';
import { SkLine, SkLines, SkFill, SkBox } from '@/components/ui/Sk';
import '@/features/account/UserProfilePage.css';

// Mirrors the signed-in account page: back link, profile card, saved-items header.
export default function AccountLoading() {
  return (
    <div className="user-profile-wrapper" aria-busy="true" aria-label="جاري تحميل الملف الشخصي...">
      <div className="user-profile-container">
        <div className="user-profile-back-nav"><SkBox w={189} h={36} r={999} /></div>
        <div className="user-profile-card">
          <div className="user-profile-identity">
            <SkBox w={84} h={84} r="50%" />
            <div style={{ flex: 1 }}><SkLine w="35%" style={{ fontSize: 24 }} /><SkLine w="50%" /></div>
          </div>
        </div>
        <div className="favorites-section-header">
          <div className="favorites-title-wrap"><SkBox w={220} h={26} /></div>
          <div className="favorites-filter-pills">{[90, 110, 100, 120].map((w, i) => <SkBox key={i} w={w} h={36} r={12} />)}</div>
        </div>
        <div className="favorites-empty-state" style={{ position: 'relative', minHeight: 320 }}><SkFill /></div>
      </div>
    </div>
  );
}
