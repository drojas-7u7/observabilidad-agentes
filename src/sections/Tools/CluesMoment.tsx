import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { usePersistentState } from '../../hooks/usePersistentState'
import { RealWorld } from '../../components/RealWorld/RealWorld'
import { CharoIntro } from './CharoIntro'
import { TraceOutline } from '../../components/TraceExplorer/TraceOutline'
import { cluesMoment, type ClueId } from '../../content/tools'
import { charoTrace } from '../../data/traces/charo'
import { formatCost, formatDuration, formatNumber } from '../../lib/format'
import { traceToLogLines } from '../../lib/traceLogs'
import { getTraceMetrics } from '../../lib/traceMetrics'

/** Contenido de cada pista, generado a partir de la traza de Charo. */
function ClueContent({ clueId }: { clueId: ClueId }) {
  if (clueId === 'logs') {
    return (
      <pre className="max-h-48 overflow-auto whitespace-pre-wrap rounded-lg bg-ink p-3 font-mono text-xs leading-relaxed text-background">
        {traceToLogLines(charoTrace).join('\n')}
      </pre>
    )
  }

  if (clueId === 'metrics') {
    const metrics = getTraceMetrics(charoTrace)
    const items = [
      { label: 'Duración', value: formatDuration(metrics.durationMs) },
      { label: 'Tokens', value: formatNumber(metrics.totalTokens) },
      { label: 'Coste', value: formatCost(metrics.costEur) },
      { label: 'Pasos', value: String(metrics.llmCalls + metrics.toolCalls) },
      { label: 'Errores', value: String(metrics.errorCount) },
    ]
    return (
      <dl className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <div key={item.label} className="rounded-lg bg-background p-2">
            <dt className="text-xs text-ink/70">{item.label}</dt>
            <dd className="font-mono text-lg font-bold">{item.value}</dd>
          </div>
        ))}
      </dl>
    )
  }

  return <TraceOutline trace={charoTrace} />
}

/** Tarjeta de una pista: tapada hasta que se descubre. */
function ClueCard({
  clueId,
  isRevealed,
  onReveal,
}: {
  clueId: ClueId
  isRevealed: boolean
  onReveal: () => void
}) {
  const clue = cluesMoment.clues[clueId]
  let body: ReactNode

  if (isRevealed) {
    body = (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <ClueContent clueId={clueId} />
        <p className="mt-3 font-bold">{clue.message}</p>
      </motion.div>
    )
  } else {
    body = (
      <button
        type="button"
        onClick={onReveal}
        className="rounded-full border-2 border-ink bg-accent px-4 py-2 text-sm font-bold transition hover:-translate-y-0.5"
      >
        {cluesMoment.revealLabel}
      </button>
    )
  }

  return (
    <article className="flex flex-col rounded-2xl border-2 border-ink bg-white p-5 shadow-[4px_4px_0_0_var(--color-ink)]">
      <h4 className="font-heading text-2xl font-bold">{clue.title}</h4>
      <p className="mb-4 italic text-ink/80">{clue.question}</p>
      {body}
    </article>
  )
}

/** Momento 3: logs, métricas y trazas, con los datos de Charo. */
export function CluesMoment() {
  const [revealedIds, setRevealedIds] = usePersistentState<ClueId[]>('masterclass:herramientas:pistas', [])
  const allRevealed = revealedIds.length === cluesMoment.order.length

  const reveal = (clueId: ClueId) =>
    setRevealedIds((previous) => (previous.includes(clueId) ? previous : [...previous, clueId]))

  return (
    <div>
      <CharoIntro />
      <p className="mt-8 max-w-3xl text-lg">{cluesMoment.idea}</p>
      <p className="mt-2 text-sm font-semibold text-ink/70">{cluesMoment.instruction}</p>

      <div className="mt-5 grid items-start gap-5 md:grid-cols-3">
        {cluesMoment.order.map((clueId) => (
          <ClueCard
            key={clueId}
            clueId={clueId}
            isRevealed={revealedIds.includes(clueId)}
            onReveal={() => reveal(clueId)}
          />
        ))}
      </div>

      {allRevealed && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 border-l-4 border-accent bg-white/60 py-3 pl-4 font-heading text-xl font-bold"
        >
          {cluesMoment.summary}
        </motion.p>
      )}

      <RealWorld {...cluesMoment.realWorld} />
    </div>
  )
}
