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

        <div className="service-programs-grid">
          <article className="panel panel--service service-program-card service-program-card--pilates">
            <figure className="service-page__figure service-program-card__media">
              <img
                src="/imagenes/pilates.jpg"
                alt="Clase de pilates en Atlas Center Ciudad Real"
                loading="lazy"
                decoding="async"
                width="1280"
                height="853"
                sizes="(max-width: 768px) 92vw, (max-width: 1280px) 46vw, 600px"
              />
            </figure>

            <div className="service-program-card__content">
              <h3>Pilates</h3>
              <p>
                Trabajo tecnico centrado en control postural, movilidad y fuerza del core para avanzar con seguridad.
              </p>
              <ul className="service-page__list">
                <li>Activacion de suelo pelvico y transverso abdominal.</li>
                <li>Respiracion y control del movimiento en cada repeticion.</li>
                <li>Mejora de flexibilidad funcional y estabilidad lumbar.</li>
              </ul>
            </div>
          </article>

          <article className="panel panel--service service-program-card service-program-card--zenn">
            <figure className="service-page__figure service-program-card__media">
              <img
                src="/imagenes/zenn.jpg"
                alt="Clase de Zenn en Atlas Center Ciudad Real"
                loading="lazy"
                decoding="async"
                width="1280"
                height="853"
                sizes="(max-width: 768px) 92vw, (max-width: 1280px) 46vw, 600px"
              />
            </figure>

            <div className="service-program-card__content">
              <h3>Zenn</h3>
              <p>
                Sesion dinamica inspirada en yoga, pilates y taichi, coreografiada al ritmo de la musica.
              </p>
              <ul className="service-page__list">
                <li>Mejora de coordinacion, equilibrio y conciencia corporal.</li>
                <li>Conexion cuerpo-mente con trabajo fluido y guiado.</li>
                <li>Intensidad adaptable para distintos niveles.</li>
              </ul>
            </div>
          </article>
        </div>

        <article className="panel panel--service service-page__block">
          <h3>Como elegir tu clase</h3>
          <p className="service-page__note">
            Pilates es ideal si buscas precision tecnica y fortalecimiento del core. Zenn es perfecto si prefieres un
            formato mas dinamico y fluido. Puedes combinar ambas modalidades.
          </p>
        </article>
        <p className="service-page__note service-page__note--cta">
          Consulta <Link to="/tarifas-horarios">tarifas y horarios</Link> o visita <Link to="/contacto">contacto</Link> para reservar.
        </p>
      </section>
    </PageShell>
  )
}

export default PilatesZennPage
