import { useEffect, useState } from 'react'
import CarouselSection from '../components/page-blocks/CarouselSection'
import PageShell from '../components/layout/PageShell'
import TrainingSection from '../components/page-blocks/TrainingSection'

function HomePage({ content }) {
  const { brand } = content
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (ticking) {
        return
      }

      ticking = true

      window.requestAnimationFrame(() => {
        const shouldShow = window.scrollY > 360
        setShowScrollTop((previous) => (previous === shouldShow ? previous : shouldShow))
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
      <header
        className="hero"
        style={brand.heroLogoSrc ? { '--hero-logo-bg': `url(${brand.heroLogoSrc})` } : undefined}
      >
        <div className="hero__veil" aria-hidden="true"></div>
        <div className="hero__content">
          <p className="kicker">{brand.kicker}</p>
          <h1>{brand.heroName ?? brand.name}</h1>
          <p className="hero__claim">{brand.claim}</p>
          <p className="hero__text">{brand.description}</p>
          <div className="hero__actions">
            <a className="btn btn--ghost" href={brand.secondaryActionTarget}>
              {brand.secondaryActionLabel}
            </a>
          </div>
        </div>
      </header>

      <PageShell className="home-page">
        <TrainingSection programs={content.trainingPrograms} />
        <CarouselSection images={content.carouselImages} />
        <section className="section section--reveal" aria-labelledby="seo-intent-title">
          <div className="seo-intent__layout">
            <div className="seo-intent__content">
              <header className="section__heading">
                <h2 id="seo-intent-title">Centro deportivo en Ciudad Real para entrenamientos guiados</h2>
                <p>
                  En Atlas Center combinamos entrenamiento personal y entrenamiento en grupos reducidos para ayudarte a
                  progresar con seguridad. Si buscas gimnasio, entrenamiento guiado, Zenn, pilates o fisioterapia, Atlas Center
                  es tu sitio.
                </p>
              </header>
              <p>
                Trabajamos objetivos de salud, perdida de grasa, fuerza, movilidad y readaptacion con seguimiento
                técnico. Puedes empezar en sala open o en clases guiadas segun tu nivel y disponibilidad.
              </p>
            </div>
            <figure className="seo-intent__media">
              <img
                src="/imagenes/entrena con proposito pintada.png"
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
