import { motion } from 'motion/react'
import producaoVid from '../../assets/produção.mp4'
import storymakerVid from '../../assets/storymaker.mp4'
import redesSociaisVid from '../../assets/conteudo para redes.mp4'
import estrategiaImg from '../../assets/service-strategy.jpg'
import copywritingImg from '../../assets/service-copywriting.jpg'
import { servicesList } from '../../data/siteContent'
import { cardReveal, staggerContainer } from '../../lib/motion'

type MediaEntry =
  | { kind: 'image'; src: string }
  | { kind: 'video'; src: string }

const serviceMedia: Record<string, MediaEntry> = {
  producao:     { kind: 'video', src: producaoVid },
  estrategia:   { kind: 'image', src: estrategiaImg },
  storymaker:   { kind: 'video', src: storymakerVid },
  copywriting:  { kind: 'image', src: copywritingImg },
  redesSociais: { kind: 'video', src: redesSociaisVid }
}

function ServiceMediaPanel({ image, title }: { image: string; title: string }) {
  const media = serviceMedia[image]
  return (
    <div className="min-h-[480px] overflow-hidden rounded-sm bg-ink/10 xl:min-h-[560px]">
      {media.kind === 'video' ? (
        <video
          src={media.src}
          autoPlay
          muted
          loop
          playsInline
          className="h-full min-h-[480px] w-full object-cover xl:min-h-[560px]"
        />
      ) : (
        <img src={media.src} alt={title} className="h-full min-h-[480px] w-full object-cover xl:min-h-[560px]" />
      )}
    </div>
  )
}

export function ServicesListSection() {
  return (
    <section className="bg-white py-10 xl:py-0">
      <div className="mx-auto max-w-shell px-6 md:px-10 xl:px-16">
        {servicesList.map((service, i) => (
          <motion.div
            key={service.title}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className={`flex flex-col gap-12 py-16 xl:py-24 ${
              i < servicesList.length - 1 ? 'border-b border-black/10' : ''
            } xl:flex-row xl:items-center xl:gap-16 ${
              service.imageLeft ? '' : 'xl:flex-row-reverse'
            }`}
          >
            <motion.div variants={cardReveal} className="xl:w-[480px] xl:shrink-0">
              <ServiceMediaPanel image={service.image} title={service.title} />
            </motion.div>

            <motion.div variants={cardReveal} className="flex-1">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-lime">
                {service.tag}
              </p>

              <h2 className="mt-4 font-heading text-[36px] font-bold leading-tight tracking-display text-ink md:text-[44px] xl:text-[52px]">
                {service.title}
              </h2>

              <p className="mt-6 max-w-[567px] font-body text-base leading-8 text-ink/80">
                {service.body}
              </p>

              <ul className="mt-8 space-y-3">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 font-body text-sm text-ink/70">
                    <span className="mt-1 text-lime">✦</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
