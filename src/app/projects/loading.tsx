'use client';

import React from 'react';
import '@/components/ui/Skeleton.css';
import { SkLine, SkLines, SkFill, SkBox, SkText } from '@/components/ui/Sk';
import '@/features/projects/LiveProjectsShowcase.css';
import '@/features/projects/ProjectsCatalogSection.css';

// Mirrors /projects: page header, live-projects spotlight, then the catalog grid.
export default function ProjectsLoading() {
  return (
    <div className="tab-page-container tab-page-projects" style={{ padding: 0, maxWidth: '100%' }} aria-busy="true" aria-label="جاري تحميل المشاريع...">
      <div className="tab-page-header projects-page-header">
        <h1 className="tab-page-title projects-page-title"><SkText words={4} /></h1>
        <p className="tab-page-subtitle projects-page-subtitle"><SkText words={12} /></p>
      </div>
      <div className="live-projects-container">
        <div className="spotlight-hero">
          <div className="spotlight-top-controls"><SkBox w={180} h={32} r={999} /><SkBox w={120} h={36} r={999} /></div>
          <div className="spotlight-content-grid">
            <div>
              <SkLine w="70%" style={{ fontSize: 30 }} />
              <SkLines n={3} last="65%" />
              <div style={{ display: 'flex', gap: 10, marginTop: 18 }}><SkBox w={140} h={44} r={12} /><SkBox w={120} h={44} r={12} /></div>
            </div>
            <div style={{ position: 'relative', aspectRatio: '16 / 10', borderRadius: 16 }}><SkFill /></div>
          </div>
          <div className="spotlight-progress-track" />
          <div className="spotlight-pagination-dots">
            {Array.from({ length: 13 }, (_, i) => <SkBox key={i} w={10} h={10} r={999} />)}
          </div>
        </div>
      </div>
      <section className="catalog-section">
        <div className="catalog-hero-wrapper">
          <h2 className="catalog-hero-title"><SkText words={5} /></h2>
          <div className="catalog-search-bar" style={{ position: 'relative', minHeight: 49 }}><SkFill /></div>
        </div>
        <div className="catalog-categories-bar">
          {[125, 178, 178, 239, 227, 191].map((w, i) => <SkBox key={i} w={w} h={39} r={999} />)}
        </div>
        <div className="catalog-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <article key={i} className="project-card">
              <div className="card-thumb-wrap" style={{ position: 'relative' }}><SkFill /></div>
              <div className="card-body">
                <h3 className="card-title"><SkText words={6} /></h3>
                <p className="card-excerpt"><SkLines n={3} last="70%" /></p>
                <div className="card-tags">{[90, 82, 64].map((w, j) => <SkBox key={j} w={w} h={21} r={4} />)}</div>
                <div className="card-footer"><SkBox w={148} h={17} /></div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
