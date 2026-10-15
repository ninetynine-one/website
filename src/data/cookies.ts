// Inventario de lo que el sitio guarda en el navegador. Lo leen el panel de
// cookies y la página de privacidad: si algo cambia, se cambia solo aquí.

export type CookieCategoryId = "necessary" | "preferences" | "statistics"

export interface CookieItem {
  name: string
  /** Dónde vive: cookie, localStorage o sessionStorage. */
  storage: "Cookie" | "localStorage" | "sessionStorage"
  provider: string
  purpose: string
  duration: string
}

export interface CookieCategory {
  id: CookieCategoryId
  title: string
  description: string
  /** Las necesarias no se pueden apagar. */
  locked?: boolean
  items: CookieItem[]
}

export const cookieCategories: CookieCategory[] = [
  {
    id: "necessary",
    title: "Necesarias",
    description:
      "Hacen que el sitio funcione y recuerdan su decisión sobre las cookies. No se pueden desactivar.",
    locked: true,
    items: [
      {
        name: "cookie-consent",
        storage: "localStorage",
        provider: "Ninety Nine One",
        purpose: "Guarda su decisión sobre las cookies.",
        duration: "Hasta que la borre",
      },
      {
        name: "sentryReplaySession",
        storage: "sessionStorage",
        provider: "Sentry",
        purpose:
          "Une a su visita la grabación enmascarada de un error. Solo existe si algo falla.",
        duration: "Hasta cerrar la pestaña",
      },
    ],
  },
  {
    id: "preferences",
    title: "Preferencias",
    description: "Recuerdan cómo prefiere ver el sitio.",
    items: [
      {
        name: "theme",
        storage: "localStorage",
        provider: "Ninety Nine One",
        purpose: "Recuerda si eligió el modo claro u oscuro.",
        duration: "Hasta que la borre",
      },
    ],
  },
  {
    id: "statistics",
    title: "Estadísticas",
    description:
      "Nos dicen cómo se usa el sitio, de forma anónima y agregada, para mejorarlo. Aparte, Vercel cuenta las visitas sin cookies ni datos que lo identifiquen.",
    items: [
      {
        name: "_ga",
        storage: "Cookie",
        provider: "Google",
        purpose: "Distingue a un visitante de otro.",
        duration: "2 años",
      },
      {
        name: "_ga_<ID>",
        storage: "Cookie",
        provider: "Google",
        purpose: "Mantiene el estado de la sesión.",
        duration: "2 años",
      },
    ],
  },
]
