import { useEffect, useMemo, useState } from 'react'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
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

    const updateMotionPreference = () => setReduceMotion(motionQuery.matches)

    updateMotionPreference()
    motionQuery.addEventListener('change', updateMotionPreference)

    return () => motionQuery.removeEventListener('change', updateMotionPreference)
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

  const showPrevious = () => setActiveIndex((current) => (current - 1 + totalImages) % totalImages)
  const showNext = () => setActiveIndex((current) => (current + 1) % totalImages)

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

  return (
    <section id="galeria" className="section">
      <div className="container">
        <Reveal>
          <SectionHeading title="Conoce el centro" />
        </Reveal>

        {totalImages === 0 ? (
          <p className="service__note">Próximamente, imágenes del centro.</p>
        ) : (
          <Reveal delay={80}>
            <figure
              className="gallery__stage"
              role="region"
              aria-roledescription="carrusel"
              aria-label="Imágenes del gimnasio Atlas Center"
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              <p className="sr-only" aria-live="polite">
                Imagen {activeIndex + 1} de {totalImages}: {activeSlide.caption}
              </p>

              <div className="gallery__media">
                <img
                  src={activeSlide.src}
                  alt={activeSlide.alt}
                  width="1600"
                  height="900"
                  loading={activeIndex === 0 ? 'eager' : 'lazy'}
                  fetchPriority={activeIndex === 0 ? 'high' : 'low'}
                  decoding="async"
                />

                <div className="gallery__controls">
                  <button
                    className="btn-icon"
                    type="button"
                    onClick={showPrevious}
                    aria-label="Mostrar imagen anterior"
                  >
                    <Icon name="caretLeft" size={20} />
                  </button>
                  <button
                    className="btn-icon"
                    type="button"
                    onClick={() => setIsPaused((value) => !value)}
                    aria-label={isPaused ? 'Reanudar reproducción automática' : 'Pausar reproducción automática'}
                  >
                    <Icon name={isPaused ? 'play' : 'pause'} size={20} />
                  </button>
                  <button
                    className="btn-icon"
                    type="button"
                    onClick={showNext}
                    aria-label="Mostrar imagen siguiente"
                  >
                    <Icon name="caretRight" size={20} />
                  </button>
                </div>

                <div className="gallery__dots">
                  {images.map((image, index) => (
                    <button
                      key={image.src}
                      className={index === activeIndex ? 'gallery__dot gallery__dot--active' : 'gallery__dot'}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Ir a imagen ${index + 1}`}
                      aria-current={index === activeIndex}
                    />
                  ))}
                </div>
              </div>

              <figcaption className="gallery__caption">{activeSlide.caption}</figcaption>
            </figure>
          </Reveal>
        )}
      </div>
    </section>
  )
}

export default CarouselSection