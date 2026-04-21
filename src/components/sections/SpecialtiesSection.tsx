import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router'
import fashionImage from '../../assets/specialty-fashion.jpg'
import institutionalImage from '../../assets/specialty-institutional.jpg'
import { specialties, specialtiesSubtitle } from '../../data/siteContent'
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
    <Section id="especializacao" className="bg-white py-24 xl:py-28">
      <motion.h2
        variants={sectionReveal}
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView={shouldReduceMotion ? undefined : 'visible'}
        viewport={viewport}
        className="text-center font-heading text-4xl font-bold text-ink md:text-5xl"
      >
        Especialização
      </motion.h2>

      <motion.p
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.6, delay: 0.08 }}
        className="mx-auto mt-4 max-w-[560px] text-center font-body text-base leading-7 text-ink/70"
      >
        {specialtiesSubtitle}
      </motion.p>

      <motion.div
        className="mt-14 grid gap-12 md:grid-cols-2 md:justify-items-center"
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

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="mt-14 flex justify-center"
      >
        <Link
          to="/servicos"
          className="inline-flex h-12 items-center justify-center border border-ink bg-white px-8 font-body text-sm font-semibold tracking-[0.025em] text-ink transition hover:bg-ink hover:text-white"
        >
          Ver serviços completos
        </Link>
      </motion.div>
    </Section>
  )
}
