import type { SpanStatus } from '../types/trace'

/** Textos generales de la parte 5. */
export const toolsContent = {
  title: 'Las herramientas del detective',
  intro: 'Para resolver el caso necesitamos pruebas. Estas son las herramientas para conseguirlas.',
  nextMomentLabel: 'Siguiente momento',
}

/** Identificadores de los momentos de la parte 5. */
export type MomentId = 'observar' | 'instrumentar' | 'pistas' | 'traza'

export const moments: { id: MomentId; title: string }[] = [
  { id: 'observar', title: 'Monitorizar frente a observar' },
  { id: 'instrumentar', title: 'Instrumentar' },
  { id: 'pistas', title: 'Las tres pistas' },
  { id: 'traza', title: 'Leer una traza' },
]

/** Una lectura registrada por el coche. */
export interface CarReading {
  time: string
  sensor: string
  value: string
  status: SpanStatus
}

/** Momento 1: el ejemplo del coche. */
export const carMoment = {
  idea: 'Monitorizar es vigilar lo que ya sabes que quieres vigilar. Observar es poder averiguar lo que no habías previsto.',
  dashboardTitle: 'El salpicadero',
  warning: 'Revisar motor',
  warningNote: 'Algo va mal... pero ¿qué?',
  button: 'Llevar al taller',
  workshopPlaceholder: 'Aquí aparecerá lo que encuentre el mecánico.',
  workshopTitle: 'Lo que el coche registró durante el viaje',
  readings: [
    { time: '10:31', sensor: 'Temperatura del motor', value: '92 °C', status: 'ok' },
    { time: '10:32', sensor: 'Ventilador', value: 'Sin respuesta', status: 'error' },
    { time: '10:33', sensor: 'Temperatura del motor', value: '118 °C', status: 'warning' },
    { time: '10:34', sensor: 'Motor', value: 'Modo de protección', status: 'warning' },
  ] satisfies CarReading[],
  diagnosis: 'Diagnóstico: el ventilador falló y el motor se sobrecalentó.',
  mappingTitle: 'Con los agentes pasa lo mismo',
  mapping: [
    { car: 'El testigo del salpicadero', agent: 'Las métricas y alertas' },
    { car: 'Los datos que registra el coche', agent: 'Las trazas y los logs' },
    { car: 'El mecánico con su aparato', agent: 'Tú, haciendo debugging' },
    { car: 'Preparar el coche para registrar', agent: 'Instrumentar el agente' },
  ],
  realWorld: {
    text: 'Los equipos técnicos tienen paneles con gráficas y alertas, en herramientas como Grafana o Datadog: es el salpicadero. Cuando salta una alerta, abren el detalle de lo ocurrido para investigar: es el taller.',
    links: [
      { label: 'Grafana', href: 'https://grafana.com/docs/' },
      { label: 'Datadog', href: 'https://docs.datadoghq.com/' },
    ],
  },
}

/** Momento 2: instrumentar. */
export const instrumentMoment = {
  idea: 'Un sistema no es observable por sí solo: hay que prepararlo para que registre lo que hace. Eso es instrumentar.',
  toggleLabel: 'Estado del agente',
  offLabel: 'Agente sin instrumentar',
  onLabel: 'Agente instrumentado',
  withoutNote: 'Sin instrumentar, solo tenemos su palabra:',
  withNote: 'Instrumentado, tenemos además el registro de todo lo que hizo:',
  agentName: 'Agente de viajes',
  bitaOff: '¿Y si se ha equivocado? ¡Las palabras no son pruebas!',
  bitaOn: 'Ahora sí tenemos pruebas.',
  realWorld: {
    text: 'En la práctica suele ser muy poco código. En un agente hecho con LangGraph, basta con configurar un par de variables de entorno para que todo empiece a registrarse en LangSmith. Con OpenTelemetry, se añade una librería al proyecto.',
    links: [
      { label: 'LangSmith', href: 'https://docs.langchain.com/langsmith' },
      { label: 'OpenTelemetry', href: 'https://opentelemetry.io/docs/' },
    ],
  },
}

