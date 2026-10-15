import { useState, type SubmitEvent } from "react"
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

interface ContactFormProps {
  email: string
  projectTypes: readonly string[]
}

type FieldErrors = Partial<Record<"name" | "email" | "message", string[]>>

export function ContactForm({ email, projectTypes }: ContactFormProps) {
  const [pending, setPending] = useState(false)
  const [sentTo, setSentTo] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [failed, setFailed] = useState(false)

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setFailed(false)
    setFieldErrors({})

    const formData = new FormData(event.currentTarget)
    const { data, error } = await actions.contact(formData)

    setPending(false)
    if (data) {
      setSentTo(data.email)
      window.gtag?.("event", "generate_lead", {
        project_type: formData.get("type"),
      })
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
          Le escribiremos a {sentTo} dentro de dos días hábiles.
        </span>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border bg-card p-6 md:p-9"
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
          <NativeSelect id="contact-type" name="type" className="w-full">
            {projectTypes.map((type) => (
              <NativeSelectOption key={type} value={type}>
                {type}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>
        <Field data-invalid={!!fieldErrors.message}>
          <FieldLabel htmlFor="contact-message">Mensaje</FieldLabel>
          <Textarea
            id="contact-message"
            name="message"
            rows={4}
            placeholder="Lo que sepa basta: objetivo, plazos, presupuesto aproximado."
            className="resize-y"
            aria-invalid={!!fieldErrors.message}
          />
          <FieldError>{fieldErrors.message?.[0]}</FieldError>
        </Field>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="sr-only"
        />
        <Button type="submit" size="lg" disabled={pending}>
          {pending && <Spinner data-icon="inline-start" />}
          {pending ? "Enviando…" : "Enviar mensaje"}
        </Button>
      </FieldGroup>
    </form>
  )
}
