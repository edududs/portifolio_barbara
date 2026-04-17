import { navItems } from '../../data/siteContent'

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex h-20 w-full max-w-shell items-center justify-between px-6 md:px-10 xl:px-16">
        <a
          href="#topo"
          className="font-heading text-xl font-bold tracking-[-0.025em] text-[#FFF4F4]"
        >
          Barbara Fonseca
        </a>

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
    </header>
  )
}
