import React, { useState, useEffect, useRef, useCallback } from 'react';
import './OptionWheel.css';

export interface OptionWheelItem {
  id?: string;
  label: string;
  value?: string;
  icon?: React.ReactNode;
}

export interface OptionWheelProps {
  options: (string | OptionWheelItem)[];
  selectedIndex?: number;
  onChange?: (index: number, option: string | OptionWheelItem) => void;
  visibleCount?: number;
  itemHeight?: number;
  perspective?: number;
  radius?: number;
  className?: string;
  dir?: 'rtl' | 'ltr';
}

export const OptionWheel: React.FC<OptionWheelProps> = ({
  options,
  selectedIndex = 0,
  onChange,
  visibleCount = 5,
  itemHeight = 46,
  perspective = 800,
  radius = 110,
  className = '',
  dir = 'rtl'
}) => {
  const [activeIdx, setActiveIdx] = useState(selectedIndex);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const dragStartIdx = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedIndex >= 0 && selectedIndex < options.length) {
      setActiveIdx(selectedIndex);
    }
  }, [selectedIndex, options.length]);

  const selectIndex = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(options.length - 1, idx));
    setActiveIdx(clamped);
    if (onChange) {
      onChange(clamped, options[clamped]);
    }
  }, [options, onChange]);

  // Mouse / Touch Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartIdx.current = activeIdx;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaY = e.clientY - dragStartY.current;
    const indexShift = -Math.round(deltaY / (itemHeight * 0.75));
    const targetIdx = Math.max(0, Math.min(options.length - 1, dragStartIdx.current + indexShift));
    if (targetIdx !== activeIdx) {
      selectIndex(targetIdx);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    dragStartY.current = e.touches[0].clientY;
    dragStartIdx.current = activeIdx;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaY = e.touches[0].clientY - dragStartY.current;
    const indexShift = -Math.round(deltaY / (itemHeight * 0.75));
    const targetIdx = Math.max(0, Math.min(options.length - 1, dragStartIdx.current + indexShift));
    if (targetIdx !== activeIdx) {
      selectIndex(targetIdx);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Wheel Scroll handler with throttle
  const wheelLockRef = useRef(false);
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (wheelLockRef.current) return;
    wheelLockRef.current = true;
    setTimeout(() => { wheelLockRef.current = false; }, 120);

    if (e.deltaY > 15 && activeIdx < options.length - 1) {
      selectIndex(activeIdx + 1);
    } else if (e.deltaY < -15 && activeIdx > 0) {
      selectIndex(activeIdx - 1);
    }
  };

  const totalHeight = itemHeight * visibleCount;

  return (
    <div
      ref={containerRef}
      className={`option-wheel-container ${className}`}
      style={{
        height: `${totalHeight}px`,
        perspective: `${perspective}px`
      }}
      dir={dir}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="listbox"
      aria-label={dir === 'rtl' ? "اختيار تصنيف المشاريع" : "Select Project Category"}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          selectIndex(activeIdx + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          selectIndex(activeIdx - 1);
        }
      }}
    >
      {/* Center Highlight Lens */}
      <div
        className="option-wheel-lens"
        style={{
          height: `${itemHeight}px`,
          top: `${(totalHeight - itemHeight) / 2}px`
        }}
      >
        <span className="option-wheel-lens-glow" />
      </div>

      {/* 3D Wheel cylinder */}
      <div className="option-wheel-cylinder">
        {options.map((opt, idx) => {
          const offset = idx - activeIdx;
          const absOffset = Math.abs(offset);
          if (absOffset > Math.floor(visibleCount / 2) + 1) return null;

          const angle = offset * (180 / (visibleCount + 1));
          const opacity = Math.max(0.12, 1 - absOffset * 0.28);
          const scale = Math.max(0.78, 1 - absOffset * 0.08);
          const label = typeof opt === 'string' ? opt : opt.label;
          const isSelected = idx === activeIdx;

          return (
            <div
              key={idx}
              className={`option-wheel-item ${isSelected ? 'active-item' : ''}`}
              style={{
                height: `${itemHeight}px`,
                transform: `translate(-50%, -50%) rotateX(${-angle}deg) translateZ(${radius}px) scale(${scale})`,
                opacity: opacity,
                top: '50%',
                left: '50%'
              }}
              onClick={() => selectIndex(idx)}
              role="option"
              aria-selected={isSelected}
            >
              {typeof opt !== 'string' && opt.icon && (
                <span className="option-wheel-item-icon">{opt.icon}</span>
              )}
              <span className="option-wheel-item-label">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OptionWheel;
