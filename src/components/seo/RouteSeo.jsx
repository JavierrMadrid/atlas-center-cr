import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://atlas-center.com').replace(/\/$/, '')

const SOCIAL_LINKS = [
  'https://www.instagram.com/atlascentercr?igsh=MXZlYXRzeHV1ejBlOA==',
  'https://www.facebook.com/profile.php?id=61586132360765&locale=es_ES',
]

const PATH_LABELS = {
  '/': 'Inicio',
  '/equipo': 'Equipo',
  '/fisioterapia': 'Fisioterapia',
  '/pilates-zenn': 'Pilates y Zenn',
  '/tarifas-horarios': 'Tarifas y horarios',
  '/contacto': 'Contacto',
}

const SEO_BY_PATH = {
  '/': {
    title: 'Atlas Center | Centro Deportivo en Ciudad Real',
    description:
      'Centro deportivo especializado en entrenamientos funcionales e híbridos en grupos reducidos. Ofrecemos fisioterapia, pilates, Zenn inspirado en yoga y sala de entrenamiento libre en Ciudad Real. Consulta horarios y tarifas en Atlas Center.',
  },
  '/equipo': {
    title: 'Equipo de Entrenadores | Atlas Center Ciudad Real',
    description:
      'Conoce al equipo de Atlas Center: entrenadores personales y especialistas en entrenamiento guiado y fisioterapia para mejorar salud, fuerza y rendimiento.',
  },
  '/fisioterapia': {
    title: 'Fisioterapia Deportiva en Ciudad Real | Atlas Center',
    description:
      'Servicio de fisioterapia deportiva en Atlas Center, con recuperacion funcional, readaptacion y prevencion de lesiones para deportistas y personas activas.',
  },
  '/pilates-zenn': {
    title: 'Clases de Pilates, Zenn y Yoga en Ciudad Real | Atlas Center',
    description:
      'Clases de pilates y Zenn (fusion de yoga, pilates y taichi) en Atlas Center para mejorar movilidad, control postural, respiracion, equilibrio y fuerza del core con sesiones guiadas para todos los niveles.',
  },
  '/tarifas-horarios': {
    title: 'Tarifas y Horarios del Gimnasio | Atlas Center Ciudad Real',
    description:
      'Consulta tarifas y horarios de Atlas Center para entrenamiento funcional e híbrido en grupos reducidos, entrenamiento guiado, gimnasio open, Zenn, yoga y pilates en Ciudad Real.',
  },
  '/contacto': {
    title: 'Contacto Atlas Center | Centro Deportivo en Ciudad Real',
    description:
      'Contacta con Atlas Center en Ciudad Real. Direccion, telefonos, email y formulario para reservar entrenamiento, fisioterapia y clases guiadas.',
  },
  '/404': {
    title: 'Pagina no encontrada | Atlas Center',
    description: 'La pagina solicitada no existe. Explora los servicios de Atlas Center en Ciudad Real.',
  },
}

const normalizePathname = (pathname) => {
  if (typeof pathname !== 'string' || !pathname) {
    return '/'
  }

  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }

  return pathname
}

const toAbsoluteUrl = (value) => {
  if (!value) {
    return ''
  }

  return new URL(value, SITE_URL).toString()
}

const normalizePhone = (phone) => (typeof phone === 'string' ? phone.replace(/\s+/g, '') : '')

const DAY_TOKEN_TO_SCHEMA = {
  lunes: ['Monday'],
  martes: ['Tuesday'],
  miercoles: ['Wednesday'],
  miércoles: ['Wednesday'],
  jueves: ['Thursday'],
  viernes: ['Friday'],
  sabado: ['Saturday'],
  sábado: ['Saturday'],
  domingo: ['Sunday'],
}

const DAY_RANGES = [
  { start: 'lunes', end: 'viernes', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
  { start: 'lunes', end: 'sabado', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] },
  {
    start: 'lunes',
    end: 'domingo',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },
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
    const rangePattern = new RegExp(`${range.start}\\s+a\\s+${range.end}`)

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
      const opens = range.opens && range.opens.length === 5 ? `${range.opens}:00` : range.opens
      const closes = range.closes && range.closes.length === 5 ? `${range.closes}:00` : range.closes
      specs.push({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: days,
        opens,
        closes,
      })
    }
  }

  return specs
}

