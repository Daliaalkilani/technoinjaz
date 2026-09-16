/*
 * TECHNO ENJAZ — Interactive rocket loader with smooth launch & fade-out.
 * Canvas particles + original artwork + CSS/JS flight. No external dependencies.
 * Public API: window.TechnoLoader.
 */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const setTxt = (id, val) => { const el = $(id); if (el) el.textContent = val; };
  const setHtml = (id, val) => { const el = $(id); if (el) el.innerHTML = val; };
  const setStyle = (id, prop, val) => { const el = $(id); if (el) el.style[prop] = val; };
  const setAttr = (id, attr, val) => { const el = $(id); if (el) el.setAttribute(attr, val); };
  const on = (idOrEl, ev, fn, opts) => {
    const el = typeof idOrEl === 'string' ? $(idOrEl) : idOrEl;
    if (el) el.addEventListener(ev, fn, opts);
  };

  const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
  const mix = (a, b, t) => a + (b - a) * t;
  const ease = t => 1 - Math.pow(1 - clamp(t), 3);
  const easeInOut = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const config = window.TECHNO_LOADER_CONFIG || {};
  const loaderEl = document.getElementById('te-loader');
  const canvas = $('space');
  const ctx = canvas ? canvas.getContext('2d', { alpha: true }) : null;
  const rocket = $('rocket');
  const launchButton = $('launch-button');
  const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const listeners = new AbortController();
  const listenerOptions = { signal: listeners.signal };

  let width = 0, height = 0, dpr = 1, anchor = null, stars = [], particles = [], waves = [], trail = [];
  let rafId = 0, lastFrame = performance.now(), hiddenAt = 0, lastClock = '', lastPaintedProgress = -1;
  let particleBudget = 340, emissionDebt = 0, arrivalPose = null, resetTimer = 0;
  let userMotionOverride = null;
  let fadeOutDone = false;

  const state = {
    phase: 'idle', active: false, progress: 0, indeterminate: false,
    demo: config.demo !== false, loop: false, duration: 4200, startedAt: 0, arrivalAt: 0,
    readyRequested: false, sound: false, calm: false,
    charge: 0, engine: 0, warp: 0, destroyed: false, runId: 0,
    pose: { x: 0, y: 0, s: 1, r: 0, opacity: 1 },
    restoreFocus: false
  };

  const publicState = () => ({
    phase: state.phase, active: state.active, progress: state.indeterminate ? null : state.progress,
    demo: state.demo, reducedMotion: state.calm, sound: state.sound, runId: state.runId
  });

  function emit(name, detail = {}) {
    window.dispatchEvent(new CustomEvent('techno:' + name, { detail: { ...publicState(), ...detail } }));
  }
  function announce(text) { setTxt('announcer', text); }

  function triggerFadeOut() {
    if (fadeOutDone) return;
    fadeOutDone = true;
    const el = document.getElementById('te-loader');
    if (el) {
      el.classList.add('te-fade-out');
      setTimeout(() => {
        el.style.display = 'none';
        destroy();
        emit('completed');
      }, 850);
    }
  }

  /* Sound synthesised locally and only enabled after user gesture */
  class SoundFX {
    constructor() { this.context = null; this.nodes = []; this.gain = null; this.tone = null; }
    init() {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return false;
      try {
        this.context ||= new AudioContext();
        if (this.context.state === 'suspended') this.context.resume().catch(() => {});
        return true;
      } catch (_) { return false; }
    }
    chirp(from = 390, to = 750, duration = .16, volume = .025) {
      if (!state.sound || !this.init()) return;
      const c = this.context, now = c.currentTime;
      const osc = c.createOscillator(), g = c.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(from, now);
      osc.frequency.exponentialRampToValueAtTime(to, now + duration);
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(volume, now + .02);
      g.gain.exponentialRampToValueAtTime(.0001, now + duration);
      osc.connect(g); g.connect(c.destination);
      osc.start(now); osc.stop(now + duration + .02);
    }
    start() {
      if (!state.sound || !this.init()) return;
      this.stop();
      const c = this.context, now = c.currentTime;
      const bufferSize = Math.floor(c.sampleRate * 1.5);
      const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (.02 * white)) / 1.02;
        lastOut = data[i];
      }
      const noise = c.createBufferSource();
      noise.buffer = buffer; noise.loop = true;
      const filter = c.createBiquadFilter();
      filter.type = 'lowpass'; filter.frequency.setValueAtTime(120, now);
      this.gain = c.createGain(); this.gain.gain.setValueAtTime(0, now);
      noise.connect(filter); filter.connect(this.gain); this.gain.connect(c.destination);
      noise.start(now);
      this.tone = c.createOscillator();
      const toneGain = c.createGain(); toneGain.gain.setValueAtTime(0, now);
      this.tone.type = 'triangle'; this.tone.frequency.setValueAtTime(65, now);
      this.tone.connect(toneGain); toneGain.connect(c.destination);
      this.tone.start(now);
      this.nodes.push(noise, filter, this.gain, this.tone, toneGain);
    }
    update(engine, charge) {
      if (!state.sound || !this.gain || !this.context) return;
      const now = this.context.currentTime;
      const targetGain = .003 + engine * .035 + charge * .007;
      this.gain.gain.setTargetAtTime(targetGain, now, .08);
    }
    stop() {
      for (const node of this.nodes) { try { if (node.stop) node.stop(); node.disconnect(); } catch (_) {} }
      this.nodes = []; this.gain = null; this.tone = null;
    }
    success() {
      this.stop();
      this.chirp(523.25, 523.25, .5, .014);
      this.chirp(659.25, 659.25, .65, .010);
      this.chirp(783.99, 783.99, .8, .009);
    }
    destroy() { this.stop(); if (this.context) this.context.close().catch(() => {}); }
  }
  const audio = new SoundFX();

  function setSound(enabled) {
    if (state.destroyed) return false;
    if (enabled && !audio.init()) {
      announce('المؤثرات الصوتية غير متاحة في هذا المتصفح.'); return false;
    }
    state.sound = Boolean(enabled);
    if (loaderEl) loaderEl.classList.toggle('sound-enabled', state.sound);
    if (state.sound && state.active) audio.start(); else audio.stop();
    if (state.sound && !state.active) audio.chirp(440, 660, .12, .012);
    return state.sound;
  }

  function setCalm(enabled, isUser = false) {
    state.calm = Boolean(enabled);
    if (isUser) userMotionOverride = state.calm;
    if (loaderEl) loaderEl.classList.toggle('calm', state.calm);
    if (state.calm) { particles = []; waves = []; trail = []; }
  }

  function resize() {
    if (state.destroyed) return;
    width = window.innerWidth; height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, width < 721 ? 1.5 : 2);
    if (canvas && ctx) {
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    const anchorEl = $('rocket-anchor') || $('stage');
    if (anchorEl) anchor = anchorEl.getBoundingClientRect();
    particleBudget = width < 721 ? 160 : 340;
    let seed = 41923;
    const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    stars = Array.from({ length: Math.round(clamp(width * height / 11500, 40, 150)) }, () => ({
      x: random() * width, y: random() * height, r: random() * .9 + .25,
      a: random() * .35 + .07, depth: random() * .8 + .2, twinkle: random() * 6.28
    }));
  }

  function point(nx, ny, pose = state.pose) {
    if (!anchor) {
      const anchorEl = $('rocket-anchor') || $('stage');
      anchor = anchorEl ? anchorEl.getBoundingClientRect() : { left: width / 2 - 120, top: height / 2 - 128, width: 240, height: 256 };
    }
    const dx = (nx - .5) * anchor.width * pose.s, dy = (ny - .5) * anchor.height * pose.s;
    const rad = pose.r * Math.PI / 180;
    return {
      x: anchor.left + anchor.width / 2 + pose.x + dx * Math.cos(rad) - dy * Math.sin(rad),
      y: anchor.top + anchor.height / 2 + pose.y + dx * Math.sin(rad) + dy * Math.cos(rad)
    };
  }

  function addWave(at, floor = false) {
    if (state.calm) return;
    waves.push({ x: at.x, y: at.y, life: 0, duration: floor ? 1.2 : 1.0, floor, max: floor ? 380 : 190 });
  }

  function burst(at, count = 35) {
    if (state.calm) return;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2, speed = 30 + Math.random() * 125;
      const life = .45 + Math.random() * .75;
      particles.push({
        x: at.x, y: at.y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        life, maxLife: life, size: .8 + Math.random() * 1.3, type: 'burst', purple: i % 4 === 0
      });
    }
  }

  function setPhase(phase, force = false) {
    if (!force && state.phase === phase) return;
    state.phase = phase;
    if (loaderEl) loaderEl.dataset.phase = phase;
    if (phase === 'ignition') {
      audio.chirp(150, 360, .55, .018);
      addWave(point(.5, 1.04), true);
    } else if (phase === 'flight') {
      burst(point(.489, .96), 25);
    }
    const anchorEl = $('rocket-anchor') || $('stage');
    if (anchorEl) anchor = anchorEl.getBoundingClientRect();
  }

  function reset(quiet = false) {
    if (state.destroyed) return false;
    clearTimeout(resetTimer); audio.stop(); particles = []; waves = []; trail = []; emissionDebt = 0;
    Object.assign(state, {
      active: false, progress: 0, indeterminate: false, readyRequested: false,
      charge: 0, engine: 0, warp: 0, startedAt: 0, arrivalAt: 0,
      pose: { x: 0, y: 0, s: 1, r: 0, opacity: 1 }
    });
    arrivalPose = null; lastClock = ''; lastPaintedProgress = -1;
    if (loaderEl) {
      loaderEl.style.setProperty('--engine', '0');
      loaderEl.style.setProperty('--charge', '0');
    }
    if (rocket) { rocket.style.transform = ''; rocket.style.opacity = '1'; }
    const gf = $('gauge-fill'); if (gf) gf.style.strokeDashoffset = '289.03';
    setPhase('idle', true);
    const anchorEl = $('rocket-anchor') || $('stage');
    if (anchorEl) anchor = anchorEl.getBoundingClientRect();
    if (!quiet) emit('reset');
    return true;
  }

  function start(options = {}) {
    if (state.destroyed) {
      state.destroyed = false;
      rafId = requestAnimationFrame(frame);
    }
    if (!options || typeof options !== 'object') options = {};
    reset(true);
    state.runId += 1;
    state.demo = true;
    state.duration = Number(options.duration || 4200);
    state.active = true; state.startedAt = performance.now();
    setPhase('charging');
    audio.start(); audio.chirp(); addWave(point(.489, .834));
    emit('launch');
    return true;
  }

  function finish() {
    if (state.destroyed || !state.active) return;
    state.active = false; state.progress = 100;
    state.engine = 0; state.warp = 0; state.charge = 1;
    setPhase('success'); audio.success();
    emit('ready');
    triggerFadeOut();
  }

  /* Simulated flight trajectory */
  function simulate(now) {
    const elapsed = state.active ? now - state.startedAt : 0;
    if (!state.active) {
      state.engine = 0; state.warp *= .93;
      state.pose = { x: 0, y: Math.sin(now * .0013) * 2.3, s: 1, r: 0, opacity: 1 };
      return;
    }

    // Charging phase: 0 -> 1100ms
    if (elapsed < 1100) {
      setPhase('charging');
      const t = clamp(elapsed / 1100);
      state.charge = t; state.engine = 0; state.warp = 0;
      state.pose = {
        x: Math.sin(now * .026) * t * .35,
        y: Math.sin(now * .007) * t * .9,
        s: 1 + .015 * t,
        r: Math.sin(now * .018) * t * .2,
        opacity: 1
      };
    }
    // Ignition phase: 1100ms -> 1850ms
    else if (elapsed < 1850) {
      setPhase('ignition');
      const t = clamp((elapsed - 1100) / 750);
      state.charge = 1;
      state.engine = .25 + .75 * t;
      state.warp = t * .12;
      state.pose = {
        x: Math.sin(now * .082) * 1.5 * t,
        y: -4 * t + Math.sin(now * .097) * t * 1.2,
        s: 1.018,
        r: Math.sin(now * .091) * t * .35,
        opacity: 1
      };
    }
    // Flight & Liftoff phase: 1850ms -> 4200ms
    else {
      setPhase('flight');
      const t = clamp((elapsed - 1850) / 2350);
      const travel = (anchor && anchor.top ? anchor.top + anchor.height + 400 : 900);
      state.charge = 1;
      state.engine = 1;
      state.warp = ease(t);
      state.pose = {
        x: Math.sin(t * Math.PI) * 36,
        y: -travel * Math.pow(t, 2.2),
        s: Math.max(.15, 1.018 - t * .55),
        r: -Math.sin(t * Math.PI) * 10,
        opacity: 1 - clamp((t - .90) / .10)
      };

      // Trigger seamless background fade-out as rocket ascends into space
      if (t >= 0.82 && !fadeOutDone) {
        triggerFadeOut();
      }

      if (t >= 1) {
        finish();
      }
    }

    if (state.calm) {
      state.pose.x = 0; state.pose.r = 0; state.engine = 0; state.warp = 0;
    }
  }

  function applyPose() {
    const p = state.pose;
    if (rocket) {
      rocket.style.transform = `translate3d(${p.x.toFixed(2)}px,${p.y.toFixed(2)}px,0) rotate(${p.r.toFixed(2)}deg) scale(${p.s.toFixed(4)})`;
      rocket.style.opacity = p.opacity.toFixed(3);
    }
    if (loaderEl) {
      loaderEl.style.setProperty('--engine', state.engine.toFixed(3));
      loaderEl.style.setProperty('--charge', state.charge.toFixed(3));
    }
    const gf = $('gauge-fill');
    if (gf) gf.style.strokeDashoffset = String(289.03 * (1 - state.charge));
  }

  function emitParticles(dt) {
    if (state.calm || !state.active || particles.length >= particleBudget) return;
    emissionDebt += dt * (state.phase === 'charging' ? 35 : state.engine > .1 ? 130 * state.engine : 0);
    const count = Math.min(8, Math.floor(emissionDebt)); emissionDebt -= count;
    for (let i = 0; i < count; i++) {
      if (state.phase === 'charging') {
        const target = point(.489, .834), a = Math.random() * 6.283, r = 65 + Math.random() * 115;
        const life = .5 + Math.random() * .3;
        particles.push({
          x: target.x + Math.cos(a) * r, y: target.y + Math.sin(a) * r * .72,
          vx: 0, vy: 0, life, maxLife: life, size: .8 + Math.random(), type: 'charge', purple: i % 4 === 0
        });
      } else if (state.pose.opacity > .1) {
        const base = point(.489 + (Math.random() - .5) * .08, .98);
        const vy = (160 + Math.random() * 260) * (state.phase === 'ignition' ? .6 : 1.15);
        const vx = (Math.random() - .5) * (state.phase === 'ignition' ? 65 : 42);
        const life = .35 + Math.random() * .5;
        particles.push({
          x: base.x, y: base.y, vx, vy, life, maxLife: life,
          size: 1 + Math.random() * 2.2, type: 'engine', purple: Math.random() < .28
        });
      }
    }
  }

  function draw(now, dt) {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, width, height);

    // Starfield
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      if (state.active && state.warp > .05) {
        s.y += dt * (40 + state.warp * 720 * s.depth);
        if (s.y > height + 20) { s.y = -10; s.x = Math.random() * width; }
        const len = 1 + state.warp * 30 * s.depth;
        ctx.strokeStyle = `rgba(175,248,235,${s.a * (1 + state.warp)})`;
        ctx.lineWidth = Math.max(.5, s.r * .8);
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x, s.y - len); ctx.stroke();
      } else {
        const tw = .7 + Math.sin(now * .0025 + s.twinkle) * .3;
        ctx.fillStyle = `rgba(215,248,245,${s.a * tw})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
      }
    }

    // Engine plume particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]; p.life -= dt;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      if (p.type === 'charge') {
        const target = point(.489, .834);
        p.x += (target.x - p.x) * dt * 4.2; p.y += (target.y - p.y) * dt * 4.2;
      } else {
        p.x += p.vx * dt; p.y += p.vy * dt; if (p.type === 'burst') p.vy += 18 * dt;
      }
      const a = clamp(p.life / p.maxLife) * .75;
      ctx.fillStyle = p.purple ? `rgba(135,114,239,${a})` : `rgba(111,247,218,${a})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(.35, p.size), 0, 6.283); ctx.fill();
    }

    // Expanding shockwaves
    for (let i = waves.length - 1; i >= 0; i--) {
      const w = waves[i]; w.life += dt;
      if (w.life >= w.duration) { waves.splice(i, 1); continue; }
      const t = w.life / w.duration, radius = 24 + ease(t) * w.max;
      ctx.strokeStyle = `rgba(87,240,207,${.28 * (1 - t) * (1 - t)})`;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.ellipse(w.x, w.y, radius, radius * (w.floor ? .17 : 1), 0, 0, 6.283); ctx.stroke();
    }
  }

  function frame(now) {
    if (state.destroyed) return;
    rafId = window.requestAnimationFrame(frame);
    const dt = Math.min((now - lastFrame) / 1000, .04); lastFrame = now;
    simulate(now); applyPose(); emitParticles(dt); draw(now, dt); audio.update(state.engine, state.charge);
  }

  window.addEventListener('resize', resize, listenerOptions);

  function destroy() {
    if (state.destroyed) return;
    state.destroyed = true; state.active = false;
    cancelAnimationFrame(rafId); clearTimeout(resetTimer); listeners.abort(); audio.destroy();
    particles = []; waves = []; trail = [];
    if (loaderEl) loaderEl.style.setProperty('--engine', '0');
    if (ctx) ctx.clearRect(0, 0, width, height);
  }

  window.TechnoLoader = Object.freeze({
    start, finish, reset, destroy, triggerFadeOut,
    setSound, setReducedMotion: value => setCalm(value, true), getState: publicState
  });

  // Replay utility
  window.replayTechnoLoader = function() {
    const el = document.getElementById('te-loader');
    if (el) {
      el.style.display = 'flex';
      el.classList.remove('te-fade-out');
      fadeOutDone = false;
      resize();
      start();
    }
  };

  // Optional: click anywhere to skip/speed up launch
  if (loaderEl) {
    loaderEl.addEventListener('click', () => {
      if (state.active && state.phase === 'flight') {
        triggerFadeOut();
      }
    });
  }

  // Initialize
  setCalm(false); resize(); reset(true);
  rafId = requestAnimationFrame(frame);

  // Auto start flight upon page load
  if (config.autoStart !== false) {
    start();
  }

  // Preload images
  const imagesReady = Promise.all([...document.images].map(img => img.decode ? img.decode().catch(() => {}) : Promise.resolve()));
  imagesReady.then(() => {
    if (!state.destroyed) resize();
  });
})();
