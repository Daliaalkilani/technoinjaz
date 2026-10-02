'use client';

import React, { createContext, useContext, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  type SpringOptions
} from 'framer-motion';
import { Home, FolderGit2, Video, BookOpen, HelpCircle, Users, Send } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import './TabletDock.css';

// Tablet navigation (≈600px–1023px, plus 1024–1366px portrait): a macOS-style dock at
// the bottom of the screen (owner's reference: motion-primitives Dock). Icons magnify
// with the distance to the pointer — mouse hover or a finger sliding along the dock —
// and the label of the icon under the pointer floats above it. Lifting the finger over
// an icon after sliding opens that section; a plain tap works like a normal link.
// Visibility is pure CSS (TabletDock.css): no hydration flash, instant on rotate.

export interface TabletDockItem {
  label: string;
  href: string;
}

export interface TabletDockProps {
  items: TabletDockItem[];
  activeIndex: number;
}

const ICONS: LucideIcon[] = [Home, FolderGit2, Video, BookOpen, HelpCircle, Users, Send];

const BASE_SIZE = 46;
const MAGNIFICATION = 74;
const DISTANCE = 140;
const SPRING: SpringOptions = { mass: 0.1, stiffness: 150, damping: 12 };

type DockCtx = { pointerX: MotionValue<number>; hoveredIndex: number | null };
const DockContext = createContext<DockCtx | null>(null);

function DockItem({
  index,
  item,
  Icon,
  active,
}: {
  index: number;
  item: TabletDockItem;
  Icon: LucideIcon;
  active: boolean;
}) {
  const ctx = useContext(DockContext)!;
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(ctx.pointerX, (x) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r || !Number.isFinite(x)) return DISTANCE * 2;
    return x - r.left - r.width / 2;
  });
  const sizeTarget = useTransform(distance, [-DISTANCE, 0, DISTANCE], [BASE_SIZE, MAGNIFICATION, BASE_SIZE]);
  const size = useSpring(sizeTarget, SPRING);
  const iconSize = useTransform(size, (s) => s * 0.46);

  const showLabel = ctx.hoveredIndex === index;

  return (
    <li className="tablet-dock__item">
      <motion.span className="tablet-dock__slot" style={{ width: size, height: size }}>
        <Link
          ref={ref}
          href={item.href}
          prefetch={true}
          data-dock-index={index}
          className={`tablet-dock__link ${active ? 'is-active' : ''}`}
          aria-current={active ? 'page' : undefined}
          aria-label={item.label}
        >
          <motion.span className="tablet-dock__icon" style={{ width: iconSize, height: iconSize }} aria-hidden="true">
            <Icon width="100%" height="100%" strokeWidth={active ? 2.2 : 1.8} />
          </motion.span>
          <span className="tablet-dock__dot" aria-hidden="true" />
        </Link>
      </motion.span>

      <AnimatePresence>
        {showLabel && (
          <motion.span
            className="tablet-dock__label"
            role="tooltip"
            initial={{ opacity: 0, y: 0, x: '-50%' }}
            animate={{ opacity: 1, y: -10, x: '-50%' }}
            exit={{ opacity: 0, y: 0, x: '-50%' }}
            transition={{ duration: 0.18 }}
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </li>
  );
}

export function TabletDock({ items, activeIndex }: TabletDockProps) {
  const { lang } = useThemeLanguage();
  const router = useRouter();
  const isRtl = lang === 'ar';

  const pointerX = useMotionValue(Infinity);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const drag = useRef<{ x: number; moved: boolean } | null>(null);
  const justDragged = useRef(false);

  const indexAt = (x: number, y: number) => {
    const el = document.elementFromPoint(x, y)?.closest('[data-dock-index]') as HTMLElement | null;
    return el ? Number(el.dataset.dockIndex) : null;
  };

  const track = (e: React.PointerEvent) => {
    pointerX.set(e.clientX);
    setHoveredIndex(indexAt(e.clientX, e.clientY));
  };

  const reset = () => {
    pointerX.set(Infinity);
    setHoveredIndex(null);
    drag.current = null;
  };

  return (
    <nav className="tablet-dock" aria-label={isRtl ? 'التنقل الرئيسي' : 'Main navigation'} dir={isRtl ? 'rtl' : 'ltr'}>
      <DockContext.Provider value={{ pointerX, hoveredIndex }}>
        <ul
          className="tablet-dock__panel"
          onPointerMove={(e) => {
            if (e.pointerType !== 'mouse' && !drag.current) return;
            if (drag.current && Math.abs(e.clientX - drag.current.x) > 8) drag.current.moved = true;
            track(e);
          }}
          onPointerDown={(e) => {
            if (e.pointerType === 'mouse') return;
            drag.current = { x: e.clientX, moved: false };
            (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
            track(e);
          }}
          onPointerUp={(e) => {
            if (e.pointerType === 'mouse') return;
            const d = drag.current;
            const i = indexAt(e.clientX, e.clientY);
            reset();
            // slide-and-lift: open the icon under the finger
            if (d?.moved && i !== null && items[i]) {
              justDragged.current = true;
              window.setTimeout(() => { justDragged.current = false; }, 350);
              router.push(items[i].href);
            }
          }}
          onPointerCancel={reset}
          onClickCapture={(e) => {
            // the slide already navigated; swallow the click the browser may still send
            if (justDragged.current) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === 'mouse') reset();
          }}
        >
          {items.map((item, i) => (
            <DockItem
              key={item.href}
              index={i}
              item={item}
              Icon={ICONS[i] || Home}
              active={i === activeIndex}
            />
          ))}
        </ul>
      </DockContext.Provider>
    </nav>
  );
}

export default TabletDock;
