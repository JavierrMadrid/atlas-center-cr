import { Link } from 'react-router-dom'
import SectionHeading from '../ui/SectionHeading'

function TrainingSection({ programs }) {
  const normalizedPrograms = programs.flatMap((program) => {
    if (!/pilates\s*y\s*zenn/i.test(program.title ?? '')) {
      return [program]
    }

    return [
      {
        ...program,
        title: 'Pilates',
        description:
          'Trabajo de movilidad, control postural, respiración y fuerza del core en clases guiadas.',
        href: '/pilates-zenn',
      },
      {
        ...program,
        title: 'Zenn',
        description:
          'Sesión dinámica inspirada en yoga, pilates y taichi para mejorar equilibrio y coordinación.',
        href: '/pilates-zenn',
      },
    ]
  })

  return (
    <section id="entrenamientos" className="section training-section section--reveal section--charcoal">
      <SectionHeading
        title="Modalidades de entrenamiento"
        description=""
      />
      <div className="cards">
        {normalizedPrograms.map((program) => (
          <Link
            key={`${program.title}-${program.href ?? ''}`}
            className="card card--link"
            to={program.href ?? '/tarifas-horarios'}
          >
            <div className="card__visual">
              {program.imageSrc && (
                <img
                  className="card__media"
                  src={program.imageSrc}
                  alt={program.imageAlt ?? `Imagen de ${program.title}`}
                  loading="lazy"
                  decoding="async"
                  width="1600"
                  height="1067"
                  sizes="(max-width: 768px) 92vw, (max-width: 1200px) 46vw, 720px"
                />
              )}
              <div className="card__overlay-content">
                <h3>{program.title}</h3>
                <p>{program.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default TrainingSection
