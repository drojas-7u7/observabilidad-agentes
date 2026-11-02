import { motion } from 'motion/react'
import { useState } from 'react'
import { Bita } from '../../components/Bita/Bita'
import { RealWorld } from '../../components/RealWorld/RealWorld'
import { LockIcon } from '../../components/icons/LockIcon'
import { evaluateMoment, type CheckerId } from '../../content/closing'
import { usePersistentState } from '../../hooks/usePersistentState'

type Answers = Record<string, CheckerId>
type RunState = 'none' | 'before' | 'after'

const LOCKED_MESSAGE =
  'Antes de probar el arreglo, responde bien las tres preguntas de arriba: así sabrás qué comprueba cada evaluador.'

/** Actividad: ¿quién debería comprobar cada cosa? */
function CheckersActivity({
  answers,
  onAnswer,
}: {
  answers: Answers
  onAnswer: (checkId: string, checkerId: CheckerId) => void
}) {
  return (
    <div className="mt-8">
      <p className="font-heading text-xl font-bold">{evaluateMoment.checkersTitle}</p>
      <p className="text-sm font-semibold text-ink/70">{evaluateMoment.checkersInstruction}</p>

      <ul className="mt-4 space-y-4">
        {evaluateMoment.checks.map((check) => {
          const answer = answers[check.id]
          const isCorrect = answer === check.answer
          return (
            <li key={check.id} className="rounded-2xl border-2 border-ink bg-white p-4">
              <p className="font-semibold">{check.text}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {evaluateMoment.checkerOptions.map((option) => {
                  const isChosen = answer === option.id
                  let stateClasses = 'border-ink bg-white hover:bg-surface'
                  if (isChosen) {
                    stateClasses = isCorrect
                      ? 'border-success bg-success text-white'
                      : 'border-danger bg-danger text-white'
                  }
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={isChosen}
                      disabled={isCorrect && !isChosen}
                      onClick={() => onAnswer(check.id, option.id)}
                      className={`rounded-full border-2 px-4 py-1.5 text-sm font-bold transition disabled:opacity-40 ${stateClasses}`}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
              {answer && (
                <p
                  className={`mt-3 text-sm font-semibold ${isCorrect ? 'text-success' : 'text-danger'}`}
                >
                  {isCorrect ? check.explanation : evaluateMoment.wrongAnswer}
                </p>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/** Ejecución simulada del golden set. "Después del arreglo" se desbloquea al acertar todo. */
function GoldenSetRun({ isUnlocked }: { isUnlocked: boolean }) {
  const [run, setRun] = usePersistentState<RunState>('masterclass:cierre:golden-set', 'none')
  const [showLockedMessage, setShowLockedMessage] = useState(false)
  const cases = Array.from({ length: evaluateMoment.totalCases }, (_, index) => index)

  const caseColor = (index: number) => {
    if (run === 'none') return 'bg-white'
    if (run === 'before' && evaluateMoment.failingCases.includes(index)) return 'bg-danger'
    return 'bg-success'
  }

  const runAfter = () => {
    if (!isUnlocked) {
      setShowLockedMessage(true)
      return
    }
    setShowLockedMessage(false)
    setRun('after')
  }

  return (
    <div className="mt-10">
      <p className="font-heading text-xl font-bold">{evaluateMoment.runTitle}</p>
      <div className="mt-3 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setRun('before')}
          className="rounded-full border-2 border-ink bg-white px-4 py-2 text-sm font-bold transition hover:bg-surface"
        >
          {evaluateMoment.runBeforeLabel}
        </button>
        <button
          type="button"
          onClick={runAfter}
          aria-disabled={!isUnlocked}
          className={`inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 py-2 text-sm font-bold transition ${
            isUnlocked
              ? 'bg-primary text-white hover:-translate-y-0.5'
              : 'cursor-not-allowed bg-ink/10 text-ink/60'
          }`}
        >
          {!isUnlocked && <LockIcon />}
          {evaluateMoment.runAfterLabel}
        </button>
      </div>

      {showLockedMessage && !isUnlocked && (
        <p role="status" className="mt-3 font-semibold text-danger">
          {LOCKED_MESSAGE}
        </p>
      )}

      <div className="mt-5 grid max-w-xl grid-cols-10 gap-2" aria-hidden="true">
        {cases.map((index) => (
          <motion.span
            key={`${run}-${index}`}
            initial={{ scale: 0.4, opacity: 0.3 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: run === 'none' ? 0 : index * 0.05, duration: 0.2 }}
            className={`aspect-square rounded-md border-2 border-ink ${caseColor(index)} ${
              index === evaluateMoment.catalinaCase ? 'ring-4 ring-accent' : ''
            }`}
          />
        ))}
      </div>
      <p className="mt-2 text-sm text-ink/70">{evaluateMoment.catalinaLabel}</p>

      {run !== 'none' && (
        <motion.p
          key={run}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: evaluateMoment.totalCases * 0.05 }}
          role="status"
          className={`mt-4 font-heading text-xl font-bold ${run === 'after' ? 'text-success' : 'text-danger'}`}
        >
          {run === 'after' ? evaluateMoment.resultAfter : evaluateMoment.resultBefore}
        </motion.p>
      )}

      {run === 'after' && (
        <Bita pose="celebrating" message={evaluateMoment.bitaAfter} size="sm" className="mt-4" />
      )}
    </div>
  )
}

/**
 * Momento 2: golden set, quién comprueba cada cosa y ejecución de la evaluación.
 * Las respuestas se guardan aquí porque las necesitan dos piezas:
 * la actividad (para mostrarlas) y el golden set (para desbloquear el botón).
 */
export function EvaluateMoment() {
  const [answers, setAnswers] = usePersistentState<Answers>('masterclass:cierre:jueces', {})
  const allCorrect = evaluateMoment.checks.every((check) => answers[check.id] === check.answer)

  const handleAnswer = (checkId: string, checkerId: CheckerId) =>
    setAnswers((previous) => ({ ...previous, [checkId]: checkerId }))

  return (
    <div>
      <p className="max-w-3xl text-lg">{evaluateMoment.idea}</p>

      <div className="mt-5 rounded-2xl border-2 border-primary bg-primary/10 p-5">
        <p className="font-heading text-xl font-bold">{evaluateMoment.goldenSetTitle}</p>
        <p className="mt-1">{evaluateMoment.goldenSetText}</p>
      </div>

      <CheckersActivity answers={answers} onAnswer={handleAnswer} />
      <GoldenSetRun isUnlocked={allCorrect} />

      <p className="mt-8 border-l-4 border-accent bg-white/60 py-2 pl-4">
        {evaluateMoment.offlineOnline}
      </p>

      <RealWorld {...evaluateMoment.realWorld} />
    </div>
  )
}
