import { Link, NavLink } from 'react-router-dom'

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/atlascentercr?igsh=MXZlYXRzeHV1ejBlOA==',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M20.5 11.5a8.5 8.5 0 0 1-12.2 7.6L3.5 20.5l1.4-4.6A8.5 8.5 0 1 1 20.5 11.5Z" />
        <path d="M9 8.8c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.3l1 2.3c.1.3 0 .5-.1.6l-.5.6c-.1.1-.2.3-.1.4.3.6 1.4 2.2 3.1 2.9.2.1.3 0 .4-.1l.7-.8c.2-.2.4-.2.6-.1l2.2 1.1c.2.1.3.3.3.5v.4c0 .4-.2.8-.6 1-1.1.6-2.3.5-3.5 0-1.7-.6-3.1-1.8-4.3-3.2-1-1.3-1.7-2.7-1.4-4.3Z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M14.5 8h2V5h-2.3C11.8 5 11 6.3 11 8.1V10H9v3h2v6h3v-6h2.2l.3-3H14V8.4c0-.3.2-.4.5-.4Z" />
      </svg>
    ),
  },
]

const toTelHref = (phone) => `tel:${phone.replace(/\s+/g, '')}`

const formatScheduleSummary = (schedule) => {
  if (!Array.isArray(schedule) || schedule.length === 0) {
    return 'Consulta el horario actualizado en la sección de tarifas y horarios.'
  }

  return schedule
    .map((slot) => `${slot.day}: ${slot.hours}`)
    .join(' · ')
}

function SiteFooter({ brand, contactPage, legalItems, schedule }) {
  const currentYear = new Date().getFullYear()
  const scheduleSummary = formatScheduleSummary(schedule)

  return (
    <footer id="contacto" className="site-footer section--reveal" aria-label="Pie de página">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <section className="site-footer__column">
            <h3>Horarios</h3>
            <p>{scheduleSummary}</p>
          </section>

          <section className="site-footer__column">
            <h3>Contacto</h3>
            <ul className="site-footer__list">
              {contactPage.phones.map((phone) => (
                <li key={phone}>
                  <a href={toTelHref(phone)}>{phone}</a>
                </li>
              ))}
            </ul>
            <p>
              <a href={`mailto:${contactPage.email}`}>{contactPage.email}</a>
            </p>
            <p>{contactPage.address}</p>
            <p>
              <Link to="/contacto">Ver página de contacto completa</Link>
            </p>
          </section>

          <section className="site-footer__column">
            <h3>Accesos rápidos</h3>
            <nav className="site-footer__nav" aria-label="Accesos rápidos del pie de página">
              <Link to="/#entrenamientos">Entrenamientos</Link>
              <Link to="/#galeria">Galería</Link>
              <Link to="/#entrenadores">Entrenadores</Link>
              <NavLink to="/tarifas-horarios">Tarifas y horarios</NavLink>
            </nav>
            <div className="site-footer__social-wrap">
              <h3 className="site-footer__social-title">Redes sociales</h3>
              <nav className="site-footer__social" aria-label="Redes sociales">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    className="site-footer__social-link"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={link.label}
                    title={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </nav>
            </div>
          </section>
        </div>

        <p className="site-footer__copy">{brand.name} | {currentYear}</p>

        <nav className="site-footer__legal-links" aria-label="Enlaces legales">
          {legalItems.map((item) => (
            <a key={item.id} href={`#legal-${item.id}`}>
              {item.title}
            </a>
          ))}
        </nav>

        <section className="site-footer__legal" aria-label="Información legal">
          {legalItems.map((item) => (
            <article key={item.id} id={`legal-${item.id}`} className="site-footer__legal-item">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </section>
      </div>
    </footer>
  )
}

export default SiteFooter