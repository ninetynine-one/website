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
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "El formulario no está configurado.",
        })
      }

      const resend = new Resend(RESEND_API_KEY)
      const { error } = await resend.emails.send({
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

      if (error) {
        console.error("[contact] Resend error", error)
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No pudimos enviar el mensaje.",
        })
      }

      return { email }
    },
  }),
}
