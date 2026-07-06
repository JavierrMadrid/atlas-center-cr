function SectionHeading({ title, description, showDescription = false, level = 'h2' }) {
  const renderHeading = () => {
    switch (level) {
      case 'h1':
        return <h1>{title}</h1>
      case 'h3':
        return <h3>{title}</h3>
      case 'h4':
        return <h4>{title}</h4>
      case 'h5':
        return <h5>{title}</h5>
      case 'h6':
        return <h6>{title}</h6>
      case 'h2':
      default:
        return <h2>{title}</h2>
    }
  }

  return (
    <header className="section__heading">
      {renderHeading()}
      {showDescription && description && <p>{description}</p>}
    </header>
  )
}

export default SectionHeading
