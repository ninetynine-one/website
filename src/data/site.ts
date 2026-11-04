import storiaLight from "@/assets/projects/storia-light.png"
import storiaDark from "@/assets/projects/storia-dark.png"
// La app de cursos solo tiene modo oscuro: la misma captura sirve para ambos temas.
import cursos from "@/assets/projects/cursos-dark.png"

export const site = {
  name: "Ninety Nine One",
  title: "Ninety Nine One — Estudio de software",
  description:
    "Estudio de software en Chile. Creamos apps y videojuegos propios, y desarrollamos software a medida y soluciones con IA.",
  email: "hola@ninetynineone.studio",
  location: "Santiago de Chile",
  whatsapp: "https://wa.me/56931128428",
  legalName: "Ninety Nine One SpA",
  games: "https://games.ninetynineone.studio",
}

export const navLinks = [
  { href: "/#como", label: "Cómo trabajamos" },
  { href: "/#hacemos", label: "Qué hacemos" },
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#valores", label: "Valores" },
  { href: "/#preguntas", label: "Preguntas" },
  { href: site.games, label: "Juegos" },
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
      "Una llamada de 30 minutos para entender qué necesita y si somos el equipo indicado. No tiene costo.",
  },
  {
    when: "Propuesta",
    title: "Plazo y costo, por escrito",
    description:
      "Una cotización con alcance, plazo y precio cerrado. Si el problema todavía no está claro, partimos con un diagnóstico.",
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
      "Probado, documentado y en sus manos, con garantía después de la entrega final.",
  },
]

export const billing = [
  {
    title: "Diagnóstico",
    description:
      "Cuando hace falta entender el problema antes de cotizar. Se cobra aparte y el resultado es suyo.",
  },
  {
    title: "Cotización cerrada",
    description:
      "El precio no cambia, salvo que cambie el alcance. Cualquier cambio se acuerda por escrito.",
  },
  {
    title: "Pago por hitos",
    description:
      "40 % al iniciar, 30 % a mitad del proyecto y 30 % en la entrega.",
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

// Preguntas de calificación: el panel puntúa al lead con los `value` (mismos enums allá).
export const timelines = [
  { value: "esta_semana", label: "Esta semana" },
  { value: "este_mes", label: "Este mes" },
  { value: "este_trimestre", label: "Este trimestre" },
  { value: "mas_adelante", label: "Más adelante" },
  { value: "explorando", label: "Solo estoy explorando" },
] as const

export const decisions = [
  { value: "solo", label: "Solo yo" },
  { value: "con_equipo", label: "Con un socio o mi equipo" },
  { value: "otra_persona", label: "Lo presento a otra persona" },
] as const

export type Choice = { value: string; label: string }

// Atajos al formulario: cada uno deja elegido su tipo de proyecto.
export const startPoints = [
  {
    title: "Tengo una idea de app o juego",
    description: "La convertimos en un producto que se pueda lanzar.",
    type: "App o videojuego",
  },
  {
    title: "Necesito software para mi empresa",
    description: "Un sistema hecho para cómo trabaja su equipo.",
    type: "Software a medida",
  },
  {
    title: "Quiero usar IA en mi empresa",
    description: "Vemos dónde aporta valor y construimos la solución.",
    type: "Asesoría en IA",
  },
  {
    title: "Tengo un proyecto que no avanza",
    description: "Revisamos el código y el proceso, y le decimos qué hacer.",
    type: "Revisión de proyecto",
  },
  {
    title: "No sé qué necesito",
    description: "Cuéntenos el problema y le decimos por dónde partir.",
    type: "No sé qué necesito",
  },
] satisfies { title: string; description: string; type: ProjectType }[]

export const faqs = [
  {
    question: "¿Cuánto cuesta un proyecto?",
    answer:
      "Depende del alcance. Después de la primera conversación le enviamos una cotización cerrada, con el precio total y lo que incluye.",
  },
  {
    question: "¿Cuánto demora?",
    answer:
      "El plazo va en la cotización. Una asesoría o un piloto suele tomar algunas semanas; un producto completo, algunos meses.",
  },
  {
    question: "¿Qué pasa después de la entrega?",
    answer:
      "Hay un periodo de garantía en que corregimos errores sin costo. Después puede contratar mantención o seguir con su propio equipo.",
  },
  {
    question: "¿De quién es el código?",
    answer:
      "De su empresa, una vez pagado el proyecto. Le entregamos el código fuente y la documentación.",
  },
  {
    question: "¿Firman acuerdos de confidencialidad?",
    answer: "Sí. Si lo necesita, lo firmamos antes de la primera reunión.",
  },
  {
    question: "¿Trabajan con empresas fuera de Chile?",
    answer: "Sí. Trabajamos de forma remota, en español o en inglés.",
  },
]

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
  {
    name: "Plataforma de formación online",
    kind: "Desarrollo a medida",
    status: "En producción",
    url: "https://cursos.eduardoalvarez.dev",
    // Con un nombre largo, «Conocer <nombre>» no cabe en el botón en móviles.
    cta: "Conocer la plataforma",
    caption: "cursos.eduardoalvarez.dev · 2026",
    image: { light: cursos, dark: cursos },
    description:
      "Hecha por y para el fundador de la empresa, instructor de desarrollo de software: venta de cursos, lecciones en video y texto, pruebas, retos revisados y certificados, con un panel de administración donde la IA asiste en la creación de contenido.",
  },
]
