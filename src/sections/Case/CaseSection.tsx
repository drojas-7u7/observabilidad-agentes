import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { ChatMessage, TypingIndicator } from '../../components/ChatMessage/ChatMessage'
import { ChoiceQuestion } from '../../components/ChoiceQuestion/ChoiceQuestion'
import { DelayedReveal } from '../../components/DelayedReveal/DelayedReveal'
import { SectionShell } from '../../components/SectionShell/SectionShell'
import { caseContent, caseQuestion } from '../../content/case'
import { clearPersistentState, usePersistentState } from '../../hooks/usePersistentState'
import type { SectionProps } from '../../types/section'
import { ChargeNotification } from './ChargeNotification'

/** Número de momentos de la secuencia antes de la pregunta. */
const LAST_STEP = caseContent.stepButtons.length

/** Prefijo de todo lo que el caso guarda en el navegador. */
const STORAGE_PREFIX = 'masterclass:caso:'

/**
 * Parte 2: el caso.
 * La historia avanza paso a paso con un único botón, para que el ponente
 * (o el visitante) controle el ritmo. El avance se recuerda al cambiar de sección.
 */
export function CaseSection({ id }: SectionProps) {
  const [step, setStep] = usePersistentState(`${STORAGE_PREFIX}paso`, 0)
  const [resetVersion, setResetVersion] = useState(0)
  // Solo bajamos solos justo después de pulsar "Investigar", no al volver a la sección.
  const shouldScrollRef = useRef(false)
  const questionRef = useRef<HTMLDivElement>(null)

  const advance = () => {
    if (step + 1 >= LAST_STEP) shouldScrollRef.current = true
    setStep(step + 1)
  }

  const reset = () => {
    clearPersistentState(STORAGE_PREFIX)
    setStep(0)
    setResetVersion((version) => version + 1)
    window.scrollTo({ top: 0 })
  }

  useEffect(() => {
    if (step < LAST_STEP || !shouldScrollRef.current) return
    shouldScrollRef.current = false
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    questionRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [step])

  return (
    <SectionShell id={id} eyebrow="Parte 2" title={caseContent.title}>
      <div className="grid items-start gap-8 lg:grid-cols-2">
        {/* El expediente con el chat */}
        <article className="rounded-2xl border-2 border-ink bg-white p-5 shadow-[4px_4px_0_0_var(--color-ink)]">
          <header className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-ink/70">
                {caseContent.fileNumber}
              </p>
              <p className="font-heading text-2xl font-bold">{caseContent.fileName}</p>
            </div>
            <span className="-rotate-6 rounded-md border-2 border-danger px-3 py-1 font-mono text-sm font-bold uppercase tracking-widest text-danger">
              {caseContent.status}
            </span>
          </header>

          <div className="mt-4 min-h-56 space-y-4 rounded-xl bg-background p-4" aria-live="polite">
            <ChatMessage
              author={caseContent.clientName}
              text={caseContent.clientMessage}
              side="right"
            />
            {step >= 1 && (
              <DelayedReveal
                key={resetVersion}
                delayMs={1200}
                placeholder={<TypingIndicator label={caseContent.typingLabel} />}
              >
                <ChatMessage
                  author={caseContent.agentName}
                  text={caseContent.agentMessage}
                  side="left"
                />
              </DelayedReveal>
            )}
          </div>
        </article>

        {/* El giro: el cargo de 95 € y el botón para avanzar */}
        <div className="flex flex-col gap-6">
          {step >= 2 && (
            <>
              <ChargeNotification {...caseContent.notification} />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="font-heading text-4xl font-bold"
              >
                {caseContent.twist}
              </motion.p>
            </>
          )}

          {step < LAST_STEP && (
            <button
              type="button"
              onClick={advance}
              className="self-start rounded-full border-2 border-ink bg-accent px-6 py-3 font-bold shadow-[4px_4px_0_0_var(--color-ink)] transition hover:-translate-y-0.5"
            >
              {caseContent.stepButtons[step]}
            </button>
          )}

          {step > 0 && (
            <button
              type="button"
              onClick={reset}
              className="self-start text-sm font-semibold text-ink/70 underline underline-offset-4 hover:text-ink"
            >
              Volver a empezar
            </button>
          )}
        </div>
      </div>

      {/* La pregunta, al pulsar "Investigar" */}
      {step >= LAST_STEP && (
        <motion.div
          ref={questionRef}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 scroll-mt-24 border-t-2 border-ink/10 pt-10"
        >
          <ChoiceQuestion
            key={resetVersion}
            question={caseQuestion}
            storageKey={`${STORAGE_PREFIX}pregunta`}
          />
        </motion.div>
      )}
    </SectionShell>
  )
}
