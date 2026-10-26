import { useEffect, useState, type SubmitEvent } from "react"
import { actions, isInputError } from "astro:actions"
import { CircleAlertIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import type { Choice } from "@/data/site"
import { track } from "@/lib/analytics"

interface ContactFormProps {
  email: string
  projectTypes: readonly string[]
  timelines: readonly Choice[]
  decisions: readonly Choice[]
}

type FieldErrors = Partial<
  Record<"name" | "email" | "message" | "timeline" | "decision", string[]>
>

export function ContactForm({
  email,
  projectTypes,
  timelines,
  decisions,
}: ContactFormProps) {
  const [pending, setPending] = useState(false)
  const [sentTo, setSentTo] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [failed, setFailed] = useState(false)
  const [type, setType] = useState("Software a medida")

  // Los atajos de "¿Por dónde partimos?" eligen el tipo de proyecto, a veces
  // antes de que el formulario se hidrate.
  useEffect(() => {
    const pending = document.getElementById("contacto")?.dataset.projectType
    // Viene del DOM, no de React: solo existe tras montar.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (pending) setType(pending)
    const onPick = (event: Event) =>
      setType((event as CustomEvent<string>).detail)
    window.addEventListener("contact:type", onPick)
    return () => window.removeEventListener("contact:type", onPick)
  }, [])

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setFailed(false)
    setFieldErrors({})

    const formData = new FormData(event.currentTarget)
    // El panel guarda de qué canal llegó el lead (enlaces con ?utm_source=linkedin, etc.).
    // shortcut: solo lee la URL actual, se pierde si navega a otra página antes de escribir; guardarlo en sessionStorage si pasa.
    formData.set(
      "source",
      new URLSearchParams(window.location.search).get("utm_source") ?? ""
    )
    const { data, error } = await actions.contact(formData)

    setPending(false)
    if (data) {
      setSentTo(data.email)
      track("generate_lead", { project_type: formData.get("type") })
    } else if (isInputError(error)) {
      setFieldErrors(error.fields)
    } else {
      setFailed(true)
    }
  }

  if (sentTo !== null) {
    return (
      <div
        role="status"
        className="flex flex-col justify-center gap-2 rounded-xl bg-success p-10 text-success-foreground"
      >
        <strong className="font-display text-2xl font-medium">
          Mensaje recibido.
        </strong>
        <span className="leading-6">
          Le escribiremos a {sentTo} en los próximos días.
        </span>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl bg-paper p-6 shadow-paper md:p-10"
    >
      <FieldGroup className="gap-4">
        {failed && (
          <Alert variant="destructive">
            <CircleAlertIcon />
            <AlertTitle>No pudimos enviar su mensaje</AlertTitle>
            <AlertDescription>
              Inténtelo de nuevo en unos minutos o escríbanos a{" "}
              <a href={`mailto:${email}`}>{email}</a>.
            </AlertDescription>
          </Alert>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field data-invalid={!!fieldErrors.name}>
            <FieldLabel htmlFor="contact-name">Nombre</FieldLabel>
            <Input
              id="contact-name"
              name="name"
              required
              autoComplete="name"
              placeholder="Su nombre"
              aria-invalid={!!fieldErrors.name}
            />
            <FieldError>{fieldErrors.name?.[0]}</FieldError>
          </Field>
          <Field data-invalid={!!fieldErrors.email}>
            <FieldLabel htmlFor="contact-email">Correo</FieldLabel>
            <Input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="nombre@empresa.cl"
              aria-invalid={!!fieldErrors.email}
            />
            <FieldError>{fieldErrors.email?.[0]}</FieldError>
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="contact-type">Tipo de proyecto</FieldLabel>
          <NativeSelect
            id="contact-type"
            name="type"
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="w-full"
          >
            {projectTypes.map((type) => (
              <NativeSelectOption key={type} value={type}>
                {type}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>
        <Field data-invalid={!!fieldErrors.message}>
          <FieldLabel htmlFor="contact-message">
            ¿Qué problema quiere resolver?
          </FieldLabel>
          <Textarea
            id="contact-message"
            name="message"
            rows={4}
            placeholder="Lo que sepa basta: qué quiere lograr y qué se lo impide hoy."
            className="resize-y"
            aria-invalid={!!fieldErrors.message}
          />
          <FieldError>{fieldErrors.message?.[0]}</FieldError>
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field data-invalid={!!fieldErrors.timeline}>
            <FieldLabel htmlFor="contact-timeline">
              ¿Cuándo quiere empezar?
            </FieldLabel>
            <NativeSelect
              id="contact-timeline"
              name="timeline"
              required
              defaultValue=""
              className="w-full"
              aria-invalid={!!fieldErrors.timeline}
            >
              <NativeSelectOption value="" disabled>
                Elija una opción
              </NativeSelectOption>
              {timelines.map((t) => (
                <NativeSelectOption key={t.value} value={t.value}>
                  {t.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <FieldError>{fieldErrors.timeline?.[0]}</FieldError>
          </Field>
          <Field data-invalid={!!fieldErrors.decision}>
            <FieldLabel htmlFor="contact-decision">
              ¿Quién más participa en la decisión?
            </FieldLabel>
            <NativeSelect
              id="contact-decision"
              name="decision"
              required
              defaultValue=""
              className="w-full"
              aria-invalid={!!fieldErrors.decision}
            >
              <NativeSelectOption value="" disabled>
                Elija una opción
              </NativeSelectOption>
              {decisions.map((d) => (
                <NativeSelectOption key={d.value} value={d.value}>
                  {d.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <FieldError>{fieldErrors.decision?.[0]}</FieldError>
          </Field>
        </div>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="sr-only"
        />
        <Button
          type="submit"
          variant="ink"
          size="lg"
          disabled={pending}
          className="self-start"
        >
          {pending && <Spinner data-icon="inline-start" />}
          {pending ? "Enviando…" : "Enviar mensaje"}
        </Button>
      </FieldGroup>
    </form>
  )
}
