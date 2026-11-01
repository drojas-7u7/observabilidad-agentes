import { SectionShell } from '../../components/SectionShell/SectionShell'
import type { SectionProps } from '../../types/section'

export function ClosingSection({ id }: SectionProps) {
  return (
    <SectionShell id={id} eyebrow="Parte 7" title="Cerrar el caso">
      <p>Contenido en construcción.</p>
    </SectionShell>
  )
}
