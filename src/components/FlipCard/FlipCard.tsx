import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { usePersistentState } from '../../hooks/usePersistentState'

interface FlipCardProps {
  /** Contenido de la cara delantera. */
  front: ReactNode
  /** Contenido de la cara trasera. */
  back: ReactNode
  /** Si es true, la cara delantera se destaca en dorado. */
  highlight?: boolean
  /** Si se indica, la tarjeta recuerda si estaba girada al cambiar de sección. */
  storageKey?: string
  className?: string
}

const FACE_BASE =
  'flex flex-col rounded-2xl border-2 border-ink p-5 shadow-[4px_4px_0_0_var(--color-ink)] backface-hidden [grid-area:1/1]'

/**
 * Tarjeta que gira en 3D al pulsarla.
 * Las dos caras ocupan la misma celda de una cuadrícula, así la tarjeta
 * siempre mide lo que la cara más alta.
 */
export function FlipCard({ front, back, highlight = false, className = '', storageKey }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = usePersistentState(storageKey ?? null, false)

  return (
    <button
      type="button"
      onClick={() => setIsFlipped((flipped) => !flipped)}
      aria-pressed={isFlipped}
      className={`h-full w-full text-left perspective-[1200px] ${className}`}
    >
      <motion.span
        className="grid h-full transform-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <span
          aria-hidden={isFlipped}
          className={`${FACE_BASE} ${highlight ? 'bg-accent' : 'bg-white'}`}
        >
          {front}
          <span className="mt-auto pt-4 text-sm font-bold text-primary">
            Pulsa para darle la vuelta
          </span>
        </span>

        <span aria-hidden={!isFlipped} className={`${FACE_BASE} rotate-y-180 bg-white`}>
          {back}
          <span className="mt-auto pt-3 text-sm font-bold text-primary">Pulsa para volver</span>
        </span>
      </motion.span>
    </button>
  )
}
