import { SectionShell } from '../../components/SectionShell/SectionShell'
import type { SectionProps } from '../../types/section'

export function HistorySection({ id }: SectionProps) {
  return (
    <SectionShell id={id} eyebrow="Parte 3" title="El expediente histórico">
      <p>Contenido en construcción.</p>
    </SectionShell>
  )
}