/** Identificadores de las tres pistas del momento 3. */
export type ClueId = 'logs' | 'metrics' | 'trace'

/** Momento 3: las tres pistas. */
export const cluesMoment = {
  idea: 'Un agente instrumentado deja tres tipos de pistas, y cada una responde a una pregunta distinta. Vamos a verlas con la reserva de Charo.',
  instruction: 'Pulsa cada pista para descubrirla.',
  revealLabel: 'Descubrir la pista',
  order: ['logs', 'metrics', 'trace'] satisfies ClueId[],
  clues: {
    logs: {
      title: 'Logs',
      question: '¿Qué pasó en cada momento?',
      message: 'Anotaciones sueltas de lo que pasó.',
    },
    metrics: {
      title: 'Métricas',
      question: '¿Cuánto tardó, cuánto costó?',
      message: 'Te avisan de que algo va mal, pero no te dicen por qué.',
    },
    trace: {
      title: 'Traza',
      question: '¿Qué provocó qué?',
      message: 'La historia completa, en orden y con causa y efecto.',
    },
  } satisfies Record<ClueId, { title: string; question: string; message: string }>,
  summary: 'Los logs son frases sueltas en un cuaderno; la traza es el capítulo completo.',
  realWorld: {
    text: 'En las empresas, los logs se guardan en formato estructurado y se consultan con buscadores especializados, como Elasticsearch o Grafana Loki. Las métricas se ven en paneles de coste, tokens y tiempos. Y las trazas, en herramientas como LangSmith, Langfuse o Arize Phoenix.',
    links: [
      { label: 'Grafana Loki', href: 'https://grafana.com/docs/loki/latest/' },
      { label: 'Langfuse', href: 'https://langfuse.com/docs' },
    ],
  },
}

/** Momento 4: leer una traza. */
export const traceMoment = {
  idea: 'Una traza es un árbol de spans. Aprender a leerla es aprender a investigar.',
  keys: [
    {
      title: 'El span',
      text: 'Un tramo de trabajo con nombre, duración, estado y los datos que recibió y devolvió.',
    },
    {
      title: 'Tres tipos',
      text: 'Agente (la tarea entera), Modelo (cada decisión) y Herramienta (cada acción).',
    },
    {
      title: 'El árbol',
      text: 'Cada paso cuelga del que lo provocó. La raíz es el agente.',
    },
    {
      title: 'El estado',
      text: 'El estado técnico de cada paso: verde (correcto), ámbar (aviso) o rojo (error).',
    },
  ],
  explorerDescription:
    'Charo reservó un vuelo Madrid–Sevilla con el mismo agente que Catalina. Su reserva salió bien.',
  bita: 'Prueba: pulsa en «Reserva el vuelo» y mira lo que devolvió. ¿Cuál fue el precio final?',
  standard:
    'Los nombres técnicos (gen_ai.request.model, gen_ai.usage.input_tokens...) siguen el estándar OpenTelemetry: un idioma común que entienden todas las herramientas de observabilidad.',
  realWorld: {
    text: 'Herramientas como LangSmith, Langfuse o Arize Phoenix muestran este mismo árbol para cada ejecución de un agente, con sus tiempos, tokens y datos. Lo que acabas de ver es una versión simplificada de lo que se usa en la industria.',
    links: [
      { label: 'LangSmith', href: 'https://docs.langchain.com/langsmith' },
      { label: 'Langfuse', href: 'https://langfuse.com/docs' },
      {
        label: 'OpenTelemetry para IA generativa',
        href: 'https://opentelemetry.io/docs/specs/semconv/gen-ai/',
      },
    ],
  },
}

/** Presentación de Charo, la primera vez que aparece (momento 3). */
export const charoIntro = {
  title: 'Antes de seguir: conoce a Charo',
  text: 'Charo es otra clienta. Esa misma semana pidió un vuelo al mismo agente que atendió a Catalina, y a ella todo le salió bien:',
  agentName: 'Agente de viajes',
  whyTitle: 'Por qué la usamos',
  why: 'Para aprender a leer las pistas con un caso que funcionó. Así sabremos qué es lo normal, y luego podremos detectar lo que no lo es en el caso de Catalina.',
}
