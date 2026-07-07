import { useRef } from 'react';
import { useSite } from '../context/SiteContext';
import { gsap, useGSAP } from '../lib/gsap';
import './Guarantees.css';

/* Sección "Garantías y Compromiso" — sustituye al Portafolio mientras no hay
   casos. Panel tipo certificado con un sello y los compromisos marcados con un
   check que se DIBUJA al entrar en viewport (DrawSVG, idiom del proyecto).

   TUNEABLES (objeto GUAR): un comentario por perilla. */
const GUAR = {
  RING_DUR: 18, //       seg por vuelta del aro punteado del sello (↑ = más lento)
  CHECK_DRAW: 0.5, //    seg que tarda en dibujarse cada check
  CHECK_STAGGER: 0.16, // seg entre un check y el siguiente
  START: 'top 78%', //   punto del viewport donde disparan los checks
};

export default function Guarantees() {
  const { T, lang } = useSite();
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ reduce: '(prefers-reduced-motion: reduce)' }, (ctx) => {
        const { reduce } = ctx.conditions as { reduce: boolean };
        const root = rootRef.current;
        if (!root) return;
        const draws = gsap.utils.selector(root)('[data-guar-draw]');
        if (!draws.length) return;
        if (reduce) {
          gsap.set(draws, { drawSVG: '100%' });
          return;
        }
        gsap.set(draws, { drawSVG: '0%' });
        gsap.to(draws, {
          drawSVG: '100%',
          duration: GUAR.CHECK_DRAW,
          ease: 'power2.out',
          stagger: GUAR.CHECK_STAGGER,
          scrollTrigger: { trigger: root, start: GUAR.START, once: true },
        });
      });
    },
    { scope: rootRef, dependencies: [lang], revertOnUpdate: true },
  );

  return (
    <section
      id="guarantees"
      ref={rootRef}
      style={{
        scrollMarginTop: 84,
        padding: 'clamp(58px,9vw,106px) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 940, margin: '0 auto', padding: '0 clamp(16px,4vw,24px)' }}>
        <div className="mc-guar-panel" data-reveal="">
          <div className="mc-guar-seal" style={{ ['--ring-dur' as string]: `${GUAR.RING_DUR}s` }}>
            <span className="mc-guar-ring" aria-hidden="true"></span>
            <span className="mc-guar-disc">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3l7 3v5c0 4.4-3 8-7 9.6C8 19 5 15.4 5 11V6z" />
                <path d="M9 11.4l2.1 2.1L15.2 9" />
              </svg>
            </span>
          </div>

          <div className="mc-guar-eyebrow">{T.guarantees.eyebrow}</div>
          <h2 className="mc-guar-title">{T.guarantees.heading}</h2>
          <p className="mc-guar-intro">{T.guarantees.intro}</p>

          <ul className="mc-guar-grid">
            {T.guarantees.items.map((it, i) => (
              <li className="mc-guar-item" key={i}>
                <span className="mc-guar-check">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path data-guar-draw d="M5 12.5l4.5 4.5L19 7" />
                  </svg>
                </span>
                <div className="mc-guar-itxt">
                  <h3>{it.title}</h3>
                  <p>{it.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mc-guar-sign">
            <span className="mc-guar-sign-line" aria-hidden="true"></span>
            <span className="mc-guar-sign-text">— {T.guarantees.signature}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
