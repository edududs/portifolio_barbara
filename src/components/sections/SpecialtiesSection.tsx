import fashionImage from '../../assets/specialty-fashion.jpg'
import institutionalImage from '../../assets/specialty-institutional.jpg'
import { specialties } from '../../data/siteContent'
import { Section } from '../layout/Section'
import { SpecialtyCard } from '../ui/SpecialtyCard'

const specialtyImages = {
  fashion: fashionImage,
  institutional: institutionalImage
} as const

export function SpecialtiesSection() {
  return (
    <Section id="cases" className="bg-white py-24 xl:py-28">
      <h2 className="text-center font-heading text-4xl font-bold text-ink md:text-5xl">
        Especialização
      </h2>

      <div className="mt-16 grid gap-12 md:grid-cols-2 md:justify-items-center">
        {specialties.map((specialty) => (
          <SpecialtyCard
            key={specialty.title}
            title={specialty.title}
            body={specialty.body}
            imageSrc={specialtyImages[specialty.image]}
          />
        ))}
      </div>
    </Section>
  )
}
