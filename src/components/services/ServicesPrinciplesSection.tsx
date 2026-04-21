import { motion } from 'motion/react'
import { servicesPrinciples } from '../../data/siteContent'
import { baseEase, cardReveal, staggerContainer } from '../../lib/motion'

export function ServicesPrinciplesSection() {
  return (
    <section className="bg-lime py-20 xl:py-24">
      <div className="mx-auto max-w-shell px-6 md:px-10 xl:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: baseEase }}
          className="text-center font-heading text-[48px] font-bold leading-[0.95] tracking-display text-white md:text-[64px] xl:text-[80px]"
        >
          {servicesPrinciples.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease: baseEase }}
          className="mx-auto mt-6 max-w-xl text-center font-body text-base leading-7 text-white/80"
        >
          {servicesPrinciples.subtitle}
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid gap-10 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8"
        >
          {servicesPrinciples.steps.map((step) => (
            <motion.div key={step.number} variants={cardReveal} className="text-center xl:text-left">
              <p className="font-heading text-[72px] font-bold leading-none text-white/20 xl:text-[96px]">
                {step.number}
              </p>
              <h3 className="mt-2 font-heading text-xl font-bold text-white xl:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-6 text-white/75">
                {step.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
