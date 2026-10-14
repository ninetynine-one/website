// @ts-check

import tailwindcss from "@tailwindcss/vite"
import { defineConfig, envField } from "astro/config"
import react from "@astrojs/react"
import vercel from "@astrojs/vercel"

// https://astro.build/config
export default defineConfig({
  site: "https://ninetynineone.studio",
  adapter: vercel(),
  integrations: [react()],
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
        default: "Ninety Nine One <web@ninetynineone.studio>",
      }),
    },
  },
})
