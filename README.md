# Andante — Esteban Silva, fotografía

Portafolio de una sola página para Esteban Silva (fotografía de moda, retrato y
documental en Bogotá). Reconstrucción independiente, como proyecto Vite +
React + TypeScript, del sitio generado originalmente con el website-builder de
Higgsfield — fiel en diseño y animación al original, sin ninguna de sus
dependencias privadas (Cloudflare Workers, D1, TanStack Start, el design
system `@higgsfield/quanta`).

## Stack

- [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript (`strict`)
- CSS plano con custom properties (sin Tailwind — el diseño original tampoco lo usa)
- [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) para pruebas
- [oxlint](https://oxc.rs) para lint, [Prettier](https://prettier.io) para formato

## Scripts

```bash
npm run dev          # servidor de desarrollo
npm run build         # typecheck + build de producción (dist/)
npm run preview       # sirve el build de producción localmente
npm run test           # corre la suite de pruebas una vez
npm run test:watch    # pruebas en modo watch
npm run lint           # oxlint
npm run typecheck     # tsc -b --noEmit
npm run format         # prettier --write .
npm run ci              # lint + typecheck + test + build (gate completo)
```

## Estructura

```
src/
├── components/
│   ├── scroll-scrub/   # motor de scroll-scrubbing de video (el héroe animado)
│   │   ├── scroll-scrub-math.ts   # funciones puras: clamp, smoothstep, lingerEase, buildSegments
│   │   └── ScrollScrub.tsx        # el componente: DOM/rAF, carga de video vía blob
│   ├── photo-grid/     # grid justificado de fotos (usado en Moda y Calle)
│   ├── site-nav/
│   ├── statement/       # cita destacada
│   └── site-footer/
├── content/             # datos: escenas del héroe, fotos, contacto, meta SEO
├── styles/              # tokens + CSS por responsabilidad (nav, secciones, grid, footer…)
└── pages/HomePage.tsx  # composición de la página
```

## Notas sobre el motor de scroll

`ScrollScrub` sincroniza el scroll con un video (blob-backed, no `<video src>`
directo) para lograr scrubbing preciso, con crossfade entre "escenas", soporte
de clip móvil separado, `prefers-reduced-motion`, y limpieza completa al
desmontar. Ver los comentarios en `scroll-scrub-math.ts` y `ScrollScrub.tsx`
para el detalle. Las pruebas automatizadas cubren la lógica pura (fácil de
testear sin DOM) y un smoke test de montaje del componente; el crossfade real
y el scrubbing del video requieren verificación visual manual en un navegador
real (`npm run dev`), ya que dependen de scroll real y decodificación de video
que un entorno de pruebas headless no reproduce fielmente.

## Assets

Las 10 fotografías, el video del héroe (desktop + móvil) y sus posters viven en
`public/assets/` y se sirven tal cual (sin pasar por el bundler) en las mismas
rutas absolutas que usaba el sitio original.
