import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { contactFaq } from '../../data/siteContent'
import { baseEase, sectionReveal } from '../../lib/motion'

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-black/15">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-6 py-8 text-left"
      >
        <span className="font-heading text-[18px] font-bold text-ink md:text-[20px] xl:text-[22px]">
          {question}
        </span>
        <span
          className={`mt-1 shrink-0 text-ink transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
          aria-hidden="true"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key={`faq-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: baseEase }}
            className="overflow-hidden"
          >
            <p className="pb-8 font-body text-base leading-8 text-ink/75">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function ContactFaqSection() {
  return (
    <section className="bg-white py-20 xl:py-24">
      <div className="mx-auto max-w-shell px-6 md:px-10 xl:px-16">
        <motion.h2
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center font-heading text-[40px] font-bold leading-tight tracking-display text-ink md:text-[56px] xl:text-[72px]"
        >
          Perguntas{' '}
          <br className="hidden xl:block" />
          Frequentes
        </motion.h2>

        <div className="mx-auto mt-16 max-w-[1078px]">
          {contactFaq.items.map((item, i) => (
            <FaqItem key={item.question} question={item.question} answer={item.answer} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
