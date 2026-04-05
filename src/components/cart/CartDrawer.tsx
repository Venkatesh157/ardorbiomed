import { Minus, Plus, Trash2, X, Tag } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useCart } from '#/hooks/useCart'
import { useToast } from '#/components/ui/Toast'
import { validateCoupon } from '#/data/coupons'
import { formatCurrency } from '#/lib/utils'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const {
    state, addItem, removeItem, updateQuantity,
    applyCoupon, removeCoupon,
    total, discount, finalTotal, itemCount,
  } = useCart()
  const { addToast } = useToast()
  const [couponInput, setCouponInput] = useState('')
  const [couponError, setCouponError] = useState('')
  const drawerRef = useRef<HTMLDivElement>(null)

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', onKey)
      return () => document.removeEventListener('keydown', onKey)
    }
  }, [isOpen, onClose])

  // Focus trap — re-queries on every Tab to handle dynamic content
  useEffect(() => {
    if (!isOpen || !drawerRef.current) return

    // Auto-focus first focusable element
    const initial = drawerRef.current.querySelector<HTMLElement>(
      'button, [href], input, [tabindex]:not([tabindex="-1"])',
    )
    initial?.focus()

    function trapFocus(e: KeyboardEvent) {
      if (e.key !== 'Tab' || !drawerRef.current) return
      const focusable = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null)
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', trapFocus)
    return () => document.removeEventListener('keydown', trapFocus)
  }, [isOpen])

  function handleApplyCoupon() {
    setCouponError('')
    const coupon = validateCoupon(couponInput.trim())
    if (coupon) {
      applyCoupon(coupon)
      setCouponInput('')
      addToast(`${coupon.code} applied! ${coupon.discount}% off`, 'success')
    } else {
      setCouponError('Invalid coupon code')
    }
  }

  function handleCheckout() {
    addToast('Checkout coming soon!', 'info')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping cart">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
        style={{ animation: 'slideInFromRight 250ms cubic-bezier(0.16, 1, 0.3, 1) both' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            className="m-0 text-xl font-bold text-[#1a1a1a]"
          >
            Your Cart
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        {itemCount === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-5 text-center">
            <p className="mb-4 text-lg font-medium text-gray-400">Your cart is empty</p>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-[#6fc54d] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#5eb03e]"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4" aria-live="polite">
              <div className="space-y-4">
                {state.items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3 rounded-lg border border-gray-100 p-3">
                    <div className="h-16 w-16 flex-shrink-0 rounded-md bg-gray-100" />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between">
                        <p className="m-0 text-sm font-medium text-[#1a1a1a] leading-tight">
                          {product.name}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          aria-label={`Remove ${product.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded text-gray-400 hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="m-0 mt-0.5 text-xs text-gray-400">{product.subBrand}</p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 rounded-md border border-gray-200">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            aria-label="Decrease quantity"
                            className="flex h-7 w-7 items-center justify-center text-gray-500 hover:bg-gray-50"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="min-w-[1.5rem] text-center text-sm font-medium">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => addItem(product)}
                            aria-label="Increase quantity"
                            className="flex h-7 w-7 items-center justify-center text-gray-500 hover:bg-gray-50"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="m-0 text-sm font-semibold text-[#1a1a1a]">
                          {formatCurrency(product.price * quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coupon + Summary */}
            <div className="border-t border-gray-100 px-5 py-4">
              {/* Coupon input */}
              {!state.coupon ? (
                <div className="mb-4">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => { setCouponInput(e.target.value); setCouponError('') }}
                        onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                        placeholder="Coupon code"
                        aria-label="Coupon code"
                        className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#6fc54d] focus:ring-1 focus:ring-[#6fc54d]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="rounded-lg bg-[#064e3b] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#053d2f]"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="m-0 mt-1.5 text-xs text-red-500">{couponError}</p>
                  )}
                </div>
              ) : (
                <div className="mb-4 flex items-center justify-between rounded-lg bg-green-50 px-3 py-2">
                  <span className="text-sm font-medium text-green-700">
                    {state.coupon.code} — {state.coupon.discount}% off
                  </span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-xs font-medium text-green-600 hover:text-green-800"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Order summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-bold text-[#1a1a1a]">
                  <span>Total</span>
                  <span>{formatCurrency(finalTotal)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="mt-4 w-full rounded-full bg-[#6fc54d] py-3 text-sm font-bold text-white transition-colors hover:bg-[#5eb03e]"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes slideInFromRight {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}
