const DEFAULT_COUNTRY_CODE = '34'

const toDigits = (phone) => (typeof phone === 'string' ? phone.replace(/\D/g, '') : '')

const hasCountryCode = (digits) =>
  digits.startsWith(`00${DEFAULT_COUNTRY_CODE}`) || digits.startsWith(DEFAULT_COUNTRY_CODE)

/**
 * Normaliza un teléfono español a E.164 (+34616725294).
 * Acepta "616 725 294", "+34 616 725 294" o "0034616725294".
 */
export const toE164 = (phone) => {
  const digits = toDigits(phone)

  if (!digits) {
    return ''
  }

  if (digits.startsWith(`00${DEFAULT_COUNTRY_CODE}`)) {
    return `+${digits.slice(2 + DEFAULT_COUNTRY_CODE.length)}`
  }

  if (hasCountryCode(digits)) {
    return `+${digits}`
  }

  return `+${DEFAULT_COUNTRY_CODE}${digits.replace(/^0+/, '')}`
}

export const toTelHref = (phone) => {
  const digits = toDigits(phone)
  return digits ? `tel:${digits}` : ''
}

/**
 * Enlace wa.me válido: exige E.164 con prefijo de país (sin él devuelve
 * "Phone number shared via url is invalid").
 */
export const toWhatsAppHref = (phone) => {
  const e164 = toE164(phone)
  return e164 ? `https://wa.me/${e164.replace(/^\+/, '')}` : ''
}
