import { motion } from 'motion/react'
import { formatDuration } from '../../lib/format'
import type { SpanNode } from '../../lib/traceTree'
import { KIND_BAR_CLASSES, KIND_LABELS } from './spanMeta'
import { StatusBadge } from './StatusBadge'

interface SpanRowProps {
  node: SpanNode
  /** Duración total de la traza, para calcular la posición de la barra. */
  totalMs: number
  isSelected: boolean
  onSelect: (spanId: string) => void
  /** Posición en la lista, para escalonar la animación de entrada. */
  index: number
}

/**
 * Una fila de la traza, siempre con la misma estructura:
 * - Línea 1: conector del árbol, tipo y descripción.
 * - Línea 2: estado, duración y barra en la línea de tiempo (sin sangría,
 *   para que todas las barras compartan la misma escala).
 */
export function SpanRow({ node, totalMs, isSelected, onSelect, index }: SpanRowProps) {
  const { span, depth, isLastChild } = node
  const left = (span.startMs / totalMs) * 100
  const width = Math.max((span.durationMs / totalMs) * 100, 1)

  return (
    <motion.li
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ delay: index * 0.15, duration: 0.3 }}
    >
      <button
        type="button"
        onClick={() => onSelect(span.id)}
        aria-pressed={isSelected}
        className={`flex w-full flex-col gap-1.5 rounded-xl border-2 px-3 py-2 text-left transition-colors ${
          isSelected ? 'border-primary bg-white' : 'border-transparent hover:bg-white/60'
        }`}
      >
        <span
          className="flex min-w-0 items-center gap-2"
          style={{ paddingLeft: `${Math.max(depth - 1, 0) * 1.5}rem` }}
        >
          {depth > 0 && (
            <span className="w-6 shrink-0 font-mono text-ink/40" aria-hidden="true">
              {isLastChild ? '└─' : '├─'}
            </span>
          )}
          <span className="w-24 shrink-0 rounded-md bg-ink/10 py-0.5 text-center font-mono text-xs">
            {KIND_LABELS[span.kind]}
          </span>
          <span className="truncate font-semibold" title={span.label}>
            {span.label}
          </span>
        </span>

        <span className="flex items-center gap-2">
          <StatusBadge status={span.status} />
          <span className="w-14 shrink-0 font-mono text-xs text-ink/70">
            {formatDuration(span.durationMs)}
          </span>
          <span className="relative block h-2.5 flex-1 rounded-full bg-ink/10" aria-hidden="true">
            <span
              className={`absolute inset-y-0 rounded-full ${KIND_BAR_CLASSES[span.kind]}`}
              style={{ left: `${left}%`, width: `${width}%` }}
            />
          </span>
        </span>
      </button>
    </motion.li>
  )
}
