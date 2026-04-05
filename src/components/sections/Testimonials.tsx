import { useCallback, useEffect, useRef, useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import Container from '#/components/ui/Container'
import { TESTIMONIALS } from '#/data/testimonials'
import { useSectionReveal } from '#/hooks/useSectionReveal'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const revealRef = useSectionReveal()
  const [current, setCurrent] = useState(0)
  const isPaused = useRef(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const total = TESTIMONIALS.length

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % total) + total) % total)
    },
    [total],
  )

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  useEffect(() => {
    // WCAG 2.2.2: respect reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }
    timerRef.current = setInterval(() => {
      if (!isPaused.current) {
        setCurrent((c) => (c + 1) % total)
      }
    }, 5000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [total])

  return (
    <section ref={revealRef} id="testimonials" className="section-reveal bg-[#f9fafb] py-16">
      <Container>
        <h2
          className="text-center text-3xl font-bold sm:text-4xl"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          What Our Customers Say
        </h2>

        <div
          className="relative mx-auto mt-10 max-w-2xl"
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
          onMouseEnter={() => { isPaused.current = true }}
          onMouseLeave={() => { isPaused.current = false }}
          onFocus={() => { isPaused.current = true }}
          onBlur={() => { isPaused.current = false }}
        >
          <div className="overflow-hidden" aria-live="polite" aria-atomic="true">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {TESTIMONIALS.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full shrink-0 px-4"
                >
                  <div className="flex flex-col items-center text-center">
                    <StarRating rating={testimonial.rating} />
                    <blockquote className="mt-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                      &ldquo;{testimonial.text}&rdquo;
                    </blockquote>
                    <p className="mt-4 text-sm font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute -left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-50 sm:-left-12"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-50 sm:-right-12"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => goTo(i)}
                className="flex h-8 w-8 items-center justify-center rounded-full"
                aria-label={`Go to testimonial ${i + 1}`}
              >
                <span
                  className={`block h-2.5 w-2.5 rounded-full transition-colors ${
                    i === current ? 'bg-[#064e3b]' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
