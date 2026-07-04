import { useRef, type ReactNode } from 'react';
import { useSite } from '../context/SiteContext';
import { gsap, useGSAP, ScrollTrigger } from '../lib/gsap';
import './Process.css';

/* "La Línea Viva" v2 — timeline que atrapa la pantalla:
   - Escritorio: la sección se FIJA (pin) a pantalla completa y el scroll avanza
     los pasos. Los iconos están en GRIS y se vuelven de color cuando la línea
     azul los alcanza, con un estallido de chispas ("completado"). Al final los
     4 pasos parpadean y se libera el scroll.
   - Móvil: sin pin (scroll normal), mismo efecto gris→color.
   El hover (glow de marca, elevación, pulso del icono) vive en CSS. */

// ════════════════════════════════════════════════════════════════════════
//  VALORES AJUSTABLES — cámbialos y guarda; el sitio recarga solo (HMR).
// ════════════════════════════════════════════════════════════════════════
const TUNE = {
  // —— ESCRITORIO (pantalla atrapada / pin) ——
  // Cuánto scroll (en px) dura toda la animación mientras la pantalla está fija.
  //   ↑ más grande (p.ej. 2800) = va MÁS LENTO / más “peso”.
  //   ↓ más chico  (p.ej. 1400) = va MÁS RÁPIDO.
  pinDistance: 2200,
  // Suavidad del enganche al scroll: 0.5 = directo, 1.5 = más “resbaladizo”.
  desktopScrub: 1,

  // —— MÓVIL (scroll normal, sin pin) ——
  // Cuándo ARRANCA: la parte superior de la sección toca este % de la pantalla.
  //   súbelo hacia 'top 85%' → empieza ANTES (más arriba).
  //   bájalo hacia 'top 45%' → empieza MÁS ABAJO (cuando ya la estás viendo).
  mobileStart: 'top 68%',
  // Cuándo TERMINA: la base de la sección toca este % de la pantalla.
  //   súbelo ('bottom 80%') → termina antes.  bájalo ('bottom 40%') → se alarga.
  mobileEnd: 'bottom 55%',
  mobileScrub: 1,
};

// Puntos (0→1) del scroll en los que la línea llega a cada paso y se “enciende”.
// Repártelos si quieres que un paso tarde más/menos. El último deja una “cola”
// (0.88→1) para que dé tiempo a ver el parpadeo final.
const ACTIVATE = [0.05, 0.33, 0.61, 0.88];


const icons: ReactNode[] = [
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="7"></circle>
    <path d="m21 21-4.3-4.3"></path>
  </svg>,
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20h9"></path>
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
  </svg>,
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m16 18 6-6-6-6M8 6l-6 6 6 6"></path>
  </svg>,
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
  </svg>,
];

const nums = ['01', '02', '03', '04'] as const;

