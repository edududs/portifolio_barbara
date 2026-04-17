import arrowRight from '../../assets/arrow-right.svg'
import { ctaContent } from '../../data/siteContent'
import { Section } from '../layout/Section'

export function CtaSection() {
  return (
    <Section id="contato" className="bg-white py-24 text-center xl:py-28">
      <h2 className="font-heading text-4xl font-bold text-ink md:text-5xl">
        {ctaContent.title}
      </h2>
      <p className="mx-auto mt-4 max-w-[599px] font-body text-base leading-8 text-ink">
        {ctaContent.body}
      </p>
      <a
        href="mailto:barbara@example.com"
        className="mx-auto mt-14 inline-flex h-[60px] items-center gap-4 bg-black px-10 font-accent text-sm tracking-[0.025em] text-white"
      >
        <span>{ctaContent.action}</span>
        <img src={arrowRight} alt="" aria-hidden="true" className="h-4 w-4" />
      </a>
    </Section>
  )
}
