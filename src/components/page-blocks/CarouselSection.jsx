import DepthCarousel from '../ui/DepthCarousel'
import Reveal from '../ui/Reveal'

function CarouselSection({ images }) {
  const items = images.map(({ src, alt, caption }) => ({ image: src, alt, caption }))

  return (
      <section id="galeria" className="section section--flush" aria-labelledby="galeria-title">
        <div className="container">
          <h2 id="galeria-title" className="sr-only">
            Galería del centro
          </h2>
          {images.length === 0 ? (
          <p className="service__note">Próximamente, imágenes del centro.</p>
        ) : (
          <Reveal delay={80}>
            <div className="gallery__stage">
              <DepthCarousel
                items={items}
                cardWidth={720}
                cardHeight={480}
                depth={280}
                spread={170}
                tilt={22}
                tiltDirection="right"
                perspective={1400}
                visibleCards={4}
                falloff={0.2}
                blur={6}
                autoplay
                autoplayDelay={5000}
                loop
                showControls
                showIndicators
              />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

export default CarouselSection
