import ContactForm from '../components/forms/ContactForm'
import Icon from '../components/ui/Icon'
import PageShell from '../components/layout/PageShell'
import SectionHeading from '../components/ui/SectionHeading'

const toTelHref = (phone) => `tel:${phone.replace(/\s+/g, '')}`

function ContactPage({ content }) {
  const { contactPage } = content

  return (
    <PageShell>
      <section className="section">
        <div className="container">
          <SectionHeading
            level="h1"
            title="Contacta con tu gimnasio en Ciudad Real"
            description="Atlas Center está en Calle Ronda de Calatrava, 13003 Ciudad Real. Escríbenos por formulario, email o teléfono y te orientamos sin compromiso."
          />

          <div className="contact__grid">
            <div className="contact__info">
              <div className="contact__block">
                <h3>Dónde estamos</h3>
                <p>{contactPage.address}</p>
              </div>

              <div className="contact__block">
                <h3>Teléfonos</h3>
                <ul className="contact__phone-list">
                  {contactPage.phones.map((phone) => (
                    <li key={phone}>
                      <a href={toTelHref(phone)}>
                        <Icon name="phone" size={16} style={{ marginRight: 8, verticalAlign: '-2px' }} />
                        {phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="contact__block">
                <h3>Email</h3>
                <p>
                  <a href={`mailto:${contactPage.email}`}>{contactPage.email}</a>
                </p>
              </div>

              <div className="contact__map">
                <iframe
                  title="Mapa del gimnasio Atlas Center"
                  src={contactPage.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
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