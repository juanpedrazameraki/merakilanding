import React, { useRef } from 'react';
import { useSite } from '../context/SiteContext';
import { gsap, useGSAP, SplitText } from '../lib/gsap';
import BlueprintWeb from './services/BlueprintWeb';
import BlueprintSaas from './services/BlueprintSaas';
import BlueprintCustom from './services/BlueprintCustom';
import './Services.css';

/* Regla de ownership: GSAP es dueño exclusivo de opacity/transform en los
   nodos que anima ([data-svc-inner], internos del SVG, chars, chips, cta) —
   esas props nunca van en style props. El DOM autorado es el estado final
   sólido (== estado reduced-motion); el branch animado oculta todo con
   gsap.set en fase layout-effect (pre-paint) y anima con .to(). GSAP jamás
   toca .mc-svc-card: su hover translateY vive en CSS. */

const cardTitleStyle: React.CSSProperties = {
  fontSize: '1.22rem',
  fontWeight: 700,
  margin: '0 0 10px',
  letterSpacing: '-.01em',
};

const cardDescStyle: React.CSSProperties = {
  fontSize: '.98rem',
  color: 'var(--muted)',
  lineHeight: 1.62,
  margin: 0,
};

const CARDS = [
  { key: 'web', waKey: 'svcWeb', Blueprint: BlueprintWeb },
  { key: 'saas', waKey: 'svcSaas', Blueprint: BlueprintSaas },
  { key: 'custom', waKey: 'svcCustom', Blueprint: BlueprintCustom },
] as const;

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.02zm-7.01 15.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 1 1 15.2-4.38c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.38-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03 0 1.2.87 2.36.99 2.52.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
    </svg>
  );
}

