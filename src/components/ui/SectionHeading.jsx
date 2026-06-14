function SectionHeading({ title, description, level = 'h2' }) {
  const HeadingTag = level

  return (
    <header className="section__heading">
      <HeadingTag>{title}</HeadingTag>
      {description && <p>{description}</p>}
    </header>
  )
}

export default SectionHeading
