import type { APIRoute } from "astro"
import { SENTRY_TEST_TOKEN } from "astro:env/server"

// Prueba de Sentry en el servidor. Responde 404 salvo que exista
// SENTRY_TEST_TOKEN y la petición traiga el header x-sentry-test con ese valor.
export const prerender = false

const notFound = () => new Response(null, { status: 404 })

export const ALL: APIRoute = ({ request }) => {
  if (!SENTRY_TEST_TOKEN) return notFound()
  if (request.headers.get("x-sentry-test") !== SENTRY_TEST_TOKEN) {
    return notFound()
  }

  // El middleware de Sentry lo captura y Astro responde 500.
  throw new Error("Sentry test error (server)")
}
