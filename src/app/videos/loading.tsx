'use client';

import React from 'react';
import '@/components/ui/Skeleton.css';
import { SkLine, SkLines, SkFill, SkBox, SkText } from '@/components/ui/Sk';
import '@/features/videos/ProjectReelsFeed.css';

// Mirrors /videos: page header, category sidebar and the reels feed frame.
export default function VideosLoading() {
  return (
    <div className="tab-page-container tab-page-videos" style={{ padding: 0, maxWidth: '100%' }} aria-busy="true" aria-label="جاري تحميل الفيديوهات...">
      <div className="tab-page-header reels-page-header">
        <h1 className="tab-page-title reels-page-title"><SkText words={3} /></h1>
        <p className="tab-page-subtitle reels-page-subtitle"><SkText words={14} /></p>
      </div>
      <section className="cinema-reels-experience">
        <div className="cinema-reels-layout">
          <aside className="cinema-reels-sidebar">
            {[150, 120, 140, 110, 130].map((w, i) => <SkBox key={i} w={w} h={38} r={999} style={{ maxWidth: '100%' }} />)}
          </aside>
          <div className="cinema-reels-feed-stream">
            <div className="cinema-reel-card-item">
              <div className="cinema-reel-phone-frame" style={{ position: 'relative' }}><SkFill /></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
