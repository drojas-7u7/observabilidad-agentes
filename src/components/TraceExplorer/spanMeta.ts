import type { SpanKind, SpanStatus } from '../../types/trace'

/*
  Textos y colores de los spans, en un único sitio.
  Las clases de Tailwind se escriben completas para que Tailwind las detecte.
*/

export const KIND_LABELS: Record<SpanKind, string> = {
  agent: 'Agente',
  llm: 'Modelo',
  tool: 'Herramienta',
}

export const KIND_BAR_CLASSES: Record<SpanKind, string> = {
  agent: 'bg-ink',
  llm: 'bg-primary',
  tool: 'bg-accent',
}

export const STATUS_LABELS: Record<SpanStatus, string> = {
  ok: 'Correcto',
  warning: 'Aviso',
  error: 'Error',
}

export const STATUS_BADGE_CLASSES: Record<SpanStatus, string> = {
  ok: 'bg-success text-white',
  warning: 'bg-warning text-ink',
  error: 'bg-danger text-white',
}
