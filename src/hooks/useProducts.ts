import { useQuery } from '@tanstack/react-query'
import { PRODUCTS, getFeaturedProducts, getBestsellers, getProductsByCategory, type Product, type ProductCategory } from '#/data/products'

// TODO: Replace queryFn with real API call — e.g. fetch('/api/products')
export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () => Promise.resolve(PRODUCTS.filter(p => p.status === 'active')),
  })
}

export function useFeaturedProducts() {
  return useQuery<Product[]>({
    queryKey: ['products', 'featured'],
    queryFn: () => Promise.resolve(getFeaturedProducts().filter(p => p.status === 'active')),
  })
}

export function useBestsellers() {
  return useQuery<Product[]>({
    queryKey: ['products', 'bestsellers'],
    queryFn: () => Promise.resolve(getBestsellers().filter(p => p.status === 'active')),
  })
}

export function useProductsByCategory(category: ProductCategory) {
  return useQuery<Product[]>({
    queryKey: ['products', 'category', category],
    queryFn: () => Promise.resolve(getProductsByCategory(category).filter(p => p.status === 'active')),
  })
}
