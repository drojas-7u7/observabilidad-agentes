/** Textos generales de la parte 7. */
export const closingContent = {
  title: 'Cerrar el caso',
  intro:
    'Hemos encontrado el fallo. Ahora toca arreglarlo, comprobar que no vuelva a pasar y hacerlo con responsabilidad.',
  nextMomentLabel: 'Siguiente momento',
}

/** Identificadores de los momentos de la parte 7. */
export type ClosingMomentId = 'arreglar' | 'evaluar' | 'ciclo' | 'etica' | 'conclusiones'

export const closingMoments: { id: ClosingMomentId; title: string }[] = [
  { id: 'arreglar', title: 'Arreglar el fallo' },
  { id: 'evaluar', title: 'Evaluar: que no vuelva a pasar' },
  { id: 'ciclo', title: 'El ciclo completo' },
  { id: 'etica', title: 'Riesgos y ética' },
  { id: 'conclusiones', title: 'Conclusiones' },
]

/** Momento 1: los dos arreglos. */
export const fixMoment = {
  idea: 'Como la culpa era de los dos, hay dos arreglos: uno en la herramienta y otro en el agente.',
  toggleLabel: 'Versión',
  beforeLabel: 'Antes del arreglo',
  afterLabel: 'Después del arreglo',
  toolTitle: 'Lo que devuelve la herramienta buscar_vuelos',
  toolBefore: { codigo: 'AB0738', aerolinea: 'AeroBrisa', precio: 85 },
  toolAfter: {
    codigo: 'AB0738',
    aerolinea: 'AeroBrisa',
    precio_sin_tasas: 85,
    tasas: 10,
    precio_final: 95,
  },
  toolNoteBefore: 'El campo «precio» no dice si incluye las tasas.',
  toolNoteAfter: 'Cada campo dice exactamente lo que es.',
  agentTitle: 'Instrucciones del agente',
  agentBefore: 'Cuando termines la reserva, informa al cliente del vuelo y del precio.',
  agentAfter:
    'Cuando termines la reserva, informa al cliente del vuelo y del precio_final que devuelve reservar_vuelo. Nunca uses el precio de la búsqueda.',
  agentNoteBefore: 'No dice de dónde sacar el precio.',
  agentNoteAfter: 'Dice exactamente qué dato usar.',
  bita: 'Un buen arreglo ataca la causa, no el síntoma.',
}

/** Quién puede comprobar algo en una evaluación. */
export type CheckerId = 'codigo' | 'juez' | 'persona'

/** Momento 2: evaluar. */
export const evaluateMoment = {
  idea: 'Observar no es evaluar. La traza nos dijo qué pasó; ahora hay que comprobar, cada vez que cambiemos algo, que el agente lo hace bien.',
  goldenSetTitle: 'El golden set',
  goldenSetText:
    'Un conjunto de casos de prueba preparados por personas, con la respuesta correcta conocida. El caso de Catalina pasa a ser uno más, para que su fallo no vuelva a colarse.',
  checkersTitle: '¿Quién debería comprobar cada cosa?',
  checkersInstruction: 'Elige una opción en cada frase.',
  checkerOptions: [
    { id: 'codigo', label: 'Código' },
    { id: 'juez', label: 'LLM como juez' },
    { id: 'persona', label: 'Una persona' },
  ] satisfies { id: CheckerId; label: string }[],
  checks: [
    {
      id: 'precio',
      text: 'El precio que dice el agente coincide con el precio cobrado.',
      answer: 'codigo',
      explanation:
        'Es una regla exacta: dos números deben ser iguales. El código lo comprueba gratis, rápido y sin equivocarse.',
    },
    {
      id: 'tono',
      text: 'La respuesta a la clienta es clara y amable.',
      answer: 'juez',
      explanation:
        'No hay una regla exacta para «amable». Otro modelo puede puntuarlo... pero hay que comprobar que ese juez acierta.',
    },
    {
      id: 'nuevo',
      text: 'Decidir cuál es la respuesta correcta de un caso nuevo.',
      answer: 'persona',
      explanation:
        'Alguien tiene que definir qué es «correcto». Es lo más fiable y lo más caro, y además sirve para comprobar al juez.',
    },
  ] satisfies { id: string; text: string; answer: CheckerId; explanation: string }[],
  wrongAnswer: 'No es la mejor opción. Pregúntate: ¿hay una regla exacta para comprobarlo?',
  runTitle: 'Ejecutar el golden set',
  runBeforeLabel: 'Probar el agente antes del arreglo',
  runAfterLabel: 'Probar el agente después del arreglo',
  totalCases: 20,
  /** Posiciones (empezando en 0) de los casos que fallan antes del arreglo. */
  failingCases: [3, 11, 16],
  /** Posición del caso de Catalina. */
  catalinaCase: 11,
  catalinaLabel: 'El recuadro con borde dorado es el caso de Catalina.',
  resultBefore: '17 de 20 correctos. Uno de los fallos es el caso de Catalina: no se puede publicar.',
  resultAfter: '20 de 20 correctos. Ahora sí se puede publicar el cambio.',
  bitaAfter: 'Ahora sí tenemos pruebas de que funciona.',
  offlineOnline:
    'Esto es la evaluación offline: antes de publicar. Con clientes reales se hace también evaluación online: se revisa automáticamente una parte de las conversaciones y se recoge la opinión de los usuarios.',
  realWorld: {
    text: 'Herramientas como LangSmith o Langfuse permiten guardar golden sets (los llaman datasets), ejecutar el agente contra ellos, usar jueces automáticos y comparar los resultados entre versiones.',
    links: [
      { label: 'LangSmith', href: 'https://docs.langchain.com/langsmith' },
      { label: 'Langfuse', href: 'https://langfuse.com/docs' },
    ],
  },
}

