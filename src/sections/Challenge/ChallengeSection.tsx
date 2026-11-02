import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Bita } from '../../components/Bita/Bita'
import { ChoiceQuestion } from '../../components/ChoiceQuestion/ChoiceQuestion'
import { SectionShell } from '../../components/SectionShell/SectionShell'
import { TraceExplorer } from '../../components/TraceExplorer/TraceExplorer'
import { challengeBriefing, challengeContent, challengeSteps } from '../../content/challenge'
import { catalinaTrace } from '../../data/traces/catalina'
import { clearPersistentState, usePersistentState } from '../../hooks/usePersistentState'
import type { SectionProps } from '../../types/section'
import { AfterFinding } from './AfterFinding'
import { Briefing } from './Briefing'
import { MetricsComparison } from './MetricsComparison'

/** Prefijo de todo lo que el reto guarda en el navegador. */
const STORAGE_PREFIX = 'masterclass:reto:'

/** Parte 6: el encargo y la investigación guiada del caso de Catalina. */
export function ChallengeSection({ id }: SectionProps) {
  const [hasStarted, setHasStarted] = usePersistentState(`${STORAGE_PREFIX}iniciado`, false)
  const [stepIndex, setStepIndex] = usePersistentState(`${STORAGE_PREFIX}paso`, 0)
  const [solvedIds, setSolvedIds] = usePersistentState<string[]>(
    `${STORAGE_PREFIX}resueltos`,
    [],
  )
  // Cambia al reiniciar, para que las preguntas empiecen de cero.
  const [resetVersion, setResetVersion] = useState(0)
  // Solo bajamos solos justo después de pulsar "Abrir la traza", no al volver a la sección.
  const shouldScrollRef = useRef(false)
  const investigationRef = useRef<HTMLDivElement>(null)

  const step = challengeSteps[stepIndex]
  const isStepSolved = solvedIds.includes(step.id)
  const isLastStep = stepIndex === challengeSteps.length - 1
  const isCaseClosed = solvedIds.length === challengeSteps.length

  const markSolved = () =>
    setSolvedIds((previous) => (previous.includes(step.id) ? previous : [...previous, step.id]))

  const start = () => {
    shouldScrollRef.current = true
    setHasStarted(true)
  }

  const reset = () => {
    clearPersistentState(STORAGE_PREFIX)
    setHasStarted(false)
    setStepIndex(0)
    setSolvedIds([])
    setResetVersion((version) => version + 1)
    window.scrollTo({ top: 0 })
  }

  useEffect(() => {
    if (!hasStarted || !shouldScrollRef.current) return
    shouldScrollRef.current = false
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    investigationRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [hasStarted])

  return (
    <SectionShell id={id} eyebrow="Parte 6" title={challengeContent.title}>
      <p className="max-w-3xl text-lg">{challengeContent.intro}</p>

      {/* Antes de empezar: el encargo completo */}
      {!hasStarted && (
        <>
          <div className="mt-6">
            <Briefing />
          </div>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <button
              type="button"
              onClick={start}
              className="rounded-full border-2 border-ink bg-primary px-6 py-3 text-lg font-bold text-white shadow-[4px_4px_0_0_var(--color-ink)] transition hover:-translate-y-0.5"
            >
              {challengeBriefing.startLabel}
            </button>
            <Bita
              pose="investigating"
              message={challengeBriefing.bitaReady}
              bubbleSide="left"
              size="sm"
            />
          </div>
        </>
      )}

      {/* La investigación */}
      {hasStarted && (
        <motion.div
          ref={investigationRef}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="scroll-mt-24"
        >
          <details className="mt-6 rounded-2xl border-2 border-ink/20 bg-white/60 p-4">
            <summary className="cursor-pointer font-bold">{challengeBriefing.recallLabel}</summary>
            <div className="mt-4">
              <Briefing />
            </div>
          </details>

          {/* Expediente y progreso */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <p className="font-heading text-xl font-bold">{challengeContent.fileLabel}</p>
              <motion.span
                key={isCaseClosed ? 'closed' : 'open'}
                initial={{ scale: 1.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className={`-rotate-6 rounded-md border-2 px-3 py-1 font-mono text-sm font-bold uppercase tracking-widest ${
                  isCaseClosed ? 'border-success text-success' : 'border-danger text-danger'
                }`}
              >
                {isCaseClosed ? challengeContent.statusClosed : challengeContent.statusOpen}
              </motion.span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3" aria-label="Progreso de la investigación">
                <span className="font-mono text-sm font-bold">
                  {challengeContent.stepLabel} {stepIndex + 1} de {challengeSteps.length}
                </span>
                <span className="flex gap-1.5" aria-hidden="true">
                  {challengeSteps.map((item, index) => (
                    <span
                      key={item.id}
                      className={`h-3 w-3 rounded-full border-2 border-ink ${
                        solvedIds.includes(item.id)
                          ? 'bg-success'
                          : index === stepIndex
                            ? 'bg-accent'
                            : 'bg-white'
                      }`}
                    />
                  ))}
                </span>
              </div>
              <button
                type="button"
                onClick={reset}
                className="text-sm font-semibold text-ink/70 underline underline-offset-4 hover:text-ink"
              >
                Reiniciar el reto
              </button>
            </div>
          </div>

          <p className="mt-4 text-sm font-semibold text-ink/70">{challengeBriefing.stepsIntro}</p>

          {/* La prueba: la traza de Catalina */}
          <div className="mt-4">
            <TraceExplorer trace={catalinaTrace} description={challengeBriefing.traceDescription} />
          </div>

          {/* El paso actual */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${step.id}-${resetVersion}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="mt-8 rounded-2xl border-2 border-ink bg-white/60 p-6"
            >
              <p className="mb-4 font-mono text-sm uppercase tracking-widest text-primary">
                {challengeContent.stepLabel} {stepIndex + 1} · {step.title}
              </p>

              {step.context === 'metrics' && <MetricsComparison />}

              <ChoiceQuestion
                question={step.question}
                intro={step.bitaIntro}
                onCorrect={markSolved}
                bitaSize="sm"
                storageKey={`${STORAGE_PREFIX}${step.id}`}
              />

              {isStepSolved && !isLastStep && (
                <button
                  type="button"
                  onClick={() => setStepIndex(stepIndex + 1)}
                  className="mt-6 rounded-full border-2 border-ink bg-primary px-5 py-2 font-bold text-white shadow-[4px_4px_0_0_var(--color-ink)] transition hover:-translate-y-0.5"
                >
                  {challengeContent.nextStepLabel} →
                </button>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Final: caso resuelto */}
          {isCaseClosed && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 grid items-center gap-6 rounded-2xl border-2 border-success bg-success/10 p-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
              >
                <div>
                  <p className="font-heading text-4xl font-bold text-success">
                    {challengeContent.finaleTitle}
                  </p>
                  <p className="mt-3 text-lg">{challengeContent.finaleText}</p>
                </div>
                <Bita
                  pose="celebrating"
                  message={challengeContent.bitaFinale}
                  bubbleSide="top"
                  size="md"
                />
              </motion.div>
              <AfterFinding />
            </>
          )}
        </motion.div>
      )}
    </SectionShell>
  )
}
