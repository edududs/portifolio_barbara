import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import heroVideo from '../../assets/Instituicional.mp4'
import heroBackground from '../../assets/hero-bg.jpg'
import arrowDown from '../../assets/arrow-down.svg'
import { heroContent } from '../../data/siteContent'
import { baseEase } from '../../lib/motion'
import { SiteHeader } from '../layout/SiteHeader'
import { PrimaryButton } from '../ui/PrimaryButton'

export function HeroSection() {
  const shouldReduceMotion = !!useReducedMotion()
  const { scrollYProgress } = useScroll()

  const heroY = useTransform(
    scrollYProgress,
    [0, 0.35],
    shouldReduceMotion ? [0, 0] : [0, 62]
  )

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 0.35],
    shouldReduceMotion ? [0, 0] : [0, 38]
  )

  return (
    <section id="topo" className="relative overflow-hidden text-white">
      <motion.div
        className="absolute inset-0 min-h-[743px] overflow-hidden"
        style={{ y: backgroundY, scale: shouldReduceMotion ? 1 : 1.03 }}
      >
        {shouldReduceMotion ? (
          <div
            className="absolute inset-0 bg-cover bg-center shadow-hero"
            style={{ backgroundImage: `url(${heroBackground})` }}
          />
        ) : (
          <video
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            poster={heroBackground}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-black/40" />

      <SiteHeader />

      <motion.div
        className="relative mx-auto flex min-h-[743px] max-w-shell flex-col items-center justify-center px-6 text-center md:px-10 xl:px-16"
        style={{ y: heroY }}
      >
        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 46, scale: 0.985 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.95, ease: baseEase }}
          className="font-heading text-[56px] font-bold leading-none tracking-display text-white md:text-[72px] xl:text-[96px]"
        >
          {heroContent.title}
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.82, delay: 0.14, ease: baseEase }}
          className="mt-6 font-heading text-[24px] font-normal text-white/90 md:text-[28px] xl:text-[36px]"
        >
          {heroContent.subtitle}
        </motion.p>

        <motion.a
          href="#cases"
          className="mt-16 inline-flex"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.78, delay: 0.28, ease: baseEase }}
          whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.015 }}
        >
          <PrimaryButton className="whitespace-nowrap">{heroContent.cta}</PrimaryButton>
        </motion.a>

        <motion.img
          src={arrowDown}
          alt=""
          aria-hidden="true"
          className="mt-24 h-8 w-8 md:mt-32 xl:mt-40"
          animate={shouldReduceMotion ? undefined : { y: [0, 12, 0], opacity: [0.7, 1, 0.7] }}
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
          }
        />
      </motion.div>
    </section>
  )
}
