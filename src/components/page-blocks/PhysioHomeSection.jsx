import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import PriceMarquee from '../ui/PriceMarquee'
import Reveal from '../ui/Reveal'

const bullets = [
  'Prevención de lesiones en entrenamiento y actividad diaria',
  'Tratamiento de molestias musculares y articulares',
  'Readaptación para retomar el entrenamiento con confianza',
]

function PhysioHomeSection({ prices }) {
  const items = Array.isArray(prices) ? prices : []

  return (
    <section id="fisioterapia" className="section">
      <div className="container">
        <Reveal>
          <header className="physio-feat__head">
            <span className="physio-feat__badge">Fisioterapia</span>
          </header>
        </Reveal>

        <div className="physio-feat__row">
          <Reveal className="physio-feat__content">
            <div className="physio-feat__eyebrow">
              <span className="physio-feat__eyebrow-icon">
                <Icon name="physio" size={14} />
              </span>
              <span>Servicio</span>
            </div>

            <h2 className="physio-feat__title">Prevención, tratamiento y readaptación</h2>

            <ul className="physio-feat__list">
              {bullets.map((bullet) => (
                <li key={bullet}>
                  <span className="physio-feat__check" aria-hidden="true">
                    <Icon name="check" size={11} />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>

            <div>
              <Link className="btn btn--ghost" to="/fisioterapia">
                Ver fisioterapia
                <Icon name="arrowRight" size={16} className="btn__icon" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={80} className="physio-feat__prices">
            <PriceMarquee prices={items} variant="grid" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default PhysioHomeSection
