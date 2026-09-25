import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import BounceCards from '../ui/BounceCards'
import FlipCard from '../ui/FlipCard'
import GlowMedia from '../ui/GlowMedia'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { useFocusTrap } from '../../utils/useFocusTrap'

const EMOJI_PATTERNS = [
  /[\u{1F000}-\u{1FAFF}]/gu,
  /[\u{2600}-\u{27BF}]/gu,
  /[\u{2B00}-\u{2BFF}]/gu,
  /[\u{FE0F}]/gu,
  /[\u{200D}]/gu,
]

const stripEmoji = (value) => {
  if (typeof value !== 'string') {
    return value
  }

  let result = value
  for (const pattern of EMOJI_PATTERNS) {
    result = result.replace(pattern, '')
  }

  return result
}

const renderInlineMarkdown = (text) => {
  const value = typeof text === 'string' ? text : ''
  const segments = value.split(/(\*\*[^*]+\*\*)/g)

  return segments.map((segment, index) => {
    const boldMatch = segment.match(/^\*\*([^*]+)\*\*$/)

    if (boldMatch) {
      return <strong key={`strong-${index}`}>{boldMatch[1]}</strong>
    }

    return <span key={`text-${index}`}>{segment}</span>
  })
}

const renderTrainerDescription = (description) => {
  const content =
    typeof description === 'string'
      ? stripEmoji(description)
          .replace(/\\r\\n/g, '\n')
          .replace(/\r\n/g, '\n')
          .replace(/\\n/g, '\n')
          .trim()
      : ''

  if (!content) {
    return null
  }

  const blocks = []
  let currentBlock = null
  let pendingEmptyLines = 0

  for (const rawLine of content.split('\n')) {
    const line = rawLine.trim()

    if (!line) {
      if (currentBlock?.lines.length) {
        blocks.push(currentBlock)
      }

      currentBlock = null
      pendingEmptyLines += 1
      continue
    }

    if (pendingEmptyLines > 0 && blocks.length > 0) {
      for (let index = 0; index < pendingEmptyLines; index += 1) {
        blocks.push({ type: 'spacer' })
      }
    }

    pendingEmptyLines = 0

    const nextType = line.startsWith('- ') ? 'list' : 'paragraph'
    const nextLine = nextType === 'list' ? line.slice(2) : line

    if (!currentBlock || currentBlock.type !== nextType) {
      if (currentBlock?.lines.length) {
        blocks.push(currentBlock)
      }

      currentBlock = { type: nextType, lines: [] }
    }

    currentBlock.lines.push(nextLine)
  }

  if (currentBlock?.lines.length) {
    blocks.push(currentBlock)
  }

  return blocks.map((block, blockIndex) => {
    if (block.type === 'spacer') {
      return <div key={`spacer-${blockIndex}`} className="trainer-card__description-spacer" />
    }

    if (block.type === 'list') {
      return (
        <ul key={`list-${blockIndex}`}>
          {block.lines.map((line, lineIndex) => (
            <li key={`list-item-${blockIndex}-${lineIndex}`}>{renderInlineMarkdown(line)}</li>
          ))}
        </ul>
      )
    }

    return (
      <p key={`p-${blockIndex}`}>
        {block.lines.map((line, lineIndex) => (
          <span key={`p-line-${blockIndex}-${lineIndex}`}>
            {lineIndex > 0 ? <br /> : null}
            {renderInlineMarkdown(line)}
          </span>
        ))}
      </p>
    )
  })
}

const trainerImagePositions = {
  Sergio: { objectPosition: '25% center' },
  Carlos: { objectPosition: 'center 18%' },
}

const SPREAD_LAYOUTS = {
  wide: {
    containerWidth: 1040,
    containerHeight: 442,
    cardWidth: 275,
    cardHeight: 367,
    maxOffset: 300,
    maxRotation: 4.5,
    pushOffset: 50,
  },
  compact: {
    containerWidth: 960,
    containerHeight: 400,
    cardWidth: 240,
    cardHeight: 320,
    maxOffset: 320,
    maxRotation: 4.5,
    pushOffset: 24,
  },
}

const buildFanTransforms = (count, { maxOffset, maxRotation }) => {
  if (count < 1) {
    return []
  }

  const half = (count - 1) / 2

  return Array.from({ length: count }, (_, index) => {
    if (half === 0) {
      return 'rotate(0deg) translate(0px)'
    }

    const offset = ((index - half) / half) * maxOffset
    const rotation = (offset / maxOffset) * maxRotation

    return `rotate(${rotation.toFixed(2)}deg) translate(${offset.toFixed(1)}px)`
  })
}

const FLIP_DELAY = 520
const CLOSE_DELAY = 640

