import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'
import { BITA_POSES, type BitaPose } from './bitaPoses'

const SIZE_CLASSES = {
  sm: 'h-40',
  md: 'h-64',
  lg: 'h-80',
} as const

interface BitaProps {
  /** Pose de Bita. */
  pose: BitaPose
  /** Mensaje del bocadillo. Si no se indica, no hay bocadillo. */
  message?: ReactNode
  /** Lado en el que aparece el bocadillo respecto a Bita. */
  bubbleSide?: 'left' | 'right'
  /** Tamaño de Bita. */
  size?: keyof typeof SIZE_CLASSES
  className?: string
}

/** Bocadillo de cómic con el pico apuntando hacia Bita. */
function SpeechBubble({ children, side }: { children: ReactNode; side: 'left' | 'right' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="relative max-w-xs rounded-2xl border-2 border-ink bg-white px-4 py-3 font-semibold shadow-[4px_4px_0_0_var(--color-ink)]"
    >
      {children}
      <span
        aria-hidden="true"
        className={`absolute bottom-6 h-4 w-4 rotate-45 border-ink bg-white ${
          side === 'left'
            ? '-right-[9px] border-t-2 border-r-2'
            : '-left-[9px] border-b-2 border-l-2'
        }`}
      />
    </motion.div>
  )
}

/** Bita, el detective de agentes, con su bocadillo opcional. */
export function Bita({
  pose,
  message,
  bubbleSide = 'right',
  size = 'md',
  className = '',
}: BitaProps) {
  const { src, alt } = BITA_POSES[pose]

  // El bocadillo se reinicia (y vuelve a animarse) cada vez que cambia la pose.
  const bubble = message ? (
    <SpeechBubble key={`bubble-${pose}`} side={bubbleSide}>
      {message}
    </SpeechBubble>
  ) : null

  return (
    <div className={`flex items-end gap-4 ${className}`}>
      {bubbleSide === 'left' && <div aria-live="polite">{bubble}</div>}

      <div className={`${SIZE_CLASSES[size]} shrink-0`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={pose}
            src={src}
            alt={alt}
            decoding="async"
            className="h-full w-auto"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
            exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.15 } }}
            transition={{
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
              // Flotación suave y continua en reposo
              y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        </AnimatePresence>
      </div>

      {bubbleSide === 'right' && <div aria-live="polite">{bubble}</div>}
    </div>
  )
}
