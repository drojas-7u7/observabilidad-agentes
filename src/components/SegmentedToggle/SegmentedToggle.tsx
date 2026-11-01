import { motion } from 'motion/react'
import { useId } from 'react'

interface ToggleOption<T extends string> {
  value: T
  label: string
}

interface SegmentedToggleProps<T extends string> {
  /** Descripción del interruptor para lectores de pantalla. */
  label: string
  /** Las dos opciones del interruptor. */
  options: [ToggleOption<T>, ToggleOption<T>]
  /** Opción activa. */
  value: T
  onChange: (value: T) => void
}

/** Interruptor de dos posiciones con un fondo que se desliza a la opción activa. */
export function SegmentedToggle<T extends string>({
  label,
  options,
  value,
  onChange,
}: SegmentedToggleProps<T>) {
  // Identificador único, para que varios interruptores no compartan animación.
  const id = useId()

  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex rounded-full border-2 border-ink bg-white p-1 shadow-[3px_3px_0_0_var(--color-ink)]"
    >
      {options.map((option) => {
        const isActive = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
            className="relative rounded-full px-4 py-1.5 text-sm font-bold"
          >
            {isActive && (
              <motion.span
                layoutId={`toggle-${id}`}
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className={`relative ${isActive ? 'text-white' : 'text-ink'}`}>
              {option.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
