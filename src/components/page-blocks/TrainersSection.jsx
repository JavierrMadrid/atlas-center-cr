import { useState } from 'react'
import SectionHeading from '../ui/SectionHeading'

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
      ? description
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

function TrainersSection({ trainers, headingLevel = 'h2' }) {
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
    <section id="equipo" className="section pricing-section team-section section--reveal">
      <SectionHeading
        level={headingLevel}
        title="Equipo"
        description="Conoce a nuestro equipo multidisciplinar de entrenamiento y fisioterapia, con una misma filosofia de trabajo: tecnica, intensidad y cercania."
      />

      <div className="pricing-schedule-grid pricing-schedule-grid--stack">
        <article className="panel panel--team">
          <div className="trainers-grid">
            {trainers.map((trainer) => {
              const isFlipped = flippedCards.has(trainer.name)

              return (
                <article
                  key={trainer.name}
                  className={`trainer-card${isFlipped ? ' is-flipped' : ''}`}
                >
                  <button
                    type="button"
                    className="trainer-card__flip"
                    onClick={() => toggleCard(trainer.name)}
                    aria-label={`${isFlipped ? 'Ver foto de' : 'Ver descripcion de'} ${trainer.name}`}
                    aria-pressed={isFlipped}
                  >
                    <div className="trainer-card__flip-inner">
                      <div className="trainer-card__face trainer-card__face--front">
                        <img
                          src={trainer.image}
                          alt={`Miembro del equipo ${trainer.name}`}
                          loading="lazy"
                          style={trainerImagePositions[trainer.name]}
                        />
                        <div className="trainer-card__overlay">
                          <p>Pulsa para ver su descripcion</p>
                          <h3>{trainer.name}</h3>
                        </div>
                      </div>

                      <div className="trainer-card__face trainer-card__face--back">
                        <h3>{trainer.name}</h3>
                        <div className="trainer-card__description">
                          {renderTrainerDescription(trainer.description)}
                        </div>
                      </div>
                    </div>
                  </button>
                </article>
              )
            })}
          </div>
        </article>
      </div>
    </section>
  )
}

export default TrainersSection
