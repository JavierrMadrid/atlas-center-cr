import ContactForm from '../components/forms/ContactForm'
import Icon from '../components/ui/Icon'
import PageShell from '../components/layout/PageShell'
import SectionHeading from '../components/ui/SectionHeading'
import { toTelHref } from '../utils/phone'

function ContactPage({ content }) {
  const { contactPage } = content
  const schedule = Array.isArray(content.schedule) ? content.schedule : []
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    contactPage.address,
  )}`

  return (
    <PageShell>
      <section className="section">
        <div className="container">
          <SectionHeading
            level="h1"
            title="Contacta con tu gimnasio en Ciudad Real"
          />

          <div className="contact__grid">
            <div className="contact__info">
              <div className="contact__block">
                <h2>Dónde estamos</h2>
                <p>{contactPage.address}</p>
              </div>

              <div className="contact__block">
                <h2>Teléfonos</h2>
                {contactPage.phones.length > 0 ? (
                  <ul className="contact__phone-list">
                    {contactPage.phones.map((phone) => (
                      <li key={phone}>
                        <a href={toTelHref(phone)}>
                          <Icon
                            name="phone"
                            size={16}
                            style={{ marginRight: 8, verticalAlign: '-2px' }}
                          />
                          {phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Escríbenos por el formulario y te llamamos.</p>
                )}
              </div>

              <div className="contact__block">
                <h2>Email</h2>
                <p>
                  <a href={`mailto:${contactPage.email}`}>{contactPage.email}</a>
                </p>
              </div>

              <div className="contact__block">
                <h2>Horarios</h2>
                {schedule.length > 0 ? (
                  <div className="schedule">
                    <div className="schedule__rows">
                      {schedule.map((slot) => (
                        <div className="schedule__row" key={slot.day}>
                          <span className="schedule__row-day">{slot.day}</span>
                          <span className="schedule__row-hours">{slot.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p>Consúltanos por teléfono o por el formulario.</p>
                )}
              </div>

              <div className="contact__map">
                <iframe
                  title="Mapa del gimnasio Atlas Center"
                  src={contactPage.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <a
                  className="contact__map-link"
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cómo llegar en Google Maps
                  <Icon name="arrowRight" size={16} />
                </a>
              </div>
            </div>

            <div className="contact__form-wrap">
              <h2>Escríbenos</h2>
              <p>Te respondemos con la mejor opción según tus objetivos y horario.</p>
              <ContactForm
                formspreeEndpoint={contactPage.formspreeEndpoint}
                minSubmitDelayMs={contactPage.antiSpamMinSubmitDelayMs}
              />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}

export default ContactPage