'use client';

import React from 'react';

export type ThemedImageSource = string | {
  src: string;
  width?: number;
  height?: number;
};

export interface ThemedImageProps {
  dark: ThemedImageSource;
  light: ThemedImageSource;
  alt: string;
  className?: string;
  priority?: boolean;
  style?: React.CSSProperties;
}

export function ThemedImage({ dark, light, alt, className = '', priority, style }: ThemedImageProps) {
  const darkSrc = typeof dark === 'string' ? dark : dark.src;
  const darkWidth = typeof dark === 'string' ? undefined : dark.width;
  const darkHeight = typeof dark === 'string' ? undefined : dark.height;

  const lightSrc = typeof light === 'string' ? light : light.src;
  const lightWidth = typeof light === 'string' ? undefined : light.width;
  const lightHeight = typeof light === 'string' ? undefined : light.height;

  return (
    <>
      <img
        src={darkSrc}
        width={darkWidth}
        height={darkHeight}
        alt={alt}
        className={`${className} themed themed--dark`}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        style={style}
      />
      <img
        src={lightSrc}
        width={lightWidth}
        height={lightHeight}
        alt={alt}
        className={`${className} themed themed--light`}
        loading="lazy"
        decoding="async"
        style={style}
      />
    </>
  );
}

export default ThemedImage;
