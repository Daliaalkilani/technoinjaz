'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
  socials?: {
    linkedin?: string;
    github?: string;
    email?: string;
    facebook?: string;
  };
  email?: string;
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
  const [isPaused, setIsPaused] = useState(false);

  // Normalize members list with bilingual fields
  const displayMembers = members.map((m, idx) => ({
    ...m,
    displayName: lang === 'en' ? (m.nameEn || m.name) : m.name,
    displayRole: lang === 'en' ? (m.roleEn || m.role) : m.role,
    displaySpec: lang === 'en' ? (m.specializationEn || m.specialization || '') : (m.specialization || ''),
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

  // Automatic Gentle Carousel Slide (every 4.2 seconds when not interacting)
  useEffect(() => {
    if (isPaused || count <= 1) return;

    const timer = setInterval(() => {
      const s = stateRef.current;
      if (!s.isDragging && !s.active && performance.now() - s.lastInput > 3000) {
        s.base += 1;
        s.target = s.base;
      }
    }, 4200);

    return () => clearInterval(timer);
  }, [isPaused, count]);

  // Main 3D Animation Render Loop (Softened & Smooth Physics)
  useEffect(() => {
    if (typeof window === 'undefined' || count === 0) return;

    let animId: number;
    let previousTime = performance.now();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = (time: number) => {
      const deltaTime = Math.min(32, time - previousTime);
      previousTime = time;

      // Soft, fluid easing (no abrupt snapping)
      const ease = reducedMotion ? 1 : 1 - Math.pow(0.02, deltaTime / 1000);

      const s = stateRef.current;
      s.phase += (s.target - s.phase) * ease;

      const currentActive = nearestIndex(s.phase, count);
      setActiveIndex(currentActive);

      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;
      const compact = winWidth < 650;

      // Wide, fanned-out horizontal spacing across the screen
      const horizontalSpacing = Math.min(270, Math.max(165, winWidth * 0.17));
      const verticalSpacing = Math.min(135, Math.max(90, winHeight * 0.12));

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const delta = wrappedDelta(index, s.phase, count);
        const distance = Math.abs(delta);
        const focus = Math.exp(-distance * distance * 1.35);
        const side = Math.max(0, 1 - distance / 4.5);
        const direction = Math.sign(delta);

        const x = compact
          ? delta * 24 + Math.sin(delta * 0.9) * 25
          : delta * horizontalSpacing;
        const y = compact
          ? delta * verticalSpacing
          : distance * 6 + s.pointerY * focus * 8;
        const z = focus * 120 - distance * 110;

        // Comfortable scale so non-focused cards remain legible and elegant
        const scale = compact
          ? 0.72 + side * 0.1 + focus * 0.18
          : 0.76 + side * 0.1 + focus * 0.14;

        // Gentle, soft rotation angles (much less sharp)
        const rotateX = compact ? delta * 1.6 : -s.pointerY * focus * 1.8;
        const rotateY = compact
          ? -delta * 4
          : -direction * Math.min(distance * 4.5, 10) + s.pointerX * focus * 2;
        const rotateZ = compact ? delta * -1.0 : delta * 0.25;

        card.style.setProperty('--focus', focus.toFixed(4));
        card.style.zIndex = String(Math.round(1000 - distance * 100));
        card.style.opacity = String(Math.max(0.18, side * 0.78 + focus * 0.22));
        card.style.filter = `blur(${Math.max(0, distance - 1.8) * 0.3}px)`;
        card.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) rotateZ(${rotateZ.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
        card.setAttribute('aria-current', index === currentActive ? 'true' : 'false');
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [count, wrappedDelta, nearestIndex]);

  // Stage Pointer & Hover Tilt (Soft)
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
    };

    const handlePointerLeave = () => {
      const s = stateRef.current;
      if (s.isDragging) return;
      s.pointerX = 0;
      s.pointerY = 0;
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
      if ((e.target as HTMLElement).closest('.filmstrip-nav-pill, .filmstrip-contact-btn, .filmstrip-join-btn')) return;

      const s = stateRef.current;
      s.isDragging = true;
      s.hasDragged = false;
      s.dragStartX = e.clientX;
      s.dragStartY = e.clientY;
      s.dragStartBase = s.base;
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
      const dragSensitivity = isCompact ? 110 : 200;
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

      // Snap base to nearest index smoothly
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
      s.lastInput = performance.now();
    };

    stage.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      stage.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Card Click / Hover Handler
  const handleCardClick = (index: number, member: typeof displayMembers[0]) => {
    const s = stateRef.current;
    if (s.hasDragged) return;

    const delta = wrappedDelta(index, s.phase, count);
    if (Math.abs(delta) > 0.3) {
      moveTo(index);
    } else {
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
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h2 className="sr-only">فريق العمل الهندسي</h2>
      <p className="sr-only">اسحب أو حرك العجلة أو مرر المؤشر لتصفح أعضاء الفريق.</p>

      {/* 3D Cards Deck */}
      <div className="filmstrip-deck" id="filmstrip-deck" data-testid="filmstrip">
        {displayMembers.map((member, index) => {
          const socials = member.socials || {};
          const isRealMember = !member.isPlaceholder && member.id && !member.id.startsWith('team-slot');

          return (
            <button
              key={member.id || index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="filmstrip-card"
              type="button"
              data-index={index}
              onClick={() => handleCardClick(index, member)}
              onMouseEnter={() => moveTo(index)}
              onFocus={() => moveTo(index)}
              aria-label={`${member.displayName} — ${member.displayRole}`}
            >
              {/* Top Bar inside Card: Specialization Badge + Index Circle */}
              <div className="filmstrip-top-bar">
                {member.displaySpec && (
                  <span className="filmstrip-badge">
                    {member.displaySpec}
                  </span>
                )}
                <span className="filmstrip-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Portrait Image Frame */}
              <div className="filmstrip-portrait">
                <img
                  src={member.displayImage}
                  alt={member.displayName}
                  loading={index < 4 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>

              {/* Glassmorphic Footer with Bio & Contacts */}
              <div className="filmstrip-footer">
                <div className="filmstrip-meta">
                  <span className="filmstrip-name">{member.displayName}</span>
                  <span className="filmstrip-role">{member.displayRole}</span>
                </div>

                {/* Direct Contact & Social Links */}
                {isRealMember ? (
                  <div className="filmstrip-contacts" onClick={(e) => e.stopPropagation()}>
                    {socials.linkedin && (
                      <a
                        href={socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="filmstrip-contact-btn"
                        title="LinkedIn"
                        aria-label="LinkedIn Profile"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    )}
                    {socials.github && (
                      <a
                        href={socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="filmstrip-contact-btn"
                        title="GitHub"
                        aria-label="GitHub Profile"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    )}
                    {(socials.email || member.email) && (
                      <a
                        href={`mailto:${socials.email || member.email}`}
                        className="filmstrip-contact-btn"
                        title="Email"
                        aria-label="Send Email"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </a>
                    )}
                    {socials.facebook && (
                      <a
                        href={socials.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="filmstrip-contact-btn"
                        title="Facebook"
                        aria-label="Facebook Profile"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                        </svg>
                      </a>
                    )}
                    {/* View Profile Arrow */}
                    <span
                      className="filmstrip-contact-btn"
                      title={lang === 'ar' ? 'عرض الملف الشخصي' : 'View Profile'}
                      style={{ marginRight: 'auto' }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points={lang === 'ar' ? '17 17 17 7 7 7' : '7 7 17 7 17 17'} />
                      </svg>
                    </span>
                  </div>
                ) : (
                  <div className="filmstrip-contacts" onClick={(e) => e.stopPropagation()}>
                    <Link href="/contact" className="filmstrip-join-btn">
                      <span>{lang === 'ar' ? 'انضم إلى الفريق' : 'Join Our Team'}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points={lang === 'ar' ? '12 5 5 12 12 19' : '12 5 19 12 12 19'} />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Floating Control Pill */}
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
