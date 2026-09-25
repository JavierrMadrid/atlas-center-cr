import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import Icon from '../ui/Icon'
import SectionHeading from '../ui/SectionHeading'
import { useFocusTrap } from '../../utils/useFocusTrap'

function PricingScheduleSection({
  pricingPlans,
  pricingPolicy,
  schedule,
  headingLevel = 'h2',
  headingTitle = 'Tarifas y horarios',
  headingDescription,
}) {
  const [lightbox, setLightbox] = useState(null)
  const lightboxRef = useRef(null)
  const lightboxCloseRef = useRef(null)
  const lightboxTriggerRef = useRef(null)

  const closeLightbox = () => setLightbox(null)

  // Los títulos de grupo deben quedar justo debajo del encabezado de la sección.
  const GroupTitle = headingLevel === 'h1' ? 'h2' : 'h3'

  useFocusTrap(lightboxRef, {
    active: Boolean(lightbox),
    onClose: closeLightbox,
    initialFocusRef: lightboxCloseRef,
    restoreFocusRef: lightboxTriggerRef,
  })

  const normalizePlanName = (name) =>
    name
      .replace(/^\s*grupos reducidos\s*-\s*/i, '')
      .replace(/^\s*(entrenamiento\s*)?guiad[oa]s?\s*-\s*/i, '')
      .replace(/^\s*solo open\s*-\s*/i, '')
      .replace(/^\s*open\s*-\s*/i, '')
      .trim()

  const allPlans = Array.isArray(pricingPlans) ? pricingPlans : []
  const guidedPlans = allPlans.filter((plan) => /grupos reducidos|guiad[oa]s?/i.test(plan.name))
  const openPlans = allPlans.filter((plan) => /solo open|\bopen\b/i.test(plan.name))
  const otherPlans = allPlans.filter(
    (plan) => !guidedPlans.includes(plan) && !openPlans.includes(plan),
  )

  const planGroups = [
    {
      key: 'guided',
      id: 'tarifas-grupos-reducidos',
      title: 'Entrenamiento guiado',
      plans: guidedPlans,
    },
    {
      key: 'open',
      id: 'tarifas-solo-open',
      title: 'Sala open',
      plans: [...openPlans, ...otherPlans],
    },
  ].filter((group) => group.plans.length > 0)

  const scheduleRows = Array.isArray(schedule) ? schedule : []

  return (
    <>
      {lightbox && (
        <div
          ref={lightboxRef}
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={closeLightbox}
        >
          <button
            ref={lightboxCloseRef}
            type="button"
            className="lightbox__close"
            onClick={closeLightbox}
            aria-label="Cerrar"
          >
            <Icon name="close" size={20} />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            width="1200"
            height="1800"
            decoding="async"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}

      <section id="tarifas-horarios" className="section">
        <div className="container">
          <div className="pricing__layout">
            <div>
              <SectionHeading
                level={headingLevel}
                title={headingTitle}
                description={headingDescription}
              />

              {planGroups.length === 0 ? (
                <p className="service__note">
                  No hay tarifas publicadas todavía. Escríbenos desde{' '}
                  <Link to="/contacto">contacto</Link> y te informamos.
                </p>
              ) : null}

              {planGroups.map((group) => (
                <div key={group.key} className="pricing__group">
                  <GroupTitle className="pricing__group-title" id={group.id}>
                    {group.title}
                  </GroupTitle>
                  <div className="pricing__grid">
                    {group.plans.map((plan) => {
                      const planLabel = normalizePlanName(plan.name)

                      if (plan.imageSrc) {
                        return (
                          <button
                            key={plan.name}
                            type="button"
                            className="price-card price-card--image"
                            onClick={(event) => {
                              lightboxTriggerRef.current = event.currentTarget
                              setLightbox({ src: plan.imageSrc, alt: `Tarifa ${planLabel}` })
                            }}
                            aria-label={`Ver tarifa ${planLabel} en grande`}
                          >
                            <img
                              src={plan.imageSrc}
                              alt={`Tarifa ${planLabel}`}
                              loading="lazy"
                              decoding="async"
                            />
                            <span className="price-card__zoom">
                              Ver tarifa
                              <Icon name="expand" size={16} />
                            </span>
                          </button>
                        )
                      }

                      return (
                        <article key={plan.name} className="price-card">
                          <span className="price-card__name">{planLabel}</span>
                          <span className="price-card__price">{plan.price || 'Consultar'}</span>
                          <p className="price-card__details">
                            {plan.details || 'Consulta las condiciones en el gimnasio.'}
                          </p>
                        </article>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="schedule">
                <div className="schedule__header">
                  <Icon name="clock" size={18} />
                  Horarios de apertura
                </div>
                <div className="schedule__rows">
                  {scheduleRows.length === 0 ? (
                    <p className="service__note">Horarios no disponibles. Consúltanos.</p>
                  ) : null}
                  {scheduleRows.map((slot) => (
                    <div className="schedule__row" key={slot.day}>
                      <span className="schedule__row-day">{slot.day}</span>
                      <span className="schedule__row-hours">{slot.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
              {pricingPolicy ? <p className="service__note">{pricingPolicy}</p> : null}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PricingScheduleSection