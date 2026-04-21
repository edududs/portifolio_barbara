import { useState } from 'react'
import { Link } from 'react-router'
import { navItems } from '../../data/siteContent'

export type SiteHeaderTone = 'onDark' | 'onLight'

type SiteHeaderProps = {
  readonly tone?: SiteHeaderTone
}

export function SiteHeader({ tone = 'onDark' }: SiteHeaderProps) {
  const [open, setOpen] = useState(false)
  const onLight = tone === 'onLight'

  const brandClass = onLight
    ? 'font-heading text-xl font-bold tracking-[-0.025em] text-ink'
    : 'font-heading text-xl font-bold tracking-[-0.025em] text-[#FFF4F4]'

  const navLinkClass = onLight
    ? 'font-body text-sm font-medium tracking-[0.025em] text-ink'
    : 'font-body text-sm font-medium tracking-[0.025em] text-white'

  const menuButtonClass = onLight
    ? 'font-body text-sm font-semibold uppercase tracking-[0.08em] text-ink md:hidden'
    : 'font-body text-sm font-semibold uppercase tracking-[0.08em] text-white md:hidden'

  const mobilePanelClass = onLight
    ? 'mx-6 mt-3 rounded border border-black/10 bg-white/95 p-4 shadow-lg backdrop-blur md:hidden'
    : 'mx-6 mt-3 rounded bg-black/80 p-4 backdrop-blur md:hidden'

  const mobileLinkClass = onLight
    ? 'font-body text-sm font-medium tracking-[0.025em] text-ink'
    : 'font-body text-sm font-medium tracking-[0.025em] text-white'

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex h-20 w-full max-w-shell items-center justify-between px-6 md:px-10 xl:px-16">
        <Link to="/" className={brandClass}>
          Barbara Fonseca
        </Link>

        <button
          type="button"
          className={menuButtonClass}
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          Menu
        </button>

        <nav aria-label="Primária" className="hidden gap-10 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} to={item.href} className={navLinkClass}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {open ? (
        <nav
          id="mobile-navigation"
          aria-label="Primária mobile"
          className={mobilePanelClass}
        >
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={mobileLinkClass}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
