import { Link } from 'react-router-dom'
import PageShell from '../components/layout/PageShell'
import SectionHeading from '../components/ui/SectionHeading'

function NotFoundPage() {
  return (
    <PageShell>
      <section className="section">
        <div className="container">
          <SectionHeading
            level="h1"
            title="Página no encontrada"
            description="La URL que has abierto no existe o ha cambiado."
          />
          <p className="service__note service__note--first">
            Puedes volver al <Link to="/">inicio</Link> o consultar{' '}
            <Link to="/tarifas-horarios">tarifas y horarios</Link>.
          </p>
        </div>
      </section>
    </PageShell>
  )
}

export default NotFoundPage