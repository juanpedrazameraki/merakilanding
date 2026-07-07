import React from 'react';
import { useSite } from '../context/SiteContext';
import { CONTACT_PHONE_DISPLAY, CONTACT_EMAIL } from '../config';
import './Footer.css';

const langActiveStyle: React.CSSProperties = {
  border: 0,
  cursor: 'pointer',
  padding: '5px 10px',
  borderRadius: '7px',
  fontSize: '.72rem',
  fontWeight: 700,
  letterSpacing: '.05em',
  background: 'linear-gradient(135deg,var(--g1),var(--g2))',
  color: '#fff',
  transition: 'all .2s',
};

const langIdleStyle: React.CSSProperties = {
  border: 0,
  cursor: 'pointer',
  padding: '5px 10px',
  borderRadius: '7px',
  fontSize: '.72rem',
  fontWeight: 600,
  letterSpacing: '.05em',
  background: 'transparent',
  color: 'var(--muted)',
  transition: 'all .2s',
};

export default function Footer() {
  const { lang, setLang, T, wa } = useSite();
  const waContact = wa(T.wa.contact);
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-soft)',
        padding: 'clamp(42px,6vw,66px) 0 30px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(16px,4vw,24px)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,180px),1fr))',
            gap: '34px',
            paddingBottom: '40px',
          }}
        >
          <div style={{ gridColumn: 'span 1', minWidth: '210px' }}>
            <a
              href="#hero"
              aria-label="MerakiCode — inicio"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '11px',
                textDecoration: 'none',
                color: 'var(--text)',
                fontWeight: 800,
                fontSize: '1.16rem',
                letterSpacing: '-.02em',
                marginBottom: '14px',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: 'inline-flex',
                  width: '30px',
                  height: '30px',
                  borderRadius: '9px',
                  background: 'linear-gradient(135deg,var(--g1),var(--g2))',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontFamily: "'JetBrains Mono',monospace",
                  fontWeight: 700,
                  fontSize: '.95rem',
                }}
              >
                M
              </span>
              <span>
                Meraki<span style={{ color: 'var(--accent)' }}>Code</span>
              </span>
            </a>
            <p
              style={{
                fontSize: '.92rem',
                color: 'var(--muted)',
                lineHeight: 1.6,
                margin: '0 0 18px',
                maxWidth: '30ch',
              }}
            >
              {T.footer.tagline}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <a href="#" aria-label="LinkedIn" className="mc-foot-social">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57z"></path>
                </svg>
              </a>
              <a href="#" aria-label="GitHub" className="mc-foot-social">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M12 2A10 10 0 0 0 8.84 21.5c.5.08.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.16.57.67.48A10 10 0 0 0 12 2z"></path>
                </svg>
              </a>
              <a href="#" aria-label="X" className="mc-foot-social">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                  <path d="M18 3h3l-7.5 8.5L22 21h-6.4l-4.3-5.6L6 21H3l8-9.1L2 3h6.5l3.9 5.2zm-1.1 16h1.7L7.2 4.8H5.4z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '.72rem',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'var(--dim)',
                marginBottom: '16px',
              }}
            >
              {T.footer.nav}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
              <a href="#services" className="mc-foot-link">
                {T.nav.services}
              </a>
              <a href="#process" className="mc-foot-link">
                {T.nav.process}
              </a>
              <a href="#guarantees" className="mc-foot-link">
                {T.nav.guarantees}
              </a>
              <a href="#pricing" className="mc-foot-link">
                {T.nav.pricing}
              </a>
              <a href="#about" className="mc-foot-link">
                {T.nav.about}
              </a>
              <a href="#faq" className="mc-foot-link">
                {T.nav.faq}
              </a>
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '.72rem',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'var(--dim)',
                marginBottom: '16px',
              }}
            >
              {T.footer.contact}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
              <a href={waContact} target="_blank" rel="noopener" className="mc-foot-link">
                WhatsApp · {CONTACT_PHONE_DISPLAY}
              </a>
              <a href={'mailto:' + CONTACT_EMAIL} className="mc-foot-link">
                {CONTACT_EMAIL}
              </a>
              <span style={{ fontSize: '.92rem', color: 'var(--muted)' }}>{T.contact.location}</span>
              <a
                href="#contact"
                style={{
                  fontSize: '.92rem',
                  color: 'var(--accent)',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                {T.nav.contact} →
              </a>
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '.72rem',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'var(--dim)',
                marginBottom: '16px',
              }}
            >
              {T.footer.follow}
            </div>
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
                onClick={() => setLang('es')}
                aria-pressed={lang === 'es'}
                aria-label="Español"
                style={lang === 'es' ? langActiveStyle : langIdleStyle}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                aria-label="English"
                style={lang === 'en' ? langActiveStyle : langIdleStyle}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
          }}
        >
          <span style={{ fontSize: '.85rem', color: 'var(--dim)' }}>
            © {year} MerakiCode. {T.footer.rights}
          </span>
          <a href="#" className="mc-foot-privacy">
            {T.footer.privacy}
          </a>
        </div>
      </div>
    </footer>
  );
}
