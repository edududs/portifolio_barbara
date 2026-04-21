import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router'
import { serviceCards } from '../../data/siteContent'
import { cardReveal, sectionReveal, staggerContainer, viewportAmount } from '../../lib/motion'
import { Section } from '../layout/Section'
import { ServiceCard } from '../ui/ServiceCard'

export function ServicesSection() {
  const shouldReduceMotion = !!useReducedMotion()
  const viewport = viewportAmount(shouldReduceMotion)

  return (
    <Section id="servicos" className="bg-white pt-24 pb-8 xl:pt-28 xl:pb-10">
      <motion.h2
        variants={sectionReveal}
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView={shouldReduceMotion ? undefined : 'visible'}
        viewport={viewport}
        className="text-center font-heading text-4xl font-bold text-ink md:text-5xl"
      >
        Como ajudo sua marca
      </motion.h2>

      <motion.div
        className="mt-14 grid gap-8 xl:grid-cols-3 xl:gap-8"
        variants={staggerContainer}
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView={shouldReduceMotion ? undefined : 'visible'}
        viewport={viewport}
      >
        {serviceCards.map((card) => (
          <motion.div key={card.title} variants={shouldReduceMotion ? undefined : cardReveal}>
            <ServiceCard title={card.title} body={card.body} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="mt-20 flex justify-center xl:mt-24"
      >
        <Link
          to="/sobre"
          className="inline-flex h-12 items-center justify-center bg-lime px-8 font-body text-sm font-semibold tracking-[0.025em] text-softWhite transition hover:brightness-95"
        >
          Conheça minha trajetória
        </Link>
      </motion.div>
    </Section>
  )
}
