import { Leaf, FlaskConical, Recycle, Award, type LucideIcon } from 'lucide-react'
import Container from '#/components/ui/Container'
import { useInView } from '#/hooks/useInView'
import { USPS, type USP } from '#/data/usps'
import { cn } from '#/lib/utils'
import { useSectionReveal } from '#/hooks/useSectionReveal'

const iconMap: Record<string, LucideIcon> = {
  Leaf,
  FlaskConical,
  Recycle,
  Award,
}

function USPCard({ usp, index, isVisible }: { usp: USP; index: number; isVisible: boolean }) {
  const Icon = iconMap[usp.icon]

  return (
    <div
      className={cn(
        'rounded-2xl border border-transparent bg-[#0f2f0f] p-6 transition-all duration-500 hover:border-[#6fc54d]/60',
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0',
      )}
      style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
    >
      {Icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#6fc54d]/20">
          <Icon className="h-6 w-6 text-[#6fc54d]" aria-hidden="true" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-white">{usp.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-400">
        {usp.description}
      </p>
    </div>
  )
}

export default function WhyArdorBiomed() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 })
  const revealRef = useSectionReveal()

  return (
    <section ref={revealRef} id="why-us" className="section-reveal bg-[#0a1f0a] py-16">
      <Container>
        <h2
          className="text-center text-3xl font-bold text-white sm:text-4xl"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          Why Ardor Biomed?
        </h2>

        <div
          ref={ref}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {USPS.map((usp, i) => (
            <USPCard key={usp.title} usp={usp} index={i} isVisible={isInView} />
          ))}
        </div>
      </Container>
    </section>
  )
}
