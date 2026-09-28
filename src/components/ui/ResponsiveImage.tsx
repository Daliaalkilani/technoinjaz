'use client';

import React from 'react';

let manifest: Record<string, { w: number; h: number; w640: string; w1280: string }> = {};
try {
  manifest = require('../../../public/_img/manifest.json');
} catch {
  manifest = {};
}

export interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export function ResponsiveImage({
  src,
  alt,
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw',
  className,
  width,
  height,
  ...props
}: ResponsiveImageProps) {
  // Normalize src
  const normalizedSrc = src.startsWith('/') ? src : '/' + src;
  const info = (manifest as Record<string, { w: number; h: number; w640: string; w1280: string }>)[normalizedSrc];

  // Compressed variants for small/medium displays, plus the original file as the
  // largest candidate so large high-density screens keep full source quality.
  const srcSet = info
    ? [
        `${info.w640} 640w`,
        // When the original is no wider than 1280px, serve the original itself at that width
        // (a same-size compressed copy would only lose quality).
        info.w > 1280 ? `${info.w1280} 1280w` : `${normalizedSrc} ${info.w}w`,
        info.w > 1280 ? `${normalizedSrc} ${info.w}w` : null,
      ]
        .filter(Boolean)
        .join(', ')
    : undefined;
  const computedWidth = width || info?.w || undefined;
  const computedHeight = height || info?.h || undefined;

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      width={computedWidth}
      height={computedHeight}
      alt={alt || ''}
      loading={priority ? 'eager' : 'lazy'}
      // @ts-ignore fetchPriority is valid in modern React/HTML
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={className}
      {...props}
    />
  );
}

export default ResponsiveImage;
