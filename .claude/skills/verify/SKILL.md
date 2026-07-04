---
name: verify
description: Cómo verificar cambios de UI de este proyecto (Vite + React) end-to-end con Chrome headless vía CDP cuando la extensión claude-in-chrome no está conectada.
---

# Verificar MerakiCode landing

## Build y servidor

- `npm run build` = `tsc --noEmit && vite build` (atrapa errores de tipos).
- Dev server: `npm run dev` (puerto 5173; si está ocupado Vite salta a 5174 — leer el log).

## Superficie

GUI pura. La verificación real es visual: viewports, temas (dark/light vía
`localStorage.merakicode-theme` + `prefers-color-scheme`), idiomas
(`localStorage.merakicode-lang`, default por `navigator.language` — headless
arranca en EN), `prefers-reduced-motion`.

## Handle que funcionó: Chrome headless + CDP con Node ≥22

`spawn` de chrome desde Node muere silenciosamente en este entorno; lanzarlo
desde bash sí funciona:

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless --disable-gpu \
  --remote-debugging-port=9555 --user-data-dir="$TEMP/mc-chrome-test" about:blank &
```

Luego conectar por WebSocket global de Node 22 (sin dependencias):
`fetch http://127.0.0.1:9555/json/version` → `webSocketDebuggerUrl` →
`Target.createTarget` + `Target.attachToTarget {flatten:true}` → comandos con
`sessionId`. Script de referencia de una sesión previa (adaptable):
`cdp-verify.mjs` — escenarios × viewport/tema/idioma/reduced-motion, con
`Emulation.setDeviceMetricsOverride`, `Emulation.setEmulatedMedia`
(prefers-color-scheme y prefers-reduced-motion),
`Page.addScriptToEvaluateOnNewDocument` (para pre-sembrar localStorage) y
`Page.captureScreenshot`.

Cerrar al final: enviar `Browser.close` por el WS y matar el vite de prueba
(`netstat -ano | grep :5174` → `taskkill //PID <pid> //F`).

## Qué revisar (hero y flujos con animación)

- Fit en viewport: `getBoundingClientRect` de CTA/trust/stage/badge vs `innerHeight` con `scrollY=0`; overflow-x con `scrollWidth > innerWidth`.
- El hero anima por fases (~10s por ciclo + dwell 7s): capturar a t≈2s (typing) y t≈6.5s (dashboard + badge), y a t≈17s para el reinicio del loop.
- Rotador del H1: medir tamaño del H1 a lo largo de 3-4 palabras — no debe cambiar (layout shift).
- Consola: colectar `Runtime.exceptionThrown` + console error/warning durante toda la corrida.

## Gotchas conocidos

- Navbar desktop desborda horizontalmente entre ~881 y ~970px (`.mc-nav-cta`); preexistente, no culpar al cambio bajo prueba.
- El media query global de reduced-motion mata animaciones CSS pero no transiciones/JS ni GSAP: verificar el flag `reducedMotion` del SiteContext / el branch `reduce` de gsap.matchMedia por separado.
- GSAP (sección Servicios): los triggers son `once:true` sin pin — al verificar, scrollear `#services` a ~40% del viewport y muestrear a +0.3/+1.0/+2.4s (el trigger dispara con el evento de scroll, la muestra de +0.3 puede caer antes del arranque). Toggle ES/EN: los títulos con SplitText necesitan `key={lang}` en el h3 — el `revert()` de SplitText restaura el innerHTML capturado al hacer split y pisa el texto del nuevo idioma si el nodo no se remonta (bug real cazado en verificación 2026-07-03). Hover shimmer: dispatch de `new PointerEvent('pointerenter')` directo a la card; comprobar `card.style.transform === ''` (el lift viene del CSS, GSAP no debe tocar la card raíz).
