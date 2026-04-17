import { SiteFooter } from './components/layout/SiteFooter'
import { AboutSection } from './components/sections/AboutSection'
import { CtaSection } from './components/sections/CtaSection'
import { HeroSection } from './components/sections/HeroSection'
import { ServicesSection } from './components/sections/ServicesSection'
import { SpecialtiesSection } from './components/sections/SpecialtiesSection'

export default function App() {
  return (
    <>
      <HeroSection />
      <main>
        <ServicesSection />
        <AboutSection />
        <SpecialtiesSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  )
}
