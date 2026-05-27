import { Suspense, lazy, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import SiteFooter from './components/layout/SiteFooter'
import SiteHeader from './components/layout/SiteHeader'
import { localAdminContent } from './config/localAdminContent'

const HomePage = lazy(() => import('./pages/HomePage'))
const PricingPage = lazy(() => import('./pages/PricingPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const TeamPage = lazy(() => import('./pages/TeamPage'))
const FisioterapiaPage = lazy(() => import('./pages/FisioterapiaPage'))
const PilatesYogaPage = lazy(() => import('./pages/PilatesYogaPage'))

const HEADER_OFFSET_PX = 88

const SEO_BY_PATH = {
  '/': {
    title: 'Atlas Center | Entrenamiento y Fisioterapia en Ciudad Real',
    description:
      'Atlas Center en Ciudad Real: entrenamiento guiado, sala open, pilates, yoga y fisioterapia deportiva. Consulta horarios, tarifas y contacto.',
  },
  '/equipo': {
    title: 'Equipo | Atlas Center Ciudad Real',
    description:
      'Conoce al equipo de Atlas Center: entrenadores y fisioterapia deportiva para ayudarte a progresar de forma segura y eficaz.',
  },
  '/fisioterapia': {
    title: 'Fisioterapia Deportiva | Atlas Center Ciudad Real',
    description:
      'Servicio de fisioterapia deportiva y recuperación funcional en Atlas Center, orientado a prevención de lesiones y mejora del rendimiento.',
  },
  '/pilates-yoga': {
    title: 'Pilates y Yoga | Atlas Center Ciudad Real',
    description:
      'Clases de pilates y yoga en Atlas Center: movilidad, control postural, core y bienestar para todos los niveles.',
  },
  '/tarifas-horarios': {
    title: 'Tarifas y Horarios | Atlas Center Ciudad Real',
    description:
      'Consulta tarifas y horarios de Atlas Center: grupos reducidos, bonos open, pilates y yoga en Ciudad Real.',
  },
  '/contacto': {
    title: 'Contacto | Atlas Center Ciudad Real',
    description:
      'Contacta con Atlas Center en Ciudad Real. Dirección, teléfonos, email y formulario para resolver dudas y reservar tu plaza.',
  },
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

function RouteSeo({ brand, contactPage }) {
  const location = useLocation()

  useEffect(() => {
    const pathSeo = SEO_BY_PATH[location.pathname] ?? SEO_BY_PATH['/']
    const canonicalUrl = `${window.location.origin}${location.pathname}`
    const socialImage = `${window.location.origin}${brand.heroLogoSrc || '/imagenes/logo_grande.png'}`

    document.title = pathSeo.title

    ensureMetaTag('name', 'description', pathSeo.description)
    ensureMetaTag('name', 'robots', 'index,follow,max-image-preview:large')

    ensureMetaTag('property', 'og:type', 'website')
    ensureMetaTag('property', 'og:locale', 'es_ES')
    ensureMetaTag('property', 'og:title', pathSeo.title)
    ensureMetaTag('property', 'og:description', pathSeo.description)
    ensureMetaTag('property', 'og:url', canonicalUrl)
    ensureMetaTag('property', 'og:image', socialImage)

    ensureMetaTag('name', 'twitter:card', 'summary_large_image')
    ensureMetaTag('name', 'twitter:title', pathSeo.title)
    ensureMetaTag('name', 'twitter:description', pathSeo.description)
    ensureMetaTag('name', 'twitter:image', socialImage)

    ensureLinkTag('canonical', canonicalUrl)

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'SportsActivityLocation',
      name: brand.name,
      description: pathSeo.description,
      image: socialImage,
      url: canonicalUrl,
      telephone: contactPage.phones?.[0] ?? '',
      email: contactPage.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: contactPage.address,
        addressLocality: 'Ciudad Real',
        addressCountry: 'ES',
      },
      sameAs: [
        'https://www.instagram.com/atlascentercr?igsh=MXZlYXRzeHV1ejBlOA==',
        'https://www.facebook.com/profile.php?id=61586132360765&locale=es_ES',
      ],
    }

    let scriptTag = document.head.querySelector('#structured-data-local-business')

    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.id = 'structured-data-local-business'
      scriptTag.setAttribute('type', 'application/ld+json')
      document.head.appendChild(scriptTag)
    }

    scriptTag.textContent = JSON.stringify(structuredData)
  }, [brand.heroLogoSrc, brand.name, contactPage.address, contactPage.email, contactPage.phones, location.pathname])

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
      <RouteSeo brand={brand} contactPage={contactPage} />

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
            <Route path="/fisioterapia" element={<FisioterapiaPage />} />
            <Route path="/pilates-yoga" element={<PilatesYogaPage />} />
            <Route path="/tarifas-horarios" element={<PricingPage content={localAdminContent} />} />
            <Route path="/contacto" element={<ContactPage content={localAdminContent} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>

      <SiteFooter brand={brand} contactPage={contactPage} legalItems={legalItems} schedule={schedule} />
    </>
  )
}

export default App
