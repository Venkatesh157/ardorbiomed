import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Button from '#/components/ui/Button'

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoReadyRef = useRef(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const rafId = useRef(0)

  useEffect(() => {
    const section = heroRef.current
    const video = videoRef.current
    if (!section) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      section.style.setProperty('--scroll-progress', '0')
      return
    }

    // Handle already-cached video (metadata may already be available)
    if (video && video.readyState >= 1) {
      videoReadyRef.current = true
    }

    const handleScroll = () => {
      cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect()
        const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)))
        section.style.setProperty('--scroll-progress', String(progress))

        // Scrub video to match scroll position
        if (video && videoReadyRef.current && video.duration) {
          video.currentTime = progress * video.duration
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[170dvh]"
    >
      {/* Sticky viewport — pins everything during 170dvh scroll */}
      <div className="hero-inner sticky top-0 h-dvh overflow-hidden">

        {/* Video background — scroll-driven playback */}
        <video
          ref={videoRef}
          className="hero-video absolute inset-0 h-full w-full object-cover object-center"
          src="/videos/hero-animation.mp4"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onLoadedMetadata={() => { videoReadyRef.current = true }}
          onError={() => setVideoFailed(true)}
          style={{ display: videoFailed ? 'none' : 'block' }}
        />

        {/* Fallback image — shown if video fails to load */}
        {videoFailed && (
          <img
            src="/images/hero_coconut.png"
            alt=""
            aria-hidden="true"
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="high"
            className="hero-bg-image absolute inset-0 h-full w-full object-cover object-center"
          />
        )}

        {/* Dimming overlay — Phase 3 darkening */}
        <div className="hero-dim-overlay absolute inset-0 z-[1] pointer-events-none" />

        {/* Gradient overlay for text readability */}
        <div className="hero-text-gradient absolute inset-0 z-[2] hidden md:block" />
        <div className="hero-text-gradient-mobile absolute inset-0 z-[2] md:hidden" />

        {/* Text content */}
        <div className="relative z-10 flex h-full items-end pb-20 md:items-center md:pb-0">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
            <div className="max-w-xl">
              <h1
                className="hero-headline hero-load-in font-bold leading-[1.05] tracking-tight text-white"
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                  textShadow: '0 2px 30px rgba(0,0,0,0.5)',
                }}
              >
                Nature&apos;s Science, Perfected
              </h1>

              <p
                className="hero-subtitle hero-load-in-subtitle mt-4 max-w-md text-white/75 md:mt-5"
                style={{
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)',
                  lineHeight: 1.6,
                }}
              >
                Coconut-derived biomedical innovation for a healthier life
              </p>

              <div className="hero-ctas hero-load-in-ctas mt-7 flex flex-col gap-3 sm:flex-row md:mt-9">
                <a href="#featured">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Shop Products
                  </Button>
                </a>
                <a href="#why-us">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-white/30 text-white hover:bg-white/10 hover:text-white sm:w-auto"
                  >
                    Our Story
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator absolute inset-x-0 bottom-6 z-10 flex justify-center">
          <button
            type="button"
            aria-label="Scroll down"
            className="text-white/40 transition-colors hover:text-white/70"
            onClick={() => window.scrollBy({ top: window.innerHeight * 0.6, behavior: 'smooth' })}
          >
            <ChevronDown className="h-7 w-7" />
          </button>
        </div>
      </div>
    </section>
  )
}
