import Icon from './Icon'
import './PriceMarquee.css'

function buildCards(prices) {
  const items = Array.isArray(prices) && prices.length > 0 ? prices : []

  return items.flatMap((item) => [
    {
      id: `${item.label}-socio`,
      sessions: item.label,
      price: item.memberPrice,
      audience: 'Socio',
    },
    {
      id: `${item.label}-no-socio`,
      sessions: item.label,
      price: item.nonMemberPrice,
      audience: 'No socio',
    },
  ])
}

const AUDIENCE_ICONS = {
  Socio: 'group',
  'No socio': 'user',
}

function renderCard(card) {
  return (
    <article className="price-marquee__card" key={card.id}>
      <p className="price-marquee__sessions">{card.sessions}</p>
      <div className="price-marquee__meta">
        <span
          className={`price-marquee__icon price-marquee__icon--${card.audience === 'Socio' ? 'member' : 'guest'}`}
          aria-hidden="true"
        >
          <Icon name={AUDIENCE_ICONS[card.audience] ?? 'physio'} size={18} />
        </span>
        <div className="price-marquee__info">
          <span className="price-marquee__price">{card.price}</span>
          <span className="price-marquee__audience">{card.audience}</span>
        </div>
      </div>
    </article>
  )
}

function PriceMarquee({ prices, duration = 22, variant = 'marquee', className = '' }) {
  const cards = buildCards(prices)

  if (cards.length === 0) {
    return null
  }

  if (variant === 'grid' || variant === 'row') {
    return (
      <div
        className={`price-marquee price-marquee--${variant} ${className}`.trim()}
        aria-label="Precios de fisioterapia"
      >
        {cards.map(renderCard)}
      </div>
    )
  }

  const loop = [...cards, ...cards]

  return (
    <div
      className={`price-marquee ${className}`.trim()}
      style={{ '--marquee-duration': `${duration}s` }}
      aria-label="Precios de fisioterapia"
    >
      <div className="price-marquee__track">{loop.map(renderCard)}</div>
    </div>
  )
}

export default PriceMarquee
