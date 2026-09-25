import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './BounceCards.css'

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const DEFAULT_TRANSFORMS = [
  'rotate(10deg) translate(-170px)',
  'rotate(5deg) translate(-85px)',
  'rotate(-3deg)',
  'rotate(-10deg) translate(85px)',
  'rotate(2deg) translate(170px)',
]

const MAX_LABEL_BOOST = 2.2

export default function BounceCards({
  className = '',
  images = [],
  labels = [],
  alts = [],
  objectPositions = [],
  containerWidth = 400,
  containerHeight = 400,
  cardWidth,
  cardHeight,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = DEFAULT_TRANSFORMS,
  pushOffset = 160,
  enableHover = false,
}) {
  const fitRef = useRef(null)
  const stageRef = useRef(null)
  const [scale, setScale] = useState(1)

  useIsoLayoutEffect(() => {
    const node = fitRef.current

    if (!node) {
      return undefined
    }

    const update = () => {
      const width = node.clientWidth

      if (width > 0) {
        setScale(Math.min(1, width / containerWidth))
      }
    }

    update()

    if (typeof ResizeObserver === 'undefined') {
      return undefined
    }

    const observer = new ResizeObserver(update)
    observer.observe(node)

    return () => observer.disconnect()
  }, [containerWidth])

  useEffect(() => {
    const node = stageRef.current

    if (!node) {
      return undefined
    }

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    let context = null

    const play = () => {
      context = gsap.context(() => {
        gsap.fromTo(
          '.bounce-card',
          { scale: 0 },
          { scale: 1, stagger: animationStagger, ease: easeType, delay: animationDelay },
        )
      }, stageRef)
    }

    if (typeof IntersectionObserver === 'undefined') {
      play()
      return () => context?.revert()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect()
            play()
            break
          }
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      context?.revert()
    }
  }, [animationDelay, animationStagger, easeType])

  const getNoRotationTransform = (transformStr) => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr)

    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)')
    }

    if (transformStr === 'none') {
      return 'rotate(0deg)'
    }

    return `${transformStr} rotate(0deg)`
  }

  const getPushedTransform = (baseTransform, offsetX) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/
    const match = baseTransform.match(translateRegex)

    if (match) {
      const currentX = parseFloat(match[1])
      const newX = currentX + offsetX
      return baseTransform.replace(translateRegex, `translate(${newX}px)`)
    }

    return baseTransform === 'none'
      ? `translate(${offsetX}px)`
      : `${baseTransform} translate(${offsetX}px)`
  }

  const settleScale = (target) => {
    const element = Array.isArray(target) ? target[0] : target
    const current = Number(element ? gsap.getProperty(element, 'scale') : 1)

    if (Number.isFinite(current) && Math.abs(current - 1) > 0.001) {
      gsap.set(target, { scale: 1 })
    }
  }

  const pushSiblings = (hoveredIdx) => {
    if (!enableHover || !stageRef.current) {
      return
    }

    const q = gsap.utils.selector(stageRef)

    images.forEach((_, i) => {
      const target = q(`.bounce-card--${i}`)

      if (!target.length) {
        return
      }

      gsap.killTweensOf(target)
      settleScale(target)

      const baseTransform = transformStyles[i] || 'none'

      if (i === hoveredIdx) {
        gsap.to(target, {
          transform: getNoRotationTransform(baseTransform),
          duration: 0.4,
          ease: 'back.out(1.4)',
          overwrite: 'auto',
        })
      } else {
        const offsetX = i < hoveredIdx ? -pushOffset : pushOffset
        const distance = Math.abs(hoveredIdx - i)

        gsap.to(target, {
          transform: getPushedTransform(baseTransform, offsetX),
          duration: 0.4,
          ease: 'back.out(1.4)',
          delay: distance * 0.05,
          overwrite: 'auto',
        })
      }
    })
  }

  const resetSiblings = () => {
    if (!enableHover || !stageRef.current) {
      return
    }

    const q = gsap.utils.selector(stageRef)

    images.forEach((_, i) => {
      const target = q(`.bounce-card--${i}`)

      if (!target.length) {
        return
      }

      gsap.killTweensOf(target)
      settleScale(target)

      gsap.to(target, {
        transform: transformStyles[i] || 'none',
        duration: 0.4,
        ease: 'back.out(1.4)',
        overwrite: 'auto',
      })
    })
  }

  const labelBoost = Math.min(MAX_LABEL_BOOST, 1 / scale)

  return (
    <div
      ref={fitRef}
      className={`bounce-cards ${className}`.trim()}
      style={{ height: `${containerHeight * scale}px` }}
    >
      <div
        ref={stageRef}
        className="bounce-cards__stage"
        role="list"
        style={{
          width: `${containerWidth}px`,
          height: `${containerHeight}px`,
          transform: `scale(${scale})`,
          '--bc-label-boost': String(labelBoost),
        }}
      >
        {images.map((src, idx) => (
          <div
            key={`bounce-card-${idx}`}
            className={`bounce-card bounce-card--${idx}`}
            role="listitem"
            style={{
              transform: transformStyles[idx] ?? 'none',
              width: cardWidth ? `${cardWidth}px` : undefined,
              height: cardHeight ? `${cardHeight}px` : undefined,
            }}
            onMouseEnter={() => pushSiblings(idx)}
            onMouseLeave={resetSiblings}
          >
            <img
              className="bounce-card__image"
              src={src}
              alt={alts[idx] || labels[idx] || ''}
              loading="lazy"
              decoding="async"
              style={objectPositions[idx] ? { objectPosition: objectPositions[idx] } : undefined}
            />
            {labels[idx] ? <span className="bounce-card__label">{labels[idx]}</span> : null}
          </div>
        ))}
      </div>
    </div>
  )
}
