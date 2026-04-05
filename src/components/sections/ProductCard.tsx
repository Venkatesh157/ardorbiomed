import { useCallback, useRef, useState } from 'react'
import type { Product } from '#/data/products'
import { useCart } from '#/hooks/useCart'
import { useToast } from '#/components/ui/Toast'
import { formatCurrency } from '#/lib/utils'
import Badge from '#/components/ui/Badge'
import Button from '#/components/ui/Button'

interface ProductCardProps {
  product: Product
  variant?: 'featured' | 'bestseller'
}

export default function ProductCard({ product, variant }: ProductCardProps) {
  const [imgError, setImgError] = useState(false)
  const { addItem } = useCart()
  const { addToast } = useToast()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleAddToCart = useCallback(() => {
    addItem(product)
    addToast(`${product.name} added to cart`, 'success')

    const btn = buttonRef.current
    if (btn) {
      btn.classList.add('scale-95')
      setTimeout(() => {
        btn.classList.remove('scale-95')
      }, 150)
    }
  }, [addItem, product, addToast])

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-lg">
      <div className="relative h-48 overflow-hidden bg-white">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <span className="text-5xl font-bold text-gray-300">
              {product.name.charAt(0)}
            </span>
          </div>
        )}

        {product.discount > 0 && (
          <Badge variant="discount" className="absolute right-2 top-2">
            -{product.discount}% OFF
          </Badge>
        )}

        {product.isTrending && (
          <Badge variant="trending" className="absolute left-2 top-2">
            Trending
          </Badge>
        )}

        {variant === 'bestseller' && (
          <Badge
            variant="bestseller"
            className="absolute bottom-2 left-2"
          >
            Bestseller
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
          {product.subBrand}
        </p>
        <h3 className="mt-1 line-clamp-2 text-sm font-medium text-gray-900">
          {product.name}
        </h3>

        <div className="mt-auto flex items-baseline gap-2 pt-3">
          <span className="text-lg font-bold text-gray-900">
            {formatCurrency(product.price)}
          </span>
          {product.mrp > product.price && (
            <span className="text-sm text-gray-400 line-through">
              {formatCurrency(product.mrp)}
            </span>
          )}
        </div>

        <Button
          ref={buttonRef}
          size="sm"
          className="mt-3 w-full transition-transform"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
