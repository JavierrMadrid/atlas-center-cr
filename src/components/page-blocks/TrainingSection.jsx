import { Link } from 'react-router-dom'
import SectionHeading from '../ui/SectionHeading'

function TrainingSection({ programs }) {
  return (
    <section id="entrenamientos" className="section training-section section--reveal">
      <SectionHeading
        title="Modalidades de entrenamiento"
        description="Elige entre bonos de clase (entrenamiento guiado, yoga o pilates) y bonos open para sala libre."
      />
      <div className="cards">
        {programs.map((program) => (
          <Link
            key={program.title}
            className="card card--link"
            to={program.href ?? '/tarifas-horarios'}
          >
            <h3>{program.title}</h3>
            <p>{program.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default TrainingSection
