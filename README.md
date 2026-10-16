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

El formulario no envía correos: una Astro Action (`src/actions/index.ts`), que corre como función en Vercel, reenvía cada mensaje al panel de gestión (`../dashboard`, ruta `POST /api/leads`). Ahí queda como contacto, oportunidad y mensaje en *Correos → Mensajes*. La página sigue siendo estática.

1. Copiar `.env.example` a `.env` y completar:
   - `DASHBOARD_LEADS_URL`: URL del webhook, por ejemplo `https://<panel>/api/leads` (en local, `http://localhost:3000/api/leads`).
   - `DASHBOARD_LEADS_SECRET`: el mismo valor que `LEADS_WEBHOOK_SECRET` en el panel.
2. En Vercel, agregar ambas variables en *Settings → Environment Variables*.

Sin esas variables, el formulario responde "El formulario no está configurado." y el error llega a Sentry.

## Analítica

Google Analytics 4 se activa con la variable `PUBLIC_GA_ID` (el ID de medición, `G-XXXXXXXXXX`) en *Settings → Environment Variables* de Vercel. Sin esa variable, o en desarrollo, no se carga. Cada envío exitoso del formulario registra el evento `generate_lead` con el tipo de proyecto.

Google Analytics depende de la categoría "Estadísticas" del panel de cookies (`src/components/consent/CookieConsent.tsx`). Fuera de Europa viene activada por defecto y se muestra un aviso; en Europa (EEE, Reino Unido y Suiza, según la zona horaria del navegador) se pide permiso antes. La decisión se guarda en `localStorage` (`cookie-consent`, JSON con `v: 2`) y la API está en `src/lib/consent.ts`. El inventario de cookies, que leen el panel y `/privacidad`, está en `src/data/cookies.ts`. En desarrollo, `?consent-region=eu` o `?consent-region=world` fuerzan la región.

Vercel Web Analytics (`@vercel/analytics`) cuenta las visitas sin cookies y no depende del consentimiento. Hay que activarlo en *Analytics* del proyecto en Vercel.

## Errores y rendimiento (Sentry)

`@sentry/astro` captura errores del navegador y del servidor (la action de contacto y `/api/sentry-test`), mide Web Vitals y tiempos de carga, y guarda una grabación enmascarada (Session Replay) solo cuando hay un error. La configuración está en `sentry.client.config.ts` y `sentry.server.config.ts`.

Variables en Vercel (sin ellas, Sentry no hace nada):

- `PUBLIC_SENTRY_DSN`: DSN del navegador. Se lee al compilar.
- `SENTRY_DSN`: DSN del servidor. Se lee al ejecutar.
- `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT`: subida de source maps en el build. Sin token, no se suben y el build sigue.
- `SENTRY_TEST_TOKEN`: habilita la ruta de prueba del servidor.

`environment` sale de `VERCEL_ENV` (o `development`) y `release` de `VERCEL_GIT_COMMIT_SHA`.

Pruebas en producción:

- Navegador: abrir `https://ninetynineone.studio/?sentry-test=1`. Lanza `Sentry test error (client)`.
- Servidor: `curl -i -H "x-sentry-test: $SENTRY_TEST_TOKEN" https://ninetynineone.studio/api/sentry-test`. Responde 500 y lanza `Sentry test error (server)`. Sin el header correcto, o sin la variable, responde 404.

## SEO

`@astrojs/sitemap` genera `sitemap-index.xml` con las URL canónicas (sin barra final, igual que el `<link rel="canonical">`). `public/robots.txt` apunta a él.

## Estructura

```
src/
├── actions/index.ts      Action del formulario de contacto (webhook del panel)
├── assets/
│   ├── logo/             Logos y símbolo de la marca (SVG)
│   └── projects/         Capturas de los proyectos
├── components/
│   ├── landing/          Secciones de la landing (Header, Hero, Services, …)
│   └── ui/               Componentes de shadcn/ui adaptados a la marca
├── data/site.ts          Textos, enlaces y datos de contacto
├── data/cookies.ts       Inventario de cookies (panel y privacidad)
├── layouts/Layout.astro  <head>, SEO y modo oscuro automático
├── lib/analytics.ts      track() y carga de GA4 según el consentimiento
├── lib/consent.ts        Decisión sobre cookies: región, migración y API
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

Usa `@astrojs/vercel`: las páginas se prerenderizan y solo la action de contacto corre como función. En Vercel, importar el repositorio (detecta Astro automáticamente) y configurar `DASHBOARD_LEADS_URL` y `DASHBOARD_LEADS_SECRET`. Actualizar `site` en `astro.config.mjs` si el dominio final cambia.
