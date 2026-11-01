import { AnimatePresence, motion } from 'motion/react'
import { useState, type ComponentType } from 'react'
import { Bita } from '../../components/Bita/Bita'
import { SectionShell } from '../../components/SectionShell/SectionShell'
import { eras, historyContent, type ProofKind } from '../../content/history'
import type { SectionProps } from '../../types/section'
import { AgentProof, LogsProof, PaperProof, ServicesProof } from './proofs'

/** Qué componente dibuja cada tipo de prueba. */
const PROOF_COMPONENTS: Record<ProofKind, ComponentType> = {
  paper: PaperProof,
  logs: LogsProof,
  services: ServicesProof,
  agent: AgentProof,
}

/** Parte 3: el mismo caso investigado en cuatro épocas. */
export function HistorySection({ id }: SectionProps) {
  const [activeEraId, setActiveEraId] = useState(eras[0].id)
  const [visitedIds, setVisitedIds] = useState<string[]>([eras[0].id])

  const activeEra = eras.find((era) => era.id === activeEraId) ?? eras[0]
  const Proof = PROOF_COMPONENTS[activeEra.proof]
  const allVisited = visitedIds.length === eras.length

  const selectEra = (eraId: string) => {
    setActiveEraId(eraId)
    setVisitedIds((previous) => (previous.includes(eraId) ? previous : [...previous, eraId]))
  }

  return (
    <SectionShell id={id} eyebrow="Parte 3" title={historyContent.title}>
      <p className="max-w-3xl text-lg">{historyContent.intro}</p>
      <p className="mt-4 text-sm font-semibold text-ink/70">{historyContent.instruction}</p>

      {/* Línea de tiempo */}
      <div className="relative mt-3">
        <div
          className="absolute inset-x-0 top-1/2 hidden h-0.5 bg-ink/20 md:block"
          aria-hidden="true"
        />
        <div role="tablist" aria-label="Épocas" className="relative grid grid-cols-2 gap-3 md:grid-cols-4">
          {eras.map((era) => {
            const isActive = era.id === activeEraId
            const isVisited = visitedIds.includes(era.id)
            return (
              <button
                key={era.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => selectEra(era.id)}
                className={`rounded-2xl border-2 border-ink p-3 text-left transition ${
                  isActive
                    ? 'bg-primary text-white shadow-[4px_4px_0_0_var(--color-ink)]'
                    : 'bg-white hover:-translate-y-0.5'
                }`}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs uppercase tracking-wider">{era.period}</span>
                  {isVisited && !isActive && (
                    <span className="rounded-full bg-success px-2 py-0.5 text-xs font-bold text-white">
                      {historyContent.visitedLabel}
                    </span>
                  )}
                </span>
                <span className="mt-1 block font-heading text-lg font-bold leading-tight">
                  {era.title}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* La época seleccionada */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeEra.id}
          role="tabpanel"
          aria-label={activeEra.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="mt-8 grid items-center gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
        >
          <div>
            <p className="text-lg">{activeEra.story}</p>
            <p className="mt-4 font-heading text-xl font-bold">{activeEra.proofLabel}</p>
            <p className="mt-3 border-l-4 border-accent bg-white/60 py-2 pl-4 font-semibold">
              {activeEra.lesson}
            </p>
          </div>
          <Proof />
        </motion.div>
      </AnimatePresence>

      {/* Cierre, cuando se han visto las cuatro épocas */}
      {allVisited && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 border-t-2 border-ink/10 pt-8"
        >
          <Bita pose="presenting" message={historyContent.closing} size="sm" />
        </motion.div>
      )}
    </SectionShell>
  )
}
