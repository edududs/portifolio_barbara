import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router'
import { contactInfo, footerNavItems } from '../../data/siteContent'
import { baseEase, viewportAmount } from '../../lib/motion'

export function SiteFooter() {
  const shouldReduceMotion = !!useReducedMotion()
  const viewport = viewportAmount(shouldReduceMotion)

  return (
    <motion.footer
      className="bg-black pb-16 pt-20 text-white"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.58, ease: baseEase }}
    >
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
              {footerNavItems.map((item) => (
                <li key={item.href}>
                  <motion.div whileHover={shouldReduceMotion ? undefined : { x: 3 }} transition={{ duration: 0.22 }}>
                    <Link to={item.href} className="font-body text-sm text-footerMuted">
                      {item.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:justify-self-end md:text-right">
            <h3 className="font-body text-sm font-semibold tracking-[0.025em] text-white">
              Conecte-se
            </h3>
            <div className="mt-4 space-y-3">
              <motion.a
                href={contactInfo.instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-body text-sm text-footerMuted"
                whileHover={shouldReduceMotion ? undefined : { x: -3 }}
                transition={{ duration: 0.22 }}
              >
                Instagram ({contactInfo.instagramHandle})
              </motion.a>
              <motion.a
                href={contactInfo.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-body text-sm text-footerMuted"
                whileHover={shouldReduceMotion ? undefined : { x: -3 }}
                transition={{ duration: 0.22 }}
              >
                WhatsApp ({contactInfo.whatsappDisplay})
              </motion.a>
              <motion.a
                href={contactInfo.emailHref}
                className="block font-body text-sm text-footerMuted"
                whileHover={shouldReduceMotion ? undefined : { x: -3 }}
                transition={{ duration: 0.22 }}
              >
                {contactInfo.email}
              </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center font-body text-xs text-footerFine">
          © 2026 Barbara Fonseca. Todos os direitos reservados.
        </div>
      </div>
    </motion.footer>
  )
}
