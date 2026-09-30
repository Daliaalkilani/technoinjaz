'use client';

import React from 'react';
import './Skeleton.css';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({
  width,
  height,
  borderRadius,
  className = '',
  style = {},
  ...props
}: SkeletonProps) {
  const combinedStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    ...style,
  };

  return (
    <div
      className={`skeleton-shimmer ${className}`}
      style={combinedStyle}
      aria-hidden="true"
      {...props}
    />
  );
}

export default Skeleton;
