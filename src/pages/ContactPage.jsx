import ContactForm from '../components/forms/ContactForm'

const toTelHref = (phone) => `tel:${phone.replace(/\s+/g, '')}`

function ContactPage({ content }) {
  const { contactPage } = content

  return (
    <main className="contact-page">
      <section className="section section--contact-hero section--reveal">
        <h1>Contacto</h1>
        <p>
          Ven a conocer Atlas Center, consulta nuestras tarifas y horarios, o escríbenos para cualquier duda. Estamos aquí para ayudarte.
        </p>
      </section>

      <section className="section section--contact-layout section--reveal">
        <article className="panel">
          <h2>Dónde estamos</h2>
          <p>{contactPage.address}</p>
          <p>
            <strong>Teléfonos:</strong>
          </p>
          <ul className="contact-phone-list">
            {contactPage.phones.map((phone) => (
              <li key={phone}>
                <a href={toTelHref(phone)}>{phone}</a>
              </li>
            ))}
          </ul>
          <p>
            <strong>Email:</strong> <a href={`mailto:${contactPage.email}`}>{contactPage.email}</a>
          </p>
          <div className="contact-map">
            <iframe
              title="Mapa del gimnasio Atlas Center"
              src={contactPage.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </article>

        <article className="panel">
          <h2>Escríbenos</h2>
          <p>Te respondemos con la mejor opción según tus objetivos y horario.</p>
          <ContactForm
            formspreeEndpoint={contactPage.formspreeEndpoint}
            minSubmitDelayMs={contactPage.antiSpamMinSubmitDelayMs}
          />
        </article>
      </section>
    </main>
  )
}

export default ContactPage
