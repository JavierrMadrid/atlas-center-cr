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
      />
    </PageShell>
  )
}

export default PricingPage
