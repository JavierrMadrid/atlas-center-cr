function SectionHeading({ title, description, showDescription = false, level = 'h2' }) {
  const HeadingTag = level

  return (
    <header className="section__heading">
      <HeadingTag>{title}</HeadingTag>
      {showDescription && description && <p>{description}</p>}
    </header>
  )
}

export default SectionHeading
