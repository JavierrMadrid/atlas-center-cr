import { Link } from 'react-router-dom'
import GlowMedia from '../ui/GlowMedia'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

function TrainingSection({ programs }) {
  const items = programs

  return (
    <section id="entrenamientos" className="section">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Modalidades"
            title="Elige cómo entrenar"
            description="Entrenamiento guiado, sala open y pilates. Tres vías, un mismo criterio técnico y seguimiento adaptado a tu nivel."
          />
        </Reveal>

        <div className="modalities__grid">
          {items.map((program, index) => {
            const sizeClass =
              index === items.length - 1 ? 'modalities__card--wide' : 'modalities__card--feature'

            return (
              <Reveal
                key={`${program.title}-${program.href ?? index}`}
                as="article"
                delay={index * 70}
                className={`modalities__card ${sizeClass}`.trim()}
              >
                <Link className="modalities__card-link-wrap" to={program.href ?? '/tarifas-horarios'}>
                  {program.imageSrc && (
                    <GlowMedia className="modalities__glow" variant="fill">
                      <img
                        src={program.imageSrc}
                        alt={program.imageAlt ?? `Imagen de ${program.title}`}
                        loading="lazy"
                        decoding="async"
                        width="1600"
                        height="1067"
                        style={program.imagePosition ? { objectPosition: program.imagePosition } : undefined}
                      />
                    </GlowMedia>
                  )}
                  <div className="modalities__card-body">
                    <h3 className="modalities__card-title">{program.title}</h3>
                    <p className="modalities__card-text">{program.description}</p>
                    <span className="modalities__card-link">
                      Ver modalidad
                      <Icon name="arrowRight" size={15} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TrainingSection