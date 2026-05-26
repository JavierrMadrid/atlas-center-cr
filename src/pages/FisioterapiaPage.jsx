import PageShell from '../components/layout/PageShell'
import SectionHeading from '../components/ui/SectionHeading'

function FisioterapiaPage() {
  return (
    <PageShell className="pricing-page service-page service-page--fisioterapia">
      <section className="section pricing-section section--reveal">
        <SectionHeading
          title="Fisioterapia"
          description="Servicio de fisioterapia deportiva y recuperación funcional integrado en Atlas Center."
        />

        <div className="pricing-schedule-grid pricing-schedule-grid--stack">
          <article className="panel panel--service">
            <p className="service-page__note">
              Próximamente más información sobre nuestros servicios de fisioterapia.
            </p>
          </article>
        </div>
      </section>
    </PageShell>
  )
}

export default FisioterapiaPage
