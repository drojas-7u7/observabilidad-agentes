import celebrating from '../../assets/bita/bita-celebrando.webp'
import hint from '../../assets/bita/bita-pista.webp'
import investigating from '../../assets/bita/bita-investigando.webp'
import presenting from '../../assets/bita/bita-presentando.webp'
import surprised from '../../assets/bita/bita-sorprendido.webp'
import thinking from '../../assets/bita/bita-pensativo.webp'

/** Poses disponibles de Bita. */
export type BitaPose =
  | 'presenting'
  | 'investigating'
  | 'surprised'
  | 'hint'
  | 'thinking'
  | 'celebrating'

/**
 * Imagen y texto alternativo de cada pose, en un único sitio.
 * Para cambiar una ilustración, sustituye su archivo en src/assets/bita.
 */
export const BITA_POSES: Record<BitaPose, { src: string; alt: string }> = {
  presenting: {
    src: presenting,
    alt: 'Bita, el detective suricata, presentándose con su lupa',
  },
  investigating: {
    src: investigating,
    alt: 'Bita examinando algo de cerca con su lupa',
  },
  surprised: {
    src: surprised,
    alt: 'Bita sorprendido, señalando un hallazgo',
  },
  hint: {
    src: hint,
    alt: 'Bita guiñando un ojo mientras da una pista',
  },
  thinking: {
    src: thinking,
    alt: 'Bita pensativo, con la mano en la barbilla',
  },
  celebrating: {
    src: celebrating,
    alt: 'Bita saltando de alegría para celebrar',
  },
}
