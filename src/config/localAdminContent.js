import localAdminPanel from './localAdminPanel.json'

const safeArray = (value) => (Array.isArray(value) ? value : [])

const normalizeMapEmbedUrl = (mapEmbedUrl, address) => {
  const normalizedAddress = typeof address === 'string' ? address.trim() : ''
  const buildFromAddress = () =>
    normalizedAddress
      ? `https://www.google.com/maps?q=${encodeURIComponent(normalizedAddress)}&output=embed`
      : ''

  if (typeof mapEmbedUrl !== 'string' || !mapEmbedUrl.trim()) {
    return buildFromAddress()
  }

  const rawUrl = mapEmbedUrl.trim()

  if (/^https:\/\/www\.google\.com\/maps\/embed\?/i.test(rawUrl)) {
    return rawUrl
  }

  if (
    /maps\.app\.goo\.gl|\/maps\/place\/|\/maps\/search\/|google\.com\/maps\?/.test(rawUrl)
  ) {
    return buildFromAddress() || rawUrl
  }

  return rawUrl
}

const defaultBrand = {
  name: 'ATLAS CENTER',
  heroName: 'Entrena con propósito',
  kicker: 'Centro de entrenamiento',
  claim: '',
  description:
    'Entrenamientos guiados que mezclan entrenamiento funcional y musculación para que ganes resistencia real, técnica y potencia para superarte cada día.',
  headerLogoSrc: '',
  heroLogoSrc: '',
  primaryActionLabel: 'Ver entrenamientos',
  primaryActionTarget: '#entrenamientos',
  secondaryActionLabel: 'Consulta tarifas',
  secondaryActionTarget: '/tarifas-horarios',
}

const defaultContact = {
  phones: ['+34 616725294', '+34000000001'],
  title: 'Empieza esta semana',
  description:
    'Primera clase guiada para conocer tu nivel y crear tu ruta de progresión.',
  buttonLabel: 'Llamar al gimnasio',
}

const defaultContactPage = {
  phones: ['+34 616725294', '+34000000001'],
  email: 'info@atlas-center.com',
  formspreeEndpoint: '',
  antiSpamMinSubmitDelayMs: 3000,
  address: 'Calle Ronda de Calatrava, Local 2, 13003 Ciudad Real',
  mapEmbedUrl:
    'https://www.google.com/maps?q=Calle%20Ronda%20de%20Calatrava%2C%20Local%202%2C%2013003%20Ciudad%20Real&output=embed',
}

const defaultLegalItems = [
  {
    id: 'aviso-legal',
    title: 'Aviso legal',
    text:
      'Titular del sitio: Atlas Center. Este sitio tiene carácter informativo y el uso de sus contenidos implica la aceptación de este aviso.',
  },
  {
    id: 'privacidad',
    title: 'Política de privacidad',
    text:
      'Los datos enviados por formularios se usan solo para atender solicitudes de información y gestionar la comunicación con el gimnasio.',
  },
  {
    id: 'cookies',
    title: 'Política de cookies',
    text:
      'Este sitio puede usar cookies técnicas necesarias para su funcionamiento y, en su caso, cookies de analítica según configuración vigente.',
  },
  {
    id: 'condiciones',
    title: 'Condiciones de uso',
    text:
      'La navegación debe realizarse de forma lícita y respetuosa. Queda prohibido el uso del sitio para actividades fraudulentas o ilegales.',
  },
]

export const localAdminContent = {
  brand: { ...defaultBrand, ...localAdminPanel.brand },
  contact: {
    ...defaultContact,
    ...localAdminPanel.contact,
    phones: safeArray(localAdminPanel.contact?.phones).length
      ? safeArray(localAdminPanel.contact?.phones)
      : defaultContact.phones,
  },
  contactPage: {
    ...defaultContactPage,
    ...localAdminPanel.contactPage,
    phones: safeArray(localAdminPanel.contactPage?.phones).length
      ? safeArray(localAdminPanel.contactPage?.phones)
      : defaultContactPage.phones,
    mapEmbedUrl: normalizeMapEmbedUrl(
      localAdminPanel.contactPage?.mapEmbedUrl ?? defaultContactPage.mapEmbedUrl,
      localAdminPanel.contactPage?.address ?? defaultContactPage.address,
    ),
  },
  trainingPrograms: safeArray(localAdminPanel.trainingPrograms),
  carouselImages: safeArray(localAdminPanel.carouselImages),
  trainers: safeArray(localAdminPanel.trainers),
  pricingPlans: safeArray(localAdminPanel.pricingPlans),
  physiotherapyPrices: safeArray(localAdminPanel.physiotherapyPrices),
  pricingPolicy:
    localAdminPanel.pricingPolicy ??
    'Todos los bonos se deben gastar en un plazo máximo de 40 días.',
  schedule: safeArray(localAdminPanel.schedule),
  legalItems: safeArray(localAdminPanel.legalItems).length
    ? safeArray(localAdminPanel.legalItems)
    : defaultLegalItems,
}
