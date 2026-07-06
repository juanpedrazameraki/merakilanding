/* Plano "SaaS": dashboard que se dibuja (sidebar, stat cards, ejes) y remata
   con las líneas del chart. Tras solidificar corre en vivo (lo maneja
   Services.tsx): dos líneas (azul + morada) que avanzan con datos aleatorios
   —nunca iguales— desplazándose hacia la izquierda, y los números de las
   tarjetas superiores suben/bajan con efecto de contador. */
import { genSeries, linePath, areaPath } from '../../utils/chartPaths';

const F = { x: 16, y: 18, w: 288, h: 164, r: 8 };
const SIDE_X = 78;
const CHART = { x: 92, y: 110, w: 204, h: 52, pad: 4 };

// Geometría del "chart en vivo": 8 segmentos visibles + 1 punto fuera a la
// izquierda + 1 buffer a la derecha = 10 puntos. El path se dibuja sobre un
// ancho virtual VW (más ancho que la ventana) y se recorta con bps-chartclip;
// Services.tsx traslada el grupo un paso (SP) y va rotando los datos.
const SEG = 8;
const L = SEG + 2; // 10 puntos
const SP = CHART.w / SEG; // 25.5 (separación entre puntos)
const VW = SP * (L - 1); // 229.5 (ancho virtual del path)

// Series iniciales (deterministas para el primer render / reduced-motion).
const SA = genSeries(9, L, 0.45, 0.55, (t) => 0.45 + 0.18 * Math.sin(t * 3.2));
const SB = genSeries(23, L, 0.45, 0.55, (t) => 0.58 - 0.16 * Math.sin(t * 2.3 + 1));
const LINE_A = linePath(SA, VW, CHART.h, CHART.pad);
const AREA_A = areaPath(SA, VW, CHART.h, CHART.pad);
const LINE_B = linePath(SB, VW, CHART.h, CHART.pad);
const AREA_B = areaPath(SB, VW, CHART.h, CHART.pad);
// El wireframe (draw-in) NO va recortado, así que se traza sobre el ancho
// VISIBLE (no el virtual) para no asomarse fuera del frame del dashboard.
const LINE_A_VIS = linePath(SA, CHART.w, CHART.h, CHART.pad);

const MONO = "'JetBrains Mono',monospace";

