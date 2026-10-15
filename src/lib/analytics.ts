import { getConsent, onConsentChange } from "@/lib/consent"

/**
 * Envía un evento a GA4. No hace nada si gtag no existe (sin ID, en
 * desarrollo o sin consentimiento). Nunca enviar datos personales.
 */
export function track(name: string, params?: Record<string, unknown>) {
  window.gtag?.("event", name, params)
}

let loaded = false

function enable(gaId: string) {
  window[`ga-disable-${gaId}`] = false
  if (loaded) return
  loaded = true
  window.dataLayer = window.dataLayer || []
  window.gtag = function () {
    // gtag necesita el objeto arguments tal cual.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
  document.head.appendChild(script)
  window.gtag("js", new Date())
  window.gtag("config", gaId)
}

function disable(gaId: string) {
  window[`ga-disable-${gaId}`] = true
  // Borra las cookies de GA (_ga, _ga_XXXX) en este host y en el dominio padre.
  const host = location.hostname
  const domains = ["", host, `.${host.split(".").slice(-2).join(".")}`]
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim()
    if (!name.startsWith("_ga")) return
    domains.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`
    })
  })
}

/** Carga o apaga GA según la decisión sobre "Estadísticas". */
export function setupGoogleAnalytics(gaId: string) {
  const apply = (statistics: boolean) =>
    statistics ? enable(gaId) : disable(gaId)
  apply(getConsent().statistics)
  onConsentChange((consent) => apply(consent.statistics))
}
