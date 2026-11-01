import { Bita } from '../../components/Bita/Bita'
import { TraceOutline } from '../../components/TraceExplorer/TraceOutline'
import { proofs } from '../../content/history'
import { catalinaTrace } from '../../data/traces/catalina'

/** Época 1: una ficha de papel. */
export function PaperProof() {
  const { title, lines, note } = proofs.paper
  return (
    <div className="mx-auto max-w-sm rotate-1 rounded-sm border border-ink/30 bg-[#fdf3d7] p-6 shadow-[6px_6px_0_0_rgba(30,42,74,0.2)]">
      <p className="font-mono text-xs uppercase tracking-widest text-ink/70">{title}</p>
      <ul className="mt-3 space-y-2 italic">
        {lines.map((line) => (
          <li key={line} className="border-b border-dashed border-ink/30 pb-1">
            {line}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm font-bold text-danger">{note}</p>
    </div>
  )
}

/** Época 2: líneas de log en una terminal. */
export function LogsProof() {
  const { fileName, lines } = proofs.logs
  return (
    <div className="overflow-hidden rounded-xl border-2 border-ink">
      <div className="flex items-center gap-2 bg-ink/90 px-3 py-2">
        {[0, 1, 2].map((dot) => (
          <span key={dot} className="h-2.5 w-2.5 rounded-full bg-background/40" />
        ))}
        <span className="ml-2 font-mono text-xs text-background/70">{fileName}</span>
      </div>
      <pre className="overflow-x-auto bg-ink p-4 font-mono text-sm leading-relaxed text-background">
        {lines.join('\n')}
      </pre>
    </div>
  )
}

/** Época 3: servicios conectados por una traza. */
export function ServicesProof() {
  const { traceId, items } = proofs.services
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.name} className="rounded-xl border-2 border-ink bg-white p-3 text-center">
            <p className="font-heading font-bold">{item.name}</p>
            <p className="mt-1 font-mono text-xs">{item.log}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-full border-2 border-primary bg-primary/10 py-1.5 text-center font-mono text-sm font-bold text-primary">
        {traceId}: une los tres registros
      </div>
    </div>
  )
}

/** Época 4: adelanto del árbol de la traza de Catalina (generado de la traza real). */
export function AgentProof() {
  return (
    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
      <div className="flex-1">
        <TraceOutline trace={catalinaTrace} />
      </div>
      <Bita pose="investigating" message={proofs.agent.note} bubbleSide="top" size="sm" />
    </div>
  )
}
