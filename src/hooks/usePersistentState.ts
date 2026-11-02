import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'

/** Lee un valor guardado. Si no existe o no se puede leer, devuelve el inicial. */
function readStoredValue<T>(key: string | null, initial: T): T {
  if (key === null) return initial
  try {
    const raw = window.sessionStorage.getItem(key)
    return raw === null ? initial : (JSON.parse(raw) as T)
  } catch {
    return initial
  }
}

/**
 * Igual que useState, pero recuerda el valor en sessionStorage:
 * se conserva al cambiar de sección o recargar, y se borra al cerrar la pestaña.
 * Si la clave es null, funciona como un useState normal.
 */
export function usePersistentState<T>(
  key: string | null,
  initial: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => readStoredValue(key, initial))

  useEffect(() => {
    if (key === null) return
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Si el navegador no permite guardar, la web sigue funcionando sin memoria.
    }
  }, [key, value])

  return [value, setValue]
}

/** Borra todos los valores guardados cuya clave empieza por el prefijo indicado. */
export function clearPersistentState(prefix: string): void {
  try {
    const keys = Object.keys(window.sessionStorage).filter((key) => key.startsWith(prefix))
    keys.forEach((key) => window.sessionStorage.removeItem(key))
  } catch {
    // Sin acceso al almacenamiento: no hay nada que borrar.
  }
}
