import React from 'react';

// Structural skeleton helpers (see "STRUCTURAL SKELETON PRIMITIVES" in Skeleton.css).
// They are placed inside the page's real elements/classes so that the skeleton has
// the page's exact geometry on every screen size.

/** A text line: width in % or px; height follows the parent's font size. */
export function SkLine({ w = '100%', center = false, style }: { w?: string | number; center?: boolean; style?: React.CSSProperties }) {
  return <span className={`sk sk-line${center ? ' sk-center' : ''}`} style={{ width: w, ...style }} aria-hidden="true" />;
}

/**
 * Placeholder text that wraps exactly like real text: invisible words of a typical
 * length painted as shimmer stripes (one stripe per line, box-decoration-break), so
 * the number of lines matches the real content at every screen width.
 */
export function SkText({ words = 8 }: { words?: number }) {
  return (
    // The placeholder words live in a data attribute rendered by CSS (::before), so
    // they wrap like text but are not part of the page's text content (search engines
    // and screen readers never see them).
    <span
      className="sk-text"
      aria-hidden="true"
      style={{ color: 'transparent' }}
      data-sk={Array.from({ length: words }, (_, i) => (i % 3 === 0 ? 'mmmmmm ' : i % 3 === 1 ? 'mmm ' : 'mmmmm ')).join('')}
    />
  );
}

/** A paragraph of about `n` lines on desktop (wraps naturally on smaller screens). */
export function SkLines({ n = 2 }: { n?: number; last?: string; center?: boolean }) {
  return <SkText words={n * 9} />;
}

/** Fills a sized parent (image areas, media, panels). */
export function SkFill() {
  return <span className="sk sk-fill" aria-hidden="true" />;
}

/** A fixed block (buttons, pills, avatars). */
export function SkBox({ w, h, r = 8, style, className = '' }: { w: number | string; h: number | string; r?: number | string; style?: React.CSSProperties; className?: string }) {
  return <span className={`sk ${className}`} style={{ display: 'inline-block', width: w, height: h, borderRadius: r, flexShrink: 0, ...style }} aria-hidden="true" />;
}
