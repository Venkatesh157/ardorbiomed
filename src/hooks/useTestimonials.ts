import { useQuery } from '@tanstack/react-query'
import { TESTIMONIALS, type Testimonial } from '#/data/testimonials'

// TODO: Replace queryFn with real API call
export function useTestimonials() {
  return useQuery<Testimonial[]>({
    queryKey: ['testimonials'],
    queryFn: () => Promise.resolve(TESTIMONIALS),
  })
}