export default function Services() {
  const { T, wa, lang } = useSite();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduce: '(prefers-reduced-motion: reduce)',
          isMobile: '(max-width: 880px)',
          isDesktop: '(min-width: 881px)',
        },
        (ctx) => {
          const { reduce, isMobile } = ctx.conditions as { reduce: boolean; isMobile: boolean };

          if (reduce) {
            // El DOM autorado ya es el estado final sólido: solo apagar el plano
            gsap.set('[data-bp-lines]', { opacity: 0 });
            gsap.set('[data-bp-grid]', { opacity: 0.15 });
            return;
          }

          const cards = gsap.utils.toArray<HTMLElement>('[data-svc-card]');
          const canHover = window.matchMedia('(hover: hover)').matches;
          const cleanups: Array<() => void> = [];

          cards.forEach((card, i) => {
            const q = gsap.utils.selector(card);
            const inner = q('[data-svc-inner]');
            const grid = q('[data-bp-grid]');
            const solid = q('[data-bp-solid]');
            const lines = q('[data-bp-lines]');
            const labels = q('[data-bp-label]');
            const allDraws = q('[data-bp-draw]');
            const chart = q('[data-bp-chart]');
            const draws = allDraws.filter((el) => !el.hasAttribute('data-bp-chart'));
            const chips = q('[data-svc-chip]');
            const cta = q('[data-svc-cta]');
            const titleEl = q('[data-svc-title]')[0];

            const split = SplitText.create(titleEl, { type: 'words,chars', aria: 'auto' });

            gsap.set(inner, { autoAlpha: 0, y: 18 });
            gsap.set([...grid, ...solid], { opacity: 0 });
            gsap.set(lines, { opacity: 1 });
            gsap.set(allDraws, { drawSVG: '0%' });
            gsap.set(labels, { opacity: 0 });
            gsap.set(split.chars, { autoAlpha: 0, scale: 1.3, transformOrigin: '50% 80%' });
            gsap.set(chips, { autoAlpha: 0, scale: 0.8, y: 6 });
            gsap.set(cta, { autoAlpha: 0, y: 8 });

            let played = false;
            const tl = gsap.timeline({
              delay: isMobile ? 0 : i * 0.15,
              defaults: { ease: 'power2.out' },
              scrollTrigger: {
                trigger: card,
                start: isMobile ? 'top 78%' : 'top 72%',
                once: true,
              },
              onComplete: () => {
                played = true;
              },
            });

            tl.to(inner, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out' }, 0)
              .to(grid, { opacity: 1, duration: 0.3 }, 0.05)
              .to(draws, { drawSVG: '100%', duration: 0.5, stagger: 0.04, ease: 'power1.inOut' }, 0.15)
              .to(labels, { opacity: 0.75, duration: 0.25 }, 0.8);
            if (chart.length) {
              tl.to(chart, { drawSVG: '100%', duration: 0.35, ease: 'power2.out' }, 0.85);
            }
            tl.to(solid, { opacity: 1, duration: 0.45, ease: 'power2.inOut' }, 1.0)
              .to(lines, { opacity: 0, duration: 0.45 }, 1.0)
              .to(grid, { opacity: 0.15, duration: 0.45 }, 1.0)
              .to(split.chars, { autoAlpha: 1, scale: 1, duration: 0.3, stagger: 0.015, ease: 'back.out(2)' }, 1.1)
              .to(chips, { autoAlpha: 1, scale: 1, y: 0, duration: 0.3, stagger: 0.06, ease: 'back.out(2.5)' }, 1.25)
              .to(cta, { autoAlpha: 1, y: 0, duration: 0.35 }, 1.4);

            if (canHover && contextSafe) {
              const scan = q('[data-bp-scan]');
              const accent = q('[data-bp-accent]');
              const shimmer = gsap.timeline({ paused: true });
              shimmer
                .fromTo(scan, { x: -40, opacity: 0 }, { x: 340, opacity: 1, duration: 0.7, ease: 'power2.inOut' }, 0)
                .to(scan, { opacity: 0, duration: 0.15 }, 0.55);
              if (accent.length) {
                shimmer.fromTo(accent, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.5, ease: 'power1.inOut' }, 0.1);
              }
              const onEnter = contextSafe(() => {
                if (played && !shimmer.isActive()) shimmer.restart();
              });
              card.addEventListener('pointerenter', onEnter);
              cleanups.push(() => card.removeEventListener('pointerenter', onEnter));
            }
          });

          return () => {
            cleanups.forEach((fn) => fn());
          };
        },
      );
    },
    { scope: sectionRef, dependencies: [lang], revertOnUpdate: true },
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{
        scrollMarginTop: 84,
        padding: 'clamp(58px,9vw,106px) 0',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px,4vw,24px)' }}>
        <div data-reveal="" style={{ maxWidth: 640, marginBottom: 'clamp(36px,5vw,56px)' }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: '.76rem',
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: 15,
              display: 'flex',
              alignItems: 'center',
              gap: 11,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 22,
                height: 1,
                background: 'var(--accent)',
                display: 'inline-block',
              }}
            ></span>
            {T.services.eyebrow}
          </div>
          <h2
            style={{
              fontSize: 'clamp(1.85rem,3.6vw,2.7rem)',
              fontWeight: 800,
              letterSpacing: '-.022em',
              lineHeight: 1.1,
              margin: '0 0 16px',
            }}
          >
            {T.services.heading}
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem,1.3vw,1.14rem)',
              color: 'var(--muted)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {T.services.sub}
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))',
            gap: 20,
          }}
        >
          {CARDS.map(({ key, waKey, Blueprint }) => {
            const item = T.services[key];
            return (
              <article key={key} className="mc-svc-card" data-svc-card="">
                <div data-svc-inner="">
                  <div className="mc-svc-fig" aria-hidden="true">
                    <Blueprint />
                  </div>
                  {/* key por idioma: el revert de SplitText restaura el HTML
                      guardado al hacer split; remontar el nodo evita que pise
                      el texto del nuevo idioma */}
                  <h3 key={lang} data-svc-title="" style={cardTitleStyle}>
                    {item.title}
                  </h3>
                  <p style={cardDescStyle}>{item.desc}</p>
                  <ul className="mc-svc-chips">
                    {item.chips.map((chip) => (
                      <li key={chip} className="mc-svc-chip" data-svc-chip="">
                        {chip}
                      </li>
                    ))}
                  </ul>
                  <a
                    className="mc-svc-cta"
                    data-svc-cta=""
                    href={wa(T.wa[waKey])}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${T.services.cta} — ${item.title}`}
                  >
                    <WaIcon />
                    {T.services.cta}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
