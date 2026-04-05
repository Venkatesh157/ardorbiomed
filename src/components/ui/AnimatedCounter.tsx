import { useEffect, useRef, useState } from 'react'
import { useInView } from '#/hooks/useInView'

interface AnimatedCounterProps {
  target: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export default function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  duration = 2000,
  className,
}: AnimatedCounterProps) {
  const { ref, isInView } = useInView<HTMLSpanElement>({ threshold: 0.3 })
  const [value, setValue] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }

    const start = performance.now()

    function animate(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out: fast start, slow end
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, target, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{value.toLocaleString('en-IN')}{suffix}
    </span>
  )
}
