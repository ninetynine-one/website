// @ts-check

import tailwindcss from "@tailwindcss/vite"
import { defineConfig, envField } from "astro/config"
import react from "@astrojs/react"
import vercel from "@astrojs/vercel"
import sentry from "@sentry/astro"

const site = "https://ninetynineone.studio"

// https://astro.build/config
export default defineConfig({
  site,
  adapter: vercel(),
  integrations: [
    react(),
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
      // Middleware de Sentry para la action de contacto y los endpoints on-demand.
      autoInstrumentation: { requestHandler: true },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      RESEND_API_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      CONTACT_TO_EMAIL: envField.string({
        context: "server",
        access: "secret",
        default: "hola@ninetynineone.studio",
      }),
      CONTACT_FROM_EMAIL: envField.string({
        context: "server",
        access: "secret",
        default: "Ninety Nine One <onboarding@resend.dev>",
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
