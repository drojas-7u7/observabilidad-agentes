import { motion } from 'motion/react'
import { usePersistentState } from '../../hooks/usePersistentState'
import { Bita } from '../../components/Bita/Bita'
import { ChatMessage } from '../../components/ChatMessage/ChatMessage'
import { RealWorld } from '../../components/RealWorld/RealWorld'
import { SegmentedToggle } from '../../components/SegmentedToggle/SegmentedToggle'
import { TraceOutline } from '../../components/TraceExplorer/TraceOutline'
import { instrumentMoment } from '../../content/tools'
import { catalinaTrace } from '../../data/traces/catalina'

type InstrumentMode = 'off' | 'on'

/** Momento 2: sin instrumentar solo hay palabras; instrumentado hay pruebas. */
export function InstrumentMoment() {
  const [mode, setMode] = usePersistentState<InstrumentMode>('masterclass:herramientas:instrumentar', 'off')
  const isOn = mode === 'on'

  return (
    <div>
      <p className="max-w-3xl text-lg">{instrumentMoment.idea}</p>

      <div className="mt-5">
        <SegmentedToggle
          label={instrumentMoment.toggleLabel}
          options={[
            { value: 'off', label: instrumentMoment.offLabel },
            { value: 'on', label: instrumentMoment.onLabel },
          ]}
          value={mode}
          onChange={setMode}
        />
      </div>

      <div className="mt-6 grid items-end gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]">
        <div className="rounded-2xl border-2 border-ink bg-white p-5">
          <p className="font-semibold">
            {isOn ? instrumentMoment.withNote : instrumentMoment.withoutNote}
          </p>
          <div className="mt-3">
            <ChatMessage
              author={instrumentMoment.agentName}
              text={catalinaTrace.finalAnswer}
              side="left"
            />
          </div>
          {isOn && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <TraceOutline trace={catalinaTrace} />
            </motion.div>
          )}
        </div>

        <Bita
          pose={isOn ? 'presenting' : 'thinking'}
          message={isOn ? instrumentMoment.bitaOn : instrumentMoment.bitaOff}
          bubbleSide="top"
          size="sm"
        />
      </div>

      <RealWorld {...instrumentMoment.realWorld} />
    </div>
  )
}
