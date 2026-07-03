import { useEffect, useState, type CSSProperties, type ReactElement, type ReactNode } from 'react';
import { useSite } from '../context/SiteContext';

type HeroToken = [string, string];

const HERO_CODE: HeroToken[][] = [
  [['const', '#c084fc'], [' app ', '#E7EBF3'], ['= ', '#7C8598'], ['createApp', '#22D3EE'], ['({', '#7C8598']],
  [['  name', '#93c5fd'], [': ', '#7C8598'], ['"MerakiCode"', '#86efac'], [',', '#7C8598']],
  [['  modules', '#93c5fd'], [': [', '#7C8598'], ['"web"', '#86efac'], [', ', '#7C8598'], ['"saas"', '#86efac'], [', ', '#7C8598'], ['"api"', '#86efac'], ['],', '#7C8598']],
  [['});', '#7C8598']],
  [['await', '#c084fc'], [' app', '#E7EBF3'], ['.', '#7C8598'], ['deploy', '#22D3EE'], ['();', '#7C8598']],
];
const HERO_CODE_LEN = HERO_CODE.reduce((a, l) => a + l.reduce((b, tk) => b + tk[0].length, 0), 0);
const HERO_CMD = 'npm run build';

interface StageLabels {
  building: string;
  deployed: string;
  production: string;
  db: string;
  api: string;
  notif: string;
  live: string;
}

