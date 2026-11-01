interface RealWorldLink {
  label: string
  href: string
}

interface RealWorldProps {
  /** Cómo se hace esto en las empresas. */
  text: string
  /** Enlaces a documentación oficial. */
  links?: RealWorldLink[]
}

/** Bloque "En el mundo real": cómo se aplica el concepto en la industria. */
export function RealWorld({ text, links = [] }: RealWorldProps) {
  return (
    <aside className="mt-8 rounded-2xl border-2 border-dashed border-primary bg-primary/5 p-5">
      <p className="font-mono text-xs uppercase tracking-widest text-primary">En el mundo real</p>
      <p className="mt-2">{text}</p>
      {links.length > 0 && (
        <p className="mt-3 text-sm">
          <span className="font-semibold">Documentación oficial: </span>
          {links.map((link, index) => (
            <span key={link.href}>
              {index > 0 && ' · '}
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary underline underline-offset-4"
              >
                {link.label}
              </a>
            </span>
          ))}
        </p>
      )}
    </aside>
  )
}
