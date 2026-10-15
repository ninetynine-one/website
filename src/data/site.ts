export const site = {
  name: "Ninety Nine One",
  title: "Ninety Nine One — Estudio de software",
  description:
    "Estudio de software independiente en Chile. Creamos aplicaciones, apps y videojuegos propios, y desarrollamos software a medida para empresas.",
  email: "hola@ninetynineone.studio",
  location: "Santiago de Chile",
  legalName: "Ninety Nine One SpA",
}

export const navLinks = [
  { href: "#hacemos", label: "Qué hacemos" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#valores", label: "Valores" },
]

export const socialLinks = [
  { href: "https://www.instagram.com/ninety.nine_one/", label: "Instagram" },
  { href: "https://github.com/ninetynine-one", label: "GitHub" },
]

export const services = [
  {
    title: "Productos propios",
    description:
      "Diseñamos, construimos y mantenemos nuestras propias aplicaciones. Cada una tiene su marca; todas llevan la misma firma.",
    tone: "primary",
    items: [
      { label: "Aplicaciones web", detail: "SaaS" },
      { label: "Apps móviles", detail: "iOS y Android" },
      { label: "Videojuegos", detail: "Descargables y online" },
    ],
  },
  {
    title: "Desarrollo a medida y asesorías",
    description:
      "Construimos el software que su empresa necesita, o la acompañamos a tomar mejores decisiones técnicas. Plazos realistas y avances cada semana.",
    tone: "accent",
    items: [
      { label: "Software a medida", detail: "Web y móvil" },
      { label: "Asesoría técnica", detail: "Arquitectura y producto" },
      { label: "Revisión de proyectos", detail: "Código y procesos" },
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
  "Software a medida",
  "Asesoría técnica",
  "Revisión de proyecto",
  "Otro",
] as const

export const featuredProject = {
  name: "Storia",
  url: "https://storia-one-rho.vercel.app",
  description:
    "De una idea a un Pull Request en tu blog. Escribes o grabas la idea, la IA redacta el borrador con la voz de tu marca y Storia abre el Pull Request en el repositorio de tu blog.",
}
