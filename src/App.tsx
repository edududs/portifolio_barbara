import { AboutSection } from './components/sections/AboutSection'
import { HeroSection } from './components/sections/HeroSection'
import { ServicesSection } from './components/sections/ServicesSection'

export default function App() {
  return (
    <>
      <HeroSection />
      <main>
        <ServicesSection />
        <AboutSection />
      </main>
    </>
  )
}
