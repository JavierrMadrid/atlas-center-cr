import { useState } from 'react'

const initialState = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

function ContactForm() {
  const [formData, setFormData] = useState(initialState)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))

    if (isSubmitted) {
      setIsSubmitted(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitted(true)
    setFormData(initialState)
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

      <button className="btn btn--primary" type="submit">
        Enviar mensaje
      </button>

      {isSubmitted && (
        <p className="contact-form__feedback" role="status" aria-live="polite">
          Gracias. Hemos recibido tu mensaje y te contactaremos pronto.
        </p>
      )}
    </form>
  )
}

export default ContactForm
