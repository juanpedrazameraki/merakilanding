import { useEffect, useMemo, useState, type CSSProperties, type ReactElement } from 'react';
import { useSite, useMediaFlag } from '../context/SiteContext';
import type { Lang } from '../i18n/translations';
import { genSeries, linePath, areaPath, endOf } from '../utils/chartPaths';

type HeroToken = [string, string];

const BASE_CODE: HeroToken[][] = [
  [['const', '#c084fc'], [' app ', '#E7EBF3'], ['= ', '#7C8598'], ['createApp', '#22D3EE'], ['({', '#7C8598']],
  [['  name', '#93c5fd'], [': ', '#7C8598'], ['"MerakiCode"', '#86efac'], [',', '#7C8598']],
  [['  modules', '#93c5fd'], [': [', '#7C8598'], ['"web"', '#86efac'], [', ', '#7C8598'], ['"saas"', '#86efac'], [', ', '#7C8598'], ['"api"', '#86efac'], ['],', '#7C8598']],
  [['});', '#7C8598']],
  [['await', '#c084fc'], [' app', '#E7EBF3'], ['.', '#7C8598'], ['deploy', '#22D3EE'], ['();', '#7C8598']],
];
const COMMENT_COLOR = '#6a9955';
function heroCode(lang: Lang): HeroToken[][] {
  return [
    ...BASE_CODE,
    [[lang === 'es' ? '// hecho con meraki' : '// made with meraki', COMMENT_COLOR]],
  ];
}
const HERO_CMD = 'npm run build';
const DWELL_MS = 7000;

const CH_W = 320;
const CH_H = 100;
const CH_PAD = 5;
const JG_W = 320;
const JG_H = 44;
const JG_PAD = 4;

// azul (saas): montaña temprana · cyan (web): crecimiento que domina al final
const S_SAAS = genSeries(3, 48, 0.16, 0.8, (t) => 0.18 + 0.62 * Math.exp(-((t - 0.32) ** 2) / 0.055));
const S_WEB = genSeries(7, 48, 0.16, 0.8, (t) => 0.12 + 0.7 * Math.exp(-((t - 0.86) ** 2) / 0.16));
// violeta (api): señal dentada de alta frecuencia
const S_JAG = genSeries(11, 72, 0.55, 0.5, (t) => 0.48 + 0.16 * Math.sin(t * 5.2 + 0.8) + 0.1 * t);

const SAAS_LINE = linePath(S_SAAS, CH_W, CH_H, CH_PAD);
const SAAS_AREA = areaPath(S_SAAS, CH_W, CH_H, CH_PAD);
const WEB_LINE = linePath(S_WEB, CH_W, CH_H, CH_PAD);
const WEB_AREA = areaPath(S_WEB, CH_W, CH_H, CH_PAD);
const JAG_LINE = linePath(S_JAG, JG_W, JG_H, JG_PAD);
const JAG_AREA = areaPath(S_JAG, JG_W, JG_H, JG_PAD);
const SAAS_END = endOf(S_SAAS, CH_W, CH_H, CH_PAD);
const WEB_END = endOf(S_WEB, CH_W, CH_H, CH_PAD);

interface StageLabels {
  building: string;
  deployed: string;
  production: string;
  live: string;
  panel: string;
  nav: string[];
  stats: { label: string; value: string }[];
}

