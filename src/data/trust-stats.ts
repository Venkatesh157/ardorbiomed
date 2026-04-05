export interface TrustStat {
  label: string
  value: string
  numericValue?: number
  suffix?: string
  icon: string
}

export const TRUST_STATS: TrustStat[] = [
  {
    label: 'DPIIT Registered',
    value: 'DPIIT Registered',
    icon: 'Shield',
  },
  {
    label: 'Govt of India Funded',
    value: 'Govt Funded',
    icon: 'Landmark',
  },
  {
    label: 'Lives Impacted',
    value: '8M+',
    numericValue: 8,
    suffix: 'M+',
    icon: 'Heart',
  },
  {
    label: 'Published Research',
    value: 'Published Research',
    icon: 'BookOpen',
  },
  {
    label: 'Available on Amazon',
    value: 'On Amazon',
    icon: 'ShoppingBag',
  },
]
