import { motion, useReducedMotion } from 'motion/react'
import arrowRight from '../../assets/arrow-right.svg'
import { ctaContent } from '../../data/siteContent'
import { baseEase, viewportAmount } from '../../lib/motion'
import { Section } from '../layout/Section'

export function CtaSection() {
  const shouldReduceMotion = useReducedMotion()
  const viewport = viewportAmount(shouldReduceMotion)

  return (
    <Section id="contato" className="bg-white py-24 text-center xl:py-28">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.7, ease: baseEase }}
      >
        <h2 className="font-heading text-4xl font-bold text-ink md:text-5xl">
          {ctaContent.title}
        </h2>
        <p className="mx-auto mt-4 max-w-[599px] font-body text-base leading-8 text-ink">
          {ctaContent.body}
        </p>
        <motion.a
          href="mailto:barbara@example.com"
          className="mx-auto mt-14 inline-flex h-[60px] items-center gap-4 bg-black px-10 font-accent text-sm tracking-[0.025em] text-white"
          whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
          transition={{ duration: 0.25, ease: baseEase }}
        >
          <span>{ctaContent.action}</span>
          <img src={arrowRight} alt="" aria-hidden="true" className="h-4 w-4" />
        </motion.a>
      </motion.div>
    </Section>
  )
}
