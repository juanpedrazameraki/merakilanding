# MerakiCode — Landing Page

Landing page bilingüe (ES/EN) con modo claro/oscuro, construida con **React 18 + TypeScript + Vite**.
Convertida desde el diseño original de Claude Design (`MerakiCode.dc.html`, conservado como referencia).

## Comandos

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # type-check (tsc) + build de producción en dist/
npm run preview  # previsualizar el build de producción
```

## Estructura

- `src/i18n/translations.ts` — todos los textos en español e inglés (edita aquí el copy).
- `src/config.ts` — número de WhatsApp, correo y helper de enlaces `wa.me`.
- `src/context/SiteContext.tsx` — estado global: idioma, tema, viewport móvil.
- `src/components/` — una sección por componente (Navbar, Hero, HeroStage, Services, Process,
  Portfolio, StackSection/StackViz, Pricing, About, Faq, Contact, Footer).
- `src/styles/global.css` — tokens de tema (claro/oscuro), keyframes y estilos compartidos.

## Datos pendientes de reemplazar

- Precios de los planes: buscar `{{DESDE_X}}` en `src/i18n/translations.ts`.
- Nombres del equipo: buscar `{{NOMBRE` / `{{NAME` en `src/i18n/translations.ts`.
- Enlaces de redes sociales: `href="#"` en `About.tsx` y `Footer.tsx`.
- El idioma y el tema del visitante se detectan automáticamente y se recuerdan en `localStorage`.
