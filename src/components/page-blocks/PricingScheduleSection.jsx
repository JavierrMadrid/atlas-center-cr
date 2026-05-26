import { useState } from 'react'
import SectionHeading from '../ui/SectionHeading'

function PricingScheduleSection({ pricingPlans, pricingPolicy, schedule, stacked = false }) {
  const [lightbox, setLightbox] = useState(null)
  const normalizePlanName = (name) =>
    name
      .replace(/^\s*grupos reducidos\s*-\s*/i, '')
      .replace(/^\s*(entrenamiento\s*)?guiad[oa]s?\s*-\s*/i, '')
      .replace(/^\s*solo open\s*-\s*/i, '')
      .replace(/^\s*open\s*-\s*/i, '')
      .trim()

  const guidedPlans = pricingPlans.filter((plan) =>
    /grupos reducidos|guiad[oa]s?/i.test(plan.name),
  )

  const openPlans = pricingPlans.filter((plan) =>
    /solo open|\bopen\b/i.test(plan.name),
  )

  const otherPlans = pricingPlans.filter(
    (plan) => !guidedPlans.includes(plan) && !openPlans.includes(plan),
  )

  const planGroups = [
    {
      key: 'guided',
      id: 'tarifas-grupos-reducidos',
      title: 'Guiado - Entrenamientos guiados con grupos reducidos de 5 personas máximo',
      plans: guidedPlans,
    },
    {
      key: 'open',
      id: 'tarifas-solo-open',
      title: 'Open - Acceso al centro para entrenamientos libres',
      plans: [...openPlans, ...otherPlans],
    },
  ].filter((group) => group.plans.length > 0)

  const renderPlanImages = (plans) => (
    <div className="pricing-group__cards">
      {plans.map((plan) => {
        const planLabel = normalizePlanName(plan.name)

        return (
          <article key={plan.name} className="pricing-image-card">
            <h5>{planLabel}</h5>
            {plan.imageSrc ? (
              <button
                className="pricing-image-btn"
                onClick={() => setLightbox({ src: plan.imageSrc, alt: `Tarifa ${planLabel}` })}
                aria-label={`Ver tarifa ${planLabel} en grande`}
              >
                <img
                  src={plan.imageSrc}
                  alt={`Tarifa ${planLabel}`}
                  loading="lazy"
                />
              </button>
            ) : (
              <div className="pricing-image-placeholder">
                Imagen pendiente para {planLabel}
              </div>
            )}
          </article>
        )
      })}
    </div>
  )

  return (
    <>
    {lightbox && (
      <div
        className="pricing-lightbox"
        role="dialog"
        aria-modal="true"
        aria-label={lightbox.alt}
        onClick={() => setLightbox(null)}
      >
        <button className="pricing-lightbox__close" onClick={() => setLightbox(null)} aria-label="Cerrar">&times;</button>
        <img src={lightbox.src} alt={lightbox.alt} onClick={(e) => e.stopPropagation()} />
      </div>
    )}
    <section id="tarifas-horarios" className="section pricing-section section--reveal">
      <SectionHeading
        title="Tarifas y horarios"
        description={pricingPolicy}
      />

      <div
        className={
          stacked
            ? 'pricing-schedule-grid pricing-schedule-grid--stack'
            : 'pricing-schedule-grid'
        }
      >
        <article className="panel panel--pricing">
          <h3>Tarifas</h3>

          <div className="pricing-groups">
            {planGroups.map((group) => (
              <div key={group.key} className="pricing-group">
                <h4 id={group.id}>{group.title}</h4>
                {renderPlanImages(group.plans)}
              </div>
            ))}
          </div>

        </article>

        <article className="panel panel--schedule">
          <h3>Horarios</h3>
          <ul className="list-clean">
            {schedule.map((slot) => (
              <li key={slot.day} className="schedule-item">
                <span>{slot.day}</span>
                <strong>{slot.hours}</strong>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
    </>
  )
}

export default PricingScheduleSection
