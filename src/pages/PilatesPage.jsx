import PageShell from '../components/layout/PageShell'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/ui/SectionHeading'

const focuses = [
  {
    title: 'Control postural',
    text: 'Conciencia corporal y alineación para corregir malos hábitos y proteger la espalda.',
  },
  {
    title: 'Fuerza del core',
    text: 'Activación del suelo pélvico y del transverso abdominal en cada ejercicio.',
  },
  {
    title: 'Movilidad y flexibilidad',
    text: 'Trabajo funcional que mejora el rango de movimiento y la estabilidad lumbar.',
  },
  {
    title: 'Respiración',
    text: 'Coordinación de la respiración con el movimiento para controlar cada repetición.',
  },
]

function PilatesPage() {
  return (
    <PageShell>
      <section className="section">
        <div className="container">
          <SectionHeading
            level="h1"
            title="Clases de Pilates en Ciudad Real"
            description="En Atlas Center damos clases de pilates para todos los niveles. Mejora tu postura, tu movilidad y la fuerza del core con sesiones guiadas en grupos reducidos."
          />

          <div className="service__grid">
            <div>
              <h3 className="service__intro-title">Pilates para todos los niveles</h3>
              <p className="service__note service__note--tight">
                Trabajo técnico centrado en el control postural, la movilidad y la fuerza del core
                para que avances con seguridad, dentro de los bonos de clase.
              </p>

              <div className="service__mini-grid">
                {focuses.map((focus) => (
                  <article key={focus.title} className="mini-card">
                    <h4>{focus.title}</h4>
                    <p>{focus.text}</p>
                  </article>
                ))}
              </div>
            </div>

            <figure className="service__figure service__figure--short">
              <img
                src="/imagenes/pilates.webp"
                alt="Clase de pilates en el gimnasio Atlas Center de Ciudad Real"
                loading="lazy"
                decoding="async"
                width="1280"
                height="853"
              />
            </figure>
          </div>

          <div className="service__block service__block--card">
            <h3>Qué trabajamos en cada sesión</h3>
            <ul className="service__list">
              <li>Activación del suelo pélvico y del transverso abdominal.</li>
              <li>Respiración y control del movimiento en cada repetición.</li>
              <li>Mejora de la flexibilidad funcional y de la estabilidad lumbar.</li>
              <li>Corrección y acompañamiento técnico durante toda la clase.</li>
            </ul>
          </div>

          <p className="service__note">
            Consulta <Link to="/tarifas-horarios">tarifas y horarios</Link> o visita{' '}
            <Link to="/contacto">contacto</Link> para reservar tu clase.
          </p>
        </div>
      </section>
    </PageShell>
  )
}

export default PilatesPage
