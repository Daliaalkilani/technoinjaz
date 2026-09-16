import React, { useEffect, useRef } from 'react';
import './TeamMomentsRing.css';

export default function TeamMomentsRing({ onScrollDown }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');

    let animId;
    let isMounted = true;

    /* إحداثيات التصميم */
    const DW = 2962;
    const DH = 2160;
    const DASP = DW / DH;

    const RING = {
      cx: 1484,
      cy: 1080,
      a: 920,
      ratio: 0.492,
      axis: 25.5,
      n: 12,
      tile: 460,
      radius: 0.22,
      dist: 13,
      phase: 93
    };

    const DUR = 15.015;
    const TS = 512;

    /* إعداد الهندسة الفضائية للحلقة */
    const ax = (RING.axis * Math.PI) / 180;
    const cf = RING.ratio;
    const sf = Math.sqrt(1 - cf * cf);
    const U = [Math.cos(ax), Math.sin(ax), 0];
    const V = [-Math.sin(ax) * cf, Math.cos(ax) * cf, sf];
    const AXIS = [
      U[1] * V[2] - U[2] * V[1],
      U[2] * V[0] - U[0] * V[2],
      U[0] * V[1] - U[1] * V[0]
    ];

    function mkc(w, h) {
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      return c;
    }

    /* نسيج التحبب السينمائي */
    const grainTile = (() => {
      const c = mkc(160, 160);
      const x = c.getContext('2d');
      const d = x.createImageData(160, 160);
      let s = 0x51f3;
      const rng = () => {
        s ^= s << 13;
        s >>>= 0;
        s ^= s >>> 17;
        s ^= s << 5;
        s >>>= 0;
        return s / 4294967296;
      };
      for (let i = 0; i < d.data.length; i += 4) {
        const v = 128 + (rng() - 0.5) * 116;
        d.data[i] = d.data[i + 1] = d.data[i + 2] = v;
        d.data[i + 3] = 255;
      }
      x.putImageData(d, 0, 0);
      return c;
    })();

    /* مسار المستطيل المنحني للبطاقة */
    function roundRectPath(x, w, h, r) {
      x.beginPath();
      x.moveTo(-w / 2 + r, -h / 2);
      x.lineTo(w / 2 - r, -h / 2);
      x.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
      x.lineTo(w / 2, h / 2 - r);
      x.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
      x.lineTo(-w / 2 + r, h / 2);
      x.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
      x.lineTo(-w / 2, -h / 2 + r);
      x.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
      x.closePath();
    }

    /* صور الفريق المرفوعة */
    const photoUrls = [
      '/moments/moment1.jpg',
      '/moments/moment2.jpg',
      '/moments/moment3.jpg',
      '/moments/moment4.jpg'
    ];

    let textures = { front: [], back: [] };

    function createDefaultTexture(index) {
      const c = mkc(TS, TS);
      const x = c.getContext('2d');
      const g = x.createLinearGradient(0, 0, TS, TS);
      const hues = [260, 290, 320, 200];
      const h = hues[index % hues.length];
      g.addColorStop(0, `hsl(${h}, 70%, 15%)`);
      g.addColorStop(1, `hsl(${h + 30}, 80%, 35%)`);
      x.fillStyle = g;
      x.fillRect(0, 0, TS, TS);
      return c;
    }

    // تهيئة أولية
    for (let i = 0; i < RING.n; i++) {
      const def = createDefaultTexture(i);
      textures.front.push(def);
      textures.back.push(def);
    }

    // تحميل الصور الحقيقية وتوليد البلاطات
    const loadedImages = [];
    let loadedCount = 0;

    photoUrls.forEach((url, idx) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        if (!isMounted) return;
        loadedImages[idx] = img;
        loadedCount++;
        if (loadedCount === photoUrls.length) {
          buildPhotoTextures();
        }
      };
      img.src = url;
    });

    function drawCover(ctx, img, w, h) {
      const imgRatio = img.width / img.height;
      const targetRatio = w / h;
      let sw, sh, sx, sy;
      if (imgRatio > targetRatio) {
        sh = img.height;
        sw = sh * targetRatio;
        sx = (img.width - sw) / 2;
        sy = 0;
      } else {
        sw = img.width;
        sh = sw / targetRatio;
        sx = 0;
        sy = (img.height - sh) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    }

    function buildPhotoTextures() {
      const front = [];
      const back = [];

      for (let i = 0; i < RING.n; i++) {
        const img = loadedImages[i % loadedImages.length];
        const c = mkc(TS, TS);
        const x = c.getContext('2d');

        if (img) {
          drawCover(x, img, TS, TS);
        } else {
          x.fillStyle = '#111';
          x.fillRect(0, 0, TS, TS);
        }

        // تدرج ظل سينمائي وإضاءة حواف
        const vig = x.createRadialGradient(TS / 2, TS / 2, TS * 0.35, TS / 2, TS / 2, TS * 0.72);
        vig.addColorStop(0, 'rgba(0,0,0,0)');
        vig.addColorStop(1, 'rgba(0,0,0,0.55)');
        x.fillStyle = vig;
        x.fillRect(0, 0, TS, TS);

        // إطار حدودي رفيع متوهج
        x.strokeStyle = 'rgba(255, 255, 255, 0.18)';
        x.lineWidth = 6;
        roundRectPath(x, TS - 6, TS - 6, TS * RING.radius);
        x.stroke();

        // تأثير Film Grain
        x.save();
        x.globalCompositeOperation = 'overlay';
        x.globalAlpha = 0.12;
        const p = x.createPattern(grainTile, 'repeat');
        x.fillStyle = p;
        x.fillRect(0, 0, TS, TS);
        x.restore();

        front.push(c);

        // الوجه الخلفي للبلاطة: داكن وأنيق
        const d = mkc(TS, TS);
        const y = d.getContext('2d');
        y.drawImage(c, 0, 0);
        y.globalCompositeOperation = 'saturation';
        y.fillStyle = 'rgba(128,128,128,0.2)';
        y.fillRect(0, 0, TS, TS);
        y.globalCompositeOperation = 'multiply';
        y.fillStyle = 'rgba(10, 8, 20, 0.82)';
        y.fillRect(0, 0, TS, TS);
        back.push(d);
      }

      textures = { front, back };
    }

    /* أبعاد الكانفاس والطبقات */
    let W = 0;
    let H = 0;
    let K = 1;
    let OX = 0;
    let OY = 0;
    let headLayer = null;
    let labelLayer = null;

    function d2sx(x) {
      return OX + x * K;
    }
    function d2sy(y) {
      return OY + y * K;
    }

    /* رسم العنوان الرئيسي باللغة العربية بجودة فائقة */
    function buildHead() {
      headLayer = mkc(Math.max(1, W), Math.max(1, H));
      const x = headLayer.getContext('2d');

      const cx = d2sx(RING.cx);
      const cy = d2sy(RING.cy - 60);

      // توهج خلف العنوان بحجم موسع
      const glow = x.createRadialGradient(cx, cy, 30 * K, cx, cy, 680 * K);
      glow.addColorStop(0, 'rgba(82, 39, 255, 0.45)');
      glow.addColorStop(0.6, 'rgba(124, 58, 237, 0.2)');
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      x.fillStyle = glow;
      x.fillRect(0, 0, W, H);

      // النص الرئيسي بخط Readex Pro بحجم أكبر وأوضح
      x.save();
      const fontSize = Math.round(168 * K);
      x.font = `800 ${fontSize}px "Readex Pro", "Segoe UI", system-ui, sans-serif`;
      x.textAlign = 'center';
      x.textBaseline = 'middle';
      x.direction = 'rtl';

      // ظل داكن عميق
      x.shadowColor = 'rgba(0, 0, 0, 0.95)';
      x.shadowBlur = 40 * K;
      x.shadowOffsetY = 12 * K;

      // تدرج لوني فخم للنص
      const textGrad = x.createLinearGradient(0, cy - fontSize / 2, 0, cy + fontSize / 2);
      textGrad.addColorStop(0, '#ffffff');
      textGrad.addColorStop(0.7, '#f3f0ff');
      textGrad.addColorStop(1, '#c4b5fd');

      x.fillStyle = textGrad;
      x.fillText('لحظات الفريق', cx, cy);

      // سطر تعريفي أنيق تحته بخط Readex Pro
      x.restore();
    }

    /* رسم الملاحظات الجانبية */
    function buildLabels() {
      labelLayer = mkc(Math.max(1, W), Math.max(1, H));
    }


    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      W = Math.round(window.innerWidth * dpr);
      H = Math.round(window.innerHeight * dpr);
      cv.width = W;
      cv.height = H;
      const S = Math.min(W * 1.12, H * DASP * 1.08);
      K = (S / DW) * 1.25;
      OX = (W - DW * K) / 2;
      OY = (H - DH * K) / 2;
      buildHead();
      buildLabels();
    }

    function project(p) {
      const k = (RING.a * K * RING.dist) / (RING.dist - p[2]);
      return [d2sx(RING.cx) + k * p[0], d2sy(RING.cy) + k * p[1], k];
    }

    function drawTile(i, psi) {
      const c = Math.cos(psi);
      const s = Math.sin(psi);
      const C = [c * U[0] + s * V[0], c * U[1] + s * V[1], c * U[2] + s * V[2]];
      const T = [-s * U[0] + c * V[0], -s * U[1] + c * V[1], -s * U[2] + c * V[2]];
      const h = RING.tile / (2 * RING.a);
      const p0 = project(C);
      const pT = project([C[0] + T[0] * h, C[1] + T[1] * h, C[2] + T[2] * h]);
      const pA = project([C[0] + AXIS[0] * h, C[1] + AXIS[1] * h, C[2] + AXIS[2] * h]);
      const ex = pT[0] - p0[0];
      const ey = pT[1] - p0[1];
      const fx = pA[0] - p0[0];
      const fy = pA[1] - p0[1];

      if (Math.abs(ex * fy - ey * fx) < 0.4) return;

      const facing = C[2] > 0;
      const img = (facing ? textures.front : textures.back)[i % textures.front.length];
      if (!img) return;

      ctx.save();
      // تعديل اتجاه المحاور لضبط الصور لتظهر بالاتجاه الصحيح والمعتدل (Upright)
      ctx.setTransform((-ex * 2) / TS, (-ey * 2) / TS, (-fx * 2) / TS, (-fy * 2) / TS, p0[0], p0[1]);
      roundRectPath(ctx, TS, TS, TS * RING.radius);
      ctx.clip();
      ctx.drawImage(img, -TS / 2, -TS / 2, TS, TS);
      ctx.restore();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    function render(t) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, W, H);
      ctx.imageSmoothingQuality = 'high';

      const spin = (t / DUR) * Math.PI * 2;
      const list = [];
      for (let i = 0; i < RING.n; i++) {
        const psi = (RING.phase * Math.PI) / 180 - (i * 2 * Math.PI) / RING.n + spin;
        const c = Math.cos(psi);
        const s = Math.sin(psi);
        list.push({ i, psi, z: c * U[2] + s * V[2] });
      }
      list.sort((a, b) => a.z - b.z);

      let drawnText = false;
      for (let i = 0; i < list.length; i++) {
        if (!drawnText && list[i].z > 0) {
          if (headLayer) ctx.drawImage(headLayer, 0, 0);
          drawnText = true;
        }
        drawTile(list[i].i, list[i].psi);
      }
      if (!drawnText && headLayer) ctx.drawImage(headLayer, 0, 0);
      if (labelLayer) ctx.drawImage(labelLayer, 0, 0);
    }

    let isVisible = false;
    const t0 = performance.now();
    function frame(now) {
      if (!isMounted || !isVisible) {
        animId = null;
        return;
      }
      const tNow = ((now - t0) / 1000) % DUR;
      render(tNow);
      animId = requestAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (!animId) {
            animId = requestAnimationFrame(frame);
          }
        } else {
          if (animId) {
            cancelAnimationFrame(animId);
            animId = null;
          }
        }
      },
      { threshold: 0.02 }
    );
    observer.observe(cv);

    window.addEventListener('resize', resize);
    resize();

    // إعادة رسم النصوص فور اكتمال تحميل خط Readex Pro
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!isMounted) return;
        buildHead();
        buildLabels();
      });
    }

    return () => {
      isMounted = false;
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="team-moments-wrapper">
      <canvas ref={canvasRef} className="team-moments-canvas" />
    </div>
  );
}
