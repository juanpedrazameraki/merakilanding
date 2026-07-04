/* Plano "Sitios web": browser que se dibuja como plano de arquitecto y se
   solidifica en una mini-landing. Capas: grid (papel) → solid (UI final) →
   lines (wireframe cyan, targets DrawSVG) → scan (shimmer de hover).
   La geometría es compartida entre wireframe y solid para que el crossfade
   lea como "el dibujo gana sustancia". */

const F = { x: 16, y: 22, w: 288, h: 156, r: 8 }; // frame del browser
const CHROME_Y = 46;
const IMG = { x: 176, y: 84, w: 104, h: 76 };
const CTA = { x: 32, y: 140, w: 76, h: 20 };

const MONO = "'JetBrains Mono',monospace";

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
      </defs>

      <g data-bp-grid>
        <rect width="320" height="200" fill="url(#bpw-grid)" />
        <rect width="320" height="200" fill="url(#bpw-gridM)" />
      </g>

      <g data-bp-solid>
        <rect x={F.x} y={F.y} width={F.w} height={F.h} rx={F.r} fill="var(--card)" stroke="var(--border-strong)" strokeWidth="1" />
        <path
          d={`M${F.x + F.r} ${F.y} H${F.x + F.w - F.r} a${F.r} ${F.r} 0 0 1 ${F.r} ${F.r} V${CHROME_Y} H${F.x} V${F.y + F.r} a${F.r} ${F.r} 0 0 1 ${F.r} -${F.r} Z`}
          fill="var(--surface-2)"
        />
        <circle cx="30" cy="34" r="3" fill="#f87171" />
        <circle cx="42" cy="34" r="3" fill="#fbbf24" />
        <circle cx="54" cy="34" r="3" fill="#34d399" />
        <rect x="66" y="28" width="120" height="12" rx="6" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
        <rect x="32" y="58" width="40" height="8" rx="4" fill="url(#bpw-g)" />
        <path d="M210 62 h18 M236 62 h18 M262 62 h18" stroke="var(--dim)" strokeWidth="3" strokeLinecap="round" />
        <rect x="32" y="84" width="120" height="12" rx="4" fill="var(--text)" opacity="0.85" />
        <rect x="32" y="102" width="96" height="12" rx="4" fill="var(--text)" opacity="0.55" />
        <rect x="32" y="122" width="110" height="6" rx="3" fill="var(--muted)" opacity="0.5" />
        <rect x={CTA.x} y={CTA.y} width={CTA.w} height={CTA.h} rx="6" fill="url(#bpw-g)" />
        <rect x={IMG.x} y={IMG.y} width={IMG.w} height={IMG.h} rx="6" fill="url(#bpw-img)" />
        <circle cx="256" cy="104" r="9" fill="var(--accent)" opacity="0.55" />
        <path d={`M${IMG.x} ${IMG.y + IMG.h - 18} l26 -20 l20 14 l24 -18 l34 24`} fill="none" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1.5" strokeLinejoin="round" />
        <path data-bp-accent d={`M${CTA.x} 166 H${CTA.x + CTA.w}`} fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
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
