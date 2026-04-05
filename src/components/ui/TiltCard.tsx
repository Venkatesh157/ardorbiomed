import { useCallback, useRef, type MouseEvent } from 'react'
import { cn } from '#/lib/utils'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
}

export default function TiltCard({ children, className, maxTilt = 8 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current
      if (!card) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      if ('ontouchstart' in window) return // no tilt on touch devices

      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      card.style.transform = `perspective(800px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg) scale3d(1.02, 1.02, 1.02)`
    },
    [maxTilt],
  )

  const handleLeave = useCallback(() => {
    const card = cardRef.current
    if (card) {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn('transition-transform duration-200 will-change-transform', className)}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}
