import { ContactFaqSection } from '../components/contact/ContactFaqSection'
import { ContactHeroSection } from '../components/contact/ContactHeroSection'
import { ContactWhySection } from '../components/contact/ContactWhySection'
import { SiteFooter } from '../components/layout/SiteFooter'

export default function ContactPage() {
  return (
    <>
      <ContactHeroSection />
      <main>
        <ContactWhySection />
        <ContactFaqSection />
      </main>
      <SiteFooter />
    </>
  )
}
