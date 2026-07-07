import type { CSSProperties } from 'react';
import { useSite } from '../../context/SiteContext';
import { CAPABILITIES, CATEGORIES, COPY, TECH, t } from '../../config/techStack';
import { Glyph } from '../stack-shared/Glyph';
import './StackCards.css';

/* Variante 2 — "cards tradicionales": encabezado + badges de capacidad +
   tecnologías agrupadas por categoría en tarjetas con hover elegante.
   Todo el contenido viene de src/config/techStack.ts. */
export default function StackCards() {
  const { lang } = useSite();
  const c = COPY.cards;

  return (
    <div>
      <div data-reveal="" style={{ maxWidth: '660px', margin: '0 auto', textAlign: 'center' }}>
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
          <span aria-hidden="true" style={{ width: '22px', height: '1px', background: 'var(--accent)' }}></span>
          {t(c.eyebrow, lang)}
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
          {t(c.titleA, lang)}
          <span
            style={{
              background: 'linear-gradient(120deg,var(--g1),var(--g2))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {t(c.titleB, lang)}
          </span>
        </h2>
        <p
          style={
            {
              fontSize: 'clamp(.96rem,1.2vw,1.08rem)',
              color: 'var(--muted)',
              lineHeight: 1.6,
              margin: '0 auto',
              maxWidth: '46ch',
              textWrap: 'pretty',
            } as CSSProperties
          }
        >
          {t(c.sub, lang)}
        </p>

        <div className="mc-tc-caps">
          {CAPABILITIES.map((cap) => (
            <span key={cap.key} className="mc-tc-cap">
              <Glyph icon={cap.icon} size={16} />
              {t(cap.label, lang)}
            </span>
          ))}
        </div>
      </div>

      <div className="mc-tc-groups">
        {CATEGORIES.map((cat, gi) => (
          <div key={cat.key} data-reveal="" data-reveal-delay={String(60 + gi * 60)}>
            <div className="mc-tc-grouphead">
              <span className="mc-tc-grouptitle">{t(cat.label, lang)}</span>
              <span className="mc-tc-groupline" aria-hidden="true"></span>
              <span className="mc-tc-count">
                {cat.techs.length.toString().padStart(2, '0')}
              </span>
            </div>
            <div className="mc-tc-grid">
              {cat.techs.map((key) => {
                const tech = TECH[key];
                return (
                  <div
                    key={key}
                    className="mc-tc-tile"
                    style={{ ['--brand' as string]: tech.brand } as CSSProperties}
                  >
                    <span className="mc-tc-ico">
                      <Glyph icon={tech.icon} size={22} />
                    </span>
                    <span className="mc-tc-body">
                      <span className="mc-tc-name" style={{ display: 'block' }}>
                        {tech.name}
                      </span>
                      <span className="mc-tc-desc" style={{ display: 'block' }}>
                        {t(tech.desc, lang)}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
