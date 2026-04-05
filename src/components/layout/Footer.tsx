import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

const QUICK_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'Products', href: '#' },
  { label: 'About Us', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'Blog', href: '#' },
] as const

// TODO: Replace with actual social media profile URLs
const SOCIAL_LINKS = [
  { label: 'Facebook', href: '#', Icon: Facebook },
  { label: 'Instagram', href: '#', Icon: Instagram },
  { label: 'Twitter', href: '#', Icon: Twitter },
  { label: 'YouTube', href: '#', Icon: Youtube },
] as const

const PAYMENT_METHODS = ['Visa', 'Mastercard', 'UPI', 'Razorpay'] as const

export default function Footer() {
  return (
    <footer className="bg-[#0a1f0a] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              className="mb-3 text-2xl font-bold text-[#6fc54d]"
            >
              Ardor Biomed
            </h2>
            <p className="mb-3 text-sm font-medium leading-snug text-white/80">
              Pioneering biomedical solutions with innovation and excellence
            </p>
            <p className="m-0 text-sm leading-relaxed text-white/55">
              We specialize in coconut-derived biomedical products, committed to
              quality, sustainability, and advancing healthcare through science.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/40">
              Quick Links
            </h3>
            <ul className="m-0 list-none space-y-3 p-0">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/65 no-underline transition-colors duration-150 hover:text-[#6fc54d]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/40">
              Contact
            </h3>
            <address className="space-y-3 not-italic">
              <p className="m-0 text-sm leading-relaxed text-white/65">
                Unit No.9, Sakthi Industrial Estate,
                <br />
                Udumalpet Road, Pollachi - 642003,
                <br />
                Tamil Nadu, India
              </p>
              <div className="space-y-1.5">
                <p className="m-0">
                  <a href="tel:+919488828080" className="text-sm text-white/65 no-underline transition-colors duration-150 hover:text-[#6fc54d]">
                    +91 94888 28080
                  </a>
                </p>
                <p className="m-0">
                  <a href="tel:+919944951234" className="text-sm text-white/65 no-underline transition-colors duration-150 hover:text-[#6fc54d]">
                    +91 99449 51234
                  </a>
                </p>
              </div>
              <div className="space-y-1.5">
                <p className="m-0">
                  <a href="mailto:customercare@ardorbiomed.com" className="text-sm text-white/65 no-underline transition-colors duration-150 hover:text-[#6fc54d]">
                    customercare@ardorbiomed.com
                  </a>
                </p>
                <p className="m-0">
                  <a href="mailto:sales@ardorbiomed.com" className="text-sm text-white/65 no-underline transition-colors duration-150 hover:text-[#6fc54d]">
                    sales@ardorbiomed.com
                  </a>
                </p>
              </div>
            </address>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/40">
              Follow Us
            </h3>
            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ardor Biomed on ${label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/55 no-underline transition-all duration-150 hover:border-[#6fc54d]/50 hover:bg-[#6fc54d]/10 hover:text-[#6fc54d]"
                >
                  <Icon size={18} strokeWidth={1.75} />
                </a>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/45">
              Stay connected for the latest on our products, research, and exclusive offers.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="m-0 text-sm text-white/45">
            &copy; 2026 Ardor Biomed India PVT LTD. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/30">Accepted payments:</span>
            <div className="flex gap-2">
              {PAYMENT_METHODS.map((method) => (
                <span
                  key={method}
                  className="rounded border border-white/10 px-2 py-0.5 text-xs text-white/35"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
