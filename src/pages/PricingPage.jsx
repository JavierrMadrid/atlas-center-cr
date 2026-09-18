import PageShell from '../components/layout/PageShell'
import PricingScheduleSection from '../components/page-blocks/PricingScheduleSection'

function PricingPage({ content }) {
  return (
    <PageShell>
      <PricingScheduleSection
        pricingPlans={content.pricingPlans}
        pricingPolicy={content.pricingPolicy}
        schedule={content.schedule}
        headingLevel="h1"
        headingTitle="Tarifas y horarios del gimnasio en Ciudad Real"
        headingDescription="Entrenamiento funcional e híbrido guiado en grupos reducidos, sala open, pilates y fisioterapia. Bonos mensuales con caducidad de 30 días."
      />
    </PageShell>
  )
}

export default PricingPage