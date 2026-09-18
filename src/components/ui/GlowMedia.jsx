import BorderGlow from './BorderGlow'
import './GlowMedia.css'

const DEFAULT_GLOW = {
  edgeSensitivity: 28,
  glowColor: '84 60 45',
  backgroundColor: '#0f1214',
  borderRadius: 18,
  glowRadius: 40,
  glowIntensity: 1.1,
  coneSpread: 28,
  colors: ['#7daa4f', '#4d7c28', '#9cc26a'],
}

function GlowMedia({ className = '', variant = 'flow', children, ...glowProps }) {
  return (
    <BorderGlow
      className={`glow-media glow-media--${variant} ${className}`.trim()}
      {...DEFAULT_GLOW}
      {...glowProps}
    >
      {children}
    </BorderGlow>
  )
}

export default GlowMedia
