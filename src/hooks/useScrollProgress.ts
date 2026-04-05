import { useEffect, useRef, useState } from 'react'

export function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const rafId = useRef<number>(0)

  useEffect(() => {
    function update() {
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const totalDistance = rect.height + windowHeight
      const travelled = windowHeight - rect.top
      const p = Math.min(1, Math.max(0, travelled / totalDistance))
      setProgress(p)
    }

    function onScroll() {
      cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return { ref, progress }
}
