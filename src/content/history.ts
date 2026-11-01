/** Textos de la parte 3. */
export const historyContent = {
  title: 'El expediente histórico',
  intro:
    'En 1960, el ingeniero Rudolf Kálmán definió un sistema "observable": aquel cuyo interior puedes conocer mirando lo que sale de él. Veamos cómo se ha investigado el caso de Catalina a lo largo de los años.',
  instruction: 'Pulsa en cada época para ver la prueba.',
  visitedLabel: 'Vista',
  closing: 'El problema siempre ha sido el mismo: saber qué ha pasado. Lo que cambia es la prueba.',
}

/** Tipo de prueba de cada época (cada una se dibuja de forma distinta). */
export type ProofKind = 'paper' | 'logs' | 'services' | 'agent'

export interface Era {
  id: string
  period: string
  title: string
  story: string
  proofLabel: string
  lesson: string
  proof: ProofKind
}

export const eras: Era[] = [
  {
    id: 'agencia',
    period: 'Años 80 y 90',
    title: 'La agencia de viajes',
    story:
      'Catalina reserva en una agencia. La empleada apunta todo en una ficha de papel y le dice 85 €. Luego le cobran 95 €.',
    proofLabel: 'La prueba: una ficha de papel',
    lesson:
      'Registrar permite reconstruir lo que pasó... pero solo sabes lo que alguien se acordó de apuntar.',
    proof: 'paper',
  },
  {
    id: 'web',
    period: 'Años 2000',
    title: 'La web de reservas',
    story:
      'Catalina reserva en una web. Un único programa lo hace todo y va anotando cada paso en un archivo.',
    proofLabel: 'La prueba: los logs',
    lesson:
      'El registro se hace solo. Y como el programa siempre hace lo mismo, el fallo se puede repetir para estudiarlo.',
    proof: 'logs',
  },
  {
    id: 'servicios',
    period: 'Años 2010',
    title: 'La aplicación con muchos servicios',
    story:
      'La web se divide en servicios pequeños: uno busca, otro reserva y otro cobra. Cada uno escribe sus propios logs.',
    proofLabel: 'La prueba: la traza',
    lesson:
      'No basta con registrar: hay que conectar los registros con un identificador común. Google lo publicó en 2010 (Dapper) y en 2019 nació el estándar OpenTelemetry.',
    proof: 'services',
  },
  {
    id: 'agente',
    period: 'Desde 2023',
    title: 'El agente de IA',
    story:
      'Catalina escribe su encargo en lenguaje natural y un agente decide por su cuenta: busca, elige, reserva y responde. Nada da error.',
    proofLabel: 'La prueba: la traza del agente',
    lesson:
      'Hay que registrar decisiones, no solo acciones. Y volver a ejecutar no sirve: puede hacerlo distinto.',
    proof: 'agent',
  },
]

/** Datos de cada prueba. */
export const proofs = {
  paper: {
    title: 'Ficha de reserva',
    lines: [
      'Clienta: Catalina',
      'Trayecto: Madrid → Barcelona',
      'Día: viernes',
      'Aerolínea: AeroBrisa',
      'Precio: 85 €',
    ],
    note: 'Las tasas no se apuntaron.',
  },
  logs: {
    fileName: 'reservas.log',
    lines: [
      '10:32:05 INFO  buscar   origen=MAD destino=BCN resultados=3',
      '10:32:41 INFO  reservar vuelo=AB0738 precio=85',
      '10:33:12 INFO  cobrar   tarjeta importe=95',
    ],
  },
  services: {
    traceId: 'trace_id 7f3a9c',
    items: [
      { name: 'Búsqueda', log: '3 vuelos encontrados' },
      { name: 'Reserva', log: 'AB0738 · precio 85' },
      { name: 'Cobro', log: 'importe 95' },
    ],
  },
  agent: {
    note: 'Esta la investigaremos juntos.',
  },
}
