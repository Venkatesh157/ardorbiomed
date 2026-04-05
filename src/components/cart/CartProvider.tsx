import { createContext, useReducer, type Dispatch, type ReactNode } from 'react'
import { cartReducer, initialCartState, type CartAction, type CartState } from '#/components/cart/cartReducer'

export interface CartContextValue {
  state: CartState
  dispatch: Dispatch<CartAction>
}

export const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}
