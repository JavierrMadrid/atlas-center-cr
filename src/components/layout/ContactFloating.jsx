import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import { toTelHref, toWhatsAppHref } from '../../utils/phone'

function ContactFloating({ contact }) {
  const [collapsed, setCollapsed] = useState(false)

  const primaryPhone = contact?.phones?.[0] || ''
  const telHref = toTelHref(primaryPhone)
  const whatsappHref = toWhatsAppHref(primaryPhone)
  const title = contact?.title || 'Empieza esta semana'
  const description =
    contact?.description || 'Primera clase guiada para conocer tu nivel y crear tu ruta de progresión.'
  const buttonLabel = contact?.buttonLabel || 'Llamar al gimnasio'

  return (
    <>
      <aside
        className={`contact-float${collapsed ? ' contact-float--collapsed' : ''}`}
        aria-label="Contacto rápido"
      >
        <button
          type="button"
          className="contact-float__pill"
          onClick={() => setCollapsed(false)}
          aria-expanded={!collapsed}
          aria-label={`Expandir ${title}`}
        >
          <Icon name="phone" size={18} />
          <span>{title}</span>
          <span className="contact-float__minimize contact-float__deploy" aria-hidden="true">
            <Icon name="caretUp" size={16} />
          </span>
        </button>

        <div className="contact-float__card">
          <div className="contact-float__head">
            <h2>{title}</h2>
            <button
              type="button"
              className="contact-float__minimize"
              onClick={() => setCollapsed(true)}
              aria-label={`Minimizar ${title}`}
            >
              <Icon name="caretDown" size={16} />
            </button>
          </div>

          <p className="contact-float__text">{description}</p>

          <div className="contact-float__actions">
            <a className="contact-float__action" href={telHref} title={buttonLabel} aria-label={buttonLabel}>
              <Icon name="phone" size={18} />
            </a>
            {whatsappHref ? (
              <a
                className="contact-float__action"
                href={whatsappHref}
                target="_blank"
                rel="noreferrer noopener"
                title="WhatsApp"
                aria-label="WhatsApp"
              >
                <Icon name="whatsapp" size={18} />
              </a>
            ) : null}
            <Link
              className="contact-float__action"
              to="/contacto"
              title="Escribir por contacto"
              aria-label="Escribir por contacto"
            >
              <Icon name="contact" size={18} />
            </Link>
          </div>
        </div>
      </aside>

      <nav className="contact-float__bar" aria-label="Contacto rápido">
        <a className="contact-float__bar-action" href={telHref}>
          <Icon name="phone" size={20} />
          <span>Llamar</span>
        </a>
        {whatsappHref ? (
          <a
            className="contact-float__bar-action"
            href={whatsappHref}
            target="_blank"
            rel="noreferrer noopener"
          >
            <Icon name="whatsapp" size={20} />
            <span>WhatsApp</span>
          </a>
        ) : null}
        <Link className="contact-float__bar-action" to="/contacto">
          <Icon name="contact" size={20} />
          <span>Contacto</span>
        </Link>
      </nav>
    </>
  )
}

export default ContactFloating