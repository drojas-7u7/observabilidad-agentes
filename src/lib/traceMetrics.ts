import type { Span, Trace } from '../types/trace'

/**
 * Precios simulados del modelo, en euros por millón de tokens.
 * El modelo de las trazas es inventado, así que los precios también.
 */
const PRICE_PER_MILLION_TOKENS = {
  input: 1,
  output: 4,
}

/** Métricas de una traza, calculadas a partir de sus spans. */
export interface TraceMetrics {
  durationMs: number
  inputTokens: number
  outputTokens: number
  totalTokens: number
  costEur: number
  llmCalls: number
  toolCalls: number
  errorCount: number
}

/** Lee un atributo numérico de un span. Si no existe o no es un número, devuelve 0. */
function getNumberAttribute(span: Span, key: string): number {
  const value = span.attributes[key]
  return typeof value === 'number' ? value : 0
}

/** Calcula todas las métricas de una traza. */
export function getTraceMetrics(trace: Trace): TraceMetrics {
  const root = trace.spans.find((span) => span.parentId === null)

  let inputTokens = 0
  let outputTokens = 0

  for (const span of trace.spans) {
    inputTokens += getNumberAttribute(span, 'gen_ai.usage.input_tokens')
    outputTokens += getNumberAttribute(span, 'gen_ai.usage.output_tokens')
  }

  const costEur =
    (inputTokens * PRICE_PER_MILLION_TOKENS.input +
      outputTokens * PRICE_PER_MILLION_TOKENS.output) /
    1_000_000

  return {
    durationMs: root?.durationMs ?? 0,
    inputTokens,
    outputTokens,
    totalTokens: inputTokens + outputTokens,
    costEur,
    llmCalls: trace.spans.filter((span) => span.kind === 'llm').length,
    toolCalls: trace.spans.filter((span) => span.kind === 'tool').length,
    errorCount: trace.spans.filter((span) => span.status === 'error').length,
  }
}
