import { useEffect, useState } from 'react'
import CarouselSection from '../components/page-blocks/CarouselSection'
import PageShell from '../components/layout/PageShell'
import TrainingSection from '../components/page-blocks/TrainingSection'

function HomePage({ content }) {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isHeroFaded, setIsHeroFaded] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (ticking) {
        return
      }

      ticking = true

      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY
        setShowScrollTop((previous) => (previous === (scrollY > 360) ? previous : scrollY > 360))
        setIsHeroFaded((previous) => (previous === (scrollY > 50) ? previous : scrollY > 50))
        ticking = false
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <header className={`hero ${isHeroFaded ? 'hero--faded' : ''}`}>
      </header>

      <PageShell className="home-page">
        <TrainingSection programs={content.trainingPrograms} />
        <CarouselSection images={content.carouselImages} />
        <section className="section section--reveal section--ink" aria-labelledby="seo-intent-title">
          <div className="seo-intent__layout">
            <div className="seo-intent__content">
              <header className="section__heading">
                <h2 id="seo-intent-title">Atlas Center — Tu gimnasio en Ciudad Real con entrenamiento guiado, pilates y fisioterapia</h2>
                <p>
                  Somos un centro de entrenamiento en Ciudad Real especializado en ayudarte a mejorar tu salud,
                  composición corporal y rendimiento a través del ejercicio guiado por profesionales. En Atlas Center
                  cada persona entrena a su ritmo, con atención personalizada y un plan adaptado a su nivel.
                </p>
              </header>
              <p>
                Ofrecemos entrenamiento funcional e híbrido en grupos reducidos de hasta 5 personas, clases de pilates
                y Zenn, acceso libre a sala de musculación y sesiones de fisioterapia deportiva. Nuestro equipo de
                técnicos y fisioterapeutas diseña programas orientados a pérdida de peso, ganancia de fuerza, mejora
                de la movilidad y prevención de lesiones, con seguimiento técnico continuo.
              </p>
              <p>
                Ya estés empezando o busques dar el siguiente paso, en Atlas Center encontrarás un espacio cercano,
                motivador y profesional para entrenar de forma segura y constante.
              </p>
            </div>
            <figure className="seo-intent__media">
              <img
                src="/imagenes/entrena con proposito pintada.webp"
                alt="Entrena con proposito en Atlas Center"
                width="1200"
                height="900"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </section>
      </PageShell>

      <button
        type="button"
        className={`scroll-to-top ${showScrollTop ? 'scroll-to-top--visible' : ''}`}
        onClick={handleBackToTop}
        aria-label="Volver al inicio"
        title="Volver al inicio"
      >
        ↑
      </button>
    </>
  )
}

export default HomePage
