import type { Question } from '../types/question'

/** Textos generales de la parte 6. */
export const challengeContent = {
  title: 'Resuelve el caso',
  intro:
    'Antes de investigar, leed el encargo: qué ha pasado, por qué hay que revisarlo y cuál es vuestra misión.',
  fileLabel: 'Expediente nº 001 · El vuelo de 95 euros',
  statusOpen: 'Abierto',
  statusClosed: 'Cerrado',
  stepLabel: 'Paso',
  nextStepLabel: 'Siguiente paso',
  finaleTitle: '¡Caso resuelto!',
  finaleText:
    'El agente dijo que todo había ido bien, pero la traza demostró lo contrario. Ahora queda lo más importante: cerrar el caso y evitar que vuelva a pasar.',
  bitaFinale: '¡Las palabras no son pruebas... pero la traza sí!',
}

/** Un paso de la investigación. */
export interface ChallengeStep {
  id: string
  title: string
  /** Mensaje inicial de Bita en este paso. */
  bitaIntro: string
  /** Contenido adicional que acompaña a la pregunta. */
  context?: 'metrics'
  question: Question
}

export const challengeSteps: ChallengeStep[] = [
  {
    id: 'metricas',
    title: 'Mira las métricas',
    bitaIntro: 'Empecemos por lo fácil: los números.',
    context: 'metrics',
    question: {
      id: 'metricas',
      prompt:
        'Compara las métricas de Catalina con las de Charo, cuya reserva salió bien. ¿Ves algo raro?',
      options: [
        {
          id: 'tiempo',
          text: 'Sí: la de Catalina tardó mucho más.',
          feedback: 'Mira bien: 4,1 s en las dos. El tiempo es prácticamente igual.',
          isCorrect: false,
        },
        {
          id: 'tokens',
          text: 'Sí: la de Catalina gastó muchos más tokens.',
          feedback: 'Solo 22 tokens de diferencia. Eso no es una pista, es ruido.',
          isCorrect: false,
        },
        {
          id: 'errores',
          text: 'Sí: la de Catalina tiene errores.',
          feedback: 'Cero errores en las dos. Cuidado con ver lo que esperas ver.',
          isCorrect: false,
        },
        {
          id: 'iguales',
          text: 'No: son prácticamente iguales.',
          feedback:
            'Exacto. Las métricas avisan de problemas grandes, pero este fallo no se ve en los números.',
          isCorrect: true,
        },
      ],
      hints: ['Recorre la tabla de comparación fila por fila.'],
    },
  },
  {
    id: 'colores',
    title: 'Mira los colores',
    bitaIntro: 'Ahora, la traza de Catalina. ¿Algo en rojo?',
    question: {
      id: 'colores',
      prompt: '¿Hay algún paso con error en la traza de Catalina?',
      options: [
        {
          id: 'reserva',
          text: 'Sí: el paso «Reserva el vuelo».',
          feedback: 'Míralo bien: está en verde, «Correcto».',
          isCorrect: false,
        },
        {
          id: 'respuesta',
          text: 'Sí: el paso «Escribe la respuesta final».',
          feedback: 'También está en verde. Ningún paso se rompió.',
          isCorrect: false,
        },
        {
          id: 'no-se-sabe',
          text: 'No se puede saber sin ver el código.',
          feedback: 'Sí se puede: el estado de cada paso está en la traza.',
          isCorrect: false,
        },
        {
          id: 'todos-verde',
          text: 'No: todos los pasos están en verde.',
          feedback:
            'Todos en verde... y aun así Catalina pagó de más. Verde solo significa que el código no se rompió, no que el agente hiciera bien su trabajo.',
          isCorrect: true,
        },
      ],
      hints: ['Mira la etiqueta de estado de cada paso de la traza.'],
    },
  },
  {
    id: 'pista',
    title: 'Busca la pista',
    bitaIntro: 'Hora de abrir los pasos y mirar dentro.',
    question: {
      id: 'pista',
      prompt: '¿En qué paso aparece por primera vez el precio de 95 €?',
      options: [
        {
          id: 'busca',
          text: 'Busca los vuelos disponibles',
          feedback:
            'Abre ese paso y mira lo que devolvió: los precios eran 120, 98 y 85. Ningún 95.',
          isCorrect: false,
        },
        {
          id: 'elige',
          text: 'Elige el más barato y decide reservarlo',
          feedback: 'Ahí el modelo razona con 85 €. El 95 todavía no ha aparecido.',
          isCorrect: false,
        },
        {
          id: 'reserva',
          text: 'Reserva el vuelo',
          feedback:
            '¡Ahí está! La reserva devolvió precio_final: 95. La prueba estaba dentro del paso.',
          isCorrect: true,
        },
        {
          id: 'respuesta',
          text: 'Escribe la respuesta final',
          feedback: 'En su respuesta dice 85... aunque el 95 ya había aparecido antes. ¿Dónde?',
          isCorrect: false,
        },
      ],
      hints: [
        'Las herramientas dicen lo que saben. Abre sus pasos.',
        'Fíjate en lo que devolvió la reserva.',
      ],
    },
  },
  {
    id: 'decision',
    title: 'Encuentra la decisión equivocada',
    bitaIntro: 'Ya tenemos la prueba. ¿Qué salió mal exactamente?',
    question: {
      id: 'decision',
      prompt: '¿Qué salió mal?',
      options: [
        {
          id: 'vuelo-equivocado',
          text: 'El agente eligió el vuelo equivocado.',
          feedback:
            'No: eligió AeroBrisa, que incluso con tasas (95 €) seguía siendo el más barato.',
          isCorrect: false,
        },
        {
          id: 'cobro',
          text: 'El cobro del banco fue un error.',
          feedback: 'El banco cobró lo que la reserva confirmó: 95 €. El cobro fue correcto.',
          isCorrect: false,
        },
        {
          id: 'precio-final',
          text: 'La búsqueda dio precios sin tasas y el agente no revisó el precio final antes de responder.',
          feedback:
            'Eso es. El modelo tenía delante el precio final de 95 € y dijo 85. El fallo no está en una línea de código: está en una decisión.',
          isCorrect: true,
        },
        {
          id: 'encargo',
          text: 'Catalina pidió mal el vuelo.',
          feedback:
            'Su encargo era claro: el más barato, de Madrid a Barcelona, por menos de 100 €. Y se cumplió.',
          isCorrect: false,
        },
      ],
      hints: [
        'Compara lo que devolvió la búsqueda con lo que devolvió la reserva.',
        'Abre el último paso: ¿qué recibió el modelo y qué dijo?',
      ],
    },
  },
  {
    id: 'culpa',
    title: '¿De quién es la culpa?',
    bitaIntro: 'Última pregunta, detectives.',
    question: {
      id: 'culpa',
      prompt: '¿Quién es el responsable del fallo?',
      options: [
        {
          id: 'modelo',
          text: 'El modelo.',
          feedback:
            'En parte sí... pero ¿la herramienta de búsqueda ayudó? Su campo «precio» no decía que era sin tasas.',
          isCorrect: false,
        },
        {
          id: 'herramienta',
          text: 'La herramienta de búsqueda.',
          feedback: 'En parte sí... pero el modelo tenía el precio final delante y no lo usó.',
          isCorrect: false,
        },
        {
          id: 'los-dos',
          text: 'Los dos.',
          feedback:
            'Los dos: la herramienta era ambigua y el modelo no comprobó el dato. No siempre la culpa es solo del modelo.',
          isCorrect: true,
        },
        {
          id: 'nadie',
          text: 'Nadie: fue mala suerte.',
          feedback:
            'En los agentes, la «mala suerte» casi siempre deja huellas en la traza. Y aquí las hay.',
          isCorrect: false,
        },
      ],
      hints: [
        'Piensa en las dos piezas que intervinieron: lo que dio la herramienta y lo que hizo el modelo.',
      ],
    },
  },
]

