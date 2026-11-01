import { sections } from '../../config/sections'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrollProgress } from '../../hooks/useScrollProgress'

// Se calcula una sola vez, fuera del componente, para no repetirlo en cada dibujado.
const sectionIds = sections.map((section) => section.id)

/** Menú de navegación fijo, generado a partir de la lista de secciones. */
export function NavBar() {
  const activeId = useActiveSection(sectionIds)
  const progress = useScrollProgress()

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-background/95 backdrop-blur">
      <nav
        aria-label="Secciones de la masterclass"
        className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3"
      >
        <a
          href="#introduccion"
          className="hidden shrink-0 font-heading text-lg font-bold sm:block"
        >
          Detectives de agentes
        </a>

        <ul className="flex gap-1 overflow-x-auto">
          {sections.map(({ id, navLabel }) => {
            const isActive = id === activeId
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={isActive ? 'location' : undefined}
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

      {/* Barra de progreso de lectura */}
      <div className="h-1 bg-surface" aria-hidden="true">
        <div
          className="h-full origin-left bg-accent"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </header>
  )
}