'use client';

import React from 'react';

// Shared wave background of the home sections (projects, videos, articles).
// - AVIF/WebP copies in public/images/home/bg (≈15–75KB, SSIM ≥ 0.98 against the
//   1.4MB PNG originals, which remain only as the last-resort fallback).
// - The image is very wide (2.23:1): on a portrait phone it must scale to the full
//   screen height to cover it, so `sizes` asks for ≈223vh there and 100vw otherwise.
// - Both theme variants are in the HTML; CSS shows the active one (.themed--*), and
//   the hidden one is never fetched (lazy + display:none).
const SIZES = '(max-aspect-ratio: 2231/1000) 223vh, 100vw';

const VARIANTS = {
  dark: { name: 'section-bg-dark', full: 1871, fallback: '/images/home/bg/section-bg-dark-1871.webp' },
  light: { name: 'section-bg-light', full: 1873, fallback: '/images/home/bg/section-bg-light-1873.webp' },
} as const;

function BgPicture({ theme, className }: { theme: 'dark' | 'light'; className: string }) {
  const v = VARIANTS[theme];
  const set = (ext: 'avif' | 'webp') =>
    `/images/home/bg/${v.name}-960.${ext} 960w, /images/home/bg/${v.name}-${v.full}.${ext} ${v.full}w`;
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={SIZES} />
      <source type="image/webp" srcSet={set('webp')} sizes={SIZES} />
      <img
        src={v.fallback}
        alt=""
        aria-hidden="true"
        width={v.full}
        height={840}
        loading="lazy"
        decoding="async"
        className={`${className} themed themed--${theme}`}
      />
    </picture>
  );
}

export function SectionBackground() {
  return (
    <div className="projects-grid-distortion-wrapper" aria-hidden="true">
      {/* Sticky, viewport-tall layer: on tall (mobile) sections the wave stays behind
          the content while scrolling instead of a thin band in the middle. */}
      <div className="projects-grid-distortion-inner section-bg-sticky">
        <BgPicture theme="dark" className="projects-bg-static-img" />
        <BgPicture theme="light" className="projects-bg-static-img" />
      </div>
      <div className="projects-grid-distortion-vignette" />
    </div>
  );
}

export default SectionBackground;
