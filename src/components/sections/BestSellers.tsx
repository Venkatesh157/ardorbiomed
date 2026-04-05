import Container from '#/components/ui/Container'
import ProductCard from '#/components/sections/ProductCard'
import { useBestsellers } from '#/hooks/useProducts'
import { useSectionReveal } from '#/hooks/useSectionReveal'

export default function BestSellers() {
  const { data: products, isLoading } = useBestsellers()
  const revealRef = useSectionReveal()

  return (
    <section ref={revealRef} id="bestsellers" className="section-reveal bg-white py-16">
      <Container>
        <div className="text-center">
          <h2
            className="text-3xl font-bold sm:text-4xl"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Best Sellers
          </h2>
          <p className="mt-2 text-gray-600">Our most loved products</p>
        </div>

        {isLoading ? (
          <div className="mt-10 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#6fc54d] border-t-transparent" />
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {products?.map((product) => (
              <div key={product.id} className="stagger-item">
                <ProductCard
                  product={product}
                  variant="bestseller"
                />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
