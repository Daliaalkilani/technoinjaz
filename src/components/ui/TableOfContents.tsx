'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
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
  const scrollRef = useRef<HTMLDivElement>(null);

  // Card variant: keep the heading being read visible inside the (scrollable) TOC box.
  // Only the box scrolls — never the page.
  useEffect(() => {
    const box = scrollRef.current;
    if (!box || !activeId) return;
    const link = box.querySelector<HTMLElement>(`a[href="#${CSS.escape(activeId)}"]`);
    if (!link) return;
    const top = link.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop;
    if (top < box.scrollTop || top + link.offsetHeight > box.scrollTop + box.clientHeight) {
      box.scrollTo({ top: Math.max(0, top - box.clientHeight / 3), behavior: 'smooth' });
    }
  }, [activeId]);

  if (items.length === 0) return null;

  const handleClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveId(id);
    const go = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (variant === 'accordion') {
      // On phones the accordion sits ABOVE the article: collapse it first and scroll once
      // the page has reflowed, so the target is measured at its final position.
      setIsOpen(false);
      requestAnimationFrame(() => requestAnimationFrame(go));
    } else {
      go();
    }
    // Put the hash in the URL once the smooth scroll has settled (iOS Safari cancels an
    // in-flight smooth scroll on replaceState). Keep Next.js's own history.state: a
    // null state makes the App Router treat it as a fresh entry and jump to the top —
    // the "first TOC click goes to the top of the page" bug after client navigation.
    window.setTimeout(() => window.history.replaceState(window.history.state, '', `#${id}`), 900);
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
      <div className="te-toc__scroll" ref={scrollRef}>{list}</div>
    </nav>
  );
}