/** El encargo del reto: el contexto antes de investigar. */
export const challengeBriefing = {
  ticketLabel: 'Incidencia #4127',
  priority: 'Prioridad alta',
  openedBy: 'Abierta por: Atención al cliente',
  company:
    'Destino Directo es una agencia de viajes online (ficticia) que atiende a sus clientes con un agente de IA.',
  whatTitle: 'Qué ha pasado',
  what: 'Catalina reservó un vuelo de Madrid a Barcelona por el chat. El agente le confirmó 85 €, pero en su tarjeta se cargaron 95 €. Ha reclamado la diferencia.',
  whyTitle: 'Por qué importa',
  why: 'Si el agente informa mal de los precios, no le pasará solo a Catalina: puede estar pasándoles a cientos de clientes, con reclamaciones, devoluciones y pérdida de confianza.',
  roleTitle: 'Tu papel',
  role: 'Formas parte del equipo de IA de Destino Directo. Cuando un cliente se queja de algo que hizo el agente, os toca investigarlo.',
  evidenceTitle: 'De dónde sale la prueba',
  evidence:
    'El agente está instrumentado: cada conversación queda registrada como una traza. Hemos localizado la de Catalina con su localizador de reserva, M3X8RT.',
  whoTitle: 'Quiénes aparecen',
  who: [
    { name: 'Catalina', text: 'La clienta de la queja. Su conversación es la que investigamos.' },
    {
      name: 'Charo',
      text: 'Otra clienta que reservó con el mismo agente y a la que todo le salió bien. Nos sirve de comparación.',
    },
  ],
  missionTitle: 'Tu misión',
  mission: 'Descubrir qué falló, en qué paso y por qué, para que el equipo pueda arreglarlo.',
  bitaReady: '¿Preparados, detectives?',
  startLabel: 'Abrir la traza de Catalina',
  recallLabel: 'Recordar el encargo',
  stepsIntro:
    'Seguid los pasos de la investigación: en cada uno hay una pregunta. Si os atascáis, pedid pistas a Bita.',
  traceDescription: 'Conversación de Catalina, localizada por su localizador de reserva M3X8RT.',
}

