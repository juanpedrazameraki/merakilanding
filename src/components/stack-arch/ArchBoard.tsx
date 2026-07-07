import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useSite } from '../../context/SiteContext';
import { COPY, PROJECT_TYPES, TECH, t, type ArchItem } from '../../config/techStack';
import { Glyph } from '../stack-shared/Glyph';

const ACCENT = '#22d3ee';

/* Selector de tipo de proyecto (sidebar) + diagrama de "cómo lo construimos".
   Cada tipo de proyecto define SUS columnas (una landing muestra SEO/Presencia,
   un SaaS su servidor y datos). Los ítems pueden ser tecnologías o conceptos. */
export default function ArchBoard({
  activeKey,
  onSelect,
}: {
  activeKey: string;
  onSelect: (key: string) => void;
}) {
  const { T, lang, wa } = useSite();
  const a = COPY.arch;
  const [hot, setHot] = useState<string | null>(null);
  const pt = PROJECT_TYPES.find((p) => p.key === activeKey) ?? PROJECT_TYPES[0];

  const info = (item: ArchItem) => {
    if (item.tech) {
      const tech = TECH[item.tech];
      return { id: item.tech, name: tech.name, icon: tech.icon, brand: tech.brand, desc: t(tech.desc, lang) };
    }
    return {
      id: item.label ? item.label.es : item.icon ?? 'item',
      name: item.label ? t(item.label, lang) : '',
      icon: item.icon ?? 'chip',
      brand: ACCENT,
      desc: item.desc ? t(item.desc, lang) : '',
    };
  };

  return (
    <div className="mc-arch-block" data-reveal="">
      <div className="mc-arch-main">
        <aside className="mc-arch-side">
          <h3 className="mc-arch-side-title">{t(a.sidebarTitle, lang)}</h3>
          <p className="mc-arch-side-sub">{t(a.sidebarSub, lang)}</p>
          <div className="mc-arch-side-list" role="tablist" aria-label={t(a.sidebarTitle, lang)}>
            {PROJECT_TYPES.map((p) => (
              <button
                key={p.key}
                type="button"
                role="tab"
                aria-selected={p.key === activeKey}
                className={`mc-arch-side-item${p.key === activeKey ? ' is-active' : ''}`}
                onClick={() => onSelect(p.key)}
              >
                <Glyph icon={p.icon} size={18} />
                {t(p.label, lang)}
              </button>
            ))}
          </div>
          <div className="mc-arch-advise">
            <p>{t(a.advise, lang)}</p>
            <a className="mc-arch-advise-btn" href={wa(T.wa.hero)} target="_blank" rel="noopener noreferrer">
              {t(a.adviseBtn, lang)}
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </aside>

        <div className="mc-arch-panel">
          <div className="mc-arch-panelhead">
            <h4>{t(a.archTitle, lang)}</h4>
            <span className="mc-arch-badge">{t(pt.label, lang)}</span>
          </div>

          <div className={`mc-arch-grid${hot ? ' is-focusing' : ''}`} onMouseLeave={() => setHot(null)}>
            {/* Columna cliente (fija) */}
            <div className="mc-arch-col">
              <div className="mc-arch-colhead">
                <span className="mc-arch-collabel">{t(a.clientLabel, lang)}</span>
                <span className="mc-arch-colrole">{t(a.clientRole, lang)}</span>
              </div>
              <div className="mc-arch-colbody">
                <div className="mc-arch-client">
                  <Glyph icon="user" size={26} />
                  <strong>{t(a.clientNode, lang)}</strong>
                  <span>{t(a.clientSub, lang)}</span>
                </div>
              </div>
            </div>

            {/* Columnas propias del tipo de proyecto */}
            {pt.columns.map((col) => (
              <div key={col.key} style={{ display: 'contents' }}>
                <div className="mc-arch-conn" aria-hidden="true"></div>
                <div className="mc-arch-col">
                  <div className="mc-arch-colhead">
                    <span className="mc-arch-collabel">{t(col.label, lang)}</span>
                    <span className="mc-arch-colrole">{t(col.role, lang)}</span>
                  </div>
                  <div className="mc-arch-colbody">
                    {col.items.map((item) => {
                      const it = info(item);
                      const id = `${col.key}-${it.id}`;
                      return (
                        <div
                          key={id}
                          className={`mc-arch-tech${hot === id ? ' is-hot' : ''}`}
                          style={{ ['--brand' as string]: it.brand } as CSSProperties}
                          onMouseEnter={() => setHot(id)}
                          title={it.desc}
                        >
                          <span className="mc-arch-tech-ico">
                            <Glyph icon={it.icon} size={18} />
                          </span>
                          <span className="mc-arch-tech-name">{it.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mc-arch-monitor">
            <Glyph icon="activity" size={16} />
            {t(a.monitor, lang)}
          </div>
        </div>
      </div>
    </div>
  );
}
