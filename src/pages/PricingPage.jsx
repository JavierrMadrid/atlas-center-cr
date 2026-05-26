import PricingScheduleSection from '../components/sections/PricingScheduleSection'

function PricingPage({ content }) {
  return (
    <main className="pricing-page">
      <PricingScheduleSection
        pricingPlans={content.pricingPlans}
        pricingPolicy={content.pricingPolicy}
        schedule={content.schedule}
        stacked
      />
    </main>
  )
}

export default PricingPage
