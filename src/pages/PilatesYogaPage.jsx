import PageShell from '../components/layout/PageShell'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/ui/SectionHeading'

function PilatesYogaPage() {
  return (
    <PageShell className="pricing-page service-page service-page--pilates-yoga">
      <section className="section pricing-section section--reveal">
        <SectionHeading
          title="Pilates y Yoga"
          description="Clases de yoga y pilates con enfoque en movilidad, respiracion y control postural, adaptadas a todos los niveles."
        />

        <div className="service-page__split">
          <article className="panel panel--service service-page__text-panel">
            <h3>Clases guiadas de yoga y pilates</h3>
            <div className="service-page__content">
              <p>
                Las sesiones de yoga y pilates estan pensadas para mejorar movilidad, control corporal, estabilidad de
                core y bienestar general. Son clases guiadas con atencion tecnica para que progreses con seguridad.
              </p>
              <div className="service-page__mini-grid">
                <article className="service-page__mini-card">
                  <h4>Yoga</h4>
                  <p>
                    El trabajo de yoga se centra en respiracion, movilidad global y conciencia corporal para mejorar tu
                    bienestar diario y complementar otras actividades del centro deportivo.
                  </p>
                </article>

                <article className="service-page__mini-card">
                  <h4>Pilates</h4>
                  <p>
                    En pilates priorizamos control postural, estabilidad lumbo-pelvica y fuerza de core para que
                    entrenes con mejor tecnica y reduzcas riesgo de sobrecargas.
                  </p>
                </article>
              </div>

              <p>
                Este formato complementa el entrenamiento personal y el trabajo en gimnasio, ayudando a reducir
                sobrecargas, mejorar postura y mantener continuidad en tus objetivos de salud.
              </p>
              <h4>Beneficios principales</h4>
              <ul className="service-page__list">
                <li>Mejora de movilidad y flexibilidad funcional.</li>
                <li>Mayor control postural y fuerza de core.</li>
                <li>Trabajo de respiracion y gestion del estres.</li>
                <li>Complemento ideal para entrenamiento guiado y sala open.</li>
              </ul>
              <p>
                Consulta <Link to="/tarifas-horarios">tarifas y horarios</Link> para ver bonos de clase y opciones de
                acceso al centro.
              </p>
            </div>
          </article>

          <article className="panel panel--service service-page__media-panel">
            <div className="service-page__gallery service-page__gallery--single">
              <figure className="service-page__figure">
                <img
                  src="/imagenes/entrenamiento/yogaypilates.jpg"
                  alt="Sesion de yoga guiada en Atlas Center"
                  loading="lazy"
                />
                <figcaption>Yoga guiado para mejorar movilidad y respiracion.</figcaption>
              </figure>
            </div>
          </article>
        </div>
      </section>
    </PageShell>
  )
}

export default PilatesYogaPage
