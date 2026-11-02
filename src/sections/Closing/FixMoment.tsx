import { Bita } from '../../components/Bita/Bita'
import { SegmentedToggle } from '../../components/SegmentedToggle/SegmentedToggle'
import { fixMoment } from '../../content/closing'
import { usePersistentState } from '../../hooks/usePersistentState'

type FixVersion = 'before' | 'after'

/** Una tarjeta del antes y el después, con su nota en rojo o en verde. */
function FixCard({
  title,
  body,
  note,
  isAfter,
}: {
  title: string
  body: string
  note: string
  isAfter: boolean
}) {
  return (
    <article className="flex flex-col rounded-2xl border-2 border-ink bg-white p-5">
      <p className="font-heading text-lg font-bold">{title}</p>
      <pre className="mt-3 flex-1 whitespace-pre-wrap rounded-lg bg-ink p-3 font-mono text-sm leading-relaxed text-background">
        {body}
      </pre>
      <p className={`mt-3 font-bold ${isAfter ? 'text-success' : 'text-danger'}`}>{note}</p>
    </article>
  )
}

/** Momento 1: el antes y el después de los dos arreglos. */
export function FixMoment() {
  const [version, setVersion] = usePersistentState<FixVersion>('masterclass:cierre:arreglo', 'before')
  const isAfter = version === 'after'

  return (
    <div>
      <p className="max-w-3xl text-lg">{fixMoment.idea}</p>

      <div className="mt-5">
        <SegmentedToggle
          label={fixMoment.toggleLabel}
          options={[
            { value: 'before', label: fixMoment.beforeLabel },
            { value: 'after', label: fixMoment.afterLabel },
          ]}
          value={version}
          onChange={setVersion}
        />
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <FixCard
          title={fixMoment.toolTitle}
          body={JSON.stringify(isAfter ? fixMoment.toolAfter : fixMoment.toolBefore, null, 2)}
          note={isAfter ? fixMoment.toolNoteAfter : fixMoment.toolNoteBefore}
          isAfter={isAfter}
        />
        <FixCard
          title={fixMoment.agentTitle}
          body={isAfter ? fixMoment.agentAfter : fixMoment.agentBefore}
          note={isAfter ? fixMoment.agentNoteAfter : fixMoment.agentNoteBefore}
          isAfter={isAfter}
        />
      </div>

      {isAfter && <Bita pose="presenting" message={fixMoment.bita} size="sm" className="mt-6" />}
    </div>
  )
}
