import { motion, useReducedMotion } from 'motion/react'

type SpecialtyCardProps = {
  title: string
  body: string
  imageSrc: string
}

export function SpecialtyCard({ title, body, imageSrc }: SpecialtyCardProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <article className="max-w-[285px]">
      <div className="h-[380px] overflow-hidden bg-paper">
        <motion.img
          src={imageSrc}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
          whileHover={shouldReduceMotion ? undefined : { scale: 1.035 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <h3 className="mt-4 font-heading text-[32px] font-bold leading-none text-ink">
        {title}
      </h3>
      <p className="mt-4 font-body text-base leading-[1.625] text-ink">{body}</p>
    </article>
  )
}
