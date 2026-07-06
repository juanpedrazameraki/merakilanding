/* Plano "Sitios web": browser que se dibuja como plano de arquitecto y se
   solidifica en una mini-landing. Tras solidificar, corre una animación en
   bucle (lo maneja Services.tsx): el carrusel del hero va pasando slides y
   un cursor se mueve hasta el botón y hace click. Una sola pantalla, sin
   navegación. Capas: grid (papel) → solid (UI + cursor) → lines (wireframe
   cyan, targets DrawSVG) → scan (shimmer de hover). */

const F = { x: 16, y: 22, w: 288, h: 156, r: 8 }; // frame del browser
const CHROME_Y = 46;
const IMG = { x: 176, y: 84, w: 104, h: 76 }; // ventana del carrusel (era la imagen hero)
const CTA = { x: 32, y: 140, w: 76, h: 20 };

const MONO = "'JetBrains Mono',monospace";

// Un slide del carrusel; cada uno se posiciona en su x dentro de data-bp-caro.
function Slide({ i, x }: { i: number; x: number }) {
  return (
    <g transform={`translate(${x},${IMG.y})`}>
      {i % 3 === 0 && (
        <>
          <rect width={IMG.w} height={IMG.h} rx="6" fill="url(#bpw-img)" />
          <circle cx="80" cy="20" r="9" fill="var(--accent)" opacity="0.55" />
          <path d="M0 58 l26 -20 l20 14 l24 -18 l34 24" fill="none" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1.5" strokeLinejoin="round" />
        </>
      )}
      {i % 3 === 1 && (
        <>
          <rect width={IMG.w} height={IMG.h} rx="6" fill="url(#bpw-g)" opacity="0.5" />
          <rect x="16" y="22" width="72" height="10" rx="3" fill="#fff" opacity="0.9" />
          <rect x="16" y="40" width="60" height="6" rx="3" fill="#fff" opacity="0.55" />
          <rect x="16" y="52" width="44" height="6" rx="3" fill="#fff" opacity="0.4" />
        </>
      )}
      {i % 3 === 2 && (
        <>
          <rect width={IMG.w} height={IMG.h} rx="6" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1" />
          <rect x="12" y="16" width="24" height="24" rx="3" fill="var(--accent)" opacity="0.28" />
          <rect x="40" y="16" width="24" height="24" rx="3" fill="var(--accent)" opacity="0.2" />
          <rect x="68" y="16" width="24" height="24" rx="3" fill="var(--accent)" opacity="0.28" />
          <rect x="12" y="50" width="80" height="6" rx="3" fill="var(--muted)" opacity="0.5" />
        </>
      )}
    </g>
  );
}

