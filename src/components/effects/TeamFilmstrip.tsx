'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useThemeLanguage } from '@/context/ThemeLanguageContext';
import { teamCircleSlots } from '@/data/teamData';
import './TeamFilmstrip.css';

export interface TeamMemberItem {
  id: string;
  name: string;
  nameEn?: string;
  role: string;
  roleEn?: string;
  specialization?: string;
  specializationEn?: string;
  image?: string;
  avatar?: string;
  bio?: string;
  bioEn?: string;
  isPlaceholder?: boolean;
  link?: string;
}

export interface TeamFilmstripProps {
  members?: TeamMemberItem[];
}

export default function TeamFilmstrip({ members = teamCircleSlots }: TeamFilmstripProps) {
  const router = useRouter();
  const { lang, theme } = useThemeLanguage();

  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Normalize members list with bilingual fields
  const displayMembers = members.map((m, idx) => ({
    ...m,
    displayName: lang === 'en' ? (m.nameEn || m.name) : m.name,
    displayRole: lang === 'en' ? (m.roleEn || m.role) : m.role,
    displayImage: m.image || m.avatar || '/images/team/team-placeholder.png',
  }));

  const count = displayMembers.length;

  // Animation & Interaction State
  const stateRef = useRef({
    phase: 0,
    target: 0,
    base: 0,
    pointerX: 0,
    pointerY: 0,
    active: false,
    lastInput: typeof performance !== 'undefined' ? performance.now() : 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    dragStartBase: 0,
    hasDragged: false,
  });

  const wrappedDelta = useCallback((index: number, phase: number, total: number) => {
    let delta = index - phase;
    while (delta > total / 2) delta -= total;
    while (delta < -total / 2) delta += total;
    return delta;
  }, []);

  const nearestIndex = useCallback((phase: number, total: number) => {
    return ((Math.round(phase) % total) + total) % total;
  }, []);

  const moveTo = useCallback((index: number) => {
    const s = stateRef.current;
    const current = nearestIndex(s.phase, count);
    let delta = index - current;
    if (delta > count / 2) delta -= count;
    if (delta < -count / 2) delta += count;
    s.base += delta;
    s.target = s.base;
    s.active = false;
    s.lastInput = performance.now();
  }, [count, nearestIndex]);

  // Main 3D Animation Render Loop
  useEffect(() => {
    if (typeof window === 'undefined' || count === 0) return;

    let animId: number;
    let previousTime = performance.now();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = (time: number) => {
      const deltaTime = Math.min(32, time - previousTime);
      previousTime = time;
      const ease = reducedMotion ? 1 : 1 - Math.pow(0.001, deltaTime / 1000);

      const s = stateRef.current;

      // Gentle floating drift when untouched for 3.6 seconds
      if (!s.active && !s.isDragging && time - s.lastInput > 3600) {
        const idle = time - s.lastInput - 3600;
        s.target = s.base + Math.sin(idle * 0.00042) * 2.45;
      }

      s.phase += (s.target - s.phase) * ease;
      const currentActive = nearestIndex(s.phase, count);
      setActiveIndex(currentActive);

      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;
      const compact = winWidth < 650;
      const horizontalSpacing = Math.min(185, Math.max(120, winWidth * 0.12));
      const verticalSpacing = Math.min(130, Math.max(90, winHeight * 0.115));

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const delta = wrappedDelta(index, s.phase, count);
        const distance = Math.abs(delta);
        const focus = Math.exp(-distance * distance * 1.28);
        const side = Math.max(0, 1 - distance / 5);
        const direction = Math.sign(delta);

        const x = compact
          ? delta * 24 + Math.sin(delta * 0.9) * 25
          : delta * horizontalSpacing;
        const y = compact
          ? delta * verticalSpacing
          : distance * 8 + s.pointerY * focus * 10;
        const z = focus * 145 - distance * 148;
        const scale = 0.54 + side * 0.15 + focus * 0.54;

        const rotateX = compact ? delta * 2.1 : -s.pointerY * focus * 3.5;
        const rotateY = compact
          ? -delta * 5
          : -direction * (distance > 0.2 ? 14 + Math.min(distance, 3) * 5 : 0) + s.pointerX * focus * 3;
        const rotateZ = compact ? delta * -1.4 : delta * 0.7;

        card.style.setProperty('--focus', focus.toFixed(4));
        card.style.zIndex = String(Math.round(1000 - distance * 100));
        card.style.opacity = String(Math.max(0.12, side * 0.76 + focus * 0.24));
        card.style.filter = `blur(${Math.max(0, distance - 1.5) * 0.38}px)`;
        card.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) rotateZ(${rotateZ.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
        card.setAttribute('aria-current', index === currentActive ? 'true' : 'false');
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [count, wrappedDelta, nearestIndex]);

  // Stage Pointer & Hover Tilt
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handlePointerMove = (e: PointerEvent) => {
      const s = stateRef.current;
      if (s.isDragging) return;

      const rect = stage.getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2));
      const ny = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height - 0.5) * 2));
      s.pointerX = nx;
      s.pointerY = ny;
      s.active = true;
      s.target = s.base + (window.innerWidth < 650 ? ny * 2.2 : nx * 3.1);
      s.lastInput = performance.now();
      stage.style.setProperty('--pointer-x', `${(nx + 1) * 50}%`);
    };

    const handlePointerLeave = () => {
      const s = stateRef.current;
      if (s.isDragging) return;
      s.active = false;
      s.pointerX = 0;
      s.pointerY = 0;
      s.target = s.base;
      stage.style.setProperty('--pointer-x', '50%');
    };

    stage.addEventListener('pointermove', handlePointerMove);
    stage.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      stage.removeEventListener('pointermove', handlePointerMove);
      stage.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  // Drag & Swipe Interaction (Mouse + Touch)
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onPointerDown = (e: PointerEvent) => {
      // Don't drag if clicking buttons on nav pill
      if ((e.target as HTMLElement).closest('.filmstrip-nav-pill')) return;

      const s = stateRef.current;
      s.isDragging = true;
      s.hasDragged = false;
      s.dragStartX = e.clientX;
      s.dragStartY = e.clientY;
      s.dragStartBase = s.base;
      s.active = false;
      s.lastInput = performance.now();
      stage.classList.add('is-dragging');

      try {
        stage.setPointerCapture(e.pointerId);
      } catch (_) {}
    };

    const onPointerMove = (e: PointerEvent) => {
      const s = stateRef.current;
      if (!s.isDragging) return;

      const deltaX = e.clientX - s.dragStartX;
      const deltaY = e.clientY - s.dragStartY;

      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        s.hasDragged = true;
      }

      const isCompact = window.innerWidth < 650;
      const dragSensitivity = isCompact ? 100 : 180;
      const dragShift = -deltaX / dragSensitivity;

      s.target = s.dragStartBase + dragShift;
      s.lastInput = performance.now();
    };

    const onPointerUp = (e: PointerEvent) => {
      const s = stateRef.current;
      if (!s.isDragging) return;

      s.isDragging = false;
      stage.classList.remove('is-dragging');

      try {
        stage.releasePointerCapture(e.pointerId);
      } catch (_) {}

      // Snap base to nearest index
      s.base = Math.round(s.target);
      s.target = s.base;
      s.lastInput = performance.now();
    };

    stage.addEventListener('pointerdown', onPointerDown);
    stage.addEventListener('pointermove', onPointerMove);
    stage.addEventListener('pointerup', onPointerUp);
    stage.addEventListener('pointercancel', onPointerUp);

    return () => {
      stage.removeEventListener('pointerdown', onPointerDown);
      stage.removeEventListener('pointermove', onPointerMove);
      stage.removeEventListener('pointerup', onPointerUp);
      stage.removeEventListener('pointercancel', onPointerUp);
    };
  }, []);

  // Wheel and Keyboard Navigation
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const s = stateRef.current;
      const direction = Math.sign(Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX);
      if (!direction) return;

      s.base += direction;
      s.target = s.base;
      s.active = false;
      s.lastInput = performance.now();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const forward = e.key === 'ArrowRight' || e.key === 'ArrowDown';
      const backward = e.key === 'ArrowLeft' || e.key === 'ArrowUp';
      if (!forward && !backward) return;

      e.preventDefault();
      const s = stateRef.current;
      s.base += forward ? 1 : -1;
      s.target = s.base;
      s.active = false;
      s.lastInput = performance.now();
    };

    stage.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      stage.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Card Click: Center if away, open member profile if active
  const handleCardClick = (index: number, member: typeof displayMembers[0]) => {
    const s = stateRef.current;
    if (s.hasDragged) return; // Prevent triggering click after drag

    const current = nearestIndex(s.phase, count);
    const delta = wrappedDelta(index, s.phase, count);

    if (Math.abs(delta) > 0.35) {
      // Focus/Center card
      moveTo(index);
    } else {
      // Clicked on active card: Navigate if real member
      if (!member.isPlaceholder && member.id && !member.id.startsWith('team-slot')) {
        router.push(`/team/${member.id}`);
      }
    }
  };

  return (
    <section
      ref={stageRef}
      className="filmstrip-stage"
      id="filmstrip-stage"
      aria-label="Interactive Team Character Filmstrip"
      data-theme={theme}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <h2 className="sr-only">فريق العمل الهندسي — Character Filmstrip</h2>
      <p className="sr-only">اسحب أو حرك العجلة أو استخدم الأسهم لتصفح أعضاء الفريق.</p>

      {/* 3D Cards Deck */}
      <div className="filmstrip-deck" id="filmstrip-deck" data-testid="filmstrip">
        {displayMembers.map((member, index) => (
          <button
            key={member.id || index}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="filmstrip-card"
            type="button"
            data-index={index}
            onClick={() => handleCardClick(index, member)}
            aria-label={`${member.displayName} — ${member.displayRole}`}
          >
            {/* Portrait Image Frame */}
            <span className="filmstrip-portrait">
              <img
                src={member.displayImage}
                alt={member.displayName}
                loading={index < 4 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </span>

            {/* Glassmorphic Footer */}
            <span className="filmstrip-footer">
              <span className="filmstrip-index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="filmstrip-meta">
                <span className="filmstrip-name">{member.displayName}</span>
                <span className="filmstrip-role">{member.displayRole}</span>
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Interactive Floating Control Pill */}
      <div className="filmstrip-nav-pill">
        <button
          type="button"
          onClick={() => {
            const s = stateRef.current;
            s.base -= 1;
            s.target = s.base;
            s.lastInput = performance.now();
          }}
          aria-label={lang === 'ar' ? 'السابق' : 'Previous'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points={lang === 'ar' ? '9 18 15 12 9 6' : '15 18 9 12 15 6'} />
          </svg>
        </button>

        {/* Indicator dots */}
        <div className="filmstrip-dots">
          {displayMembers.map((_, i) => (
            <span
              key={i}
              className={`filmstrip-dot ${i === activeIndex ? 'is-active' : ''}`}
              onClick={() => moveTo(i)}
              role="button"
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            const s = stateRef.current;
            s.base += 1;
            s.target = s.base;
            s.lastInput = performance.now();
          }}
          aria-label={lang === 'ar' ? 'التالي' : 'Next'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points={lang === 'ar' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} />
          </svg>
        </button>
      </div>
    </section>
  );
}