export default function HeroStage() {
  const { lang, reducedMotion, theme } = useSite();
  const compact = useMediaFlag('(max-width: 880px)');
  const light = theme === 'light';
  const [hp, setHp] = useState(0);
  const [typed, setTyped] = useState(0);
  const [cmd, setCmd] = useState(0);

  const code = useMemo(() => heroCode(lang), [lang]);
  const codeLen = useMemo(
    () => code.reduce((a, l) => a + l.reduce((b, tk) => b + tk[0].length, 0), 0),
    [code],
  );

  useEffect(() => {
    if (reducedMotion) {
      setHp(6);
      setTyped(codeLen);
      setCmd(HERO_CMD.length);
      return;
    }
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
          pushT(() => setHp(2), 900);
          pushT(() => setHp(3), 1900);
          pushT(() => setHp(5), 3100);
          pushT(() => setHp(6), 4100);
          pushT(runCycle, 4100 + DWELL_MS);
        }
      }, 62);
      intervals.push(iv);
    };
    const typeCode = () => {
      let n = 0;
      const iv = window.setInterval(() => {
        n += 1;
        setTyped(n);
        if (n >= codeLen) {
          window.clearInterval(iv);
          pushT(typeCmd, 400);
        }
      }, 14);
      intervals.push(iv);
    };
    const runCycle = () => {
      setHp(0);
      setTyped(0);
      setCmd(0);
      pushT(typeCode, 450);
    };
    runCycle();
    return () => {
      timeouts.forEach((id) => window.clearTimeout(id));
      intervals.forEach((id) => window.clearInterval(id));
    };
  }, [reducedMotion, codeLen]);

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
    const typedCount = reducedMotion ? codeLen : typed;
    let rem = typedCount;
    const rows: { n: number; spans: ReactElement[] }[] = [];
    for (let li = 0; li < code.length; li++) {
      const toks = code[li];
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
      if (i === rows.length - 1 && hp <= 1 && typedCount < codeLen) kids.push(cursorEl('cur'));
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

  const appLayer = (L: StageLabels) => {
    const on = hp >= 3;
    const card: CSSProperties = { border: '1px solid var(--border)', background: 'var(--surface)', borderRadius: '10px' };
    const header = (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: compact ? '9px' : '12px' }}>
        <span style={{ width: '20px', height: '20px', borderRadius: '6px', background: 'linear-gradient(135deg,var(--g1),var(--g2))', flexShrink: 0 }} />
        <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '-.01em', color: 'var(--text)', whiteSpace: 'nowrap' }}>
          Meraki<span style={{ color: 'var(--accent)' }}>Code</span>
        </span>
        <span style={{ fontSize: '.6rem', color: 'var(--dim)', whiteSpace: 'nowrap', borderLeft: '1px solid var(--border)', paddingLeft: '8px' }}>
          {L.panel}
        </span>
        <span style={{ marginLeft: 'auto', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--surface-2)', flexShrink: 0 }} />
      </div>
    );
    const stat = (s: { label: string; value: string }, grad: boolean) => (
      <div key={s.label} style={{ ...card, padding: compact ? '6px 9px' : '8px 10px', flex: '1', minWidth: 0 }}>
        <span
          style={{
            display: 'block',
            fontSize: '.54rem',
            letterSpacing: '.08em',
            textTransform: 'uppercase',
            color: 'var(--dim)',
            marginBottom: '5px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {s.label}
        </span>
        <span
          style={{
            display: 'block',
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: '.82rem',
            fontWeight: 700,
            lineHeight: 1.1,
            whiteSpace: 'nowrap',
            ...(grad
              ? {
                  background: 'linear-gradient(90deg,var(--g1),var(--g2))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }
              : { color: 'var(--text)' }),
          }}
        >
          {s.value}
        </span>
      </div>
    );
    const stats = (
      <div style={{ display: 'flex', gap: '8px', marginBottom: compact ? '8px' : '11px' }}>
        {L.stats.map((s, i) => stat(s, i === 0))}
      </div>
    );
    const monoLabel: CSSProperties = {
      fontFamily: "'JetBrains Mono',monospace",
      fontSize: '.56rem',
      color: 'var(--dim)',
      letterSpacing: '.06em',
      lineHeight: 1,
    };
    const seriesDot = (c: string) => (
      <span style={{ width: '7px', height: '7px', borderRadius: '2px', background: c, flexShrink: 0 }} />
    );
    const chartCard = (
      <div
        style={{
          ...card,
          padding: '9px 11px 8px',
          flex: '1',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '7px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            {seriesDot('#22D3EE')}
            <span style={monoLabel}>web</span>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            {seriesDot('#3b82f6')}
            <span style={monoLabel}>saas</span>
          </span>
          <span style={{ ...monoLabel, marginLeft: 'auto', color: '#34d399' }}>▲ 32%</span>
        </div>
        <div style={{ flex: '1', minHeight: 0, display: 'flex', gap: '7px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textAlign: 'right',
              padding: '1px 0 2px',
            }}
          >
            <span style={monoLabel}>48k</span>
            <span style={monoLabel}>24k</span>
            <span style={monoLabel}>0</span>
          </div>
          <svg
            viewBox={`0 0 ${CH_W} ${CH_H}`}
            preserveAspectRatio="none"
            style={{ flex: '1', minWidth: 0, height: '100%', display: 'block', overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="mcAreaWeb" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.30" />
                <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="mcAreaSaas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            {[CH_PAD, CH_H / 2, CH_H - CH_PAD].map((y) => (
              <line
                key={y}
                x1="0"
                x2={CH_W}
                y1={y}
                y2={y}
                stroke="var(--border)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <path d={SAAS_AREA} fill="url(#mcAreaSaas)" style={{ opacity: on ? 1 : 0, transition: 'opacity .8s ease .35s' }} />
            <path
              d={SAAS_LINE}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ strokeDasharray: 700, strokeDashoffset: on ? 0 : 700, transition: 'stroke-dashoffset 1.3s ease .05s', filter: 'drop-shadow(0 2px 6px rgba(59,130,246,.45))' }}
            />
            <path d={WEB_AREA} fill="url(#mcAreaWeb)" style={{ opacity: on ? 1 : 0, transition: 'opacity .8s ease .45s' }} />
            <path
              d={WEB_LINE}
              fill="none"
              stroke="#22D3EE"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ strokeDasharray: 700, strokeDashoffset: on ? 0 : 700, transition: 'stroke-dashoffset 1.3s ease .15s', filter: 'drop-shadow(0 3px 8px rgba(34,211,238,.5))' }}
            />
            <circle
              cx={SAAS_END.x}
              cy={SAAS_END.y}
              r="3"
              fill="#3b82f6"
              style={{ opacity: on ? 1 : 0, transition: 'opacity .3s ease 1.15s', animation: hp >= 6 ? 'mc-pulse 2.2s infinite .4s' : 'none' }}
            />
            <circle
              cx={WEB_END.x}
              cy={WEB_END.y}
              r="3.5"
              fill="#22D3EE"
              style={{ opacity: on ? 1 : 0, transition: 'opacity .3s ease 1.25s', animation: hp >= 6 ? 'mc-pulse 1.8s infinite' : 'none' }}
            />
          </svg>
        </div>
      </div>
    );
    const jagCard = (
      <div
        className="mc-stage-jag"
        style={{ ...card, padding: '8px 11px 7px', marginTop: '11px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          {seriesDot('#c084fc')}
          <span style={monoLabel}>api</span>
          <span style={{ ...monoLabel, marginLeft: 'auto' }}>99.9%</span>
        </div>
        <svg
          viewBox={`0 0 ${JG_W} ${JG_H}`}
          preserveAspectRatio="none"
          style={{ width: '100%', height: '34px', display: 'block' }}
        >
          <defs>
            <linearGradient id="mcJagFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="mcJagStroke" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e879f9" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>
          <path d={JAG_AREA} fill="url(#mcJagFill)" style={{ opacity: on ? 1 : 0, transition: 'opacity .8s ease .55s' }} />
          <path
            d={JAG_LINE}
            fill="none"
            stroke="url(#mcJagStroke)"
            strokeWidth="1.6"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            style={{ strokeDasharray: 1400, strokeDashoffset: on ? 0 : 1400, transition: 'stroke-dashoffset 1.6s ease .3s' }}
          />
        </svg>
      </div>
    );
    const main = (
      <div style={{ flex: '1', minWidth: '0', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {stats}
        {chartCard}
        {jagCard}
      </div>
    );
    const navRow = (label: string, active: boolean) => (
      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '2px',
            flexShrink: 0,
            background: active ? 'var(--accent)' : 'var(--surface-2)',
          }}
        />
        <span
          style={{
            flex: '1',
            minWidth: 0,
            fontSize: '.56rem',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: active ? 'var(--text)' : 'var(--dim)',
            fontWeight: active ? 600 : 400,
          }}
        >
          {label}
        </span>
      </div>
    );
    const side = (
      <div style={{ width: '64px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {L.nav.map((n, i) => navRow(n, i === 0))}
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
          padding: compact ? '12px 13px' : '15px',
          overflow: 'hidden',
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          opacity: op,
          filter: `blur(${bl})`,
          transform: `scale(${sc})`,
          transition: 'opacity .7s ease,filter .7s ease,transform .7s ease',
        }}
      >
        {header}
        <div style={{ display: 'flex', gap: compact ? 0 : '12px', flex: '1', minHeight: '0' }}>
          {/* En móvil ocultamos la barra lateral: la gráfica ocupa todo el ancho */}
          {compact ? null : side}
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
        {hp >= 2 ? appLayer(L) : null}
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
      <div key="win" style={{ position: 'absolute', inset: compact ? '34px 0 0' : '44px 0 0', zIndex: 3 }}>
        {inner}
      </div>
    );
  };

  const deployBadge = (L: StageLabels) => {
    const on = hp >= 5;
    const check = (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke={light ? '#059669' : '#34d399'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    );
    return (
      <div
        key="dep"
        style={{
          position: 'absolute',
          top: 0,
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
            border: light ? '1px solid rgba(5,150,105,.45)' : '1px solid rgba(52,211,153,.4)',
            background: light ? 'rgba(52,211,153,.18)' : 'rgba(52,211,153,.13)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: light ? '#065f46' : '#fff',
            fontSize: '.8rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            animation: on ? 'mc-glowpulse 2.6s ease-in-out infinite' : 'none',
          }}
        >
          {check}
          <span>{L.deployed}</span>
          <span
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: light ? 'rgba(5,150,105,.5)' : 'rgba(255,255,255,.35)',
            }}
          />
          <span style={{ color: light ? '#047857' : '#6ee7b7' }}>{L.production}</span>
        </div>
      </div>
    );
  };

  const es = lang === 'es';
  const L: StageLabels = es
    ? {
        building: 'Compilando módulos…',
        deployed: 'Deploy exitoso',
        production: 'En producción',
        live: 'En vivo',
        panel: 'Panel',
        nav: ['Inicio', 'Proyectos', 'Equipo', 'Ajustes'],
        stats: [
          { label: 'Respuesta', value: '< 24 h' },
          { label: 'Entrega', value: '4–8 sem' },
          { label: 'Soporte', value: '24/7' },
        ],
      }
    : {
        building: 'Building modules…',
        deployed: 'Successful deploy',
        production: 'In production',
        live: 'Live',
        panel: 'Dashboard',
        nav: ['Home', 'Projects', 'Team', 'Settings'],
        stats: [
          { label: 'Response', value: '< 24 h' },
          { label: 'Delivery', value: '4–8 wks' },
          { label: 'Support', value: '24/7' },
        ],
      };

  return (
    <div className="mc-stage" style={{ position: 'relative', width: '100%', height: '100%' }}>
      {heroWindow(L)}
      {deployBadge(L)}
    </div>
  );
}
