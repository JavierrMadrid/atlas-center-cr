import Reveal from '../ui/Reveal'

const paragraphs = [
  'Somos un centro de entrenamiento en Ciudad Real especializado en ayudarte a mejorar tu salud, composición corporal y rendimiento a través del ejercicio guiado por profesionales. En Atlas Center cada persona entrena a su ritmo, con atención personalizada y un plan adaptado a su nivel.',
  'Ofrecemos entrenamiento funcional e híbrido en grupos reducidos de hasta 5 personas, clases de pilates, acceso libre a sala de musculación y sesiones de fisioterapia deportiva. Nuestro equipo de técnicos y fisioterapeutas diseña programas orientados a pérdida de peso, ganancia de fuerza, mejora de la movilidad y prevención de lesiones, con seguimiento técnico continuo.',
  'Ya estés empezando o busques dar el siguiente paso, en Atlas Center encontrarás un espacio cercano, motivador y profesional para entrenar de forma segura y constante.',
]

function EditorialSection() {
  return (
    <section className="section" aria-labelledby="editorial-title">
      <div className="container">
        <Reveal className="editorial__copy">
          <h2 id="editorial-title" className="editorial__title">
            Atlas Center: tu gimnasio en Ciudad Real con entrenamiento guiado, pilates y
            fisioterapia
          </h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal delay={100}>
          <figure className="editorial__media">
            <img
              src="/imagenes/entrena con proposito pintada.webp"
              alt="Entrena con propósito en Atlas Center"
              width="1600"
              height="900"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  )
}

export default EditorialSection