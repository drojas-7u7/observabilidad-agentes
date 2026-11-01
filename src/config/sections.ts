import type { ComponentType } from 'react'
import type { SectionProps } from '../types/section'

import { IntroSection } from '../sections/Intro/IntroSection'
import { CaseSection } from '../sections/Case/CaseSection'
import { HistorySection } from '../sections/History/HistorySection'
import { RecapSection } from '../sections/Recap/RecapSection'
import { ToolsSection } from '../sections/Tools/ToolsSection'
import { ChallengeSection } from '../sections/Challenge/ChallengeSection'
import { ClosingSection } from '../sections/Closing/ClosingSection'
import { ResourcesSection } from '../sections/Resources/ResourcesSection'

/** Datos de cada sección registrada en la web. */
export interface SectionConfig {
  /** Identificador único. Aparece en la dirección al navegar (por ejemplo, #el-caso). */
  id: string
  /** Nombre corto que se muestra en el menú de navegación. */
  navLabel: string
  /** Componente que dibuja la sección. */
  component: ComponentType<SectionProps>
}

/**
 * Lista de secciones de la web, en el orden en que aparecen.
 *
 * - Para reordenar: mueve las líneas.
 * - Para quitar una sección: borra (o comenta) su línea.
 * - Para añadir una: crea su componente en src/sections e inclúyelo aquí.
 *
 * El menú de navegación y el índice se generan a partir de esta lista.
 */
export const sections: SectionConfig[] = [
  { id: 'introduccion', navLabel: 'Introducción', component: IntroSection },
  { id: 'el-caso', navLabel: 'El caso', component: CaseSection },
  { id: 'historia', navLabel: 'Historia', component: HistorySection },
  { id: 'lo-que-sabemos', navLabel: 'Lo que sabemos', component: RecapSection },
  { id: 'herramientas', navLabel: 'Herramientas', component: ToolsSection },
  { id: 'reto', navLabel: 'El reto', component: ChallengeSection },
  { id: 'cierre', navLabel: 'Cierre', component: ClosingSection },
  { id: 'recursos', navLabel: 'Recursos', component: ResourcesSection },
]