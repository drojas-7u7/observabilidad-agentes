import type { SpanStatus } from '../../types/trace'
import { STATUS_BADGE_CLASSES, STATUS_LABELS } from './spanMeta'

/** Etiqueta con el estado técnico de un span. Ancho fijo para alinear las filas. */
export function StatusBadge({ status }: { status: SpanStatus }) {
  return (
    <span
      className={`inline-flex w-20 shrink-0 items-center justify-center rounded-full py-0.5 text-xs font-bold ${STATUS_BADGE_CLASSES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  )
}
