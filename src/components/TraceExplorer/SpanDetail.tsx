import { useState } from 'react'
import { formatDuration } from '../../lib/format'
import type { Span } from '../../types/trace'
import { KIND_LABELS } from './spanMeta'
import { StatusBadge } from './StatusBadge'

type DetailTabId = 'input' | 'output' | 'attributes'

interface DetailTab {
  id: DetailTabId
  label: string
  value: unknown
}

/** Construye las pestañas disponibles según los datos que tenga el span. */
function getTabs(span: Span): DetailTab[] {
  const tabs: DetailTab[] = []
  if (span.input !== undefined) {
    tabs.push({ id: 'input', label: 'Lo que recibió', value: span.input })
  }
  if (span.output !== undefined) {
    tabs.push({ id: 'output', label: 'Lo que devolvió', value: span.output })
  }
  tabs.push({ id: 'attributes', label: 'Atributos', value: span.attributes })
  return tabs
}

/** Contenido del panel para un span concreto. */
function SpanDetailContent({ span }: { span: Span }) {
  const tabs = getTabs(span)
  const [activeTabId, setActiveTabId] = useState<DetailTabId>(tabs[0].id)
  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0]

  return (
    <article className="flex h-full flex-col rounded-2xl border-2 border-ink bg-white p-5 shadow-[4px_4px_0_0_var(--color-ink)]">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-ink/10 px-1.5 py-0.5 font-mono text-xs">
          {KIND_LABELS[span.kind]}
        </span>
        <StatusBadge status={span.status} />
      </div>

      <h3 className="mt-2 text-xl font-bold">{span.label}</h3>
      <p className="font-mono text-xs text-ink/70">{span.name}</p>
      <p className="mt-2 font-mono text-sm">
        Empieza en <strong>+{formatDuration(span.startMs)}</strong> · Duración{' '}
        <strong>{formatDuration(span.durationMs)}</strong>
      </p>

      <div
        role="tablist"
        aria-label="Datos del paso"
        className="mt-4 flex gap-1 border-b-2 border-ink/10"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab.id
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTabId(tab.id)}
              className={`-mb-0.5 border-b-2 px-3 py-1.5 text-sm font-bold transition-colors ${
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-ink/70 hover:text-ink'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/*
        flex-1 + basis-0: el recuadro ocupa el espacio que quede en el panel
        y, si el dato es más largo, se desplaza por dentro.
      */}
      <pre
        role="tabpanel"
        aria-label={activeTab.label}
        className="mt-3 max-h-80 min-h-40 flex-1 overflow-auto rounded-lg bg-ink p-3 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words text-background lg:max-h-none lg:basis-0"
      >
        {JSON.stringify(activeTab.value, null, 2)}
      </pre>
    </article>
  )
}

/** Panel de detalle: mensaje de ayuda si no hay ningún paso seleccionado. */
export function SpanDetail({ span }: { span: Span | null }) {
  if (!span) {
    return (
      <div className="flex h-full min-h-64 items-center justify-center rounded-2xl border-2 border-dashed border-ink/40 p-8 text-center">
        <p className="text-lg">Pulsa en un paso de la traza para ver qué pasó dentro.</p>
      </div>
    )
  }

  // key={span.id}: al cambiar de paso, el panel se reinicia en su primera pestaña.
  return <SpanDetailContent key={span.id} span={span} />
}
