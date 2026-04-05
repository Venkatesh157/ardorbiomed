export interface Testimonial {
  id: string
  name: string
  rating: number
  text: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-001',
    name: 'Rajalakshmi',
    rating: 5,
    text: 'Coco Heal products have completely transformed my skincare routine. The quality and care that go into every product is evident from the very first use. I love that everything is naturally derived from coconut — my skin has never felt better.',
  },
  {
    id: 't-002',
    name: 'Priya',
    rating: 5,
    text: 'Shopping here was a delightful experience! The product range is impressive and the natural ingredients really make a difference. I especially appreciate the detailed information about how each product is made from coconut derivatives.',
  },
  {
    id: 't-003',
    name: 'Lakshmi',
    rating: 4,
    text: 'The range of beauty products is amazing. I especially love how effective and gentle the ingredients are on my sensitive skin. The moisturizer and bath soap have become daily essentials. Great to support a company working with local coconut farmers.',
  },
]
