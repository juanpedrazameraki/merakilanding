import type { CSSProperties } from 'react';
import { useSite } from '../context/SiteContext';
import StackViz from './StackViz';

export default function StackSection() {
  const { T } = useSite();

  return (
    <section
      id="stack"
      className="mc-darksec"
      style={{
        scrollMarginTop: '84px',
        padding: 'clamp(64px,9vw,112px) 0',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-soft)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)',
          backgroundSize: '52px 52px',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%,#000,transparent 78%)',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%,#000,transparent 78%)',
          pointerEvents: 'none',
        }}
      ></div>
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(16px,4vw,24px)',
        }}
      >
        <div className="mc-stackwrap" style={{ position: 'relative' }}>
          <div
            className="mc-stackcenter"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%,-50%)',
              zIndex: 15,
              width: 'min(460px,82%)',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '.76rem',
                letterSpacing: '.18em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: '16px',
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
              {T.stack.eyebrow}
            </div>
            <h2
              style={
                {
                  fontSize: 'clamp(1.7rem,3.2vw,2.5rem)',
                  fontWeight: 800,
                  letterSpacing: '-.025em',
                  lineHeight: 1.08,
                  margin: '0 0 16px',
                  textWrap: 'balance',
                  color: 'var(--text)',
                } as CSSProperties
              }
            >
              {T.stack.coreLead}
              <span
                style={{
                  background: 'linear-gradient(120deg,var(--g1),var(--g2))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {T.stack.coreHi}
              </span>
            </h2>
            <p
              style={
                {
                  fontSize: 'clamp(.96rem,1.2vw,1.08rem)',
                  color: 'var(--muted)',
                  lineHeight: 1.6,
                  margin: '0 auto',
                  maxWidth: '38ch',
                  textWrap: 'pretty',
                } as CSSProperties
              }
            >
              {T.stack.sub}
            </p>
          </div>
          <StackViz />
        </div>
      </div>
    </section>
  );
}
