import {
  ArrowRight,
  ArrowUp,
  ArrowsOut,
  Barbell,
  CalendarBlank,
  CaretDown,
  CaretLeft,
  CaretRight,
  CaretUp,
  ChatCircle,
  Check,
  Clock,
  EnvelopeSimple,
  FacebookLogo,
  FirstAid,
  FlowerLotus,
  House,
  InstagramLogo,
  List,
  MapPin,
  Pause,
  Phone,
  Play,
  Sparkle,
  Users,
  UsersThree,
  User,
  WhatsappLogo,
  X,
} from '@phosphor-icons/react'

const registry = {
  home: House,
  team: UsersThree,
  physio: FirstAid,
  pilates: FlowerLotus,
  pricing: CalendarBlank,
  contact: ChatCircle,
  instagram: InstagramLogo,
  whatsapp: WhatsappLogo,
  facebook: FacebookLogo,
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,
  caretDown: CaretDown,
  caretLeft: CaretLeft,
  caretRight: CaretRight,
  caretUp: CaretUp,
  pause: Pause,
  play: Play,
  check: Check,
  phone: Phone,
  mail: EnvelopeSimple,
  pin: MapPin,
  clock: Clock,
  sparkle: Sparkle,
  barbell: Barbell,
  close: X,
  menu: List,
  expand: ArrowsOut,
  group: Users,
  user: User,
}

function Icon({ name, size = 20, ...rest }) {
  const Glyph = registry[name]

  if (!Glyph) {
    return null
  }

  return <Glyph weight="bold" size={size} aria-hidden="true" {...rest} />
}

export default Icon