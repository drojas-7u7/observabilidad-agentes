import { sections } from '../../config/sections'

/** Botones para ir a la sección anterior y a la siguiente. */
export function SectionPager({ activeIndex }: { activeIndex: number }) {
  const previous = sections[activeIndex - 1]
  const next = sections[activeIndex + 1]

  return (
    <nav
      aria-label="Navegación entre secciones"
      className="mx-auto mt-auto flex w-full max-w-5xl flex-wrap justify-between gap-4 px-6 pb-10 pt-6"
    >
      {previous ? (
        <a
          href={`#${previous.id}`}
          className="rounded-full border-2 border-ink bg-white px-5 py-2 font-bold transition hover:bg-surface"
        >
          ← Anterior: {previous.navLabel}
        </a>
      ) : (
        <span />
      )}

      {next && (
        <a
          href={`#${next.id}`}
          className="rounded-full border-2 border-ink bg-primary px-5 py-2 font-bold text-white shadow-[4px_4px_0_0_var(--color-ink)] transition hover:-translate-y-0.5"
        >
          Siguiente: {next.navLabel} →
        </a>
      )}
    </nav>
  )
}
