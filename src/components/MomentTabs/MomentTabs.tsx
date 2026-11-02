import { AnimatePresence, motion } from 'motion/react'
import type { ComponentType } from 'react'
import { usePersistentState } from '../../hooks/usePersistentState'

interface MomentTabsProps<Id extends string> {
  /** Momentos, en orden. */
  moments: { id: Id; title: string }[]
  /** Qué componente dibuja cada momento. */
  components: Record<Id, ComponentType>
  /** Clave para recordar el momento activo al cambiar de sección. */
  storageKey: string
  /** Texto del botón para pasar al siguiente momento. */
  nextLabel: string
}

/** Pestañas por momentos dentro de una sección, con botón de "siguiente momento". */
export function MomentTabs<Id extends string>({
  moments,
  components,
  storageKey,
  nextLabel,
}: MomentTabsProps<Id>) {
  const [activeIndex, setActiveIndex] = usePersistentState(storageKey, 0)
  const activeMoment = moments[activeIndex] ?? moments[0]
  const nextMoment = moments[activeIndex + 1]
  const Moment: ComponentType = components[activeMoment.id]

  return (
    <>
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
          {nextLabel}: {nextMoment.title} →
        </button>
      )}
    </>
  )
}
