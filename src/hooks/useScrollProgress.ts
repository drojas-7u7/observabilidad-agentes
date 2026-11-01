import { useEffect, useState } from 'react'

/** Calcula cuánto se ha avanzado en la página: 0 al principio y 1 al final. */
function getScrollProgress(): number {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  return maxScroll > 0 ? window.scrollY / maxScroll : 0
}

/** Devuelve el progreso de lectura de la página, entre 0 y 1. */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(getScrollProgress)

  useEffect(() => {
    const update = () => setProgress(getScrollProgress())

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return progress
}