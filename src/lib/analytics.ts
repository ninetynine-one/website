/**
 * Envía un evento a GA4. No hace nada si gtag no existe (sin ID, en
 * desarrollo o sin consentimiento). Nunca enviar datos personales.
 */
export function track(name: string, params?: Record<string, unknown>) {
  window.gtag?.("event", name, params)
}
