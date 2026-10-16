import * as Sentry from "@sentry/astro"
import { ActionError, defineAction } from "astro:actions"
import { DASHBOARD_LEADS_SECRET, DASHBOARD_LEADS_URL } from "astro:env/server"
import { z } from "astro/zod"

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
      if (!DASHBOARD_LEADS_URL || !DASHBOARD_LEADS_SECRET) {
        console.error(
          "[contact] DASHBOARD_LEADS_URL or DASHBOARD_LEADS_SECRET is not set"
        )
        Sentry.captureMessage(
          "[contact] dashboard leads webhook is not configured",
          "error"
        )
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "El formulario no está configurado.",
        })
      }

      // El mensaje queda en el panel (Correos → Mensajes), no se envía por correo.
      let response: Response
      try {
        response = await fetch(DASHBOARD_LEADS_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${DASHBOARD_LEADS_SECRET}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, type, message }),
          signal: AbortSignal.timeout(10_000),
        })
      } catch (cause) {
        // Falla de red o tiempo de espera: llega a Sentry sin datos del formulario.
        console.error("[contact] dashboard request failed", cause)
        Sentry.captureException(cause, { tags: { action: "contact" } })
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No pudimos enviar el mensaje.",
        })
      }

      if (!response.ok) {
        console.error("[contact] dashboard responded", response.status)
        Sentry.captureException(
          new Error(`[contact] dashboard responded ${response.status}`),
          { tags: { action: "contact" } }
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