function TrainersSection({
  trainers,
  headingLevel = 'h2',
  headingTitle = 'Equipo',
  headingDescription,
  viewAll = false,
  glow = false,
  expandOnClick = false,
  nameAsLabel = false,
  layout = 'grid',
}) {
  const [active, setActive] = useState(null)
  const [flightTransform, setFlightTransform] = useState(null)
  const [transEnabled, setTransEnabled] = useState(false)
  const [settled, setSettled] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const [narrowSpread, setNarrowSpread] = useState(false)

  const CardHeading = headingLevel === 'h1' ? 'h2' : 'h3'
  const trainerList = Array.isArray(trainers) ? trainers : []
  const isSpread = layout === 'spread'
  const spreadLayout = SPREAD_LAYOUTS[narrowSpread ? 'compact' : 'wide']

  useLayoutEffect(() => {
    if (!isSpread || typeof window === 'undefined') {
      return undefined
    }

    const query = window.matchMedia('(max-width: 700px)')
    const sync = () => setNarrowSpread(query.matches)

    sync()

    if (typeof query.addEventListener !== 'function') {
      query.addListener(sync)
      return () => query.removeListener(sync)
    }

    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [isSpread])

  const cardRef = useRef(null)
  const closeButtonRef = useRef(null)
  const triggerRef = useRef(null)
  const modalRef = useRef(null)
  const closingRef = useRef(false)
  const flightKeyRef = useRef(null)
  const autoFlippedRef = useRef(false)

  const finishClose = useCallback(() => {
    closingRef.current = false
    setActive(null)
    setFlightTransform(null)
    setTransEnabled(false)
  }, [])

  const close = useCallback(() => {
    if (closingRef.current) {
      return
    }

    closingRef.current = true
    setFlipped(false)
    setSettled(false)
  }, [])

  const openTrainer = (trainer, event) => {
    if (active || closingRef.current) {
      return
    }

    const trigger = event.currentTarget

    triggerRef.current = trigger
    closingRef.current = false
    autoFlippedRef.current = false
    setFlightTransform(null)
    setTransEnabled(false)
    setSettled(false)
    setFlipped(false)
    setActive({ trainer, rect: trigger.getBoundingClientRect() })
  }

  useLayoutEffect(() => {
    if (!active) {
      flightKeyRef.current = null
      return undefined
    }

    if (flightKeyRef.current === active) {
      return undefined
    }

    const node = cardRef.current

    if (!node) {
      return undefined
    }

    flightKeyRef.current = active

    const target = node.getBoundingClientRect()
    const { rect } = active
    const scaleX = rect.width / target.width
    const scaleY = rect.height / target.height
    const deltaX = rect.left + rect.width / 2 - (target.left + target.width / 2)
    const deltaY = rect.top + rect.height / 2 - (target.top + target.height / 2)

    setFlightTransform(
      `translate(-50%, -50%) translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`,
    )

    return undefined
  }, [active])

  useEffect(() => {
    if (!active || !flightTransform) {
      return undefined
    }

    let frameTwo = 0
    const frameOne = window.requestAnimationFrame(() => {
      if (closingRef.current) {
        return
      }

      setTransEnabled(true)
      frameTwo = window.requestAnimationFrame(() => {
        if (!closingRef.current) {
          setSettled(true)
        }
      })
    })

    return () => {
      window.cancelAnimationFrame(frameOne)
      window.cancelAnimationFrame(frameTwo)
    }
  }, [active, flightTransform])

  useEffect(() => {
    if (!active || !settled || flipped || closingRef.current || autoFlippedRef.current) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      autoFlippedRef.current = true
      setFlipped(true)
    }, FLIP_DELAY)
    return () => window.clearTimeout(timer)
  }, [active, settled, flipped])

  useEffect(() => {
    if (!active || settled || !closingRef.current) {
      return undefined
    }

    const timer = window.setTimeout(() => finishClose(), CLOSE_DELAY)
    return () => window.clearTimeout(timer)
  }, [active, settled, finishClose])

  useFocusTrap(modalRef, {
    active: Boolean(active),
    onClose: close,
    initialFocusRef: closeButtonRef,
    restoreFocusRef: triggerRef,
  })

  const cardStyle = {
    transform: settled ? 'translate(-50%, -50%)' : flightTransform || 'translate(-50%, -50%)',
  }

  const spread = isSpread
    ? {
        images: trainerList.map((trainer) => trainer.image),
        labels: trainerList.map((trainer) => trainer.profession || ''),
        alts: trainerList.map((trainer) =>
          trainer.profession ? `${trainer.profession} en Atlas Center` : trainer.name,
        ),
        objectPositions: trainerList.map(
          (trainer) => trainerImagePositions[trainer.name]?.objectPosition,
        ),
        transformStyles: buildFanTransforms(trainerList.length, spreadLayout),
        containerWidth: spreadLayout.containerWidth,
        containerHeight: spreadLayout.containerHeight,
        cardWidth: spreadLayout.cardWidth,
        cardHeight: spreadLayout.cardHeight,
        pushOffset: spreadLayout.pushOffset,
        enableHover: true,
      }
    : null

  return (
    <section id="equipo" className="section">
      <div className="container">
        <Reveal>
          <div className="trainers-section__intro">
            <SectionHeading
              level={headingLevel}
              title={headingTitle}
              description={headingDescription}
            />
            {viewAll ? (
              <Link className="btn btn--ghost" to="/equipo">
                Conoce al equipo
                <Icon name="arrowRight" size={16} className="btn__icon" />
              </Link>
            ) : null}
          </div>
        </Reveal>

        {isSpread && trainerList.length > 0 ? (
          <Reveal className="trainers-spread" delay={60}>
            <BounceCards {...spread} />
          </Reveal>
        ) : trainerList.length === 0 ? (
          <p className="service__note">
            Estamos completando el equipo. Escríbenos desde{' '}
            <Link to="/contacto">contacto</Link> y te contamos quién te acompaña.
          </p>
        ) : (
          <div className="trainers-grid">
            {trainerList.map((trainer, index) => {
              const isSource = active?.trainer.name === trainer.name
              const nameHint = (
                <>
                  <span className="trainer-card__name">{trainer.name}</span>
                  <span className="trainer-card__hint">Ver perfil</span>
                </>
              )

              return (
                <Reveal
                  key={trainer.name}
                  as="article"
                  delay={index * 60}
                  className={`trainer-card${isSource ? ' trainer-card--source' : ''}${
                    glow ? ' trainer-card--glow' : ''
                  }`}
                >
                  <CardHeading className="sr-only">{trainer.name}</CardHeading>
                  <FlipCard
                    className="trainer-flip"
                    ariaLabel={`Perfil de ${trainer.name}`}
                    width="100%"
                    height="auto"
                    radius={18}
                    background="var(--surface-solid)"
                    color="var(--text)"
                    axis="y"
                    tiltMax={10}
                    glareOpacity={0.16}
                    hoverScale={1.02}
                    flipOnClick={!expandOnClick}
                    draggable={!expandOnClick}
                    onActivate={
                      expandOnClick ? (event) => openTrainer(trainer, event) : undefined
                    }
                    front={
                      <>
                        {glow ? (
                          <GlowMedia className="trainer-card__glow" variant="fill">
                            <img
                              src={trainer.image}
                              alt={`Miembro del equipo ${trainer.name}`}
                              loading="lazy"
                              decoding="async"
                              width="1200"
                              height="1600"
                              style={trainerImagePositions[trainer.name]}
                            />
                          </GlowMedia>
                        ) : (
                          <img
                            src={trainer.image}
                            alt={`Miembro del equipo ${trainer.name}`}
                            loading="lazy"
                            decoding="async"
                            width="1200"
                            height="1600"
                            style={trainerImagePositions[trainer.name]}
                          />
                        )}
                        {nameAsLabel ? (
                          <div className="trainer-card__caption">
                            <div className="trainer-card__label">
                              <span className="trainer-card__name">{trainer.name}</span>
                            </div>
                            <span className="trainer-card__hint">Ver perfil</span>
                          </div>
                        ) : (
                          nameHint
                        )}
                      </>
                    }
                    back={
                      <>
                        <CardHeading className="trainer-card__heading">
                          {trainer.name}
                        </CardHeading>
                        <div className="trainer-card__description">
                          {renderTrainerDescription(trainer.description)}
                        </div>
                      </>
                    }
                  />
                </Reveal>
              )
            })}
          </div>
        )}
      </div>

      {expandOnClick && active && typeof document !== 'undefined'
        ? createPortal(
            <div
              ref={modalRef}
              className="trainer-modal"
              role="dialog"
              aria-modal="true"
              aria-label={`Perfil de ${active.trainer.name}`}
              onClick={close}
            >
              <button
                ref={closeButtonRef}
                type="button"
                className="trainer-modal__close"
                onClick={close}
                aria-label="Cerrar perfil"
              >
                <Icon name="close" size={20} />
              </button>

              <div
                ref={cardRef}
                className={`trainer-modal__card${transEnabled ? ' is-ready' : ''}`}
                style={cardStyle}
                onClick={(event) => event.stopPropagation()}
              >
                <FlipCard
                  className="trainer-flip trainer-flip--modal"
                  ariaLabel={`Perfil de ${active.trainer.name}`}
                  width="100%"
                  height="100%"
                  radius={18}
                  background="var(--surface-solid)"
                  color="var(--text)"
                  axis="y"
                  tiltMax={8}
                  glareOpacity={0.16}
                  hoverScale={1.01}
                  flipped={flipped}
                  onFlipChange={setFlipped}
                  front={
                    <>
                      <img
                        src={active.trainer.image}
                        alt={`Miembro del equipo ${active.trainer.name}`}
                        decoding="async"
                        width="1200"
                        height="1600"
                        style={trainerImagePositions[active.trainer.name]}
                      />
                      {nameAsLabel ? (
                        <div className="trainer-card__caption">
                          <div className="trainer-card__label">
                            <span className="trainer-card__name">{active.trainer.name}</span>
                          </div>
                        </div>
                      ) : (
                        <span className="trainer-card__name">{active.trainer.name}</span>
                      )}
                    </>
                  }
                  back={
                    <>
                      <CardHeading className="trainer-card__heading">
                        {active.trainer.name}
                      </CardHeading>
                      <div className="trainer-card__description">
                        {renderTrainerDescription(active.trainer.description)}
                      </div>
                    </>
                  }
                />
              </div>
            </div>,
            document.body,
          )
        : null}
    </section>
  )
}

export default TrainersSection
