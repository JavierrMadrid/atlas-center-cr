import SectionHeading from '../ui/SectionHeading'

function TrainersSection({ trainers }) {
  return (
    <section id="equipo" className="section pricing-section team-section section--reveal">
      <SectionHeading
        title="Equipo"
        description="Conoce a nuestro equipo multidisciplinar de entrenamiento y fisioterapia, con una misma filosofia de trabajo: tecnica, intensidad y cercania."
      />

      <div className="pricing-schedule-grid pricing-schedule-grid--stack">
        <article className="panel panel--team">
          <div className="trainers-grid">
            {trainers.map((trainer) => (
              <article key={trainer.name} className="trainer-card">
                <img src={trainer.image} alt={`Miembro del equipo ${trainer.name}`} loading="lazy" />
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
