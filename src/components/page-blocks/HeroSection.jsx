import { Link } from 'react-router-dom'
import BorderGlow from '../ui/BorderGlow'
import Icon from '../ui/Icon'
import SplitFlapText from '../ui/SplitFlapText'
import { HERO_IMAGE_ALT, HERO_IMAGE_SRC } from '../../config/media'

const HERO_SUBTEXT =
  'Funcional e híbrido en grupos de máximo 5 personas, con seguimiento técnico y planes adaptados a tu nivel.'

const HERO_TITLE_LINES = [
  ['ENTRENA CON', 'FUNCIONAL E', 'GRUPOS DE 5'],
  ['PROPÓSITO', 'HÍBRIDO', 'PERSONAS'],
]

function HeroSection({ brand }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="hero__eyebrow">{brand.kicker || 'Centro de entrenamiento en Ciudad Real'}</p>
          <h1 id="hero-title" className="hero__title">
            <span className="sr-only">
              Entrena con propósito. Entrenamiento funcional e híbrido en grupos de 5 personas.
            </span>
            {HERO_TITLE_LINES.map((lineWords, lineIndex) => (
              <SplitFlapText
                key={lineIndex}
                className="hero__split-flap"
                words={lineWords}
                flipDuration={0.11}
                stagger={0}
                cycleDelay={2600}
                charset="alphanumeric"
                flipsPerChar={6}
                tileColor="#1a1f22"
                textColor="#f5f7f8"
                tileRadius={5}
                gap={5}
                fontSize="clamp(1.5rem, 4.1vw, 3.375rem)"
                padTo={11}
                loop
                aria-hidden="true"
              />
            ))}
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

        <BorderGlow
          className="hero__glow"
          edgeSensitivity={30}
          glowColor="84 60 45"
          backgroundColor="#0f1214"
          borderRadius={18}
          glowRadius={44}
          glowIntensity={1.1}
          coneSpread={28}
          colors={['#7daa4f', '#4d7c28', '#9cc26a']}
        >
          <img
            src={HERO_IMAGE_SRC}
            alt={HERO_IMAGE_ALT}
            width="1600"
            height="1379"
            fetchPriority="high"
            decoding="async"
          />
          <span className="hero__media-shade" aria-hidden="true" />
        </BorderGlow>
      </div>
    </section>
  )
}

export default HeroSection