'use client';

import React from 'react';
import '@/components/ui/Skeleton.css';
import { SkLine, SkLines, SkFill, SkBox, SkText } from '@/components/ui/Sk';
import '@/features/contact/ContactPage.css';

// Mirrors ContactPage: hero, form panel (fields) and info panel (cards + map).
export default function ContactLoading() {
  const field = (key: number) => (
    <div key={key} className="form-group"><SkBox w={90} h={14} /><SkBox w="100%" h={46} r={12} style={{ marginTop: 8 }} /></div>
  );
  return (
    <div className="contact-page-wrapper" aria-busy="true" aria-label="جاري تحميل صفحة التواصل...">
      <div className="contact-container">
        <section className="contact-hero">
          <h1 className="contact-hero-title"><SkText words={3} /></h1>
          <p className="contact-hero-desc"><SkText words={12} /></p>
        </section>
        <div className="contact-main-grid">
          <section className="contact-form-panel">
            <h2 className="contact-panel-title"><SkText words={4} /></h2>
            <p className="contact-panel-subtitle"><SkLines n={2} last="70%" /></p>
            <div className="contact-form">
              {field(0)}
              <div className="form-row">{field(1)}{field(2)}</div>
              <div className="form-row">{field(3)}{field(4)}</div>
              <div className="form-group"><SkBox w={90} h={14} /><SkBox w="100%" h={110} r={12} style={{ marginTop: 8 }} /></div>
              <SkBox w="100%" h={49} r={14} />
            </div>
          </section>
          <section className="contact-info-panel">
            <div className="info-cards-stack">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="info-card">
                  <SkBox w={46} h={46} r={12} />
                  <div style={{ flex: 1 }}><SkLine w="35%" /><SkLine w="65%" /></div>
                </div>
              ))}
            </div>
            <div className="contact-map-card">
              <div className="map-card-header"><SkLine w="40%" /></div>
              <div className="map-iframe-wrapper" style={{ position: 'relative' }}><SkFill /></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
