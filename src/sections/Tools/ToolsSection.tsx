import { SectionShell } from '../../components/SectionShell/SectionShell'
import { TraceExplorer } from '../../components/TraceExplorer/TraceExplorer'
import { charoTrace } from '../../data/traces/charo'
import type { SectionProps } from '../../types/section'

// Provisional: prueba del explorador de trazas con la traza de Charo.
export function ToolsSection({ id }: SectionProps) {
  return (
    <SectionShell id={id} eyebrow="Parte 5" title="Las herramientas del detective">
      <TraceExplorer trace={charoTrace} />
    </SectionShell>
  )
}
