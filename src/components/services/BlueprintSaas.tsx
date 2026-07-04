/* Plano "SaaS": dashboard que se dibuja (sidebar, stat cards, ejes) y remata
   con la línea de chart trazándose sola (data-bp-chart, tween propio), luego
   se solidifica con área en gradiente y dot final. */
import { genSeries, linePath, areaPath, endOf } from '../../utils/chartPaths';

const F = { x: 16, y: 18, w: 288, h: 164, r: 8 };
const SIDE_X = 78;
const CHART = { x: 92, y: 110, w: 204, h: 52, pad: 4 };

const S = genSeries(5, 36, 0.14, 0.8, (t) => 0.2 + 0.55 * t + 0.15 * Math.sin(t * 4));
const LINE = linePath(S, CHART.w, CHART.h, CHART.pad);
const AREA = areaPath(S, CHART.w, CHART.h, CHART.pad);
const END = endOf(S, CHART.w, CHART.h, CHART.pad);

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
        <linearGradient id="bps-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--g2)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--g2)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="bps-scan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
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
        <rect x="92" y="30" width="62" height="34" rx="5" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="1" />
        <rect x="164" y="30" width="62" height="34" rx="5" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="1" />
        <rect x="236" y="30" width="62" height="34" rx="5" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="1" />
        <path d="M100 54 h28" stroke="url(#bps-g)" strokeWidth="3" strokeLinecap="round" />
        <path d="M172 54 h36 M244 54 h24" stroke="var(--dim)" strokeWidth="3" strokeLinecap="round" />
        <rect x="140" y="37" width="8" height="6" rx="2" fill="var(--accent)" opacity="0.8" />
        <path d={`M${CHART.x} 108 V166 H296`} fill="none" stroke="var(--border-strong)" strokeWidth="1" />
        <g transform={`translate(${CHART.x},${CHART.y})`}>
          <path d={AREA} fill="url(#bps-area)" />
          <path data-bp-accent d={LINE} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={END.x} cy={END.y} r="3" fill="var(--accent)" />
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
        <path data-bp-draw data-bp-chart d={LINE} transform={`translate(${CHART.x},${CHART.y})`} strokeLinejoin="round" />
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
