import * as Sentry from "@sentry/astro"
import { ActionError, defineAction } from "astro:actions"
import {
  CONTACT_FROM_EMAIL,
  CONTACT_TO_EMAIL,
  RESEND_API_KEY,
} from "astro:env/server"
import { z } from "astro/zod"
import { Resend } from "resend"

import { projectTypes } from "@/data/site"

export const server = {
  contact: defineAction({
    accept: "form",
    input: z.object({
      name: z
        .string()
        .trim()
        .min(1, "Cuéntenos su nombre.")
        .max(120, "El nombre es demasiado largo."),
      email: z.email("Revise el formato del correo."),
      type: z.enum(projectTypes),
      message: z
        .string()
        .trim()
        .max(5000, "El mensaje es demasiado largo.")
        .optional(),
      // Campo trampa: invisible para personas, los bots lo llenan.
      website: z.string().max(0).optional(),
    }),
    handler: async ({ name, email, type, message }) => {
      if (!RESEND_API_KEY) {
        console.error("[contact] RESEND_API_KEY is not set")
        Sentry.captureMessage("[contact] RESEND_API_KEY is not set", "error")
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "El formulario no está configurado.",
        })
      }

      const resend = new Resend(RESEND_API_KEY)
      let result: Awaited<ReturnType<typeof resend.emails.send>>
      try {
        result = await resend.emails.send({
          from: CONTACT_FROM_EMAIL,
          to: CONTACT_TO_EMAIL,
          replyTo: email,
          subject: `${type} — ${name}`,
          text: [
            `Nombre: ${name}`,
            `Correo: ${email}`,
            `Tipo de proyecto: ${type}`,
            "",
            message || "(Sin mensaje)",
          ].join("\n"),
        })
      } catch (cause) {
        // Falla de red o del SDK: llega a Sentry sin datos del formulario.
        console.error("[contact] Resend threw", cause)
        Sentry.captureException(cause, { tags: { action: "contact" } })
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No pudimos enviar el mensaje.",
        })
      }

      const { error } = result
      if (error) {
        console.error("[contact] Resend error", error)
        Sentry.captureException(
          new Error(`[contact] Resend error: ${error.name}`),
          { tags: { action: "contact" }, extra: { resend: error.message } }
        )
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No pudimos enviar el mensaje.",
        })
      }

      return { email }
    },
  }),
}