export default function HeroStage() {
  const { lang, isMobile, reducedMotion } = useSite();
  const [hp, setHp] = useState(0);
  const [typed, setTyped] = useState(0);
  const [cmd, setCmd] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setHp(6);
      setTyped(HERO_CODE_LEN);
      setCmd(HERO_CMD.length);
      return;
    }
    setHp(0);
    setTyped(0);
    setCmd(0);
    const timeouts: number[] = [];
    const intervals: number[] = [];
    const pushT = (fn: () => void, d: number) => {
      timeouts.push(window.setTimeout(fn, d));
    };
    const typeCmd = () => {
      let n = 0;
      setHp(1);
      const iv = window.setInterval(() => {
        n += 1;
        setCmd(n);
        if (n >= HERO_CMD.length) {
          window.clearInterval(iv);
          pushT(() => setHp(2), 1150);
          pushT(() => setHp(3), 2350);
          pushT(() => setHp(4), 3850);
          pushT(() => setHp(5), 5700);
          pushT(() => setHp(6), 6900);
        }
      }, 62);
      intervals.push(iv);
    };
    const typeCode = () => {
      let n = 0;
      const iv = window.setInterval(() => {
        n += 1;
        setTyped(n);
        if (n >= HERO_CODE_LEN) {
          window.clearInterval(iv);
          pushT(typeCmd, 400);
        }
      }, 20);
      intervals.push(iv);
    };
    pushT(typeCode, 550);
    return () => {
      timeouts.forEach((id) => window.clearTimeout(id));
      intervals.forEach((id) => window.clearInterval(id));
    };
  }, [reducedMotion]);

  const dot = (c: string) => (
    <span style={{ width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0, background: c }} />
  );

  const cursorEl = (key?: string) => (
    <span
      key={key}
      style={{ display: 'inline-block', width: '7px', height: '14px', background: '#22D3EE', marginLeft: '2px', verticalAlign: '-2px', borderRadius: '1px', animation: 'mc-blink 1s steps(1) infinite' }}
    />
  );

  const spinEl = () => (
    <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', border: '2px solid var(--border-strong)', borderTopColor: '#22D3EE', animation: 'mc-spin .7s linear infinite', flexShrink: 0 }} />
  );

  const codeLayer = () => {
    const typedCount = reducedMotion ? HERO_CODE_LEN : typed;
    let rem = typedCount;
    const rows: { n: number; spans: ReactElement[] }[] = [];
    for (let li = 0; li < HERO_CODE.length; li++) {
      const toks = HERO_CODE[li];
      const spans: ReactElement[] = [];
      for (let ti = 0; ti < toks.length; ti++) {
        if (rem <= 0) break;
        const show = toks[ti][0].slice(0, rem);
        rem -= show.length;
        spans.push(
          <span key={ti} style={{ color: toks[ti][1], whiteSpace: 'pre' }}>
            {show}
          </span>,
        );
      }
      rows.push({ n: li + 1, spans });
      if (rem <= 0) break;
    }
    const out: ReactElement[] = [];
    for (let i = 0; i < rows.length; i++) {
      const kids = rows[i].spans.slice();
      if (i === rows.length - 1 && hp <= 1 && typedCount < HERO_CODE_LEN) kids.push(cursorEl('cur'));
      out.push(
        <div key={i} style={{ display: 'flex', gap: '13px', minHeight: '19px' }}>
          <span style={{ color: '#495166', width: '12px', textAlign: 'right', flexShrink: 0, userSelect: 'none' }}>{String(rows[i].n)}</span>
          <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{kids}</span>
        </div>,
      );
    }
    if (hp >= 1) {
      const cmdShown = reducedMotion ? HERO_CMD : HERO_CMD.slice(0, cmd);
      const done = reducedMotion || cmd >= HERO_CMD.length;
      const prompt: ReactElement[] = [
        <span key="s" style={{ color: '#22D3EE' }}>
          $
        </span>,
        <span key="c" style={{ color: '#E7EBF3', whiteSpace: 'pre' }}>
          {' ' + cmdShown}
        </span>,
      ];
      if (hp === 1 && !done) prompt.push(cursorEl('cur'));
      const block: ReactElement[] = [
        <div key="p" style={{ display: 'flex', alignItems: 'center' }}>
          {prompt}
        </div>,
      ];
      if (done) {
        block.push(
          <div key="b" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '9px', color: 'var(--muted)' }}>
            {spinEl()}
            <span>{lang === 'es' ? 'Compilando módulos…' : 'Building modules…'}</span>
          </div>,
        );
        block.push(
          <div key="pr" style={{ marginTop: '10px', height: '4px', borderRadius: '3px', background: 'var(--surface-2)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '0', borderRadius: '3px', background: 'linear-gradient(90deg,var(--g1),var(--g2))', animation: 'mc-progress 1.1s ease .1s forwards' }} />
          </div>,
        );
      }
      out.push(
        <div key="cmd" style={{ marginTop: '14px', paddingTop: '13px', borderTop: '1px solid var(--border)' }}>
          {block}
        </div>,
      );
    }
    const op = hp <= 1 ? '1' : '0';
    const bl = hp >= 2 ? '7px' : '0px';
    const sc = hp >= 2 ? '1.03' : '1';
    return (
      <div
        style={{
          position: 'absolute',
          inset: '0',
          padding: '16px 18px',
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '12.5px',
          lineHeight: '1.5',
          overflow: 'hidden',
          pointerEvents: 'none',
          opacity: op,
          filter: `blur(${bl})`,
          transform: `scale(${sc})`,
          transition: 'opacity .55s ease,filter .55s ease,transform .55s ease',
        }}
      >
        {out}
      </div>
    );
  };

  const wireLayer = () => {
    const vis = hp === 2;
    const bx = (st: CSSProperties) => (
      <div style={{ border: '1px dashed var(--border-strong)', background: 'var(--surface)', borderRadius: '7px', ...st }} />
    );
    return (
      <div
        style={{
          position: 'absolute',
          inset: '0',
          padding: '16px',
          pointerEvents: 'none',
          opacity: vis ? '1' : '0',
          filter: `blur(${vis ? '0' : '5px'})`,
          transform: `scale(${vis ? '1' : '1.02'})`,
          transition: 'opacity .55s ease,filter .55s ease,transform .55s ease',
        }}
      >
        <div style={{ display: 'flex', gap: '12px', height: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '56px' }}>
            {bx({ height: '22px' })}
            {bx({ flex: '1' })}
            {bx({ height: '38px' })}
          </div>
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              {bx({ flex: '1', height: '44px' })}
              {bx({ flex: '1', height: '44px' })}
              {bx({ flex: '1', height: '44px' })}
            </div>
            {bx({ flex: '1' })}
          </div>
        </div>
      </div>
    );
  };

  const appLayer = () => {
    const on = hp >= 3;
    const card: CSSProperties = { border: '1px solid var(--border)', background: 'var(--surface)', borderRadius: '10px' };
    const header = (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span style={{ width: '20px', height: '20px', borderRadius: '6px', background: 'linear-gradient(135deg,var(--g1),var(--g2))', flexShrink: 0 }} />
        <span style={{ width: '50px', height: '7px', borderRadius: '4px', background: 'var(--surface-2)' }} />
        <span style={{ width: '32px', height: '7px', borderRadius: '4px', background: 'var(--surface-2)' }} />
        <span style={{ marginLeft: 'auto', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--surface-2)' }} />
      </div>
    );
    const stat = (w: string, grad: boolean) => (
      <div style={{ ...card, padding: '9px 10px', flex: '1' }}>
        <span style={{ display: 'block', width: w, height: '5px', borderRadius: '3px', background: 'var(--surface-2)', marginBottom: '8px' }} />
        <span style={{ display: 'block', width: '64%', height: '11px', borderRadius: '4px', background: grad ? 'linear-gradient(90deg,var(--g1),var(--g2))' : 'var(--surface-2)' }} />
      </div>
    );
    const stats = (
      <div style={{ display: 'flex', gap: '8px', marginBottom: '11px' }}>
        {stat('55%', true)}
        {stat('48%', false)}
        {stat('60%', false)}
      </div>
    );
    const chart = (
      <svg viewBox="0 0 320 92" preserveAspectRatio="none" style={{ width: '100%', height: '66px', display: 'block', overflow: 'visible' }}>
        <defs>
          <linearGradient id="mcArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 66 C40 58,58 30,98 40 S168 20,208 33 S280 12,320 26 L320 92 L0 92 Z"
          fill="url(#mcArea)"
          style={{ opacity: on ? 1 : 0, transition: 'opacity .8s ease .2s' }}
        />
        <path
          d="M0 66 C40 58,58 30,98 40 S168 20,208 33 S280 12,320 26"
          fill="none"
          stroke="#22D3EE"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ strokeDasharray: 430, strokeDashoffset: on ? 0 : 430, transition: 'stroke-dashoffset 1s ease .1s', filter: 'drop-shadow(0 3px 8px rgba(34,211,238,.5))' }}
        />
        <circle
          cx="320"
          cy="26"
          r="3.5"
          fill="#22D3EE"
          style={{ opacity: on ? 1 : 0, transition: 'opacity .3s ease .9s', animation: hp >= 6 ? 'mc-pulse 1.8s infinite' : 'none' }}
        />
      </svg>
    );
    const bh = [50, 74, 60, 88, 66, 92, 72];
    const bars = bh.map((v, b) => (
      <span
        key={b}
        style={{
          flex: '1',
          height: `${v}%`,
          borderRadius: '4px 4px 0 0',
          transformOrigin: 'bottom',
          background: b % 2 ? 'linear-gradient(180deg,var(--g2),var(--g1))' : 'var(--surface-2)',
          animation: hp >= 6 ? `mc-breathe ${2.4 + b * 0.2}s ease-in-out infinite ${b * 0.1}s` : 'none',
        }}
      />
    ));
    const barBox = (
      <div style={{ ...card, padding: '10px 11px', marginTop: '11px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '42px' }}>{bars}</div>
      </div>
    );
    const main = (
      <div style={{ flex: '1', minWidth: '0', display: 'flex', flexDirection: 'column' }}>
        {stats}
        <div style={{ ...card, padding: '10px 11px' }}>{chart}</div>
        {barBox}
      </div>
    );
    const navRow = (active: boolean) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '3px', background: active ? 'var(--accent)' : 'var(--surface-2)' }} />
        <span style={{ flex: '1', height: '7px', borderRadius: '4px', background: active ? 'linear-gradient(90deg,var(--g1),var(--g2))' : 'var(--surface-2)' }} />
      </div>
    );
    const side = (
      <div style={{ width: '58px', display: 'flex', flexDirection: 'column', gap: '9px' }}>
        {navRow(true)}
        {navRow(false)}
        {navRow(false)}
        {navRow(false)}
      </div>
    );
    const op = on ? '1' : '0';
    const bl = on ? '0px' : '8px';
    const sc = on ? '1' : '0.97';
    return (
      <div
        style={{
          position: 'absolute',
          inset: '0',
          padding: '15px',
          overflow: 'hidden',
          pointerEvents: 'none',
          opacity: op,
          filter: `blur(${bl})`,
          transform: `scale(${sc})`,
          transition: 'opacity .7s ease,filter .7s ease,transform .7s ease',
        }}
      >
        {header}
        <div style={{ display: 'flex', gap: '12px', flex: '1', minHeight: '0' }}>
          {side}
          {main}
        </div>
      </div>
    );
  };

  const heroWindow = (L: StageLabels) => {
    const fname = hp >= 5 ? 'merakicode.mx' : hp >= 2 ? 'build' : 'app.tsx';
    const green = hp >= 5;
    const title = (
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '11px 14px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        {dot('#f87171')}
        {dot('#fbbf24')}
        {dot('#34d399')}
        <span style={{ marginLeft: '8px', fontFamily: "'JetBrains Mono',monospace", fontSize: '.72rem', color: 'var(--dim)' }}>{fname}</span>
        <span
          style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: "'JetBrains Mono',monospace", fontSize: '.64rem', color: green ? '#6ee7b7' : 'var(--dim)' }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: green ? '#34d399' : 'var(--dim)',
              ...(green ? { boxShadow: '0 0 0 3px rgba(52,211,153,.2)', animation: 'mc-pulse 2s infinite' } : {}),
            }}
          />
          {green ? L.live : '···'}
        </span>
      </div>
    );
    const body = (
      <div style={{ position: 'relative', flex: '1', minHeight: '0' }}>
        {codeLayer()}
        {hp >= 1 ? wireLayer() : null}
        {hp >= 2 ? appLayer() : null}
      </div>
    );
    const inner = (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          borderRadius: '16px',
          border: '1px solid var(--border-strong)',
          background: 'var(--card)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: 'var(--shadow)',
          overflow: 'hidden',
          animation: 'mc-rise 9s ease-in-out infinite',
        }}
      >
        {title}
        {body}
      </div>
    );
    return (
      <div
        key="win"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          width: isMobile ? '100%' : '52%',
          minWidth: isMobile ? '0' : '384px',
          height: isMobile ? '100%' : '74%',
          zIndex: 3,
        }}
      >
        {inner}
      </div>
    );
  };

  const sat = (pos: CSSProperties, i: number, key: string, inner: ReactNode) => {
    const on = hp >= 4;
    return (
      <div
        key={key}
        style={{
          position: 'absolute',
          zIndex: 4,
          ...pos,
          opacity: on ? '1' : '0',
          transform: on ? 'translateY(0) scale(1)' : 'translateY(16px) scale(.92)',
          transition: `opacity .6s cubic-bezier(.22,.61,.36,1) ${i * 0.12}s,transform .6s cubic-bezier(.22,.61,.36,1) ${i * 0.12}s`,
        }}
      >
        <div style={{ animation: `mc-rise ${7 + i}s ease-in-out infinite ${i * 0.3}s` }}>{inner}</div>
      </div>
    );
  };

  const satellites = (L: StageLabels) => {
    const glass: CSSProperties = {
      border: '1px solid var(--border-strong)',
      background: 'var(--nav-bg)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderRadius: '12px',
      boxShadow: 'var(--shadow)',
    };
    const check = (
      <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(52,211,153,.18)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </span>
    );
    const notif = sat(
      { top: '2%', left: '-1%' },
      0,
      'notif',
      <div style={{ ...glass, display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 13px', width: '180px' }}>
        {check}
        <div style={{ flex: '1' }}>
          <div style={{ fontSize: '.74rem', fontWeight: 600, color: 'var(--text)', marginBottom: '5px' }}>{L.notif}</div>
          <div style={{ height: '5px', width: '70%', borderRadius: '3px', background: 'var(--surface-2)' }} />
        </div>
      </div>,
    );
    const api = sat(
      { top: '1%', right: '11%' },
      1,
      'api',
      <div style={{ ...glass, display: 'flex', alignItems: 'center', gap: '9px', padding: '9px 14px' }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '.74rem', fontWeight: 600, color: 'var(--accent)' }}>{L.api}</span>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 0 3px rgba(52,211,153,.18)', animation: 'mc-pulse 1.8s infinite' }} />
      </div>,
    );
    const cyl = (
      <span style={{ width: '26px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span style={{ height: '7px', borderRadius: '50%', background: 'linear-gradient(90deg,var(--g1),var(--g2))' }} />
        <span style={{ height: '7px', borderRadius: '50%', background: 'var(--surface-2)' }} />
        <span style={{ height: '7px', borderRadius: '50%', background: 'var(--surface-2)' }} />
      </span>
    );
    const db = sat(
      { bottom: '5%', left: '1%' },
      2,
      'db',
      <div style={{ ...glass, display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 13px', width: '158px' }}>
        {cyl}
        <div style={{ flex: '1' }}>
          <div style={{ fontSize: '.74rem', fontWeight: 600, color: 'var(--text)', marginBottom: '5px' }}>{L.db}</div>
          <div style={{ height: '5px', width: '80%', borderRadius: '3px', background: 'var(--surface-2)' }} />
        </div>
      </div>,
    );
    const phone = (
      <div style={{ width: '112px', height: '186px', borderRadius: '20px', border: '1px solid var(--border-strong)', background: 'var(--card)', boxShadow: 'var(--shadow)', padding: '9px', position: 'relative', overflow: 'hidden' }}>
        <span style={{ position: 'absolute', top: '7px', left: '50%', transform: 'translateX(-50%)', width: '34px', height: '4px', borderRadius: '3px', background: 'var(--surface-2)' }} />
        <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ height: '9px', width: '60%', borderRadius: '4px', background: 'linear-gradient(90deg,var(--g1),var(--g2))' }} />
          <div style={{ border: '1px solid var(--border)', borderRadius: '9px', padding: '8px', display: 'flex', alignItems: 'flex-end', gap: '4px', height: '52px' }}>
            <span style={{ flex: '1', height: '40%', background: 'var(--surface-2)', borderRadius: '3px 3px 0 0', transformOrigin: 'bottom', animation: 'mc-breathe 2.6s ease-in-out infinite' }} />
            <span style={{ flex: '1', height: '70%', background: 'linear-gradient(180deg,var(--g2),var(--g1))', borderRadius: '3px 3px 0 0', transformOrigin: 'bottom', animation: 'mc-breathe 2.6s ease-in-out infinite .2s' }} />
            <span style={{ flex: '1', height: '55%', background: 'var(--surface-2)', borderRadius: '3px 3px 0 0', transformOrigin: 'bottom', animation: 'mc-breathe 2.6s ease-in-out infinite .4s' }} />
            <span style={{ flex: '1', height: '85%', background: 'linear-gradient(180deg,var(--g2),var(--g1))', borderRadius: '3px 3px 0 0', transformOrigin: 'bottom', animation: 'mc-breathe 2.6s ease-in-out infinite .6s' }} />
          </div>
          <span style={{ height: '7px', width: '90%', borderRadius: '4px', background: 'var(--surface-2)' }} />
          <span style={{ height: '7px', width: '70%', borderRadius: '4px', background: 'var(--surface-2)' }} />
        </div>
      </div>
    );
    const mobile = sat({ top: '50%', right: '-2%', marginTop: '-93px' }, 3, 'mob', phone);
    return [notif, api, db, mobile];
  };

  const lines = () => {
    const on = hp >= 4;
    const conn = (d: string, i: number) => (
      <g key={i} style={{ opacity: on ? 1 : 0, transition: `opacity .6s ease ${i * 0.1}s` }}>
        <path d={d} fill="none" stroke="var(--border-strong)" strokeWidth="1.2" />
        <path
          d={d}
          fill="none"
          stroke="#22D3EE"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="3 13"
          style={{ animation: on ? 'mc-flow 1.3s linear infinite' : 'none', filter: 'drop-shadow(0 0 4px rgba(34,211,238,.7))' }}
        />
      </g>
    );
    return (
      <svg
        key="lines"
        viewBox="0 0 960 520"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none', overflow: 'visible' }}
      >
        {conn('M470 250 Q320 200 175 120', 0)}
        {conn('M492 232 Q640 150 762 96', 1)}
        {conn('M452 300 Q300 380 172 428', 2)}
        {conn('M520 260 Q720 260 872 262', 3)}
      </svg>
    );
  };

  const deployBadge = (L: StageLabels) => {
    const on = hp >= 5;
    const check = (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    );
    return (
      <div
        key="dep"
        style={{
          position: 'absolute',
          top: isMobile ? '6px' : '10px',
          left: '50%',
          zIndex: 6,
          transform: `translateX(-50%) ${on ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(.9)'}`,
          opacity: on ? '1' : '0',
          transition: 'opacity .6s cubic-bezier(.22,.61,.36,1),transform .6s cubic-bezier(.22,.61,.36,1)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '9px',
            padding: '8px 15px',
            borderRadius: '999px',
            border: '1px solid rgba(52,211,153,.4)',
            background: 'rgba(52,211,153,.13)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: '#fff',
            fontSize: '.8rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            animation: on ? 'mc-glowpulse 2.6s ease-in-out infinite' : 'none',
          }}
        >
          {check}
          <span>{L.deployed}</span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,.35)' }} />
          <span style={{ color: '#6ee7b7' }}>{L.production}</span>
        </div>
      </div>
    );
  };

  const es = lang === 'es';
  const L: StageLabels = es
    ? { building: 'Compilando módulos…', deployed: 'Deploy exitoso', production: 'En producción', db: 'Base de datos', api: 'API', notif: 'Listo para producción', live: 'En vivo' }
    : { building: 'Building modules…', deployed: 'Successful deploy', production: 'In production', db: 'Database', api: 'API', notif: 'Ready for production', live: 'Live' };

  return (
    <div
      className="mc-stage"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: isMobile ? '430px' : '960px',
        margin: '0 auto',
        height: isMobile ? '410px' : 'clamp(440px,44vw,560px)',
      }}
    >
      {!isMobile && hp >= 3 && lines()}
      {heroWindow(L)}
      {!isMobile && hp >= 3 && satellites(L)}
      {deployBadge(L)}
    </div>
  );
}
