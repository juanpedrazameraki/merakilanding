/* Helpers para series decorativas y paths SVG de gráficas (deterministas por
   seed para que el layout sea estable entre renders e idiomas). Usados por
   HeroStage y los blueprints de Servicios. */

export function mulberry32(seed: number): () => number {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function genSeries(
  seed: number,
  n: number,
  kick: number,
  damp: number,
  trend: (t: number) => number,
): number[] {
  const rnd = mulberry32(seed);
  let noise = 0;
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    noise = noise * damp + (rnd() - 0.5) * kick;
    out.push(Math.min(1, Math.max(0.02, trend(t) + noise)));
  }
  return out;
}

export function linePath(vals: number[], w: number, h: number, pad: number): string {
  const n = vals.length;
  return vals
    .map(
      (v, i) =>
        `${i ? 'L' : 'M'}${((i / (n - 1)) * w).toFixed(1)} ${(pad + (1 - v) * (h - pad * 2)).toFixed(1)}`,
    )
    .join(' ');
}

export function areaPath(vals: number[], w: number, h: number, pad: number): string {
  return `${linePath(vals, w, h, pad)} L${w} ${h} L0 ${h} Z`;
}

export function endOf(vals: number[], w: number, h: number, pad: number): { x: number; y: number } {
  return { x: w, y: pad + (1 - vals[vals.length - 1]) * (h - pad * 2) };
}
