'use client';

import React from 'react';
import ResponsiveImage from './ResponsiveImage';

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
  /** Rendered width for responsive selection (default: full viewport width) */
  sizes?: string;
  style?: React.CSSProperties;
}

export function ThemedImage({ dark, light, alt, className = '', priority, sizes = '100vw', style }: ThemedImageProps) {
  const darkSrc = typeof dark === 'string' ? dark : dark.src;
  const darkWidth = typeof dark === 'string' ? undefined : dark.width;
  const darkHeight = typeof dark === 'string' ? undefined : dark.height;

  const lightSrc = typeof light === 'string' ? light : light.src;
  const lightWidth = typeof light === 'string' ? undefined : light.width;
  const lightHeight = typeof light === 'string' ? undefined : light.height;

  return (
    <>
      {/* Both variants are in the HTML; CSS shows the active theme. Only the dark one
          (the default theme) may be high priority; the hidden one is never fetched. */}
      <ResponsiveImage
        src={darkSrc}
        width={darkWidth}
        height={darkHeight}
        alt={alt}
        sizes={sizes}
        className={`${className} themed themed--dark`}
        priority={priority}
        style={style}
      />
      <ResponsiveImage
        src={lightSrc}
        width={lightWidth}
        height={lightHeight}
        alt={alt}
        sizes={sizes}
        className={`${className} themed themed--light`}
        style={style}
      />
    </>
  );
}

export default ThemedImage;
