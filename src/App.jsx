import { Suspense, lazy, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import SiteFooter from './components/layout/SiteFooter'
import SiteHeader from './components/layout/SiteHeader'
import ContactFloating from './components/layout/ContactFloating'
import RouteSeo from './components/seo/RouteSeo'
import { localAdminContent } from './config/localAdminContent'

const HomePage = lazy(() => import('./pages/HomePage'))
const PricingPage = lazy(() => import('./pages/PricingPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const TeamPage = lazy(() => import('./pages/TeamPage'))
const FisioterapiaPage = lazy(() => import('./pages/FisioterapiaPage'))
const PilatesZennPage = lazy(() => import('./pages/PilatesYogaPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const HEADER_OFFSET_PX = 88

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

function App() {
  const { brand, contact, contactPage, legalItems, schedule } = localAdminContent

  return (
    <>
      <SiteHeader
        brandName={brand.name}
        brandLogoSrc={brand.headerLogoSrc}
        phone={contactPage.phones?.[0]}
      />
      <ScrollToHash />
      <RouteSeo brand={brand} contactPage={contactPage} schedule={schedule} />

      <main className="site-main">
        <Suspense fallback={<div className="main-loading">Cargando contenido...</div>}>
          <Routes>
            <Route path="/" element={<HomePage content={localAdminContent} />} />
            <Route path="/equipo" element={<TeamPage content={localAdminContent} />} />
            <Route path="/fisioterapia" element={<FisioterapiaPage content={localAdminContent} />} />
            <Route path="/pilates-zenn" element={<PilatesZennPage />} />
            <Route path="/pilates-yoga" element={<Navigate to="/pilates-zenn" replace />} />
            <Route path="/tarifas-horarios" element={<PricingPage content={localAdminContent} />} />
            <Route path="/contacto" element={<ContactPage content={localAdminContent} />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <SiteFooter
        brand={brand}
        contactPage={contactPage}
        legalItems={legalItems}
        schedule={schedule}
      />

      <ContactFloating contact={contact} />
    </>
  )
}

export default App