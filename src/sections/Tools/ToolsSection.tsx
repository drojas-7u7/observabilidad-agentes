import { SectionShell } from '../../components/SectionShell/SectionShell'
import { catalinaTrace } from '../../data/traces/catalina'
import { charoTrace } from '../../data/traces/charo'
import { formatCost, formatDuration, formatNumber } from '../../lib/format'
import { getTraceMetrics } from '../../lib/traceMetrics'
import type { SectionProps } from '../../types/section'

// Provisional: comprobación de las métricas calculadas.
const traces = [charoTrace, catalinaTrace]

export function ToolsSection({ id }: SectionProps) {
  return (
    <SectionShell id={id} eyebrow="Parte 5" title="Las herramientas del detective">
      <p>Comprobación provisional de las métricas:</p>
      <ul className="mt-4 space-y-2 font-mono text-sm">
        {traces.map((trace) => {
          const metrics = getTraceMetrics(trace)
          return (
            <li key={trace.id}>
              {trace.client}: {formatDuration(metrics.durationMs)} ·{' '}
              {formatNumber(metrics.totalTokens)} tokens · {formatCost(metrics.costEur)} ·{' '}
              {metrics.llmCalls} llamadas al modelo · {metrics.toolCalls} herramientas ·{' '}
              {metrics.errorCount} errores
            </li>
          )
        })}
      </ul>
    </SectionShell>
  )
}
