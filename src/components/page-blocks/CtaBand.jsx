import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'

function CtaBand({ contact, schedule }) {
  const primaryPhone = contact?.phones?.[0] || ''
  const telHref = `tel:${primaryPhone.replace(/\s+/g, '')}`
  const hours = Array.isArray(schedule) ? schedule : []

  return (
    <section className="section cta-band">
      <div className="container">
        <Reveal>
          <div className="cta-band__inner">
            <div className="cta-band__grid">
              <div>
                <h2 className="cta-band__title">{contact?.title || 'Empieza esta semana'}</h2>
                <p className="cta-band__text">
                  {contact?.description ||
                    'Primera clase guiada para conocer tu nivel y crear tu ruta de progresión.'}
                </p>
                <div className="cta-band__actions">
                  <a className="btn btn--primary" href={telHref}>
                    <Icon name="phone" size={16} className="btn__icon" />
                    {contact?.buttonLabel || 'Llamar al gimnasio'}
                  </a>
                  <Link className="btn btn--ghost" to="/contacto">
                    Escribir por contacto
                  </Link>
                </div>
              </div>

              <div className="cta-band__aside">
                <div className="cta-band__hours">
                  {hours.map((slot) => (
                    <div className="cta-band__hours-row" key={slot.day}>
                      <span>{slot.day}</span>
                      <strong>{slot.hours}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default CtaBand