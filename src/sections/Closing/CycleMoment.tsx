import { AnimatePresence, motion } from 'motion/react'
import { cycleMoment } from '../../content/closing'
import { usePersistentState } from '../../hooks/usePersistentState'

const STEP_COUNT = cycleMoment.steps.length

/** Posición (en %) de cada paso alrededor del círculo, empezando arriba. */
function stepPosition(index: number) {
  const angle = (index / STEP_COUNT) * 2 * Math.PI - Math.PI / 2
  return { left: `${50 + 40 * Math.cos(angle)}%`, top: `${50 + 40 * Math.sin(angle)}%` }
}

/** Momento 3: el ciclo de mejora continua, recorrido paso a paso. */
export function CycleMoment() {
  const [activeStep, setActiveStep] = usePersistentState('masterclass:cierre:ciclo', -1)
  const [isCompleted, setIsCompleted] = usePersistentState(
    'masterclass:cierre:ciclo-completo',
    false,
  )

  const goTo = (index: number) => {
    if (index === STEP_COUNT - 1) setIsCompleted(true)
    setActiveStep(index)
  }

  const next = () => goTo((activeStep + 1) % STEP_COUNT)
  const step = activeStep >= 0 ? cycleMoment.steps[activeStep] : null

  return (
    <div>
      <p className="max-w-3xl text-lg">{cycleMoment.idea}</p>

      <div className="mt-6 grid items-center gap-8 md:grid-cols-2">
        {/* El círculo */}
        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div
            className="absolute inset-[10%] rounded-full border-4 border-dashed border-ink/20"
            aria-hidden="true"
          />
          <p className="absolute inset-0 flex items-center justify-center font-heading text-xl font-bold text-ink/70">
            {cycleMoment.center}
          </p>
          {cycleMoment.steps.map((item, index) => {
            const isActive = index === activeStep
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => goTo(index)}
                aria-pressed={isActive}
                style={stepPosition(index)}
                className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border-2 border-ink px-3 py-1.5 text-sm font-bold transition ${
                  isActive
                    ? 'scale-110 bg-primary text-white shadow-[3px_3px_0_0_var(--color-ink)]'
                    : 'bg-white hover:bg-surface'
                }`}
              >
                <span className="font-mono text-xs">{index + 1}</span>
                {item.title}
              </button>
            )
          })}
        </div>

        {/* La explicación del paso */}
        <div>
          <div className="min-h-44 rounded-2xl border-2 border-ink bg-white p-5" aria-live="polite">
            <AnimatePresence mode="wait">
              {step ? (
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="font-mono text-xs uppercase tracking-widest text-primary">
                    Paso {activeStep + 1} de {STEP_COUNT}
                  </p>
                  <p className="mt-1 font-heading text-2xl font-bold">{step.title}</p>
                  <p className="mt-1">{step.text}</p>
                  <p className="mt-3 text-sm">
                    <span className="font-bold">{cycleMoment.exampleLabel}: </span>
                    {step.example}
                  </p>
                </motion.div>
              ) : (
                <p className="text-ink/70">{cycleMoment.placeholder}</p>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={next}
            className="mt-4 rounded-full border-2 border-ink bg-accent px-5 py-2 font-bold shadow-[4px_4px_0_0_var(--color-ink)] transition hover:-translate-y-0.5"
          >
            {activeStep === -1 ? cycleMoment.startLabel : cycleMoment.nextLabel}
          </button>
        </div>
      </div>

      {isCompleted && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 border-l-4 border-accent bg-white/60 py-3 pl-4 font-heading text-xl font-bold"
        >
          {cycleMoment.summary}
        </motion.p>
      )}
    </div>
  )
}
