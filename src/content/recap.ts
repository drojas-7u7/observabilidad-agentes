/** Una tarjeta de repaso de la parte 4. */
export interface RecapCard {
  id: string
  /** Concepto que se repasa. */
  concept: string
  /** Píldora del bootcamp donde se vio. */
  seenIn: string
  /** Qué es, en una frase. */
  what: string
  /** Qué tiene que ver con el caso de Catalina. */
  inTheCase: string
  /** Tarjeta destacada (el puente al tema central). */
  highlight?: boolean
}

export const recapIntro = 'Antes de investigar, repasemos lo que ya sabemos, detectives.'

export const recapCards: RecapCard[] = [
  {
    id: 'llm',
    concept: 'Modelo de lenguaje (LLM)',
    seenIn: 'Fundamentos de LLMs',
    what: 'Un programa que, dado un texto, escribe la continuación más probable. No consulta datos ciertos: predice palabras.',
    inTheCase: 'Es el "cerebro" del agente que atendió a Catalina.',
  },
  {
    id: 'temperatura',
    concept: 'Temperatura y no determinismo',
    seenIn: 'Fundamentos de LLMs',
    what: 'La temperatura mete algo de azar al elegir cada palabra. Por eso el mismo encargo puede dar resultados distintos.',
    inTheCase:
      'Si volvemos a lanzar el encargo de Catalina, puede que esta vez el agente diga bien el precio. No podemos reproducir el fallo a voluntad.',
  },
  {
    id: 'tokens',
    concept: 'Tokens y coste',
    seenIn: 'Gestión de tokens, costes, latencia y rate limits',
    what: 'El modelo trabaja con trozos de texto llamados tokens, y cada token cuesta dinero y tiempo.',
    inTheCase:
      'Cada paso del agente para Catalina ha costado algo. Si se atasca repitiendo pasos, el coste se dispara.',
  },
  {
    id: 'herramientas',
    concept: 'Herramientas (tool use)',
    seenIn: 'Uso de herramientas externas',
    what: 'Funciones que el agente puede pedir que se ejecuten. El modelo pide; el programa ejecuta y le devuelve el resultado.',
    inTheCase: 'El agente usó dos herramientas: buscar_vuelos y reservar_vuelo.',
  },
  {
    id: 'agente',
    concept: 'El agente y su bucle',
    seenIn: 'Framework ReAct e Introducción a Agentes de IA',
    what: 'Un modelo de lenguaje que repite un ciclo: pensar qué hacer, actuar con una herramienta, mirar el resultado y volver a empezar hasta terminar.',
    inTheCase:
      'El agente pensó, buscó, eligió, reservó y respondió. Cada vuelta del bucle es una decisión.',
  },
  {
    id: 'estado',
    concept: 'Estado',
    seenIn: 'LangGraph: estados, grafos y control de ciclos',
    what: 'Todo lo que el agente lleva acumulado en cada momento: el encargo, los resultados de las herramientas y sus decisiones.',
    inTheCase: 'El precio final de 95 € estaba en el estado del agente. Lo tenía delante y no lo usó.',
  },
  {
    id: 'registrar-evaluar',
    concept: 'Ya sabemos registrar y evaluar... pero no agentes',
    seenIn: 'MLflow, evaluación de prompts y evaluación de sistemas RAG',
    what: 'Sabemos guardar lo que pasa al entrenar un modelo y medir la calidad de una respuesta. Pero un agente no es una respuesta: es una cadena de decisiones.',
    inTheCase:
      'Nada de eso nos dice en qué paso se equivocó el agente de Catalina. Para eso necesitamos lo de hoy.',
    highlight: true,
  },
]
