import { motion } from 'motion/react'
import { QRCodeSVG } from 'qrcode.react'
import { Bita } from '../../components/Bita/Bita'
import { coverContent, presenter } from '../../content/cover'
import type { SectionProps } from '../../types/section'

/** Dirección actual de la página, sin el ancla (#...), para el código QR. */
function getPageUrl(): string {
  return `${window.location.origin}${window.location.pathname}`
}

/** Animación de entrada escalonada para los elementos de la portada. */
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
})

/** Portada: título, ponente, QR y Bita. */
export function CoverSection({ id }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="px-6">
      <div className="mx-auto grid max-w-6xl items-center gap-10 py-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div>
          <motion.p
            {...fadeUp(0)}
            className="font-mono text-sm uppercase tracking-widest text-primary"
          >
            {coverContent.label}
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            id={`${id}-title`}
            className="mt-3 text-5xl font-bold leading-tight"
          >
            {coverContent.title}
          </motion.h1>

          <motion.p {...fadeUp(0.2)} className="mt-4 text-2xl font-semibold">
            {coverContent.hook}
          </motion.p>

          <motion.p {...fadeUp(0.3)} className="mt-2 text-sm text-ink/70">
            {coverContent.sessionInfo}
          </motion.p>

          <motion.div
            {...fadeUp(0.4)}
            className="mt-6 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]"
          >
            <article className="rounded-2xl border-2 border-ink bg-white p-5 shadow-[4px_4px_0_0_var(--color-ink)]">
              <h2 className="font-mono text-xs uppercase tracking-widest text-primary">
                Quién soy
              </h2>
              <p className="mt-1 font-heading text-xl font-bold">{presenter.name}</p>
              {presenter.lines.map((line) => (
                <p key={line} className="mt-1 text-sm">
                  {line}
                </p>
              ))}
              <p className="mt-2 font-mono text-xs text-ink/70">{presenter.profileDate}</p>
              <div className="mt-3 flex gap-2">
                {presenter.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border-2 border-ink px-3 py-1 text-sm font-bold transition hover:bg-surface"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </article>

            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-ink bg-white p-4">
              <QRCodeSVG value={getPageUrl()} size={128} fgColor="#1e2a4a" bgColor="#ffffff" />
              <p className="max-w-36 text-center text-xs font-semibold">
                {coverContent.qrCaption}
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.5)} className="mt-6">
            <a
              href={`#${coverContent.ctaTargetId}`}
              className="inline-block rounded-full border-2 border-ink bg-primary px-8 py-3 text-lg font-bold text-white shadow-[4px_4px_0_0_var(--color-ink)] transition hover:-translate-y-0.5"
            >
              {coverContent.ctaLabel}
            </a>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.3)} className="flex justify-center">
          <Bita pose="presenting" message={coverContent.motto} bubbleSide="top" size="lg" />
        </motion.div>
      </div>
    </section>
  )
}
