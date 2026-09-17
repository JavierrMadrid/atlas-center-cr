import PageShell from '../components/layout/PageShell'
import { Link } from 'react-router-dom'
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
              <h3 className="service__intro-title">Prevención, tratamiento y readaptación</h3>
              <p className="service__note service__note--tight">
                Valoración, tratamiento y readaptación para volver a entrenar con seguridad y con
                menos dolor.
              </p>

              <div className="service__mini-grid">
                <article className="mini-card">
                  <h4>Prevención</h4>
                  <p>Prevención de lesiones en entrenamiento y actividad diaria.</p>
                </article>
                <article className="mini-card">
                  <h4>Tratamiento</h4>
                  <p>Molestias musculares y articulares frecuentes con enfoque funcional.</p>
                </article>
                <article className="mini-card">
                  <h4>Readaptación</h4>
                  <p>Plan para retomar el entrenamiento personal o en grupo con confianza.</p>
                </article>
                <article className="mini-card">
                  <h4>Movilidad</h4>
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

          <div className="service__block service__block--card">
            <h3>Tarifas de fisioterapia</h3>
            <table className="price-table" aria-label="Precios de fisioterapia">
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