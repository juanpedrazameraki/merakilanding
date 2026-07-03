import { useState } from 'react';
import { useSite } from '../context/SiteContext';
import './Faq.css';

export default function Faq() {
  const { T } = useSite();
  const [openFaq, setOpenFaq] = useState<number>(0);

  const toggleFaq = (i: number) => setOpenFaq((prev) => (prev === i ? -1 : i));

  return (
    <section
      id="faq"
      style={{
        scrollMarginTop: '84px',
        padding: 'clamp(58px,9vw,106px) 0',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(16px,4vw,24px)' }}>
        <div
          data-reveal=""
          style={{ textAlign: 'center', marginBottom: 'clamp(34px,5vw,50px)' }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: '.76rem',
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '15px',
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
            {T.faq.eyebrow}
          </div>
          <h2
            style={{
              fontSize: 'clamp(1.85rem,3.6vw,2.7rem)',
              fontWeight: 800,
              letterSpacing: '-.022em',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {T.faq.heading}
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {T.faq.items.map((row, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} data-reveal="" className="mc-faq-row">
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    padding: '19px 22px',
                    background: 'transparent',
                    border: 0,
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: 'var(--text)',
                    fontSize: '1.02rem',
                    fontWeight: 600,
                    fontFamily: 'inherit',
                    lineHeight: 1.4,
                  }}
                >
                  <span>{row.q}</span>
                  <span
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      width: '26px',
                      height: '26px',
                      borderRadius: '7px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--accent)',
                    }}
                  >
                    {isOpen && (
                      <svg
                        viewBox="0 0 24 24"
                        width="15"
                        height="15"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                      </svg>
                    )}
                    {!isOpen && (
                      <svg
                        viewBox="0 0 24 24"
                        width="15"
                        height="15"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 5v14M5 12h14"></path>
                      </svg>
                    )}
                  </span>
                </button>
                {isOpen && (
                  <div
                    style={{
                      padding: '0 22px 20px',
                      color: 'var(--muted)',
                      fontSize: '.96rem',
                      lineHeight: 1.65,
                      maxWidth: '64ch',
                    }}
                  >
                    {row.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
