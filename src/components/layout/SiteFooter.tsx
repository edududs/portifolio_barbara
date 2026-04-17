import { navItems } from '../../data/siteContent'

export function SiteFooter() {
  return (
    <footer className="bg-black pb-16 pt-20 text-white">
      <div className="mx-auto max-w-content px-6 md:px-10 xl:px-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="max-w-[360px]">
            <h2 className="font-heading text-2xl font-bold">Curadora Estratégica</h2>
            <p className="mt-4 font-body text-sm leading-[1.625] text-footerBody">
              Transformo marcas em experiências visuais memoráveis através de estratégia, estética e execução impecável.
            </p>
          </div>

          <div className="md:justify-self-center">
            <h3 className="font-body text-sm font-semibold tracking-[0.025em] text-white">
              Navegação
            </h3>
            <ul className="mt-4 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="font-body text-sm text-footerMuted">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:justify-self-end md:text-right">
            <h3 className="font-body text-sm font-semibold tracking-[0.025em] text-white">
              Social
            </h3>
            <a href="#contato" className="mt-4 inline-block font-body text-sm text-footerMuted">
              Instagram
            </a>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center font-body text-xs text-footerFine">
          © 2026 Barbara Fonseca. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
