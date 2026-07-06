/* Plano "Software a medida": diagrama de sistemas conectados. Los cables se
   dibujan de afuera hacia el nodo central (la app) — "conectando sistemas".
   Nombres de nodos viven en la capa solid; etiquetas de protocolo (REST/SQL)
   son parte del plano y se desvanecen al solidificar. */

const APP = { x: 128, y: 78, w: 64, h: 44, r: 8 };
const MONO = "'JetBrains Mono',monospace";

const WIRE_API = 'M64 60 V88 H128';
const WIRE_DB = 'M240 71 V100 H192';
const WIRE_CRM = 'M64 140 V112 H128';
const WIRE_PAY = 'M256 140 V112 H192';

/* Rutas del "flujo de datos": mismas líneas pero trazadas del NODO CENTRAL
   hacia afuera, para que el pulso salga del centro y viaje a cada sistema.
   El orden del array = orden de emisión (API → PAY → DB → CRM). */
const FLOW_API = 'M128 88 H64 V60';
const FLOW_PAY = 'M192 112 H256 V140';
const FLOW_DB = 'M192 100 H240 V71';
const FLOW_CRM = 'M128 112 H64 V140';
const PORTS =
  'M125.5 88 a2.5 2.5 0 1 0 5 0 a2.5 2.5 0 1 0 -5 0 M189.5 100 a2.5 2.5 0 1 0 5 0 a2.5 2.5 0 1 0 -5 0 M125.5 112 a2.5 2.5 0 1 0 5 0 a2.5 2.5 0 1 0 -5 0 M189.5 112 a2.5 2.5 0 1 0 5 0 a2.5 2.5 0 1 0 -5 0';
const GLYPH = 'M150 94 l-7 6 7 6 M170 94 l7 6 -7 6 M164 92 l-8 20';

export default function BlueprintCustom() {
  return (
    <svg viewBox="0 0 320 200" width="100%" height="100%" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="bpc-grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0 H0 V16" fill="none" stroke="var(--accent)" strokeOpacity="0.1" strokeWidth="1" />
        </pattern>
        <pattern id="bpc-gridM" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M80 0 H0 V80" fill="none" stroke="var(--accent)" strokeOpacity="0.16" strokeWidth="1" />
        </pattern>
        <linearGradient id="bpc-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--g1)" />
          <stop offset="100%" stopColor="var(--g2)" />
        </linearGradient>
        <linearGradient id="bpc-scan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g data-bp-grid>
        <rect width="320" height="200" fill="url(#bpc-grid)" />
        <rect width="320" height="200" fill="url(#bpc-gridM)" />
      </g>

      <g data-bp-solid>
        <path d={WIRE_API} fill="none" stroke="var(--border-strong)" strokeWidth="1.5" />
        <path d={WIRE_DB} fill="none" stroke="var(--border-strong)" strokeWidth="1.5" />
        <path d={WIRE_CRM} fill="none" stroke="var(--border-strong)" strokeWidth="1.5" />
        <path d={WIRE_PAY} fill="none" stroke="var(--border-strong)" strokeWidth="1.5" />
        <rect x="36" y="32" width="56" height="28" rx="6" fill="var(--card)" stroke="var(--border-strong)" strokeWidth="1" />
        <path d="M216 36 V64 a24 7 0 0 0 48 0 V36" fill="var(--card)" stroke="var(--border-strong)" strokeWidth="1" />
        <ellipse cx="240" cy="36" rx="24" ry="7" fill="var(--surface-2)" stroke="var(--border-strong)" strokeWidth="1" />
        <rect x="36" y="140" width="56" height="28" rx="6" fill="var(--card)" stroke="var(--border-strong)" strokeWidth="1" />
        <rect x="228" y="140" width="56" height="28" rx="6" fill="var(--card)" stroke="var(--border-strong)" strokeWidth="1" />
        <rect x={APP.x} y={APP.y} width={APP.w} height={APP.h} rx={APP.r} fill="var(--card)" stroke="var(--accent)" strokeWidth="1.5" />
        <rect data-bp-breathe data-breathe-min="0.1" data-breathe-max="0.28" x={APP.x} y={APP.y} width={APP.w} height={APP.h} rx={APP.r} fill="url(#bpc-g)" opacity="0.12" />
        <path d={GLYPH} fill="none" stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d={PORTS} fill="var(--accent)" stroke="none" />
        <text x="64" y="50" fontFamily={MONO} fontSize="7.5" fill="var(--muted)" textAnchor="middle">
          API
        </text>
        <text x="240" y="55" fontFamily={MONO} fontSize="7.5" fill="var(--muted)" textAnchor="middle">
          DB
        </text>
        <text x="64" y="158" fontFamily={MONO} fontSize="7.5" fill="var(--muted)" textAnchor="middle">
          CRM
        </text>
        <text x="256" y="158" fontFamily={MONO} fontSize="7.5" fill="var(--muted)" textAnchor="middle">
          PAY
        </text>
      </g>

      <g data-bp-lines fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round">
        <rect data-bp-draw x={APP.x} y={APP.y} width={APP.w} height={APP.h} rx={APP.r} />
        <path data-bp-draw d={GLYPH} strokeLinejoin="round" />
        <rect data-bp-draw x="36" y="32" width="56" height="28" rx="6" />
        <ellipse data-bp-draw cx="240" cy="36" rx="24" ry="7" />
        <path data-bp-draw d="M216 36 V64 a24 7 0 0 0 48 0 V36" />
        <rect data-bp-draw x="36" y="140" width="56" height="28" rx="6" />
        <rect data-bp-draw x="228" y="140" width="56" height="28" rx="6" />
        <path data-bp-draw d={WIRE_API} />
        <path data-bp-draw d={WIRE_DB} />
        <path data-bp-draw d={WIRE_CRM} />
        <path data-bp-draw d={WIRE_PAY} />
        <path data-bp-draw d={PORTS} strokeWidth="1" />
        <g data-bp-dims strokeWidth="1" strokeOpacity="0.75">
          <path data-bp-draw d="M128 134 v-4 M192 134 v-4 M128 132 H192" />
          <path data-bp-draw d="M6 12 h8 M10 8 v8 M306 12 h8 M310 8 v8" strokeOpacity="0.5" />
        </g>
        <text data-bp-label x="98" y="84" fontFamily={MONO} fontSize="7" fill="var(--accent)" stroke="none" opacity="0.75" textAnchor="middle">
          REST
        </text>
        <text data-bp-label x="218" y="95" fontFamily={MONO} fontSize="7" fill="var(--accent)" stroke="none" opacity="0.75" textAnchor="middle">
          SQL
        </text>
        <text data-bp-label x="160" y="142" fontFamily={MONO} fontSize="7" fill="var(--accent)" stroke="none" opacity="0.75" textAnchor="middle">
          64
        </text>
      </g>

      {/* Capa de flujo: pulsos de luz que viajan por cada cable (los anima
          Services.tsx en bucle). pathLength=100 → el dash mide en % del cable. */}
      <g data-bp-flowlayer fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path data-bp-flow pathLength={100} d={FLOW_API} />
        <path data-bp-flow pathLength={100} d={FLOW_PAY} />
        <path data-bp-flow pathLength={100} d={FLOW_DB} />
        <path data-bp-flow pathLength={100} d={FLOW_CRM} />
      </g>

      <rect data-bp-scan x="0" y="0" width="28" height="200" fill="url(#bpc-scan)" opacity="0" />
    </svg>
  );
}
