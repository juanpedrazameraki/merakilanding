import { useSite } from '../context/SiteContext';
import { onCtaMove, onCtaLeave } from '../utils/cta';
import HeroStage from './HeroStage';
import './Hero.css';

export default function Hero() {
  const { T, wa } = useSite();

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        scrollMarginTop: '84px',
        padding: 'clamp(84px,13vh,140px) 0 clamp(56px,9vh,104px)',
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
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: 'var(--accent)',
            opacity: 0.45,
            animation: 'mc-drift 15s ease-in-out infinite',
          }}
        ></span>
        <span
          style={{
            position: 'absolute',
            top: '34%',
            left: '84%',
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            background: 'var(--primary)',
            opacity: 0.4,
            animation: 'mc-drift 18s ease-in-out infinite 1s',
          }}
        ></span>
        <span
          style={{
            position: 'absolute',
            top: '63%',
            left: '16%',
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            background: 'var(--accent)',
            opacity: 0.32,
            animation: 'mc-drift 20s ease-in-out infinite 2s',
          }}
        ></span>
        <span
          style={{
            position: 'absolute',
            top: '14%',
            left: '52%',
            width: '2px',
            height: '2px',
            borderRadius: '50%',
            background: 'var(--accent)',
            opacity: 0.4,
            animation: 'mc-drift 16s ease-in-out infinite .5s',
          }}
        ></span>
        <span
          style={{
            position: 'absolute',
            top: '73%',
            left: '70%',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: 'var(--primary)',
            opacity: 0.3,
            animation: 'mc-drift 22s ease-in-out infinite 1.5s',
          }}
        ></span>
        <span
          style={{
            position: 'absolute',
            top: '46%',
            left: '6%',
            width: '2px',
            height: '2px',
            borderRadius: '50%',
            background: 'var(--accent)',
            opacity: 0.4,
            animation: 'mc-drift 17s ease-in-out infinite 3s',
          }}
        ></span>
        <span
          style={{
            position: 'absolute',
            top: '80%',
            left: '44%',
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            background: 'var(--accent)',
            opacity: 0.3,
            animation: 'mc-drift 19s ease-in-out infinite 2.5s',
          }}
        ></span>
        <span
          style={{
            position: 'absolute',
            top: '26%',
            left: '32%',
            width: '2px',
            height: '2px',
            borderRadius: '50%',
            background: 'var(--primary)',
            opacity: 0.35,
            animation: 'mc-drift 21s ease-in-out infinite 1.2s',
          }}
        ></span>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(16px,4vw,24px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '760px',
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
              marginBottom: '24px',
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
              margin: '0 0 22px',
              fontSize: 'clamp(2.4rem,5.8vw,4.15rem)',
              lineHeight: 1.02,
              letterSpacing: '-.03em',
              fontWeight: 800,
              maxWidth: '15ch',
              textWrap: 'balance',
            }}
          >
            {T.hero.title}
          </h1>
          <p
            data-reveal=""
            data-reveal-delay="120"
            style={{
              margin: '0 auto 34px',
              fontSize: 'clamp(1.05rem,1.55vw,1.26rem)',
              lineHeight: 1.6,
              color: 'var(--muted)',
              maxWidth: '46ch',
              textWrap: 'pretty',
            }}
          >
            {T.hero.subtitle}
          </p>
          <div
            data-reveal=""
            data-reveal-delay="180"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}
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
              margin: '24px 0 0',
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

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            marginTop: 'clamp(38px,6vw,64px)',
          }}
        >
          <HeroStage />
        </div>
      </div>
    </section>
  );
}
