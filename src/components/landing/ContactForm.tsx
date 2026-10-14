import { useState, type SubmitEvent } from "react"

import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Textarea } from "@/components/ui/textarea"

interface ContactFormProps {
  email: string
  projectTypes: string[]
}

// Sin backend todavía: arma el correo y lo abre en el cliente de correo de la persona.
function buildMailto(to: string, data: FormData) {
  const name = String(data.get("name") ?? "")
  const from = String(data.get("email") ?? "")
  const type = String(data.get("type") ?? "")
  const message = String(data.get("message") ?? "")
  const subject = `${type} — ${name}`
  const body = `${message}\n\n${name}\n${from}`
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function ContactForm({ email, projectTypes }: ContactFormProps) {
  const [sentTo, setSentTo] = useState<string | null>(null)

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    window.location.href = buildMailto(email, data)
    setSentTo(String(data.get("email") ?? ""))
  }

  if (sentTo !== null) {
    return (
      <div
        role="status"
        className="flex flex-col justify-center gap-2 rounded-xl bg-success p-10 text-success-foreground"
      >
        <strong className="font-display text-[26px] font-medium">
          Su correo está listo.
        </strong>
        <span className="leading-6">
          Envíelo desde su aplicación de correo y le escribiremos a {sentTo}{" "}
          dentro de dos días hábiles.
        </span>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border bg-card p-[clamp(24px,4vw,36px)]"
    >
      <FieldGroup className="gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="contact-name">Nombre</FieldLabel>
            <Input
              id="contact-name"
              name="name"
              required
              autoComplete="name"
              placeholder="Su nombre"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="contact-email">Correo</FieldLabel>
            <Input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="nombre@empresa.cl"
            />
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
        <Field>
          <FieldLabel htmlFor="contact-message">Mensaje</FieldLabel>
          <Textarea
            id="contact-message"
            name="message"
            rows={4}
            placeholder="Lo que sepa basta: objetivo, plazos, presupuesto aproximado."
            className="resize-y"
          />
        </Field>
        <Button type="submit" size="lg">
          Enviar mensaje
        </Button>
      </FieldGroup>
    </form>
  )
}
