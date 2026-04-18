import { motion } from 'motion/react'
import { aboutApproachSections } from '../../data/siteContent'
import { baseEase, cardReveal, staggerContainer } from '../../lib/motion'

export function AboutApproachSection() {
  return (
    <section className="bg-white py-20 xl:py-24">
      <div className="mx-auto max-w-shell px-6 md:px-10 xl:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: baseEase }}
          className="font-heading text-[56px] font-bold leading-[0.95] tracking-display text-ink md:text-[72px] xl:text-[96px]"
        >
          Minha Abordagem
        </motion.h2>

        <motion.div
          className="mt-16 space-y-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {aboutApproachSections.map((section) => (
            <motion.div key={section.title} variants={cardReveal} className="max-w-[771px]">
              <h3 className="font-heading text-[32px] font-bold leading-tight text-ink md:text-[36px] xl:text-[40px]">
                {section.title}
              </h3>
              <p className="mt-5 max-w-[658px] font-body text-lg leading-8 text-ink">
                {section.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
