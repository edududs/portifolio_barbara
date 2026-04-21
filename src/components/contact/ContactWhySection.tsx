import { motion } from 'motion/react'
import { contactInfo, contactWhyContent } from '../../data/siteContent'
import { baseEase, cardReveal, sectionReveal, staggerContainer } from '../../lib/motion'

export function ContactWhySection() {
  return (
    <section className="bg-white py-20 xl:py-24">
      <div className="mx-auto max-w-shell px-6 md:px-10 xl:px-16">
        <motion.h2
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="font-heading text-[32px] font-bold text-ink md:text-[40px] xl:text-[48px]"
        >
          {contactWhyContent.title}
        </motion.h2>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 space-y-5"
        >
          {contactWhyContent.bullets.map((bullet) => (
            <motion.li
              key={bullet}
              variants={cardReveal}
              className="flex items-start gap-4 font-body text-base leading-7 text-ink"
            >
              <span className="mt-1.5 size-3 shrink-0 rounded-full bg-lime" aria-hidden="true" />
              {bullet}
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease: baseEase }}
          className="mt-16 grid gap-16 xl:grid-cols-2"
        >
          {/* Solicite um Orçamento — WhatsApp */}
          <div>
            <h3 className="font-heading text-[28px] font-bold text-ink md:text-[32px] xl:text-[40px]">
              {contactWhyContent.ctaTitle}
            </h3>
            <a
              href={contactInfo.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-[60px] items-center gap-3 bg-ink px-8 font-body text-sm font-semibold tracking-[0.025em] text-white transition hover:bg-ink/90"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {contactWhyContent.ctaLabel}
            </a>

            <a
              href={contactInfo.emailHref}
              className="mt-4 flex items-center gap-2 font-body text-sm text-ink/60 transition hover:text-ink"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m2 7 10 7 10-7"/>
              </svg>
              {contactInfo.email}
            </a>
          </div>

          {/* Conecte-se — Instagram */}
          <div>
            <h3 className="font-heading text-[28px] font-bold text-ink md:text-[32px] xl:text-[40px]">
              {contactWhyContent.socialTitle}
            </h3>
            <a
              href={contactInfo.instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-3 font-body text-base font-medium text-ink underline underline-offset-4 transition hover:text-lime"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
              {contactInfo.instagramHandle}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
