import type { ComponentType } from 'react'
import { MomentTabs } from '../../components/MomentTabs/MomentTabs'
import { SectionShell } from '../../components/SectionShell/SectionShell'
import { moments, toolsContent, type MomentId } from '../../content/tools'
import type { SectionProps } from '../../types/section'
import { CarMoment } from './CarMoment'
import { CluesMoment } from './CluesMoment'
import { InstrumentMoment } from './InstrumentMoment'
import { TraceMoment } from './TraceMoment'

/** Qué componente dibuja cada momento. */
const MOMENT_COMPONENTS: Record<MomentId, ComponentType> = {
  observar: CarMoment,
  instrumentar: InstrumentMoment,
  pistas: CluesMoment,
  traza: TraceMoment,
}

/** Parte 5: las herramientas del detective, en cuatro momentos con pestañas. */
export function ToolsSection({ id }: SectionProps) {
  return (
    <SectionShell id={id} eyebrow="Parte 5" title={toolsContent.title}>
      <p className="max-w-3xl text-lg">{toolsContent.intro}</p>
      <MomentTabs
        moments={moments}
        components={MOMENT_COMPONENTS}
        storageKey="masterclass:herramientas:momento"
        nextLabel={toolsContent.nextMomentLabel}
      />
    </SectionShell>
  )
}
