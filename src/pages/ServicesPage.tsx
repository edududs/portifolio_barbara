import { SiteFooter } from '../components/layout/SiteFooter'
import { ServicesHeroSection } from '../components/services/ServicesHeroSection'
import { ServicesListSection } from '../components/services/ServicesListSection'
import { ServicesPrinciplesSection } from '../components/services/ServicesPrinciplesSection'

export default function ServicesPage() {
  return (
    <>
      <ServicesHeroSection />
      <main>
        <ServicesListSection />
        <ServicesPrinciplesSection />
      </main>
      <SiteFooter />
    </>
  )
}
