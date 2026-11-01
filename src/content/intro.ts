/** Textos de la introducción (parte 1). */
export const introContent = {
  title: 'El plan de la investigación',
  lead: 'Antes de abrir el expediente, este es el mapa: qué vamos a ver, cuánto dura cada parte y cómo vais a participar.',
  routeTitle: 'El recorrido',
  totalDuration: 'unos 60 minutos',
  howItWorksTitle: 'Cómo funciona la clase',
  bitaMessage: 'Este es el plan, detectives. ¡Vamos a por el caso!',
}

/** Una parada del recorrido. */
export interface RouteStep {
  /** Identificador de la sección a la que lleva (ver src/config/sections.ts). */
  sectionId: string
  part: number
  title: string
  description: string
  duration: string
}

export const routeSteps: RouteStep[] = [
  {
    sectionId: 'el-caso',
    part: 2,
    title: 'El caso',
    description: 'La queja de una clienta que nadie sabe explicar.',
    duration: '4 min',
  },
  {
    sectionId: 'historia',
    part: 3,
    title: 'El expediente histórico',
    description: 'Cómo se ha investigado esto a lo largo de los años.',
    duration: '8 min',
  },
  {
    sectionId: 'lo-que-sabemos',
    part: 4,
    title: 'Lo que ya sabemos',
    description: 'Repaso de lo visto en el bootcamp.',
    duration: '6 min',
  },
  {
    sectionId: 'herramientas',
    part: 5,
    title: 'Las herramientas del detective',
    description: 'Logs, métricas, trazas y spans.',
    duration: '15 min',
  },
  {
    sectionId: 'reto',
    part: 6,
    title: 'Resuelve el caso',
    description: 'El reto práctico.',
    duration: '15 min',
  },
  {
    sectionId: 'cierre',
    part: 7,
    title: 'Cerrar el caso',
    description: 'Evaluación, ética y conclusiones.',
    duration: '9 min',
  },
]

/** Puntos de "cómo funciona la clase". */
export const howItWorks = [
  {
    title: 'Yo explico, la web acompaña',
    text: 'Lo importante lo cuento en voz alta; la web muestra las pruebas y los ejemplos.',
  },
  {
    title: 'Participáis desde vuestro dispositivo',
    text: 'Abrid la web con el QR de la portada: habrá preguntas y un reto final.',
  },
  {
    title: 'Bita os ayuda',
    text: 'Si os atascáis en el reto, pedidle pistas.',
  },
  {
    title: 'El objetivo',
    text: 'Al terminar, el caso del vuelo de 95 € tiene que quedar resuelto.',
  },
]
