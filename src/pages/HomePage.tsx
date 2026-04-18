import { Link } from 'react-router'
import { SiteFooter } from '../components/layout/SiteFooter'
import { CtaSection } from '../components/sections/CtaSection'
import { HeroSection } from '../components/sections/HeroSection'
import { ServicesSection } from '../components/sections/ServicesSection'
import { SpecialtiesSection } from '../components/sections/SpecialtiesSection'

export default function HomePage() {
  return (
    <>
      <div className="sr-only">
        <nav aria-label="Primária">
          <Link to="/sobre">Sobre</Link>
        </nav>
      </div>
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
