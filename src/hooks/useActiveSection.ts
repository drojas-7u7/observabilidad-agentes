import { useEffect, useState } from 'react'

/**
 * Indica qué sección está visible ahora mismo en pantalla.
 * Devuelve el identificador de esa sección.
 */
export function useActiveSection(ids: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null)

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      // Solo cuenta como "activa" la sección que cruza una franja estrecha
      // a media altura de la pantalla.
      { rootMargin: '-40% 0px -55% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [ids])

  return activeId
}