/** Un paso del proceso profesional tras encontrar el fallo. */
export interface AfterFindingStep {
  /** Quién se encarga. */
  owner: string
  /** Qué hace. */
  text: string
}

/** Después del reto: para qué sirve encontrar el fallo y cómo se gestiona. */
export const afterFinding = {
  title: 'Y ahora, ¿qué?',
  intro:
    'Encontrar el fallo no es el final: es el principio de la solución. Investigar una traza sirve para cuatro cosas:',
  purposes: [
    { title: 'Reparar a la clienta', text: 'Devolver a Catalina los 10 € y explicarle qué pasó.' },
    {
      title: 'Medir el impacto',
      text: 'Buscar en las trazas cuántos clientes más sufrieron lo mismo.',
    },
    {
      title: 'Arreglar la causa',
      text: 'Corregir el origen del fallo (la causa raíz), no solo el caso de Catalina.',
    },
    {
      title: 'Evitar que se repita',
      text: 'Convertir el caso en una prueba automática para que no vuelva a colarse.',
    },
  ],
  processTitle: 'Así se gestiona profesionalmente',
  processIntro:
    'Cada paso tiene un responsable. La traza es lo que permite a todos trabajar con datos en lugar de con opiniones.',
  steps: [
    {
      owner: 'Atención al cliente',
      text: 'Recibe la queja, abre la incidencia y devuelve los 10 € a Catalina.',
    },
    {
      owner: 'Equipo de IA',
      text: 'Investiga la traza y encuentra la causa raíz: la búsqueda da precios sin tasas y el agente no revisa el precio final.',
    },
    {
      owner: 'Equipo de IA',
      text: 'Busca en todas las trazas el mismo patrón (precio dicho distinto del precio cobrado) para saber a cuántos clientes afectó.',
    },
    {
      owner: 'Equipo de backend',
      text: 'Como responsables de la herramienta de búsqueda, cambian el campo para que devuelva siempre el precio final con tasas.',
    },
    {
      owner: 'Equipo de IA',
      text: 'Ajusta las instrucciones del agente para que confirme el precio con lo que devuelve la reserva.',
    },
    {
      owner: 'Calidad (QA)',
      text: 'Añade el caso de Catalina a las pruebas automáticas y comprueba el arreglo antes de publicarlo.',
    },
    {
      owner: 'Todos',
      text: 'Escriben un post-mortem: un informe de qué pasó y qué se aprende, sin buscar culpables. Atención al cliente avisa a los afectados.',
    },
  ] satisfies AfterFindingStep[],
  closingNote:
    'En la siguiente sección de esta masterclass, «Cerrar el caso», veremos cómo se arregla el fallo y, sobre todo, cómo se comprueba que no vuelva a pasar.',
}
