import { useState } from 'react'
import { Link } from 'react-router-dom'
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

function TrainersSection({
  trainers,
  headingLevel = 'h2',
  headingTitle = 'Equipo',
  headingDescription,
  viewAll = false,
}) {
  const [flippedCards, setFlippedCards] = useState(() => new Set())

  const toggleCard = (trainerName) => {
    setFlippedCards((previous) => {
      const next = new Set(previous)

      if (next.has(trainerName)) {
        next.delete(trainerName)
      } else {
        next.add(trainerName)
      }

      return next
    })
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
            const isFlipped = flippedCards.has(trainer.name)

            return (
              <Reveal
                key={trainer.name}
                as="article"
                delay={index * 60}
                className={`trainer-card${isFlipped ? ' is-flipped' : ''}`}
              >
                <button
                  type="button"
                  className="trainer-card__flip"
                  onClick={() => toggleCard(trainer.name)}
                  aria-label={`${isFlipped ? 'Ver foto de' : 'Ver perfil de'} ${trainer.name}`}
                  aria-pressed={isFlipped}
                >
                  <div className="trainer-card__flip-inner">
                    <div className="trainer-card__face trainer-card__face--front">
                      <img
                        src={trainer.image}
                        alt={`Miembro del equipo ${trainer.name}`}
                        loading="lazy"
                        decoding="async"
                        width="1200"
                        height="1600"
                        style={trainerImagePositions[trainer.name]}
                      />
                      <h3 className="trainer-card__name">{trainer.name}</h3>
                      <span className="trainer-card__hint">Ver perfil</span>
                    </div>

                    <div className="trainer-card__face trainer-card__face--back">
                      <h3>{trainer.name}</h3>
                      <div className="trainer-card__description">
                        {renderTrainerDescription(trainer.description)}
                      </div>
                    </div>
                  </div>
                </button>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TrainersSection