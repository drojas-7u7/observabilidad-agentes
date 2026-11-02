import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'
import { BITA_POSES, type BitaPose } from './bitaPoses'

const SIZE_CLASSES = {
  sm: 'h-40',
  md: 'h-64',
  lg: 'h-80',
} as const

type BubbleSide = 'left' | 'right' | 'top'

/** Posición y bordes del pico del bocadillo según su lado. */
const TAIL_CLASSES: Record<BubbleSide, string> = {
  left: 'bottom-6 -right-[9px] border-t-2 border-r-2',
  right: 'bottom-6 -left-[9px] border-b-2 border-l-2',
  top: '-bottom-[9px] left-1/2 -translate-x-1/2 border-b-2 border-r-2',
}

interface BitaProps {
  /** Pose de Bita. */
  pose: BitaPose
  /** Mensaje del bocadillo. Si no se indica, no hay bocadillo. */
  message?: ReactNode
  /** Si cambia, el bocadillo vuelve a animarse aunque la pose sea la misma. */
  messageKey?: string
  /** Lado en el que aparece el bocadillo respecto a Bita. */
  bubbleSide?: BubbleSide
  /** Tamaño de Bita. */
  size?: keyof typeof SIZE_CLASSES
  className?: string
}

/** Bocadillo de cómic con el pico apuntando hacia Bita. */
function SpeechBubble({ children, side }: { children: ReactNode; side: BubbleSide }) {
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
        className={`absolute h-4 w-4 rotate-45 border-ink bg-white ${TAIL_CLASSES[side]}`}
      />
    </motion.div>
  )
}

/** Bita, el detective de agentes, con su bocadillo opcional. */
export function Bita({
  pose,
  message,
  messageKey = '',
  bubbleSide = 'right',
  size = 'md',
  className = '',
}: BitaProps) {
  const { src, alt } = BITA_POSES[pose]

  // El bocadillo se reinicia (y vuelve a animarse) cuando cambia la pose o el mensaje.
  const bubble = message ? (
    <SpeechBubble key={`bubble-${pose}-${messageKey}`} side={bubbleSide}>
      {message}
    </SpeechBubble>
  ) : null

  const layout = bubbleSide === 'top' ? 'flex-col items-center' : 'items-end'

  return (
    <div className={`flex gap-4 ${layout} ${className}`}>
      {bubbleSide !== 'right' && <div aria-live="polite">{bubble}</div>}

      {/*
        Capa exterior: flota con una animación de CSS (la ejecuta la tarjeta
        gráfica, así no se atasca). motion-safe: solo si no se han pedido
        animaciones reducidas.
      */}
      <div
        className={`${SIZE_CLASSES[size]} shrink-0 will-change-transform motion-safe:animate-float`}
      >
        {/* Capa interior: transición suave al cambiar de pose */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={pose}
            src={src}
            alt={alt}
            decoding="async"
            className="h-full w-auto"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.2 }}
          />
        </AnimatePresence>
      </div>

      {bubbleSide === 'right' && <div aria-live="polite">{bubble}</div>}
    </div>
  )
}
