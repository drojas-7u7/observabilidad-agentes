import { flattenSpanTree } from '../../lib/traceTree'
import type { Trace } from '../../types/trace'
import { KIND_LABELS } from './spanMeta'

/** Esquema resumido de una traza: solo el árbol de pasos, sin datos ni estados. */
export function TraceOutline({ trace }: { trace: Trace }) {
  const nodes = flattenSpanTree(trace.spans)
  return (
    <ul className="space-y-1 rounded-xl border-2 border-ink bg-white p-3">
      {nodes.map(({ span, depth, isLastChild }) => (
        <li key={span.id} className="flex items-start gap-2 text-sm">
          {depth > 0 && (
            <span className="font-mono text-ink/40" aria-hidden="true">
              {isLastChild ? '└─' : '├─'}
            </span>
          )}
          <span className="w-24 shrink-0 rounded-md bg-ink/10 py-0.5 text-center font-mono text-xs">
            {KIND_LABELS[span.kind]}
          </span>
          <span className="min-w-0">{span.label}</span>
        </li>
      ))}
    </ul>
  )
}
