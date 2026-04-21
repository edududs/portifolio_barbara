import { motion } from 'motion/react'
import { contactPageHero } from '../../data/siteContent'
import { baseEase } from '../../lib/motion'
import { SiteHeader } from '../layout/SiteHeader'

export function ContactHeroSection() {
  return (
    <section className="relative bg-lime pt-6 text-white">
      <SiteHeader tone="onDark" />

      <div className="mx-auto flex min-h-[564px] max-w-shell flex-col items-center justify-center px-6 pt-24 text-center md:px-10 xl:px-16">
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: baseEase }}
          className="font-heading text-[56px] font-bold leading-none tracking-display text-white md:text-[72px] xl:text-[96px]"
        >
          {contactPageHero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.12, ease: baseEase }}
          className="mt-8 max-w-[760px] font-body text-lg leading-8 text-white/90 md:text-xl"
        >
          {contactPageHero.subtitle}
        </motion.p>
      </div>
    </section>
  )
}