export default function BlueprintWeb() {
  return (
    <svg viewBox="0 0 320 200" width="100%" height="100%" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="bpw-grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0 H0 V16" fill="none" stroke="var(--accent)" strokeOpacity="0.1" strokeWidth="1" />
        </pattern>
        <pattern id="bpw-gridM" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M80 0 H0 V80" fill="none" stroke="var(--accent)" strokeOpacity="0.16" strokeWidth="1" />
        </pattern>
        <linearGradient id="bpw-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--g1)" />
          <stop offset="100%" stopColor="var(--g2)" />
        </linearGradient>
        <linearGradient id="bpw-img" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--g1)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--g2)" stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id="bpw-scan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
        {/* Recorta la ventana del carrusel para que los slides se deslicen dentro */}
        <clipPath id="bpw-caro">
          <rect x={IMG.x} y={IMG.y} width={IMG.w} height={IMG.h} rx="6" />
        </clipPath>
      </defs>

      <g data-bp-grid>
        <rect width="320" height="200" fill="url(#bpw-grid)" />
        <rect width="320" height="200" fill="url(#bpw-gridM)" />
      </g>

      <g data-bp-solid>
        {/* Chrome del browser */}
        <rect x={F.x} y={F.y} width={F.w} height={F.h} rx={F.r} fill="var(--card)" stroke="var(--border-strong)" strokeWidth="1" />
        <path
          d={`M${F.x + F.r} ${F.y} H${F.x + F.w - F.r} a${F.r} ${F.r} 0 0 1 ${F.r} ${F.r} V${CHROME_Y} H${F.x} V${F.y + F.r} a${F.r} ${F.r} 0 0 1 ${F.r} -${F.r} Z`}
          fill="var(--surface-2)"
        />
        <circle cx="30" cy="34" r="3" fill="#f87171" />
        <circle cx="42" cy="34" r="3" fill="#fbbf24" />
        <circle data-bp-breathe data-breathe-min="0.35" data-breathe-max="1" cx="54" cy="34" r="3" fill="#34d399" />
        <rect x="66" y="28" width="120" height="12" rx="6" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />

        {/* Contenido de la landing (una sola pantalla) */}
        <rect x="32" y="58" width="40" height="8" rx="4" fill="url(#bpw-g)" />
        <path d="M210 62 h18 M236 62 h18 M262 62 h18" stroke="var(--dim)" strokeWidth="3" strokeLinecap="round" />
        <rect x="32" y="84" width="120" height="12" rx="4" fill="var(--text)" opacity="0.85" />
        <rect x="32" y="102" width="96" height="12" rx="4" fill="var(--text)" opacity="0.55" />
        <rect x="32" y="122" width="110" height="6" rx="3" fill="var(--muted)" opacity="0.5" />
        {/* CTA — objetivo del click */}
        <rect data-bp-cta x={CTA.x} y={CTA.y} width={CTA.w} height={CTA.h} rx="6" fill="url(#bpw-g)" />
        <rect x={CTA.x + 12} y={CTA.y + 7} width="52" height="6" rx="3" fill="#fff" opacity="0.9" />

        {/* Carrusel: strip de slides que se desliza dentro de la ventana */}
        <g clipPath="url(#bpw-caro)">
          <g data-bp-caro>
            <Slide i={0} x={IMG.x} />
            <Slide i={1} x={IMG.x + IMG.w} />
            <Slide i={2} x={IMG.x + IMG.w * 2} />
            <Slide i={0} x={IMG.x + IMG.w * 3} />
          </g>
        </g>
        <rect x={IMG.x} y={IMG.y} width={IMG.w} height={IMG.h} rx="6" fill="none" stroke="var(--border)" strokeWidth="1" />
        {/* Indicadores del carrusel */}
        <circle data-bp-dot cx="218" cy="168" r="2.2" fill="var(--accent)" opacity="1" />
        <circle data-bp-dot cx="228" cy="168" r="2.2" fill="var(--accent)" opacity="0.35" />
        <circle data-bp-dot cx="238" cy="168" r="2.2" fill="var(--accent)" opacity="0.35" />

        {/* Ripple del click + cursor del mouse (overlays) */}
        <circle data-bp-ripple cx="0" cy="0" r="6" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        <g data-bp-mouse>
          <path d="M1 1 L1 15 L4.6 11.6 L7.1 17.4 L9.3 16.5 L6.8 10.9 L11.6 10.9 Z" fill="#fff" stroke="#0b1017" strokeWidth="1" strokeLinejoin="round" />
        </g>
      </g>

      <g data-bp-lines fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round">
        <rect data-bp-draw x={F.x} y={F.y} width={F.w} height={F.h} rx={F.r} />
        <path data-bp-draw d={`M${F.x} ${CHROME_Y} H${F.x + F.w}`} />
        <path
          data-bp-draw
          d="M27 34 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M39 34 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M51 34 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0"
        />
        <rect data-bp-draw x="66" y="28" width="120" height="12" rx="6" />
        <rect data-bp-draw x="32" y="58" width="40" height="8" rx="4" />
        <path data-bp-draw d="M210 62 h18 M236 62 h18 M262 62 h18" />
        <rect data-bp-draw x="32" y="84" width="120" height="12" rx="4" />
        <rect data-bp-draw x="32" y="102" width="96" height="12" rx="4" />
        <rect data-bp-draw x="32" y="122" width="110" height="6" rx="3" />
        <rect data-bp-draw x={CTA.x} y={CTA.y} width={CTA.w} height={CTA.h} rx="6" />
        <rect data-bp-draw x={IMG.x} y={IMG.y} width={IMG.w} height={IMG.h} rx="6" />
        <path data-bp-draw d={`M${IMG.x} ${IMG.y} L${IMG.x + IMG.w} ${IMG.y + IMG.h} M${IMG.x + IMG.w} ${IMG.y} L${IMG.x} ${IMG.y + IMG.h}`} strokeOpacity="0.6" strokeWidth="1" />
        <g data-bp-dims strokeWidth="1" strokeOpacity="0.75">
          <path data-bp-draw d="M16 190 v-4 M304 190 v-4 M16 188 H304" />
          <path data-bp-draw d="M312 22 h-4 M312 178 h-4 M310 22 V178" />
          <path data-bp-draw d="M6 12 h8 M10 8 v8 M306 12 h8 M310 8 v8" strokeOpacity="0.5" />
        </g>
        <text data-bp-label x="152" y="197" fontFamily={MONO} fontSize="7" fill="var(--accent)" stroke="none" opacity="0.75" textAnchor="middle">
          1280
        </text>
        <text data-bp-label fontFamily={MONO} fontSize="7" fill="var(--accent)" stroke="none" opacity="0.75" textAnchor="middle" transform="rotate(90 316 100)" x="316" y="100">
          720
        </text>
      </g>

      <rect data-bp-scan x="0" y="0" width="28" height="200" fill="url(#bpw-scan)" opacity="0" />
    </svg>
  );
}
