function SectionHeading({ eyebrow, title, description, level = 'h2' }) {
  const Heading = level

  return (
    <header className="section-head">
      {eyebrow ? <p className="section-head__eyebrow">{eyebrow}</p> : null}
      <Heading>{title}</Heading>
      {description ? <p className="section-head__text">{description}</p> : null}
    </header>
  )
}

export default SectionHeading