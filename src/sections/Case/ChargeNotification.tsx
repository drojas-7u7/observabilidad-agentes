import { motion } from 'motion/react'

interface ChargeNotificationProps {
  source: string
  title: string
  amount: string
  detail: string
}

/** Notificación (ficticia) del cargo en la tarjeta, que aparece con impacto. */
export function ChargeNotification({ source, title, amount, detail }: ChargeNotificationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      className="rounded-2xl border-2 border-danger bg-white p-5 shadow-[6px_6px_0_0_var(--color-danger)]"
      role="alert"
    >
      <p className="font-mono text-xs uppercase tracking-wider text-ink/70">{source}</p>
      <p className="mt-1 font-bold">{title}</p>
      <p className="mt-1 font-heading text-5xl font-bold text-danger">{amount}</p>
      <p className="mt-1 text-sm">{detail}</p>
    </motion.div>
  )
}
