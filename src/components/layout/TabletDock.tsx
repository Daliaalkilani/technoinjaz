'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, FolderGit2, Video, BookOpen, HelpCircle, Users, Send } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import './TabletDock.css';

// Tablet navigation (≈600px–1023px, plus 1024–1366px portrait): a floating glass dock
// at the bottom of the screen with the main sections, iPad / macOS style. It replaces
// the hamburger + side drawer on tablets; phones (<600px) keep the drawer and desktop
// keeps the GooeyNav. Visibility is handled purely in CSS (TabletDock.css) so there is
// no hydration flash and resizing / rotating switches instantly.

export interface TabletDockItem {
  label: string;
  href: string;
}

export interface TabletDockProps {
  items: TabletDockItem[];
  activeIndex: number;
}

const ICONS: LucideIcon[] = [Home, FolderGit2, Video, BookOpen, HelpCircle, Users, Send];

export function TabletDock({ items, activeIndex }: TabletDockProps) {
  const { lang } = useThemeLanguage();
  const router = useRouter();
  const isRtl = lang === 'ar';
  const listRef = useRef<HTMLUListElement>(null);

  // Magnification that follows the finger / pointer across the dock (macOS style):
  // each icon scales by its distance from the pointer. Pure CSS variable, no re-render.
  const magnify = (clientX: number | null) => {
    const list = listRef.current;
    if (!list) return;
    list.querySelectorAll<HTMLElement>('.tablet-dock__item').forEach((el) => {
      if (clientX === null) {
        el.style.removeProperty('--mag');
        return;
      }
      const r = el.getBoundingClientRect();
      const d = Math.abs(clientX - (r.left + r.width / 2));
      const mag = Math.max(0, 1 - d / 150);
      el.style.setProperty('--mag', mag.toFixed(3));
    });
  };

  return (
    <nav
      className="tablet-dock"
      aria-label={isRtl ? 'التنقل الرئيسي' : 'Main navigation'}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <ul
        ref={listRef}
        className="tablet-dock__list"
        onPointerMove={(e) => magnify(e.clientX)}
        onPointerDown={(e) => magnify(e.clientX)}
        onPointerLeave={() => magnify(null)}
        onPointerUp={(e) => { if (e.pointerType !== 'mouse') magnify(null); }}
        onPointerCancel={() => magnify(null)}
      >
        {items.map((item, i) => {
          const Icon = ICONS[i] || Home;
          const isActive = i === activeIndex;
          return (
            <li key={item.href} className="tablet-dock__item">
              <Link
                href={item.href}
                prefetch={true}
                className={`tablet-dock__link ${isActive ? 'is-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
                onPointerDown={() => router.prefetch(item.href)}
              >
                <span className="tablet-dock__icon" aria-hidden="true">
                  <Icon size={21} strokeWidth={isActive ? 2.3 : 1.9} />
                </span>
                <span className="tablet-dock__label">{item.label}</span>
                <span className="tablet-dock__dot" aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default TabletDock;
