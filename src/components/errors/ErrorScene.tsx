'use client';

import React, { useId, useMemo } from 'react';
import './ErrorScene.css';

/**
 * Illustrated scenes for the special-state pages. The hero is always the Techno Enjaz
 * logo (the faceted "A" + its accent circle) drawn as live SVG — the same "ship" that
 * launches in the site loader — so every state tells a small brand story:
 *   notfound  : the ship drifted off its orbit around the "0" planet of 404
 *   server    : engine failure on the launch pad, smoke + sparks, server rack blinking
 *   offline   : ground station ship whose signal to the satellite is cut mid-way
 *   forbidden : the accent circle turns into a padlock behind a hexagonal force field
 * Pure SVG + CSS animations (ErrorScene.css), theme-aware, scales to any width,
 * and fully static under prefers-reduced-motion.
 */

export type ErrorSceneVariant = 'notfound' | 'server' | 'offline' | 'forbidden';

/* ---------- The logo (483 × 517 units) ---------- */
function Logo({ ids, locked = false }: { ids: Ids; locked?: boolean }) {
  return (
    <g className="es-logo">
      <polygon points="241,0 357,200 302,305 240,204 181,305 124,204" fill={`url(#${ids.body})`} />
      <polygon points="119,210 175,311 58,517 0,415" fill={`url(#${ids.body})`} />
      <polygon points="364,210 483,415 424,517 307,311" fill={`url(#${ids.body})`} />
      {/* facet shading */}
      <polygon points="124,204 150,206 181,305" fill={`url(#${ids.facet})`} opacity="0.55" />
      <polygon points="357,200 330,206 302,305" fill={`url(#${ids.facet})`} opacity="0.55" />
      <polygon points="0,415 22,380 58,517" fill={`url(#${ids.facet})`} opacity="0.5" />
      <polygon points="483,415 460,450 424,517" fill={`url(#${ids.facet})`} opacity="0.5" />
      {locked ? (
        <g className="es-lock">
          <path
            className="es-lock-shackle"
            d="M200 420 v-34 a37 37 0 0 1 74 0 v34"
            fill="none"
            stroke={`url(#${ids.ring})`}
            strokeWidth="14"
            strokeLinecap="round"
          />
          <rect x="176" y="404" width="122" height="96" rx="22" fill={`url(#${ids.circle})`} stroke={`url(#${ids.ring})`} strokeWidth="6" />
          <circle cx="237" cy="443" r="12" fill="#0b1220" />
          <rect x="232" y="448" width="10" height="26" rx="5" fill="#0b1220" />
        </g>
      ) : (
        <g className="es-dot">
          <circle cx="237" cy="430" r="56" fill={`url(#${ids.ring})`} />
          <circle cx="237" cy="430" r="49" fill={`url(#${ids.circle})`} />
        </g>
      )}
    </g>
  );
}

type Ids = { body: string; facet: string; circle: string; ring: string; glow: string; planet: string; beam: string; clip: string };

function Defs({ ids }: { ids: Ids }) {
  return (
    <defs>
      <linearGradient id={ids.body} x1="0" y1="0" x2="0" y2="517" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#0AEEC3" />
        <stop offset="0.25" stopColor="#1AD3C1" />
        <stop offset="0.5" stopColor="#26BFBE" />
        <stop offset="0.75" stopColor="#3A9DBF" />
        <stop offset="1" stopColor="#4E7FBD" />
      </linearGradient>
      <linearGradient id={ids.facet} x1="0" y1="0" x2="0.5" y2="0.87">
        <stop offset="0" stopColor="#4193BD" />
        <stop offset="1" stopColor="#5A6CBC" />
      </linearGradient>
      <linearGradient id={ids.circle} x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#5D54F2" />
        <stop offset="1" stopColor="#14BCA3" />
      </linearGradient>
      <linearGradient id={ids.ring} x1="1" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#5361E8" />
        <stop offset="1" stopColor="#15BAA5" />
      </linearGradient>
      <radialGradient id={ids.glow}>
        <stop offset="0" stopColor="#26BFBE" stopOpacity="0.45" />
        <stop offset="1" stopColor="#26BFBE" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={ids.planet} cx="0.35" cy="0.3" r="0.8">
        <stop offset="0" stopColor="#14BCA3" />
        <stop offset="0.55" stopColor="#3A6FD8" />
        <stop offset="1" stopColor="#5D54F2" />
      </radialGradient>
      <linearGradient id={ids.beam} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0AEEC3" stopOpacity="0" />
        <stop offset="0.5" stopColor="#0AEEC3" stopOpacity="0.55" />
        <stop offset="1" stopColor="#0AEEC3" stopOpacity="0" />
      </linearGradient>
    </defs>
  );
}

