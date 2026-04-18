import { AboutApproachSection } from '../components/about/AboutApproachSection'
import { AboutEditorialSection } from '../components/about/AboutEditorialSection'
import { AboutHeroSection } from '../components/about/AboutHeroSection'
import { AboutPrinciplesSection } from '../components/about/AboutPrinciplesSection'
import { SiteFooter } from '../components/layout/SiteFooter'

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <main>
        <AboutEditorialSection />
        <AboutApproachSection />
        <AboutPrinciplesSection />
      </main>
      <SiteFooter />
    </>
  )
}