/** Un paso del ciclo de mejora continua. */
export interface CycleStep {
  title: string
  text: string
  /** El paso aplicado al caso de Catalina. */
  example: string
}

/** Momento 3: el ciclo completo. */
export const cycleMoment = {
  idea: 'Todo lo que hemos visto encaja en un ciclo que no termina nunca: así mejora un agente en producción.',
  center: 'Mejora continua',
  startLabel: 'Empezar el recorrido',
  nextLabel: 'Siguiente paso del ciclo',
  exampleLabel: 'En el caso de Catalina',
  placeholder: 'Pulsa el botón para recorrer el ciclo paso a paso.',
  steps: [
    {
      title: 'Trabaja',
      text: 'El agente atiende a clientes reales.',
      example: 'Catalina reserva su vuelo.',
    },
    {
      title: 'Registra',
      text: 'La observabilidad guarda cada tarea como una traza.',
      example: 'Su conversación queda registrada.',
    },
    {
      title: 'Avisa',
      text: 'Las métricas y las quejas avisan de que algo va mal.',
      example: 'Catalina reclama los 10 € de diferencia.',
    },
    {
      title: 'Investiga',
      text: 'Con las trazas se encuentra la causa del fallo (debugging).',
      example: 'El precio final de 95 € estaba en la reserva.',
    },
    {
      title: 'Aprende',
      text: 'El fallo se convierte en un caso del golden set.',
      example: 'El caso de Catalina pasa a ser una prueba.',
    },
    {
      title: 'Corrige',
      text: 'Se arregla la herramienta, el agente o los dos.',
      example: 'Campo precio_final e instrucciones nuevas.',
    },
    {
      title: 'Evalúa',
      text: 'Se ejecuta el golden set antes de publicar.',
      example: '20 de 20 correctos.',
    },
    {
      title: 'Publica',
      text: 'Se publica el cambio... y vuelta a empezar.',
      example: 'El agente vuelve a atender clientes, ya corregido.',
    },
  ] satisfies CycleStep[],
  summary:
    'No puedes evaluar lo que no observas, y observar sin evaluar solo te da datos sin criterio.',
}

/** Momento 4: riesgos y ética. */
export const ethicsMoment = {
  idea: 'Observar un agente significa guardar lo que hacen y dicen los clientes. Eso exige hacerlo con responsabilidad.',
  exampleTitle: 'Si el agente guardara los datos de Catalina en la traza...',
  toggleLabel: 'Cómo se guardan los datos',
  carelessLabel: 'Guardado sin cuidado',
  carefulLabel: 'Guardado correctamente',
  careless: {
    cliente: 'Catalina Ruiz Gómez',
    email: 'catalina.ruiz@correo-ficticio.es',
    telefono: '600 000 000',
    tarjeta: '1234 5678 9012 3456',
  },
  careful: {
    cliente: 'C*** R*** G***',
    email: 'c***@***',
    telefono: '*** *** ***',
    tarjeta: '**** **** **** 3456',
  },
  carelessNote:
    'Cualquiera con acceso a la herramienta de observabilidad vería datos personales y de pago.',
  carefulNote:
    'Los datos sensibles se ocultan antes de guardarse, y la traza sigue sirviendo para investigar.',
  fakeDataNote: 'Todos los datos de este ejemplo son inventados.',
  risksTitle: 'Los riesgos que hay que vigilar',
  risks: [
    {
      title: 'Privacidad',
      text: 'Las trazas guardan lo que escriben los clientes. Los datos personales hay que ocultarlos antes de guardarlos: el RGPD lo exige.',
    },
    {
      title: 'Secretos',
      text: 'Nunca deben quedar claves de API ni contraseñas en una traza.',
    },
    {
      title: 'Coste',
      text: 'Guardar y evaluar todo cuesta dinero y espacio. Hay que decidir qué se guarda y durante cuánto tiempo.',
    },
    {
      title: 'Falsa confianza',
      text: 'Pasos en verde y un juez sin comprobar pueden hacer creer que todo va bien cuando no es así.',
    },
    {
      title: 'Sesgos del juez',
      text: 'Un LLM juez puede preferir respuestas largas o puntuar distinto según el idioma. Por eso se comprueba con personas.',
    },
  ],
  realWorld: {
    text: 'Las herramientas profesionales de observabilidad permiten ocultar o filtrar datos sensibles antes de enviarlos, y definir cuánto tiempo se conservan las trazas. Es una configuración que conviene decidir desde el primer día, no cuando ya ha habido un problema.',
  },
}

/** Momento 5: conclusiones. */
export const conclusionsMoment = {
  questionLabel: 'Volvamos a la pregunta del principio',
  question: 'Tu agente dice que todo ha ido bien. ¿Cómo lo sabes?',
  answer: 'Con trazas, para saber qué pasó. Y con evaluación, para saber si estuvo bien.',
  ideasTitle: 'Tres ideas para llevarse',
  ideas: [
    'Las palabras del agente no son pruebas; la traza sí.',
    'Verde no significa correcto.',
    'Cada fallo encontrado se convierte en una prueba para que no vuelva a pasar.',
  ],
  bita: '¡Las palabras no son pruebas!',
  questionsTitle: '¿Preguntas?',
  thanks: 'Gracias por investigar conmigo.',
}
