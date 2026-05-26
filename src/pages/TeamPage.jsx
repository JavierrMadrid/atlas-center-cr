import PageShell from '../components/layout/PageShell'
import TrainersSection from '../components/page-blocks/TrainersSection'

function TeamPage({ content }) {
  return (
    <PageShell className="pricing-page team-page">
      <TrainersSection trainers={content.trainers} />
    </PageShell>
  )
}

export default TeamPage
