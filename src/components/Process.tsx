import type { CSSProperties, ReactNode } from 'react';
import { useSite } from '../context/SiteContext';

const cardStyle: CSSProperties = {
  position: 'relative',
  border: '1px solid var(--border)',
  borderRadius: 16,
  padding: '26px 24px',
  background: 'var(--card)',
  overflow: 'hidden',
};

const numStyle: CSSProperties = {
  position: 'absolute',
  top: 16,
  right: 20,
  fontFamily: "'JetBrains Mono',monospace",
  fontSize: '2.5rem',
  fontWeight: 700,
  lineHeight: 1,
  background: 'linear-gradient(135deg,var(--g1),var(--g2))',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  opacity: 0.3,
};

const iconBoxStyle: CSSProperties = {
  width: 46,
  height: 46,
  borderRadius: 12,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg,rgba(37,99,235,.16),rgba(34,211,238,.16))',
  border: '1px solid var(--border)',
  color: 'var(--accent)',
  marginBottom: 20,
};

const titleStyle: CSSProperties = {
  fontSize: '1.08rem',
  fontWeight: 700,
  margin: '0 0 9px',
  letterSpacing: '-.01em',
};

const descStyle: CSSProperties = {
  fontSize: '.92rem',
  color: 'var(--muted)',
  lineHeight: 1.6,
  margin: 0,
};

const icons: ReactNode[] = [
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="7"></circle>
    <path d="m21 21-4.3-4.3"></path>
  </svg>,
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20h9"></path>
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
  </svg>,
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m16 18 6-6-6-6M8 6l-6 6 6 6"></path>
  </svg>,
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
  </svg>,
];

const nums = ['01', '02', '03', '04'] as const;
const delays = [0, 90, 180, 270] as const;

export default function Process() {
  const { T } = useSite();
  const steps = [T.process.s1, T.process.s2, T.process.s3, T.process.s4];

  return (
    <section
      id="process"
      style={{
        scrollMarginTop: 84,
        padding: 'clamp(58px,9vw,106px) 0',
        position: 'relative',
        background: 'var(--bg-soft)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px,4vw,24px)' }}>
        <div
          data-reveal=""
          style={{ maxWidth: 640, marginBottom: 'clamp(36px,5vw,56px)' }}
        >
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
            {T.process.eyebrow}
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
            {T.process.heading}
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem,1.3vw,1.14rem)',
              color: 'var(--muted)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {T.process.sub}
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,236px),1fr))',
            gap: 18,
          }}
        >
          {steps.map((step, i) => (
            <div
              key={nums[i]}
              data-reveal=""
              data-reveal-delay={delays[i] === 0 ? undefined : delays[i]}
              style={cardStyle}
            >
              <span aria-hidden="true" style={numStyle}>
                {nums[i]}
              </span>
              <div aria-hidden="true" style={iconBoxStyle}>
                {icons[i]}
              </div>
              <h3 style={titleStyle}>{step.title}</h3>
              <p style={descStyle}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
