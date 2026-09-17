import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'
import { HERO_IMAGE_ALT, HERO_IMAGE_SRC } from '../../config/media'

const HERO_SUBTEXT =
  'Funcional e híbrido en grupos de máximo 5 personas, con seguimiento técnico y planes adaptados a tu nivel.'

function HeroSection({ brand }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="hero__eyebrow">{brand.kicker || 'Centro de entrenamiento en Ciudad Real'}</p>
          <h1 id="hero-title" className="hero__title">
            Entrena con propósito
          </h1>
          <p className="hero__text">{brand.heroSubtext || HERO_SUBTEXT}</p>
          <div className="hero__actions">
            <Link
              className="btn btn--primary"
              to={brand.primaryActionTarget || '/#entrenamientos'}
            >
              <Icon name="arrowRight" size={16} className="btn__icon" />
              {brand.primaryActionLabel || 'Ver entrenamientos'}
            </Link>
            <Link className="btn btn--ghost" to={brand.secondaryActionTarget || '/tarifas-horarios'}>
              {brand.secondaryActionLabel || 'Consulta tarifas'}
            </Link>
          </div>
        </div>

        <div className="hero__media">
          <img
            src={HERO_IMAGE_SRC}
            alt={HERO_IMAGE_ALT}
            width="1600"
            height="1379"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection