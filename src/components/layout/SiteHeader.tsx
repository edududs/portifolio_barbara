import { useState } from 'react'
import { navItems } from '../../data/siteContent'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex h-20 w-full max-w-shell items-center justify-between px-6 md:px-10 xl:px-16">
        <a
          href="#topo"
          className="font-heading text-xl font-bold tracking-[-0.025em] text-[#FFF4F4]"
        >
          Barbara Fonseca
        </a>

        <button
          type="button"
          className="font-body text-sm font-semibold uppercase tracking-[0.08em] text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          Menu
        </button>

        <nav aria-label="Primária" className="hidden gap-10 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-body text-sm font-medium tracking-[0.025em] text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {open ? (
        <nav
          id="mobile-navigation"
          aria-label="Primária mobile"
          className="mx-6 mt-3 rounded bg-black/80 p-4 backdrop-blur md:hidden"
        >
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-body text-sm font-medium tracking-[0.025em] text-white"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
