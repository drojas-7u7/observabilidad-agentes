import { motion } from 'motion/react'
import { useState } from 'react'
import { RealWorld } from '../../components/RealWorld/RealWorld'
import { StatusBadge } from '../../components/TraceExplorer/StatusBadge'
import { carMoment } from '../../content/tools'

/** Momento 1: monitorizar frente a observar, con el ejemplo del coche. */
export function CarMoment() {
  const [isAtWorkshop, setIsAtWorkshop] = useState(false)

  return (
    <div>
      <p className="max-w-3xl text-lg">{carMoment.idea}</p>

      <div className="mt-6 grid items-start gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        {/* El salpicadero: solo avisa */}
        <div className="rounded-2xl border-2 border-ink bg-ink p-5 text-background">
          <p className="font-mono text-xs uppercase tracking-widest text-background/70">
            {carMoment.dashboardTitle}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <motion.span
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-warning font-heading text-3xl font-bold text-ink"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              aria-hidden="true"
            >
              !
            </motion.span>
            <div>
              <p className="font-bold">{carMoment.warning}</p>
              <p className="text-sm text-background/80">{carMoment.warningNote}</p>
            </div>
          </div>
          {!isAtWorkshop && (
            <button
              type="button"
              onClick={() => setIsAtWorkshop(true)}
              className="mt-5 rounded-full border-2 border-background bg-accent px-5 py-2 font-bold text-ink transition hover:-translate-y-0.5"
            >
              {carMoment.button}
            </button>
          )}
        </div>

        {/* El taller: los datos registrados */}
        {isAtWorkshop ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border-2 border-ink bg-white p-5 shadow-[4px_4px_0_0_var(--color-ink)]"
          >
            <p className="font-heading text-lg font-bold">{carMoment.workshopTitle}</p>
            <table className="mt-3 w-full text-left text-sm">
              <thead>
                <tr className="font-mono text-xs uppercase text-ink/70">
                  <th className="pb-2 font-normal">Hora</th>
                  <th className="pb-2 font-normal">Sensor</th>
                  <th className="pb-2 font-normal">Valor</th>
                  <th className="pb-2 font-normal">Estado</th>
                </tr>
              </thead>
              <tbody>
                {carMoment.readings.map((reading) => (
                  <tr key={`${reading.time}-${reading.sensor}`} className="border-t border-ink/10">
                    <td className="py-2 font-mono">{reading.time}</td>
                    <td className="py-2">{reading.sensor}</td>
                    <td className="py-2 font-mono">{reading.value}</td>
                    <td className="py-2">
                      <StatusBadge status={reading.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 font-bold text-danger">{carMoment.diagnosis}</p>
          </motion.div>
        ) : (
          <div className="flex min-h-40 items-center justify-center rounded-2xl border-2 border-dashed border-ink/30 p-6 text-center text-ink/60">
            {carMoment.workshopPlaceholder}
          </div>
        )}
      </div>

      {/* La equivalencia con los agentes */}
      {isAtWorkshop && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <p className="font-heading text-xl font-bold">{carMoment.mappingTitle}</p>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {carMoment.mapping.map((item) => (
              <li key={item.car} className="rounded-2xl border-2 border-ink bg-white p-4">
                <p className="text-sm text-ink/70">{item.car}</p>
                <p className="mt-1 font-bold">→ {item.agent}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      <RealWorld {...carMoment.realWorld} />
    </div>
  )
}
