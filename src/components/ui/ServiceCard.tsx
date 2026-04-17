type ServiceCardProps = {
  title: string
  body: string
}

export function ServiceCard({ title, body }: ServiceCardProps) {
  return (
    <article className="min-h-[292px] border border-black/10 bg-lime px-10 py-10 text-white">
      <h3 className="font-heading text-2xl font-bold leading-8">{title}</h3>
      <p className="mt-10 max-w-[288px] font-body text-base leading-[1.625] text-white">
        {body}
      </p>
    </article>
  )
}