export default function BlueprintSaas() {
  return (
    <svg viewBox="0 0 320 200" width="100%" height="100%" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="bps-grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0 H0 V16" fill="none" stroke="var(--accent)" strokeOpacity="0.1" strokeWidth="1" />
        </pattern>
        <pattern id="bps-gridM" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M80 0 H0 V80" fill="none" stroke="var(--accent)" strokeOpacity="0.16" strokeWidth="1" />
        </pattern>
        <linearGradient id="bps-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--g1)" />
          <stop offset="100%" stopColor="var(--g2)" />
        </linearGradient>
        <linearGradient id="bps-area-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="bps-area-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--viz-purple)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--viz-purple)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="bps-scan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
        {/* Ventana del chart: recorta el buffer y lo que ya se desplazó */}
        <clipPath id="bps-chartclip">
          <rect x="0" y="-6" width={CHART.w} height="64" />
        </clipPath>
      </defs>

      <g data-bp-grid>
        <rect width="320" height="200" fill="url(#bps-grid)" />
        <rect width="320" height="200" fill="url(#bps-gridM)" />
      </g>

      <g data-bp-solid>
        <rect x={F.x} y={F.y} width={F.w} height={F.h} rx={F.r} fill="var(--card)" stroke="var(--border-strong)" strokeWidth="1" />
        <path
          d={`M${F.x + F.r} ${F.y} H${SIDE_X} V${F.y + F.h} H${F.x + F.r} a${F.r} ${F.r} 0 0 1 -${F.r} -${F.r} V${F.y + F.r} a${F.r} ${F.r} 0 0 1 ${F.r} -${F.r} Z`}
          fill="var(--surface-2)"
        />
        <rect x="28" y="30" width="38" height="10" rx="5" fill="url(#bps-g)" />
        <path d="M28 56 h38 M28 72 h38 M28 88 h38 M28 104 h38" stroke="var(--dim)" strokeWidth="3" strokeLinecap="round" />

        {/* Tarjetas KPI — los números se animan con contador en Services.tsx */}
        <rect x="92" y="30" width="62" height="34" rx="5" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="1" />
        <rect x="164" y="30" width="62" height="34" rx="5" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="1" />
        <rect x="236" y="30" width="62" height="34" rx="5" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="1" />
        <rect x="102" y="39" width="20" height="4" rx="2" fill="var(--dim)" />
        <rect x="174" y="39" width="20" height="4" rx="2" fill="var(--dim)" />
        <rect x="246" y="39" width="20" height="4" rx="2" fill="var(--dim)" />
        <path d="M128 43 l3 -4 l3 4 Z" fill="var(--accent)" />
        <path d="M200 43 l3 -4 l3 4 Z" fill="var(--viz-purple)" />
        <path d="M272 43 l3 -4 l3 4 Z" fill="var(--accent)" />
        <text data-bp-counter data-count-min="1180" data-count-max="1440" data-count-sep="1" x="102" y="57" fontFamily={MONO} fontSize="13" fontWeight="600" fill="var(--text)">
          1,284
        </text>
        <text data-bp-counter data-count-min="90" data-count-max="99" data-count-suffix="%" x="174" y="57" fontFamily={MONO} fontSize="13" fontWeight="600" fill="var(--text)">
          96%
        </text>
        <text data-bp-counter data-count-min="28" data-count-max="72" data-count-suffix="k" x="246" y="57" fontFamily={MONO} fontSize="13" fontWeight="600" fill="var(--text)">
          54k
        </text>

        {/* Ejes del chart */}
        <path d={`M${CHART.x} 108 V166 H296`} fill="none" stroke="var(--border-strong)" strokeWidth="1" />
        <path d="M88 122 h4 M88 140 h4 M88 158 h4" stroke="var(--dim)" strokeWidth="1" strokeLinecap="round" />

        {/* Chart en vivo: dos líneas comparadas (azul + morada) */}
        <g transform={`translate(${CHART.x},${CHART.y})`}>
          <g clipPath="url(#bps-chartclip)">
            <g data-bp-linewrap>
              <path data-bp-area data-line="b" d={AREA_B} fill="url(#bps-area-b)" />
              <path data-bp-area data-line="a" d={AREA_A} fill="url(#bps-area-a)" />
              <path data-bp-line data-line="b" d={LINE_B} fill="none" stroke="var(--viz-purple)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path data-bp-line data-line="a" d={LINE_A} fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
        </g>
      </g>

      <g data-bp-lines fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round">
        <rect data-bp-draw x={F.x} y={F.y} width={F.w} height={F.h} rx={F.r} />
        <path data-bp-draw d={`M${SIDE_X} ${F.y} V${F.y + F.h}`} />
        <rect data-bp-draw x="28" y="30" width="38" height="10" rx="5" />
        <path data-bp-draw d="M28 56 h38 M28 72 h38 M28 88 h38 M28 104 h38" />
        <rect data-bp-draw x="92" y="30" width="62" height="34" rx="5" />
        <rect data-bp-draw x="164" y="30" width="62" height="34" rx="5" />
        <rect data-bp-draw x="236" y="30" width="62" height="34" rx="5" />
        <path data-bp-draw d="M100 54 h28 M172 54 h36 M244 54 h24" />
        <path data-bp-draw d={`M${CHART.x} 108 V166 H296`} />
        <path data-bp-draw d="M88 122 h4 M88 140 h4 M88 158 h4" strokeWidth="1" />
        <path data-bp-draw data-bp-chart d={LINE_A_VIS} transform={`translate(${CHART.x},${CHART.y})`} strokeLinejoin="round" />
        <g data-bp-dims strokeWidth="1" strokeOpacity="0.75">
          <path data-bp-draw d="M16 192 v-4 M304 192 v-4 M16 190 H304" />
          <path data-bp-draw d="M6 12 h8 M10 8 v8 M306 12 h8 M310 8 v8" strokeOpacity="0.5" />
        </g>
        <text data-bp-label x="160" y="199" fontFamily={MONO} fontSize="7" fill="var(--accent)" stroke="none" opacity="0.75" textAnchor="middle">
          1440
        </text>
        <text data-bp-label x="296" y="14" fontFamily={MONO} fontSize="7" fill="var(--accent)" stroke="none" opacity="0.75" textAnchor="end">
          v2.4
        </text>
      </g>

      <rect data-bp-scan x="0" y="0" width="28" height="200" fill="url(#bps-scan)" opacity="0" />
    </svg>
  );
}
