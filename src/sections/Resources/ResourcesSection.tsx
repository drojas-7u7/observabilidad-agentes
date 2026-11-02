import { Bita } from '../../components/Bita/Bita'
import { SectionShell } from '../../components/SectionShell/SectionShell'
import { glossary, readingGroups, resourcesContent } from '../../content/resources'
import type { SectionProps } from '../../types/section'

/** Después de la clase: guía en PDF, lecturas recomendadas y glosario. */
export function ResourcesSection({ id }: SectionProps) {
  const { guide } = resourcesContent

  return (
    <SectionShell id={id} eyebrow="Después de la clase" title={resourcesContent.title}>
      <p className="max-w-3xl text-lg">{resourcesContent.intro}</p>

      {/* La guía en PDF */}
      <article className="mt-6 flex flex-wrap items-center justify-between gap-6 rounded-2xl border-2 border-ink bg-accent p-6 shadow-[4px_4px_0_0_var(--color-ink)]">
        <div className="max-w-2xl">
          <p className="font-heading text-2xl font-bold">{guide.title}</p>
          <p className="mt-1">{guide.text}</p>
        </div>
        {guide.isAvailable ? (
          <a
            href={guide.href}
            download
            className="rounded-full border-2 border-ink bg-primary px-6 py-3 font-bold text-white shadow-[4px_4px_0_0_var(--color-ink)] transition hover:-translate-y-0.5"
          >
            {guide.downloadLabel}
          </a>
        ) : (
          <span className="rounded-full border-2 border-ink bg-white/70 px-6 py-3 font-bold text-ink/70">
            {guide.pendingLabel}
          </span>
        )}
      </article>

      {/* Lecturas */}
      <h3 className="mt-10 font-heading text-2xl font-bold">{resourcesContent.readingsTitle}</h3>
      <p className="text-sm text-ink/70">{resourcesContent.readingsNote}</p>

      <div className="mt-4 space-y-6">
        {readingGroups.map((group) => (
          <div key={group.topic}>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">{group.topic}</p>
            <ul className="mt-2 grid gap-3 md:grid-cols-2">
              {group.readings.map((reading) => (
                <li key={reading.href}>
                  <a
                    href={reading.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full flex-col rounded-2xl border-2 border-ink bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--color-ink)]"
                  >
                    <span className="font-heading text-lg font-bold leading-tight">
                      {reading.title}
                    </span>
                    <span className="mt-1 text-sm text-ink/70">{reading.source}</span>
                    <span className="mt-2 text-sm">{reading.why}</span>
                    <span className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-surface px-2.5 py-0.5 font-mono text-xs font-bold">
                        {reading.type}
                      </span>
                      <span className="rounded-full bg-background px-2.5 py-0.5 font-mono text-xs font-bold">
                        Nivel {reading.level.toLowerCase()}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Glosario */}
      <h3 className="mt-10 font-heading text-2xl font-bold">{resourcesContent.glossaryTitle}</h3>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {glossary.map((entry) => (
          <div key={entry.term} className="rounded-2xl border-2 border-ink/20 bg-white/70 p-4">
            <dt className="font-bold">{entry.term}</dt>
            <dd className="mt-1 text-sm">{entry.definition}</dd>
          </div>
        ))}
      </dl>

      <Bita pose="celebrating" message={resourcesContent.bita} size="sm" className="mt-10" />
    </SectionShell>
  )
}
