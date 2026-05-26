import { useRef, useState } from 'react'

const DEFAULT_MIN_SUBMIT_DELAY_MS = 3000

const initialState = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

function ContactForm({ formspreeEndpoint, minSubmitDelayMs = DEFAULT_MIN_SUBMIT_DELAY_MS }) {
  const [formData, setFormData] = useState(initialState)
  const [honeypot, setHoneypot] = useState('')
  const [submitStatus, setSubmitStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const formStartedAtRef = useRef(Date.now())
  const minDelayMs =
    Number.isFinite(minSubmitDelayMs) && minSubmitDelayMs >= 0
      ? minSubmitDelayMs
      : DEFAULT_MIN_SUBMIT_DELAY_MS

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))

    if (submitStatus !== 'idle') {
      setSubmitStatus('idle')
      setErrorMessage('')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const elapsedMs = Date.now() - formStartedAtRef.current

    if (elapsedMs < minDelayMs) {
      setSubmitStatus('error')
      setErrorMessage('Espera un momento antes de enviar el formulario.')
      return
    }

    if (honeypot.trim()) {
      setSubmitStatus('success')
      setFormData(initialState)
      setHoneypot('')
      formStartedAtRef.current = Date.now()
      return
    }

    if (!formspreeEndpoint) {
      setSubmitStatus('error')
      setErrorMessage('Falta configurar el endpoint de Formspree.')
      return
    }

    setSubmitStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          _subject: `Contacto web Atlas Center - ${formData.name}`,
          _replyto: formData.email,
          source: window.location.href,
          _gotcha: honeypot,
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        const formspreeMessage =
          Array.isArray(data.errors) && data.errors.length > 0
            ? data.errors[0].message
            : data.error

        throw new Error(formspreeMessage || 'No se pudo enviar el mensaje.')
      }

      setSubmitStatus('success')
      setFormData(initialState)
      setHoneypot('')
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error.message || 'Ha ocurrido un error al enviar el mensaje.')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label className="field">
        Nombre
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          autoComplete="name"
          required
        />
      </label>

      <label className="field">
        Email
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
      </label>

      <label className="field">
        Teléfono
        <input
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          autoComplete="tel"
          inputMode="tel"
        />
      </label>

      <label className="field">
        Mensaje
        <textarea
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
        />
      </label>

      <input
        type="text"
        name="_gotcha"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
      />

      <button className="btn btn--primary" type="submit" disabled={submitStatus === 'submitting'}>
        {submitStatus === 'submitting' ? 'Enviando...' : 'Enviar mensaje'}
      </button>

      {submitStatus === 'success' && (
        <p className="contact-form__feedback" role="status" aria-live="polite">
          Gracias. Tu mensaje se ha enviado correctamente.
        </p>
      )}

      {submitStatus === 'error' && (
        <p className="contact-form__feedback" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  )
}

export default ContactForm
