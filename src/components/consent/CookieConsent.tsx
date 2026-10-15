import { useEffect, useState } from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { cookieCategories, type CookieCategory } from "@/data/cookies"
import {
  getConsent,
  hasDecision,
  isEurope,
  onOpenCookiePreferences,
  openCookiePreferences,
  setConsent,
  type Consent,
} from "@/lib/consent"

const ALL: Consent = { statistics: true, preferences: true }
const NONE: Consent = { statistics: false, preferences: false }

/**
 * Aviso de primera visita y panel de preferencias de cookies.
 * Se monta con client:only: todo depende del navegador (localStorage y zona
 * horaria), así que no hay nada que renderizar en el servidor.
 */
export function CookieConsent() {
  const [europe] = useState(isEurope)
  const [decided, setDecided] = useState(hasDecision)
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<Consent>(getConsent)

  useEffect(
    () =>
      onOpenCookiePreferences(() => {
        setDraft(getConsent())
        setOpen(true)
      }),
    []
  )

  // Enlace "Cookies" del pie de página (y cualquier otro data-cookie-preferences).
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null
      if (!target?.closest?.("[data-cookie-preferences]")) return
      event.preventDefault()
      openCookiePreferences()
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  function save(consent: Partial<Consent>) {
    const saved = setConsent(consent)
    if (!saved.preferences) {
      try {
        localStorage.removeItem("theme")
      } catch {
        // Sin almacenamiento no hay nada que borrar.
      }
    }
    setDecided(true)
    setOpen(false)
  }

  return (
    <>
      {!decided && (
        <Notice
          europe={europe}
          onAccept={() => save(ALL)}
          onReject={() => save({ statistics: false })}
          onConfigure={openCookiePreferences}
        />
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          aria-modal="true"
          className="flex max-h-[calc(100dvh-2rem)] flex-col gap-4 sm:max-w-lg"
        >
          <DialogHeader className="pr-8">
            <DialogTitle className="font-heading text-xl">
              Preferencias de cookies
            </DialogTitle>
            <DialogDescription className="text-sm text-body">
              Elija qué podemos guardar en su navegador. Puede cambiarlo cuando
              quiera desde el enlace "Cookies" del pie de página.{" "}
              <a href="/privacidad">Política de privacidad</a>.
            </DialogDescription>
          </DialogHeader>
          <div className="-mx-4 flex flex-col gap-3 overflow-y-auto px-4">
            {cookieCategories.map((category) => (
              <CategoryRow
                key={category.id}
                category={category}
                checked={
                  category.id === "necessary" ? true : draft[category.id]
                }
                onCheckedChange={(checked) =>
                  category.id !== "necessary" &&
                  setDraft((current) => ({
                    ...current,
                    [category.id]: checked,
                  }))
                }
              />
            ))}
          </div>
          {/* Mismo peso para las tres opciones: no empujamos hacia aceptar. */}
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => save(NONE)}>
              Rechazar opcionales
            </Button>
            <Button variant="outline" onClick={() => save(draft)}>
              Guardar selección
            </Button>
            <Button variant="outline" onClick={() => save(ALL)}>
              Aceptar todas
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

interface NoticeProps {
  europe: boolean
  onAccept: () => void
  onReject: () => void
  onConfigure: () => void
}

function Notice({ europe, onAccept, onReject, onConfigure }: NoticeProps) {
  return (
    <section
      aria-labelledby="cookie-notice-title"
      className="fixed inset-x-4 bottom-4 z-40 sm:left-auto sm:max-w-sm"
    >
      <Card size="sm" className="shadow-md">
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <CardTitle id="cookie-notice-title">
              {europe ? "¿Podemos medir las visitas?" : "Medimos las visitas"}
            </CardTitle>
            <CardDescription className="text-sm">
              {europe
                ? "Usamos Google Analytics para mejorar el sitio. Deja cookies, así que solo lo activamos si usted acepta."
                : "Usamos Google Analytics para mejorar el sitio. Puede cambiarlo cuando quiera."}
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            {europe ? (
              <>
                <Button variant="outline" size="sm" onClick={onReject}>
                  Rechazar
                </Button>
                <Button variant="outline" size="sm" onClick={onConfigure}>
                  Configurar
                </Button>
                <Button variant="outline" size="sm" onClick={onAccept}>
                  Aceptar
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={onAccept}>
                  Entendido
                </Button>
                <Button variant="ghost" size="sm" onClick={onConfigure}>
                  Configurar
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

interface CategoryRowProps {
  category: CookieCategory
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

function CategoryRow({ category, checked, onCheckedChange }: CategoryRowProps) {
  const titleId = `cookie-category-${category.id}`
  const descriptionId = `${titleId}-description`

  return (
    <section
      aria-labelledby={titleId}
      className="flex flex-col gap-2 rounded-lg border p-3"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 id={titleId} className="font-heading text-base font-medium">
          {category.title}
        </h3>
        <div className="flex items-center gap-2">
          {category.locked && (
            <span className="text-xs text-muted-foreground">
              Siempre activas
            </span>
          )}
          <Switch
            checked={checked}
            disabled={category.locked}
            onCheckedChange={onCheckedChange}
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
          />
        </div>
      </div>
      <p id={descriptionId} className="text-sm text-body">
        {category.description}
      </p>
      <details className="group text-sm">
        <summary className="flex w-fit cursor-pointer list-none items-center gap-1 text-link [&::-webkit-details-marker]:hidden">
          Ver detalle ({category.items.length})
          <ChevronDownIcon
            aria-hidden="true"
            className="size-4 transition-transform group-open:rotate-180"
          />
        </summary>
        <ul className="mt-2 flex flex-col gap-2">
          {category.items.map((item) => (
            <li
              key={item.name}
              className="flex flex-col gap-0.5 rounded-md bg-muted/50 p-2"
            >
              <span className="font-mono text-xs font-medium text-foreground">
                {item.name}
              </span>
              <span className="text-body">{item.purpose}</span>
              <span className="text-xs text-muted-foreground">
                {item.provider} · {item.storage} · {item.duration}
              </span>
            </li>
          ))}
        </ul>
      </details>
    </section>
  )
}
