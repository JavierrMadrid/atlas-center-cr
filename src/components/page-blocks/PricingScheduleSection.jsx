import { useState } from 'react'
import Icon from '../ui/Icon'
import SectionHeading from '../ui/SectionHeading'

function PricingScheduleSection({
  pricingPlans,
  pricingPolicy,
  schedule,
  headingLevel = 'h2',
  headingTitle = 'Tarifas y horarios',
  headingDescription,
}) {
  const [lightbox, setLightbox] = useState(null)

  const normalizePlanName = (name) =>
    name
      .replace(/^\s*grupos reducidos\s*-\s*/i, '')
      .replace(/^\s*(entrenamiento\s*)?guiad[oa]s?\s*-\s*/i, '')
      .replace(/^\s*solo open\s*-\s*/i, '')
      .replace(/^\s*open\s*-\s*/i, '')
      .trim()

  const guidedPlans = pricingPlans.filter((plan) => /grupos reducidos|guiad[oa]s?/i.test(plan.name))
  const openPlans = pricingPlans.filter((plan) => /solo open|\bopen\b/i.test(plan.name))
  const otherPlans = pricingPlans.filter((plan) => !guidedPlans.includes(plan) && !openPlans.includes(plan))

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

  return (
    <>
      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={() => setLightbox(null)}
        >
          <button className="lightbox__close" onClick={() => setLightbox(null)} aria-label="Cerrar">
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

              {planGroups.map((group) => (
                <div key={group.key} className="pricing__group">
                  <h3 className="pricing__group-title" id={group.id}>
                    {group.title}
                  </h3>
                  <div className="pricing__grid">
                    {group.plans.map((plan) => {
                      const planLabel = normalizePlanName(plan.name)

                      return (
                        <article key={plan.name} className="price-card">
                          <span className="price-card__name">{planLabel}</span>
                          <span className="price-card__price">{plan.price || 'Consultar'}</span>
                          <p className="price-card__details">
                            {plan.details || 'Consulta las condiciones en el gimnasio.'}
                          </p>
                          <div className="price-card__footer">
                            {plan.imageSrc ? (
                              <button
                                className="price-card__zoom"
                                type="button"
                                onClick={() =>
                                  setLightbox({ src: plan.imageSrc, alt: `Tarifa ${planLabel}` })
                                }
                                aria-label={`Ver tarifa ${planLabel} en grande`}
                              >
                                Ver tarifa
                                <Icon name="expand" size={16} />
                              </button>
                            ) : (
                              <span />
                            )}
                          </div>
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
                  {schedule.map((slot) => (
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