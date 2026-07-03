import type { CSSProperties } from 'react';
import { useSite } from '../context/SiteContext';
import './Pricing.css';

/* Estilos compartidos entre las tres tarjetas (valores idénticos al original) */
const cardStyle: CSSProperties = {
  position: 'relative',
  border: '1px solid var(--border)',
  borderRadius: '18px',
  padding: '32px 28px',
  background: 'var(--card)',
  display: 'flex',
  flexDirection: 'column',
};

const planNameStyle: CSSProperties = {
  fontSize: '1.24rem',
  fontWeight: 700,
  margin: '0 0 5px',
};

const planTagStyle: CSSProperties = {
  fontSize: '.9rem',
  color: 'var(--muted)',
  margin: '0 0 22px',
};

const fromLabelStyle: CSSProperties = {
  fontFamily: "'JetBrains Mono',monospace",
  fontSize: '.72rem',
  letterSpacing: '.1em',
  textTransform: 'uppercase',
  color: 'var(--dim)',
  marginBottom: '4px',
};

const dividerStyle: CSSProperties = {
  height: '1px',
  background: 'var(--border)',
  marginBottom: '22px',
};

const featureListStyle: CSSProperties = {
  listStyle: 'none',
  margin: '0 0 28px',
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '13px',
  flex: 1,
};

const featureItemStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '11px',
  fontSize: '.94rem',
  color: 'var(--muted)',
  lineHeight: 1.45,
};

function FeatureList({ features }: { features: { t: string }[] }) {
  return (
    <ul style={featureListStyle}>
      {features.map((feat, i) => (
        <li key={i} style={featureItemStyle}>
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ flexShrink: 0, marginTop: '1px' }}
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span>{feat.t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Pricing() {
  const { T, wa } = useSite();
  const waEsencial = wa(T.wa.planEsencial);
  const waPro = wa(T.wa.planPro);
  const waCustom = wa(T.wa.planCustom);

  return (
    <section
      id="pricing"
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
          style={{
            maxWidth: '640px',
            margin: '0 auto clamp(38px,5vw,56px)',
            textAlign: 'center',
          }}
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
              justifyContent: 'center',
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
            {T.pricing.eyebrow}
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
            {T.pricing.heading}
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem,1.3vw,1.14rem)',
              color: 'var(--muted)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {T.pricing.sub}
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,285px),1fr))',
            gap: '20px',
            alignItems: 'stretch',
          }}
        >
          {/* Plan Esencial */}
          <div data-reveal="" style={cardStyle}>
            <h3 style={planNameStyle}>{T.pricing.essential.name}</h3>
            <p style={planTagStyle}>{T.pricing.essential.tag}</p>
            <div style={fromLabelStyle}>{T.pricing.from}</div>
            <div
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                letterSpacing: '-.02em',
                marginBottom: '24px',
                color: 'var(--text)',
              }}
            >
              {T.pricing.essential.price}
            </div>
            <div style={dividerStyle}></div>
            <FeatureList features={T.pricing.essential.features} />
            <a
              href={waEsencial}
              target="_blank"
              rel="noopener"
              className="mc-price-cta-ghost"
            >
              {T.pricing.essential.cta}
            </a>
          </div>

          {/* Plan Profesional (destacado) */}
          <div
            data-reveal=""
            data-reveal-delay="90"
            style={{
              position: 'relative',
              border: '1.5px solid var(--accent)',
              borderRadius: '18px',
              padding: '32px 28px',
              background: 'var(--card)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow:
                '0 0 0 1px rgba(34,211,238,.25),0 24px 60px -30px rgba(34,211,238,.5)',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '-13px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 15px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg,var(--g1),var(--g2))',
                color: '#fff',
                fontSize: '.72rem',
                fontWeight: 700,
                letterSpacing: '.04em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                boxShadow: '0 8px 20px -8px rgba(34,211,238,.8)',
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="13"
                height="13"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="m12 2 2.9 6.3 6.9.6-5.2 4.5 1.6 6.7L12 17.3 5.8 20.6l1.6-6.7L2.2 8.9l6.9-.6z" />
              </svg>
              {T.pricing.popular}
            </span>
            <h3 style={planNameStyle}>{T.pricing.pro.name}</h3>
            <p style={planTagStyle}>{T.pricing.pro.tag}</p>
            <div style={fromLabelStyle}>{T.pricing.from}</div>
            <div
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                letterSpacing: '-.02em',
                marginBottom: '24px',
                background: 'linear-gradient(135deg,var(--g1),var(--g2))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {T.pricing.pro.price}
            </div>
            <div style={dividerStyle}></div>
            <FeatureList features={T.pricing.pro.features} />
            <a
              href={waPro}
              target="_blank"
              rel="noopener"
              className="mc-price-cta-primary"
            >
              <svg
                viewBox="0 0 24 24"
                width="17"
                height="17"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.02zm-7.01 15.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 1 1 15.2-4.38c0 4.54-3.7 8.24-8.24 8.24z" />
              </svg>
              {T.pricing.pro.cta}
            </a>
          </div>

          {/* Plan A medida */}
          <div data-reveal="" data-reveal-delay="180" style={cardStyle}>
            <h3 style={planNameStyle}>{T.pricing.custom.name}</h3>
            <p style={planTagStyle}>{T.pricing.custom.tag}</p>
            <div style={fromLabelStyle}>{'\u00A0'}</div>
            <div
              style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                letterSpacing: '-.01em',
                marginBottom: '24px',
                color: 'var(--text)',
                lineHeight: 1.2,
              }}
            >
              {T.pricing.custom.price}
            </div>
            <div style={dividerStyle}></div>
            <FeatureList features={T.pricing.custom.features} />
            <a
              href={waCustom}
              target="_blank"
              rel="noopener"
              className="mc-price-cta-ghost"
            >
              {T.pricing.custom.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
