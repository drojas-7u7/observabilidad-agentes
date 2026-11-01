import { useState } from 'react'
import { Bita } from '../../components/Bita/Bita'
import type { BitaPose } from '../../components/Bita/bitaPoses'
import { SectionShell } from '../../components/SectionShell/SectionShell'
import type { SectionProps } from '../../types/section'

// Provisional: prueba de las poses y bocadillos de Bita.
const DEMO_POSES: { pose: BitaPose; label: string; message: string }[] = [
  { pose: 'presenting', label: 'Presentando', message: '¡Hola! Soy Bita, detective de agentes.' },
  { pose: 'thinking', label: 'Pensativo', message: 'Tu agente dice que todo ha ido bien. ¿Cómo lo sabes?' },
  { pose: 'investigating', label: 'Investigando', message: 'Veamos qué dice la traza...' },
  { pose: 'surprised', label: 'Sorprendido', message: '¡Hallazgo! Aquí hay algo raro.' },
  { pose: 'hint', label: 'Pista', message: 'Pista: fíjate en lo que devolvió la reserva.' },
  { pose: 'celebrating', label: 'Celebrando', message: '¡Caso resuelto!' },
]

export function IntroSection({ id }: SectionProps) {
  const [current, setCurrent] = useState(DEMO_POSES[0])

  return (
    <SectionShell id={id} eyebrow="Parte 1" title="Introducción">
      <div className="mb-8 flex flex-wrap gap-2">
        {DEMO_POSES.map((demo) => (
          <button
            key={demo.pose}
            type="button"
            onClick={() => setCurrent(demo)}
            className={`rounded-full border-2 border-ink px-3 py-1 text-sm font-semibold ${
              current.pose === demo.pose ? 'bg-primary text-white' : 'bg-white'
            }`}
          >
            {demo.label}
          </button>
        ))}
      </div>

      <Bita pose={current.pose} message={current.message} size="lg" />
    </SectionShell>
  )
}
