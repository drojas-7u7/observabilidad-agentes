import { RealWorld } from '../../components/RealWorld/RealWorld'
import { SegmentedToggle } from '../../components/SegmentedToggle/SegmentedToggle'
import { ethicsMoment } from '../../content/closing'
import { usePersistentState } from '../../hooks/usePersistentState'

type StorageMode = 'careless' | 'careful'

/** Momento 4: datos sensibles en las trazas y riesgos de la observabilidad. */
export function EthicsMoment() {
  const [mode, setMode] = usePersistentState<StorageMode>('masterclass:cierre:datos', 'careless')
  const isCareful = mode === 'careful'

  return (
    <div>
      <p className="max-w-3xl text-lg">{ethicsMoment.idea}</p>

      <div className="mt-6 rounded-2xl border-2 border-ink bg-white p-5">
        <p className="font-heading text-xl font-bold">{ethicsMoment.exampleTitle}</p>
        <div className="mt-3">
          <SegmentedToggle
            label={ethicsMoment.toggleLabel}
            options={[
              { value: 'careless', label: ethicsMoment.carelessLabel },
              { value: 'careful', label: ethicsMoment.carefulLabel },
            ]}
            value={mode}
            onChange={setMode}
          />
        </div>
        <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-ink p-4 font-mono text-sm leading-relaxed text-background">
          {JSON.stringify(isCareful ? ethicsMoment.careful : ethicsMoment.careless, null, 2)}
        </pre>
        <p className={`mt-3 font-bold ${isCareful ? 'text-success' : 'text-danger'}`}>
          {isCareful ? ethicsMoment.carefulNote : ethicsMoment.carelessNote}
        </p>
        <p className="mt-1 text-xs text-ink/70">{ethicsMoment.fakeDataNote}</p>
      </div>

      <p className="mt-8 font-heading text-xl font-bold">{ethicsMoment.risksTitle}</p>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {ethicsMoment.risks.map((risk) => (
          <li key={risk.title} className="rounded-2xl border-2 border-ink bg-white p-4">
            <p className="font-bold">{risk.title}</p>
            <p className="mt-1 text-sm">{risk.text}</p>
          </li>
        ))}
      </ul>

      <RealWorld {...ethicsMoment.realWorld} />
    </div>
  )
}
