import type { ReactNode } from 'react'

interface SectionShellProps {
  /** Identificador de la sección (para el menú y los enlaces). */
  id: string
  /** Texto pequeño encima del título, por ejemplo "Parte 2". */
  eyebrow?: string
  /** Título principal de la sección. */
  title: string
  /** Contenido de la sección. */
  children?: ReactNode
}

/**
 * Envoltorio común de todas las secciones.
 * Garantiza que todas tengan el mismo espaciado, ancho y estructura de título.
 * Si se cambia aquí, cambia en toda la web.
 */
export function SectionShell({ id, eyebrow, title, children }: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="min-h-screen scroll-mt-20 px-6 py-24"
    >
      <div className="mx-auto max-w-5xl">
        {eyebrow && (
          <p className="font-mono text-sm uppercase tracking-widest text-primary">
            {eyebrow}
          </p>
        )}
        <h2 id={`${id}-title`} className="mt-2 text-4xl font-bold">
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}