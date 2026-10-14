// @ts-check

import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
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
})