export default function Process() {
  const { T, lang } = useSite();
  const sectionRef = useRef<HTMLElement>(null);
  const steps = [T.process.s1, T.process.s2, T.process.s3, T.process.s4];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduce: '(prefers-reduced-motion: reduce)',
          isMobile: '(max-width: 860px)',
          isDesktop: '(min-width: 861px)',
        },
        (ctx) => {
          const { reduce, isMobile } = ctx.conditions as {
            reduce: boolean;
            isMobile: boolean;
          };
          // reduce: el DOM autorado ya es el estado final a color → no animar
          if (reduce) return;
          // Guard: durante HMR el scope puede estar desmontado un instante
          if (!sectionRef.current) return;

          const q = gsap.utils.selector(sectionRef.current);
          const stepEls = q('[data-proc-step]');
          const nodes = q('[data-proc-node]');
          const rail = q('[data-proc-rail]')[0];
          const track = q('.mc-proc-track')[0];
          const fill = q('[data-proc-fill]')[0];
          const spark = q('[data-proc-spark]')[0];
          if (stepEls.length < 4 || nodes.length < 4 || !rail || !track || !fill || !spark) return;

          // Móvil: el riel vertical termina EXACTO en el centro del último nodo
          // (su alto depende del texto → no calculable en CSS). Se remide en cada refresh.
          let onRefresh: (() => void) | undefined;
          if (isMobile) {
            const anchorEnd = () => {
              const tr = track.getBoundingClientRect();
              const last = nodes[3].getBoundingClientRect();
              rail.style.bottom = `${Math.max(0, Math.round(tr.bottom - (last.top + last.height / 2)))}px`;
            };
            anchorEnd();
            onRefresh = anchorEnd;
            ScrollTrigger.addEventListener('refresh', anchorEnd);
          }

          // ——— Estados iniciales (pre-paint): pasos en GRIS, barra colapsada ———
          gsap.set(stepEls, { filter: 'grayscale(1)', opacity: 0.45 });
          gsap.set(nodes, { transformOrigin: '50% 50%' });
          gsap.set(fill, {
            scaleX: isMobile ? 1 : 0,
            scaleY: isMobile ? 0 : 1,
            transformOrigin: isMobile ? 'center top' : 'left center',
          });
          gsap.set(spark, {
            autoAlpha: 0,
            left: isMobile ? '50%' : '0%',
            top: isMobile ? '0%' : '50%',
          });
          // ——— "Pop" del icono al activarse: one-shot POR PASO, desconectado del
          // scrub (siempre hacia adelante), así no se reproduce en reversa. ———
          const pulses = nodes.map((node) => {
            const p = gsap.timeline({ paused: true });
            p.fromTo(node, { scale: 1 }, { scale: 1.16, duration: 0.16, ease: 'power2.out' }).to(
              node,
              { scale: 1, duration: 0.28, ease: 'power2.inOut' },
            );
            return p;
          });
          const pulseArmed = [false, false, false, false];
          const resetPulse = (i: number) => {
            pulses[i].pause();
            gsap.set(nodes[i], { scale: 1 });
          };

          // ——— Parpadeo final (one-shot, tiempo real): UN solo destello ———
          const finale = gsap.timeline({ paused: true });
          finale
            .fromTo(
              nodes,
              { boxShadow: '0 0 0 0 rgba(34,211,238,0)' },
              {
                boxShadow: '0 0 0 2px rgba(34,211,238,.8), 0 0 30px 7px rgba(34,211,238,.55)',
                duration: 0.26,
                yoyo: true,
                repeat: 1, // 1 = enciende y apaga una sola vez (un destello)
                ease: 'sine.inOut',
                stagger: { each: 0.05 },
              },
            )
            .set(nodes, { clearProps: 'boxShadow' });
          let finaleFired = false;

          const trigger = sectionRef.current;
          const stVars: ScrollTrigger.Vars = isMobile
            ? { trigger, start: TUNE.mobileStart, end: TUNE.mobileEnd, scrub: TUNE.mobileScrub }
            : {
                trigger,
                start: 'top top',
                end: `+=${TUNE.pinDistance}`,
                scrub: TUNE.desktopScrub,
                pin: true,
                pinSpacing: true,
                // Sin anticipatePin: en escritorio aplica un desplazamiento
                // proporcional a la velocidad justo antes de fijar → se ve como
                // un "salto hacia abajo". Sin él, el pin engancha exacto y liso.
              };
          stVars.onUpdate = (self) => {
            const p = self.progress;
            // "Pop" del icono: una vez al cruzar cada punto hacia adelante; re-arma
            // (sin reversa) al retroceder por debajo del punto.
            for (let i = 0; i < pulses.length; i++) {
              if (p >= ACTIVATE[i]) {
                if (!pulseArmed[i]) {
                  pulseArmed[i] = true;
                  pulses[i].restart();
                }
              } else if (p < ACTIVATE[i] - 0.02 && pulseArmed[i]) {
                pulseArmed[i] = false;
                resetPulse(i);
              }
            }
            // Destello final: una sola vez cerca del final.
            if (p >= 0.9) {
              if (!finaleFired) {
                finaleFired = true;
                finale.restart();
              }
            } else if (p < 0.85 && finaleFired) {
              finaleFired = false;
            }
          };

          const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: stVars });

          // Columna vertebral scrubbeada: la línea azul crece y la chispa-guía cabalga su punta.
          const A0 = ACTIVATE[0];
          const A3 = ACTIVATE[3];
          const growTo = isMobile ? { scaleY: 1 } : { scaleX: 1 };
          const sparkTo = isMobile ? { top: '100%' } : { left: '100%' };
          tl.to(fill, { ...growTo, duration: A3 - A0 }, A0)
            .to(spark, { autoAlpha: 1, duration: 0.02 }, A0)
            .to(spark, { ...sparkTo, duration: A3 - A0 }, A0)
            .to(spark, { autoAlpha: 0, duration: 0.03 }, A3);

          // Gris→color: ESTO sí sigue a la línea (scrubbeado). El "pop" del icono
          // va por su cuenta (arriba) para no reproducirse en reversa.
          ACTIVATE.forEach((at, i) => {
            tl.to(stepEls[i], { filter: 'grayscale(0)', opacity: 1, duration: 0.05, ease: 'power2.out' }, at - 0.03);
          });

          // Al salir del breakpoint móvil: limpiar listener + bottom inline del riel.
          return () => {
            if (onRefresh) ScrollTrigger.removeEventListener('refresh', onRefresh);
            if (rail) rail.style.bottom = '';
          };
        },
      );
    },
    { scope: sectionRef, dependencies: [lang], revertOnUpdate: true },
  );

  return (
    <section
      ref={sectionRef}
      id="process"
      className="mc-proc"
      style={{
        scrollMarginTop: 84,
        padding: 'clamp(58px,9vw,106px) 0',
        position: 'relative',
        background: 'var(--bg-soft)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        className="mc-proc-inner"
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px,4vw,24px)' }}
      >
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
              style={{ width: 22, height: 1, background: 'var(--accent)', display: 'inline-block' }}
            ></span>
            {T.process.eyebrow}
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
            {T.process.heading}
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem,1.3vw,1.14rem)',
              color: 'var(--muted)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {T.process.sub}
          </p>
        </div>

        <div className="mc-proc-track">
          <div className="mc-proc-rail" data-proc-rail="" aria-hidden="true">
            <span className="mc-proc-rail-base"></span>
            <span className="mc-proc-fill" data-proc-fill=""></span>
            <span className="mc-proc-spark" data-proc-spark=""></span>
          </div>

          <ol className="mc-proc-grid">
            {steps.map((step, i) => (
              <li className="mc-proc-step" data-proc-step="" key={nums[i]}>
                <span className="mc-proc-glow" aria-hidden="true"></span>
                <span className="mc-proc-nodewrap">
                  <span className="mc-proc-node" data-proc-node="" aria-hidden="true">
                    {icons[i]}
                  </span>
                </span>
                <div className="mc-proc-content">
                  <span className="mc-proc-num" aria-hidden="true">
                    {nums[i]}
                  </span>
                  <div className="mc-proc-body">
                    <h3 className="mc-proc-title">{step.title}</h3>
                    <p className="mc-proc-desc">{step.desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
