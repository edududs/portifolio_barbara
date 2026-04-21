import { motion } from 'motion/react'
import { servicesPageHero } from '../../data/siteContent'
import { baseEase } from '../../lib/motion'
import { SiteHeader } from '../layout/SiteHeader'

export function ServicesHeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-6 text-ink">
      <SiteHeader tone="onLight" />

      <div className="mx-auto flex min-h-[661px] max-w-shell flex-col items-center justify-center px-6 pt-24 text-center md:px-10 xl:px-16">
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: baseEase }}
          className="font-heading text-[64px] font-bold leading-none tracking-display text-ink md:text-[88px] xl:text-[96px]"
        >
          {servicesPageHero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.12, ease: baseEase }}
          className="mt-8 max-w-[773px] font-heading text-[22px] font-normal leading-9 text-ink/80 md:text-[26px] xl:text-[28px]"
        >
          {servicesPageHero.subtitle}
        </motion.p>
      </div>
    </section>
  )
}