const getBreadcrumbSchema = (pathname, canonicalUrl) => {
  if (pathname === '/' || !PATH_LABELS[pathname]) {
    return null
  }

  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: PATH_LABELS[pathname],
        item: canonicalUrl,
      },
    ],
  }
}

const getPilatesZennFaqSchema = () => ({
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Que diferencia hay entre Zenn y una clase de yoga tradicional?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zenn mantiene la respiracion y la conexion cuerpo-mente del yoga, y ademas integra movimientos de pilates y taichi en un formato coreografiado y dinamico.',
      },
    },
    {
      '@type': 'Question',
      name: 'Si busco yoga en Ciudad Real, me sirve Zenn?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Si. Zenn es una opcion inspirada en yoga que anade trabajo de control postural, coordinacion y estabilidad del core para una practica completa.',
      },
    },
  ],
})

const getFisioterapiaFaqSchema = () => ({
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Cuanto cuesta una sesion de fisioterapia deportiva en Ciudad Real?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La sesion suelta cuesta 35 EUR para socios y 40 EUR para no socios. Tambien ofrecemos bono de 5 sesiones por 150 EUR (socios) o 175 EUR (no socios).',
      },
    },
    {
      '@type': 'Question',
      name: 'Tengo que ser socio de Atlas Center para recibir fisioterapia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. El servicio de fisioterapia esta abierto a socios y no socios. Las tarifas son distintas en cada caso, pero cualquier persona puede reservar sesion.',
      },
    },
    {
      '@type': 'Question',
      name: 'Que lesiones tratais en la fisioterapia de Atlas Center?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tratamos lesiones deportivas, molestias musculares y articulares, y readaptacion funcional para volver a entrenar o a la actividad diaria con seguridad.',
      },
    },
  ],
})

const getTarifasFaqSchema = () => ({
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Cuanto cuesta entrenar en Atlas Center Ciudad Real?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Las tarifas de grupos reducidos empiezan en 50 EUR al mes (plan Basic) y llegan a 110 EUR (plan Olympo). La sala open va desde 50 EUR (Base) hasta 60 EUR (Plus).',
      },
    },
    {
      '@type': 'Question',
      name: 'Puedo probar una clase antes de apuntarme?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Si. Ofrecemos una primera clase guiada para conocer tu nivel y proponerte una ruta de progresion. Escríbenos por el formulario de contacto o llamanos al 616 725 294.',
      },
    },
    {
      '@type': 'Question',
      name: 'Cuanto tiempo tengo para gastar un bono?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Todos los bonos se deben gastar en un plazo maximo de 40 dias desde la fecha de compra.',
      },
    },
  ],
})

const SERVICE_BY_PATH = {
  '/fisioterapia': {
    '@type': 'Service',
    serviceType: 'Fisioterapia deportiva',
    description: 'Fisioterapia deportiva, recuperacion funcional, readaptacion y prevencion de lesiones en Ciudad Real.',
    areaServed: { '@type': 'City', name: 'Ciudad Real' },
    provider: { '@id': `${SITE_URL}/#localbusiness` },
  },
  '/pilates-zenn': {
    '@type': 'Service',
    serviceType: 'Clases de pilates, Zenn y yoga',
    description: 'Clases guiadas de pilates, Zenn (fusion de yoga, pilates y taichi) y trabajo de core en Ciudad Real.',
    areaServed: { '@type': 'City', name: 'Ciudad Real' },
    provider: { '@id': `${SITE_URL}/#localbusiness` },
  },
  '/tarifas-horarios': {
    '@type': 'Service',
    serviceType: 'Entrenamiento personal y en grupos reducidos',
    description: 'Entrenamiento funcional e híbrido guiado en grupos reducidos y sala open de musculacion en Ciudad Real.',
    areaServed: { '@type': 'City', name: 'Ciudad Real' },
    provider: { '@id': `${SITE_URL}/#localbusiness` },
  },
  '/equipo': {
    '@type': 'Service',
    serviceType: 'Entrenamiento personal',
    description: 'Entrenadores personales, especialistas en pilates, Zenn y fisioterapia en Ciudad Real.',
    areaServed: { '@type': 'City', name: 'Ciudad Real' },
    provider: { '@id': `${SITE_URL}/#localbusiness` },
  },
}

