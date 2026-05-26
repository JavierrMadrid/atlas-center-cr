import { useEffect, useState } from 'react'
import CarouselSection from '../components/sections/CarouselSection'
import TrainersSection from '../components/sections/TrainersSection'
import TrainingSection from '../components/sections/TrainingSection'

function HomePage({ content }) {
  const { brand } = content
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 360)
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

      <main>
        <TrainingSection programs={content.trainingPrograms} />
        <CarouselSection images={content.carouselImages} />
        <TrainersSection trainers={content.trainers} />
      </main>

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
