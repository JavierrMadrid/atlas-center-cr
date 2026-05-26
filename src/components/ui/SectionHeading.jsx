function SectionHeading({ title, description }) {
  return (
    <header className="section__heading">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </header>
  )
}

export default SectionHeading
