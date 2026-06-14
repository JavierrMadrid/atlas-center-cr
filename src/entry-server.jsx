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
  const helmetContext = {}
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <ServerApp />
      </StaticRouter>
    </HelmetProvider>,
  )
  return { html, helmet: helmetContext.helmet }
}
