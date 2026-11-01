import type { Span } from '../types/trace'

/** Un span junto con su posición en el árbol. */
export interface SpanNode {
  span: Span
  /** Nivel de profundidad (0 = raíz). */
  depth: number
  /** true si es el último hijo de su padre (para dibujar el conector └─). */
  isLastChild: boolean
}

/**
 * Ordena los spans como un árbol: cada padre seguido de sus hijos,
 * y los hermanos por orden de inicio.
 */
export function flattenSpanTree(spans: Span[]): SpanNode[] {
  const childrenByParent = new Map<string | null, Span[]>()

  for (const span of spans) {
    const siblings = childrenByParent.get(span.parentId) ?? []
    siblings.push(span)
    childrenByParent.set(span.parentId, siblings)
  }

  for (const siblings of childrenByParent.values()) {
    siblings.sort((a, b) => a.startMs - b.startMs)
  }

  const result: SpanNode[] = []

  const visit = (parentId: string | null, depth: number) => {
    const children = childrenByParent.get(parentId) ?? []
    children.forEach((span, index) => {
      result.push({ span, depth, isLastChild: index === children.length - 1 })
      visit(span.id, depth + 1)
    })
  }

  visit(null, 0)
  return result
}
