import { presenter } from '../../content/cover'
import { siteInfo } from '../../content/site'
import { BITA_POSES } from '../Bita/bitaPoses'

/** Enlace a la licencia, reutilizado en las dos versiones del pie. */
function LicenseLink() {
  return (
    <a
      href={siteInfo.license.href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-4 hover:text-accent"
    >
      {siteInfo.license.text}
    </a>
  )
}

/** Enlaces del autor (GitHub, LinkedIn). */
function AuthorLinks({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex gap-4 ${className}`}>
      {presenter.links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline underline-offset-4 hover:text-accent"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

interface SiteFooterProps {
  /** "full" en la portada; "compact" (una línea) en el resto de páginas. */
  variant: 'full' | 'compact'
}

/** Pie de página común a todas las secciones. */
export function SiteFooter({ variant }: SiteFooterProps) {
  if (variant === 'compact') {
    return (
      <footer className="border-t-2 border-ink bg-ink text-background">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-3 text-xs">
          <p>
            {siteInfo.copyright} <LicenseLink /> {siteInfo.reservedRights}
          </p>
          <AuthorLinks />
        </div>
      </footer>
    )
  }

  return (
    <footer className="border-t-2 border-ink bg-ink text-background">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-3">
        <div className="flex items-start gap-3">
          <img
            src={BITA_POSES.presenting.src}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-16 w-auto shrink-0"
          />
          <div>
            <p className="font-heading text-lg font-bold">{siteInfo.brand}</p>
            <p className="text-sm text-background/80">{siteInfo.tagline}</p>
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            {siteInfo.authorTitle}
          </p>
          <p className="mt-1 font-heading text-lg font-bold">{presenter.name}</p>
          <p className="text-sm text-background/80">{presenter.profileDate}</p>
          <AuthorLinks className="mt-2 text-sm" />
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            {siteInfo.aboutTitle}
          </p>
          <p className="mt-1 text-sm">{siteInfo.session}</p>
          <p className="mt-2 text-sm text-background/80">{siteInfo.disclaimer}</p>
        </div>
      </div>

      <div className="border-t border-background/20">
        <p className="mx-auto max-w-6xl px-6 py-4 text-xs text-background/70">
          {siteInfo.copyright} <LicenseLink /> {siteInfo.reservedRights}{' '}
          {siteInfo.characterNotice}
        </p>
      </div>
    </footer>
  )
}
