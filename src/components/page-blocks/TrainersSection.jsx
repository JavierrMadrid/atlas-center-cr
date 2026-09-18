import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import GlowMedia from '../ui/GlowMedia'
import Icon from '../ui/Icon'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

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

const FLIP_DELAY = 520
const CLOSE_DELAY = 640

function TrainersSection({
  trainers,
  headingLevel = 'h2',
  headingTitle = 'Equipo',
  headingDescription,
  viewAll = false,
  glow = false,
}) {
  const [active, setActive] = useState(null)
  const [flightTransform, setFlightTransform] = useState(null)
  const [transEnabled, setTransEnabled] = useState(false)
  const [settled, setSettled] = useState(false)
  const [flipped, setFlipped] = useState(false)

  const cardRef = useRef(null)
  const closeButtonRef = useRef(null)
  const triggerRef = useRef(null)
  const closingRef = useRef(false)
  const flightKeyRef = useRef(null)

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
    const trigger = event.currentTarget

    triggerRef.current = trigger
    closingRef.current = false
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
    if (!active || !settled || flipped || closingRef.current) {
      return undefined
    }

    const timer = window.setTimeout(() => setFlipped(true), FLIP_DELAY)
    return () => window.clearTimeout(timer)
  }, [active, settled, flipped])

  useEffect(() => {
    if (!active || settled || !closingRef.current) {
      return undefined
    }

    const timer = window.setTimeout(() => finishClose(), CLOSE_DELAY)
    return () => window.clearTimeout(timer)
  }, [active, settled, finishClose])

  useEffect(() => {
    if (!active) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [active])

  useEffect(() => {
    if (!active) {
      return undefined
    }

    const trigger = triggerRef.current
    const frame = window.requestAnimationFrame(() => closeButtonRef.current?.focus())

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        close()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('keydown', handleKeyDown)

      if (trigger && document.contains(trigger)) {
        trigger.focus()
      }
    }
  }, [active, close])

  const cardStyle = {
    transform: settled ? 'translate(-50%, -50%)' : flightTransform || 'translate(-50%, -50%)',
  }

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
                Todo el equipo
                <Icon name="arrowRight" size={16} className="btn__icon" />
              </Link>
            ) : null}
          </div>
        </Reveal>

        <div className="trainers-grid">
          {trainers.map((trainer, index) => {
            const isSource = active?.trainer.name === trainer.name

            return (
              <Reveal
                key={trainer.name}
                as="article"
                delay={index * 60}
                className={`trainer-card${isSource ? ' trainer-card--source' : ''}${
                  glow ? ' trainer-card--glow' : ''
                }`}
              >
                <button
                  type="button"
                  className="trainer-card__flip"
                  onClick={(event) => openTrainer(trainer, event)}
                  aria-label={`Ampliar perfil de ${trainer.name}`}
                >
                  <div className="trainer-card__flip-inner">
                    <div className="trainer-card__face trainer-card__face--front">
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
                      <h3 className="trainer-card__name">{trainer.name}</h3>
                      <span className="trainer-card__hint">Ver perfil</span>
                    </div>
                  </div>
                </button>
              </Reveal>
            )
          })}
        </div>
      </div>

      {active && typeof document !== 'undefined'
        ? createPortal(
            <div
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
                <div
                  className={`trainer-card__flip-inner trainer-modal__inner${
                    flipped ? ' is-flipped' : ''
                  }`}
                >
                  <div className="trainer-card__face trainer-card__face--front">
                    <img
                      src={active.trainer.image}
                      alt={`Miembro del equipo ${active.trainer.name}`}
                      decoding="async"
                      width="1200"
                      height="1600"
                      style={trainerImagePositions[active.trainer.name]}
                    />
                    <h3 className="trainer-card__name">{active.trainer.name}</h3>
                  </div>

                  <div className="trainer-card__face trainer-card__face--back">
                    <h3>{active.trainer.name}</h3>
                    <div className="trainer-card__description">
                      {renderTrainerDescription(active.trainer.description)}
                    </div>
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </section>
  )
}

export default TrainersSection
