import { ReactNode } from 'react'

type SectionProps = {
  id?: string
  className?: string
  children: ReactNode
}

export function Section({ id, className = '', children }: SectionProps) {
  return (
    <section id={id} className={className}>
      <div className="mx-auto w-full max-w-content px-6 md:px-10 xl:px-16">
        {children}
      </div>
    </section>
  )
}
