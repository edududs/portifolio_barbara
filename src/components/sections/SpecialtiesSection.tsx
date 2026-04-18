import { motion, useReducedMotion } from 'motion/react'
import fashionImage from '../../assets/specialty-fashion.jpg'
import institutionalImage from '../../assets/specialty-institutional.jpg'
import { specialties } from '../../data/siteContent'
import { cardReveal, sectionReveal, staggerContainer, viewportAmount } from '../../lib/motion'
import { Section } from '../layout/Section'
import { SpecialtyCard } from '../ui/SpecialtyCard'

const specialtyImages = {
  fashion: fashionImage,
  institutional: institutionalImage
} as const

export function SpecialtiesSection() {
  const shouldReduceMotion = !!useReducedMotion()
  const viewport = viewportAmount(shouldReduceMotion)

  return (
    <Section id="cases" className="bg-white py-24 xl:py-28">
      <motion.h2
        variants={sectionReveal}
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView={shouldReduceMotion ? undefined : 'visible'}
        viewport={viewport}
        className="text-center font-heading text-4xl font-bold text-ink md:text-5xl"
      >
        Especialização
      </motion.h2>

      <motion.div
        className="mt-16 grid gap-12 md:grid-cols-2 md:justify-items-center"
        variants={staggerContainer}
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView={shouldReduceMotion ? undefined : 'visible'}
        viewport={viewport}
      >
        {specialties.map((specialty) => (
          <motion.div key={specialty.title} variants={shouldReduceMotion ? undefined : cardReveal}>
            <SpecialtyCard
              title={specialty.title}
              body={specialty.body}
              imageSrc={specialtyImages[specialty.image]}
            />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
