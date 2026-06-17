function SectionHeading({ title, description, showDescription = false, level = 'h2' }) {
  const HeadingTag = level
  const isMainTitle = HeadingTag === 'h1'

  if (isMainTitle && !(showDescription && description)) {
    return null
  }

  return (
    <header className="section__heading">
      {!isMainTitle && <HeadingTag>{title}</HeadingTag>}
      {showDescription && description && <p>{description}</p>}
    </header>
  )
}

export default SectionHeading
