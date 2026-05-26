import { useEffect, useMemo, useState } from 'react'
import SectionHeading from '../ui/SectionHeading'

const AUTOPLAY_DELAY_MS = 4500

function CarouselSection({ images }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  const totalImages = images.length
  const activeSlide = useMemo(() => images[activeIndex], [images, activeIndex])

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updateMotionPreference = () => {
      setReduceMotion(motionQuery.matches)
    }

    updateMotionPreference()
    motionQuery.addEventListener('change', updateMotionPreference)

    return () => {
      motionQuery.removeEventListener('change', updateMotionPreference)
    }
  }, [])

  useEffect(() => {
    if (totalImages < 2 || isPaused || reduceMotion) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % totalImages)
    }, AUTOPLAY_DELAY_MS)

    return () => window.clearInterval(intervalId)
  }, [isPaused, reduceMotion, totalImages])

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + totalImages) % totalImages)
  }

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % totalImages)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      showPrevious()
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      showNext()
    }
  }

  if (totalImages === 0) {
    return (
      <section id="galeria" className="section section--carousel section--reveal">
        <SectionHeading
          title="Galería del gimnasio"
          description="Conoce nuestro centro de entrenamiento"
        />
      </section>
    )
  }

  return (
    <section id="galeria" className="section section--carousel section--reveal">
      <SectionHeading
        title="Galería del gimnasio"
        description="Conoce nuestro centro de entrenamiento"
      />

      <figure
        className="carousel__item"
        role="region"
        aria-roledescription="carrusel"
        aria-label="Imágenes del gimnasio Atlas Center"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <p className="sr-only" aria-live="polite">
          Imagen {activeIndex + 1} de {totalImages}: {activeSlide.caption}
        </p>

        <div className="carousel__media">
          <img
            src={activeSlide.src}
            alt={activeSlide.alt}
            loading={activeIndex === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />

          <div className="carousel__controls">
            <button
              className="btn-icon"
              type="button"
              onClick={showPrevious}
              aria-label="Mostrar imagen anterior"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M15.5 5 8.5 12l7 7" />
              </svg>
              <span className="sr-only">Anterior</span>
            </button>
            <button
              className="btn-icon"
              type="button"
              onClick={() => setIsPaused((value) => !value)}
              aria-label={isPaused ? 'Reanudar reproducción automática' : 'Pausar reproducción automática'}
            >
              {isPaused ? (
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M8 6v12l10-6-10-6Z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M8 6h3v12H8zM13 6h3v12h-3z" />
                </svg>
              )}
              <span className="sr-only">{isPaused ? 'Reanudar' : 'Pausar'}</span>
            </button>
            <button
              className="btn-icon"
              type="button"
              onClick={showNext}
              aria-label="Mostrar imagen siguiente"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="m8.5 5 7 7-7 7" />
              </svg>
              <span className="sr-only">Siguiente</span>
            </button>
          </div>

          <div className="carousel__dots" aria-label="Selección de diapositiva">
            {images.map((image, index) => (
              <button
                key={image.src}
                className={index === activeIndex ? 'dot dot--active' : 'dot'}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Ir a imagen ${index + 1}`}
                aria-current={index === activeIndex}
              />
            ))}
          </div>
        </div>

        <figcaption>{activeSlide.caption}</figcaption>
      </figure>
    </section>
  )
}

export default CarouselSection
