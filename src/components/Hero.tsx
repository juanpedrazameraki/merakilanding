import { useEffect, useState, type CSSProperties } from 'react';
import { useSite, useMediaFlag } from '../context/SiteContext';
import { onCtaMove, onCtaLeave } from '../utils/cta';
import HeroStage from './HeroStage';
import HeroParticles from './HeroParticles';
import './Hero.css';

const ROTATE_MS = 2600;

const srOnly: CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

export default function Hero() {
  const { T, wa, reducedMotion } = useSite();
  const stacked = useMediaFlag('(max-width: 1023px)');
  const words = T.hero.titleRotating;
  const [rot, setRot] = useState({ idx: 0, prev: -1 });

  useEffect(() => {
    setRot({ idx: 0, prev: -1 });
    if (reducedMotion) return;
    const iv = window.setInterval(() => {
      setRot((r) => ({ idx: (r.idx + 1) % words.length, prev: r.idx }));
    }, ROTATE_MS);
    return () => window.clearInterval(iv);
  }, [reducedMotion, words]);

  const rotator = (
    <span style={{ display: 'grid', overflow: 'hidden' }}>
      {words.map((w, i) => (
        <span
          key={w}
          style={{
            gridArea: '1 / 1',
            whiteSpace: 'nowrap',
            justifySelf: stacked ? 'center' : 'start',
            background: 'linear-gradient(90deg,var(--g1),var(--g2))',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            opacity: i === rot.idx ? 1 : 0,
            transform:
              i === rot.idx
                ? 'none'
                : i === rot.prev
                  ? 'translateY(-0.55em)'
                  : 'translateY(0.55em)',
            transition: 'opacity .45s ease, transform .45s cubic-bezier(.22,.61,.36,1)',
            pointerEvents: 'none',
          }}
        >
          {w}
        </span>
      ))}
    </span>
  );

  const copy = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: stacked ? 'center' : 'flex-start',
        textAlign: stacked ? 'center' : 'left',
      }}
    >
      <div
        data-reveal=""
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '9px',
          padding: '6px 13px',
          border: '1px solid var(--border)',
          borderRadius: '999px',
          background: 'var(--surface)',
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '.72rem',
          letterSpacing: '.09em',
          color: 'var(--muted)',
          marginBottom: '18px',
          textTransform: 'uppercase',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: 'var(--accent)',
            boxShadow: '0 0 0 3px rgba(34,211,238,.18)',
            animation: 'mc-pulse 2.4s infinite',
          }}
        ></span>
        {T.hero.badge}
      </div>
      <h1
        data-reveal=""
        data-reveal-delay="60"
        style={{
          margin: 0,
          fontSize: 'clamp(2.05rem,3.4vw,3.25rem)',
          lineHeight: 1.08,
          letterSpacing: '-.03em',
          fontWeight: 800,
        }}
      >
        <span style={srOnly}>
          {`${T.hero.titlePrefix} ${words[0]} ${T.hero.titleSuffix}`}
        </span>
        <span aria-hidden="true" style={{ display: 'block' }}>
          <span style={{ display: 'block' }}>{T.hero.titlePrefix}</span>
          {rotator}
          <span style={{ display: 'block' }}>{T.hero.titleSuffix}</span>
        </span>
      </h1>
      <p
        data-reveal=""
        data-reveal-delay="120"
        style={{
          margin: '14px 0 26px',
          fontSize: 'clamp(1rem,1.2vw,1.12rem)',
          lineHeight: 1.6,
          color: 'var(--muted)',
          maxWidth: '44ch',
          textWrap: 'pretty',
        }}
      >
        {T.hero.subtitle}
      </p>
      <div
        data-reveal=""
        data-reveal-delay="180"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '14px',
          justifyContent: stacked ? 'center' : 'flex-start',
        }}
      >
        <a
          href={wa(T.wa.hero)}
          target="_blank"
          rel="noopener"
          onMouseMove={onCtaMove}
          onMouseLeave={onCtaLeave}
          className="mc-hero-cta-primary"
        >
          <span
            data-shine
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0,
              transition: 'opacity .3s',
              background:
                'radial-gradient(150px circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,.4),transparent 60%)',
              pointerEvents: 'none',
            }}
          ></span>
          <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">
            <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.02zm-7.01 15.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 1 1 15.2-4.38c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.38-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03 0 1.2.87 2.36.99 2.52.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z"></path>
          </svg>
          {T.hero.ctaPrimary}
        </a>
        <a
          href="#services"
          onMouseMove={onCtaMove}
          onMouseLeave={onCtaLeave}
          className="mc-hero-cta-secondary"
        >
          {T.hero.ctaSecondary}
          <svg
            viewBox="0 0 24 24"
            width="17"
            height="17"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6"></path>
          </svg>
        </a>
      </div>
      <p
        data-reveal=""
        data-reveal-delay="240"
        style={{
          margin: '18px 0 0',
          fontSize: '.86rem',
          color: 'var(--dim)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
        {T.hero.trust}
      </p>
    </div>
  );

  return (
    <section
      id="hero"
      className="mc-hero"
      style={{
        position: 'relative',
        scrollMarginTop: '84px',
        padding: 'clamp(20px,3.5vh,44px) 0',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(58% 52% at 80% 4%,var(--glow-2),transparent 60%),radial-gradient(52% 54% at 8% 22%,var(--glow-1),transparent 62%)',
          pointerEvents: 'none',
        }}
      ></div>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
          WebkitMaskImage: 'radial-gradient(ellipse 78% 62% at 50% 0%,#000 18%,transparent 74%)',
          maskImage: 'radial-gradient(ellipse 78% 62% at 50% 0%,#000 18%,transparent 74%)',
          pointerEvents: 'none',
        }}
      ></div>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '-6%',
          transform: 'translateX(-50%)',
          width: 'min(1100px,118%)',
          height: '66%',
          background: 'radial-gradient(50% 60% at 50% 55%,rgba(34,211,238,.14),transparent 72%)',
          filter: 'blur(28px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      ></div>
      <HeroParticles />

      <div
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(16px,4vw,24px)',
          ...(stacked
            ? {
                display: 'flex',
                flexDirection: 'column' as const,
                alignItems: 'center',
                gap: 'clamp(24px,4vh,36px)',
              }
            : {
                display: 'grid',
                gridTemplateColumns: '1.05fr 1fr',
                gap: 'clamp(32px,4vw,56px)',
                alignItems: 'center',
              }),
        }}
      >
        {copy}
        <div
          className="mc-hero-stagewrap"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: stacked ? '560px' : 'none',
          }}
        >
          <HeroStage />
        </div>
      </div>
    </section>
  );
}
