import { useEffect, useRef } from 'react';
import { useSite } from '../context/SiteContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  ox: number;
  oy: number;
}

const LINK_DIST = 110;
const PUSH_RADIUS = 130;
const WRAP_MARGIN = 24;

export default function HeroParticles() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { theme, isMobile, reducedMotion } = useSite();

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !parent || !ctx) return;

    const accent =
      getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#22d3ee';
    const mult = theme === 'light' ? 0.75 : 1;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const count = isMobile ? 34 : 76;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let visible = true;
    let hasPointer = false;
    let px = -1e4;
    let py = -1e4;
    let tx = -1e4;
    let ty = -1e4;
    const ps: Particle[] = [];

    const seed = () => {
      ps.length = 0;
      for (let i = 0; i < count; i++) {
        ps.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: 1 + Math.random() * 1.2,
          a: 0.25 + Math.random() * 0.3,
          ox: 0,
          oy: 0,
        });
      }
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = accent;
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1;
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const a = ps[i];
          const b = ps[j];
          const dx = a.x + a.ox - b.x - b.ox;
          const dy = a.y + a.oy - b.y - b.oy;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            ctx.globalAlpha = (1 - d / LINK_DIST) * 0.2 * mult;
            ctx.beginPath();
            ctx.moveTo(a.x + a.ox, a.y + a.oy);
            ctx.lineTo(b.x + b.ox, b.y + b.oy);
            ctx.stroke();
          }
        }
      }
      for (const p of ps) {
        ctx.globalAlpha = p.a * mult;
        ctx.beginPath();
        ctx.arc(p.x + p.ox, p.y + p.oy, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      if (hasPointer) {
        px += (tx - px) * 0.12;
        py += (ty - py) * 0.12;
      }
      for (const p of ps) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -WRAP_MARGIN) p.x = w + WRAP_MARGIN;
        else if (p.x > w + WRAP_MARGIN) p.x = -WRAP_MARGIN;
        if (p.y < -WRAP_MARGIN) p.y = h + WRAP_MARGIN;
        else if (p.y > h + WRAP_MARGIN) p.y = -WRAP_MARGIN;
        if (hasPointer) {
          const dx = p.x - px;
          const dy = p.y - py;
          const d = Math.hypot(dx, dy);
          if (d < PUSH_RADIUS && d > 0.001) {
            const f = (1 - d / PUSH_RADIUS) * 2.2;
            p.ox += (dx / d) * f;
            p.oy += (dy / d) * f;
          }
        }
        p.ox *= 0.9;
        p.oy *= 0.9;
      }
      drawFrame();
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (!running && visible) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };
    const stop = () => {
      if (running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const nw = Math.max(1, Math.round(rect.width));
      const nh = Math.max(1, Math.round(rect.height));
      if (nw === w && nh === h) return;
      if (w > 0 && h > 0 && ps.length) {
        for (const p of ps) {
          p.x = (p.x / w) * nw;
          p.y = (p.y / h) * nh;
        }
      }
      w = nw;
      h = nh;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!ps.length) seed();
      if (reducedMotion) drawFrame();
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
      if (!hasPointer) {
        hasPointer = true;
        px = tx;
        py = ty;
      }
    };
    const onLeave = () => {
      hasPointer = false;
      px = tx = -1e4;
      py = ty = -1e4;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();

    if (reducedMotion) {
      drawFrame();
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    if (!isMobile) {
      parent.addEventListener('pointermove', onMove, { passive: true });
      parent.addEventListener('pointerleave', onLeave, { passive: true });
    }
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      if (!isMobile) {
        parent.removeEventListener('pointermove', onMove);
        parent.removeEventListener('pointerleave', onLeave);
      }
    };
  }, [theme, isMobile, reducedMotion]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
