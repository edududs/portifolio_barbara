import { motion, useReducedMotion } from 'motion/react'
import { serviceCards } from '../../data/siteContent'
import { cardReveal, sectionReveal, staggerContainer, viewportAmount } from '../../lib/motion'
import { Section } from '../layout/Section'
import { ServiceCard } from '../ui/ServiceCard'

export function ServicesSection() {
  const shouldReduceMotion = !!useReducedMotion()
  const viewport = viewportAmount(shouldReduceMotion)

  return (
    <Section id="servicos" className="bg-white py-24 xl:py-28">
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
    </Section>
  )
}
