'use client';

import React from 'react';
import '@/components/ui/Skeleton.css';
import { SkLine, SkLines, SkFill, SkBox, SkText } from '@/components/ui/Sk';
import '@/features/projects/ProjectDetailView.css';
import '@/features/articles/ArticleDetailView.css';

// Mirrors ArticleDetailView: same containers/classes, so the geometry matches at
// every breakpoint (sidebar hidden ≤960px exactly like the page).
export default function ArticleLoading() {
  return (
    <div className="tab-page-container tab-page-article-detail" style={{ padding: 0, maxWidth: '100%' }} aria-busy="true" aria-label="جاري تحميل المقال...">
      <div className="project-detail-container article-detail-container">
        <nav className="project-breadcrumbs" aria-hidden="true">
          <SkBox w={70} h={14} /><SkBox w={70} h={14} /><SkBox w={90} h={14} /><SkBox w={200} h={14} />
        </nav>
        <header className="project-detail-header">
          <div className="article-lead-category-wrap">
            <SkBox w={120} h={28} r={999} /><SkBox w={90} h={16} />
          </div>
          <h1 className="project-detail-title"><SkText words={8} /></h1>
          <p className="project-detail-lead"><SkLines n={3} last="62%" /></p>
          <div className="article-author-capsule-row"><SkBox w={320} h={40} r={999} style={{ maxWidth: '100%' }} /></div>
          <div className="project-meta-action-bar">
            <div className="project-action-buttons">
              {[62, 70, 52, 86].map((w, i) => <SkBox key={i} w={w} h={36} r={8} />)}
            </div>
          </div>
        </header>
        <div className="project-featured-image-wrapper" style={{ position: 'relative', aspectRatio: '16 / 9', background: 'transparent', boxShadow: 'none' }}><SkFill /></div>
        <div className="project-content-grid">
          <div className="project-markdown-body">
            <div className="article-fullscreen-markdown-body">
              <SkLines n={4} last="55%" />
              <h2 style={{ margin: '2.2rem 0 1rem' }}><SkLine w="48%" /></h2>
              <SkLines n={5} last="70%" />
              <h2 style={{ margin: '2.2rem 0 1rem' }}><SkLine w="40%" /></h2>
              <SkLines n={4} last="45%" />
            </div>
          </div>
          <aside className="project-sidebar">
            <div className="sidebar-related-card">
              <SkLine w="45%" style={{ fontSize: 20 }} />
              {[90, 76, 84, 70, 80, 66].map((w, i) => <SkLine key={i} w={`${w}%`} style={{ fontSize: 14, margin: '14px 0' }} />)}
            </div>
            <div className="sidebar-related-card">
              <SkLine w="55%" style={{ fontSize: 20 }} />
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginTop: 14, alignItems: 'center' }}>
                  <SkBox w={56} h={56} r={10} />
                  <div style={{ flex: 1, fontSize: 13 }}><SkLine w="40%" /><SkLine w="90%" /></div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
