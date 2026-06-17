import PageShell from '../components/layout/PageShell'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/ui/SectionHeading'

function FisioterapiaPage({ content }) {
  const physiotherapyPrices = Array.isArray(content?.physiotherapyPrices)
    ? content.physiotherapyPrices
    : []

  return (
    <PageShell className="pricing-page service-page service-page--fisioterapia">
      <section className="section pricing-section section--reveal">
        <SectionHeading
          level="h1"
          title="Fisioterapia"
          description="Servicio de fisioterapia deportiva y recuperacion funcional integrado en Atlas Center para prevenir lesiones y volver a entrenar con seguridad."
        />

        <div className="service-page__intro">
          <article className="panel panel--service service-page__text-panel">
            <h3>Fisioterapia deportiva en Ciudad Real</h3>
            <p className="service-page__note">
              Valoracion, tratamiento y readaptacion para volver a entrenar con seguridad y menos dolor.
            </p>

            <div className="service-page__mini-grid">
              <article className="service-page__mini-card">
                <h4>Prevencion</h4>
                <p>Prevencion de lesiones en entrenamiento y actividad diaria.</p>
              </article>
              <article className="service-page__mini-card">
                <h4>Tratamiento</h4>
                <p>Molestias musculares y articulares frecuentes con enfoque funcional.</p>
              </article>
              <article className="service-page__mini-card">
                <h4>Readaptacion</h4>
                <p>Plan para retomar entrenamiento personal o en grupos con confianza.</p>
              </article>
              <article className="service-page__mini-card">
                <h4>Movilidad</h4>
                <p>Mejora de rango de movimiento, control postural y calidad gestual.</p>
              </article>
            </div>
          </article>

          <article className="panel panel--service service-page__media-panel">
            <figure className="service-page__figure service-page__figure--compact">
              <img
                src="/imagenes/fisio.jpg"
                alt="Sesion de fisioterapia deportiva en Atlas Center Ciudad Real"
                loading="lazy"
                decoding="async"
                width="1280"
                height="853"
                sizes="(max-width: 768px) 92vw, (max-width: 1280px) 44vw, 520px"
              />
            </figure>
          </article>
        </div>

        <article className="panel panel--service service-page__block service-page__block--boxed" aria-label="Precios de fisioterapia">
          <h3>Tarifas de fisioterapia</h3>
          <div className="service-page__pricing-table-wrap">
            <table className="service-page__pricing-table">
              <thead>
                <tr>
                  <th scope="col">Tarifa</th>
                  <th scope="col">Socios</th>
                  <th scope="col">No socios</th>
                </tr>
              </thead>
              <tbody>
                {physiotherapyPrices.map((item) => (
                  <tr key={item.label}>
                    <th scope="row">{item.label}</th>
                    <td>{item.memberPrice}</td>
                    <td>{item.nonMemberPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
        <p className="service-page__note service-page__note--cta">
          Puedes escribirnos desde <Link to="/contacto">contacto</Link> para una primera orientacion.
        </p>
      </section>
    </PageShell>
  )
}

export default FisioterapiaPage
