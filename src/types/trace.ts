/**
 * Formato de las trazas de la web.
 * Inspirado en el estándar OpenTelemetry (convenciones gen_ai.*).
 */

/** Cualquier valor que se pueda representar como JSON. */
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue }

/** Tipo de span: el agente completo, una llamada al modelo o una herramienta. */
export type SpanKind = 'agent' | 'llm' | 'tool'

/** Estado técnico del span. Ojo: "ok" no significa que la tarea se hiciera bien. */
export type SpanStatus = 'ok' | 'warning' | 'error'

/** Un tramo de trabajo dentro de una traza. */
export interface Span {
  /** Identificador único del span. */
  id: string
  /** Span que lo provocó. null si es la raíz del árbol. */
  parentId: string | null
  kind: SpanKind
  /** Nombre técnico, como lo mostraría una herramienta real. */
  name: string
  /** Descripción en español para el público. */
  label: string
  status: SpanStatus
  /** Milisegundos desde el inicio de la traza. */
  startMs: number
  /** Duración en milisegundos. */
  durationMs: number
  /** Lo que recibió. */
  input?: JsonValue
  /** Lo que devolvió. */
  output?: JsonValue
  /** Atributos técnicos (modelo, tokens, nombre de la herramienta...). */
  attributes: Record<string, string | number | boolean>
}

/** Una traza completa: la ejecución de una tarea del agente. */
export interface Trace {
  /** Identificador único de la traza. */
  id: string
  /** Nombre de la clienta (ficticia). */
  client: string
  /** Encargo que hizo la clienta. */
  request: string
  /** Respuesta final que dio el agente. */
  finalAnswer: string
  /** Momento de inicio, en formato ISO. */
  startedAt: string
  /** Todos los spans de la traza. */
  spans: Span[]
}
