import { useEffect, useRef, useState } from 'react'
import CarouselSection from '../components/page-blocks/CarouselSection'
import EditorialSection from '../components/page-blocks/EditorialSection'
import HeroSection from '../components/page-blocks/HeroSection'
import PageShell from '../components/layout/PageShell'
import TrainersSection from '../components/page-blocks/TrainersSection'
import TrainingSection from '../components/page-blocks/TrainingSection'
import ValueStrip from '../components/page-blocks/ValueStrip'
import Icon from '../components/ui/Icon'

function HomePage({ content }) {
  const { brand, trainers, trainingPrograms, carouselImages } = content
  const [showScrollTop, setShowScrollTop] = useState(false)
  const sentinelRef = useRef(null)

  useEffect(() => {
    const node = sentinelRef.current

    if (!node) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setShowScrollTop(!entry.isIntersecting)
          break
        }
      },
      { threshold: 0 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div ref={sentinelRef} className="scroll-sentinel" aria-hidden="true" />

      <HeroSection brand={brand} />

      <PageShell className="home-page">
        <ValueStrip />
        <TrainingSection programs={trainingPrograms} />
        <CarouselSection images={carouselImages} />
        <TrainersSection
          trainers={trainers}
          headingTitle="El equipo"
          headingDescription="Entrenadores personales, pilates y fisioterapia bajo el mismo criterio técnico: técnica, intensidad y cercanía."
          viewAll
          glow
        />
        <EditorialSection />
      </PageShell>

      <button
        type="button"
        className={`scroll-to-top${showScrollTop ? ' scroll-to-top--visible' : ''}`}
        onClick={handleBackToTop}
        aria-label="Volver al inicio"
        title="Volver al inicio"
      >
        <Icon name="arrowUp" size={20} />
      </button>
    </>
  )
}

export default HomePage