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

  const srcSet = info ? `${info.w640} 640w, ${info.w1280} 1280w` : undefined;
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
