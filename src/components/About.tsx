import { useSite } from '../context/SiteContext';
import './About.css';

export default function About() {
  const { T } = useSite();

  return (
    <section
      id="about"
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
          style={{ maxWidth: 760, margin: '0 auto clamp(40px,5vw,60px)', textAlign: 'center' }}
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
              justifyContent: 'center',
              gap: 11,
            }}
          >
            <span
              aria-hidden="true"
              style={{ width: 22, height: 1, background: 'var(--accent)', display: 'inline-block' }}
            ></span>
            {T.about.eyebrow}
          </div>
          <h2
            style={{
              fontSize: 'clamp(1.85rem,3.6vw,2.7rem)',
              fontWeight: 800,
              letterSpacing: '-.022em',
              lineHeight: 1.1,
              margin: '0 0 20px',
            }}
          >
            {T.about.heading}
          </h2>
          <p
            style={{
              fontSize: 'clamp(1.05rem,1.5vw,1.24rem)',
              color: 'var(--muted)',
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {T.about.mission}
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,210px),1fr))',
            gap: 18,
            maxWidth: 960,
            margin: '0 auto',
          }}
        >
          {T.about.team.map((member, i) => (
            <div key={i} data-reveal="" className="mc-about-card">
              <div
                aria-hidden="true"
                style={{
                  width: 86,
                  height: 86,
                  borderRadius: '50%',
                  margin: '0 auto 18px',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg,rgba(37,99,235,.5),rgba(34,211,238,.38))',
                  border: '1px solid var(--border-strong)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'repeating-linear-gradient(135deg,rgba(255,255,255,.07) 0 1px,transparent 1px 9px)',
                  }}
                ></div>
                <svg
                  viewBox="0 0 24 24"
                  width="52"
                  height="52"
                  fill="rgba(255,255,255,.82)"
                  aria-hidden="true"
                  style={{ position: 'relative' }}
                >
                  <circle cx="12" cy="9" r="4"></circle>
                  <path d="M4 21c0-4.2 3.6-7 8-7s8 2.8 8 7z"></path>
                </svg>
              </div>
              <div style={{ fontWeight: 700, fontSize: '1.02rem', marginBottom: 4 }}>
                {member.name}
              </div>
              <div
                style={{
                  fontSize: '.85rem',
                  color: 'var(--muted)',
                  marginBottom: 16,
                  lineHeight: 1.4,
                }}
              >
                {member.role}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <a href="#" aria-label="LinkedIn" className="mc-about-social">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57z"></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
