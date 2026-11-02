import type { ComponentType } from 'react'
import { MomentTabs } from '../../components/MomentTabs/MomentTabs'
import { SectionShell } from '../../components/SectionShell/SectionShell'
import { closingContent, closingMoments, type ClosingMomentId } from '../../content/closing'
import type { SectionProps } from '../../types/section'
import { EvaluateMoment } from './EvaluateMoment'
import { FixMoment } from './FixMoment'
import { ConclusionsMoment } from './ConclusionsMoment'
import { CycleMoment } from './CycleMoment'
import { EthicsMoment } from './EthicsMoment'

/** Qué componente dibuja cada momento. */
const MOMENT_COMPONENTS: Record<ClosingMomentId, ComponentType> = {
  arreglar: FixMoment,
  evaluar: EvaluateMoment,
  ciclo: CycleMoment,
  etica: EthicsMoment,
  conclusiones: ConclusionsMoment,
}

/** Parte 7: cerrar el caso, en cinco momentos con pestañas. */
export function ClosingSection({ id }: SectionProps) {
  return (
    <SectionShell id={id} eyebrow="Parte 7" title={closingContent.title}>
      <p className="max-w-3xl text-lg">{closingContent.intro}</p>
      <MomentTabs
        moments={closingMoments}
        components={MOMENT_COMPONENTS}
        storageKey="masterclass:cierre:momento"
        nextLabel={closingContent.nextMomentLabel}
      />
    </SectionShell>
  )
}
