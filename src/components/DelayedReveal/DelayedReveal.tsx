import { useEffect, useState, type ReactNode } from 'react'

interface DelayedRevealProps {
  /** Milisegundos de espera antes de mostrar el contenido. */
  delayMs: number
  /** Lo que se muestra mientras tanto (por ejemplo, "escribiendo..."). */
  placeholder: ReactNode
  children: ReactNode
}

/** Muestra un contenido provisional y, pasado un tiempo, el contenido real. */
export function DelayedReveal({ delayMs, placeholder, children }: DelayedRevealProps) {
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsShown(true), delayMs)
    // Si la sección se cierra antes de tiempo, se cancela la espera.
    return () => window.clearTimeout(timer)
  }, [delayMs])

  return <>{isShown ? children : placeholder}</>
}
