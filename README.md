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

## Formulario de contacto

El formulario envía los mensajes con [Resend](https://resend.com) a través de una Astro Action (`src/actions/index.ts`), que corre como función en Vercel. La página sigue siendo estática.

1. Crear una cuenta en Resend y verificar el dominio `ninetynineone.studio` (registros DNS que indica Resend).
2. Crear una API key y copiar `.env.example` a `.env` con `RESEND_API_KEY`.
3. En Vercel, agregar `RESEND_API_KEY` en *Settings → Environment Variables*.

`CONTACT_TO_EMAIL` es el correo que recibe los mensajes (por defecto `hola@ninetynineone.studio`). Sin un dominio verificado en Resend, debe ser el correo de la cuenta de Resend. `CONTACT_FROM_EMAIL` es opcional (por defecto `Ninety Nine One <onboarding@resend.dev>`); con un dominio verificado puede ser una dirección de ese dominio.

## Analítica

Google Analytics 4 se activa con la variable `PUBLIC_GA_ID` (el ID de medición, `G-XXXXXXXXXX`) en *Settings → Environment Variables* de Vercel. Sin esa variable, o en desarrollo, no se carga. Cada envío exitoso del formulario registra el evento `generate_lead` con el tipo de proyecto.

## Estructura

```
src/
├── actions/index.ts      Action del formulario de contacto (Resend)
├── assets/
│   ├── logo/             Logos y símbolo de la marca (SVG)
│   └── projects/         Capturas de los proyectos
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

Usa `@astrojs/vercel`: las páginas se prerenderizan y solo la action de contacto corre como función. En Vercel, importar el repositorio (detecta Astro automáticamente) y configurar `RESEND_API_KEY`. Actualizar `site` en `astro.config.mjs` si el dominio final cambia.
