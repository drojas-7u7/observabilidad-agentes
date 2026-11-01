import { useState } from 'react'
import { SectionShell } from '../../components/SectionShell/SectionShell'
import { SegmentedToggle } from '../../components/SegmentedToggle/SegmentedToggle'
import type { SectionProps } from '../../types/section'

// Provisional: prueba del interruptor con un ejemplo de datos sensibles (inventados).
type StorageMode = 'careless' | 'careful'

export function ClosingSection({ id }: SectionProps) {
  const [mode, setMode] = useState<StorageMode>('careless')

  return (
    <SectionShell id={id} eyebrow="Parte 7" title="Cerrar el caso">
      <SegmentedToggle
        label="Cómo se guardan los datos en la traza"
        options={[
          { value: 'careless', label: 'Guardado sin cuidado' },
          { value: 'careful', label: 'Guardado correctamente' },
        ]}
        value={mode}
        onChange={setMode}
      />
      <pre className="mt-6 rounded-lg bg-ink p-4 font-mono text-sm text-background">
        {mode === 'careless'
          ? 'cliente: "Catalina Ruiz Gómez"\ntarjeta: "1234 5678 9012 3456"'
          : 'cliente: "C***"\ntarjeta: "**** **** **** 3456"'}
      </pre>
    </SectionShell>
  )
}
