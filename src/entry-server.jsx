import { renderToString } from 'react-dom/server'
import { Navigate, Route, Routes, StaticRouter, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import SiteHeader from './components/layout/SiteHeader'
import SiteFooter from './components/layout/SiteFooter'
import RouteSeo from './components/seo/RouteSeo'
import { localAdminContent } from './config/localAdminContent'

// Importaciones eager (sin lazy) para SSR
import HomePage from './pages/HomePage'
import PricingPage from './pages/PricingPage'
import ContactPage from './pages/ContactPage'
import TeamPage from './pages/TeamPage'
import FisioterapiaPage from './pages/FisioterapiaPage'
import PilatesZennPage from './pages/PilatesYogaPage'
import NotFoundPage from './pages/NotFoundPage'

// ─── SEO estático para SSR ────────────────────────────────────────────────────

const SITE_URL = (
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL) ||
  'https://atlas-center.com'
).replace(/\/$/, '')

const SEO_BY_PATH = {
  '/': {
    title: 'Atlas Center | Centro Deportivo en Ciudad Real',
    description:
      'Centro deportivo especializado en entrenamientos mediante clases guiadas. Ofrecemos fisioterapia, pilates, Zenn inspirado en yoga y sala de entrenamiento libre en Ciudad Real. Consulta horarios y tarifas en Atlas Center.',
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
      'Consulta tarifas y horarios de Atlas Center para entrenamiento en grupos reducidos, entrenamiento guiado, gimnasio open, Zenn, yoga y pilates en Ciudad Real.',
  },
  '/contacto': {
    title: 'Contacto Atlas Center | Centro Deportivo en Ciudad Real',
    description:
      'Contacta con Atlas Center en Ciudad Real. Direccion, telefonos, email y formulario para reservar entrenamiento, fisioterapia y clases guiadas.',
  },
}

const SOCIAL_LINKS = [
  'https://www.instagram.com/atlascentercr?igsh=MXZlYXRzeHV1ejBlOA==',
  'https://www.facebook.com/profile.php?id=61586132360765&locale=es_ES',
]

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function getHeadHtml(url) {
  const pathname = url.split('?')[0].split('#')[0]
  const isKnownPath = Boolean(SEO_BY_PATH[pathname])
  const seo = isKnownPath ? SEO_BY_PATH[pathname] : SEO_BY_PATH['/']
  const canonicalUrl = `${SITE_URL}${isKnownPath ? pathname : ''}`
  const robotsValue = isKnownPath
    ? 'index,follow,max-image-preview:large'
    : 'noindex,nofollow,noarchive,max-image-preview:large'

  const { brand, contactPage } = localAdminContent
  const socialImage = `${SITE_URL}${brand.heroLogoSrc || '/imagenes/logo_grande.png'}`
  const brandLogo = `${SITE_URL}${brand.headerLogoSrc || '/imagenes/logo_simple.png'}`

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
        '@type': ['LocalBusiness', 'HealthClub', 'SportsActivityLocation'],
        '@id': `${SITE_URL}/#localbusiness`,
        name: brand.name,
        image: socialImage,
        url: SITE_URL,
        telephone: String(contactPage.phones?.[0] ?? '').replace(/\s+/g, ''),
        email: contactPage.email,
        priceRange: 'EUR',
        address: {
          '@type': 'PostalAddress',
          streetAddress: contactPage.address,
          addressLocality: 'Ciudad Real',
          postalCode: '13003',
          addressCountry: 'ES',
        },
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
        name: seo.title,
        description: seo.description,
        url: canonicalUrl,
        inLanguage: 'es',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#localbusiness` },
      },
    ],
  }

  return [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}"/>`,
    `<meta name="robots" content="${esc(robotsValue)}"/>`,
    `<meta name="googlebot" content="${esc(robotsValue)}"/>`,
    `<meta property="og:type" content="website"/>`,
    `<meta property="og:locale" content="es_ES"/>`,
    `<meta property="og:site_name" content="${esc(brand.name)}"/>`,
    `<meta property="og:title" content="${esc(seo.title)}"/>`,
    `<meta property="og:description" content="${esc(seo.description)}"/>`,
    `<meta property="og:url" content="${esc(canonicalUrl)}"/>`,
    `<meta property="og:image" content="${esc(socialImage)}"/>`,
    `<meta property="og:image:alt" content="${esc(brand.name)} en Ciudad Real"/>`,
    `<meta name="twitter:card" content="summary_large_image"/>`,
    `<meta name="twitter:title" content="${esc(seo.title)}"/>`,
    `<meta name="twitter:description" content="${esc(seo.description)}"/>`,
    `<meta name="twitter:image" content="${esc(socialImage)}"/>`,
    `<meta name="twitter:image:alt" content="${esc(brand.name)} en Ciudad Real"/>`,
    `<link rel="canonical" href="${esc(canonicalUrl)}"/>`,
    `<link rel="alternate" hrefLang="es-ES" href="${esc(canonicalUrl)}"/>`,
    `<link rel="alternate" hrefLang="x-default" href="${esc(canonicalUrl)}"/>`,
    `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`,
  ].join('\n    ')
}

// ─── Componente y función de render ──────────────────────────────────────────

function ServerApp() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const isPricingPage = location.pathname === '/tarifas-horarios'
  const isTeamPage = location.pathname === '/equipo'
  const { brand, contactPage, legalItems, schedule } = localAdminContent

  return (
    <>
      <SiteHeader brandName={brand.name} brandLogoSrc={brand.headerLogoSrc} />
      <RouteSeo brand={brand} contactPage={contactPage} schedule={schedule} />
      <div
        className={[
          'atlas-page',
          isHomePage ? 'atlas-page--home' : '',
          isPricingPage ? 'atlas-page--pricing' : '',
          isTeamPage ? 'atlas-page--team' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <Routes>
          <Route path="/" element={<HomePage content={localAdminContent} />} />
          <Route path="/equipo" element={<TeamPage content={localAdminContent} />} />
          <Route path="/fisioterapia" element={<FisioterapiaPage content={localAdminContent} />} />
          <Route path="/pilates-zenn" element={<PilatesZennPage />} />
          <Route path="/pilates-yoga" element={<Navigate to="/pilates-zenn" replace />} />
          <Route path="/tarifas-horarios" element={<PricingPage content={localAdminContent} />} />
          <Route path="/contacto" element={<ContactPage content={localAdminContent} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <SiteFooter
        brand={brand}
        contactPage={contactPage}
        legalItems={legalItems}
        schedule={schedule}
      />
    </>
  )
}

export function render(url) {
  const html = renderToString(
    <HelmetProvider>
      <StaticRouter location={url}>
        <ServerApp />
      </StaticRouter>
    </HelmetProvider>,
  )
  return { html }
}
