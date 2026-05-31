import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import SiteFooter from './components/layout/SiteFooter'
import SiteHeader from './components/layout/SiteHeader'
import { localAdminContent } from './config/localAdminContent'

const HomePage = lazy(() => import('./pages/HomePage'))
const PricingPage = lazy(() => import('./pages/PricingPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const TeamPage = lazy(() => import('./pages/TeamPage'))
const FisioterapiaPage = lazy(() => import('./pages/FisioterapiaPage'))
const PilatesYogaPage = lazy(() => import('./pages/PilatesYogaPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const HEADER_OFFSET_PX = 88

const SEO_BY_PATH = {
  '/': {
    title: 'Atlas Center | Centro Deportivo en Ciudad Real',
    description:
      'Centro deportivo especializado en entrenamientos mediante clases guiadas. Ofrecemos fisioterapia, yoga y sala de entrenamiento libre en Ciudad Real. Consulta horarios y tarifas en Atlas Center.',
  },
  '/equipo': {
    title: 'Equipo de Entrenadores | Atlas Center Ciudad Real',
    description:
      'Conoce al equipo de Atlas Center: entrenadores personales y especialistas en entrenamiento guiado y fisioterapia para mejorar salud, fuerza y rendimiento.',
  },
  '/fisioterapia': {
    title: 'Fisioterapia Deportiva en Ciudad Real | Atlas Center',
    description:
      'Servicio de fisioterapia deportiva en Atlas Center, con recuperación funcional, readaptacion y prevencion de lesiones para deportistas y personas activas.',
  },
  '/pilates-yoga': {
    title: 'Clases de Yoga y Pilates en Ciudad Real | Atlas Center',
    description:
      'Clases de yoga y pilates en Atlas Center para mejorar movilidad, control postural, respiracion y fuerza del core, con sesiones guiadas para todos los niveles en Ciudad Real.',
  },
  '/tarifas-horarios': {
    title: 'Tarifas y Horarios del Gimnasio | Atlas Center Ciudad Real',
    description:
      'Consulta tarifas y horarios de Atlas Center para entrenamiento en grupos reducidos, entrenamiento guiado, gimnasio open, yoga y pilates en Ciudad Real.',
  },
  '/contacto': {
    title: 'Contacto Atlas Center | Centro Deportivo en Ciudad Real',
    description:
      'Contacta con Atlas Center, centro deportivo y gimnasio en Ciudad Real. Direccion, telefonos, email y formulario para reservar entrenamiento y fisioterapia.',
  },
  '/404': {
    title: 'Pagina no encontrada | Atlas Center',
    description: 'La pagina solicitada no existe. Explora los servicios de Atlas Center en Ciudad Real.',
  },
}

const PATH_LABELS = {
  '/': 'Inicio',
  '/equipo': 'Equipo',
  '/fisioterapia': 'Fisioterapia',
  '/pilates-yoga': 'Yoga y Pilates',
  '/tarifas-horarios': 'Tarifas y Horarios',
  '/contacto': 'Contacto',
}

const hasReducedMotionPreference = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    const behavior = hasReducedMotionPreference() ? 'auto' : 'smooth'

    if (!location.hash) {
      window.scrollTo({ top: 0, behavior })
      return
    }

    const sectionId = location.hash.replace('#', '')
    const frameId = window.requestAnimationFrame(() => {
      const element = document.getElementById(sectionId)

      if (!element) {
        return
      }

      const targetTop =
        element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX

      window.scrollTo({ top: Math.max(targetTop, 0), behavior })
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [location.hash, location.pathname])

  return null
}

const ensureMetaTag = (attribute, key, content) => {
  if (!content) {
    return
  }

  const selector = `meta[${attribute}="${key}"]`
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

const ensureLinkTag = (rel, href) => {
  if (!href) {
    return
  }

  let element = document.head.querySelector(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

const ensureHreflangLink = (hreflang, href) => {
  if (!href || !hreflang) {
    return
  }

  const selector = `link[rel="alternate"][hreflang="${hreflang}"]`
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'alternate')
    element.setAttribute('hreflang', hreflang)
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

const toAbsoluteUrl = (value, origin) => {
  if (!value) {
    return ''
  }

  try {
    return new URL(value, origin).toString()
  } catch {
    return ''
  }
}

const normalizePhone = (phone) =>
  typeof phone === 'string' ? phone.replace(/\s+/g, '') : ''

const DAY_TOKEN_TO_SCHEMA = {
  lunes: ['MO'],
  martes: ['TU'],
  miercoles: ['WE'],
  miércoles: ['WE'],
  jueves: ['TH'],
  viernes: ['FR'],
  sabado: ['SA'],
  sábado: ['SA'],
  domingo: ['SU'],
}

const DAY_RANGES = [
  { start: 'lunes', end: 'viernes', days: ['MO', 'TU', 'WE', 'TH', 'FR'] },
  { start: 'lunes', end: 'sabado', days: ['MO', 'TU', 'WE', 'TH', 'FR', 'SA'] },
  { start: 'lunes', end: 'domingo', days: ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'] },
]

const extractDays = (dayLabel) => {
  const normalized =
    typeof dayLabel === 'string'
      ? dayLabel
          .trim()
          .toLowerCase()
          .replace(/\./g, '')
          .replace(/\s+/g, ' ')
      : ''

  if (!normalized) {
    return []
  }

  for (const range of DAY_RANGES) {
    const rangePattern = new RegExp(`${range.start}\s+a\s+${range.end}`)

    if (rangePattern.test(normalized)) {
      return range.days
    }
  }

  for (const [token, schemaDays] of Object.entries(DAY_TOKEN_TO_SCHEMA)) {
    if (normalized.includes(token)) {
      return schemaDays
    }
  }

  return []
}

const extractHourRanges = (hours) => {
  const normalized = typeof hours === 'string' ? hours.trim() : ''

  if (!normalized) {
    return []
  }

  const ranges = []
  const matcher = normalized.matchAll(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/g)

  for (const match of matcher) {
    if (match[1] && match[2]) {
      ranges.push({ opens: match[1], closes: match[2] })
    }
  }

  return ranges
}

const getOpeningHoursSpecification = (schedule) => {
  if (!Array.isArray(schedule)) {
    return []
  }

  const specs = []

  for (const entry of schedule) {
    const days = extractDays(entry?.day)
    const ranges = extractHourRanges(entry?.hours)

    if (!days.length || !ranges.length) {
      continue
    }

    for (const range of ranges) {
      specs.push({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: days,
        opens: range.opens,
        closes: range.closes,
      })
    }
  }

  return specs
}

const getServiceSchemaByPath = (pathname, canonicalUrl, businessId) => {
  if (pathname === '/fisioterapia') {
    return {
      '@type': 'Service',
      '@id': `${canonicalUrl}#service`,
      name: 'Fisioterapia deportiva en Ciudad Real',
      serviceType: ['Fisioterapia deportiva', 'Recuperacion funcional', 'Prevencion de lesiones'],
      provider: { '@id': businessId },
      areaServed: {
        '@type': 'City',
        name: 'Ciudad Real',
      },
      description:
        'Servicio de fisioterapia deportiva y recuperacion funcional orientado a prevenir lesiones y mejorar el rendimiento.',
      url: canonicalUrl,
    }
  }

  if (pathname === '/pilates-yoga') {
    return {
      '@type': 'Service',
      '@id': `${canonicalUrl}#service`,
      name: 'Clases de yoga y pilates en Ciudad Real',
      serviceType: ['Yoga', 'Pilates', 'Movilidad', 'Control postural', 'Respiracion'],
      provider: { '@id': businessId },
      areaServed: {
        '@type': 'City',
        name: 'Ciudad Real',
      },
      description:
        'Clases guiadas de yoga y pilates para mejorar movilidad, control postural, respiracion, fuerza del core y bienestar general.',
      url: canonicalUrl,
    }
  }

  if (pathname === '/tarifas-horarios') {
    return {
      '@type': 'OfferCatalog',
      '@id': `${canonicalUrl}#offers`,
      name: 'Tarifas de entrenamiento en Atlas Center',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Entrenamiento en grupos reducidos',
          category: 'Entrenamiento guiado',
        },
        {
          '@type': 'Offer',
          name: 'Acceso open gimnasio',
          category: 'Gimnasio',
        },
        {
          '@type': 'Offer',
          name: 'Clases de yoga y pilates',
          category: 'Actividad dirigida',
        },
      ],
    }
  }

  return null
}

const getBreadcrumbSchema = (pathname, origin, canonicalUrl) => {
  if (pathname === '/') {
    return null
  }

  const currentLabel = PATH_LABELS[pathname]

  if (!currentLabel) {
    return null
  }

  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: `${origin}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: currentLabel,
        item: canonicalUrl,
      },
    ],
  }
}

function RouteSeo({ brand, contactPage, schedule }) {
  const location = useLocation()

  useEffect(() => {
    const isKnownPath = Boolean(SEO_BY_PATH[location.pathname])
    const seoPath = isKnownPath ? location.pathname : '/404'
    const pathSeo = SEO_BY_PATH[seoPath]
    const origin = window.location.origin
    const canonicalUrl = `${origin}${seoPath}`
    const socialImage = toAbsoluteUrl(brand.heroLogoSrc || '/imagenes/logo_grande.png', origin)
    const brandLogo = toAbsoluteUrl(brand.headerLogoSrc || '/imagenes/logo_simple.png', origin)
    const mapUrl = toAbsoluteUrl(contactPage.mapEmbedUrl, origin)
    const businessId = `${origin}/#localbusiness`
    const organizationId = `${origin}/#organization`
    const openingHoursSpecification = getOpeningHoursSpecification(schedule)
    const robotsValue = isKnownPath
      ? 'index,follow,max-image-preview:large'
      : 'noindex,nofollow,noarchive,max-image-preview:large'

    document.title = pathSeo.title

    ensureMetaTag('name', 'description', pathSeo.description)
    ensureMetaTag('name', 'robots', robotsValue)
    ensureMetaTag('name', 'googlebot', robotsValue)

    ensureMetaTag('property', 'og:type', 'website')
    ensureMetaTag('property', 'og:locale', 'es_ES')
    ensureMetaTag('property', 'og:site_name', brand.name)
    ensureMetaTag('property', 'og:title', pathSeo.title)
    ensureMetaTag('property', 'og:description', pathSeo.description)
    ensureMetaTag('property', 'og:url', canonicalUrl)
    ensureMetaTag('property', 'og:image', socialImage)
    ensureMetaTag('property', 'og:image:alt', `${brand.name} en Ciudad Real`)

    ensureMetaTag('name', 'twitter:card', 'summary_large_image')
    ensureMetaTag('name', 'twitter:title', pathSeo.title)
    ensureMetaTag('name', 'twitter:description', pathSeo.description)
    ensureMetaTag('name', 'twitter:image', socialImage)
    ensureMetaTag('name', 'twitter:image:alt', `${brand.name} en Ciudad Real`)

    ensureLinkTag('canonical', canonicalUrl)
    ensureHreflangLink('es-ES', canonicalUrl)
    ensureHreflangLink('x-default', canonicalUrl)

    const webPageType = location.pathname === '/fisioterapia' ? 'MedicalWebPage' : 'WebPage'
    const breadcrumbSchema = getBreadcrumbSchema(location.pathname, origin, canonicalUrl)
    const serviceSchema = getServiceSchemaByPath(location.pathname, canonicalUrl, businessId)

    const structuredData = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': organizationId,
        name: brand.name,
        alternateName: ['Atlas Center', 'Atlas', 'Atlas Center Ciudad Real'],
        url: origin,
        logo: brandLogo,
        sameAs: [
          'https://www.instagram.com/atlascentercr?igsh=MXZlYXRzeHV1ejBlOA==',
          'https://www.facebook.com/profile.php?id=61586132360765&locale=es_ES',
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': ['HealthClub', 'SportsActivityLocation'],
        '@id': businessId,
        name: brand.name,
        description: pathSeo.description,
        image: socialImage,
        url: origin,
        priceRange: 'EUR',
        telephone: normalizePhone(contactPage.phones?.[0] ?? ''),
        email: contactPage.email,
        availableLanguage: ['es'],
        hasMap: mapUrl || undefined,
        address: {
          '@type': 'PostalAddress',
          streetAddress: contactPage.address,
          addressLocality: 'Ciudad Real',
          addressCountry: 'ES',
        },
        contactPoint: (Array.isArray(contactPage.phones) ? contactPage.phones : [])
          .filter(Boolean)
          .map((phone) => ({
            '@type': 'ContactPoint',
            contactType: 'customer service',
            telephone: normalizePhone(phone),
            areaServed: 'ES',
            availableLanguage: ['es'],
          })),
        openingHoursSpecification: openingHoursSpecification.length
          ? openingHoursSpecification
          : undefined,
        areaServed: {
          '@type': 'City',
          name: 'Ciudad Real',
        },
        sameAs: [
          'https://www.instagram.com/atlascentercr?igsh=MXZlYXRzeHV1ejBlOA==',
          'https://www.facebook.com/profile.php?id=61586132360765&locale=es_ES',
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': webPageType,
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: pathSeo.title,
        description: pathSeo.description,
        inLanguage: 'es',
        mainEntityOfPage: canonicalUrl,
        isPartOf: {
          '@id': `${origin}/#website`,
        },
        about:
          location.pathname === '/fisioterapia'
            ? { '@id': `${canonicalUrl}#service` }
            : { '@id': businessId },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        name: 'Atlas Center',
        alternateName: 'Atlas Center Ciudad Real',
        url: origin,
        publisher: {
          '@id': organizationId,
        },
      },
    ]

    if (breadcrumbSchema) {
      structuredData.push({
        '@context': 'https://schema.org',
        ...breadcrumbSchema,
      })
    }

    if (serviceSchema) {
      structuredData.push({
        '@context': 'https://schema.org',
        ...serviceSchema,
      })
    }

    let scriptTag = document.head.querySelector('#structured-data-local-business')

    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.id = 'structured-data-local-business'
      scriptTag.setAttribute('type', 'application/ld+json')
      document.head.appendChild(scriptTag)
    }

    scriptTag.textContent = JSON.stringify(structuredData)
  }, [
    brand.headerLogoSrc,
    brand.heroLogoSrc,
    brand.name,
    contactPage.address,
    contactPage.email,
    contactPage.mapEmbedUrl,
    contactPage.phones,
    location.pathname,
    schedule,
  ])

  return null
}

function App() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const isPricingPage = location.pathname === '/tarifas-horarios'
  const { brand, contactPage, legalItems, schedule } = localAdminContent

  return (
    <>
      <SiteHeader brandName={brand.name} brandLogoSrc={brand.headerLogoSrc} />
      <ScrollToHash />
      <RouteSeo brand={brand} contactPage={contactPage} schedule={schedule} />

      <div
        className={[
          'atlas-page',
          isHomePage ? 'atlas-page--home' : '',
          isPricingPage ? 'atlas-page--pricing' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <Suspense fallback={<main className="main-loading">Cargando contenido...</main>}>
          <Routes>
            <Route path="/" element={<HomePage content={localAdminContent} />} />
            <Route path="/equipo" element={<TeamPage content={localAdminContent} />} />
            <Route path="/fisioterapia" element={<FisioterapiaPage content={localAdminContent} />} />
            <Route path="/pilates-yoga" element={<PilatesYogaPage />} />
            <Route path="/tarifas-horarios" element={<PricingPage content={localAdminContent} />} />
            <Route path="/contacto" element={<ContactPage content={localAdminContent} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>

      <SiteFooter brand={brand} contactPage={contactPage} legalItems={legalItems} schedule={schedule} />
    </>
  )
}

export default App
