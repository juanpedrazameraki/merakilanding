import React, { useRef } from 'react';
import type { CSSProperties } from 'react';
import { useSite } from '../context/SiteContext';
import { gsap, useGSAP, SplitText } from '../lib/gsap';

/* ─────────────────────────────────────────────────────────────────────────
   #stack — "meraki install": una terminal que "instala" el stack en vivo y
   deja las tecnologías como badges instalados, agrupados por capa.

   Idiom del proyecto (== Services.tsx): el DOM autorado ES el estado final
   sólido (y a la vez el fallback de reduced-motion). El branch animado oculta
   con gsap.set en fase pre-paint y revela con un timeline disparado por scroll
   (autoplay-on-view, sin scrub ni pin → robusto en mobile).

   TUNEABLES: objeto INSTALL, un comentario por perilla. Todos en SEGUNDOS
   salvo donde se indique. Para calibrar el "feel" del ritmo, las 3 perillas
   que más se sienten son CMD_CHAR, LINE_STAGGER y GROUP_GAP.
   ───────────────────────────────────────────────────────────────────────── */
const INSTALL = {
  CMD_CHAR: 0.028, //      seg por carácter al tipear el comando        (↑ = typing más lento)
  CMD_HOLD: 0.5, //        pausa tras el comando, antes de la 1ª línea
  LINE_STAGGER: 0.09, //   separación entre líneas de dependencia resueltas
  GROUP_GAP: 0.32, //      pausa extra al iniciar cada grupo (# frontend/# backend/# infra)
  BAR_DUR: 0.4, //         duración de la barra de progreso por paquete  (0 = sin barra)
  SETTLE: 0.45, //         pausa antes de imprimir "+ added N packages"
  BADGE_RISE: 0.4, //      fade + translateY de cada badge al materializarse
  BADGE_STAGGER: 0.05, //  separación entre badges al aparecer
  CARET_ON: 0.55, //       cursor visible   (ON≈OFF = parpadeo tipo terminal)
  CARET_OFF: 0.45, //      cursor oculto
  MOBILE_SPEEDUP: 0.7, //  factor de duración en mobile  (<1 = todo más rápido)
  FAKE_SECONDS: 2.4, //    el "2.4s" del resumen final (solo texto, ilustrativo)
  START: 'top 80%', //     punto del viewport donde dispara el ScrollTrigger
};

type TechKey =
  | 'react'
  | 'next'
  | 'typescript'
  | 'tailwind'
  | 'node'
  | 'python'
  | 'docker'
  | 'postgresql';
type Group = 'frontend' | 'backend' | 'infra';

interface Tech {
  key: TechKey;
  name: string;
  brand: string;
  pkg: string;
  version: string;
  group: Group;
}

// Orden mental de un stack: UI arriba → runtime → infraestructura/datos abajo.
const GROUPS: Group[] = ['frontend', 'backend', 'infra'];

// Versiones referenciales (major) para no envejecer; se marcan como ilustrativas.
const TECHS: Tech[] = [
  { key: 'react', name: 'React', brand: '#61DAFB', pkg: 'react', version: '^18', group: 'frontend' },
  { key: 'next', name: 'Next.js', brand: '#FFFFFF', pkg: 'next', version: '^14', group: 'frontend' },
  { key: 'typescript', name: 'TypeScript', brand: '#3178C6', pkg: 'typescript', version: '^5', group: 'frontend' },
  { key: 'tailwind', name: 'Tailwind CSS', brand: '#38BDF8', pkg: 'tailwindcss', version: '^3', group: 'frontend' },
  { key: 'node', name: 'Node.js', brand: '#5FA04E', pkg: 'node', version: '20', group: 'backend' },
  { key: 'python', name: 'Python', brand: '#5A9FD4', pkg: 'python', version: '3.12', group: 'backend' },
  { key: 'docker', name: 'Docker', brand: '#2496ED', pkg: 'docker', version: '25', group: 'infra' },
  { key: 'postgresql', name: 'PostgreSQL', brand: '#5B9BD5', pkg: 'postgresql', version: '16', group: 'infra' },
];

