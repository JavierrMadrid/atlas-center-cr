import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

const items = [
  {
    icon: 'group',
    title: 'Grupos de 5',
    text: 'Máximo cinco personas por clase guiada para seguir tu técnica de cerca.',
  },
  {
    icon: 'sparkle',
    title: 'Seguimiento real',
    text: 'Técnicos y fisioterapeutas diseñan tu progresión según tu nivel y tu objetivo.',
  },
  {
    icon: 'barbell',
    title: 'Todo en un centro',
    text: 'Funcional, híbrido, sala open, pilates, Zenn y fisioterapia en un mismo espacio.',
  },
]

function ValueStrip() {
  return (
    <section className="section value-strip" aria-label="Por qué entrenar en Atlas Center">
      <div className="container">
        <div className="value-strip__grid">
          <Reveal className="value-strip__intro">
            <SectionHeading
              title="Por qué Atlas"
              description="Entrenar bien no es entrenar más. Es hacerlo de la forma correcta, sin dolor y con un plan que se adapta a ti."
            />
          </Reveal>

          {items.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 80}
              className="value-strip__item"
            >
              <span className="value-strip__icon" aria-hidden="true">
                <Icon name={item.icon} size={22} />
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ValueStrip