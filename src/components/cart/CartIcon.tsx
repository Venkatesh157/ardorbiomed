import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '#/hooks/useCart'

const CartDrawerComponent = lazy(() => import('#/components/cart/CartDrawer'))

function CartDrawerLazy({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Suspense fallback={null}>
      <CartDrawerComponent isOpen={isOpen} onClose={onClose} />
    </Suspense>
  )
}

export default function CartIcon() {
  const { itemCount } = useCart()
  const [bounce, setBounce] = useState(false)
  const prevCount = useRef(itemCount)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    if (itemCount !== prevCount.current && itemCount > 0) {
      setBounce(true)
      const timer = setTimeout(() => setBounce(false), 300)
      prevCount.current = itemCount
      return () => clearTimeout(timer)
    }
    prevCount.current = itemCount
  }, [itemCount])

  return (
    <>
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        aria-label={`Shopping cart, ${itemCount} items`}
        className="relative flex h-9 w-9 items-center justify-center rounded-md text-[#1a1a1a] transition-colors hover:bg-gray-100"
      >
        <ShoppingCart size={20} strokeWidth={1.75} />
        {itemCount > 0 && (
          <span
            className={[
              'absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#6fc54d] px-1 text-[10px] font-bold text-white',
              bounce ? 'animate-bounce-once' : '',
            ].join(' ')}
          >
            {itemCount}
          </span>
        )}
      </button>

      {drawerOpen && (
        <CartDrawerLazy isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      )}

      <style>{`
        @keyframes bounceOnce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.4); }
        }
        .animate-bounce-once {
          animation: bounceOnce 300ms ease;
        }
      `}</style>
    </>
  )
}
