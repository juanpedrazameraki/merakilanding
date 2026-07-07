import { useMemo, useState } from 'react';
import type { CSSProperties, MouseEvent as ReactMouseEvent } from 'react';
import { useSite } from '../../context/SiteContext';
import { BENEFITS, CATEGORIES, COPY, TECH, t, type TechKey } from '../../config/techStack';
import { Glyph } from '../stack-shared/Glyph';

/* Bloques inferiores de la variante arquitectura:
   1) Stack detallado por categoría (con tabs),
   2) beneficios en tarjetas "Liquid Glass",
   3) CTA final. */
export default function ArchExtras() {
  const { T, lang, wa, reducedMotion, isMobile } = useSite();
  const a = COPY.arch;
  const [cat, setCat] = useState<string>('all');
  const [expanded, setExpanded] = useState(false);
  const MOBILE_LIMIT = 10; // en mobile: cuántas herramientas se ven antes de "Mostrar más"
  const pick = (k: string) => {
    setCat(k);
    setExpanded(false);
  };

  // Lista de tecnologías únicas (para la pestaña "Todas"), en orden de categoría.
  const allKeys = useMemo(() => {
    const seen = new Set<TechKey>();
    const out: TechKey[] = [];
    CATEGORIES.forEach((c) => c.techs.forEach((k) => {
      if (!seen.has(k)) {
        seen.add(k);
        out.push(k);
      }
    }));
    return out;
  }, []);

  const shownKeys = cat === 'all' ? allKeys : CATEGORIES.find((c) => c.key === cat)?.techs ?? [];
  const collapsed = isMobile && !expanded;
  const visibleKeys = collapsed ? shownKeys.slice(0, MOBILE_LIMIT) : shownKeys;

  // Reflejo que sigue el cursor sobre el cristal (actualiza --mx/--my del card).
  const onGlassMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <>
      {/* Stack detallado por categoría */}
      <div className="mc-arch-block" data-reveal="">
        <div className="mc-arch-blockhead">
          <h3 className="mc-arch-blocktitle">{t(a.stackTitle, lang)}</h3>
          <p className="mc-arch-blocksub">{t(a.stackSub, lang)}</p>
        </div>
        <div className="mc-arch-tabs" role="tablist" aria-label={t(a.stackTitle, lang)}>
          <button
            type="button"
            role="tab"
            aria-selected={cat === 'all'}
            className={`mc-arch-tab${cat === 'all' ? ' is-active' : ''}`}
            onClick={() => pick('all')}
          >
            {t(a.allLabel, lang)}
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              role="tab"
              aria-selected={cat === c.key}
              className={`mc-arch-tab${cat === c.key ? ' is-active' : ''}`}
              onClick={() => pick(c.key)}
            >
              {t(c.label, lang)}
            </button>
          ))}
        </div>
        <div className="mc-arch-chips">
          {visibleKeys.map((key) => {
            const tech = TECH[key];
            return (
              <div
                key={key}
                className="mc-arch-chip"
                tabIndex={0}
                style={{ ['--brand' as string]: tech.brand } as CSSProperties}
              >
                <span className="mc-arch-chip-ico">
                  <Glyph icon={tech.icon} size={20} />
                </span>
                <span className="mc-arch-chip-name">{tech.name}</span>
                <span className="mc-arch-chip-tip">{t(tech.desc, lang)}</span>
              </div>
            );
          })}
        </div>
        {isMobile && shownKeys.length > MOBILE_LIMIT && (
          <button
            type="button"
            className="mc-arch-more"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            {expanded
              ? lang === 'es'
                ? 'Mostrar menos'
                : 'Show less'
              : lang === 'es'
                ? `Mostrar más (+${shownKeys.length - MOBILE_LIMIT})`
                : `Show more (+${shownKeys.length - MOBILE_LIMIT})`}
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform .25s' }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        )}
      </div>

      {/* Beneficios — tarjetas Liquid Glass (simétricas 3×2) */}
      <div data-reveal="">
        <div className="mc-arch-blockhead">
          <h3 className="mc-arch-blocktitle">{t(a.benefitsTitle, lang)}</h3>
        </div>

        {/* Filtro de refracción del cristal (definido una vez) */}
        <svg aria-hidden="true" width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
          <filter id="mc-liquid" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.009 0.013" numOctaves="2" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="16" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>

        <div className="mc-glass-field">
          <div className="mc-glass-grid">
            {BENEFITS.map((b) => (
              <div key={b.key} className="mc-glass" onMouseMove={onGlassMove}>
                <span className="mc-glass-refract" aria-hidden="true"></span>
                <span className="mc-glass-glow" aria-hidden="true"></span>
                <span className="mc-glass-sweep" aria-hidden="true"></span>
                <div className="mc-glass-inner">
                  <div className="mc-glass-ico">
                    <Glyph icon={b.icon} size={24} />
                  </div>
                  <h5>{t(b.title, lang)}</h5>
                  <p>{t(b.desc, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA final */}
      <div className="mc-arch-cta" data-reveal="">
        <div>
          <h3 className="mc-arch-cta-title">{t(a.ctaTitle, lang)}</h3>
          <p className="mc-arch-cta-sub">{t(a.ctaSub, lang)}</p>
        </div>
        <a className="mc-arch-cta-btn" href={wa(T.wa.hero)} target="_blank" rel="noopener noreferrer">
          {t(a.ctaBtn, lang)}
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </>
  );
}
