import { SectionShell } from '../../components/SectionShell/SectionShell'
import type { SectionProps } from '../../types/section'

export function CaseSection({ id }: SectionProps) {
  return (
    <SectionShell id={id} eyebrow="Parte 2" title="El caso del vuelo de 95 €">
      <p>Contenido en construcción.</p>
    </SectionShell>
  )
}
