import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import portrait from '../../assets/about-portrait.jpg'
import { aboutContent } from '../../data/siteContent'
import { baseEase, viewportAmount } from '../../lib/motion'
import { Section } from '../layout/Section'

export function AboutSection() {
  const shouldReduceMotion = !!useReducedMotion()
  const { scrollYProgress } = useScroll()
  const imageY = useTransform(
    scrollYProgress,
    [0.15, 0.55],
    shouldReduceMotion ? [0, 0] : [0, -34]
  )
  const viewport = viewportAmount(shouldReduceMotion)

  return (
    <Section id="sobre" className="bg-white py-20 xl:py-28">
      <div className="grid items-center gap-10 xl:grid-cols-[1fr_555px] xl:gap-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -42, y: 12 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.84, ease: baseEase }}
        >
          <h2 className="max-w-[556px] font-heading text-4xl font-bold leading-tight text-ink md:text-5xl xl:text-[48px] xl:leading-[48px]">
            {aboutContent.title}
          </h2>

          <div className="mt-8 space-y-6">
            {aboutContent.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-[556px] font-body text-base leading-8 text-ink"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="overflow-hidden bg-paper"
          initial={shouldReduceMotion ? false : { opacity: 0, x: 42, y: 18, scale: 0.985 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, y: 0, scale: 1 }}
          viewport={viewport}
          transition={{ duration: 0.9, ease: baseEase, delay: 0.08 }}
          style={{ y: imageY }}
        >
          <img
            src={portrait}
            alt="Barbara Fonseca"
            className="h-full min-h-[420px] w-full object-cover"
          />
        </motion.div>
      </div>
    </Section>
  )
}
