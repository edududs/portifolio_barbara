import { SiteFooter } from '../components/layout/SiteFooter'
import { CtaSection } from '../components/sections/CtaSection'
import { HeroSection } from '../components/sections/HeroSection'
import { ServicesSection } from '../components/sections/ServicesSection'
import { SpecialtiesSection } from '../components/sections/SpecialtiesSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <main>
        <ServicesSection />
        <SpecialtiesSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  )
}
