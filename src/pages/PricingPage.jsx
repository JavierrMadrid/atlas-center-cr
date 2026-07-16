import PageShell from '../components/layout/PageShell'
import PricingScheduleSection from '../components/page-blocks/PricingScheduleSection'

function PricingPage({ content }) {
  return (
    <PageShell className="pricing-page">
      <PricingScheduleSection
        pricingPlans={content.pricingPlans}
        pricingPolicy={content.pricingPolicy}
        schedule={content.schedule}
        stacked
        headingLevel="h1"
        headingTitle="Tarifas y horarios del gimnasio en Ciudad Real"
        headingDescription="Consulta las tarifas y horarios de Atlas Center, tu gimnasio en Ciudad Real: entrenamiento guiado en grupos reducidos, sala open, pilates, Zenn y fisioterapia. Bonos mensuales con caducidad de 40 días."
      />
    </PageShell>
  )
}

export default PricingPage
