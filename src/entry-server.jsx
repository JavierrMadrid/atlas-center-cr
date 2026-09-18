// Archivo SSR: exporta componentes y una función de render. La regla de fast
// refresh no aplica aquí, es un entry de prerenderizado.
/* eslint-disable react-refresh/only-export-components */

import { renderToString } from 'react-dom/server'
import { Navigate, Route, Routes, StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import SiteHeader from './components/layout/SiteHeader'
import SiteFooter from './components/layout/SiteFooter'
import ContactFloating from './components/layout/ContactFloating'
import RouteSeo from './components/seo/RouteSeo'
import { localAdminContent } from './config/localAdminContent'

// Importaciones eager (sin lazy) para SSR
import HomePage from './pages/HomePage'
import PricingPage from './pages/PricingPage'
import ContactPage from './pages/ContactPage'
import TeamPage from './pages/TeamPage'
import FisioterapiaPage from './pages/FisioterapiaPage'
import PilatesPage from './pages/PilatesPage'
import NotFoundPage from './pages/NotFoundPage'

// ─── Componente y función de render ──────────────────────────────────────────

function ServerApp() {
  const { brand, contact, contactPage, legalItems, schedule } = localAdminContent

  return (
    <>
      <SiteHeader
        brandName={brand.name}
        brandLogoSrc={brand.headerLogoSrc}
        phone={contactPage.phones?.[0]}
      />
      <RouteSeo brand={brand} contactPage={contactPage} schedule={schedule} />
      <main className="site-main">
        <Routes>
          <Route path="/" element={<HomePage content={localAdminContent} />} />
          <Route path="/equipo" element={<TeamPage content={localAdminContent} />} />
          <Route path="/fisioterapia" element={<FisioterapiaPage content={localAdminContent} />} />
          <Route path="/pilates" element={<PilatesPage />} />
          <Route path="/pilates-zenn" element={<Navigate to="/pilates" replace />} />
          <Route path="/pilates-yoga" element={<Navigate to="/pilates" replace />} />
          <Route path="/tarifas-horarios" element={<PricingPage content={localAdminContent} />} />
          <Route path="/contacto" element={<ContactPage content={localAdminContent} />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
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