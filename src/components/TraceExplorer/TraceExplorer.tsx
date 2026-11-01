import { useMemo, useState } from 'react'
import { flattenSpanTree } from '../../lib/traceTree'
import type { Trace } from '../../types/trace'
import { SpanDetail } from './SpanDetail'
import { SpanRow } from './SpanRow'

interface TraceExplorerProps {
  trace: Trace
}

/**
 * Explorador interactivo de una traza: lista de spans y panel de detalle.
 * En pantallas grandes, los dos ocupan la misma altura.
 */
export function TraceExplorer({ trace }: TraceExplorerProps) {
  const nodes = useMemo(() => flattenSpanTree(trace.spans), [trace])
  const totalMs = nodes[0]?.span.durationMs || 1
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selectedSpan = trace.spans.find((span) => span.id === selectedId) ?? null

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="rounded-2xl border-2 border-ink p-4">
        <header className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-heading text-xl font-bold">Traza de {trace.client}</p>
          <p className="font-mono text-xs text-ink/70">trace_id {trace.id}</p>
        </header>

        <ol className="space-y-1">
          {nodes.map((node, index) => (
            <SpanRow
              key={node.span.id}
              node={node}
              totalMs={totalMs}
              isSelected={node.span.id === selectedId}
              onSelect={setSelectedId}
              index={index}
            />
          ))}
        </ol>
      </div>

      <SpanDetail span={selectedSpan} />
    </div>
  )
}
