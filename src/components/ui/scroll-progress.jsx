import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress({ className = '', style = {}, ...props }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  const topMatch = className?.match(/top-\[([^\]]+)\]/);
  const top = topMatch ? topMatch[1] : (className?.includes('top-0') ? '0px' : '65px');

  return (
    <motion.div
      className={`scroll-progress-bar ${className}`.trim()}
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        top,
        height: '3px',
        transformOrigin: '0%',
        zIndex: 1000,
        background: 'linear-gradient(to right, #00d2ff, #3b82f6, #6366f1, #00f2fe)',
        boxShadow: '0 0 14px rgba(0, 210, 255, 0.7)',
        scaleX,
        ...style
      }}
      {...props}
    />
  );
}

export default ScrollProgress;
