import { sections } from '../../config/sections'

interface NavBarProps {
  /** Sección que se está mostrando. */
  activeId: string
}

/** Menú de navegación fijo, generado a partir de la lista de secciones. */
export function NavBar({ activeId }: NavBarProps) {
  const activeIndex = sections.findIndex((section) => section.id === activeId)
  const progress = (activeIndex + 1) / sections.length

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-background/95 backdrop-blur">
      <nav
        aria-label="Secciones de la masterclass"
        className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3"
      >
        <a
          href={`#${sections[0].id}`}
          className="hidden shrink-0 font-heading text-lg font-bold sm:block"
        >
          Detectives de agentes
        </a>

        <ul className="flex gap-1 overflow-x-auto">
          {sections
            .filter((section) => !section.hideInNav)
            .map(({ id, navLabel }) => {
            const isActive = id === activeId
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={isActive ? 'page' : undefined}
                  className={`block whitespace-nowrap rounded-full px-3 py-1 text-sm font-semibold transition-colors ${
                    isActive ? 'bg-primary text-white' : 'hover:bg-surface'
                  }`}
                >
                  {navLabel}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Progreso en la clase: qué parte de todas las secciones llevamos */}
      <div className="h-1 bg-surface" aria-hidden="true">
        <div
          className="h-full origin-left bg-accent transition-transform duration-500"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </header>
  )
}
