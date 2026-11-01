import { SectionShell } from '../../components/SectionShell/SectionShell'
import type { SectionProps } from '../../types/section'

export function IntroSection({ id }: SectionProps) {
  return (
    <SectionShell id={id} eyebrow="Parte 1" title="Introducción">
      <p>Contenido en construcción.</p>
    </SectionShell>
  )
}
