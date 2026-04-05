import { useEffect, useRef } from 'react'

export function useSectionReveal() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Skip animation entirely for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.classList.add('revealed')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('revealed')
          observer.unobserve(element)
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return ref
}
