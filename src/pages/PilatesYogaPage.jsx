import PageShell from '../components/layout/PageShell'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/ui/SectionHeading'

const programs = [
  {
    id: 'pilates',
    title: 'Pilates',
    imageSrc: '/imagenes/pilates.jpg',
    imageAlt: 'Clase de pilates en el gimnasio Atlas Center de Ciudad Real',
    description:
      'Trabajo técnico centrado en el control postural, la movilidad y la fuerza del core para avanzar con seguridad.',
    items: [
      'Activación del suelo pélvico y del transverso abdominal.',
      'Respiración y control del movimiento en cada repetición.',
      'Mejora de la flexibilidad funcional y de la estabilidad lumbar.',
    ],
  },
  {
    id: 'zenn',
    title: 'Zenn',
    imageSrc: '/imagenes/zenn.jpg',
    imageAlt: 'Clase de Zenn, disciplina inspirada en yoga, en Atlas Center Ciudad Real',
    description:
      'Sesión dinámica inspirada en yoga, pilates y taichi, coreografiada al ritmo de la música.',
    items: [
      'Mejora de la coordinación, el equilibrio y la conciencia corporal.',
      'Conexión cuerpo-mente con trabajo fluido y guiado.',
      'Intensidad adaptable a distintos niveles.',
    ],
  },
]

function PilatesZennPage() {
  return (
    <PageShell>
      <section className="section">
        <div className="container">
          <SectionHeading
            level="h1"
            title="Clases de Pilates, Zenn y Yoga en Ciudad Real"
            description="En Atlas Center damos clases de pilates y Zenn para todos los niveles. Mejora tu postura, tu movilidad y la fuerza del core con sesiones guiadas en grupos reducidos."
          />

          <div className="programs__grid">
            {programs.map((program) => (
              <article key={program.id} className="program-card">
                <figure className="service__figure service__figure--short">
                  <img
                    src={program.imageSrc}
                    alt={program.imageAlt}
                    loading="lazy"
                    decoding="async"
                    width="1280"
                    height="853"
                  />
                </figure>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                <ul className="service__list">
                  {program.items.map((item) => (
                    <li key={item.slice(0, 24)}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="service__block service__block--card">
            <h3>Cómo elegir tu clase</h3>
            <p className="service__note service__note--tight">
              Pilates es ideal si buscas precisión técnica y fortalecimiento del core. Zenn es
              perfecto si prefieres un formato más dinámico y fluido. Puedes combinar ambas
              modalidades.
            </p>
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

export default PilatesZennPage