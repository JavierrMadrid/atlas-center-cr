import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Icon from '../ui/Icon'

const pageLinks = [
  { to: '/', label: 'Inicio', icon: 'home' },
  { to: '/equipo', label: 'Equipo', icon: 'team' },
  { to: '/fisioterapia', label: 'Fisioterapia', icon: 'physio' },
  { to: '/pilates', label: 'Pilates', icon: 'pilates' },
  { to: '/tarifas-horarios', label: 'Tarifas y horarios', icon: 'pricing' },
  { to: '/contacto', label: 'Contacto', icon: 'contact' },
]

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

function SiteHeader({ brandName, brandLogoSrc, phone }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const [previousPath, setPreviousPath] = useState(location.pathname)

  const closeMenu = () => setIsMenuOpen(false)
  const toggleMenu = () => setIsMenuOpen((value) => !value)

  if (previousPath !== location.pathname) {
    setPreviousPath(location.pathname)
    setIsMenuOpen(false)
  }

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

  const telHref = `tel:${(phone || '').replace(/\s+/g, '')}`

  return (
    <header className={isMenuOpen ? 'site-header site-header--menu-open' : 'site-header'}>
      <NavLink className="site-header__brand" to="/" onClick={closeMenu}>
        {brandLogoSrc ? (
          <img
            className="site-header__brand-icon"
            src={brandLogoSrc}
            alt=""
            width="38"
            height="38"
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

      <div className="site-header__menu-shell" id="site-mobile-menu">
        <button
          type="button"
          className="site-header__menu-close"
          onClick={closeMenu}
          aria-label="Cerrar menú"
        >
          <Icon name="close" size={20} />
        </button>

        <nav className="site-header__nav site-header__menu-nav" aria-label="Secciones principales">
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
                <Icon name={link.icon} size={20} />
              </span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <nav className="site-header__social site-header__menu-social" aria-label="Redes sociales">
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
              <Icon name={link.icon} size={20} />
            </a>
          ))}
        </nav>

        {phone ? (
          <a className="btn btn--primary btn--block site-header__menu-cta" href={telHref}>
            <Icon name="phone" size={16} className="btn__icon" />
            Llamar al gimnasio
          </a>
        ) : null}
      </div>

      <div className="site-header__right">
        <nav className="site-header__social" aria-label="Redes sociales">
          {socialLinks.slice(0, 2).map((link) => (
            <a
              key={link.label}
              className="site-header__social-link"
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={link.label}
              title={link.label}
            >
              <Icon name={link.icon} size={20} />
            </a>
          ))}
        </nav>
      </div>

      <button
        type="button"
        className="site-header__menu-toggle"
        aria-expanded={isMenuOpen}
        aria-controls="site-mobile-menu"
        aria-label={isMenuOpen ? 'Cerrar menú principal' : 'Abrir menú principal'}
        onClick={toggleMenu}
      >
        <Icon name={isMenuOpen ? 'close' : 'menu'} size={22} />
      </button>

      <div className="site-header__menu-backdrop" onClick={closeMenu} aria-hidden="true"></div>
    </header>
  )
}

export default SiteHeader