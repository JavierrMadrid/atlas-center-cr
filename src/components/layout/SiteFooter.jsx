import { NavLink } from 'react-router-dom'
import Icon from '../ui/Icon'

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/atlascentercr?igsh=MXZlYXRzeHV1ejBlOA==',
    icon: 'instagram',
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/616725294',
    icon: 'whatsapp',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61586132360765&locale=es_ES',
    icon: 'facebook',
  },
]

const toTelHref = (phone) => `tel:${phone.replace(/\s+/g, '')}`

function SiteFooter({ brand, contactPage, legalItems, schedule }) {
  const currentYear = new Date().getFullYear()
  const hours = Array.isArray(schedule) ? schedule : []

  return (
    <footer className="site-footer" aria-label="Pie de página">
      <div className="container site-footer__inner">
        <div className="site-footer__grid">
          <section className="site-footer__brand">
            <span className="site-footer__logo">
              {brand.headerLogoSrc ? (
                <img src={brand.headerLogoSrc} alt="" width="34" height="34" decoding="async" aria-hidden="true" />
              ) : null}
              <span>{brand.name}</span>
            </span>
            <p className="site-footer__blurb">
              Centro de entrenamiento en Ciudad Real: funcional e híbrido guiado en grupos
              reducidos, sala open, pilates y fisioterapia deportiva.
            </p>
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
                  <Icon name={link.icon} size={18} />
                </a>
              ))}
            </nav>
          </section>

          <section>
            <h3>Horarios</h3>
            <ul className="site-footer__list">
              {hours.map((slot) => (
                <li key={slot.day}>
                  <NavLink to="/tarifas-horarios#tarifas-horarios">
                    {slot.day}: {slot.hours}
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Accesos rápidos</h3>
            <ul className="site-footer__list">
              <li>
                <NavLink to="/#entrenamientos">Entrenamientos</NavLink>
              </li>
              <li>
                <NavLink to="/#galeria">Galería</NavLink>
              </li>
              <li>
                <NavLink to="/equipo">Equipo</NavLink>
              </li>
              <li>
                <NavLink to="/tarifas-horarios">Tarifas y horarios</NavLink>
              </li>
              <li>
                <NavLink to="/contacto">Contacto</NavLink>
              </li>
            </ul>
          </section>

          <section>
            <h3>Contacto</h3>
            <ul className="site-footer__list">
              {contactPage.phones.map((phone) => (
                <li key={phone}>
                  <a href={toTelHref(phone)}>{phone}</a>
                </li>
              ))}
              <li>
                <a href={`mailto:${contactPage.email}`}>{contactPage.email}</a>
              </li>
              <li>{contactPage.address}</li>
            </ul>
          </section>
        </div>

        <div className="site-footer__legal">
          {legalItems.map((item) => (
            <details key={item.id} id={`legal-${item.id}`}>
              <summary>{item.title}</summary>
              <div className="site-footer__legal-item">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="site-footer__bottom">
          <span>
            {brand.name} · {currentYear}
          </span>
          <nav className="site-footer__bottom-links" aria-label="Información legal">
            {legalItems.map((item) => (
              <a key={item.id} href={`#legal-${item.id}`}>
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter