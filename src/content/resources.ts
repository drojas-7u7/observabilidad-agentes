/** Textos de la sección "Para seguir aprendiendo". */
export const resourcesContent = {
  title: 'Para seguir aprendiendo',
  intro:
    'Si quieres profundizar en lo que hemos visto, aquí tienes la guía completa de la masterclass, una selección de lecturas y un glosario rápido.',
  guide: {
    title: 'Guía completa en PDF',
    text: 'Toda la explicación de la masterclass, paso a paso y con detalle, para estudiar o repasar a tu ritmo.',
    /** Cambiar a true cuando el PDF esté en la carpeta public. */
    isAvailable: false,
    href: '/guia-evaluacion-observabilidad-agentes.pdf',
    downloadLabel: 'Descargar la guía',
    pendingLabel: 'Disponible próximamente',
  },
  readingsTitle: 'Lecturas recomendadas',
  readingsNote: 'Todas en inglés, que es el idioma en el que se publica la mayoría de material sobre el tema.',
  glossaryTitle: 'Glosario rápido',
  bita: '¡Gracias por investigar conmigo, detective!',
}

/** Una lectura recomendada. */
export interface Reading {
  title: string
  source: string
  type: 'Artículo' | 'Documentación' | 'Artículo científico'
  level: 'Básico' | 'Intermedio' | 'Avanzado'
  why: string
  href: string
}

/** Lecturas agrupadas por tema. */
export const readingGroups: { topic: string; readings: Reading[] }[] = [
  {
    topic: 'Qué es un agente',
    readings: [
      {
        title: 'Building effective agents',
        source: 'Anthropic',
        type: 'Artículo',
        level: 'Básico',
        why: 'Explica con claridad qué es un agente, cuándo usarlo y los patrones más comunes.',
        href: 'https://www.anthropic.com/engineering/building-effective-agents',
      },
    ],
  },
  {
    topic: 'Observabilidad',
    readings: [
      {
        title: 'Observability primer',
        source: 'OpenTelemetry',
        type: 'Documentación',
        level: 'Básico',
        why: 'La introducción oficial a logs, métricas, trazas y spans.',
        href: 'https://opentelemetry.io/docs/concepts/observability-primer/',
      },
    ],
  },
  {
    topic: 'Trazas en IA generativa',
    readings: [
      {
        title: 'Semantic conventions for generative AI',
        source: 'OpenTelemetry',
        type: 'Documentación',
        level: 'Intermedio',
        why: 'El vocabulario común (gen_ai.*) que usan las herramientas de observabilidad.',
        href: 'https://opentelemetry.io/docs/specs/semconv/gen-ai/',
      },
      {
        title: 'Documentación de Langfuse',
        source: 'Langfuse',
        type: 'Documentación',
        level: 'Intermedio',
        why: 'Una herramienta de código abierto con muy buenos ejemplos visuales de trazas y evaluaciones.',
        href: 'https://langfuse.com/docs',
      },
    ],
  },
  {
    topic: 'Evaluación',
    readings: [
      {
        title: 'Your AI Product Needs Evals',
        source: 'Hamel Husain',
        type: 'Artículo',
        level: 'Intermedio',
        why: 'Uno de los textos más citados sobre cómo evaluar productos de IA en la práctica.',
        href: 'https://hamel.dev/blog/posts/evals/',
      },
    ],
  },
  {
    topic: 'Historia',
    readings: [
      {
        title: 'Dapper, a Large-Scale Distributed Systems Tracing Infrastructure',
        source: 'Google, 2010',
        type: 'Artículo científico',
        level: 'Avanzado',
        why: 'El artículo que dio origen al modelo de trazas y spans que se usa hoy.',
        href: 'https://research.google/pubs/dapper-a-large-scale-distributed-systems-tracing-infrastructure/',
      },
      {
        title: 'ReAct: Synergizing Reasoning and Acting in Language Models',
        source: 'Yao et al., 2022',
        type: 'Artículo científico',
        level: 'Avanzado',
        why: 'El patrón de razonar y actuar en bucle en el que se basan muchos agentes.',
        href: 'https://arxiv.org/abs/2210.03629',
      },
    ],
  },
]

/** Glosario de términos clave. */
export const glossary: { term: string; definition: string }[] = [
  { term: 'Agente', definition: 'Un modelo de lenguaje en un bucle, que decide pasos y usa herramientas para cumplir un encargo.' },
  { term: 'Observabilidad', definition: 'La capacidad de reconstruir lo que hizo un sistema, incluso ante preguntas que no habías previsto.' },
  { term: 'Instrumentar', definition: 'Preparar un sistema para que registre lo que hace.' },
  { term: 'Log', definition: 'Una anotación de algo que pasó en un momento concreto.' },
  { term: 'Métrica', definition: 'Un número medido a lo largo del tiempo: duración, tokens, coste, errores.' },
  { term: 'Traza', definition: 'El recorrido completo de una tarea, paso a paso y con su relación de causa y efecto.' },
  { term: 'Span', definition: 'Un tramo de trabajo dentro de una traza, con nombre, duración, estado y datos.' },
  { term: 'Golden set', definition: 'Un conjunto de casos de prueba con la respuesta correcta conocida.' },
  { term: 'LLM como juez', definition: 'Usar un modelo de lenguaje para puntuar lo que no se puede comprobar con una regla exacta.' },
  { term: 'Causa raíz', definition: 'El origen real de un fallo, no solo su síntoma.' },
  { term: 'Post-mortem', definition: 'Un informe de qué pasó en una incidencia y qué se aprende, sin buscar culpables.' },
]
