import { SectionShell } from '../../components/SectionShell/SectionShell'
import type { SectionProps } from '../../types/section'

export function ResourcesSection({ id }: SectionProps) {
  return (
    <SectionShell id={id} eyebrow="Después de la clase" title="Para seguir aprendiendo">
      <p>Contenido en construcción.</p>
    </SectionShell>
  )
}
