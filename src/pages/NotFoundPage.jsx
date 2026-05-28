import { Link } from 'react-router-dom'
import PageShell from '../components/layout/PageShell'

function NotFoundPage() {
  return (
    <PageShell className="pricing-page service-page">
      <section className="section pricing-section section--reveal">
        <div className="service-page__split">
          <article className="panel panel--service service-page__text-panel">
            <h1>Pagina no encontrada</h1>
            <div className="service-page__content">
              <p>La URL que has abierto no existe o ha cambiado.</p>
              <p>
                Puedes volver al <Link to="/">inicio</Link> o consultar <Link to="/tarifas-horarios">tarifas y horarios</Link>.
              </p>
            </div>
          </article>
        </div>
      </section>
    </PageShell>
  )
}

export default NotFoundPage
