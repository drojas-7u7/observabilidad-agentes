import { ChoiceQuestion } from '../../components/ChoiceQuestion/ChoiceQuestion'
import { SectionShell } from '../../components/SectionShell/SectionShell'
import { caseQuestion } from '../../content/case'
import type { SectionProps } from '../../types/section'

// Provisional: prueba de la pregunta interactiva con el contenido real del caso.
export function CaseSection({ id }: SectionProps) {
  return (
    <SectionShell id={id} eyebrow="Parte 2" title="El caso del vuelo de 95 €">
      <ChoiceQuestion question={caseQuestion} />
    </SectionShell>
  )
}
