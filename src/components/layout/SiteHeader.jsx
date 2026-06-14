import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const pageLinks = [
  { to: '/', label: 'Inicio', icon: 'home' },
  { to: '/equipo', label: 'Equipo', icon: 'equipo' },
  { to: '/fisioterapia', label: 'Fisioterapia', icon: 'physio' },
  { to: '/pilates-zenn', label: 'Pilates y Zenn', icon: 'pilates' },
  { to: '/tarifas-horarios', label: 'Tarifas y horarios', icon: 'schedule' },
  { to: '/contacto', label: 'Contacto', icon: 'contact' },
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
    href: 'https://www.facebook.com/profile.php?id=61586132360765&locale=es_ES',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M14.5 8h2V5h-2.3C11.8 5 11 6.3 11 8.1V10H9v3h2v6h3v-6h2.2l.3-3H14V8.4c0-.3.2-.4.5-.4Z" />
      </svg>
    ),
  },
]

function NavIcon({ name }) {
  if (name === 'home') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V11.5Z" />
        <path d="M9 21V12h6v9" />
      </svg>
    )
  }

  if (name === 'dumbbell') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M3 9h2v6H3zM19 9h2v6h-2zM6 8h2v8H6zM16 8h2v8h-2zM9 11h6v2H9z" />
      </svg>
    )
  }

  if (name === 'equipo') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="9" cy="8" r="2" />
        <circle cx="15" cy="8" r="2" />
        <path d="M5.5 17c.4-2 1.7-3 3.5-3s3.1 1 3.5 3" />
        <path d="M11.5 17c.4-2 1.7-3 3.5-3s3.1 1 3.5 3" />
      </svg>
    )
  }

  if (name === 'physio') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 3c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3Z" />
        <path d="M7 21v-4c0-2.2 1.8-4 5-4s5 1.8 5 4v4" />
        <path d="M9 15v6M15 15v6" />
      </svg>
    )
  }

  if (name === 'pilates') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="5" r="2" />
        <path d="M12 9v5" />
        <path d="M8 11c0 0 1.5 3 4 3s4-3 4-3" />
        <path d="M10 17l-2 4M14 17l2 4" />
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen((value) => !value)
  }

  useEffect(() => {
    closeMenu()
  }, [location.pathname])

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  return (
    <header className={isMenuOpen ? 'site-header site-header--menu-open' : 'site-header'}>
      <NavLink className="site-header__brand" to="/" onClick={closeMenu}>
        {brandLogoSrc ? (
          <img
            className="site-header__brand-icon"
            src={brandLogoSrc}
            alt=""
            width="46"
            height="46"
            decoding="async"
            aria-hidden="true"
          />
        ) : (
          <span className="site-header__brand-icon site-header__brand-icon--fallback" aria-hidden="true">
            A
          </span>
        )}
        <span>{brandName}</span>
      </NavLink>

      <button
        type="button"
        className="site-header__menu-toggle"
        aria-expanded={isMenuOpen}
        aria-controls="site-mobile-menu"
        aria-label={isMenuOpen ? 'Cerrar menú principal' : 'Abrir menú principal'}
        onClick={toggleMenu}
      >
        <span className="site-header__menu-line" aria-hidden="true"></span>
        <span className="site-header__menu-line" aria-hidden="true"></span>
        <span className="site-header__menu-line" aria-hidden="true"></span>
      </button>

      <div
        className="site-header__menu-backdrop"
        onClick={closeMenu}
        aria-hidden="true"
      ></div>

      <div className="site-header__menu-shell" id="site-mobile-menu">
        <button
          type="button"
          className="site-header__menu-close"
          onClick={closeMenu}
          aria-label="Cerrar menú"
        >
          Cerrar
        </button>

        <nav className="site-header__nav" aria-label="Secciones principales">
          {pageLinks.map((link) => (
            <NavLink
              key={link.to}
              className={({ isActive }) =>
                isActive ? 'site-header__link site-header__link--active' : 'site-header__link'
              }
              to={link.to}
              onClick={closeMenu}
            >
              <span className="site-header__link-icon" aria-hidden="true">
                <NavIcon name={link.icon} />
              </span>
              <span>{link.label}</span>
            </NavLink>
          ))}
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
              onClick={closeMenu}
            >
              {link.icon}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default SiteHeader
