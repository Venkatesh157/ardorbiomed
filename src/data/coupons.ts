export interface Coupon {
  code: string
  discount: number
  description: string
}

export const COUPONS: Record<string, Coupon> = {
  WELCOME15: { code: 'WELCOME15', discount: 15, description: '15% off your first order' },
  FIRST20: { code: 'FIRST20', discount: 20, description: '20% off your first order' },
}

export function validateCoupon(code: string): Coupon | null {
  return COUPONS[code.toUpperCase()] ?? null
}
