import { motion } from 'motion/react'
import { contactInfo, contactWhyContent } from '../../data/siteContent'
import { cardReveal, sectionReveal, staggerContainer } from '../../lib/motion'

export function ContactWhySection() {
  return (
    <section className="bg-white py-20 xl:py-24">
      <div className="mx-auto max-w-shell px-6 md:px-10 xl:px-16">
        <motion.h2
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="font-heading text-[30px] font-bold text-ink md:text-[34px] xl:text-[38px]"
        >
          {contactWhyContent.title}
        </motion.h2>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 space-y-4"
        >
          {contactWhyContent.bullets.map((bullet) => (
            <motion.li
              key={bullet}
              variants={cardReveal}
              className="flex items-start gap-3 font-body text-[15px] leading-[1.45] text-ink"
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
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-14 max-w-[360px]"
        >
          <div>
            <h3 className="font-heading text-[32px] font-bold leading-none text-ink md:text-[38px] xl:text-[42px]">
              {contactWhyContent.socialTitle}
            </h3>

            <a
              href={contactInfo.instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 font-body text-[13px] text-ink underline underline-offset-4 transition hover:text-lime"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
              {contactInfo.instagramHandle}
            </a>

            <a
              href={contactInfo.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 flex items-center gap-2 font-body text-[13px] text-ink underline underline-offset-4 transition hover:text-lime"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20.52 3.48a12 12 0 0 0-17 0 12 12 0 0 0-1.78 14.38L0 24l6.3-1.7A12 12 0 0 0 24 12a11.92 11.92 0 0 0-3.48-8.52z" />
                <path d="M16.2 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.78.97-.96 1.17-.17.2-.35.22-.64.07-.3-.14-1.24-.46-2.37-1.47-.87-.78-1.47-1.74-1.64-2.04-.18-.3-.02-.47.13-.62.13-.13.29-.34.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.66-1.6-.91-2.2-.24-.58-.49-.5-.66-.5h-.57c-.2 0-.52.08-.79.38-.27.29-1.03 1.01-1.03 2.46 0 1.45 1.06 2.86 1.21 3.05.15.2 2.09 3.18 5.06 4.46.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.69.25-1.28.18-1.4-.08-.13-.27-.2-.57-.35Z" />
              </svg>
              {contactInfo.whatsappDisplay}
            </a>

            <a
              href={contactInfo.emailHref}
              className="mt-2.5 flex items-center gap-2 font-body text-[13px] text-ink underline underline-offset-4 transition hover:text-lime"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 7 10-7" />
              </svg>
              {contactInfo.email}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
