import { Link, NavLink } from 'react-router-dom'

const sectionLinks = [
  { href: '/#entrenamientos', label: 'Entrenamientos', icon: 'dumbbell' },
  { href: '/#galeria', label: 'Galería', icon: 'gallery' },
  { href: '/#entrenadores', label: 'Entrenadores', icon: 'trainers' },
]

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

function NavIcon({ name }) {
  if (name === 'dumbbell') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M3 9h2v6H3zM19 9h2v6h-2zM6 8h2v8H6zM16 8h2v8h-2zM9 11h6v2H9z" />
      </svg>
    )
  }

  if (name === 'gallery') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 5h16v14H4z" />
        <path d="m7 15 3-3 2 2 3-4 2 5" />
        <circle cx="9" cy="9" r="1.2" />
      </svg>
    )
  }

  if (name === 'trainers') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="9" cy="8" r="2" />
        <circle cx="15" cy="8" r="2" />
        <path d="M5.5 17c.4-2 1.7-3 3.5-3s3.1 1 3.5 3" />
        <path d="M11.5 17c.4-2 1.7-3 3.5-3s3.1 1 3.5 3" />
      </svg>
    )
  }

  if (name === 'schedule') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="4" y="5" width="16" height="15" rx="1" />
        <path d="M8 3v4M16 3v4M4 10h16" />
      </svg>
    )
  }

  if (name === 'contact') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M5 6h14v10H8l-3 3V6Z" />
      </svg>
    )
  }

  return null
}

function SiteHeader({ brandName, brandLogoSrc }) {
  return (
    <header className="site-header">
      <NavLink className="site-header__brand" to="/">
        {brandLogoSrc ? (
          <img className="site-header__brand-icon" src={brandLogoSrc} alt="" aria-hidden="true" />
        ) : (
          <span className="site-header__brand-icon site-header__brand-icon--fallback" aria-hidden="true">
            A
          </span>
        )}
        <span>{brandName}</span>
      </NavLink>

      <nav className="site-header__nav" aria-label="Secciones principales">
        {sectionLinks.map((link) => (
          <Link key={link.href} className="site-header__link" to={link.href}>
            <span className="site-header__link-icon" aria-hidden="true">
              <NavIcon name={link.icon} />
            </span>
            <span>{link.label}</span>
          </Link>
        ))}
        <NavLink
          className={({ isActive }) =>
            isActive ? 'site-header__link site-header__link--active' : 'site-header__link'
          }
          to="/tarifas-horarios"
        >
          <span className="site-header__link-icon" aria-hidden="true">
            <NavIcon name="schedule" />
          </span>
          <span>Tarifas y horarios</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'site-header__link site-header__link--active' : 'site-header__link'
          }
          to="/contacto"
        >
          <span className="site-header__link-icon" aria-hidden="true">
            <NavIcon name="contact" />
          </span>
          <span>Contacto</span>
        </NavLink>
      </nav>

      <nav className="site-header__social" aria-label="Redes sociales">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            className="site-header__social-link"
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
    </header>
  )
}

export default SiteHeader
