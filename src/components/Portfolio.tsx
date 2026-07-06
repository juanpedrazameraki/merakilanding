import { useSite } from '../context/SiteContext';
import './Portfolio.css';

// Repite un array hasta tener al menos `min` elementos (para que una "copia"
// del carrusel sea más ancha que cualquier viewport y no queden huecos).
function repeatTo<T>(arr: T[], min: number): T[] {
  const out: T[] = [];
  while (out.length < min && arr.length) out.push(...arr);
  return out;
}

function PfCard({ category, soon }: { category: string; soon: string }) {
  return (
    <article className="mc-pf-card" aria-hidden="true">
      <div className="mc-pf-thumb">
        <div className="mc-pf-thumb-grid" />
        <div className="mc-pf-thumb-glow" />
        <svg
          viewBox="0 0 24 24"
          width="34"
          height="34"
          fill="none"
          stroke="rgba(255,255,255,.55)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mc-pf-thumb-icon"
        >
          <rect x="3" y="3" width="18" height="18" rx="2.5" />
          <circle cx="8.5" cy="8.5" r="1.6" />
          <path d="m21 15-5-5L5 21" />
        </svg>
        <span className="mc-pf-badge">
          <span className="mc-pf-badge-dot" />
          {soon}
        </span>
      </div>
      <div className="mc-pf-meta">
        <span className="mc-pf-cat">{category}</span>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--dim)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const { T } = useSite();
  const items = T.portfolio.items;

  // Fila superior: orden original. Fila inferior: rotada, para que no queden
  // las mismas categorías alineadas verticalmente. Cada "base" se duplica
  // (los dos tramos son idénticos) para que el loop translateX(-50%) no corte.
  const baseTop = repeatTo(items, 10);
  const baseBottom = repeatTo([...items.slice(3), ...items.slice(0, 3)], 10);
  const trackTop = [...baseTop, ...baseTop];
  const trackBottom = [...baseBottom, ...baseBottom];

  return (
    <section
      id="portfolio"
      style={{
        scrollMarginTop: '84px',
        padding: 'clamp(58px,9vw,106px) 0',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(16px,4vw,24px)' }}>
        <div data-reveal="" style={{ maxWidth: '640px', marginBottom: 'clamp(36px,5vw,56px)' }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: '.76rem',
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '11px',
            }}
          >
            <span aria-hidden="true" style={{ width: '22px', height: '1px', background: 'var(--accent)', display: 'inline-block' }} />
            {T.portfolio.eyebrow}
          </div>
          <h2 style={{ fontSize: 'clamp(1.85rem,3.6vw,2.7rem)', fontWeight: 800, letterSpacing: '-.022em', lineHeight: 1.1, margin: '0 0 16px' }}>
            {T.portfolio.heading}
          </h2>
          <p style={{ fontSize: 'clamp(1rem,1.3vw,1.14rem)', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
            {T.portfolio.sub}
          </p>
        </div>
      </div>

      {/* Carrusel a todo el ancho: dos filas en sentidos opuestos, en bucle */}
      <div className="mc-pf-rows" data-reveal="" aria-hidden="true">
        <div className="mc-pf-row">
          <div className="mc-pf-track mc-pf-track--reverse">
            {trackTop.map((item, i) => (
              <PfCard key={i} category={item.category} soon={T.portfolio.soon} />
            ))}
          </div>
        </div>
        <div className="mc-pf-row">
          <div className="mc-pf-track mc-pf-track--slow">
            {trackBottom.map((item, i) => (
              <PfCard key={i} category={item.category} soon={T.portfolio.soon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
