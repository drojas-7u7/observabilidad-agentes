import type { ReactNode } from 'react'
import { challengeBriefing as briefing } from '../../content/challenge'

/** Un bloque del encargo: título pequeño y texto. */
function BriefingBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-primary">{title}</p>
      <p className="mt-1">{children}</p>
    </div>
  )
}

/** El encargo del reto, con forma de ticket de incidencia. */
export function Briefing() {
  return (
    <article className="rounded-2xl border-2 border-ink bg-white p-6 shadow-[4px_4px_0_0_var(--color-ink)]">
      <header className="flex flex-wrap items-center gap-3 border-b-2 border-ink/10 pb-4">
        <span className="font-mono text-sm font-bold">{briefing.ticketLabel}</span>
        <span className="rounded-full bg-danger px-2.5 py-0.5 text-xs font-bold text-white">
          {briefing.priority}
        </span>
        <span className="text-sm text-ink/70">{briefing.openedBy}</span>
      </header>

      <p className="mt-4 text-sm italic text-ink/80">{briefing.company}</p>

      <div className="mt-4 grid gap-5 md:grid-cols-2">
        <BriefingBlock title={briefing.whatTitle}>{briefing.what}</BriefingBlock>
        <BriefingBlock title={briefing.whyTitle}>{briefing.why}</BriefingBlock>
        <BriefingBlock title={briefing.roleTitle}>{briefing.role}</BriefingBlock>
        <BriefingBlock title={briefing.evidenceTitle}>{briefing.evidence}</BriefingBlock>
      </div>

      <div className="mt-5">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">
          {briefing.whoTitle}
        </p>
        <ul className="mt-2 grid gap-3 sm:grid-cols-2">
          {briefing.who.map((person) => (
            <li key={person.name} className="rounded-xl bg-background p-3">
              <p className="font-bold">{person.name}</p>
              <p className="text-sm">{person.text}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border-2 border-primary bg-primary/10 p-4">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">
          {briefing.missionTitle}
        </p>
        <p className="mt-1 font-heading text-xl font-bold">{briefing.mission}</p>
      </div>
    </article>
  )
}
