import { Suspense, lazy, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import SiteFooter from './components/layout/SiteFooter'
import SiteHeader from './components/layout/SiteHeader'
import { localAdminContent } from './config/localAdminContent'

const HomePage = lazy(() => import('./pages/HomePage'))
const PricingPage = lazy(() => import('./pages/PricingPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

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
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const isPricingPage = location.pathname === '/tarifas-horarios'
  const { brand, contactPage, legalItems, schedule } = localAdminContent

  return (
    <>
      <SiteHeader brandName={brand.name} brandLogoSrc={brand.headerLogoSrc} />
      <ScrollToHash />

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
