import { motion } from 'motion/react'

interface ChatMessageProps {
  author: string
  text: string
  /** right: la clienta; left: el agente. */
  side: 'left' | 'right'
}

/** Un mensaje del chat entre la clienta y el agente. */
export function ChatMessage({ author, text, side }: ChatMessageProps) {
  const isRight = side === 'right'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col ${isRight ? 'items-end' : 'items-start'}`}
    >
      <span className="mb-1 font-mono text-xs text-ink/70">{author}</span>
      <p
        className={`max-w-[85%] rounded-2xl border-2 border-ink px-4 py-2.5 ${
          isRight ? 'rounded-br-sm bg-primary text-white' : 'rounded-bl-sm bg-white'
        }`}
      >
        {text}
      </p>
    </motion.div>
  )
}

/** Indicador de "escribiendo..." con tres puntos animados. */
export function TypingIndicator({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-ink/70" role="status">
      <span>{label}</span>
      <span className="flex gap-1" aria-hidden="true">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="h-1.5 w-1.5 rounded-full bg-ink/70"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1, repeat: Infinity, delay: dot * 0.2 }}
          />
        ))}
      </span>
    </div>
  )
}
