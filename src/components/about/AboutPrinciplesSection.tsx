import { motion } from 'motion/react'
import { aboutPrinciples, aboutPrinciplesSection } from '../../data/siteContent'
import { cardReveal, sectionReveal, staggerContainer } from '../../lib/motion'
import { AboutPrincipleCard } from './AboutPrincipleCard'

export function AboutPrinciplesSection() {
  return (
    <section className="bg-lime py-20 text-white xl:py-24">
      <div className="mx-auto max-w-shell px-6 md:px-10 xl:px-16">
        <motion.h2
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center font-heading text-4xl font-bold md:text-5xl"
        >
          {aboutPrinciplesSection.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mx-auto mt-6 max-w-xl text-center font-body text-base leading-8 text-white/95"
        >
          {aboutPrinciplesSection.intro}
        </motion.p>

        <motion.div
          className="mt-16 grid gap-10 xl:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {aboutPrinciples.map((principle) => (
            <motion.div key={principle.title} variants={cardReveal}>
              <AboutPrincipleCard
                title={principle.title}
                body={principle.body}
                surface="lime"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
