import heroBackground from '../../assets/hero-bg.jpg'
import arrowDown from '../../assets/arrow-down.svg'
import { heroContent } from '../../data/siteContent'
import { SiteHeader } from '../layout/SiteHeader'
import { PrimaryButton } from '../ui/PrimaryButton'

export function HeroSection() {
  return (
    <section
      id="topo"
      className="relative min-h-[743px] bg-cover bg-center text-white shadow-hero"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <SiteHeader />

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative mx-auto flex min-h-[743px] max-w-shell flex-col items-center justify-center px-6 text-center md:px-10 xl:px-16">
        <h1 className="font-heading text-[56px] font-bold leading-none tracking-display text-white md:text-[72px] xl:text-[96px]">
          {heroContent.title}
        </h1>
        <p className="mt-6 font-heading text-[24px] font-normal text-white/90 md:text-[28px] xl:text-[36px]">
          {heroContent.subtitle}
        </p>
        <PrimaryButton className="mt-16 w-[225px]">{heroContent.cta}</PrimaryButton>
        <img
          src={arrowDown}
          alt=""
          aria-hidden="true"
          className="mt-40 h-8 w-8"
        />
      </div>
    </section>
  )
}
