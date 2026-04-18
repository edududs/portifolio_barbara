import { motion } from 'motion/react'
import { aboutPrinciples } from '../../data/siteContent'
import { cardReveal, sectionReveal, staggerContainer } from '../../lib/motion'
import { AboutPrincipleCard } from './AboutPrincipleCard'

export function AboutPrinciplesSection() {
  return (
    <section className="bg-white py-20 xl:py-24">
      <div className="mx-auto max-w-shell px-6 md:px-10 xl:px-16">
        <motion.h2
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center font-heading text-4xl font-bold text-ink md:text-5xl"
        >
          Meus Princípios
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mx-auto mt-6 max-w-[435px] text-center font-body text-base leading-8 text-ink"
        >
          Vamos conversar sobre como transformar sua visão em posicionamento, conteúdo e presença visual memorável.
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
              <AboutPrincipleCard title={principle.title} body={principle.body} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
