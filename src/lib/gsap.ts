/* Bootstrap único de GSAP: registro de plugins y configuración global.
   Todo componente que use GSAP importa desde este módulo, nunca de 'gsap'. */
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, SplitText);

// Evita refreshes por el colapso de la barra de URL en móvil
ScrollTrigger.config({ ignoreMobileResize: true });

// Inter/JetBrains Mono cargan tarde y cambian alturas de texto → recalcular triggers
if (typeof document !== 'undefined' && 'fonts' in document) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}

export { gsap, useGSAP, ScrollTrigger, SplitText };
