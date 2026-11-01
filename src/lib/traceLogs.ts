import type { Trace } from '../types/trace'
import { formatDuration } from './format'

/** Nivel de log según el estado del span. */
const LOG_LEVEL = {
  ok: 'INFO ',
  warning: 'WARN ',
  error: 'ERROR',
} as const

/**
 * Convierte los spans de una traza en líneas de log estructurado,
 * ordenadas por momento de inicio. No incluye el span raíz del agente.
 */
export function traceToLogLines(trace: Trace): string[] {
  return trace.spans
    .filter((span) => span.parentId !== null)
    .sort((a, b) => a.startMs - b.startMs)
    .map(
      (span) =>
        `+${formatDuration(span.startMs).padEnd(7)} ${LOG_LEVEL[span.status]} ${span.name} estado=${span.status}`,
    )
}
