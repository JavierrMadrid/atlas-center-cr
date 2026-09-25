import PageShell from '../components/layout/PageShell'
import { Link } from 'react-router-dom'
import PriceMarquee from '../components/ui/PriceMarquee'
import SectionHeading from '../components/ui/SectionHeading'

function FisioterapiaPage({ content }) {
  const physiotherapyPrices = Array.isArray(content?.physiotherapyPrices)
    ? content.physiotherapyPrices
    : []

  return (
    <PageShell>
      <section className="section">
        <div className="container">
          <SectionHeading
            level="h1"
            title="Fisioterapia deportiva en Ciudad Real"
            description="Fisioterapia deportiva y recuperación funcional en Atlas Center. Tratamos lesiones, prevenimos recaídas y readaptamos a personas activas para que vuelvan a entrenar con seguridad."
          />

          <div className="service__grid">
            <div>
              <h2 className="service__intro-title">Prevención, tratamiento y readaptación</h2>
              <p className="service__note service__note--tight">
                Valoración, tratamiento y readaptación para volver a entrenar con seguridad y con
                menos dolor.
              </p>

              <div className="service__mini-grid">
                <article className="mini-card">
                  <h3>Prevención</h3>
                  <p>Prevención de lesiones en entrenamiento y actividad diaria.</p>
                </article>
                <article className="mini-card">
                  <h3>Tratamiento</h3>
                  <p>Molestias musculares y articulares frecuentes con enfoque funcional.</p>
                </article>
                <article className="mini-card">
                  <h3>Readaptación</h3>
                  <p>Plan para retomar el entrenamiento personal o en grupo con confianza.</p>
                </article>
                <article className="mini-card">
                  <h3>Movilidad</h3>
                  <p>Mejora del rango de movimiento, el control postural y la calidad gestual.</p>
                </article>
              </div>
            </div>

            <figure className="service__figure service__figure--short">
              <img
                src="/imagenes/fisio.webp"
                alt="Sesión de fisioterapia deportiva en el gimnasio Atlas Center de Ciudad Real"
                loading="lazy"
                decoding="async"
                width="1280"
                height="853"
              />
            </figure>
          </div>

          <div className="service__block">
            <h2>Tarifas de fisioterapia</h2>
            <PriceMarquee prices={physiotherapyPrices} variant="row" />
          </div>

          <p className="service__note">
            Puedes escribirnos desde <Link to="/contacto">contacto</Link> para una primera
            orientación.
          </p>
        </div>
      </section>
    </PageShell>
  )
}

export default FisioterapiaPage