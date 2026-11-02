import { catalinaTrace } from '../../data/traces/catalina'
import { charoTrace } from '../../data/traces/charo'
import { formatCost, formatDuration, formatNumber } from '../../lib/format'
import { getTraceMetrics, type TraceMetrics } from '../../lib/traceMetrics'

/** Filas de la tabla: qué métrica y cómo se muestra. */
const ROWS: { label: string; format: (metrics: TraceMetrics) => string }[] = [
  { label: 'Duración', format: (m) => formatDuration(m.durationMs) },
  { label: 'Tokens', format: (m) => formatNumber(m.totalTokens) },
  { label: 'Coste', format: (m) => formatCost(m.costEur) },
  { label: 'Pasos', format: (m) => String(m.llmCalls + m.toolCalls) },
  { label: 'Errores', format: (m) => String(m.errorCount) },
]

/** Tabla que compara las métricas de Charo y de Catalina (calculadas de sus trazas). */
export function MetricsComparison() {
  const charo = getTraceMetrics(charoTrace)
  const catalina = getTraceMetrics(catalinaTrace)

  return (
    <table className="mb-6 w-full max-w-xl overflow-hidden rounded-xl border-2 border-ink bg-white text-left text-sm">
      <thead className="bg-ink text-background">
        <tr>
          <th className="px-3 py-2 font-normal">Métrica</th>
          <th className="px-3 py-2">{charoTrace.client} (salió bien)</th>
          <th className="px-3 py-2">{catalinaTrace.client} (el caso)</th>
        </tr>
      </thead>
      <tbody>
        {ROWS.map((row) => (
          <tr key={row.label} className="border-t border-ink/10">
            <td className="px-3 py-2">{row.label}</td>
            <td className="px-3 py-2 font-mono font-bold">{row.format(charo)}</td>
            <td className="px-3 py-2 font-mono font-bold">{row.format(catalina)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
