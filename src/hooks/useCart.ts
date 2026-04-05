import { useContext, useMemo } from 'react'
import { CartContext } from '#/components/cart/CartProvider'
import { getCartTotal, getCartDiscount, getCartFinalTotal, getCartItemCount } from '#/components/cart/cartReducer'
import type { Product } from '#/data/products'
import type { Coupon } from '#/data/coupons'

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  const { state, dispatch } = context

  return useMemo(() => ({
    state,
    dispatch,
    addItem: (product: Product) => dispatch({ type: 'ADD_ITEM', product }),
    removeItem: (productId: string) => dispatch({ type: 'REMOVE_ITEM', productId }),
    updateQuantity: (productId: string, quantity: number) =>
      dispatch({ type: 'UPDATE_QUANTITY', productId, quantity }),
    applyCoupon: (coupon: Coupon) => dispatch({ type: 'APPLY_COUPON', coupon }),
    removeCoupon: () => dispatch({ type: 'REMOVE_COUPON' }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    total: getCartTotal(state),
    discount: getCartDiscount(state),
    finalTotal: getCartFinalTotal(state),
    itemCount: getCartItemCount(state),
  }), [state, dispatch])
}
