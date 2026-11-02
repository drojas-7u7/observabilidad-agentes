import { motion } from 'motion/react'
import { afterFinding } from '../../content/challenge'

/** Después de resolver el caso: para qué sirve el hallazgo y cómo se gestiona. */
export function AfterFinding() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      aria-labelledby="despues-del-hallazgo"
      className="mt-10 rounded-2xl border-2 border-ink bg-white p-6 shadow-[4px_4px_0_0_var(--color-ink)]"
    >
      <h3 id="despues-del-hallazgo" className="font-heading text-3xl font-bold">
        {afterFinding.title}
      </h3>
      <p className="mt-2 text-lg">{afterFinding.intro}</p>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {afterFinding.purposes.map((purpose) => (
          <li key={purpose.title} className="rounded-xl bg-background p-4">
            <p className="font-bold">{purpose.title}</p>
            <p className="mt-1 text-sm">{purpose.text}</p>
          </li>
        ))}
      </ul>

      <p className="mt-8 font-heading text-xl font-bold">{afterFinding.processTitle}</p>
      <p className="mt-1 text-ink/80">{afterFinding.processIntro}</p>

      <ol className="mt-4 space-y-3">
        {afterFinding.steps.map((step, index) => (
          <li key={step.text} className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink font-heading font-bold text-background">
              {index + 1}
            </span>
            <div>
              <span className="inline-block rounded-full bg-surface px-2.5 py-0.5 font-mono text-xs font-bold">
                {step.owner}
              </span>
              <p className="mt-1">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-6 border-l-4 border-accent bg-background py-2 pl-4 font-semibold">
        {afterFinding.closingNote}
      </p>
    </motion.section>
  )
}
