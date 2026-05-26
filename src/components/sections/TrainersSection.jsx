import SectionHeading from '../ui/SectionHeading'

function TrainersSection({ trainers }) {
  return (
    <section id="entrenadores" className="section section--trainers section--reveal">
      <SectionHeading
        title="Entrenadores"
        description="Dos perfiles, una misma filosofía: entrenar con técnica, intensidad y cercanía."
      />
      <div className="trainers-grid">
        {trainers.map((trainer) => (
          <article key={trainer.name} className="trainer-card">
            <img src={trainer.image} alt={`Entrenador ${trainer.name}`} loading="lazy" />
            <div className="trainer-card__body">
              <h3>{trainer.name}</h3>
              <p>{trainer.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TrainersSection
