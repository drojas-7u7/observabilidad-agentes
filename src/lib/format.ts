/** Funciones para mostrar números en formato español en toda la web. */

const numberFormatter = new Intl.NumberFormat('es-ES')

const secondsFormatter = new Intl.NumberFormat('es-ES', {
  maximumFractionDigits: 1,
})

const costFormatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
})

/** Número con formato español. Ejemplo: 3165 -> "3165". */
export function formatNumber(value: number): string {
  return numberFormatter.format(value)
}

/** Duración legible. Ejemplos: 410 -> "410 ms", 4120 -> "4,1 s". */
export function formatDuration(ms: number): string {
  return ms < 1000 ? `${ms} ms` : `${secondsFormatter.format(ms / 1000)} s`
}

/** Coste en euros con cuatro decimales. Ejemplo: 0.0036 -> "0,0036 €". */
export function formatCost(eur: number): string {
  return costFormatter.format(eur)
}
