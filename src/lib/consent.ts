/**
 * Decisión sobre cookies. Todo lo que depende del consentimiento (GA, el tema,
 * el aviso y el panel) pasa por aquí.
 *
 * Se guarda en localStorage como JSON:
 *   {"v":2,"statistics":true,"preferences":true,"ts":1760000000000}
 * Sin valor guardado no hay decisión: se usa el valor por defecto de la región
 * y no se guarda nada hasta que la persona actúa.
 */

export const CONSENT_KEY = "cookie-consent"

const CHANGE_EVENT = "cookie-consent:change"
const OPEN_EVENT = "cookie-consent:open"

export interface Consent {
  statistics: boolean
  preferences: boolean
}

interface StoredConsent extends Consent {
  v: 2
  ts: number
}

// Zonas horarias europeas que no empiezan con "Europe/".
const EUROPEAN_TIME_ZONES = new Set([
  "Atlantic/Canary",
  "Atlantic/Madeira",
  "Atlantic/Azores",
  "Atlantic/Reykjavik",
  "Atlantic/Faroe",
  "Arctic/Longyearbyen",
])

/**
 * En el EEE, Reino Unido y Suiza la ley (GDPR/ePrivacy) y la política de
 * consentimiento de Google piden permiso antes de usar cookies de analítica.
 * Fuera de Europa las activamos por defecto (interés legítimo) y avisamos.
 * El sitio es estático, así que no hay geolocalización por IP: usamos la
 * zona horaria del navegador. Si no se puede leer, asumimos Europa.
 */
export function isEuropeanTimeZone(timeZone: string | undefined): boolean {
  if (!timeZone) return true
  return timeZone.startsWith("Europe/") || EUROPEAN_TIME_ZONES.has(timeZone)
}

export function isEurope(): boolean {
  // Solo en desarrollo: ?consent-region=eu | world para probar ambos casos.
  if (import.meta.env.DEV) {
    const forced = new URLSearchParams(window.location.search).get(
      "consent-region"
    )
    if (forced === "eu") return true
    if (forced === "world") return false
  }
  try {
    return isEuropeanTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
  } catch {
    return true
  }
}

export function defaultConsent(europe: boolean): Consent {
  // Las preferencias (el tema) solo se guardan cuando la persona elige uno.
  return { statistics: !europe, preferences: true }
}

/** Lee el valor guardado, incluidos los formatos anteriores. */
export function parseConsent(raw: string | null): Consent | null {
  if (!raw) return null
  // v1 guardaba un texto: "granted" o "denied".
  if (raw === "granted" || raw === "all") {
    return { statistics: true, preferences: true }
  }
  if (raw === "denied" || raw === "essential") {
    return { statistics: false, preferences: true }
  }
  try {
    const value = JSON.parse(raw) as Partial<StoredConsent> | null
    if (value && typeof value.statistics === "boolean") {
      return {
        statistics: value.statistics,
        preferences:
          typeof value.preferences === "boolean" ? value.preferences : true,
      }
    }
  } catch {
    // Valor corrupto: se trata como si no hubiera decisión.
  }
  return null
}

export function getStoredConsent(): Consent | null {
  try {
    return parseConsent(localStorage.getItem(CONSENT_KEY))
  } catch {
    return null
  }
}

/** true si la persona ya decidió (Entendido, Aceptar, Rechazar o Guardar). */
export function hasDecision(): boolean {
  return getStoredConsent() !== null
}

export function getConsent(): Consent {
  return getStoredConsent() ?? defaultConsent(isEurope())
}

/** Guarda la decisión y avisa a quien escuche. */
export function setConsent(partial: Partial<Consent>): Consent {
  const consent = { ...getConsent(), ...partial }
  const stored: StoredConsent = { v: 2, ...consent, ts: Date.now() }
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(stored))
  } catch {
    // Sin almacenamiento la decisión vale solo para esta página.
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: consent }))
  return consent
}

export function onConsentChange(callback: (consent: Consent) => void) {
  const listener = (event: Event) =>
    callback((event as CustomEvent<Consent>).detail)
  window.addEventListener(CHANGE_EVENT, listener)
  return () => window.removeEventListener(CHANGE_EVENT, listener)
}

export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_EVENT))
}

export function onOpenCookiePreferences(callback: () => void) {
  window.addEventListener(OPEN_EVENT, callback)
  return () => window.removeEventListener(OPEN_EVENT, callback)
}
