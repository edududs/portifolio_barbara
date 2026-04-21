type AboutPrincipleCardProps = {
  readonly title: string
  readonly body: string
  readonly surface?: 'neutral' | 'lime'
}

export function AboutPrincipleCard({
  title,
  body,
  surface = 'neutral'
}: AboutPrincipleCardProps) {
  const onLime = surface === 'lime'

  return (
    <article
      className={
        onLime
          ? 'px-2 py-8 text-left md:px-4'
          : 'border border-black/10 px-8 py-8 text-left'
      }
    >
      <h3
        className={
          onLime
            ? 'font-heading text-[32px] font-bold leading-tight text-white'
            : 'font-heading text-[32px] font-bold leading-tight text-ink'
        }
      >
        {title}
      </h3>
      <p
        className={
          onLime
            ? 'mt-6 font-body text-base leading-[1.625] text-white/90'
            : 'mt-6 max-w-[286px] font-body text-base leading-[1.625] text-ink'
        }
      >
        {body}
      </p>
    </article>
  )
}
