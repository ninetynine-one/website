import storiaLight from "@/assets/projects/storia-light.png"
import storiaDark from "@/assets/projects/storia-dark.png"

export const site = {
  name: "Ninety Nine One",
  title: "Ninety Nine One — Estudio de software",
  description:
    "Estudio de software en Chile. Creamos apps y videojuegos propios, y desarrollamos software a medida y soluciones con IA.",
  email: "hola@ninetynineone.studio",
  location: "Santiago de Chile",
  whatsapp: "https://wa.me/56984875420",
  legalName: "Ninety Nine One SpA",
}

export const navLinks = [
  { href: "/#como", label: "Cómo trabajamos" },
  { href: "/#hacemos", label: "Qué hacemos" },
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#valores", label: "Valores" },
]

export const socialLinks = [
  {
    href: "https://www.instagram.com/ninetynineone.studio",
    label: "Instagram",
  },
  { href: "https://github.com/ninetynine-one", label: "GitHub" },
]

export const process = [
  {
    when: "Primer paso",
    title: "Conversamos",
    description:
      "Nos cuenta qué quiere construir. Le responde una persona, no una plantilla.",
  },
  {
    when: "Propuesta",
    title: "Plazo y costo, por escrito",
    description: "Con lo que sabemos y lo que todavía no. Sin letra chica.",
  },
  {
    when: "Cada viernes",
    title: "Avance visible",
    description:
      "Qué se terminó, qué sigue y cualquier riesgo apenas lo detectamos.",
    highlight: true,
  },
  {
    when: "Entrega",
    title: "Software que se queda",
    description:
      "Probado, documentado y en sus manos. Lo seguimos acompañando si lo necesita.",
  },
]

export const services = [
  {
    tab: "Producto digital",
    tone: "primary",
    title: "Aplicaciones, apps y videojuegos",
    description:
      "Diseñamos, construimos y mantenemos productos digitales completos. Cada uno con su propia marca; todos con la misma firma.",
    items: [
      { label: "Aplicaciones web", detail: "SaaS" },
      { label: "Apps móviles", detail: "iOS y Android" },
      { label: "Videojuegos", detail: "Descargables y online" },
    ],
  },
  {
    tab: "Desarrollo y asesoría",
    tone: "accent",
    title: "Software a medida y asesoría técnica",
    description:
      "Construimos el software que su empresa necesita, o la acompañamos a tomar mejores decisiones técnicas.",
    items: [
      { label: "Software a medida", detail: "Web y móvil" },
      { label: "Asesoría técnica", detail: "Arquitectura y producto" },
      { label: "Revisión de proyectos", detail: "Código y procesos" },
    ],
  },
  {
    tab: "Inteligencia artificial",
    tone: "success",
    title: "Soluciones de IA para empresas",
    description:
      "Le ayudamos a decidir dónde la inteligencia artificial aporta valor y construimos la solución. Usted trabaja siempre con una persona del equipo, de principio a fin.",
    items: [
      {
        label: "Asesoría en IA",
        detail: "Diagnóstico, casos de uso y hoja de ruta",
      },
      {
        label: "Desarrollo con LLMs",
        detail: "Asistentes, agentes y búsqueda en sus datos",
      },
      {
        label: "Integración y automatización",
        detail: "Conectada a sus sistemas actuales",
      },
    ],
  },
] as const

export const values = [
  {
    title: "Transparencia",
    description:
      "Decimos las cosas como son: lo que cuesta, lo que tarda y lo que no sabemos todavía.",
  },
  {
    title: "Buscar lo mejor",
    description:
      "Oficio y cuidado en cada detalle, aunque nadie lo pida. Se nota en el resultado.",
  },
  {
    title: "Las personas primero",
    description:
      "Usamos IA cuando ayuda a alguien. Cada usuario y cada cliente importa.",
  },
]

export const projectTypes = [
  "App o videojuego",
  "Software a medida",
  "Asesoría técnica",
  "Revisión de proyecto",
  "Asesoría en IA",
  "Desarrollo con LLMs",
  "Integración y automatización con IA",
  "No sé qué necesito",
  "Otro",
] as const

export type ProjectType = (typeof projectTypes)[number]

// Proyectos del carrusel, en orden. Con uno solo se muestra sin controles.
export const projects = [
  {
    name: "Storia",
    kind: "Producto propio",
    status: "Inscripciones abiertas",
    url: "https://storia-one-rho.vercel.app",
    caption: "storia · 2026",
    image: { light: storiaLight, dark: storiaDark },
    description:
      "De una idea a un Pull Request en tu blog. Escribes o grabas la idea, la IA redacta el borrador con la voz de tu marca y Storia abre el Pull Request en el repositorio de tu blog.",
  },
]
