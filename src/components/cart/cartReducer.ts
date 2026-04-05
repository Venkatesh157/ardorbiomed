import type { Product } from '#/data/products'
import type { Coupon } from '#/data/coupons'

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartState {
  items: CartItem[]
  coupon: Coupon | null
}

export type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'APPLY_COUPON'; coupon: Coupon }
  | { type: 'REMOVE_COUPON' }
  | { type: 'CLEAR_CART' }

export const initialCartState: CartState = {
  items: [],
  coupon: null,
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.product.id === action.product.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: 1 }],
      }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((i) => i.product.id !== action.productId),
      }
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.product.id !== action.productId),
        }
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId
            ? { ...i, quantity: action.quantity }
            : i,
        ),
      }
    }
    case 'APPLY_COUPON':
      return { ...state, coupon: action.coupon }
    case 'REMOVE_COUPON':
      return { ...state, coupon: null }
    case 'CLEAR_CART':
      return initialCartState
  }
}

export function getCartTotal(state: CartState): number {
  return state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
}

export function getCartDiscount(state: CartState): number {
  if (!state.coupon) return 0
  return Math.round(getCartTotal(state) * (state.coupon.discount / 100))
}

export function getCartFinalTotal(state: CartState): number {
  return getCartTotal(state) - getCartDiscount(state)
}

export function getCartItemCount(state: CartState): number {
  return state.items.reduce((sum, i) => sum + i.quantity, 0)
}
