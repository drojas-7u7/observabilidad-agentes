import { useState } from 'react'
import { usePersistentState } from '../../hooks/usePersistentState'
import type { Question, QuestionOption } from '../../types/question'
import { Bita } from '../Bita/Bita'
import type { BitaPose } from '../Bita/bitaPoses'

/** Estilo de cada tarjeta según su estado. */
const OPTION_CLASSES = {
  idle: 'border-ink bg-white hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--color-ink)]',
  wrong: 'border-danger bg-danger/10',
  correct: 'border-success bg-success/10 shadow-[4px_4px_0_0_var(--color-success)]',
} as const

interface ChoiceQuestionProps {
  question: Question
  /** Mensaje inicial de Bita, antes de responder. */
  intro?: string
  /** Se llama una vez cuando se acierta. */
  onCorrect?: () => void
  /** Tamaño de Bita junto a la pregunta. */
  bitaSize?: 'sm' | 'md' | 'lg'
  /** Si se indica, la pregunta recuerda las respuestas al cambiar de sección. */
  storageKey?: string
}

interface BitaState {
  pose: BitaPose
  message: string
  /** Contador para que el bocadillo se anime en cada mensaje nuevo. */
  key: number
}

/** Pregunta con opciones, respuestas explicadas por Bita y pistas opcionales. */
export function ChoiceQuestion({
  question,
  intro = 'Elige una opción y te digo qué opino.',
  onCorrect,
  bitaSize = 'md',
  storageKey,
}: ChoiceQuestionProps) {
  const hints = question.hints ?? []
  const [triedIds, setTriedIds] = usePersistentState<string[]>(
    storageKey ? `${storageKey}:probadas` : null,
    [],
  )
  const [hintsUsed, setHintsUsed] = usePersistentState<number>(
    storageKey ? `${storageKey}:pistas` : null,
    0,
  )

  // La pregunta está resuelta si entre las opciones probadas está la correcta.
  const correctOption = question.options.find((option) => option.isCorrect)
  const isSolved = correctOption !== undefined && triedIds.includes(correctOption.id)

  // Al volver a una pregunta ya resuelta, Bita recuerda la explicación correcta.
  const [bita, setBita] = useState<BitaState>(() =>
    isSolved && correctOption
      ? { pose: 'celebrating', message: correctOption.feedback, key: 0 }
      : { pose: 'thinking', message: intro, key: 0 },
  )

  const say = (pose: BitaPose, message: string) =>
    setBita((previous) => ({ pose, message, key: previous.key + 1 }))

  const handleSelect = (option: QuestionOption) => {
    if (isSolved) return
    setTriedIds((previous) =>
      previous.includes(option.id) ? previous : [...previous, option.id],
    )
    if (option.isCorrect) {
      say('celebrating', option.feedback)
      onCorrect?.()
    } else {
      say('investigating', option.feedback)
    }
  }

  const handleHint = () => {
    if (hintsUsed >= hints.length) return
    say('hint', hints[hintsUsed])
    setHintsUsed(hintsUsed + 1)
  }

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <div>
        <p className="font-heading text-2xl font-bold">{question.prompt}</p>
        <p className="mt-1 text-sm font-semibold text-ink/70">
          {isSolved ? '¡Respuesta correcta!' : 'Elige una opción.'}
        </p>

        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {question.options.map((option) => {
            const state = triedIds.includes(option.id)
              ? option.isCorrect
                ? 'correct'
                : 'wrong'
              : 'idle'

            return (
              <li key={option.id}>
                <button
                  type="button"
                  onClick={() => handleSelect(option)}
                  disabled={isSolved && !option.isCorrect}
                  className={`flex h-full w-full flex-col gap-2 rounded-2xl border-2 p-4 text-left font-semibold transition disabled:opacity-50 ${OPTION_CLASSES[state]}`}
                >
                  <span>{option.text}</span>
                  {state !== 'idle' && (
                    <span
                      className={`self-start rounded-full px-2.5 py-0.5 text-xs font-bold text-white ${
                        state === 'correct' ? 'bg-success' : 'bg-danger'
                      }`}
                    >
                      {state === 'correct' ? 'Correcta' : 'Incorrecta'}
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>

        {hints.length > 0 && !isSolved && (
          <button
            type="button"
            onClick={handleHint}
            disabled={hintsUsed >= hints.length}
            className="mt-4 rounded-full border-2 border-ink bg-accent px-4 py-2 text-sm font-bold transition disabled:opacity-50"
          >
            {hintsUsed >= hints.length
              ? 'No quedan más pistas'
              : `Pedir pista a Bita (${hintsUsed + 1} de ${hints.length})`}
          </button>
        )}
      </div>

      <Bita
        pose={bita.pose}
        message={bita.message}
        messageKey={String(bita.key)}
        bubbleSide="top"
        size={bitaSize}
      />
    </div>
  )
}
