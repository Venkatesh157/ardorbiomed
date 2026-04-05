import { useState, type FormEvent } from 'react'
import Container from '#/components/ui/Container'
import Button from '#/components/ui/Button'
import { useToast } from '#/components/ui/Toast'
import { useSectionReveal } from '#/hooks/useSectionReveal'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function OfferBanner() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const { addToast } = useToast()
  const revealRef = useSectionReveal()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    if (!EMAIL_REGEX.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    // TODO: Connect to Mailchimp/SendGrid API
    addToast('Check your inbox for the code!', 'success')
    setEmail('')
  }

  return (
    <section
      ref={revealRef}
      id="offer"
      className="section-reveal py-16"
      style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #6fc54d 100%)',
      }}
    >
      <Container className="text-center">
        <h2
          className="text-3xl font-bold text-white sm:text-4xl"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          First Order? Get 20% Off
        </h2>
        <p className="mx-auto mt-3 max-w-md text-green-100">
          Use code FIRST20 at checkout for 20% off your first order
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 rounded-full border-0 px-5 py-3 text-sm text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-white"
            aria-label="Email address"
          />
          <Button type="submit" variant="secondary" size="lg" className="bg-white text-[#064e3b] hover:bg-gray-100">
            Get My Code
          </Button>
        </form>

        {error && (
          <p role="alert" className="mt-2 text-sm font-medium text-red-200">{error}</p>
        )}
      </Container>
    </section>
  )
}