// Íconos monocromáticos (fill=currentColor) que revelan su color de marca al hover.
const TECH_ICONS: Record<TechKey, string> = {
  react:
    'M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 12.769 4.7c1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442a22.73 22.73 0 0 0-3.113.538 15.02 15.02 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 0 1-4.412.005 26.64 26.64 0 0 1-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946a25.17 25.17 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25.245 25.245 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 0 0-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493a23.966 23.966 0 0 0-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23.142 23.142 0 0 0-1.086 2.964c-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39a25.819 25.819 0 0 0 1.341-2.338zm-9.945.02c.2.392.41.783.635 1.175.23.39.465.772.705 1.143a22.005 22.005 0 0 1-2.006-.386c.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295a1.185 1.185 0 0 1-.553-.132c-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z',
  next: 'M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.5772 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.495.0445h-.406l-.1078-.068a.4383.4383 0 0 1-.1572-.1712l-.0493-.1056.0053-4.703.0067-4.7054.0726-.0915c.0376-.0493.1174-.1125.1736-.143.0962-.047.1338-.0517.5396-.0517.4787 0 .5584.0187.6827.1547.0353.0377 1.3373 1.9987 2.895 4.3608a10760.433 10760.433 0 0 0 4.7344 7.1706l1.9002 2.8782.096-.0633c.8518-.5536 1.7525-1.3418 2.4657-2.1627 1.5179-1.7429 2.4963-3.868 2.8247-6.1363.0961-.6591.1078-.8537.1078-1.7475 0-.8937-.012-1.0884-.1078-1.7475-.6522-4.506-3.8592-8.2919-8.2087-9.6945-.7672-.2487-1.5836-.42-2.4985-.5232-.169-.0176-1.0835-.0366-1.6123-.037zm4.0685 7.217c.3473 0 .4082.0053.4857.047.1127.0562.204.1642.237.2767.0186.061.0234 1.3653.0186 4.3044l-.0067 4.2175-.7436-1.14-.7461-1.14v-3.066c0-1.982.0093-3.0963.0234-3.1502.0375-.1313.1196-.2346.2323-.2955.0961-.0494.1313-.054.4997-.054z',
  typescript:
    'M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.213.776.213 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z',
  tailwind:
    'M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z',
  node: 'M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339c.082.045.197.045.272 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.192-.137-.242l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.084.049-.138.145-.138.241v10.146c0 .097.054.189.139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675c-.57-.329-.922-.945-.922-1.604V6.921c0-.659.353-1.275.922-1.603L11.076.236c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.944.924 1.603v10.146c0 .659-.354 1.273-.924 1.604l-8.794 5.078c-.28.163-.599.247-.926.247zm2.718-6.994c-3.849 0-4.655-1.766-4.655-3.248 0-.14.113-.253.254-.253h1.136c.127 0 .233.091.253.216.171 1.157.683 1.741 3.012 1.741 1.853 0 2.641-.419 2.641-1.402 0-.566-.223-.986-3.103-1.267-2.406-.239-3.894-.771-3.894-2.696 0-1.775 1.496-2.834 4.004-2.834 2.817 0 4.212.978 4.389 3.077.005.072-.021.141-.069.195-.048.05-.115.081-.185.081h-1.14c-.119 0-.223-.084-.246-.199-.275-1.218-.941-1.607-2.748-1.607-2.023 0-2.257.705-2.257 1.233 0 .639.278.826 3.008 1.187 2.703.357 3.988.863 3.988 2.763-.002 1.917-1.6 3.014-4.389 3.014z',
  python:
    'M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z',
  postgresql:
    'M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.238 10.41.524 9.594 1.03c-.808-.271-2.483-.763-4.253-.634-1.23.088-2.562.489-3.582 1.588C.739 3.081.018 4.78.018 7.01c0 .781.096 1.588.32 2.371.407 1.417 1.474 4.885 2.567 7.44.535 1.25 1.093 2.34 1.687 3.157.297.408.616.762.98 1.05.365.29.79.518 1.288.518h.03c.5 0 .924-.229 1.288-.518.364-.288.684-.642.98-1.05.594-.817 1.152-1.907 1.687-3.157 1.093-2.555 2.16-6.023 2.567-7.44.224-.783.32-1.59.32-2.371 0-2.23-.721-3.929-1.741-5.026C10.995.524 9.984.238 8.806.258a10.922 10.922 0 0 0-1.71.165l-.063-.02A10.134 10.134 0 0 0 4.278 0H17.128z',
  docker:
    'M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186h-2.119a.186.186 0 0 0-.186.185v1.888c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137a16.19 16.19 0 0 0 2.997-.275 12.4 12.4 0 0 0 3.917-1.42c.984-.568 1.87-1.289 2.62-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z',
};

