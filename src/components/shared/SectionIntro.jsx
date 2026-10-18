export function SectionIntro({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
        {eyebrow}
      </span>
      <h2 className="section-title mt-5">{title}</h2>
      <p className="mt-4 text-base leading-8 text-skin-soft sm:text-lg">{description}</p>
    </div>
  )
}
