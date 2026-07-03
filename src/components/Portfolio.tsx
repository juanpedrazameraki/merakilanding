import { useSite } from '../context/SiteContext';
import './Portfolio.css';

export default function Portfolio() {
  const { T } = useSite();

  return (
    <section
      id="portfolio"
      style={{
        scrollMarginTop: '84px',
        padding: 'clamp(58px,9vw,106px) 0',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(16px,4vw,24px)',
        }}
      >
        <div
          data-reveal=""
          style={{ maxWidth: '640px', marginBottom: 'clamp(36px,5vw,56px)' }}
        >
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
            <span
              aria-hidden="true"
              style={{
                width: '22px',
                height: '1px',
                background: 'var(--accent)',
                display: 'inline-block',
              }}
            ></span>
            {T.portfolio.eyebrow}
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
            {T.portfolio.heading}
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem,1.3vw,1.14rem)',
              color: 'var(--muted)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {T.portfolio.sub}
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,290px),1fr))',
            gap: '20px',
          }}
        >
          {T.portfolio.items.map((item, i) => (
            <div key={i} data-reveal="" className="mc-pf-card">
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '16/10',
                  background:
                    'linear-gradient(135deg,rgba(37,99,235,.30),rgba(34,211,238,.16))',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'repeating-linear-gradient(135deg,var(--grid) 0 1px,transparent 1px 12px)',
                  }}
                ></div>
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    background:
                      'radial-gradient(circle,rgba(34,211,238,.45),transparent 70%)',
                    filter: 'blur(14px)',
                  }}
                ></div>
                <svg
                  viewBox="0 0 24 24"
                  width="34"
                  height="34"
                  fill="none"
                  stroke="rgba(255,255,255,.55)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ position: 'relative' }}
                >
                  <rect x="3" y="3" width="18" height="18" rx="2.5"></rect>
                  <circle cx="8.5" cy="8.5" r="1.6"></circle>
                  <path d="m21 15-5-5L5 21"></path>
                </svg>
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 11px',
                    borderRadius: '999px',
                    background: 'rgba(10,10,16,.55)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    border: '1px solid rgba(255,255,255,.16)',
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: '.68rem',
                    letterSpacing: '.05em',
                    color: '#fff',
                    textTransform: 'uppercase',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#22D3EE',
                    }}
                  ></span>
                  {T.portfolio.soon}
                </span>
              </div>
              <div
                style={{
                  padding: '17px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: '1rem',
                    letterSpacing: '-.01em',
                  }}
                >
                  {item.category}
                </span>
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="var(--dim)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17 17 7M8 7h9v9"></path>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