function TechIcon({ techKey, size }: { techKey: TechKey; size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d={TECH_ICONS[techKey]} />
    </svg>
  );
}

export default function StackTerminal() {
  const { T, lang } = useSite();
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduce: '(prefers-reduced-motion: reduce)',
          isMobile: '(max-width: 880px)',
          isDesktop: '(min-width: 881px)',
        },
        (ctx) => {
          const { reduce, isMobile } = ctx.conditions as { reduce: boolean; isMobile: boolean };
          const root = rootRef.current;
          if (!root) return;
          const q = gsap.utils.selector(root);
          const cmdEl = q('[data-term-cmd]')[0] as HTMLElement | undefined;
          const caret = q('[data-term-caret]');
          const lines = q('[data-term-line]');
          const fills = q('[data-term-fill]');
          const badges = q('[data-term-badge]');

          if (reduce || !cmdEl) {
            // El DOM autorado ya es el estado final: solo apagar el cursor y
            // dejar las barras llenas. Sin typing, sin stagger.
            gsap.set(caret, { autoAlpha: 0 });
            gsap.set(fills, { scaleX: 1 });
            return;
          }

          const speed = isMobile ? INSTALL.MOBILE_SPEEDUP : 1;
          const split = SplitText.create(cmdEl, { type: 'chars', aria: 'none' });

          // Estado inicial (pre-paint): todo oculto.
          gsap.set(split.chars, { autoAlpha: 0 });
          gsap.set(lines, { autoAlpha: 0, y: 4 });
          gsap.set(fills, {
            scaleX: INSTALL.BAR_DUR > 0 ? 0 : 1,
            transformOrigin: '0% 50%',
          });
          gsap.set(badges, { autoAlpha: 0, y: 10 });
          gsap.set(caret, { autoAlpha: 0 });

          // Cursor parpadeante (idle): arranca al terminar la instalación.
          const caretTl = gsap.timeline({ paused: true, repeat: -1 });
          caretTl
            .set(caret, { autoAlpha: 1 })
            .to({}, { duration: INSTALL.CARET_ON })
            .set(caret, { autoAlpha: 0 })
            .to({}, { duration: INSTALL.CARET_OFF });

          const tl = gsap.timeline({
            scrollTrigger: { trigger: root, start: INSTALL.START, once: true },
            onComplete: () => caretTl.play(0),
          });

          // 1) Tipeo del comando (char a char).
          tl.to(split.chars, {
            autoAlpha: 1,
            duration: 0.01,
            ease: 'none',
            stagger: INSTALL.CMD_CHAR * speed,
          });
          tl.to({}, { duration: INSTALL.CMD_HOLD * speed });

          // 2) Streaming de líneas; los paquetes traen su barra de progreso.
          lines.forEach((line) => {
            const isGroup = line.hasAttribute('data-term-group');
            const isAdded = line.hasAttribute('data-term-added');
            const gap = isGroup ? INSTALL.GROUP_GAP : isAdded ? INSTALL.SETTLE : INSTALL.LINE_STAGGER;
            tl.to(line, { autoAlpha: 1, y: 0, duration: 0.22 * speed, ease: 'power2.out' }, `+=${gap * speed}`);
            const fill = line.querySelector('[data-term-fill]');
            if (fill && INSTALL.BAR_DUR > 0) {
              tl.to(fill, { scaleX: 1, duration: INSTALL.BAR_DUR * speed, ease: 'power1.inOut' }, '<');
            }
          });

          // 3) El stack "instalado" se materializa como badges.
          tl.to(
            badges,
            {
              autoAlpha: 1,
              y: 0,
              duration: INSTALL.BADGE_RISE * speed,
              stagger: INSTALL.BADGE_STAGGER * speed,
              ease: 'back.out(1.5)',
            },
            '+=0.15',
          );
        },
      );
    },
    { scope: rootRef, dependencies: [lang], revertOnUpdate: true },
  );

  const added = T.stack.added.replace('{t}', String(INSTALL.FAKE_SECONDS));

  return (
    <>
      <header
        data-reveal=""
        style={{ maxWidth: '560px', margin: '0 auto clamp(36px,5vw,52px)', textAlign: 'center' }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: '.76rem',
            letterSpacing: '.18em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '11px',
          }}
        >
          <span aria-hidden="true" style={{ width: '22px', height: '1px', background: 'var(--accent)' }}></span>
          {T.stack.eyebrow}
        </div>
        <h2
          style={
            {
              fontSize: 'clamp(1.7rem,3.2vw,2.5rem)',
              fontWeight: 800,
              letterSpacing: '-.025em',
              lineHeight: 1.08,
              margin: '0 0 16px',
              textWrap: 'balance',
              color: 'var(--text)',
            } as CSSProperties
          }
        >
          {T.stack.coreLead}
          <span
            style={{
              background: 'linear-gradient(120deg,var(--g1),var(--g2))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {T.stack.coreHi}
          </span>
        </h2>
        <p
          style={
            {
              fontSize: 'clamp(.96rem,1.2vw,1.08rem)',
              color: 'var(--muted)',
              lineHeight: 1.6,
              margin: '0 auto',
              maxWidth: '42ch',
              textWrap: 'pretty',
            } as CSSProperties
          }
        >
          {T.stack.sub}
        </p>
      </header>
      <div ref={rootRef} className="mc-term-wrap">
      <div className="mc-term">
        <div className="mc-term-head" aria-hidden="true">
          <span className="mc-term-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="mc-term-path">~/merakicode</span>
        </div>

        {/* Log decorativo (la lista semántica de techs son los badges de abajo). */}
        <div className="mc-term-body" aria-hidden="true">
          <div className="mc-term-cmdline">
            <span className="mc-term-prompt">$</span>
            {/* key={lang}: remonta el nodo al cambiar idioma para que el revert
                de SplitText no pise el texto nuevo (mismo patrón que Services). */}
            <span key={lang} data-term-cmd="" className="mc-term-cmd">
              {T.stack.cmd}
            </span>
            <span data-term-caret="" className="mc-term-caret" />
          </div>
          <div data-term-line="" className="mc-term-noteline">
            {T.stack.resolving}
          </div>
          {GROUPS.map((g) => (
            <React.Fragment key={g}>
              <div data-term-line="" data-term-group="" className="mc-term-cmt">
                # {T.stack[g].toLowerCase()}
              </div>
              {TECHS.filter((t) => t.group === g).map((t) => (
                <div data-term-line="" className="mc-term-pkgline" key={t.key}>
                  <span className="mc-term-pkgname">{t.pkg}</span>
                  <span className="mc-term-pkgver">{t.version}</span>
                  <span className="mc-term-bar">
                    <i data-term-fill="" />
                  </span>
                  <span className="mc-term-ok">✓</span>
                </div>
              ))}
            </React.Fragment>
          ))}
          <div data-term-line="" data-term-added="" className="mc-term-added">
            {added}
          </div>
        </div>

        <div className="mc-term-foot">
          <ul className="mc-pkgs" role="list">
            {GROUPS.map((g) => (
              <li className="mc-pkg-group" key={g}>
                <span className="mc-pkg-cat">{T.stack[g]}</span>
                <div className="mc-pkg-row">
                  {TECHS.filter((t) => t.group === g).map((t) => (
                    <div
                      key={t.key}
                      data-term-badge=""
                      className="mc-pkg"
                      tabIndex={0}
                      role="listitem"
                      aria-label={`${t.name} — ${T.stack.roles[t.key]}`}
                      style={{ ['--brand' as string]: t.brand } as CSSProperties}
                    >
                      <span className="mc-pkg-ico">
                        <TechIcon techKey={t.key} size={20} />
                      </span>
                      <span className="mc-pkg-name">{t.name}</span>
                      <span className="mc-pkg-role">{T.stack.roles[t.key]}</span>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          {/* <div className="mc-term-legend" aria-hidden="true">
            {T.stack.versionsNote}
          </div> */}
        </div>
      </div>
    </div>
    </>
  );
}