/* Deterministic star field (same on server and client) */
function useStars(count: number, seed: number) {
  return useMemo(() => {
    let s = seed;
    const rnd = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    return Array.from({ length: count }, (_, i) => ({
      x: Math.round(rnd() * 520),
      y: Math.round(rnd() * 420),
      r: +(0.6 + rnd() * 1.6).toFixed(2),
      d: +(rnd() * 4).toFixed(2),
      k: i % 3
    }));
  }, [count, seed]);
}

function Stars({ seed }: { seed: number }) {
  const stars = useStars(46, seed);
  return (
    <g className="es-stars">
      {stars.map((st, i) => (
        <circle key={i} className={`es-star es-star--${st.k}`} cx={st.x} cy={st.y} r={st.r} style={{ animationDelay: `${st.d}s` }} />
      ))}
    </g>
  );
}

/* ---------- Scenes ---------- */
function NotFoundScene({ ids }: { ids: Ids }) {
  return (
    <>
      <Stars seed={7} />
      {/* 4 [planet] 4 */}
      <text className="es-bigdigit" x="92" y="262" textAnchor="middle">4</text>
      <text className="es-bigdigit" x="428" y="262" textAnchor="middle">4</text>
      <g className="es-planet-wrap">
        <circle cx="260" cy="210" r="96" fill={`url(#${ids.glow})`} />
        <ellipse className="es-orbit es-orbit--back" cx="260" cy="210" rx="118" ry="34" transform="rotate(-14 260 210)" />
        <circle cx="260" cy="210" r="62" fill={`url(#${ids.planet})`} />
        <circle cx="238" cy="190" r="11" className="es-crater" />
        <circle cx="282" cy="232" r="7" className="es-crater" />
        <circle cx="276" cy="186" r="4.5" className="es-crater" />
        <path className="es-orbit es-orbit--front" d="M142 239 A118 34 -14 0 0 378 181" transform="rotate(0)" />
      </g>
      {/* drifting trajectory and the lost ship */}
      <path className="es-trail" d="M372 186 C 402 150, 410 112, 440 80" />
      <g className="es-ship es-ship--drift">
        <g transform="translate(424 34) rotate(24) scale(0.11)">
          <Logo ids={ids} />
        </g>
        <g className="es-ping" transform="translate(470 40)">
          <circle r="16" />
          <text y="6" textAnchor="middle">?</text>
        </g>
      </g>
    </>
  );
}

