// @ts-check

import tailwindcss from "@tailwindcss/vite"
import { defineConfig, envField } from "astro/config"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import vercel from "@astrojs/vercel"
import sentry from "@sentry/astro"

const site = "https://ninetynineone.studio"

// https://astro.build/config
export default defineConfig({
  site,
  adapter: vercel(),
  integrations: [
    react(),
    sitemap({
      // Mismas URL que el canonical de Layout.astro (sin barra final).
      serialize(item) {
        if (item.url !== `${site}/`) item.url = item.url.replace(/\/$/, "")
        return item
      },
    }),
    // Runtime en sentry.client.config.ts y sentry.server.config.ts.
    sentry({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      release: process.env.VERCEL_GIT_COMMIT_SHA
        ? { name: process.env.VERCEL_GIT_COMMIT_SHA }
        : undefined,
      // Los source maps solo se suben si hay token; sin él, el build sigue igual.
      sourcemaps: { disable: !process.env.SENTRY_AUTH_TOKEN },
      telemetry: false,
      // El servidor se inicializa y se instrumenta en src/middleware.ts: el
      // script que inyecta la integración solo corre en páginas SSR y aquí no hay.
      enabled: { client: true, server: false },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      // Webhook del panel de gestión que guarda los mensajes del formulario.
      DASHBOARD_LEADS_URL: envField.string({
        context: "server",
        access: "secret",
        optional: true,
        url: true,
      }),
      DASHBOARD_LEADS_SECRET: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      PUBLIC_GA_ID: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      PUBLIC_SENTRY_DSN: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      SENTRY_DSN: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      SENTRY_TEST_TOKEN: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
    },
  },
})
