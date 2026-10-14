# Ninety Nine One — sitio web

Landing page del estudio, hecha con [Astro](https://astro.build), [Tailwind CSS v4](https://tailwindcss.com) y [shadcn/ui](https://ui.shadcn.com) (base: Base UI).

## Desarrollo

Requiere Node.js 22.12 o superior.

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # genera dist/
npm run preview    # sirve dist/ localmente
npm run typecheck  # astro check
npm run lint
npm run format
```

## Estructura

```
src/
├── assets/logo/          Logos y símbolo de la marca (SVG)
├── components/
│   ├── landing/          Secciones de la landing (Header, Hero, Services, …)
│   └── ui/               Componentes de shadcn/ui adaptados a la marca
├── data/site.ts          Textos, enlaces y datos de contacto
├── layouts/Layout.astro  <head>, SEO y modo oscuro automático
├── lib/utils.ts          cn()
├── pages/index.astro     La landing
└── styles/
    ├── global.css        Punto de entrada: Tailwind, fuentes y tokens
    └── tokens/
        ├── colors.css     Paleta, roles semánticos y variables de shadcn (claro/oscuro)
        ├── typography.css Pesos y roles tipográficos (--type-*)
        ├── spacing.css    Layout, radio base y sombras del modo oscuro
        ├── motion.css     Duraciones
        └── theme.css      Mapeo a utilidades de Tailwind (bg-durazno-100, text-body, …)
docs/design/              Diseños de referencia (marca, fundamentos, componentes, landing)
```

Agregar componentes de shadcn: `npx shadcn@latest add <componente>`. Después, ajustar sus variantes `cva` a los tokens de la marca (ver `src/components/ui/button.tsx`).

## Despliegue

El sitio es estático. En Vercel, importar el repositorio: detecta Astro automáticamente (build `npm run build`, salida `dist/`). Actualizar `site` en `astro.config.mjs` si el dominio final cambia.
