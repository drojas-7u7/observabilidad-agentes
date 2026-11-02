import { ChatMessage } from '../../components/ChatMessage/ChatMessage'
import { charoIntro } from '../../content/tools'
import { charoTrace } from '../../data/traces/charo'

/** Presentación de Charo: quién es, su conversación y por qué la usamos. */
export function CharoIntro() {
  return (
    <article className="rounded-2xl border-2 border-ink bg-white p-5 shadow-[4px_4px_0_0_var(--color-ink)]">
      <p className="font-heading text-2xl font-bold">{charoIntro.title}</p>
      <p className="mt-2">{charoIntro.text}</p>

      <div className="mt-4 space-y-4 rounded-xl bg-background p-4">
        <ChatMessage author={charoTrace.client} text={charoTrace.request} side="right" />
        <ChatMessage author={charoIntro.agentName} text={charoTrace.finalAnswer} side="left" />
      </div>

      <div className="mt-4 rounded-xl border-2 border-primary bg-primary/10 p-4">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">
          {charoIntro.whyTitle}
        </p>
        <p className="mt-1 font-semibold">{charoIntro.why}</p>
      </div>
    </article>
  )
}
