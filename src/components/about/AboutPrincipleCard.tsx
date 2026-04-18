type AboutPrincipleCardProps = {
  title: string
  body: string
}

export function AboutPrincipleCard({ title, body }: AboutPrincipleCardProps) {
  return (
    <article className="border border-black/10 px-8 py-8 text-left">
      <h3 className="font-heading text-[32px] font-bold leading-tight text-ink">
        {title}
      </h3>
      <p className="mt-6 max-w-[286px] font-body text-base leading-[1.625] text-ink">
        {body}
      </p>
    </article>
  )
}
