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
          title="Fisioterapia"
          description="Servicio de fisioterapia deportiva y recuperacion funcional integrado en Atlas Center para prevenir lesiones y volver a entrenar con seguridad."
        />

        <div className="service-page__split">
          <article className="panel panel--service service-page__text-panel">
            <h3>Fisioterapia deportiva en Ciudad Real</h3>
            <div className="service-page__content">
              <p>
                Nuestro servicio de fisioterapia se enfoca en aliviar dolor, mejorar movilidad y acelerar tu
                recuperacion para que puedas entrenar mejor, tanto si practicas deporte como si pasas muchas horas
                sentado o con sobrecargas recurrentes.
              </p>
              <p>
                Trabajamos valoracion inicial, tratamiento y readaptacion funcional en coordinacion con los
                entrenadores del centro cuando el objetivo es volver al entrenamiento guiado o al gimnasio con
                confianza.
              </p>
              <h4>En que te podemos ayudar</h4>
              <ul className="service-page__list">
                <li>Prevencion de lesiones en entrenamiento y actividad diaria.</li>
                <li>Tratamiento de molestias musculares y articulares frecuentes.</li>
                <li>Readaptacion para retomar entrenamiento personal o en grupos.</li>
                <li>Mejora de movilidad y control del movimiento.</li>
              </ul>
              <div className="service-page__pricing" aria-label="Precios de fisioterapia">
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
              </div>
              <p>
                Puedes escribirnos desde <Link to="/contacto">contacto</Link> para una primera orientacion.
              </p>
            </div>
          </article>

          <article className="panel panel--service service-page__media-panel">
            <figure className="service-page__figure">
              <img
                src="/imagenes/fisio.jpg"
                alt="Sesion de fisioterapia deportiva en Atlas Center Ciudad Real"
                loading="lazy"
              />
              <figcaption>Fisioterapia orientada a recuperacion funcional y prevencion de lesiones.</figcaption>
            </figure>
          </article>
        </div>
      </section>
    </PageShell>
  )
}

export default FisioterapiaPage
