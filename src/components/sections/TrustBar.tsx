import { Shield, Landmark, Heart, BookOpen, ShoppingBag, type LucideIcon } from 'lucide-react'
import Container from '#/components/ui/Container'
import AnimatedCounter from '#/components/ui/AnimatedCounter'
import { TRUST_STATS, type TrustStat } from '#/data/trust-stats'
import { useSectionReveal } from '#/hooks/useSectionReveal'

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Landmark,
  Heart,
  BookOpen,
  ShoppingBag,
}

function StatItem({ stat }: { stat: TrustStat }) {
  const Icon = iconMap[stat.icon]

  return (
    <div className="flex items-center gap-2 whitespace-nowrap px-3 py-2">
      {Icon && <Icon className="h-5 w-5 shrink-0 text-[#064e3b]" aria-hidden="true" />}
      <span className="text-sm font-semibold text-gray-800">
        {stat.numericValue != null ? (
          <AnimatedCounter
            target={stat.numericValue}
            suffix={stat.suffix ?? ''}
            duration={2000}
          />
        ) : (
          stat.value
        )}
        <span className="sr-only"> — {stat.label}</span>
      </span>
    </div>
  )
}

export default function TrustBar() {
  const revealRef = useSectionReveal()

  return (
    <section ref={revealRef} id="trust-bar" className="section-reveal bg-[#f9fafb] py-4">
      <Container>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-0">
          {TRUST_STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center justify-center"
            >
              <StatItem stat={stat} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
