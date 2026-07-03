import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useSite } from '../context/SiteContext';
import type { Lang } from '../i18n/translations';
import './Navbar.css';

// Estilos del botón de idioma (activo/inactivo) — original líneas 1132-1133
const langBtnBase: CSSProperties = {
  border: 0,
  cursor: 'pointer',
  padding: '5px 10px',
  borderRadius: '7px',
  fontSize: '.72rem',
  letterSpacing: '.05em',
  transition: 'all .2s',
};

const langActiveStyle: CSSProperties = {
  ...langBtnBase,
  fontWeight: 700,
  background: 'linear-gradient(135deg,var(--g1),var(--g2))',
  color: '#fff',
};

const langIdleStyle: CSSProperties = {
  ...langBtnBase,
  fontWeight: 600,
  background: 'transparent',
  color: 'var(--muted)',
};

const mobileLinkStyle: CSSProperties = {
  padding: '12px 8px',
  borderRadius: '9px',
  color: 'var(--text)',
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: 500,
  borderBottom: '1px solid var(--border)',
};

export default function Navbar() {
  const { lang, setLang, theme, toggleTheme, isMobile, T, wa } = useSite();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const isDesktop = !isMobile;
  const isDark = theme === 'dark';
  const waNav = wa(T.wa.nav);

  // Efecto de scroll de la barra (original onScroll, líneas 763-772).
  // Se reaplica cuando cambian lang/theme/menuOpen porque el re-render puede
  // reconciliar el atributo style del <nav>.
  useEffect(() => {
    const onScroll = () => {
      const scrolled = (window.scrollY || window.pageYOffset || 0) > 8;
      const nav = navRef.current;
      if (!nav) return;
      nav.style.background = scrolled ? 'var(--nav-bg)' : 'transparent';
      nav.style.backdropFilter = scrolled ? 'blur(16px) saturate(160%)' : 'none';
      nav.style.setProperty(
        '-webkit-backdrop-filter',
        scrolled ? 'blur(16px) saturate(160%)' : 'none',
      );
      nav.style.borderBottomColor = scrolled ? 'var(--border)' : 'transparent';
      nav.style.boxShadow = scrolled ? '0 10px 34px -22px rgba(0,0,0,.55)' : 'none';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lang, theme, menuOpen]);

  // El original cierra el menú móvil cuando cambia el media query (onMq, línea 761).
  useEffect(() => {
    setMenuOpen(false);
  }, [isMobile]);

  // setLang cierra el menú móvil (original línea 807)
  const setLangAndClose = (l: Lang) => {
    setLang(l);
    setMenuOpen(false);
  };
  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  const links = [
    { href: '#services', label: T.nav.services },
    { href: '#process', label: T.nav.process },
    { href: '#portfolio', label: T.nav.portfolio },
    { href: '#pricing', label: T.nav.pricing },
    { href: '#about', label: T.nav.about },
    { href: '#faq', label: T.nav.faq },
  ];

  return (
    <nav
      ref={navRef}
      aria-label="MerakiCode"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 70,
        borderBottom: '1px solid transparent',
        transition: 'background .3s ease,box-shadow .3s ease,border-color .3s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 clamp(16px,4vw,24px)',
          height: '66px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <a
          href="#hero"
          aria-label="MerakiCode — inicio"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '11px',
            textDecoration: 'none',
            color: 'var(--text)',
            fontWeight: 800,
            fontSize: '1.18rem',
            letterSpacing: '-.02em',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: 'inline-flex',
              width: '32px',
              height: '32px',
              borderRadius: '9px',
              background: 'linear-gradient(135deg,var(--g1),var(--g2))',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontFamily: "'JetBrains Mono',monospace",
              fontWeight: 700,
              fontSize: '1rem',
              boxShadow: '0 8px 20px -7px rgba(34,211,238,.7)',
            }}
          >
            M
          </span>
          <span>
            Meraki<span style={{ color: 'var(--accent)' }}>Code</span>
          </span>
        </a>

        {isDesktop && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {links.map((l) => (
              <a key={l.href} href={l.href} className="mc-nav-link">
                {l.label}
              </a>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
          <div
            role="group"
            aria-label={T.nav.langLabel}
            style={{
              display: 'inline-flex',
              padding: '3px',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              background: 'var(--surface)',
            }}
          >
            <button
              type="button"
              onClick={() => setLangAndClose('es')}
              aria-pressed={lang === 'es'}
              aria-label="Español"
              style={lang === 'es' ? langActiveStyle : langIdleStyle}
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => setLangAndClose('en')}
              aria-pressed={lang === 'en'}
              aria-label="English"
              style={lang === 'en' ? langActiveStyle : langIdleStyle}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={T.nav.themeLabel}
            className="mc-nav-theme"
          >
            {isDark && (
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
              </svg>
            )}
            {!isDark && (
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          {isDesktop && (
            <a href={waNav} target="_blank" rel="noopener" className="mc-nav-cta">
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.02zm-7.01 15.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 1 1 15.2-4.38c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.38-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03 0 1.2.87 2.36.99 2.52.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z"></path>
              </svg>
              {T.nav.cta}
            </a>
          )}

          {isMobile && (
            <button
              type="button"
              onClick={toggleMenu}
              aria-label={T.nav.menu}
              aria-expanded={menuOpen}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--text)',
                cursor: 'pointer',
              }}
            >
              {menuOpen ? (
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {menuOpen && (
        <div
          style={{
            borderTop: '1px solid var(--border)',
            background: 'var(--nav-bg)',
            backdropFilter: 'blur(16px) saturate(160%)',
            WebkitBackdropFilter: 'blur(16px) saturate(160%)',
            padding: '14px clamp(16px,4vw,24px) 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={closeMenu} style={mobileLinkStyle}>
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            style={{
              padding: '12px 8px',
              borderRadius: '9px',
              color: 'var(--text)',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: 500,
            }}
          >
            {T.nav.contact}
          </a>
          <a
            href={waNav}
            target="_blank"
            rel="noopener"
            onClick={closeMenu}
            style={{
              marginTop: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '13px 16px',
              borderRadius: '11px',
              background: 'linear-gradient(135deg,var(--g1),var(--g2))',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.02zm-7.01 15.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 1 1 15.2-4.38c0 4.54-3.7 8.24-8.24 8.24z"></path>
            </svg>
            {T.nav.cta}
          </a>
        </div>
      )}
    </nav>
  );
}
