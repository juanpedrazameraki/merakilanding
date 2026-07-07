import { resolveIcon } from '../../config/techStack';

/* Renderiza un ícono de la config: marca (fill) o línea (stroke), según resolveIcon. */
export function Glyph({ icon, size = 22 }: { icon: string; size?: number }) {
  const { d, stroke } = resolveIcon(icon);
  if (stroke) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={d} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
