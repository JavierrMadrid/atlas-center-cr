import { useEffect, useRef, useState } from 'react'

const DEFAULT_MIN_SUBMIT_DELAY_MS = 3000
const REQUEST_TIMEOUT_MS = 15000

const initialState = {
  name: '',
  email: '',
  phone: '',
  message: '',
  consent: false,
}

const FIELD_IDS = {
  name: 'contact-name',
  email: 'contact-email',
  phone: 'contact-phone',
  message: 'contact-message',
  consent: 'contact-consent',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_PATTERN = /^\+?[\d\s().-]{7,20}$/

function validate(values) {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'Escribe tu nombre.'
  }

  const email = values.email.trim()
  if (!email) {
    errors.email = 'Escribe tu email.'
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Escribe un email válido, por ejemplo nombre@dominio.com.'
  }

  const phone = values.phone.trim()
  if (phone && !PHONE_PATTERN.test(phone)) {
    errors.phone = 'Escribe un teléfono válido o déjalo vacío.'
  }

  const message = values.message.trim()
  if (!message) {
    errors.message = 'Escribe un mensaje.'
  } else if (message.length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres.'
  }

  if (!values.consent) {
    errors.consent = 'Necesitamos tu aceptación para poder responderte.'
  }

  return errors
}

function ContactForm({ formspreeEndpoint, minSubmitDelayMs = DEFAULT_MIN_SUBMIT_DELAY_MS }) {
  const [formData, setFormData] = useState(initialState)
  const [honeypot, setHoneypot] = useState('')
  const [submitStatus, setSubmitStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [errors, setErrors] = useState({})
  const formStartedAtRef = useRef(0)
  const formRef = useRef(null)
  const abortRef = useRef(null)
  const mountedRef = useRef(true)

  useEffect(() => {
    formStartedAtRef.current = Date.now()
    mountedRef.current = true

    return () => {
      mountedRef.current = false
      if (abortRef.current) {
        abortRef.current.abort()
        abortRef.current = null
      }
    }
  }, [])

  const minDelayMs =
    Number.isFinite(minSubmitDelayMs) && minSubmitDelayMs >= 0
      ? minSubmitDelayMs
      : DEFAULT_MIN_SUBMIT_DELAY_MS

  const handleChange = (event) => {
    const { name, type } = event.target
    const value = type === 'checkbox' ? event.target.checked : event.target.value

    setFormData((current) => ({ ...current, [name]: value }))
    setErrors((current) => (current[name] ? { ...current, [name]: undefined } : current))

    if (submitStatus !== 'idle') {
      setSubmitStatus('idle')
      setErrorMessage('')
    }
  }

  const focusFirstInvalid = (nextErrors) => {
    const firstInvalid = Object.keys(FIELD_IDS).find((key) => nextErrors[key])
    if (!firstInvalid) return

    requestAnimationFrame(() => {
      const field = formRef.current?.querySelector(`[name="${firstInvalid}"]`)
      if (field) field.focus()
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validate(formData)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setSubmitStatus('error')
      setErrorMessage('Revisa los campos marcados antes de enviar.')
      focusFirstInvalid(nextErrors)
      return
    }

    const elapsedMs = Date.now() - formStartedAtRef.current

    if (elapsedMs < minDelayMs) {
      setSubmitStatus('error')
      setErrorMessage('Espera un momento antes de enviar el formulario.')
      return
    }

    if (honeypot.trim()) {
      setSubmitStatus('success')
      setFormData(initialState)
      setErrors({})
      setHoneypot('')
      formStartedAtRef.current = Date.now()
      return
    }

    if (!formspreeEndpoint) {
      setSubmitStatus('error')
      setErrorMessage('Falta configurar el endpoint de Formspree.')
      return
    }

    const controller = new AbortController()
    abortRef.current = controller
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    setSubmitStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
          consent: formData.consent,
          _subject: `Contacto web Atlas Center - ${formData.name.trim()}`,
          _replyto: formData.email.trim(),
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

      if (!mountedRef.current) return

      setSubmitStatus('success')
      setFormData(initialState)
      setErrors({})
      setHoneypot('')
      formStartedAtRef.current = Date.now()
    } catch (error) {
      if (!mountedRef.current) return

      if (error?.name === 'AbortError') {
        setSubmitStatus('error')
        setErrorMessage(
          'La conexión ha tardado demasiado. Comprueba tu red y vuelve a intentarlo.',
        )
      } else {
        setSubmitStatus('error')
        setErrorMessage(error.message || 'Ha ocurrido un error al enviar el mensaje.')
      }
    } finally {
      window.clearTimeout(timeoutId)
      if (abortRef.current === controller) {
        abortRef.current = null
      }
    }
  }

  const fieldProps = (name) => ({
    id: FIELD_IDS[name],
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${FIELD_IDS[name]}-error` : undefined,
  })

  return (
    <form
      className="contact-form"
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-busy={submitStatus === 'submitting'}
    >
      <label className="field" htmlFor={FIELD_IDS.name}>
        Nombre
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          autoComplete="name"
          required
          {...fieldProps('name')}
        />
        {errors.name ? (
          <span className="field__error" id={`${FIELD_IDS.name}-error`}>
            {errors.name}
          </span>
        ) : null}
      </label>

      <label className="field" htmlFor={FIELD_IDS.email}>
        Email
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          inputMode="email"
          required
          {...fieldProps('email')}
        />
        {errors.email ? (
          <span className="field__error" id={`${FIELD_IDS.email}-error`}>
            {errors.email}
          </span>
        ) : null}
      </label>

      <label className="field" htmlFor={FIELD_IDS.phone}>
        Teléfono (opcional)
        <input
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          autoComplete="tel"
          inputMode="tel"
          {...fieldProps('phone')}
        />
        {errors.phone ? (
          <span className="field__error" id={`${FIELD_IDS.phone}-error`}>
            {errors.phone}
          </span>
        ) : null}
      </label>

      <label className="field" htmlFor={FIELD_IDS.message}>
        Mensaje
        <textarea
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
          {...fieldProps('message')}
        />
        {errors.message ? (
          <span className="field__error" id={`${FIELD_IDS.message}-error`}>
            {errors.message}
          </span>
        ) : null}
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

      <label className="contact-form__consent" htmlFor={FIELD_IDS.consent}>
        <input
          name="consent"
          id={FIELD_IDS.consent}
          type="checkbox"
          checked={formData.consent}
          onChange={handleChange}
          aria-invalid={errors.consent ? true : undefined}
          aria-describedby={errors.consent ? `${FIELD_IDS.consent}-error` : undefined}
        />
        <span>
          Acepto que Atlas Center use estos datos para responder a mi solicitud, según la{' '}
          <a href="#legal-privacidad">política de privacidad</a>.
        </span>
      </label>
      {errors.consent ? (
        <span className="field__error" id={`${FIELD_IDS.consent}-error`}>
          {errors.consent}
        </span>
      ) : null}

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
