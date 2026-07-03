import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useSite } from '../context/SiteContext';
import { CONTACT_PHONE_DISPLAY, CONTACT_EMAIL } from '../config';
import './Contact.css';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const { lang, T, wa } = useSite();
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const waContact = wa(T.wa.contact);

  const onField =
    (k: keyof ContactForm) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const v = e.target.value;
      setForm((f) => ({ ...f, [k]: v }));
      setSent(false);
    };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const msg =
      lang === 'es'
        ? 'Hola MerakiCode, soy ' +
          (form.name || '{{NOMBRE}}') +
          '. Mi correo: ' +
          (form.email || '{{EMAIL}}') +
          '. ' +
          (form.message || '')
        : "Hi MerakiCode, I'm " +
          (form.name || '{{NAME}}') +
          '. My email: ' +
          (form.email || '{{EMAIL}}') +
          '. ' +
          (form.message || '');
    try {
      window.open(wa(msg), '_blank', 'noopener');
    } catch {
      /* window.open puede fallar (popup blocked) */
    }
    setSent(true);
  };

  return (
    <section
      id="contact"
      style={{
        scrollMarginTop: '84px',
        padding: 'clamp(40px,7vw,84px) 0 clamp(58px,9vw,100px)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 clamp(16px,4vw,24px)' }}>
        <div
          data-reveal=""
          style={{
            position: 'relative',
            borderRadius: '26px',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            background:
              'radial-gradient(120% 130% at 0% 0%,rgba(37,99,235,.24),transparent 55%),radial-gradient(120% 130% at 100% 100%,rgba(34,211,238,.20),transparent 55%),var(--card)',
            boxShadow: 'var(--shadow)',
            padding: 'clamp(30px,4.5vw,56px)',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px)',
              backgroundSize: '44px 44px',
              WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 0%,#000,transparent 80%)',
              maskImage: 'radial-gradient(ellipse 90% 80% at 50% 0%,#000,transparent 80%)',
              pointerEvents: 'none',
            }}
          ></div>
          <div
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
              gap: 'clamp(30px,4vw,52px)',
              alignItems: 'center',
            }}
          >
            <div>
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
                {T.contact.eyebrow}
              </div>
              <h2
                style={{
                  fontSize: 'clamp(1.9rem,3.6vw,2.8rem)',
                  fontWeight: 800,
                  letterSpacing: '-.022em',
                  lineHeight: 1.08,
                  margin: '0 0 16px',
                }}
              >
                {T.contact.heading}
              </h2>
              <p
                style={{
                  fontSize: 'clamp(1rem,1.4vw,1.18rem)',
                  color: 'var(--muted)',
                  lineHeight: 1.6,
                  margin: '0 0 30px',
                  maxWidth: '40ch',
                }}
              >
                {T.contact.sub}
              </p>
              <a href={waContact} target="_blank" rel="noopener" className="mc-contact-cta">
                <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">
                  <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.02zm-7.01 15.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 1 1 15.2-4.38c0 4.54-3.7 8.24-8.24 8.24z"></path>
                </svg>
                {T.contact.cta}
              </a>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <a
                  href={waContact}
                  target="_blank"
                  rel="noopener"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '13px',
                    textDecoration: 'none',
                    color: 'var(--text)',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--accent)',
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.02zm-7.01 15.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 1 1 15.2-4.38c0 4.54-3.7 8.24-8.24 8.24z"></path>
                    </svg>
                  </span>
                  <span>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '.74rem',
                        color: 'var(--dim)',
                        fontFamily: "'JetBrains Mono',monospace",
                        letterSpacing: '.06em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {T.contact.phoneLabel}
                    </span>
                    <span style={{ fontWeight: 600 }}>{CONTACT_PHONE_DISPLAY}</span>
                  </span>
                </a>
                <a
                  href={'mailto:' + CONTACT_EMAIL}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '13px',
                    textDecoration: 'none',
                    color: 'var(--text)',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--accent)',
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2.5"></rect>
                      <path d="m3.5 7 8.5 6 8.5-6"></path>
                    </svg>
                  </span>
                  <span>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '.74rem',
                        color: 'var(--dim)',
                        fontFamily: "'JetBrains Mono',monospace",
                        letterSpacing: '.06em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {T.contact.emailLabel}
                    </span>
                    <span style={{ fontWeight: 600 }}>{CONTACT_EMAIL}</span>
                  </span>
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: '13px', color: 'var(--text)' }}>
                  <span
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--accent)',
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </span>
                  <span>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '.74rem',
                        color: 'var(--dim)',
                        fontFamily: "'JetBrains Mono',monospace",
                        letterSpacing: '.06em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {T.contact.locationLabel}
                    </span>
                    <span style={{ fontWeight: 600 }}>{T.contact.location}</span>
                  </span>
                </div>
              </div>
            </div>

            <form
              onSubmit={onSubmit}
              style={{
                border: '1px solid var(--border)',
                borderRadius: '18px',
                background: 'var(--card)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                padding: 'clamp(22px,3vw,30px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                <label
                  htmlFor="mc-name"
                  style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--muted)' }}
                >
                  {T.contact.formName}
                </label>
                <input
                  id="mc-name"
                  type="text"
                  value={form.name}
                  onChange={onField('name')}
                  placeholder={T.contact.formName}
                  className="mc-contact-input"
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                <label
                  htmlFor="mc-email"
                  style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--muted)' }}
                >
                  {T.contact.formEmail}
                </label>
                <input
                  id="mc-email"
                  type="email"
                  value={form.email}
                  onChange={onField('email')}
                  placeholder="tu@correo.com"
                  className="mc-contact-input"
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                <label
                  htmlFor="mc-msg"
                  style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--muted)' }}
                >
                  {T.contact.formMessage}
                </label>
                <textarea
                  id="mc-msg"
                  rows={4}
                  value={form.message}
                  onChange={onField('message')}
                  placeholder={T.contact.formMessage}
                  className="mc-contact-input mc-contact-textarea"
                ></textarea>
              </div>
              <button type="submit" className="mc-contact-submit">
                <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                  <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.02z"></path>
                </svg>
                {T.contact.formSend}
              </button>
              {sent && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '.86rem',
                    color: 'var(--accent)',
                    fontWeight: 500,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                  {T.contact.sent}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
