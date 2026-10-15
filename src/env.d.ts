interface Window {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
  analyticsLoaded?: boolean
  loadAnalytics?: () => void
  disableAnalytics?: () => void
}
