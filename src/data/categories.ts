import type { ProductCategory } from '#/data/products'

export interface Category {
  name: string
  slug: ProductCategory
  subBrand: string
  description: string
  image: string
}

export const CATEGORIES: Category[] = [
  {
    name: 'Woundcare',
    slug: 'woundcare',
    subBrand: 'Coco Heal',
    description: 'Advanced bio-cellulose wound dressings and gels for faster, natural healing.',
    image: '/images/products/Screenshot_2025-03-17_at_10_6MKA7S9.png',
  },
  {
    name: 'Cosmeceutical',
    slug: 'cosmeceutical',
    subBrand: 'Cocoshield',
    description: 'Coconut-derived skincare that nourishes, protects, and revitalises your skin naturally.',
    image: '/images/products/Screenshot_2025-03-17_at_9_S4ycwy4.png',
  },
  {
    name: 'Nutraceutical',
    slug: 'nutraceutical',
    subBrand: 'Cocolife',
    description: 'Coconut jelly, dietary fiber, and monolaurin supplements for everyday wellness.',
    image: '/images/products/STRAWBERRY__nata_mockup_4AuN83K.png',
  },
]
