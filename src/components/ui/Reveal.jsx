import { useEffect, useRef, useState } from 'react'

function Reveal({ as = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current

    if (!node) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
            break
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  const Tag = as
  const classes = ['reveal']
  if (visible) classes.push('is-visible')
  if (className) classes.push(className)

  return (
    <Tag
      ref={ref}
      className={classes.join(' ')}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Reveal