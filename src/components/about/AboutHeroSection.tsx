import { motion } from 'motion/react'
import { aboutPageHeroContent } from '../../data/siteContent'
import { baseEase } from '../../lib/motion'
import { SiteHeader } from '../layout/SiteHeader'

export function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-6 text-ink">
      <SiteHeader tone="onLight" />

      <div className="mx-auto flex min-h-[703px] max-w-shell flex-col items-center justify-center px-6 pt-24 text-center md:px-10 xl:px-16">
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: baseEase }}
          className="max-w-[916px] font-heading text-[64px] font-bold leading-[0.95] tracking-display text-ink md:text-[88px] xl:text-[96px]"
        >
          {aboutPageHeroContent.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.12, ease: baseEase }}
          className="mt-8 max-w-[711px] font-heading text-[28px] font-normal leading-10 text-ink/90 md:text-[32px] xl:text-[36px]"
        >
          {aboutPageHeroContent.eyebrow}
        </motion.p>
      </div>
    </section>
  )
}
