import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useSite } from '../../context/SiteContext';
import { CAPABILITIES, COPY, PROJECT_TYPES, t } from '../../config/techStack';
import { Glyph } from '../stack-shared/Glyph';
import ArchBoard from './ArchBoard';
import ArchExtras from './ArchExtras';
import './StackArchitecture.css';

/* Variante 3 — "Arquitectura interactiva". Orquesta los bloques modulares y
   mantiene el tipo de proyecto activo (que cambia el diagrama de arquitectura).
   Todo el contenido/datos vive en src/config/techStack.ts. */
export default function StackArchitecture() {
  const { lang } = useSite();
  const a = COPY.arch;
  const [active, setActive] = useState<string>(PROJECT_TYPES[0].key);

  return (
    <div className="mc-arch">
      <header data-reveal="" style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
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
          {t(a.eyebrow, lang)}
        </div>
        <h2
          style={
            {
              fontSize: 'clamp(1.8rem,3.4vw,2.7rem)',
              fontWeight: 800,
              letterSpacing: '-.025em',
              lineHeight: 1.06,
              margin: '0 0 16px',
              textWrap: 'balance',
              color: 'var(--text)',
            } as CSSProperties
          }
        >
          {t(a.titleA, lang)}
          <span
            style={{
              background: 'linear-gradient(120deg,var(--g1),var(--g2))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {t(a.titleB, lang)}
          </span>
        </h2>
        <p
          style={
            {
              fontSize: 'clamp(.98rem,1.25vw,1.12rem)',
              color: 'var(--muted)',
              lineHeight: 1.6,
              margin: '0 auto',
              maxWidth: '56ch',
              textWrap: 'pretty',
            } as CSSProperties
          }
        >
          {t(a.sub, lang)}
        </p>
        <div className="mc-arch-caps">
          {CAPABILITIES.map((cap) => (
            <span key={cap.key} className="mc-arch-cap">
              <Glyph icon={cap.icon} size={16} />
              {t(cap.label, lang)}
            </span>
          ))}
        </div>
      </header>

      <ArchBoard activeKey={active} onSelect={setActive} />
      <ArchExtras />
    </div>
  );
}
