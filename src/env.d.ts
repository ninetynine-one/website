interface Window {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
  [gaDisable: `ga-disable-${string}`]: boolean | undefined
}