function ServerScene({ ids }: { ids: Ids }) {
  return (
    <>
      <Stars seed={21} />
      <text className="es-bigdigit es-bigdigit--bg" x="260" y="150" textAnchor="middle">500</text>
      {/* server rack */}
      <g className="es-rack" transform="translate(352 150)">
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(0 ${i * 46})`}>
            <rect width="124" height="38" rx="8" className="es-rack-unit" />
            <rect x="12" y="15" width="56" height="4" rx="2" className="es-rack-slot" />
            <rect x="12" y="23" width="40" height="4" rx="2" className="es-rack-slot" />
            <circle cx="92" cy="19" r="4" className={`es-led es-led--${i === 1 ? 'red' : i === 2 ? 'amber' : 'green'}`} style={{ animationDelay: `${i * 0.35}s` }} />
            <circle cx="106" cy="19" r="4" className={`es-led es-led--${i === 1 ? 'red' : 'green'}`} style={{ animationDelay: `${i * 0.5 + 0.2}s` }} />
          </g>
        ))}
      </g>
      {/* launch pad */}
      <g className="es-pad">
        <rect x="60" y="356" width="240" height="14" rx="7" />
        <rect x="96" y="370" width="168" height="10" rx="5" className="es-pad-base" />
        <path d="M84 356 l-14 -36 M276 356 l14 -36" className="es-pad-arm" />
      </g>
      {/* smoke */}
      <g className="es-smoke">
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={150 + i * 16} cy="344" r={14 + (i % 2) * 6} style={{ animationDelay: `${i * 0.55}s` }} />
        ))}
      </g>
      {/* the ship, wobbling */}
      <g className="es-ship es-ship--wobble">
        <g transform="translate(118 120) scale(0.46)">
          <Logo ids={ids} />
        </g>
      </g>
      {/* sparks */}
      <g className="es-sparks">
        <path d="M118 318 l-14 -8 M124 300 l-16 -2 M300 312 l14 -10 M292 296 l18 -2" />
      </g>
      {/* warning */}
      <g className="es-warning" transform="translate(318 74)">
        <path d="M0 -26 L26 20 H-26 Z" />
        <text y="13" textAnchor="middle">!</text>
      </g>
    </>
  );
}

function OfflineScene({ ids }: { ids: Ids }) {
  return (
    <>
      <Stars seed={42} />
      {/* horizon */}
      <path className="es-horizon" d="M-20 390 Q 260 300 540 390 V 440 H -20 Z" />
      {/* station ship */}
      <g className="es-ship">
        <g transform="translate(40 216) scale(0.27)">
          <Logo ids={ids} />
        </g>
      </g>
      {/* outgoing waves */}
      <g className="es-waves" transform="translate(172 214)">
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${18 + i * 18} -${26 + i * 16} A ${34 + i * 22} ${34 + i * 22} 0 0 1 ${18 + i * 18} ${26 + i * 16}`} style={{ animationDelay: `${i * 0.45}s` }} />
        ))}
      </g>
      {/* broken signal line */}
      <path className="es-signal" d="M210 196 C 250 150, 290 128, 318 118" />
      <path className="es-signal es-signal--far" d="M356 104 C 380 96, 402 90, 420 86" />
      <g className="es-break" transform="translate(337 111)">
        <path d="M-10 -12 L10 12 M10 -12 L-10 12" />
        <circle r="20" className="es-break-glow" />
      </g>
      {/* satellite */}
      <g className="es-satellite" transform="translate(452 76)">
        <g className="es-satellite-body">
          <rect x="-46" y="-12" width="30" height="24" rx="3" className="es-panel" />
          <rect x="16" y="-12" width="30" height="24" rx="3" className="es-panel" />
          <path d="M-46 0 H46" className="es-panel-line" />
          <rect x="-14" y="-16" width="28" height="32" rx="7" className="es-sat-core" />
          <path d="M0 16 v10" className="es-panel-line" />
          <circle cy="30" r="5" className="es-sat-dish" />
        </g>
      </g>
    </>
  );
}

function ForbiddenScene({ ids }: { ids: Ids }) {
  const hex = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join(' ');
  const cells: [number, number][] = [];
  for (let row = -4; row <= 4; row++) {
    for (let col = -5; col <= 5; col++) {
      cells.push([260 + col * 30 + (row % 2 ? 15 : 0), 210 + row * 26]);
    }
  }
  return (
    <>
      <Stars seed={99} />
      <text className="es-bigdigit es-bigdigit--bg" x="260" y="400" textAnchor="middle">403</text>
      <clipPath id={ids.clip}>
        <polygon points={hex(260, 210, 168)} />
      </clipPath>
      <g clipPath={`url(#${ids.clip})`}>
        <g className="es-hexgrid">
          {cells.map(([x, y], i) => (
            <polygon key={i} points={hex(x, y, 14)} style={{ animationDelay: `${((x + y) % 7) * 0.3}s` }} />
          ))}
        </g>
        <rect className="es-scan" x="80" y="20" width="360" height="70" fill={`url(#${ids.beam})`} />
      </g>
      <polygon className="es-shield es-shield--outer" points={hex(260, 210, 168)} />
      <polygon className="es-shield es-shield--inner" points={hex(260, 210, 150)} />
      <g className="es-ship es-ship--hover">
        <g transform="translate(184 128) scale(0.315)">
          <Logo ids={ids} locked />
        </g>
      </g>
    </>
  );
}

export function ErrorScene({ variant, label }: { variant: ErrorSceneVariant; label: string }) {
  const uid = useId().replace(/[:«»]/g, '');
  const ids: Ids = {
    body: `es-body-${uid}`,
    facet: `es-facet-${uid}`,
    circle: `es-circle-${uid}`,
    ring: `es-ring-${uid}`,
    glow: `es-glow-${uid}`,
    planet: `es-planet-${uid}`,
    beam: `es-beam-${uid}`,
    clip: `es-clip-${uid}`
  };
  return (
    <div className={`error-scene error-scene--${variant}`}>
      <svg viewBox="0 0 520 420" role="img" aria-label={label} preserveAspectRatio="xMidYMid meet">
        <Defs ids={ids} />
        {variant === 'notfound' && <NotFoundScene ids={ids} />}
        {variant === 'server' && <ServerScene ids={ids} />}
        {variant === 'offline' && <OfflineScene ids={ids} />}
        {variant === 'forbidden' && <ForbiddenScene ids={ids} />}
      </svg>
    </div>
  );
}

export default ErrorScene;
