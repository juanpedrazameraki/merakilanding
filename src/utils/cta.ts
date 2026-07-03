import type { MouseEvent } from 'react';

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

/** Efecto magnético + brillo que sigue al cursor en los CTA del hero. */
export function onCtaMove(e: MouseEvent<HTMLElement>) {
  if (prefersReducedMotion()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  el.style.transform =
    'translate(' +
    ((x - r.width / 2) * 0.16).toFixed(1) +
    'px,' +
    ((y - r.height / 2) * 0.16 - 2).toFixed(1) +
    'px)';
  el.style.setProperty('--mx', x + 'px');
  el.style.setProperty('--my', y + 'px');
  const shine = el.querySelector<HTMLElement>('[data-shine]');
  if (shine) shine.style.opacity = '1';
}

export function onCtaLeave(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  el.style.transform = '';
  const shine = el.querySelector<HTMLElement>('[data-shine]');
  if (shine) shine.style.opacity = '0';
}
