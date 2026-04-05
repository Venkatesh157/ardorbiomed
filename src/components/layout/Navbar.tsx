import { Menu, Search, User, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import CartIcon from '#/components/cart/CartIcon'

const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'Products', href: '#featured' },
  { label: 'About', href: '#why-us' },
  { label: 'Contact', href: '#' },
] as const

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  function closeMobile() {
    setMobileOpen(false)
    hamburgerRef.current?.focus()
  }

  return (
    <>
      <header
        className={[
          'sticky top-0 z-40 w-full transition-all duration-300',
          scrolled
            ? 'border-b border-gray-100 bg-white/80 shadow-sm backdrop-blur-md'
            : 'bg-white',
        ].join(' ')}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Mobile: hamburger */}
          <button
            ref={hamburgerRef}
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-dialog"
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-[#1a1a1a] transition-colors hover:bg-gray-100 md:hidden"
          >
            <Menu size={22} strokeWidth={2} />
          </button>

          {/* Logo */}
          <a
            href="#"
            aria-label="Ardor Biomed home"
            className="flex-shrink-0 no-underline md:mr-8"
          >
            <span
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              className="text-xl font-bold tracking-tight text-[#6fc54d] md:text-2xl"
            >
              Ardor Biomed
            </span>
          </a>

          {/* Desktop center nav */}
          <nav
            aria-label="Primary navigation"
            className="hidden flex-1 items-center justify-center gap-8 md:flex"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-sm font-medium text-[#1a1a1a] no-underline transition-colors duration-150 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#6fc54d] after:transition-transform after:duration-200 hover:text-[#064e3b] hover:after:scale-x-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right icon group */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Search products"
              className="hidden h-9 w-9 items-center justify-center rounded-md text-[#1a1a1a] transition-colors hover:bg-gray-100 md:flex"
            >
              <Search size={20} strokeWidth={1.75} />
            </button>
            <CartIcon />
            <button
              type="button"
              aria-label="Account"
              className="hidden h-9 w-9 items-center justify-center rounded-md text-[#1a1a1a] transition-colors hover:bg-gray-100 md:flex"
            >
              <User size={20} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div
          ref={overlayRef}
          id="mobile-nav-dialog"
          className="fixed inset-0 z-50 md:hidden"
          aria-modal="true"
          role="dialog"
          aria-label="Navigation menu"
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeMobile}
            aria-hidden="true"
          />
          <div
            className="relative flex h-full w-72 max-w-[85vw] flex-col bg-white shadow-2xl"
            style={{
              animation: 'slideInFromLeft 250ms cubic-bezier(0.16, 1, 0.3, 1) both',
            }}
          >
            <div className="flex h-16 items-center justify-between border-b border-gray-100 px-5">
              <a href="#" onClick={closeMobile} aria-label="Ardor Biomed home" className="no-underline">
                <span
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  className="text-xl font-bold text-[#6fc54d]"
                >
                  Ardor Biomed
                </span>
              </a>
              <button
                type="button"
                onClick={closeMobile}
                aria-label="Close navigation menu"
                className="flex h-9 w-9 items-center justify-center rounded-md text-[#1a1a1a] transition-colors hover:bg-gray-100"
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="flex flex-col gap-1 px-4 pt-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={closeMobile}
                  className="rounded-lg px-3 py-3 text-base font-medium text-[#1a1a1a] no-underline transition-colors hover:bg-gray-50 hover:text-[#064e3b]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-auto border-t border-gray-100 px-5 py-4">
              <p className="m-0 text-xs text-[#6b7280]">Free shipping above ₹999</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInFromLeft {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </>
  )
}