const FAQ_BY_PATH = {
  '/pilates-zenn': getPilatesZennFaqSchema,
  '/fisioterapia': getFisioterapiaFaqSchema,
  '/tarifas-horarios': getTarifasFaqSchema,
}

function RouteSeo({ brand, contactPage, schedule }) {
  const location = useLocation()
  const normalizedPathname = normalizePathname(location.pathname)
  const isKnownPath = Boolean(SEO_BY_PATH[normalizedPathname])
  const seoPath = isKnownPath ? normalizedPathname : '/404'
  const pathSeo = SEO_BY_PATH[seoPath]
  const canonicalPath = seoPath === '/' ? '/' : `${seoPath}/`
  const canonicalUrl = `${SITE_URL}${canonicalPath}`
  const socialImage = toAbsoluteUrl(brand.socialImageSrc || '/imagenes/og-image.webp')
  const brandLogo = toAbsoluteUrl(brand.headerLogoSrc || '/imagenes/logo_simple.webp')
  const mapUrl = toAbsoluteUrl(contactPage.mapEmbedUrl)
  const openingHoursSpecification = getOpeningHoursSpecification(schedule)
  const robotsValue = isKnownPath
    ? 'index,follow,max-image-preview:large'
    : 'noindex,nofollow,noarchive,max-image-preview:large'
  const heroImagePath = brand.heroLogoSrc || '/imagenes/logo_grande.webp'
  const shouldPreloadHeroImage = seoPath === '/'

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: brand.name,
        url: SITE_URL,
        logo: brandLogo,
        sameAs: SOCIAL_LINKS,
      },
      {
        '@type': ['LocalBusiness', 'HealthClub', 'ExerciseGym', 'SportsActivityLocation'],
        '@id': `${SITE_URL}/#localbusiness`,
        name: brand.name,
        image: socialImage,
        url: SITE_URL,
        telephone: normalizePhone(contactPage.phones?.[0] ?? ''),
        email: contactPage.email,
        priceRange: 'EUR',
        address: {
          '@type': 'PostalAddress',
          streetAddress: contactPage.address,
          addressLocality: 'Ciudad Real',
          postalCode: '13003',
          addressCountry: 'ES',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 38.984,
          longitude: -3.927,
        },
        hasMap: mapUrl || undefined,
        openingHoursSpecification: openingHoursSpecification.length
          ? openingHoursSpecification
          : undefined,
        sameAs: SOCIAL_LINKS,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: brand.name,
        url: SITE_URL,
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        inLanguage: 'es',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#localbusiness` },
      },
      ...(getBreadcrumbSchema(seoPath, canonicalUrl)
        ? [{ ...getBreadcrumbSchema(seoPath, canonicalUrl) }]
        : []),
      ...(SERVICE_BY_PATH[seoPath] ? [SERVICE_BY_PATH[seoPath]] : []),
      ...(FAQ_BY_PATH[seoPath] ? [FAQ_BY_PATH[seoPath]()] : []),
    ],
  }

  return (
    <Helmet prioritizeSeoTags>
      <html lang="es" />
      <title>{pathSeo.title}</title>
      <meta name="description" content={pathSeo.description} />
      <meta name="robots" content={robotsValue} />
      <meta name="googlebot" content={robotsValue} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:site_name" content={brand.name} />
      <meta property="og:title" content={pathSeo.title} />
      <meta property="og:description" content={pathSeo.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${brand.name} en Ciudad Real`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pathSeo.title} />
      <meta name="twitter:description" content={pathSeo.description} />
      <meta name="twitter:image" content={socialImage} />
      <meta name="twitter:image:alt" content={`${brand.name} en Ciudad Real`} />

      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="es-ES" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      <link rel="preconnect" href="https://formspree.io" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://maps.googleapis.com" />
      {shouldPreloadHeroImage ? (
        <link rel="preload" as="image" href={heroImagePath} fetchPriority="high" />
      ) : null}

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  )
}

export default RouteSeo
