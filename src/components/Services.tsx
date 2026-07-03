import React from 'react';
import { useSite } from '../context/SiteContext';
import './Services.css';

const iconWrapStyle: React.CSSProperties = {
  width: 52,
  height: 52,
  borderRadius: 13,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg,rgba(37,99,235,.16),rgba(34,211,238,.16))',
  border: '1px solid var(--border)',
  color: 'var(--accent)',
  marginBottom: 22,
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

export default function Services() {
  const { T } = useSite();

  return (
    <section
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
          <div data-reveal="" className="mc-svc-card">
            <div aria-hidden="true" style={iconWrapStyle}>
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2.5" y="4" width="19" height="13" rx="2"></rect>
                <path d="M8 20h8M12 17v3"></path>
                <path d="M2.5 9h19"></path>
              </svg>
            </div>
            <h3 style={cardTitleStyle}>{T.services.web.title}</h3>
            <p style={cardDescStyle}>{T.services.web.desc}</p>
          </div>
          <div data-reveal="" data-reveal-delay="90" className="mc-svc-card">
            <div aria-hidden="true" style={iconWrapStyle}>
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="9" rx="1.4"></rect>
                <rect x="14" y="3" width="7" height="5" rx="1.4"></rect>
                <rect x="14" y="12" width="7" height="9" rx="1.4"></rect>
                <rect x="3" y="16" width="7" height="5" rx="1.4"></rect>
              </svg>
            </div>
            <h3 style={cardTitleStyle}>{T.services.saas.title}</h3>
            <p style={cardDescStyle}>{T.services.saas.desc}</p>
          </div>
          <div data-reveal="" data-reveal-delay="180" className="mc-svc-card">
            <div aria-hidden="true" style={iconWrapStyle}>
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3.5" y="3.5" width="7" height="7" rx="1.6"></rect>
                <rect x="13.5" y="13.5" width="7" height="7" rx="1.6"></rect>
                <path d="M10.5 7h3.5a2 2 0 0 1 2 2v4.5"></path>
              </svg>
            </div>
            <h3 style={cardTitleStyle}>{T.services.custom.title}</h3>
            <p style={cardDescStyle}>{T.services.custom.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
