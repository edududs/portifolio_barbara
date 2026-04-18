import { motion } from 'motion/react'
import editorialImage from '../../assets/about-page-editorial.jpg'
import { aboutPageEditorialContent } from '../../data/siteContent'
import { baseEase } from '../../lib/motion'

export function AboutEditorialSection() {
  return (
    <section className="bg-white py-16 xl:py-20">
      <div className="mx-auto grid max-w-shell gap-10 px-6 md:px-10 xl:grid-cols-[555px_523px] xl:items-start xl:gap-10 xl:px-16">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: baseEase }}
          className="space-y-10"
        >
          {aboutPageEditorialContent.map((paragraph) => (
            <p
              key={paragraph}
              className="max-w-[519px] font-body text-lg leading-8 text-ink"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, delay: 0.06, ease: baseEase }}
          className="overflow-hidden"
        >
          <img
            src={editorialImage}
            alt="Barbara Fonseca em retrato editorial"
            className="h-full min-h-[560px] w-full object-cover xl:h-[685px]"
          />
        </motion.div>
      </div>
    </section>
  )
}
