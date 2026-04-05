import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

const SESSION_KEY = 'ardor-announcement-dismissed'

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false)
  const [animatingOut, setAnimatingOut] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem(SESSION_KEY)
    if (!dismissed) {
      setVisible(true)
    }
  }, [])

  function dismiss() {
    setAnimatingOut(true)
    setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1')
      setVisible(false)
      setAnimatingOut(false)
    }, 300)
  }

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Promotional announcement"
      style={{
        transform: animatingOut ? 'translateY(-100%)' : 'translateY(0)',
        opacity: animatingOut ? 0 : 1,
        transition: 'transform 300ms ease, opacity 300ms ease',
      }}
      className="relative z-50 flex h-10 w-full items-center justify-center bg-[#6fc54d] px-10 text-sm font-medium text-white"
    >
      <p className="m-0 text-center leading-none">
        Use code{' '}
        <strong className="font-semibold tracking-wide">WELCOME15</strong> for
        15% off your first order&nbsp;|&nbsp;Free shipping above ₹999
      </p>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/20 hover:text-white"
      >
        <X size={14} strokeWidth={2.5} />
      </button>
    </div>
  )
}
