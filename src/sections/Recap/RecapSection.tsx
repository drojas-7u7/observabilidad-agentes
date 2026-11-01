import { SectionShell } from '../../components/SectionShell/SectionShell'
import type { SectionProps } from '../../types/section'

export function RecapSection({ id }: SectionProps) {
  return (
    <SectionShell id={id} eyebrow="Parte 4" title="Lo que ya sabemos">
      <p>Contenido en construcción.</p>
    </SectionShell>
  )
}
