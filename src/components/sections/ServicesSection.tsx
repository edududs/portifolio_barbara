import { serviceCards } from '../../data/siteContent'
import { Section } from '../layout/Section'
import { ServiceCard } from '../ui/ServiceCard'

export function ServicesSection() {
  return (
    <Section id="servicos" className="bg-white py-24 xl:py-28">
      <h2 className="text-center font-heading text-4xl font-bold text-ink md:text-5xl">
        Como ajudo sua marca
      </h2>

      <div className="mt-14 grid gap-8 xl:grid-cols-3 xl:gap-8">
        {serviceCards.map((card) => (
          <ServiceCard key={card.title} title={card.title} body={card.body} />
        ))}
      </div>
    </Section>
  )
}
