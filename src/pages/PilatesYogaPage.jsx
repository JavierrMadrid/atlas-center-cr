import PageShell from '../components/layout/PageShell'
import SectionHeading from '../components/ui/SectionHeading'

function PilatesYogaPage() {
  return (
    <PageShell className="pricing-page service-page service-page--pilates-yoga">
      <section className="section pricing-section section--reveal">
        <SectionHeading
          title="Pilates y Yoga"
          description="Sesiones de movilidad, control postural y trabajo de core. Adaptadas a todos los niveles."
        />

        <div className="pricing-schedule-grid pricing-schedule-grid--stack">
          <article className="panel panel--service">
            <p className="service-page__note">
              Próximamente más información sobre nuestras clases de pilates y yoga.
            </p>
          </article>
        </div>
      </section>
    </PageShell>
  )
}

export default PilatesYogaPage
