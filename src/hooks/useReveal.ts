import { useEffect } from 'react';

/**
 * Aparición al hacer scroll para todos los elementos con [data-reveal].
 * Réplica del comportamiento del diseño original: se ocultan vía JS al montar
 * y se revelan con IntersectionObserver (respetando prefers-reduced-motion).
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    let reduce = false;
    try {
      reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      reduce = false;
    }
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }
    els.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition =
        'opacity .7s cubic-bezier(.22,.61,.36,1), transform .7s cubic-bezier(.22,.61,.36,1)';
    });
    const timeouts: number[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
            timeouts.push(
              window.setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'none';
              }, delay),
            );
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      timeouts.forEach((id) => clearTimeout(id));
    };
  }, []);
}
