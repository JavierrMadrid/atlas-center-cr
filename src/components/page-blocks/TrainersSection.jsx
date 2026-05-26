import SectionHeading from '../ui/SectionHeading'

function TrainersSection({ trainers }) {
  return (
    <section id="equipo" className="section pricing-section team-section section--reveal">
      <SectionHeading
        title="Equipo"
        description="Conoce a nuestro equipo: dos entrenadores y un fisio con una misma filosofía de trabajo, técnica, intensidad y cercanía."
      />

      <div className="pricing-schedule-grid pricing-schedule-grid--stack">
        <article className="panel panel--team">
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
        </article>
      </div>
    </section>
  )
}

export default TrainersSection
