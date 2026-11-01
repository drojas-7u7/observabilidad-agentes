import { Bita } from '../../components/Bita/Bita'
import { SectionShell } from '../../components/SectionShell/SectionShell'
import { howItWorks, introContent, routeSteps } from '../../content/intro'
import type { SectionProps } from '../../types/section'

/** Parte 1: el mapa de la clase. */
export function IntroSection({ id }: SectionProps) {
  return (
    <SectionShell id={id} eyebrow="Parte 1" title={introContent.title}>
      <p className="max-w-3xl text-lg">{introContent.lead}</p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <nav aria-label="Recorrido de la masterclass">
          <h3 className="font-mono text-sm uppercase tracking-widest text-primary">
            {introContent.routeTitle} · {introContent.totalDuration}
          </h3>
          <ol className="mt-3 grid gap-3 sm:grid-cols-2">
            {routeSteps.map((step) => (
              <li key={step.sectionId}>
                <a
                  href={`#${step.sectionId}`}
                  className="flex h-full items-start gap-3 rounded-2xl border-2 border-ink bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--color-ink)]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink font-heading text-lg font-bold text-background">
                    {step.part}
                  </span>
                  <span className="flex-1">
                    <span className="block font-heading text-lg font-bold leading-tight">
                      {step.title}
                    </span>
                    <span className="block text-sm text-ink/80">{step.description}</span>
                  </span>
                  <span className="shrink-0 rounded-full bg-surface px-2.5 py-0.5 font-mono text-xs font-bold">
                    {step.duration}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div>
          <h3 className="font-mono text-sm uppercase tracking-widest text-primary">
            {introContent.howItWorksTitle}
          </h3>
          <ul className="mt-3 space-y-3">
            {howItWorks.map((item) => (
              <li key={item.title} className="rounded-2xl border-2 border-ink/20 bg-white/60 p-4">
                <p className="font-bold">{item.title}</p>
                <p className="text-sm">{item.text}</p>
              </li>
            ))}
          </ul>
          <Bita
            pose="investigating"
            message={introContent.bitaMessage}
            bubbleSide="top"
            size="sm"
            className="mt-6"
          />
        </div>
      </div>
    </SectionShell>
  )
}
