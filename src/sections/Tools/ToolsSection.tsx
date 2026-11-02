import { AnimatePresence, motion } from 'motion/react'
import type { ComponentType } from 'react'
import { usePersistentState } from '../../hooks/usePersistentState'
import { SectionShell } from '../../components/SectionShell/SectionShell'
import { moments, toolsContent, type MomentId } from '../../content/tools'
import type { SectionProps } from '../../types/section'
import { CarMoment } from './CarMoment'
import { CluesMoment } from './CluesMoment'
import { InstrumentMoment } from './InstrumentMoment'
import { TraceMoment } from './TraceMoment'

/** Qué componente dibuja cada momento. */
const MOMENT_COMPONENTS: Record<MomentId, ComponentType> = {
  observar: CarMoment,
  instrumentar: InstrumentMoment,
  pistas: CluesMoment,
  traza: TraceMoment,
}

/** Parte 5: las herramientas del detective, en cuatro momentos con pestañas. */
export function ToolsSection({ id }: SectionProps) {
  const [activeIndex, setActiveIndex] = usePersistentState('masterclass:herramientas:momento', 0)
  const activeMoment = moments[activeIndex]
  const nextMoment = moments[activeIndex + 1]
  const Moment = MOMENT_COMPONENTS[activeMoment.id]

  return (
    <SectionShell id={id} eyebrow="Parte 5" title={toolsContent.title}>
      <p className="max-w-3xl text-lg">{toolsContent.intro}</p>

      <div role="tablist" aria-label="Momentos" className="mt-5 flex flex-wrap gap-2">
        {moments.map((moment, index) => {
          const isActive = index === activeIndex
          return (
            <button
              key={moment.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIndex(index)}
              className={`rounded-full border-2 border-ink px-4 py-1.5 text-sm font-bold transition ${
                isActive ? 'bg-ink text-background' : 'bg-white hover:bg-surface'
              }`}
            >
              {index + 1} · {moment.title}
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeMoment.id}
          role="tabpanel"
          aria-label={activeMoment.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="mt-8"
        >
          <h3 className="font-heading text-3xl font-bold">{activeMoment.title}</h3>
          <div className="mt-3">
            <Moment />
          </div>
        </motion.div>
      </AnimatePresence>

      {nextMoment && (
        <button
          type="button"
          onClick={() => setActiveIndex(activeIndex + 1)}
          className="mt-8 rounded-full border-2 border-ink bg-accent px-5 py-2 font-bold shadow-[4px_4px_0_0_var(--color-ink)] transition hover:-translate-y-0.5"
        >
          {toolsContent.nextMomentLabel}: {nextMoment.title} →
        </button>
      )}
    </SectionShell>
  )
}
