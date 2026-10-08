'use client';

import React, { useEffect, useId, useState } from 'react';
import { ChevronDown, ListOrdered } from 'lucide-react';
import './TableOfContents.css';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
  title: string;
  countLabel?: string;
  /** `card`: sticky sidebar card (≥1024px). `accordion`: collapsible block in the content column (<1024px). */
  variant: 'card' | 'accordion';
}

function useActiveHeading(items: TocItem[]) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: '-110px 0px -65% 0px', threshold: 0 }
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return [activeId, setActiveId] as const;
}

export default function TableOfContents({ items, title, variant }: TableOfContentsProps) {
  const [activeId, setActiveId] = useActiveHeading(items);
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  if (items.length === 0) return null;

  const handleClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // iOS Safari cancels an in-flight smooth scroll when replaceState fires — delaying it
    // fixes the "first TOC click scrolls to top" bug.
    window.setTimeout(() => window.history.replaceState(null, '', `#${id}`), 900);
    // On phones the accordion sits ABOVE the article: collapsing it mid-scroll shrinks
    // the page and shifts the target up ~300px, landing past the heading. Close only
    // after the smooth scroll has settled (duration matches the replaceState delay).
    if (variant === 'accordion') window.setTimeout(() => setIsOpen(false), 900);
  };

  const list = (
    <ul className="te-toc__list">
      {items.map((item) => (
        <li
          key={item.id}
          className={`te-toc__item te-toc__item--level-${item.level}${activeId === item.id ? ' is-active' : ''}`}
        >
          <a
            href={`#${item.id}`}
            onClick={(e) => handleClick(item.id, e)}
            className="te-toc__link"
            title={item.text}
            aria-current={activeId === item.id ? 'location' : undefined}
          >
            <span className="te-toc__dot" aria-hidden="true" />
            <span className="te-toc__text">{item.text}</span>
          </a>
        </li>
      ))}
    </ul>
  );

  if (variant === 'accordion') {
    return (
      <nav className="te-toc te-toc--accordion" aria-label={title}>
        <button
          type="button"
          className="te-toc__toggle"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((v) => !v)}
        >
          <span className="te-toc__title-wrap">
            <ListOrdered size={18} className="te-toc__icon" aria-hidden="true" />
            <span className="te-toc__title">{title}</span>
          </span>
          <ChevronDown size={18} className="te-toc__chevron" aria-hidden="true" />
        </button>
        <div id={panelId} className="te-toc__panel" hidden={!isOpen}>
          {list}
        </div>
      </nav>
    );
  }

  return (
    <nav className="te-toc te-toc--card" aria-label={title}>
      <div className="te-toc__header">
        <span className="te-toc__title-wrap">
          <ListOrdered size={18} className="te-toc__icon" aria-hidden="true" />
          <span className="te-toc__title">{title}</span>
        </span>
      </div>
      <div className="te-toc__scroll">{list}</div>
    </nav>
  );
}
