import { Bita } from '../../components/Bita/Bita'
import { RealWorld } from '../../components/RealWorld/RealWorld'
import { TraceExplorer } from '../../components/TraceExplorer/TraceExplorer'
import { traceMoment } from '../../content/tools'
import { charoTrace } from '../../data/traces/charo'

/** Momento 4: claves para leer una traza y explorador con la traza de Charo. */
export function TraceMoment() {
  return (
    <div>
      <p className="max-w-3xl text-lg">{traceMoment.idea}</p>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {traceMoment.keys.map((key) => (
          <li key={key.title} className="rounded-2xl border-2 border-ink bg-white p-4">
            <p className="font-heading text-lg font-bold">{key.title}</p>
            <p className="mt-1 text-sm">{key.text}</p>
          </li>
        ))}
      </ul>

      <Bita pose="hint" message={traceMoment.bita} bubbleSide="right" size="sm" className="mt-6" />

      <div className="mt-4">
        <TraceExplorer trace={charoTrace} description={traceMoment.explorerDescription} />
      </div>

      <p className="mt-4 text-sm text-ink/70">{traceMoment.standard}</p>

      <RealWorld {...traceMoment.realWorld} />
    </div>
  )
}
