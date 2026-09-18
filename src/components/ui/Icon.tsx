import {
  BookOpen,
  Cpu,
  CreditCard,
  Users,
  Wifi,
  Smartphone,
  Sparkles,
  Wrench,
  LifeBuoy,
  ShieldCheck,
  Link2,
  PlayCircle,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const registry: Record<string, LucideIcon> = {
  users: Users,
  wifi: Wifi,
  smartphone: Smartphone,
  cpu: Cpu,
  sparkles: Sparkles,
  wrench: Wrench,
  lifebuoy: LifeBuoy,
  shield: ShieldCheck,
  link: Link2,
  book: BookOpen,
  play: PlayCircle,
  card: CreditCard,
}

export function Icon({ name, className }: { name: string; className?: string }) {
  const Component = registry[name] ?? Sparkles
  return <Component className={cn('h-5 w-5', className)} strokeWidth={1.75} aria-hidden="true" />
}
