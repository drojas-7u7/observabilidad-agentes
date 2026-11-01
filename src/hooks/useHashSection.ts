import { useSyncExternalStore } from 'react'

/** Avisa a React cada vez que cambia el ancla de la dirección (#...). */
function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

/** Ancla actual, sin el símbolo #. */
function getHash(): string {
  return window.location.hash.slice(1)
}

/**
 * Devuelve la sección activa a partir de la dirección (#el-caso, #reto...).
 * Si el ancla no corresponde a ninguna sección, devuelve la primera.
 */
export function useHashSection(ids: string[]): string {
  const hash = useSyncExternalStore(subscribe, getHash)
  return ids.includes(hash) ? hash : ids[0]
}
