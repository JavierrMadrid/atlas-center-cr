import PageShell from '../components/layout/PageShell'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/ui/SectionHeading'

function PilatesZennPage() {
  return (
    <PageShell className="pricing-page service-page service-page--pilates-zenn">
      <section className="section pricing-section section--reveal">
        <SectionHeading
          level="h1"
          title="Pilates y Zenn"
          description="Sesiones de pilates y Zenn en Ciudad Real, con una fusion inspirada en yoga, para mejorar control corporal, movilidad, fuerza y equilibrio con clases guiadas para todos los niveles."
        />

        <div className="service-page__split">
          <article className="panel panel--service service-page__text-panel">
            <h3>Clases guiadas de pilates y Zenn</h3>
            <div className="service-page__content">
              <p>
                En Atlas Center trabajamos el pilates desde un enfoque tecnico y adaptado: fuerza, elasticidad,
                conciencia corporal y control del movimiento para que avances con seguridad en cada sesion.
              </p>
              <div className="service-page__mini-grid">
                <article className="service-page__mini-card">
                  <h4>Zenn</h4>
                  <p>
                    Entrenamiento grupal que fusiona los mejores movimientos del Yoga, del Pilates y del Taichi,
                    coreografiados al ritmo de la musica. Conecta cuerpo y mente para mejorar flexibilidad,
                    coordinacion y equilibrio.
                  </p>
                </article>

                <article className="service-page__mini-card">
                  <h4>Pilates</h4>
                  <p>
                    En pilates damos especial importancia a la activacion del suelo pelvico, el transverso abdominal,
                    la respiracion y la musculatura estabilizadora para lograr un trabajo eficaz, seguro y consciente.
                  </p>
                </article>
              </div>

              <p>
                Como parte del acompanamiento, los ejercicios se adaptan a las necesidades de cada persona,
                corrigiendo tecnica y ajustando intensidad para progresar con confianza.
              </p>
              <h4>Beneficios principales</h4>
              <ul className="service-page__list">
                <li>Mejora de movilidad y flexibilidad funcional.</li>
                <li>Mayor control postural y fuerza del core profundo.</li>
                <li>Mejor conexion cuerpo-mente, respiracion y equilibrio.</li>
                <li>Complemento ideal para entrenamiento guiado y sala open.</li>
              </ul>
              <h4>Preguntas frecuentes sobre Zenn y yoga</h4>
              <div className="service-page__faq">
                <p>
                  <strong>Que diferencia hay entre Zenn y una clase de yoga tradicional?</strong>
                  <br />
                  Zenn mantiene la conexion cuerpo-mente y la respiracion del yoga, pero combina tambien patrones de
                  pilates y taichi en formato coreografiado y dinamico.
                </p>
                <p>
                  <strong>Si busco yoga en Ciudad Real, me sirve Zenn?</strong>
                  <br />
                  Si. Es una opcion ideal si te interesa una experiencia inspirada en yoga con trabajo adicional de
                  control postural, coordinacion y estabilidad del core.
                </p>
              </div>
              <p>
                Consulta <Link to="/tarifas-horarios">tarifas y horarios</Link> para ver bonos de clase y opciones de
                acceso al centro, o visita <Link to="/contacto">contacto</Link> si quieres reservar tu primera clase.
              </p>
            </div>
          </article>

          <article className="panel panel--service service-page__media-panel">
            <div className="service-page__gallery service-page__gallery--single">
              <figure className="service-page__figure">
                <img
                  src="/imagenes/entrenamiento/yogaypilates.webp"
                  alt="Sesion de pilates y Zenn guiada en Atlas Center, Ciudad Real"
                  loading="lazy"
                  decoding="async"
                  width="1600"
                  height="1067"
                  sizes="(max-width: 768px) 92vw, (max-width: 1280px) 44vw, 520px"
                />
                <figcaption>Pilates y Zenn para mejorar movilidad, control corporal y equilibrio.</figcaption>
              </figure>
            </div>
          </article>
        </div>
      </section>
    </PageShell>
  )
}

export default PilatesZennPage
