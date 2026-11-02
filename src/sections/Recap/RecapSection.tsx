import { Bita } from '../../components/Bita/Bita'
import { FlipCard } from '../../components/FlipCard/FlipCard'
import { SectionShell } from '../../components/SectionShell/SectionShell'
import { recapCards, recapIntro } from '../../content/recap'
import type { SectionProps } from '../../types/section'

/**
 * Parte 4: repaso de conceptos.
 * En pantallas grandes, cuadrícula de 4 columnas y 2 filas:
 * Bita ocupa el primer hueco y las siete tarjetas, el resto.
 */
export function RecapSection({ id }: SectionProps) {
  return (
    <SectionShell id={id} eyebrow="Parte 4" title="Lo que ya sabemos">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <li className="flex items-center justify-center">
          <Bita pose="presenting" message={recapIntro} bubbleSide="top" size="sm" />
        </li>

        {recapCards.map((card) => (
          <li key={card.id}>
            <FlipCard
              highlight={card.highlight}
              storageKey={`masterclass:repaso:${card.id}`}
              front={
                <>
                  <span className="font-mono text-xs uppercase tracking-wider">
                    Visto en el bootcamp
                  </span>
                  <span className="mt-1 text-sm">{card.seenIn}</span>
                  <span className="mt-3 font-heading text-xl font-bold leading-tight">
                    {card.concept}
                  </span>
                </>
              }
              back={
                <>
                  <span className="font-heading text-base font-bold leading-tight">
                    {card.concept}
                  </span>
                  <span className="mt-2 text-sm">{card.what}</span>
                  <span className="mt-3 font-mono text-xs uppercase tracking-wider text-primary">
                    En el caso de Catalina
                  </span>
                  <span className="mt-1 text-sm font-semibold">{card.inTheCase}</span>
                </>
              }
            />
          </li>
        ))}
      </ul>
    </SectionShell>
  )
}
