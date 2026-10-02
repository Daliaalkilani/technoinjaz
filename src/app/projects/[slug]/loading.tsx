'use client';

import React from 'react';
import '@/components/ui/Skeleton.css';
import { SkLine, SkLines, SkFill, SkBox, SkText } from '@/components/ui/Sk';
import '@/features/projects/ProjectDetailView.css';

// Mirrors ProjectDetailView (same containers/classes ⇒ same geometry everywhere).
export default function ProjectLoading() {
  return (
    <div className="tab-page-container" style={{ padding: 0, maxWidth: '100%' }} aria-busy="true" aria-label="جاري تحميل المشروع...">
      <div className="project-detail-container">
        <nav className="project-breadcrumbs" aria-hidden="true">
          <SkBox w={70} h={14} /><SkBox w={70} h={14} /><SkBox w={110} h={14} /><SkBox w={200} h={14} />
        </nav>
        <header className="project-detail-header">
          <div className="project-category-badge" style={{ border: 0, background: 'none', padding: 0 }}><SkBox w={150} h={28} r={999} /></div>
          <h1 className="project-detail-title"><SkText words={6} /></h1>
          <p className="project-detail-lead"><SkLines n={2} last="58%" /></p>
          <div className="project-meta-action-bar">
            <div className="project-action-buttons">
              {[62, 78, 118, 124].map((w, i) => <SkBox key={i} w={w} h={36} r={8} />)}
            </div>
          </div>
        </header>
        <div className="project-featured-image-wrapper" style={{ position: 'relative', aspectRatio: '16 / 9', maxHeight: 520, background: 'transparent', boxShadow: 'none' }}><SkFill /></div>
        <div className="project-content-grid">
          <div className="project-markdown-body">
            <div className="markdown-prose">
              <SkLines n={3} last="60%" />
              <h2 style={{ margin: '2rem 0 1rem' }}><SkLine w="42%" /></h2>
              <SkLines n={4} last="72%" />
              <h2 style={{ margin: '2rem 0 1rem' }}><SkLine w="36%" /></h2>
              <SkLines n={3} last="50%" />
            </div>
          </div>
          <aside className="project-sidebar">
            <div className="sidebar-related-card">
              <SkLine w="45%" style={{ fontSize: 20 }} />
              {[88, 72, 80, 66, 84].map((w, i) => <SkLine key={i} w={`${w}%`} style={{ fontSize: 14, margin: '14px 0' }} />)}
            </div>
            <div className="sidebar-related-card">
              <SkLine w="55%" style={{ fontSize: 20 }} />
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginTop: 14, alignItems: 'center' }}>
                  <SkBox w={64} h={48} r={8} />
                  <div style={{ flex: 1, fontSize: 13 }}><SkLine w="45%" /><SkLine w="90%" /></div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
