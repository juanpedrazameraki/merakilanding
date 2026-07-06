import React, { useRef } from 'react';
import { useSite } from '../context/SiteContext';
import { gsap, useGSAP, SplitText } from '../lib/gsap';
import { linePath, areaPath } from '../utils/chartPaths';
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

/* ─────────────────────────────────────────────────────────────────────────
   IDLE — "vida" ambiental de las tarjetas. Arranca cuando la tarjeta termina
   de solidificar y corre en bucle infinito. Todos los tiempos en SEGUNDOS.
   Ajusta estos números a mano para calibrar el ritmo (no hace falta el
   previsualizador): la dirección de cada efecto va comentada al lado.
   ───────────────────────────────────────────────────────────────────────── */
const IDLE = {
  // ── Pulso de datos que viaja por los cables (tarjeta "Software a medida")
  //    y por la línea del chart (tarjeta "SaaS") ──
  FLOW_DUR: 1.1, //         cuánto tarda un pulso en recorrer un cable   (↑ = más lento)
  FLOW_GAP: 0.45, //        separación entre el disparo de un cable y el siguiente (↑ = más espaciado)
  FLOW_WINDOW: 16, //       largo del pulso, en % del cable              (↑ = "paquete" más largo)
  FLOW_CYCLE_PAUSE: 1.6, // pausa tras recorrer TODOS los cables antes de repetir (↑ = más calma)

  // ── Onda de "dato en vivo" en el último punto del chart (tarjeta "SaaS") ──
  PING_DUR: 1.8, //         cuánto dura la onda expandiéndose            (↑ = más lento)
  PING_SCALE: 3.4, //       cuánto crece el anillo respecto al punto     (↑ = onda más grande)
  PING_GAP: 1.0, //         pausa entre una onda y la siguiente          (↑ = pings más raros)

  // ── Cursor que parpadea en la landing (tarjeta "Sitios web") ──
  BLINK_ON: 0.55, //        tiempo visible del cursor
  BLINK_OFF: 0.45, //       tiempo oculto del cursor  (ON≈OFF = parpadeo tipo terminal)

  // ── Respiración suave (punto "en vivo" del browser / núcleo del nodo central) ──
  BREATHE_DUR: 2.0, //      medio ciclo de respiración                   (↑ = más lento/calmado)
  BREATHE_MIN: 0.4, //      opacidad mínima por defecto (cada elemento puede sobreescribir
  BREATHE_MAX: 1, //        opacidad máxima por defecto  con data-breathe-min/max en el SVG)

  // ── Tarjeta "Sitios web": carrusel del hero + un cursor que hace click en el CTA ──
  WEB_HOME_DWELL: 1.3, //    pausa antes de que el cursor vaya al botón  (↑ = se ve más el carrusel)
  WEB_MOVE: 0.85, //         cuánto tarda el cursor en desplazarse       (↑ = mouse más lento)
  WEB_LOOP_PAUSE: 1.1, //    respiro tras el click antes de repetir
  WEB_CARO_HOLD: 1.3, //     cuánto se ve cada slide del carrusel        (↑ = cambia más lento)
  WEB_CARO_SLIDE: 0.6, //    duración del deslizamiento entre slides

  // ── Tarjeta "SaaS": dos líneas en vivo (azul + morada) + números tipo contador ──
  SAAS_TICK: 1.4, //         seg por cada "paso" que avanzan las líneas  (↑ = avanzan más lento)
  SAAS_VOL: 0.32, //         qué tan brusco es cada dato nuevo, 0–1      (↑ = más errático)
  SAAS_COUNT_DUR: 1.2, //    seg que tarda un contador en llegar al nuevo número
  SAAS_COUNT_HOLD: 0.5, //   pausa del contador antes de saltar a otro número
};

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
            // y los elementos que solo cobran sentido animados (flujo/ping/cursor).
            gsap.set('[data-bp-lines]', { opacity: 0 });
            gsap.set('[data-bp-grid]', { opacity: 0.15 });
            gsap.set('[data-bp-flow], [data-bp-ping], [data-bp-blink]', { opacity: 0 });
            gsap.set('[data-bp-mouse], [data-bp-ripple]', { opacity: 0 });
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
            // Elementos del bucle de vida (cada tarjeta declara los suyos vía data-attrs)
            const flows = q('[data-bp-flow]'); // pulsos que viajan por un trazo
            const pings = q('[data-bp-ping]'); // anillos que se expanden
            const blinks = q('[data-bp-blink]'); // cursores que parpadean
            const breathes = q('[data-bp-breathe]'); // elementos que "respiran"

            const split = SplitText.create(titleEl, { type: 'words,chars', aria: 'auto' });

            gsap.set(inner, { autoAlpha: 0, y: 18 });
            gsap.set([...grid, ...solid], { opacity: 0 });
            gsap.set(lines, { opacity: 1 });
            gsap.set(allDraws, { drawSVG: '0%' });
            gsap.set(labels, { opacity: 0 });
            gsap.set(split.chars, { autoAlpha: 0, scale: 1.3, transformOrigin: '50% 80%' });
            gsap.set(chips, { autoAlpha: 0, scale: 0.8, y: 6 });
            gsap.set(cta, { autoAlpha: 0, y: 8 });
            // Estado de reposo del bucle de vida: pulsos fuera de cuadro (el dash
            // empieza antes del inicio del trazo → invisible), ondas/cursores ocultos.
            // (guardado por .length: cada tarjeta solo tiene algunos de estos)
            if (flows.length) gsap.set(flows, { strokeDasharray: `${IDLE.FLOW_WINDOW} 200`, strokeDashoffset: IDLE.FLOW_WINDOW });
            if (pings.length) gsap.set(pings, { autoAlpha: 0 });
            if (blinks.length) gsap.set(blinks, { autoAlpha: 0 });

            // Animaciones en bucle: se crean pausadas y arrancan al completar la
            // revelación (onComplete). Se guardan aquí para dispararlas juntas.
            const idles: gsap.core.Animation[] = [];

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
                idles.forEach((t) => t.play(0));
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

            // ── Bucle de vida ──────────────────────────────────────────────
            // Flujo: un dash corto (FLOW_WINDOW) recorre cada trazo del centro
            // hacia afuera. offset va de +window (dash antes del inicio, oculto)
            // a -100 (dash pasado el final, oculto) → el pulso entra, cruza y sale.
            if (flows.length) {
              const flowTl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: IDLE.FLOW_CYCLE_PAUSE });
              flows.forEach((f, k) => {
                flowTl.fromTo(
                  f,
                  { strokeDashoffset: IDLE.FLOW_WINDOW },
                  { strokeDashoffset: -100, duration: IDLE.FLOW_DUR, ease: 'sine.inOut' },
                  k * IDLE.FLOW_GAP,
                );
              });
              idles.push(flowTl);
            }
            // Respiración: opacidad que sube y baja en yoyo. Cada elemento puede
            // fijar su propio rango con data-breathe-min / data-breathe-max.
            breathes.forEach((el) => {
              const min = parseFloat(el.getAttribute('data-breathe-min') ?? String(IDLE.BREATHE_MIN));
              const max = parseFloat(el.getAttribute('data-breathe-max') ?? String(IDLE.BREATHE_MAX));
              idles.push(
                gsap.fromTo(
                  el,
                  { opacity: max },
                  { opacity: min, duration: IDLE.BREATHE_DUR, ease: 'sine.inOut', repeat: -1, yoyo: true, paused: true, immediateRender: false },
                ),
              );
            });
            // Ping: anillo que crece desde el punto y se desvanece, en bucle.
            pings.forEach((p) => {
              idles.push(
                gsap.fromTo(
                  p,
                  { scale: 1, autoAlpha: 0.65, transformOrigin: '50% 50%' },
                  { scale: IDLE.PING_SCALE, autoAlpha: 0, duration: IDLE.PING_DUR, ease: 'power2.out', repeat: -1, repeatDelay: IDLE.PING_GAP, paused: true, immediateRender: false },
                ),
              );
            });
            // Parpadeo del cursor: visible BLINK_ON, oculto BLINK_OFF, en bucle.
            blinks.forEach((b) => {
              const blinkTl = gsap.timeline({ paused: true, repeat: -1 });
              blinkTl
                .set(b, { autoAlpha: 1 })
                .to({}, { duration: IDLE.BLINK_ON })
                .set(b, { autoAlpha: 0 })
                .to({}, { duration: IDLE.BLINK_OFF });
              idles.push(blinkTl);
            });

            // ── Tarjeta "Sitios web" (solo si tiene cursor): carrusel + click al CTA ──
            const mouse = q('[data-bp-mouse]');
            if (mouse.length) {
              const caro = q('[data-bp-caro]');
              const dots = q('[data-bp-dot]');
              const cta = q('[data-bp-cta]')[0];
              const ripple = q('[data-bp-ripple]');

              // Estado inicial (pre-paint): overlays ocultos, carrusel en el slide 0.
              gsap.set(caro, { x: 0 });
              gsap.set([...mouse, ...ripple], { autoAlpha: 0 });
              gsap.set(mouse, { transformOrigin: '0% 0%', x: 210, y: 150 });
              gsap.set(ripple, { transformOrigin: '50% 50%', scale: 0 });
              gsap.set(cta, { transformOrigin: '50% 50%' });

              // Carrusel (bucle propio, independiente del cursor)
              const SW = 104; // ancho de un slide (== IMG.w en BlueprintWeb)
              const caroTl = gsap.timeline({ paused: true, repeat: -1 });
              caroTl.to({}, { duration: IDLE.WEB_CARO_HOLD });
              for (let k = 1; k <= 3; k++) {
                caroTl.to(caro, { x: -k * SW, duration: IDLE.WEB_CARO_SLIDE, ease: 'power3.inOut' });
                caroTl.to(dots[k % 3], { opacity: 1, duration: 0.2 }, '<');
                caroTl.to(dots[(k - 1) % 3], { opacity: 0.35, duration: 0.2 }, '<');
                if (k < 3) caroTl.to({}, { duration: IDLE.WEB_CARO_HOLD });
              }
              caroTl.set(caro, { x: 0 }); // slide #3 == slide #0 → reset invisible
              idles.push(caroTl);

              // Sub-timeline de "click": presiona el cursor + ripple + presiona el botón
              const clickFx = (px: number, py: number, target: Element) => {
                const t = gsap.timeline();
                t.set(ripple, { x: px, y: py, scale: 0.3, autoAlpha: 1 }, 0)
                  .to(mouse, { scale: 0.8, duration: 0.09, ease: 'power2.in' }, 0)
                  .to(mouse, { scale: 1, duration: 0.16, ease: 'power2.out' }, 0.09)
                  .to(ripple, { scale: 1.8, autoAlpha: 0, duration: 0.5, ease: 'power2.out' }, 0.02)
                  .to(target, { scale: 0.94, duration: 0.09, ease: 'power2.in' }, 0)
                  .to(target, { scale: 1, duration: 0.18, ease: 'power2.out' }, 0.09);
                return t;
              };

              // Bucle: el cursor aparece, va al botón (70,150 = centro del CTA), hace click.
              const journey = gsap.timeline({ paused: true, repeat: -1, defaults: { ease: 'power2.inOut' } });
              journey
                .set([...mouse, ...ripple], { autoAlpha: 0 })
                .set(mouse, { x: 210, y: 150, scale: 1 })
                .to(mouse, { autoAlpha: 1, duration: 0.3 })
                .to({}, { duration: IDLE.WEB_HOME_DWELL })
                .to(mouse, { x: 70, y: 150, duration: IDLE.WEB_MOVE })
                .add(clickFx(70, 150, cta))
                .to({}, { duration: IDLE.WEB_LOOP_PAUSE })
                .to(mouse, { autoAlpha: 0, duration: 0.3 });
              idles.push(journey);
            }

            // ── Tarjeta "SaaS": dos líneas en vivo + números tipo contador ──
            const lineWrap = q('[data-bp-linewrap]');
            if (lineWrap.length) {
              // Geometría idéntica a BlueprintSaas (CHART.w/h/pad, SEG, L).
              const W = 204;
              const H = 52;
              const PAD = 4;
              const SEG = 8;
              const L = SEG + 2; // 10 puntos: 8 visibles + 1 fuera-izq + 1 buffer-der
              const SP = W / SEG; // 25.5 (un paso)
              const VW = SP * (L - 1); // 229.5 (ancho virtual del path)
              const lineA = q('[data-bp-line][data-line="a"]')[0];
              const lineB = q('[data-bp-line][data-line="b"]')[0];
              const areaA = q('[data-bp-area][data-line="a"]')[0];
              const areaB = q('[data-bp-area][data-line="b"]')[0];

              // Dos series "en vivo": random walk acotado → nunca son iguales.
              const clamp = (v: number) => Math.min(0.9, Math.max(0.1, v));
              const seed = (base: number) => Array.from({ length: L }, () => clamp(base + (Math.random() - 0.5) * 0.3));
              const sA = seed(0.45);
              const sB = seed(0.62);
              const redraw = () => {
                lineA.setAttribute('d', linePath(sA, VW, H, PAD));
                lineB.setAttribute('d', linePath(sB, VW, H, PAD));
                areaA.setAttribute('d', areaPath(sA, VW, H, PAD));
                areaB.setAttribute('d', areaPath(sB, VW, H, PAD));
              };
              const advance = (s: number[]) => {
                s.shift(); // suelta el punto más viejo (izquierda)
                s.push(clamp(s[s.length - 1] + (Math.random() - 0.5) * IDLE.SAAS_VOL)); // nuevo dato (derecha)
              };

              // redraw()/contadores mutan el DOM con setAttribute/textContent —
              // GSAP no lo registra, así que su revert no lo repondría. Guardamos
              // el estado autorado y lo restauramos si el contexto se revierte
              // (p.ej. al activar reduced-motion a mitad de sesión).
              const liveEls = [lineA, lineB, areaA, areaB];
              const authoredD = liveEls.map((el) => el.getAttribute('d'));
              const counterEls = q('[data-bp-counter]');
              const authoredText = counterEls.map((el) => el.textContent);
              cleanups.push(() => {
                liveEls.forEach((el, n) => el.setAttribute('d', authoredD[n] ?? ''));
                counterEls.forEach((el, n) => {
                  el.textContent = authoredText[n];
                });
              });

              redraw(); // estado inicial en vivo (pre-paint)

              // Scroll continuo: cada iteración se traslada un paso y, al repetir,
              // avanza los datos y redibuja (el reset de x deja el corte invisible).
              idles.push(
                gsap.fromTo(
                  lineWrap,
                  { x: 0 },
                  {
                    x: -SP,
                    duration: IDLE.SAAS_TICK,
                    ease: 'none',
                    repeat: -1,
                    onRepeat: () => {
                      advance(sA);
                      advance(sB);
                      redraw();
                    },
                    paused: true,
                  },
                ),
              );

              // Números de las KPI con efecto de contador (suben/bajan a valores random).
              counterEls.forEach((el) => {
                const min = parseFloat(el.getAttribute('data-count-min') ?? '0');
                const max = parseFloat(el.getAttribute('data-count-max') ?? '100');
                const suffix = el.getAttribute('data-count-suffix') ?? '';
                const prefix = el.getAttribute('data-count-prefix') ?? '';
                const sep = el.getAttribute('data-count-sep') === '1';
                const obj = { v: (min + max) / 2 };
                const render = () => {
                  const r = Math.round(obj.v);
                  el.textContent = `${prefix}${sep ? r.toLocaleString('en-US') : r}${suffix}`;
                };
                idles.push(
                  gsap.to(obj, {
                    v: () => min + Math.random() * (max - min),
                    duration: IDLE.SAAS_COUNT_DUR,
                    ease: 'power1.inOut',
                    repeat: -1,
                    repeatRefresh: true,
                    repeatDelay: IDLE.SAAS_COUNT_HOLD,
                    onUpdate: render,
                    paused: true,
                  }),
                );
              });
            }

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
