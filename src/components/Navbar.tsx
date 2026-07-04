import { useEffect, useRef, useState } from 'react';
import { useSite } from '../context/SiteContext';
import type { Lang } from '../i18n/translations';
import './Navbar.css';

function GearIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V15z"></path>
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"></path>
    </svg>
  );
}

function SunIcon() {
  return (
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
    >
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
    </svg>
  );
}

function MoonIcon() {
  return (
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
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  );
}

function WaIcon({ size = 17 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.02zm-7.01 15.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 1 1 15.2-4.38c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.38-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03 0 1.2.87 2.36.99 2.52.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
    </svg>
  );
}

export default function Navbar() {
  const { lang, setLang, theme, toggleTheme, isMobile, T, wa } = useSite();
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  const isDesktop = !isMobile;
  const isDark = theme === 'dark';
  const waNav = wa(T.wa.nav);

  // Efecto de scroll de la barra: reaplica al re-render (lang/theme/menús).
  useEffect(() => {
    const onScroll = () => {
      // Con el sheet abierto forzamos barra sólida para que el logo no quede
      // "a medias" entre el panel y el fondo oscurecido.
      const scrolled = menuOpen || (window.scrollY || window.pageYOffset || 0) > 8;
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
  }, [lang, theme, menuOpen, settingsOpen]);

  // Cerrar menús al cruzar el breakpoint.
  useEffect(() => {
    setMenuOpen(false);
    setSettingsOpen(false);
  }, [isMobile]);

  // Bloquear el scroll del fondo mientras el sheet está abierto + cerrar con Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  // Cerrar el submenú de ajustes al hacer click fuera o con Escape.
  useEffect(() => {
    if (!settingsOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSettingsOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [settingsOpen]);

  const setLangI = (l: Lang) => setLang(l);
  const setDark = (wantDark: boolean) => {
    if (wantDark !== isDark) toggleTheme();
  };
  const toggleMenu = () => {
    setSettingsOpen(false);
    setMenuOpen((open) => !open);
  };
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
    <>
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
          position: 'relative',
          zIndex: 3,
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
          {/* Ajustes: idioma + tema en un submenú que abre con animación */}
          <div className="mc-settings" ref={settingsRef}>
            <button
              type="button"
              className="mc-nav-icon mc-nav-gear"
              onClick={() => setSettingsOpen((o) => !o)}
              aria-haspopup="true"
              aria-expanded={settingsOpen}
              aria-label={T.nav.settings}
            >
              <GearIcon />
            </button>
            <div className={`mc-settings-panel${settingsOpen ? ' open' : ''}`} role="menu">
              <div className="mc-settings-row">
                <span className="mc-settings-icn" aria-hidden="true">
                  <GlobeIcon />
                </span>
                <div className="mc-seg" role="group" aria-label={T.nav.langLabel}>
                  <button
                    type="button"
                    className={`mc-seg-btn${lang === 'es' ? ' active' : ''}`}
                    onClick={() => setLangI('es')}
                    aria-pressed={lang === 'es'}
                  >
                    ES
                  </button>
                  <button
                    type="button"
                    className={`mc-seg-btn${lang === 'en' ? ' active' : ''}`}
                    onClick={() => setLangI('en')}
                    aria-pressed={lang === 'en'}
                  >
                    EN
                  </button>
                </div>
              </div>
              <div className="mc-settings-row">
                <span className="mc-settings-icn" aria-hidden="true">
                  {isDark ? <MoonIcon /> : <SunIcon />}
                </span>
                <div className="mc-seg" role="group" aria-label={T.nav.themeLabel}>
                  <button
                    type="button"
                    className={`mc-seg-btn mc-seg-icn${!isDark ? ' active' : ''}`}
                    onClick={() => setDark(false)}
                    aria-pressed={!isDark}
                    aria-label="Claro / Light"
                  >
                    <SunIcon />
                  </button>
                  <button
                    type="button"
                    className={`mc-seg-btn mc-seg-icn${isDark ? ' active' : ''}`}
                    onClick={() => setDark(true)}
                    aria-pressed={isDark}
                    aria-label="Oscuro / Dark"
                  >
                    <MoonIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {isDesktop && (
            <a
              href={waNav}
              target="_blank"
              rel="noopener"
              className="mc-nav-wa"
              aria-label={T.nav.waFab}
              title={T.nav.waFab}
            >
              <WaIcon size={18} />
              <span className="mc-nav-wa-label">{T.nav.cta}</span>
            </a>
          )}

          {isMobile && (
            <button
              type="button"
              onClick={toggleMenu}
              aria-label={T.nav.menu}
              aria-expanded={menuOpen}
              className="mc-nav-icon"
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
    </nav>

      {/* Menú móvil como "sheet" lateral: FUERA del <nav> (su backdrop-filter crea
          un bloque contenedor que rompería el position:fixed del panel). */}
      <div
        className={`mc-drawer-backdrop${menuOpen ? ' open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      ></div>
      <aside
        className={`mc-drawer${menuOpen ? ' open' : ''}`}
        aria-label={T.nav.menu}
        aria-hidden={!menuOpen}
      >
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={closeMenu} className="mc-drawer-link">
            {l.label}
          </a>
        ))}
        <a href="#contact" onClick={closeMenu} className="mc-drawer-link">
          {T.nav.contact}
        </a>
        <a
          href={waNav}
          target="_blank"
          rel="noopener"
          onClick={closeMenu}
          className="mc-drawer-cta"
        >
          <WaIcon size={18} />
          {T.nav.cta}
        </a>
      </aside>
    </>
  );
}
