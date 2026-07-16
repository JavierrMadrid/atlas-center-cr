import PageShell from '../components/layout/PageShell'
import TrainersSection from '../components/page-blocks/TrainersSection'

function TeamPage({ content }) {
  return (
    <PageShell className="pricing-page team-page">
      <TrainersSection
        trainers={content.trainers}
        headingLevel="h1"
        headingTitle="Equipo de entrenadores personales en Ciudad Real"
        headingDescription="Conoce al equipo de Atlas Center: entrenadores personales, especialistas en pilates, Zenn y fisioterapia en Ciudad Real. Mismo criterio técnico, distinta disciplina."
      />
    </PageShell>
  )
}

export default TeamPage
