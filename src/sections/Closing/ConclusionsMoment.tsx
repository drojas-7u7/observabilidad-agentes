import { motion } from 'motion/react'
import { Bita } from '../../components/Bita/Bita'
import { conclusionsMoment } from '../../content/closing'

/** Momento 5: la respuesta a la pregunta del principio y las ideas clave. */
export function ConclusionsMoment() {
  return (
    <div>
      <div className="rounded-2xl border-2 border-ink bg-white p-6 shadow-[4px_4px_0_0_var(--color-ink)]">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">
          {conclusionsMoment.questionLabel}
        </p>
        <p className="mt-2 font-heading text-3xl font-bold">{conclusionsMoment.question}</p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-2xl font-semibold text-success"
        >
          {conclusionsMoment.answer}
        </motion.p>
      </div>

      <div className="mt-8 grid items-center gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div>
          <p className="font-heading text-xl font-bold">{conclusionsMoment.ideasTitle}</p>
          <ol className="mt-3 space-y-3">
            {conclusionsMoment.ideas.map((idea, index) => (
              <li key={idea} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink font-heading text-lg font-bold text-background">
                  {index + 1}
                </span>
                <span className="text-lg font-semibold">{idea}</span>
              </li>
            ))}
          </ol>

          <p className="mt-10 font-heading text-5xl font-bold">{conclusionsMoment.questionsTitle}</p>
          <p className="mt-2 text-xl">{conclusionsMoment.thanks}</p>
        </div>

        <Bita pose="presenting" message={conclusionsMoment.bita} bubbleSide="top" size="lg" />
      </div>
    </div>
  )
}
